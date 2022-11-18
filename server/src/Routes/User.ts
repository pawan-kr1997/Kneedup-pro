import express from "express";
import { body } from "express-validator";

import {
    getUserBookmarks,
    deletePostFromUserBookmarks,
    signupUserUsingEmailPassword,
    loginUserUsingEmailPassword,
    getUserCategoryField,
    addPostToUserBookmarks,
    updateUserCategoryField,
    generatePasswordResetLink,
    resetPassword,
} from "../Controllers/User";
import { authMiddleware } from "../Middleware/auth";

export const userRoutes = express.Router();

userRoutes.get("/feeds/category", authMiddleware, getUserCategoryField);
userRoutes.post("/feeds/category", authMiddleware, updateUserCategoryField);
userRoutes.get("/postBookmark/:postId", authMiddleware, addPostToUserBookmarks);
userRoutes.get("/postUnmark/:postId", authMiddleware, deletePostFromUserBookmarks);
userRoutes.get("/bookmark", authMiddleware, getUserBookmarks);
userRoutes.post(
    "/signup",
    [
        body("emailId", "Email id is not valid").trim().isEmail().not().isEmpty(),

        body("password", "Please enter a password with only numbers and text and atleast 8 characters").trim().isLength({ min: 8 }).isAlphanumeric(),

        body("confirmPassword", "Invalid confirm password").trim().isLength({ min: 8 }),
    ],
    signupUserUsingEmailPassword
);

userRoutes.post(
    "/login",
    [
        body("emailId", "Email id is not valid").trim().isEmail().not().isEmpty(),
        body("password", "Please enter a password with only numbers and text and atleast 8 characters").trim().isLength({ min: 8 }).isAlphanumeric(),
    ],
    loginUserUsingEmailPassword
);

userRoutes.post("/password/resetLink", body("emailId", "Email id is not valid").trim().isEmail().not().isEmpty(), generatePasswordResetLink);
userRoutes.post(
    "/password/resetPassword",
    [
        body("emailId", "Email id is not valid").trim().isEmail().not().isEmpty(),

        body("password", "Please enter a password with only numbers and text and atleast 8 characters").trim().isLength({ min: 8 }).isAlphanumeric(),

        body("confirmPassword", "Invalid confirm password").trim().isLength({ min: 8 }),
    ],
    resetPassword
);
