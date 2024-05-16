
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import courseRoutes from "./routes/courseRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose.connect("mongodb://localhost:27017/courses")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err.message);
  });


// Routes
app.use("/api/courses", courseRoutes);

export default app;
