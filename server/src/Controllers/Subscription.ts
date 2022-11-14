import { Response, NextFunction } from "express";
import { stripe } from "..";
import { ExtendedRequest } from "../Utils/tscTypes";
import { getUserFromDbUsingId, updateUserSubscriptionDetails } from "../Utils/databaseFunctions";
import { createStripeBillingPortal, createStripeCheckoutSession, decodeJwtToken } from "../Utils/subscriptionFunctions";

const prisma = require("../../prisma/index.js");

const DOMAIN_URL = "http://localhost:3000/subscription";
const CANCEL_URL = "http://localhost:3000/subscription?canceled=true";

export const getUserSubscriptionStatus = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const user = await getUserFromDbUsingId(req.userId);

        res.status(200).json({ message: "User subscription status", subscriptionStatus: user.subscriptionStatus });
    } catch (err) {
        next(err);
    }
};

export const createCheckoutSession = async (req: ExtendedRequest, res: Response) => {
    try {
        let decodedToken = decodeJwtToken(req.body.user_token, res, CANCEL_URL);
        const prices = await stripe.prices.retrieve(req.body.lookup_key);
        const session = await createStripeCheckoutSession(prices, DOMAIN_URL, decodedToken);

        res.redirect(303, session.url as string);
    } catch (err) {
        console.log("checkout session error: " + err);
    }
};

export const createPortalSession = async (req: ExtendedRequest, res: Response) => {
    try {
        const returnUrl = DOMAIN_URL;
        let decodedToken = decodeJwtToken(req.body.user_token, res, CANCEL_URL);
        const user = await getUserFromDbUsingId(decodedToken.userId);
        const portalSession = await createStripeBillingPortal(user.stripeUserId as string, returnUrl);

        res.redirect(303, portalSession.url);
    } catch (err) {
        console.log("Error from portal session: " + err);
    }
};

export const postStripeWebhook = async (req: ExtendedRequest, res: Response) => {
    let data;
    let eventType;
    let subscription;
    let event = req.body;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (webhookSecret) {
        let signature = req.headers["stripe-signature"];

        try {
            event = stripe.webhooks.constructEvent(req.body, signature as string | string[] | Buffer, webhookSecret);
        } catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`);
            return res.sendStatus(400);
        }
        data = event.data;
        eventType = event.type;
    } else {
        data = req.body.data;
        eventType = req.body.type;
    }

    switch (eventType) {
        case "checkout.session.completed":
            subscription = event.data.object;
            updateUserSubscriptionDetails(subscription.metadata.userId, subscription.customer, true);

            break;
        case "invoice.paid":
            console.log("Inside webhook 2");
            subscription = event.data.object;
            updateUserSubscriptionDetails(subscription.metadata.userId, subscription.customer, true);

            break;
        case "invoice.payment_failed":
            console.log("Inside webhook 3");
            subscription = event.data.object;
            updateUserSubscriptionDetails(subscription.metadata.userId, null, false);

            break;

        case "customer.subscription.deleted":
            console.log("Inside webhook 4");
            subscription = event.data.object;
            updateUserSubscriptionDetails(subscription.metadata.userId, null, false);

            break;
        default:
            console.log("unhandles error types");
    }

    res.sendStatus(200);
};
