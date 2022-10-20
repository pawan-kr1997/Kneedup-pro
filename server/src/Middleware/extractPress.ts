import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import cheerio from "cheerio";
import { ExtendedRequest, Article } from "../Utils/tscTypes";
import { updateSourceCurrentState } from "../Utils/databaseFunctions";
import { getExtractedPressArticles, getPressUrlAndReqCategory, pushToArticleArray } from "../Utils/middlewareFunctions";

export const extractPressData = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const { category } = req.params;
    let data = getPressUrlAndReqCategory(category);
    let url = data.url;
    req.sourceName = "pressInformationBureau";
    req.sourceId = "6347a494c407b13a61c22f78";
    req.category = data.reqCategory;

    try {
        const response: AxiosResponse = await axios.get(url);
        const html: string = response.data;
        const $: cheerio.Root = cheerio.load(html);
        const articles: Article[] = getExtractedPressArticles($, html);

        await updateSourceCurrentState(req, "pressInformationBureau", articles);
        next();
    } catch (err) {
        console.log(err);
    }
};
