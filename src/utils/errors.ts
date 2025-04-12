import { NextFunction, Response } from 'express';

export const checkError = (res: Response, next: NextFunction, error: any) => {
  if (error.name === "ZodError") {
    res.status(400).json({ error });
  }
  if (error.code === "P2002") {
    res.status(409).json({ message: "Duplicate field value", meta: error.meta });
  }
  if (error.code === "P2003") {
    res.status(409).json({ message: "You can't delete this item because there is item relate to it", meta: error.meta });
  }
  if (error.code === "P2025") {
    res.status(404).json({ message: "Record not found", meta: error.meta });
  }
  if (error.message === "Invalid credentials") {
    res.status(400).json({ error: "Email or password is wrong" });
  }  
  res.status(500).json({ message: "Internal Server Error", error });
  next(error);
};