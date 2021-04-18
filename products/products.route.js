// index.js
import express from 'express'
import {getAllProducts, getProduct, getProductCategories, getProductByCategory, getImportantInfo} from './products.controler.js'

export const productRouter = express.Router();

// middleware specific to this route
productRouter.use(express.json())

// route handlers
productRouter.get("/products", getAllProducts);

productRouter.get("/products/info", getImportantInfo);

productRouter.get("/products/:id", getProduct);

productRouter.get("/product/categories", getProductCategories);

productRouter.get("/product/categories/:category", getProductByCategory);
