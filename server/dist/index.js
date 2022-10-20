"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Post_1 = require("./Routes/Post");
const User_1 = require("./Routes/User");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(Post_1.postRoutes);
app.use(User_1.userRoutes);
app.use((error, req, res, next) => {
    res.status(500).json("" + error);
});
app.listen(8090, () => console.log("listening for port 8090"));
