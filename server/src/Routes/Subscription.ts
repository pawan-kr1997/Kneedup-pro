import express from "express";
import { createCheckoutSession, createPortalSession, getUserSubscriptionStatus, postStripeWebhook } from "../Controllers/Subscription";
import { authMiddleware } from "../Middleware/auth";

export const subscriptionRoutes = express.Router();

subscriptionRoutes.get("/subscriptionStatus", authMiddleware, getUserSubscriptionStatus);

subscriptionRoutes.post("/create-checkout-session", createCheckoutSession);
subscriptionRoutes.post("/create-portal-session", createPortalSession);
subscriptionRoutes.post("/webhooks", express.raw({ type: "application/json" }), postStripeWebhook);
