import { Response, NextFunction } from "express";
import { ExtendedRequest } from "../Utils/tscTypes";
const prisma = require("../../prisma/index.js");

export const getPosts = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const posts = await prisma.posts.findMany({
            where: {
                source: req.sourceId,
                category: req.category,
            },
        });

        res.status(200).json({ message: "posts of sent", posts: posts });
    } catch (err) {
        console.log(err);
    }
};
