import { Request } from "express";

export type Article = {
    title: string;
    url: string;
};

export type ExtendedRequestBody = {
    emailId?: string;
    password?: string;
    confirmPassword?: string;
    News?: string;
    President?: string;
    Niti?: string;
    Idsa?: string;
    Pib?: string;
    Prs?: string;
    token?: string;
};

declare global {
    namespace Express {
        export interface Request {
            sourceName?: string;
            sourceId: string;
            category: string;
            userId?: string;
        }
    }
}

export type ExtendedRequest = Request & {
    sourceName?: string;
    sourceId: string;
    category?: string | number | symbol | any;
    // category?: string;
    userId?: string;
};

export type ErrorWithStatus = Error & {
    status?: number;
};

export type JwtPayload = {
    userId: string;
};

export type User = {
    id: string;
    emailId: string;
    password: string;
    resetToken: string | undefined;
    resetTokenExpiration: Number | undefined;
    category: Object;
    bookmark: BookmarkData[];
};

export type SourceData = {
    currentState: Article[];
    oldState: Article[];
};

export type Source = {
    id: string;
    name: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
    data: {
        [key: string]: SourceData;
        articles: SourceData;
        blogs: SourceData;
        business: SourceData;
        international: SourceData;
        national: SourceData;
        sports: SourceData;
        pressReleases: SourceData;
        speeches: SourceData;
    };
};

export type Post = {
    id?: string;
    title: string;
    url: string;
    category: string;
    source: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export type ExtendedPost = Post & {
    sources: Source;
};

export type BookmarkData = {
    id: string;
    date?: Date;
    title: string;
    url: string;
    category: string;
};
