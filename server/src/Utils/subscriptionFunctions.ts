const prisma = require("../../prisma/index.js");
import { stripe } from "..";

import { Response } from "express";
import { JwtPayload } from "../Utils/tscTypes";
import jwt from "jsonwebtoken";
import Stripe from "stripe";

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
