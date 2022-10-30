import { Request } from "express";
import { updateSourceStates } from "./databaseFunctions";
import { Article, ExtendedRequest, Post, Source } from "./tscTypes";

export const getNewsUrlAndReqCategory = (category: String) => {
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

export const getIdsaUrlAndReqCategory = (category: String) => {
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

export const getNitiUrlAndReqCategory = (category: String) => {
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

export const getPresidentUrlAndReqCategory = (category: String) => {
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

export const getPressUrlAndReqCategory = (category: String) => {
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

export const getPrsUrlAndReqCategory = (category: String) => {
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

export const getExtractedNewsArticles = ($: cheerio.Root, html: string) => {
    const articles: Article[] = [];

    $("h6", html).each(function (this: cheerio.Element) {
        const title = $(this).children("a").text();
        const url = $(this).children("a").attr("href");
        pushToArticleArray(title, url, articles, "newsonair.gov.in/");
    });

    return articles;
};

export const getExtractedIdsaArticles = ($: cheerio.Root) => {
    const articles: Article[] = [];
    const listItems = $(".view-content div");
    listItems.each((idx, el) => {
        const title = $(el).find("div").find("h2").find("a").text();
        let url = $(el).find("div").find("h2").find("a").attr("href");

        pushToArticleArray(title, url, articles, "www.idsa.in/");
    });

    return articles;
};

export const getExtractedPressArticles = ($: cheerio.Root, html: string) => {
    const articles: Article[] = [];

    $(".release_list li", html).each(function (this: cheerio.Element) {
        const title = $(this).find("a").text();
        const url = $(this).find("a").attr("href");
        pushToArticleArray(title, url, articles, "https://pib.gov.in/");
    });

    return articles;
};

export const getExtractedPresidentArticles = ($: cheerio.Root) => {
    const articles: Article[] = [];

    const listItems = $("li");

    listItems.each((idx, el) => {
        const title = $(el).children("p").text();
        const url = $(el).children("p").children("a").attr("href");
        pushToArticleArray(title, url, articles, "https://presidentofindia.nic.in/");
    });

    return articles;
};

export const getExtractedNitiArticles = ($: cheerio.Root, html: string) => {
    const articles: Article[] = [];

    $(".field-content", html).each(function (this: cheerio.Element) {
        const title = $(this).text();
        const url = $(this).children("a").attr("href");

        pushToArticleArray(title, url, articles, "https://www.niti.gov.in/");
    });

    return articles;
};

export const getExtractedPrsArticles = ($: cheerio.Root) => {
    const articles: Article[] = [];

    const listItems = $(".view-content div");
    listItems.each((idx, el) => {
        const title = $(el).find("div").find("div").find("div").find("h3").find("a").text();
        let url = $(el).find("div").find("div").find("div").find("h3").find("a").attr("href");

        pushToArticleArray(title, url, articles, "prsindia.org/");
    });

    return articles;
};

export const pushToArticleArray = (title: string, url: string | undefined, articleArray: Article[], urlPrefix: string) => {
    if (title !== "" && url && title) {
        articleArray.push({
            title: title.trim(),
            url: urlPrefix + url.trim(),
        });
    }
};

export const getEqualityIndex = (currentArticles: Article[], oldArticles: Article[]): number => {
    let index = currentArticles.length;
    for (let i = 0; i < currentArticles.length; i++) {
        if (oldArticles[0].title === currentArticles[i].title) {
            index = i;
            break;
        }
    }

    return index;
};

export const populateToBeAddedArticles = (articleArr: Article[], index: number, currentArticles: Article[]) => {
    for (let i = 0; i < index; i++) {
        articleArr.push({
            title: currentArticles[i].title,
            url: currentArticles[i].url,
        });
    }

    articleArr = articleArr.reverse();
};

export const populateArticleGroup = (toBeAddedArticles: Article[], category: string, sourceId: string) => {
    let articleGroup: Post[] = [];

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

export const updateSourceAndToBeAddedArticles = async (req: Request, oldArticles: Article[], currentArticles: Article[], toBeAddedArticles: Article[]) => {
    if (oldArticles.length === 0) {
        oldArticles = [...currentArticles];
        toBeAddedArticles = [...currentArticles];
        toBeAddedArticles = toBeAddedArticles.reverse();
        console.log("in 1");

        await updateSourceStates(req.sourceName, req.category, currentArticles, oldArticles);
    } else if (currentArticles[0].title === oldArticles[0].title) {
        oldArticles = [...currentArticles];
        console.log("in 2");
        await updateSourceStates(req.sourceName, req.category, currentArticles, oldArticles);
    } else {
        let index = getEqualityIndex(currentArticles, oldArticles);
        populateToBeAddedArticles(toBeAddedArticles, index, currentArticles);
        oldArticles = [...currentArticles];
        console.log("in 3");
        await updateSourceStates(req.sourceName, req.category, currentArticles, oldArticles);
    }
};
