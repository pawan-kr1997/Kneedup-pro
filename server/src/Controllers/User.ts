import { Response, NextFunction } from "express";
import { ExtendedRequest, ExtendedRequestBody } from "../Utils/tscTypes";

import {
    checkForValidationError,
    checkForPasswordMatch,
    generateJwtToken,
    setPostCategory,
    addDataToBookmark,
    deleteDataFromBookmark,
    checkIfUserExists,
    checkIfUserNotExists,
    generateAndMailLinkToUser,
} from "../Utils/controllerFunctions";
import {
    createNewUser,
    getPostWithSourcesField,
    getUserFromDbUsingEmailId,
    getUserFromDbUsingId,
    getUserFromDbUsingToken,
    setResetPasswordToUser,
    updateUserBookmark,
    updateUserCategory,
} from "../Utils/databaseFunctions";

export const signupUserUsingEmailPassword = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const { emailId, password, confirmPassword }: ExtendedRequestBody = req.body;

    try {
        checkForValidationError(req);
        checkForPasswordMatch(password, confirmPassword);
        const user = await getUserFromDbUsingEmailId(emailId);
        checkIfUserExists(user);
        const createdUser = await createNewUser(emailId, password);

        res.status(200).json({ message: "user has been added", user: createdUser });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const loginUserUsingEmailPassword = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const { emailId, password }: ExtendedRequestBody = req.body;

    try {
        checkForValidationError(req);
        const user = await getUserFromDbUsingEmailId(emailId);
        checkIfUserNotExists(user);
        checkForPasswordMatch(user.password, password);
        const token = generateJwtToken(user.id, user.emailId);

        res.status(200).json({ message: "User verified", user: user, token: token });
    } catch (err) {
        next(err);
    }
};

export const getUserCategoryField = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    console.log("getuserCategory: " + req.userId);

    try {
        const user = await getUserFromDbUsingId(req.userId);

        res.status(200).json({ message: "Category data sent", category: user.category });
    } catch (err) {
        next(err);
    }
};

export const updateUserCategoryField = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const user = await getUserFromDbUsingId(req.userId);
        const updatedUser = await updateUserCategory(req);

        res.status(200).json({ message: "Category data refreshed", result: updatedUser });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const addPostToUserBookmarks = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const { postId } = req.params;

    try {
        const user = await getUserFromDbUsingId(req.userId);
        const post = await getPostWithSourcesField(postId);
        const postCategory = setPostCategory(post.sources.name, post.category);
        const updatedBookmark = addDataToBookmark(post, user, postId, postCategory);
        const updatedUser = await updateUserBookmark(req.userId, updatedBookmark);

        res.status(200).json({ message: "Result after adding bookmark", user: updatedUser });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const deletePostFromUserBookmarks = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const { postId } = req.params;

    try {
        const user = await getUserFromDbUsingId(req.userId);
        const updatedBookmark = deleteDataFromBookmark(user, postId);
        const updatedUser = await updateUserBookmark(req.userId, updatedBookmark);

        res.status(200).json({ message: "Post unmarked", user: updatedUser });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const getUserBookmarks = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const user = await getUserFromDbUsingId(req.userId);

        res.status(200).json({ message: "init bookmark", data: user.bookmark });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const generatePasswordResetLink = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        checkForValidationError(req);
        generateAndMailLinkToUser(req);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export const resetPassword = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const { token }: ExtendedRequestBody = req.body;

    try {
        checkForValidationError(req);
        checkForPasswordMatch(req.body.password, req.body.confirmPassword);

        const user = await getUserFromDbUsingToken(req.body.emailId, token);
        checkIfUserNotExists(user);
        const updatedUser = await setResetPasswordToUser(req.body.emailId, req.body.password);

        res.status(200).json({ message: "Password reset successfully", user: updatedUser });
    } catch (err) {
        console.log(err);
        next(err);
    }
};
