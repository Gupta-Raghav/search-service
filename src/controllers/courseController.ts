import { Request, Response } from "express";
import { searchCourses } from "../services/courseService";

export const search = async (req: Request, res: Response) => {
  try {
    const criteria = req.body;
    const results = await searchCourses(criteria);
    res.json(results);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ error: errorMessage });
  }
};
