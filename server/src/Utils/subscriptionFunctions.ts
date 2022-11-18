const prisma = require("../../prisma/index.js");
import { stripe } from "..";
import { Response } from "express";
import jwt from "jsonwebtoken";
import Stripe from "stripe";

import { ExtendedRequest, JwtPayload, StripeEventObject } from "../Utils/tscTypes";
import { updateUserSubsDetailOnCreation, updateUserSubsDetailOnDeletion, updateUserSubsDetailOnInvoiceFail, updateUserSubsDetailOnInvoiceSuccess } from "./databaseFunctions";

export const decodeJwtToken = (userToken: string, res: Response, cancelUrl: string) => {
    if (!userToken) {
        res.redirect(303, cancelUrl);
    }
    let decodedToken = jwt.verify(userToken, "secretsecret") as JwtPayload;

    if (!decodedToken) {
        res.redirect(303, cancelUrl);
    }

    return decodedToken;
};

export const createStripeCheckoutSession = async (prices: Stripe.Response<Stripe.Price>, domainUrl: string, decodedToken: JwtPayload) => {
    const session = await stripe.checkout.sessions.create({
        billing_address_collection: "auto",
        line_items: [
            {
                price: prices.id,
                quantity: 1,
            },
        ],
        metadata: { userId: decodedToken.userId },
        mode: "subscription",
        success_url: `${domainUrl}?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domainUrl}?canceled=true`,
    });

    return session;
};

export const createStripeBillingPortal = async (stripeCustomerId: string, returnUrl: string) => {
    const portalSession = await stripe.billingPortal.sessions.create({
        customer: stripeCustomerId,
        return_url: returnUrl,
    });

    return portalSession;
};

export const getEventAndEventType = (req: ExtendedRequest, res: Response, webhookSecret: string | undefined) => {
    let eventType: string;
    let event: Stripe.Event = req.body;

    if (webhookSecret) {
        event = getStripeEvent(req, res, webhookSecret) as Stripe.Event;
        eventType = event.type;
    } else {
        eventType = req.body.type;
    }

    return { eventType, event };
};

export const getStripeEvent = (req: ExtendedRequest, res: Response, webhookSecret: string | undefined) => {
    let signature = req.headers["stripe-signature"];
    let event: Stripe.Event = req.body;
    try {
        event = stripe.webhooks.constructEvent(req.body, signature as string | string[] | Buffer, webhookSecret as string);
        return event;
    } catch (err) {
        console.log(`Webhook signature verification failed.`);
        res.sendStatus(400);
    }
};

export const manageEventTypes = (eventType: string, event: Stripe.Event) => {
    let subscription: StripeEventObject;
    switch (eventType) {
        case "checkout.session.completed":
            subscription = event.data.object;
            updateUserSubsDetailOnCreation(subscription.metadata?.userId as string, subscription.customer as string);

            break;
        case "invoice.paid":
            console.log("Inside webhook 2");
            subscription = event.data.object;
            updateUserSubsDetailOnInvoiceSuccess(subscription.customer as string);

            break;
        case "invoice.payment_failed":
            console.log("Inside webhook 3");
            subscription = event.data.object;
            updateUserSubsDetailOnInvoiceFail(subscription.customer as string);

            break;

        case "customer.subscription.deleted":
            console.log("Inside webhook 4");
            subscription = event.data.object;
            updateUserSubsDetailOnDeletion(subscription.customer as string);

            break;
        default:
            console.log("unhandled event type");
    }
};
