import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import cheerio from "cheerio";
import { ExtendedRequest, Article } from "../Utils/tscTypes";
import { updateSourceCurrentState } from "../Utils/databaseFunctions";
import { getExtractedPresidentArticles, getPresidentUrlAndReqCategory, pushToArticleArray } from "../Utils/middlewareFunctions";

export const extractPresidentData = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const { category } = req.params;
    let data = getPresidentUrlAndReqCategory(category);
    let url = data.url;
    req.sourceName = "presidentOfIndia";
    req.sourceId = "6347a4f5e6ef83808c2f8995";
    req.category = data.reqCategory;

    try {
        const response: AxiosResponse = await axios.get(url);
        const html: string = response.data;
        const $: cheerio.Root = cheerio.load(html);
        const articles: Article[] = getExtractedPresidentArticles($);

        await updateSourceCurrentState(req, "presidentOfIndia", articles);
        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
};
