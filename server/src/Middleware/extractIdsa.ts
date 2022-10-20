import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";
import cheerio from "cheerio";
import { ExtendedRequest, Article } from "../Utils/tscTypes";
import { updateSourceCurrentState } from "../Utils/databaseFunctions";
import { getExtractedIdsaArticles, getIdsaUrlAndReqCategory, pushToArticleArray } from "../Utils/middlewareFunctions";

export const extractIdsaData = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const category = req.params.category;
    let data = getIdsaUrlAndReqCategory(category);
    let url = data.url;
    req.sourceName = "idsa";
    req.sourceId = "6347a404985f6e3bc38f99da";
    req.category = data.reqCategory;

    try {
        const response: AxiosResponse = await axios.get(url);
        const html: string = response.data;
        const $: cheerio.Root = cheerio.load(html);
        const articles: Article[] = getExtractedIdsaArticles($);

        await updateSourceCurrentState(req, "idsa", articles);
        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
};
