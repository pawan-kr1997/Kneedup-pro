import { validationResult } from "express-validator";
import jwt, { Secret } from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

import { BookmarkData, ExtendedPost, ExtendedRequest, User } from "./tscTypes";
import { addResetTokenToUser, getUserFromDbUsingEmailId } from "./databaseFunctions";

const sendgridTransport = require("nodemailer-sendgrid-transport");

const transport = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: process.env.SENDGRID_API_KEY,
        },
    })
);

export const checkForValidationError = (req: ExtendedRequest): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        throw error;
    }
};

export const checkForPasswordMatch = (password: string | undefined, confirmPassword: string | undefined): void => {
    if (password !== confirmPassword) {
        const error = new Error("Passwords do not match");
        throw error;
    }
};

export const checkIfUserExists = (user: User): void => {
    if (user) {
        const error = new Error("User with this email id already exists");
        throw error;
    }
};

export const checkIfUserNotExists = (user: User): void => {
    if (!user) {
        const error = new Error("User does not exist");
        throw error;
    }
};

export const generateJwtToken = (userId: string, emailId: string): string => {
    const token = jwt.sign(
        {
            emailId,
            userId,
        },
        process.env.JWT_SECRET as Secret,
        { expiresIn: "48h" }
    );

    return token;
};

export const setPostCategory = (sourceName: string, category: string): string => {
    if (sourceName === "newsOnAir" && category === "national") return "News on Air / National news";

    if (sourceName === "newsOnAir" && category === "international") return "News on Air / International news";

    if (sourceName === "newsOnAir" && category === "business") return "News on Air / Business news";

    if (sourceName === "newsOnAir" && category === "sports") return "News on Air / Sports news";

    if (sourceName === "presidentOfIndia" && category === "speeches") return "President of India / Speeches";

    if (sourceName === "presidentOfIndia" && category === "pressReleases") return "President of India / Press releases";

    if (sourceName === "idsa" && category === "comments and briefs") return "Institute for Defence Studies and Analysis / Comments and Briefs";

    if (sourceName === "prsIndia" && category === "blogs") return "PRS India / Blogs";

    if (sourceName === "prsIndia" && category === "articles") return "PRS India / Articles";

    if (sourceName === "nitiAayog" && category === "niti blogs") return "Niti Aayog / Niti blogs";

    if (sourceName === "pressInformationBureau" && category === "press releases") return "Press Information Bureau / Press releases";
    else return "";
};

export const addDataToBookmark = (postData: ExtendedPost, userData: User, postId: string, postCategory: string): BookmarkData[] => {
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

export const deleteDataFromBookmark = (userData: User, postId: string): BookmarkData[] => {
    let oldBookmark = [...userData.bookmark];
    let updatedBookmark = oldBookmark.filter((el) => el.id !== postId);

    return updatedBookmark;
};

export const checkCryptoError = (err: Error | null) => {
    if (err) {
        const error = new Error("Password reset error");
        throw error;
    }
};

export const generateAndMailLinkToUser = (req: ExtendedRequest) => {
    crypto.randomBytes(32, async (err, buffer) => {
        checkCryptoError(err);
        const token: string = buffer.toString("hex");
        const user = await getUserFromDbUsingEmailId(req.body.emailId);

        checkIfUserNotExists(user);

        await addResetTokenToUser(req.body.emailId, token);
        sendResetEmail(req.body.emailId, token);
    });
};

const sendResetEmail = (emailId: string, token: string) => {
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
