"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Subscription_1 = require("../Controllers/Subscription");
const auth_1 = require("../Middleware/auth");
exports.subscriptionRoutes = express_1.default.Router();
exports.subscriptionRoutes.get("/subscriptionStatus", auth_1.authMiddleware, Subscription_1.getUserSubscriptionStatus);
exports.subscriptionRoutes.get("/subscriptionDueDate", auth_1.authMiddleware, Subscription_1.getUserSubscriptionDueDate);
exports.subscriptionRoutes.post("/create-checkout-session", Subscription_1.createCheckoutSession);
exports.subscriptionRoutes.post("/create-portal-session", Subscription_1.createPortalSession);
exports.subscriptionRoutes.post("/webhooks", express_1.default.raw({ type: "application/json" }), Subscription_1.postStripeWebhook);
