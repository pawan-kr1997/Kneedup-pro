import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import cheerio from "cheerio";
import { ExtendedRequest, Article } from "../Utils/tscTypes";
import { updateSourceCurrentState } from "../Utils/databaseFunctions";
import { getExtractedNitiArticles, getNitiUrlAndReqCategory, pushToArticleArray } from "../Utils/middlewareFunctions";

export const extractNitiData = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const { category } = req.params;
    let data = getNitiUrlAndReqCategory(category);
    let url = data.url;
    req.sourceName = "nitiAayog";
    req.sourceId = "6347a46799ec30b8d6f5d825";
    req.category = data.reqCategory;

    try {
        const response: AxiosResponse = await axios.get(url);
        const html: string = response.data;
        const $: cheerio.Root = cheerio.load(html);
        const articles: Article[] = getExtractedNitiArticles($, html);

        await updateSourceCurrentState(req, "nitiAayog", articles);
        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
};
