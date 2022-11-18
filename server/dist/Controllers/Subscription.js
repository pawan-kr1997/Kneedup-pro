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
exports.postStripeWebhook = exports.createPortalSession = exports.createCheckoutSession = exports.getUserSubscriptionDueDate = exports.getUserSubscriptionStatus = void 0;
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
const getUserSubscriptionDueDate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, databaseFunctions_1.getUserFromDbUsingId)(req.userId);
        const subscription = yield __1.stripe.subscriptions.list({
            customer: user.stripeUserId,
            limit: 1,
        });
        res.status(200).json({ message: "Subscription due date", subscriptionDueDate: subscription.data[0].current_period_end });
    }
    catch (err) {
        next(err);
    }
});
exports.getUserSubscriptionDueDate = getUserSubscriptionDueDate;
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
    let subscription;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let { eventType, event } = (0, subscriptionFunctions_1.getEventAndEventType)(req, res, webhookSecret);
    (0, subscriptionFunctions_1.manageEventTypes)(eventType, event);
    res.sendStatus(200);
});
exports.postStripeWebhook = postStripeWebhook;
