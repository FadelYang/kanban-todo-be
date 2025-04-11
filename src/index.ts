import { PrismaClient } from "../generated/prisma";
import express, { Request, Response } from "express";
import createError from "http-errors";

export const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use((req: Request, res: Response, next: Function) => {
  next(createError(404));
});

app.listen(3000, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:3000`);
  
})