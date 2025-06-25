import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js";

const router = express.Router();

// 路由：取得所有產品清單
router.get("/", getAllProducts);

// 路由：新增產品
router.post("/", createProduct);

// 路由：取得單一產品資料
router.get("/:id", getProductById);

// 路由：修改產品資料
router.put("/:id", updateProduct);

// 路由：刪除產品資料
router.delete("/:id", deleteProduct);

export default router;
