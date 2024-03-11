import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Something went wrong" });
};
