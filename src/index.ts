import { PrismaClient } from "../generated/prisma";
import express, { Request, Response } from "express";
import createError from "http-errors";
import router from './routes';
import cookieParser from "cookie-parser";
import cors from "cors";

export const prisma = new PrismaClient();
const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "https://kanban-todo-fe.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use(cookieParser());

app.use("/api/v1", router);

app.use((req: Request, res: Response, next: Function) => {
  next(createError(404));
});

const PORT = process.env.PORT || 3001;

app.listen(+PORT, "0.0.0.0", () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});