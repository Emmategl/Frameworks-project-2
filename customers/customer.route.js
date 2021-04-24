// index.js
import express from 'express'
import {getBasketInfo, getAllCustomers, postCustomer, getCustomer,putCustomer, deleteCustomer, getBasket, postBasket, deleteProduct, putProductAmount, putProductIncrement, putProductDecrement} from './customers.controler.js'

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

customerRouter.put("/customers/:id/basket/:prodid", putProductAmount );

customerRouter.delete("/customers/:id/basket/:prodid", deleteProduct);

customerRouter.put("/customers/:id/basket/:prodid/1", putProductIncrement );

customerRouter.put("/customers/:id/basket/:prodid/-1", putProductDecrement );

customerRouter.get("/customers/:id/basket", getBasket);

customerRouter.get("/customers/:id/basketDetails", getBasketInfo);
