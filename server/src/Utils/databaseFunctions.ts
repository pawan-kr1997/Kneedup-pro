const prisma = require("../../prisma/index.js");

import { Article, BookmarkData, ExtendedPost, ExtendedRequest, ExtendedRequestBody, Post, Source, User } from "./tscTypes";
import { checkIfUserNotExists } from "./controllerFunctions";

export const getUserFromDbUsingEmailId = async (emailId: String | undefined): Promise<User> => {
    const user: User = await prisma.users.findUnique({
        where: {
            emailId: emailId,
        },
    });

    return user;
};

export const getUserFromDbUsingId = async (userId: String | undefined): Promise<User> => {
    const user = await prisma.users.findUnique({
        where: {
            id: userId,
        },
    });

    checkIfUserNotExists(user);

    return user;
};

export const getUserFromDbUsingToken = async (emailId: String, token: String | undefined): Promise<User> => {
    const user = await prisma.users.findMany({
        where: {
            emailId: emailId,
            resetToken: token,
            resetTokenExpiration: {
                gte: Date.now(),
            },
        },
    });

    return user;
};

export const getPostWithSourcesField = async (postId: String): Promise<ExtendedPost> => {
    const post: ExtendedPost = await prisma.posts.findUnique({
        where: {
            id: postId,
        },
        include: {
            sources: true,
        },
    });

    return post;
};

export const addResetTokenToUser = async (emailId: String, token: String): Promise<User> => {
    const updatedUser = await prisma.users.update({
        where: {
            emailId,
        },
        data: {
            resetToken: token,
            resetTokenExpiration: Date.now() + 3600000,
        },
    });

    return updatedUser;
};

export const setResetPasswordToUser = async (emailId: String, password: String): Promise<User> => {
    const updatedUser = await prisma.users.update({
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
};

export const updateUserBookmark = async (userId: String | undefined, updatedBookmark: BookmarkData[]): Promise<User> => {
    const updatedUser = await prisma.users.update({
        where: {
            id: userId,
        },
        data: {
            bookmark: updatedBookmark,
        },
    });

    return updatedUser;
};

export const createNewUser = async (emailId: String | undefined, password: String | undefined): Promise<User> => {
    const createdUser = await prisma.users.create({
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
};

export const updateUserCategory = async (req: ExtendedRequest): Promise<User> => {
    const { News, President, Niti, Idsa, Pib, Prs }: ExtendedRequestBody = req.body;

    const updatedUser = await prisma.users.update({
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
};

export const updateSourceCurrentState = async (req: ExtendedRequest, sourceName: String, articles: Article[]): Promise<void> => {
    const sourceData = await prisma.sources.findUnique({
        where: {
            name: sourceName,
        },
    });

    const oldState: Article[] = sourceData.data[req.category].oldState;

    const updatedSource = await prisma.sources.update({
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
};

export const getSourceUsingName = async (sourceName: String | undefined): Promise<Source> => {
    const sourceData = await prisma.sources.findUnique({
        where: {
            name: sourceName,
        },
    });

    return sourceData;
};

export const updateSourceStates = async (sourceName: string | undefined, category: string, currentArticles: Article[], oldArticles: Article[]): Promise<void> => {
    const updatedSource = await prisma.sources.update({
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
};

export const insertManyPosts = async (articleGroup: Post[]): Promise<void> => {
    const createManyPosts = await prisma.posts.createMany({
        data: articleGroup,
    });
};

export const updateUserSubsDetailOnCreation = async (userId: string, stripe_CustomerId: string | null) => {
    try {
        await prisma.users.update({
            where: {
                id: userId,
            },
            data: {
                stripeUserId: stripe_CustomerId,
                subscriptionStatus: true,
            },
        });
    } catch (err) {
        console.log("Inform the administrator in some logger to update user details manually");
    }
};

export const updateUserSubsDetailOnDeletion = async (stripeId: string) => {
    try {
        await prisma.users.update({
            where: {
                stripeUserId: stripeId,
            },
            data: {
                stripeUserId: null,
                subscriptionStatus: false,
            },
        });
    } catch (err) {
        console.log("Inform the administrator in some logger to update user details manually");
    }
};

export const updateUserSubsDetailOnInvoiceSuccess = async (stripeId: string) => {
    try {
        await prisma.users.update({
            where: {
                stripeUserId: stripeId,
            },
            data: {
                stripeUserId: stripeId,
                subscriptionStatus: true,
            },
        });
    } catch (err) {
        console.log("Inform the administrator in some logger to update user details manually");
    }
};
export const updateUserSubsDetailOnInvoiceFail = async (stripeId: string) => {
    try {
        await prisma.users.update({
            where: {
                stripeUserId: stripeId,
            },
            data: {
                stripeUserId: null,
                subscriptionStatus: false,
            },
        });
    } catch (err) {
        console.log("Inform the administrator in some logger to update user details manually");
    }
};
