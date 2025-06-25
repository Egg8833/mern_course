import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/product.routes.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// 路由：首頁
app.get("/", (req, res) => {
  res.send("Hello, Mango!");
});

// 掛載產品相關路由
app.use("/api/product", productRouter);

// 啟動伺服器
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});