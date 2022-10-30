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
exports.resetPassword = exports.generatePasswordResetLink = exports.getUserBookmarks = exports.deletePostFromUserBookmarks = exports.addPostToUserBookmarks = exports.updateUserCategoryField = exports.getUserCategoryField = exports.loginUserUsingEmailPassword = exports.signupUserUsingEmailPassword = void 0;
const controllerFunctions_1 = require("../Utils/controllerFunctions");
const databaseFunctions_1 = require("../Utils/databaseFunctions");
const signupUserUsingEmailPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { emailId, password, confirmPassword } = req.body;
    try {
        (0, controllerFunctions_1.checkForValidationError)(req);
        (0, controllerFunctions_1.checkForPasswordMatch)(password, confirmPassword);
        const user = yield (0, databaseFunctions_1.getUserFromDbUsingEmailId)(emailId);
        (0, controllerFunctions_1.checkIfUserExists)(user);
        const createdUser = yield (0, databaseFunctions_1.createNewUser)(emailId, password);
        res.status(200).json({ message: "user has been added", user: createdUser });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.signupUserUsingEmailPassword = signupUserUsingEmailPassword;
const loginUserUsingEmailPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { emailId, password } = req.body;
    try {
        (0, controllerFunctions_1.checkForValidationError)(req);
        const user = yield (0, databaseFunctions_1.getUserFromDbUsingEmailId)(emailId);
        (0, controllerFunctions_1.checkIfUserNotExists)(user);
        (0, controllerFunctions_1.checkForPasswordMatch)(user.password, password);
        const token = (0, controllerFunctions_1.generateJwtToken)(user.id, user.emailId);
        res.status(200).json({ message: "User verified", user: user, token: token });
    }
    catch (err) {
        next(err);
    }
});
exports.loginUserUsingEmailPassword = loginUserUsingEmailPassword;
const getUserCategoryField = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getuserCategory: " + req.userId);
    try {
        const user = yield (0, databaseFunctions_1.getUserFromDbUsingId)(req.userId);
        res.status(200).json({ message: "Category data sent", category: user.category });
    }
    catch (err) {
        next(err);
    }
});
exports.getUserCategoryField = getUserCategoryField;
const updateUserCategoryField = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, databaseFunctions_1.getUserFromDbUsingId)(req.userId);
        const updatedUser = yield (0, databaseFunctions_1.updateUserCategory)(req);
        res.status(200).json({ message: "Category data refreshed", result: updatedUser });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.updateUserCategoryField = updateUserCategoryField;
const addPostToUserBookmarks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    try {
        const user = yield (0, databaseFunctions_1.getUserFromDbUsingId)(req.userId);
        const post = yield (0, databaseFunctions_1.getPostWithSourcesField)(postId);
        const postCategory = (0, controllerFunctions_1.setPostCategory)(post.sources.name, post.category);
        const updatedBookmark = (0, controllerFunctions_1.addDataToBookmark)(post, user, postId, postCategory);
        const updatedUser = yield (0, databaseFunctions_1.updateUserBookmark)(req.userId, updatedBookmark);
        res.status(200).json({ message: "Result after adding bookmark", user: updatedUser });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.addPostToUserBookmarks = addPostToUserBookmarks;
const deletePostFromUserBookmarks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    try {
        const user = yield (0, databaseFunctions_1.getUserFromDbUsingId)(req.userId);
        const updatedBookmark = (0, controllerFunctions_1.deleteDataFromBookmark)(user, postId);
        const updatedUser = yield (0, databaseFunctions_1.updateUserBookmark)(req.userId, updatedBookmark);
        res.status(200).json({ message: "Post unmarked", user: updatedUser });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.deletePostFromUserBookmarks = deletePostFromUserBookmarks;
const getUserBookmarks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, databaseFunctions_1.getUserFromDbUsingId)(req.userId);
        res.status(200).json({ message: "init bookmark", data: user.bookmark });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.getUserBookmarks = getUserBookmarks;
const generatePasswordResetLink = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, controllerFunctions_1.checkForValidationError)(req);
        (0, controllerFunctions_1.generateAndMailLinkToUser)(req);
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.generatePasswordResetLink = generatePasswordResetLink;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        (0, controllerFunctions_1.checkForValidationError)(req);
        (0, controllerFunctions_1.checkForPasswordMatch)(req.body.password, req.body.confirmPassword);
        const user = yield (0, databaseFunctions_1.getUserFromDbUsingToken)(req.body.emailId, token);
        (0, controllerFunctions_1.checkIfUserNotExists)(user);
        const updatedUser = yield (0, databaseFunctions_1.setResetPasswordToUser)(req.body.emailId, req.body.password);
        res.status(200).json({ message: "Password reset successfully", user: updatedUser });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.resetPassword = resetPassword;
