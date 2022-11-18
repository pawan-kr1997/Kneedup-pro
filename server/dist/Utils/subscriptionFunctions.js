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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manageEventTypes = exports.getStripeEvent = exports.getEventAndEventType = exports.createStripeBillingPortal = exports.createStripeCheckoutSession = exports.decodeJwtToken = void 0;
const prisma = require("../../prisma/index.js");
const __1 = require("..");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const databaseFunctions_1 = require("./databaseFunctions");
const decodeJwtToken = (userToken, res, cancelUrl) => {
    if (!userToken) {
        res.redirect(303, cancelUrl);
    }
    let decodedToken = jsonwebtoken_1.default.verify(userToken, "secretsecret");
    if (!decodedToken) {
        res.redirect(303, cancelUrl);
    }
    return decodedToken;
};
exports.decodeJwtToken = decodeJwtToken;
const createStripeCheckoutSession = (prices, domainUrl, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield __1.stripe.checkout.sessions.create({
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
});
exports.createStripeCheckoutSession = createStripeCheckoutSession;
const createStripeBillingPortal = (stripeCustomerId, returnUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const portalSession = yield __1.stripe.billingPortal.sessions.create({
        customer: stripeCustomerId,
        return_url: returnUrl,
    });
    return portalSession;
});
exports.createStripeBillingPortal = createStripeBillingPortal;
const getEventAndEventType = (req, res, webhookSecret) => {
    let eventType;
    let event = req.body;
    if (webhookSecret) {
        event = (0, exports.getStripeEvent)(req, res, webhookSecret);
        eventType = event.type;
    }
    else {
        eventType = req.body.type;
    }
    return { eventType, event };
};
exports.getEventAndEventType = getEventAndEventType;
const getStripeEvent = (req, res, webhookSecret) => {
    let signature = req.headers["stripe-signature"];
    let event = req.body;
    try {
        event = __1.stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
        return event;
    }
    catch (err) {
        console.log(`Webhook signature verification failed.`);
        res.sendStatus(400);
    }
};
exports.getStripeEvent = getStripeEvent;
const manageEventTypes = (eventType, event) => {
    var _a;
    let subscription;
    switch (eventType) {
        case "checkout.session.completed":
            subscription = event.data.object;
            (0, databaseFunctions_1.updateUserSubsDetailOnCreation)((_a = subscription.metadata) === null || _a === void 0 ? void 0 : _a.userId, subscription.customer);
            break;
        case "invoice.paid":
            console.log("Inside webhook 2");
            subscription = event.data.object;
            (0, databaseFunctions_1.updateUserSubsDetailOnInvoiceSuccess)(subscription.customer);
            break;
        case "invoice.payment_failed":
            console.log("Inside webhook 3");
            subscription = event.data.object;
            (0, databaseFunctions_1.updateUserSubsDetailOnInvoiceFail)(subscription.customer);
            break;
        case "customer.subscription.deleted":
            console.log("Inside webhook 4");
            subscription = event.data.object;
            (0, databaseFunctions_1.updateUserSubsDetailOnDeletion)(subscription.customer);
            break;
        default:
            console.log("unhandled event type");
    }
};
exports.manageEventTypes = manageEventTypes;
