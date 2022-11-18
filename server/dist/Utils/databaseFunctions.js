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
exports.updateUserSubsDetailOnInvoiceFail = exports.updateUserSubsDetailOnInvoiceSuccess = exports.updateUserSubsDetailOnDeletion = exports.updateUserSubsDetailOnCreation = exports.insertManyPosts = exports.updateSourceStates = exports.getSourceUsingName = exports.updateSourceCurrentState = exports.updateUserCategory = exports.createNewUser = exports.updateUserBookmark = exports.setResetPasswordToUser = exports.addResetTokenToUser = exports.getPostWithSourcesField = exports.getUserFromDbUsingToken = exports.getUserFromDbUsingId = exports.getUserFromDbUsingEmailId = void 0;
const prisma = require("../../prisma/index.js");
const controllerFunctions_1 = require("./controllerFunctions");
const getUserFromDbUsingEmailId = (emailId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.users.findUnique({
        where: {
            emailId: emailId,
        },
    });
    return user;
});
exports.getUserFromDbUsingEmailId = getUserFromDbUsingEmailId;
const getUserFromDbUsingId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.users.findUnique({
        where: {
            id: userId,
        },
    });
    (0, controllerFunctions_1.checkIfUserNotExists)(user);
    return user;
});
exports.getUserFromDbUsingId = getUserFromDbUsingId;
const getUserFromDbUsingToken = (emailId, token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.users.findMany({
        where: {
            emailId: emailId,
            resetToken: token,
            resetTokenExpiration: {
                gte: Date.now(),
            },
        },
    });
    return user;
});
exports.getUserFromDbUsingToken = getUserFromDbUsingToken;
const getPostWithSourcesField = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield prisma.posts.findUnique({
        where: {
            id: postId,
        },
        include: {
            sources: true,
        },
    });
    return post;
});
exports.getPostWithSourcesField = getPostWithSourcesField;
const addResetTokenToUser = (emailId, token) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield prisma.users.update({
        where: {
            emailId,
        },
        data: {
            resetToken: token,
            resetTokenExpiration: Date.now() + 3600000,
        },
    });
    return updatedUser;
});
exports.addResetTokenToUser = addResetTokenToUser;
const setResetPasswordToUser = (emailId, password) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield prisma.users.update({
        where: {
            emailId: emailId,
        },
        data: {
            password: password,
            resetToken: null,
            resetTokenExpiration: null,
        },
    });
    return updatedUser;
});
exports.setResetPasswordToUser = setResetPasswordToUser;
const updateUserBookmark = (userId, updatedBookmark) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield prisma.users.update({
        where: {
            id: userId,
        },
        data: {
            bookmark: updatedBookmark,
        },
    });
    return updatedUser;
});
exports.updateUserBookmark = updateUserBookmark;
const createNewUser = (emailId, password) => __awaiter(void 0, void 0, void 0, function* () {
    const createdUser = yield prisma.users.create({
        data: {
            emailId: emailId,
            password: password,
            category: {
                news: true,
                president: true,
                niti: true,
                idsa: true,
                pib: true,
                prs: true,
            },
            bookmark: [],
            stripeUserId: null,
            subscriptionId: null,
            subscriptionStatus: false,
            resetToken: null,
            resetTokenExpiration: null,
        },
    });
    return createdUser;
});
exports.createNewUser = createNewUser;
const updateUserCategory = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { News, President, Niti, Idsa, Pib, Prs } = req.body;
    const updatedUser = yield prisma.users.update({
        where: {
            id: req.userId,
        },
        data: {
            category: {
                update: {
                    news: News,
                    president: President,
                    niti: Niti,
                    idsa: Idsa,
                    pib: Pib,
                    prs: Prs,
                },
            },
        },
    });
    return updatedUser;
});
exports.updateUserCategory = updateUserCategory;
const updateSourceCurrentState = (req, sourceName, articles) => __awaiter(void 0, void 0, void 0, function* () {
    const sourceData = yield prisma.sources.findUnique({
        where: {
            name: sourceName,
        },
    });
    const oldState = sourceData.data[req.category].oldState;
    const updatedSource = yield prisma.sources.update({
        where: {
            name: sourceName,
        },
        data: {
            data: {
                update: {
                    [req.category]: {
                        currentState: articles,
                        oldState: oldState,
                    },
                },
            },
        },
    });
});
exports.updateSourceCurrentState = updateSourceCurrentState;
const getSourceUsingName = (sourceName) => __awaiter(void 0, void 0, void 0, function* () {
    const sourceData = yield prisma.sources.findUnique({
        where: {
            name: sourceName,
        },
    });
    return sourceData;
});
exports.getSourceUsingName = getSourceUsingName;
const updateSourceStates = (sourceName, category, currentArticles, oldArticles) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedSource = yield prisma.sources.update({
        where: {
            name: sourceName,
        },
        data: {
            data: {
                update: {
                    [category]: {
                        currentState: currentArticles,
                        oldState: oldArticles,
                    },
                },
            },
        },
    });
});
exports.updateSourceStates = updateSourceStates;
const insertManyPosts = (articleGroup) => __awaiter(void 0, void 0, void 0, function* () {
    const createManyPosts = yield prisma.posts.createMany({
        data: articleGroup,
    });
});
exports.insertManyPosts = insertManyPosts;
const updateUserSubsDetailOnCreation = (userId, stripe_CustomerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.users.update({
            where: {
                id: userId,
            },
            data: {
                stripeUserId: stripe_CustomerId,
                subscriptionStatus: true,
            },
        });
    }
    catch (err) {
        console.log("Inform the administrator in some logger to update user details manually");
    }
});
exports.updateUserSubsDetailOnCreation = updateUserSubsDetailOnCreation;
const updateUserSubsDetailOnDeletion = (stripeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.users.update({
            where: {
                stripeUserId: stripeId,
            },
            data: {
                stripeUserId: null,
                subscriptionStatus: false,
            },
        });
    }
    catch (err) {
        console.log("Inform the administrator in some logger to update user details manually");
    }
});
exports.updateUserSubsDetailOnDeletion = updateUserSubsDetailOnDeletion;
const updateUserSubsDetailOnInvoiceSuccess = (stripeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.users.update({
            where: {
                stripeUserId: stripeId,
            },
            data: {
                stripeUserId: stripeId,
                subscriptionStatus: true,
            },
        });
    }
    catch (err) {
        console.log("Inform the administrator in some logger to update user details manually");
    }
});
exports.updateUserSubsDetailOnInvoiceSuccess = updateUserSubsDetailOnInvoiceSuccess;
const updateUserSubsDetailOnInvoiceFail = (stripeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.users.update({
            where: {
                stripeUserId: stripeId,
            },
            data: {
                stripeUserId: null,
                subscriptionStatus: false,
            },
        });
    }
    catch (err) {
        console.log("Inform the administrator in some logger to update user details manually");
    }
});
exports.updateUserSubsDetailOnInvoiceFail = updateUserSubsDetailOnInvoiceFail;
