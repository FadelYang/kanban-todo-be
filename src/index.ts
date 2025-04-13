import { PrismaClient } from "../generated/prisma";
import express, { Request, Response } from "express";
import createError from "http-errors";
import router from './routes';
import cookieParser from "cookie-parser"

export const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use(cookieParser());

app.use("/api/v1", router)

app.use((req: Request, res: Response, next: Function) => {
  next(createError(404));
});

app.listen(3001, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:3001`);
})