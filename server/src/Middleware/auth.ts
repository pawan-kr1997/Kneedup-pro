import { Request, Response, NextFunction } from "express";
import { ExtendedRequest, JwtPayload } from "../Utils/tscTypes";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(200).json({
                message: "Not logged In",
                category: { news: true, president: true, niti: true, idsa: true, pib: true, prs: true },
                data: [],
            });
        }

        let decodedToken;
        decodedToken = jwt.verify(token, "secretsecret") as JwtPayload;

        if (!decodedToken) {
            const error = new Error("not authenticated");
            throw error;
        }

        req.userId = decodedToken.userId;

        next();
    } catch (err) {
        next(err);
    }
};
