import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookieparser";

import authRoutes from "./routes/auth.route.js";
import todoRoutes from "./routes/todo.route.js";

//config
dotenv.config();
const PORT = process.env.PORT;

//app
const app = express();

//parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

//routes
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

//listen
app.listen(PORT, async () => {
  const host = await connectDB();
  if (host) {
    console.log(`Server started on port: ${PORT}`);
  } else {
    console.error("Failed to connect to db");
  }
});
