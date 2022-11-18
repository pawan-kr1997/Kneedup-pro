import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import Stripe from "stripe";
import * as dotenv from "dotenv";

import { postRoutes } from "./Routes/Post";
import { userRoutes } from "./Routes/User";
import { subscriptionRoutes } from "./Routes/Subscription";

dotenv.config();
const app = express();

export const stripe = new Stripe(process.env.STRIPE_SECRET as string, { apiVersion: "2020-08-27" });

app.use((req, res, next) => {
    if (req.originalUrl === "/webhooks") {
        next();
    } else {
        express.json()(req, res, next);
    }
});
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(postRoutes);
app.use(userRoutes);
app.use(subscriptionRoutes);

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json("" + error);
});

app.listen(8090, () => console.log("listening for port 8090"));
