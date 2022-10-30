import { Request, Response, NextFunction } from "express";
import { getSourceUsingName, insertManyPosts } from "../Utils/databaseFunctions";
import { populateArticleGroup, updateSourceAndToBeAddedArticles } from "../Utils/middlewareFunctions";
import { Article, Post } from "../Utils/tscTypes";

const prisma = require("../../prisma/index.js");

export const uploadToSourceMidd = async (req: Request, res: Response, next: NextFunction) => {
    let currentArticles: Article[] = [];
    let oldArticles: Article[] = [];
    let toBeAddedArticles: Article[] = [];

    try {
        const sourceData = await getSourceUsingName(req.sourceName);
        currentArticles = [...sourceData.data[req.category].currentState];
        oldArticles = [...sourceData.data[req.category].oldState];

        await updateSourceAndToBeAddedArticles(req, oldArticles, currentArticles, toBeAddedArticles);

        let articleGroup: Post[] = populateArticleGroup(toBeAddedArticles, req.category, req.sourceId);

        console.log(toBeAddedArticles);
        if (toBeAddedArticles.length === 0) {
            return next();
        } else {
            await insertManyPosts(articleGroup);
            return next();
        }
    } catch (err) {
        console.log(err);
    }
};
