// index.js
import express from 'express'
import {getAllCustomers, postCustomer, getCustomer,putCustomer, deleteCustomer, getBasket, postBasket, getAllProducts, getProduct, getProductCategories, getProductByCategory, deleteProduct, getImportantInfo} from './customers.controler.js'

export const customerRouter = express.Router();

// middleware specific to this route
customerRouter.use(express.json())

// route handlers
customerRouter.get("/customers", getAllCustomers);
customerRouter.post("/customers", postCustomer);

customerRouter.get("/customers/:id", getCustomer);

customerRouter.put("/customers/:id",putCustomer );

customerRouter.delete("/customers/:id", deleteCustomer);

customerRouter.post("/customers/:id/basket", postBasket);

customerRouter.get("/customers/:id/basket", getBasket);

customerRouter.delete("/customers/:id/basket/:prodid", deleteProduct);

customerRouter.get("/products", getAllProducts);

customerRouter.get("/products/info", getImportantInfo);

customerRouter.get("/products/:id", getProduct);

customerRouter.get("/product/categories", getProductCategories);

customerRouter.get("/product/categories/:category", getProductByCategory);

/* customerRouter.put("/customers/:id/basket", changeBasket); */
/*  */
/* customerRouter.delete("/customers/:id/basket", DeleteFromBasket); */
