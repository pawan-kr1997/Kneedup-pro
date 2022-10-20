import express, { Request, Response, NextFunction } from "express";
import { postRoutes } from "./Routes/Post";
import { userRoutes } from "./Routes/User";

const app = express();
app.use(express.json());

app.use(postRoutes);
app.use(userRoutes);

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json("" + error);
});

app.listen(8090, () => console.log("listening for port 8090"));
