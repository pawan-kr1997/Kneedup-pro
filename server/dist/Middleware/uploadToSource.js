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
exports.uploadToSourceMidd = void 0;
const databaseFunctions_1 = require("../Utils/databaseFunctions");
const middlewareFunctions_1 = require("../Utils/middlewareFunctions");
const prisma = require("../../prisma/index.js");
const uploadToSourceMidd = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let currentArticles = [];
    let oldArticles = [];
    let toBeAddedArticles = [];
    try {
        const sourceData = yield (0, databaseFunctions_1.getSourceUsingName)(req.sourceName);
        currentArticles = [...sourceData.data[req.category].currentState];
        oldArticles = [...sourceData.data[req.category].oldState];
        yield (0, middlewareFunctions_1.updateSourceAndToBeAddedArticles)(req, oldArticles, currentArticles, toBeAddedArticles);
        let articleGroup = (0, middlewareFunctions_1.populateArticleGroup)(toBeAddedArticles, req.category, req.sourceId);
        console.log(toBeAddedArticles);
        if (toBeAddedArticles.length === 0) {
            return next();
        }
        else {
            yield (0, databaseFunctions_1.insertManyPosts)(articleGroup);
            return next();
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.uploadToSourceMidd = uploadToSourceMidd;
