import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import cheerio from "cheerio";
import { ExtendedRequest, Article } from "../Utils/tscTypes";
import { updateSourceCurrentState } from "../Utils/databaseFunctions";
import { getExtractedPrsArticles, getPrsUrlAndReqCategory, pushToArticleArray } from "../Utils/middlewareFunctions";

export const extractPrsData = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const { category } = req.params;
    let data = getPrsUrlAndReqCategory(category);
    let url = data.url;
    req.sourceName = "prsIndia";
    req.sourceId = "6347a51b9ad6cdbb91a43788";
    req.category = data.reqCategory;

    try {
        const response: AxiosResponse = await axios.get(url);
        const html: string = response.data;
        const $: cheerio.Root = cheerio.load(html);
        const articles: Article[] = getExtractedPrsArticles($);

        await updateSourceCurrentState(req, "prsIndia", articles);
        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
};
