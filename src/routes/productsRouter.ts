import express from "express";
import { ProductController } from "../controller/ProductsController";

export const productRouter = express.Router();

const productController = new ProductController();

productRouter.post("", productController.insertProcucts);
productRouter.post("/tag", productController.addTag);
productRouter.get("/search", productController.search);
