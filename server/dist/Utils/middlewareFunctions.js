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
exports.updateSourceAndToBeAddedArticles = exports.populateArticleGroup = exports.populateToBeAddedArticles = exports.getEqualityIndex = exports.pushToArticleArray = exports.getExtractedPrsArticles = exports.getExtractedNitiArticles = exports.getExtractedPresidentArticles = exports.getExtractedPressArticles = exports.getExtractedIdsaArticles = exports.getExtractedNewsArticles = exports.getPrsUrlAndReqCategory = exports.getPressUrlAndReqCategory = exports.getPresidentUrlAndReqCategory = exports.getNitiUrlAndReqCategory = exports.getIdsaUrlAndReqCategory = exports.getNewsUrlAndReqCategory = void 0;
const databaseFunctions_1 = require("./databaseFunctions");
const getNewsUrlAndReqCategory = (category) => {
    let url;
    let reqCategory;
    switch (category) {
        case "national":
            url = "https://newsonair.gov.in/National-News.aspx";
            reqCategory = "national";
            break;
        case "international":
            url = "https://newsonair.gov.in/International-News.aspx";
            reqCategory = "international";
            break;
        case "business":
            url = "https://newsonair.gov.in/Business-News.aspx";
            reqCategory = "business";
            break;
        case "sports":
            url = "https://newsonair.gov.in/Sports-News.aspx";
            reqCategory = "sports";
            break;
        default:
            url = "";
            reqCategory = "";
    }
    return { url, reqCategory };
};
exports.getNewsUrlAndReqCategory = getNewsUrlAndReqCategory;
const getIdsaUrlAndReqCategory = (category) => {
    let url;
    let reqCategory;
    switch (category) {
        case "commentsAndBriefs":
            url = "https://www.idsa.in/new";
            reqCategory = "comments and briefs";
            break;
        default:
            url = "";
            reqCategory = "";
    }
    return { url, reqCategory };
};
exports.getIdsaUrlAndReqCategory = getIdsaUrlAndReqCategory;
const getNitiUrlAndReqCategory = (category) => {
    let url;
    let reqCategory;
    switch (category) {
        case "nitiBlogs":
            url = "https://www.niti.gov.in/niti-blogs";
            reqCategory = "niti blogs";
            break;
        default:
            url = "";
            reqCategory = "";
    }
    return { url, reqCategory };
};
exports.getNitiUrlAndReqCategory = getNitiUrlAndReqCategory;
const getPresidentUrlAndReqCategory = (category) => {
    let url;
    let reqCategory;
    switch (category) {
        case "speeches":
            url = "https://presidentofindia.nic.in/speeches.htm";
            reqCategory = "speeches";
            break;
        case "pressReleases":
            url = "https://presidentofindia.nic.in/press-release.htm";
            reqCategory = "pressReleases";
            break;
        default:
            url = "";
            reqCategory = "";
    }
    return { url, reqCategory };
};
exports.getPresidentUrlAndReqCategory = getPresidentUrlAndReqCategory;
const getPressUrlAndReqCategory = (category) => {
    let url;
    let reqCategory;
    switch (category) {
        case "pressReleases":
            url = "https://www.pib.gov.in/indexd.aspx";
            reqCategory = "pressReleases";
            break;
        default:
            url = "";
            reqCategory = "";
    }
    return { url, reqCategory };
};
exports.getPressUrlAndReqCategory = getPressUrlAndReqCategory;
const getPrsUrlAndReqCategory = (category) => {
    let url;
    let reqCategory;
    switch (category) {
        case "blogs":
            url = "https://prsindia.org/theprsblog";
            reqCategory = "blogs";
            break;
        case "articles":
            url = "https://prsindia.org/articles-by-prs-team";
            reqCategory = "articles";
            break;
        default:
            url = "";
            reqCategory = "";
    }
    return { url, reqCategory };
};
exports.getPrsUrlAndReqCategory = getPrsUrlAndReqCategory;
const getExtractedNewsArticles = ($, html) => {
    const articles = [];
    $("h6", html).each(function () {
        const title = $(this).children("a").text();
        const url = $(this).children("a").attr("href");
        (0, exports.pushToArticleArray)(title, url, articles, "newsonair.gov.in/");
    });
    return articles;
};
exports.getExtractedNewsArticles = getExtractedNewsArticles;
const getExtractedIdsaArticles = ($) => {
    const articles = [];
    const listItems = $(".view-content div");
    listItems.each((idx, el) => {
        const title = $(el).find("div").find("h2").find("a").text();
        let url = $(el).find("div").find("h2").find("a").attr("href");
        (0, exports.pushToArticleArray)(title, url, articles, "www.idsa.in/");
    });
    return articles;
};
exports.getExtractedIdsaArticles = getExtractedIdsaArticles;
const getExtractedPressArticles = ($, html) => {
    const articles = [];
    $(".release_list li", html).each(function () {
        const title = $(this).find("a").text();
        const url = $(this).find("a").attr("href");
        (0, exports.pushToArticleArray)(title, url, articles, "https://pib.gov.in/");
    });
    return articles;
};
exports.getExtractedPressArticles = getExtractedPressArticles;
const getExtractedPresidentArticles = ($) => {
    const articles = [];
    const listItems = $("li");
    listItems.each((idx, el) => {
        const title = $(el).children("p").text();
        const url = $(el).children("p").children("a").attr("href");
        (0, exports.pushToArticleArray)(title, url, articles, "https://presidentofindia.nic.in/");
    });
    return articles;
};
exports.getExtractedPresidentArticles = getExtractedPresidentArticles;
const getExtractedNitiArticles = ($, html) => {
    const articles = [];
    $(".field-content", html).each(function () {
        const title = $(this).text();
        const url = $(this).children("a").attr("href");
        (0, exports.pushToArticleArray)(title, url, articles, "https://www.niti.gov.in/");
    });
    return articles;
};
exports.getExtractedNitiArticles = getExtractedNitiArticles;
const getExtractedPrsArticles = ($) => {
    const articles = [];
    const listItems = $(".view-content div");
    listItems.each((idx, el) => {
        const title = $(el).find("div").find("div").find("div").find("h3").find("a").text();
        let url = $(el).find("div").find("div").find("div").find("h3").find("a").attr("href");
        (0, exports.pushToArticleArray)(title, url, articles, "prsindia.org/");
    });
    return articles;
};
exports.getExtractedPrsArticles = getExtractedPrsArticles;
const pushToArticleArray = (title, url, articleArray, urlPrefix) => {
    if (title !== "" && url && title) {
        articleArray.push({
            title: title.trim(),
            url: urlPrefix + url.trim(),
        });
    }
};
exports.pushToArticleArray = pushToArticleArray;
const getEqualityIndex = (currentArticles, oldArticles) => {
    let index = currentArticles.length;
    for (let i = 0; i < currentArticles.length; i++) {
        if (oldArticles[0].title === currentArticles[i].title) {
            index = i;
            break;
        }
    }
    return index;
};
exports.getEqualityIndex = getEqualityIndex;
const populateToBeAddedArticles = (articleArr, index, currentArticles) => {
    for (let i = 0; i < index; i++) {
        articleArr.push({
            title: currentArticles[i].title,
            url: currentArticles[i].url,
        });
    }
    articleArr = articleArr.reverse();
};
exports.populateToBeAddedArticles = populateToBeAddedArticles;
const populateArticleGroup = (toBeAddedArticles, category, sourceId) => {
    let articleGroup = [];
    for (let i = 0; i < toBeAddedArticles.length; i++) {
        articleGroup.push({
            title: toBeAddedArticles[i].title,
            url: toBeAddedArticles[i].url,
            category: category,
            source: sourceId,
        });
    }
    return articleGroup;
};
exports.populateArticleGroup = populateArticleGroup;
const updateSourceAndToBeAddedArticles = (req, oldArticles, currentArticles, toBeAddedArticles) => __awaiter(void 0, void 0, void 0, function* () {
    if (oldArticles.length === 0) {
        oldArticles = [...currentArticles];
        toBeAddedArticles = [...currentArticles];
        toBeAddedArticles = toBeAddedArticles.reverse();
        console.log("in 1");
        yield (0, databaseFunctions_1.updateSourceStates)(req.sourceName, req.category, currentArticles, oldArticles);
    }
    else if (currentArticles[0].title === oldArticles[0].title) {
        oldArticles = [...currentArticles];
        console.log("in 2");
        yield (0, databaseFunctions_1.updateSourceStates)(req.sourceName, req.category, currentArticles, oldArticles);
    }
    else {
        let index = (0, exports.getEqualityIndex)(currentArticles, oldArticles);
        (0, exports.populateToBeAddedArticles)(toBeAddedArticles, index, currentArticles);
        oldArticles = [...currentArticles];
        console.log("in 3");
        yield (0, databaseFunctions_1.updateSourceStates)(req.sourceName, req.category, currentArticles, oldArticles);
    }
});
exports.updateSourceAndToBeAddedArticles = updateSourceAndToBeAddedArticles;
