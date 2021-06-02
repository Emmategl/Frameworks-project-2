// index.js
import express from 'express'
import {getAllProducts, getProduct, getProductCategories, getProductByCategory, getProductByCategoryId, getImportantInfo, getProductByPopularity} from './products.controler.js'
import cors from "cors"


export const productRouter = express.Router();
productRouter.use(cors())
// middleware specific to this route
productRouter.use(express.json())

// route handlers
productRouter.get("/products", getAllProducts);

productRouter.get("/products/info", getImportantInfo);

productRouter.get("/products/:id", getProduct);

productRouter.get("/product/categories", getProductCategories);

productRouter.get("/product/categories/:category", getProductByCategory);

productRouter.get("/product/category/:id", getProductByCategoryId);

productRouter.get("/product/popularity/:id", getProductByPopularity);