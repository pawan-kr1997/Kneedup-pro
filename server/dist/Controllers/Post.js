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
exports.getPosts = void 0;
const prisma = require("../../prisma/index.js");
const getPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield prisma.posts.findMany({
            where: {
                source: req.sourceId,
                category: req.category,
            },
        });
        res.status(200).json({ message: "posts of sent", posts: posts });
    }
    catch (err) {
        console.log(err);
    }
});
exports.getPosts = getPosts;
