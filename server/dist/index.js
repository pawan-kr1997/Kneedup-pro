"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const stripe_1 = __importDefault(require("stripe"));
const dotenv = __importStar(require("dotenv"));
const Post_1 = require("./Routes/Post");
const User_1 = require("./Routes/User");
const Subscription_1 = require("./Routes/Subscription");
dotenv.config();
const app = (0, express_1.default)();
exports.stripe = new stripe_1.default(process.env.STRIPE_SECRET, { apiVersion: "2020-08-27" });
app.use((req, res, next) => {
    if (req.originalUrl === "/webhooks") {
        next();
    }
    else {
        express_1.default.json()(req, res, next);
    }
});
app.use(express_1.default.static("public"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(Post_1.postRoutes);
app.use(User_1.userRoutes);
app.use(Subscription_1.subscriptionRoutes);
app.use((error, req, res, next) => {
    res.status(500).json("" + error);
});
app.listen(8090, () => console.log("listening for port 8090"));
