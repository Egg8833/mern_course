import Product from "../models/product.model.js";
import mongoose from "mongoose";

// 取得所有產品清單
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("查詢 product list 發生錯誤:", err);
    res.status(500).json({ message: "Failed to fetch product list." });
  }
};

// 新增產品
export const createProduct = async (req, res) => {
  const { name, price, description } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required." });
  }
  try {
    const newProduct = new Product({ name, price, description });
    await newProduct.save();
    res.status(201).json({ message: "Product created successfully!", product: newProduct });
  } catch (err) {
    console.error("儲存 product 發生錯誤:", err);
    res.status(500).json({ message: "Failed to create product." });
  }
};

// 取得單一產品資料
export const getProductById = async (req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID." });
  }
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.json(product);
  } catch (err) {
    console.error("查詢單一 product 發生錯誤:", err);
    res.status(500).json({ message: "Failed to fetch product." });
  }
};

// 修改產品資料
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID." });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.json({ message: "Product updated successfully!", product: updatedProduct });
  } catch (err) {
    console.error("更新 product 發生錯誤:", err);
    res.status(500).json({ message: "Failed to update product." });
  }
};

// 刪除產品資料
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID." });
  }
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.json({ message: "Product deleted successfully!", product: deletedProduct });
  } catch (err) {
    console.error("刪除 product 發生錯誤:", err);
    res.status(500).json({ message: "Failed to delete product." });
  }
};
