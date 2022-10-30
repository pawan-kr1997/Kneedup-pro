import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { postRoutes } from "./Routes/Post";
import { userRoutes } from "./Routes/User";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(postRoutes);
app.use(userRoutes);

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json("" + error);
});

app.listen(8090, () => console.log("listening for port 8090"));
