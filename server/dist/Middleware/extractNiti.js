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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractNitiData = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const databaseFunctions_1 = require("../Utils/databaseFunctions");
const middlewareFunctions_1 = require("../Utils/middlewareFunctions");
const extractNitiData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.params;
    let data = (0, middlewareFunctions_1.getNitiUrlAndReqCategory)(category);
    let url = data.url;
    req.sourceName = "nitiAayog";
    req.sourceId = "6347a46799ec30b8d6f5d825";
    req.category = data.reqCategory;
    try {
        const response = yield axios_1.default.get(url);
        const html = response.data;
        const $ = cheerio_1.default.load(html);
        const articles = (0, middlewareFunctions_1.getExtractedNitiArticles)($, html);
        yield (0, databaseFunctions_1.updateSourceCurrentState)(req, "nitiAayog", articles);
        next();
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.extractNitiData = extractNitiData;
