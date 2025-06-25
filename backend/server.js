import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import authRoutes from "./routes/auth.route.js";
import todoRoutes from "./routes/todo.route.js";
import userRoutes from "./routes/user.route.js";
//config
dotenv.config();
const PORT = process.env.PORT;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//app
const app = express();

//parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/todo", todoRoutes);

//listen
app.listen(PORT, async () => {
  const host = await connectDB();
  if (host) {
    console.log(`Server started on port: ${PORT}`);
  } else {
    console.error("Failed to connect to db");
  }
});
