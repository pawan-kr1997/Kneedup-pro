import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import cheerio from "cheerio";
import { ExtendedRequest, Article } from "../Utils/tscTypes";
import { updateSourceCurrentState } from "../Utils/databaseFunctions";
import { getExtractedNewsArticles, getNewsUrlAndReqCategory, pushToArticleArray } from "../Utils/middlewareFunctions";

const prisma = require("../../prisma/index.js");

export const extractNewsData = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const { category } = req.params;
    let data = getNewsUrlAndReqCategory(category);
    let url = data.url;
    req.sourceName = "newsOnAir";
    req.sourceId = "6347a4bfb8b9fa87253aba0e";
    req.category = data.reqCategory;

    try {
        const response: AxiosResponse = await axios.get(url);
        const html: string = response.data;
        const $: cheerio.Root = cheerio.load(html);
        const articles: Article[] = getExtractedNewsArticles($, html);
        await updateSourceCurrentState(req, "newsOnAir", articles);

        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
};
