import express from "express";

import { extractNewsData } from "../Middleware/extractNews";
import { uploadToSourceMidd } from "../Middleware/uploadToSource";
import { getPosts } from "../Controllers/Post";
import { extractIdsaData } from "../Middleware/extractIdsa";
import { extractNitiData } from "../Middleware/extractNiti";
import { extractPresidentData } from "../Middleware/extractPresident";
import { extractPressData } from "../Middleware/extractPress";
import { extractPrsData } from "../Middleware/extractPrs";

export const postRoutes = express.Router();

postRoutes.get("/newsOnAir/:category", extractNewsData, uploadToSourceMidd, getPosts);
postRoutes.get("/idsa/:category", extractIdsaData, uploadToSourceMidd, getPosts);
postRoutes.get("/nitiAayog/:category", extractNitiData, uploadToSourceMidd, getPosts);
postRoutes.get("/presidentOfIndia/:category", extractPresidentData, uploadToSourceMidd, getPosts);
postRoutes.get("/pressInformationBureau/:category", extractPressData, uploadToSourceMidd, getPosts);
postRoutes.get("/prsIndia/:category", extractPrsData, uploadToSourceMidd, getPosts);
