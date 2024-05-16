// src/models/course.ts
import { Schema, model, Document } from "mongoose";

interface ICourse extends Document {
  name: string;
  description: string;
  availableCredits: number;
  courseLevel: string;
  categoryType: string;
  courseCategory: string;
  courseSubCategory: string;
  state: string;
  county: string;
  institution: string;
  country: string;
}

const courseSchema = new Schema<ICourse>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  availableCredits: { type: Number, required: true },
  courseLevel: { type: String, required: true },
  categoryType: { type: String, required: true },
  courseCategory: { type: String, required: true },
  courseSubCategory: { type: String, required: true },
  state: { type: String, required: true },
  county: { type: String, required: true },
  institution: { type: String, required: true },
  country: { type: String, required: true },
});

// Create a text index on the name and description fields
courseSchema.index({ name: 'text', description: 'text' });

const Course = model<ICourse>("Course", courseSchema);
export default Course;
