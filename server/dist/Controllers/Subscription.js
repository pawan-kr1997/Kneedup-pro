"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postStripeWebhook = exports.createPortalSession = exports.createCheckoutSession = exports.getUserSubscriptionStatus = void 0;
const __1 = require("..");
const databaseFunctions_1 = require("../Utils/databaseFunctions");
const subscriptionFunctions_1 = require("../Utils/subscriptionFunctions");
const prisma = require("../../prisma/index.js");
const DOMAIN_URL = "http://localhost:3000/subscription";
const CANCEL_URL = "http://localhost:3000/subscription?canceled=true";
const getUserSubscriptionStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, databaseFunctions_1.getUserFromDbUsingId)(req.userId);
        res.status(200).json({ message: "User subscription status", subscriptionStatus: user.subscriptionStatus });
    }
    catch (err) {
        next(err);
    }
});
exports.getUserSubscriptionStatus = getUserSubscriptionStatus;
const createCheckoutSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let decodedToken = (0, subscriptionFunctions_1.decodeJwtToken)(req.body.user_token, res, CANCEL_URL);
        const prices = yield __1.stripe.prices.retrieve(req.body.lookup_key);
        const session = yield (0, subscriptionFunctions_1.createStripeCheckoutSession)(prices, DOMAIN_URL, decodedToken);
        res.redirect(303, session.url);
    }
    catch (err) {
        console.log("checkout session error: " + err);
    }
});
exports.createCheckoutSession = createCheckoutSession;
const createPortalSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const returnUrl = DOMAIN_URL;
        let decodedToken = (0, subscriptionFunctions_1.decodeJwtToken)(req.body.user_token, res, CANCEL_URL);
        const user = yield (0, databaseFunctions_1.getUserFromDbUsingId)(decodedToken.userId);
        const portalSession = yield (0, subscriptionFunctions_1.createStripeBillingPortal)(user.stripeUserId, returnUrl);
        res.redirect(303, portalSession.url);
    }
    catch (err) {
        console.log("Error from portal session: " + err);
    }
});
exports.createPortalSession = createPortalSession;
const postStripeWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data;
    let eventType;
    let subscription;
    let event = req.body;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (webhookSecret) {
        let signature = req.headers["stripe-signature"];
        try {
            event = __1.stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
        }
        catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`);
            return res.sendStatus(400);
        }
        data = event.data;
        eventType = event.type;
    }
    else {
        data = req.body.data;
        eventType = req.body.type;
    }
    switch (eventType) {
        case "checkout.session.completed":
            subscription = event.data.object;
            (0, databaseFunctions_1.updateUserSubscriptionDetails)(subscription.metadata.userId, subscription.customer, true);
            break;
        case "invoice.paid":
            console.log("Inside webhook 2");
            subscription = event.data.object;
            (0, databaseFunctions_1.updateUserSubscriptionDetails)(subscription.metadata.userId, subscription.customer, true);
            break;
        case "invoice.payment_failed":
            console.log("Inside webhook 3");
            subscription = event.data.object;
            (0, databaseFunctions_1.updateUserSubscriptionDetails)(subscription.metadata.userId, null, false);
            break;
        case "customer.subscription.deleted":
            console.log("Inside webhook 4");
            subscription = event.data.object;
            (0, databaseFunctions_1.updateUserSubscriptionDetails)(subscription.metadata.userId, null, false);
            break;
        default:
            console.log("unhandles error types");
    }
    res.sendStatus(200);
});
exports.postStripeWebhook = postStripeWebhook;
