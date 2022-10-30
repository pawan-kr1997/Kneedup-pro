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
exports.generateAndMailLinkToUser = exports.checkCryptoError = exports.deleteDataFromBookmark = exports.addDataToBookmark = exports.setPostCategory = exports.generateJwtToken = exports.checkIfUserNotExists = exports.checkIfUserExists = exports.checkForPasswordMatch = exports.checkForValidationError = void 0;
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const databaseFunctions_1 = require("./databaseFunctions");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const transport = nodemailer_1.default.createTransport(sendgridTransport({
    auth: {
        api_key: process.env.SENDGRID_API_KEY,
    },
}));
const checkForValidationError = (req) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        throw error;
    }
};
exports.checkForValidationError = checkForValidationError;
const checkForPasswordMatch = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        const error = new Error("Passwords do not match");
        throw error;
    }
};
exports.checkForPasswordMatch = checkForPasswordMatch;
const checkIfUserExists = (user) => {
    if (user) {
        const error = new Error("User with this email id already exists");
        throw error;
    }
};
exports.checkIfUserExists = checkIfUserExists;
const checkIfUserNotExists = (user) => {
    if (!user) {
        const error = new Error("User does not exist");
        throw error;
    }
};
exports.checkIfUserNotExists = checkIfUserNotExists;
const generateJwtToken = (userId, emailId) => {
    const token = jsonwebtoken_1.default.sign({
        emailId,
        userId,
    }, process.env.JWT_SECRET, { expiresIn: "48h" });
    return token;
};
exports.generateJwtToken = generateJwtToken;
const setPostCategory = (sourceName, category) => {
    if (sourceName === "newsOnAir" && category === "national")
        return "News on Air / National news";
    if (sourceName === "newsOnAir" && category === "international")
        return "News on Air / International news";
    if (sourceName === "newsOnAir" && category === "business")
        return "News on Air / Business news";
    if (sourceName === "newsOnAir" && category === "sports")
        return "News on Air / Sports news";
    if (sourceName === "presidentOfIndia" && category === "speeches")
        return "President of India / Speeches";
    if (sourceName === "presidentOfIndia" && category === "pressReleases")
        return "President of India / Press releases";
    if (sourceName === "idsa" && category === "comments and briefs")
        return "Institute for Defence Studies and Analysis / Comments and Briefs";
    if (sourceName === "prsIndia" && category === "blogs")
        return "PRS India / Blogs";
    if (sourceName === "prsIndia" && category === "articles")
        return "PRS India / Articles";
    if (sourceName === "nitiAayog" && category === "niti blogs")
        return "Niti Aayog / Niti blogs";
    if (sourceName === "pressInformationBureau" && category === "press releases")
        return "Press Information Bureau / Press releases";
    else
        return "";
};
exports.setPostCategory = setPostCategory;
const addDataToBookmark = (postData, userData, postId, postCategory) => {
    const postDate = postData.createdAt;
    const postURL = postData.url;
    const postTitle = postData.title;
    let oldBookmark = [...userData.bookmark];
    let updatedBookmark = oldBookmark.concat({
        id: postId,
        date: postDate,
        title: postTitle,
        url: postURL,
        category: postCategory,
    });
    return updatedBookmark;
};
exports.addDataToBookmark = addDataToBookmark;
const deleteDataFromBookmark = (userData, postId) => {
    let oldBookmark = [...userData.bookmark];
    let updatedBookmark = oldBookmark.filter((el) => el.id !== postId);
    return updatedBookmark;
};
exports.deleteDataFromBookmark = deleteDataFromBookmark;
const checkCryptoError = (err) => {
    if (err) {
        const error = new Error("Password reset error");
        throw error;
    }
};
exports.checkCryptoError = checkCryptoError;
const generateAndMailLinkToUser = (req) => {
    crypto_1.default.randomBytes(32, (err, buffer) => __awaiter(void 0, void 0, void 0, function* () {
        (0, exports.checkCryptoError)(err);
        const token = buffer.toString("hex");
        const user = yield (0, databaseFunctions_1.getUserFromDbUsingEmailId)(req.body.emailId);
        (0, exports.checkIfUserNotExists)(user);
        yield (0, databaseFunctions_1.addResetTokenToUser)(req.body.emailId, token);
        sendResetEmail(req.body.emailId, token);
    }));
};
exports.generateAndMailLinkToUser = generateAndMailLinkToUser;
const sendResetEmail = (emailId, token) => {
    return transport.sendMail({
        to: emailId,
        from: '"KneedUp" <hello@kneedup.com>',
        subject: "Reset password link",
        text: "You requested a password reset link. Here is the password reset link: http://localhost:3000/reset/${token}",
        html: `<p><h3>You requested a password reset link</h3></p>
           <p>Here is the password reset link: <a href="http://localhost:3000/reset/${token}">http://localhost:3000/reset/${token}</a></p>
 `,
    });
};
