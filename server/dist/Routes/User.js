"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const User_1 = require("../Controllers/User");
const auth_1 = require("../Middleware/auth");
exports.userRoutes = express_1.default.Router();
exports.userRoutes.get("/feeds/category", auth_1.authMiddleware, User_1.getUserCategoryField);
exports.userRoutes.post("/feeds/category", auth_1.authMiddleware, User_1.updateUserCategoryField);
exports.userRoutes.get("/postBookmark/:postId", auth_1.authMiddleware, User_1.addPostToUserBookmarks);
exports.userRoutes.get("/postUnmark/:postId", auth_1.authMiddleware, User_1.deletePostFromUserBookmarks);
exports.userRoutes.get("/bookmark", auth_1.authMiddleware, User_1.getUserBookmarks);
exports.userRoutes.post("/signup", [
    (0, express_validator_1.body)("emailId", "Email id is not valid").trim().isEmail().not().isEmpty(),
    (0, express_validator_1.body)("password", "Please enter a password with only numbers and text and atleast 8 characters").trim().isLength({ min: 8 }).isAlphanumeric(),
    (0, express_validator_1.body)("confirmPassword", "Invalid confirm password").trim().isLength({ min: 8 }),
], User_1.signupUserUsingEmailPassword);
exports.userRoutes.post("/login", [
    (0, express_validator_1.body)("emailId", "Email id is not valid").trim().isEmail().not().isEmpty(),
    (0, express_validator_1.body)("password", "Please enter a password with only numbers and text and atleast 8 characters").trim().isLength({ min: 8 }).isAlphanumeric(),
], User_1.loginUserUsingEmailPassword);
exports.userRoutes.post("/password/resetLink", (0, express_validator_1.body)("emailId", "Email id is not valid").trim().isEmail().not().isEmpty(), User_1.generatePasswordResetLink);
exports.userRoutes.post("/password/resetPassword", [
    (0, express_validator_1.body)("emailId", "Email id is not valid").trim().isEmail().not().isEmpty(),
    (0, express_validator_1.body)("password", "Please enter a password with only numbers and text and atleast 8 characters").trim().isLength({ min: 8 }).isAlphanumeric(),
    (0, express_validator_1.body)("confirmPassword", "Invalid confirm password").trim().isLength({ min: 8 }),
], User_1.resetPassword);
