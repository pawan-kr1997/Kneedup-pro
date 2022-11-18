import { Response, NextFunction } from "express";
import { stripe } from "..";

import { ExtendedRequest, StripeEventObject } from "../Utils/tscTypes";
import { getUserFromDbUsingId } from "../Utils/databaseFunctions";
import { createStripeBillingPortal, createStripeCheckoutSession, decodeJwtToken, getEventAndEventType, manageEventTypes } from "../Utils/subscriptionFunctions";

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

export const getUserSubscriptionDueDate = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const user = await getUserFromDbUsingId(req.userId);

        const subscription = await stripe.subscriptions.list({
            customer: user.stripeUserId,
            limit: 1,
        });

        res.status(200).json({ message: "Subscription due date", subscriptionDueDate: subscription.data[0].current_period_end });
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
    let subscription: StripeEventObject;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let { eventType, event } = getEventAndEventType(req, res, webhookSecret);
    manageEventTypes(eventType, event);
    res.sendStatus(200);
};
