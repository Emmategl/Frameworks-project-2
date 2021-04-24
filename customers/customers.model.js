import e from "express";
import * as fs from "fs/promises";
import {findproduct} from "../products/products.model.js";
import {getAllProducts} from "../products/products.model.js";
const CUSTOMERS_FILE = "./customers/customers.json";


/* CUSTOMERS */

// return a list of all customers
export async function getAllCustomers() {
  try {
    let customersTxt = await fs.readFile(CUSTOMERS_FILE);
    let customers = JSON.parse(customersTxt);
    return customers;
  } catch (err) {
    if (err.code === "ENOENT") {
      await save([]);
      return [];
    }
    else throw err;
  }
}

// save array of customers
export async function save(customers = []) {
  let customersTxt = JSON.stringify(customers);
  await fs.writeFile(CUSTOMERS_FILE, customersTxt);
}

// find specific customer
function findCustomer(customerArray, Id) {
  return customerArray.findIndex(
    (currCustomer) => currCustomer.customerId === Id
  );
}

// find index of specific product
function findProductIndex(customerArray, Id) {
  return customerArray.basket.findIndex(
    (currCustomer) => currCustomer.productId === Id
  );
}


// see if a product is in the basket of a specific customer
function findProductInBasket(customer, productIds) {
  let product = productIds.toString();
  for(var i = 0; i < customer.basket.length; i++) {
    if (customer.basket[i].productId == product) {
      return 1
    }}
  return -1
  }
 
// get customer by ID
export async function getCustomerByID(customerId) {
  let customerArray = await getAllCustomers();
  let index = findCustomer(customerArray, customerId);
  if (index === -1){
    throw new Error(`Customer with ID: ${customerId} doesn't exist`);
  }
  else {
    return customerArray[index];
  }
}

// create a new customer
export async function addCustomer(newCustomer) {
  let customerArray = await getAllCustomers();
  if (findCustomer(customerArray, newCustomer.customerId) !== -1 ){
    throw new Error(
      `Customer with ID: ${newCustomer.customerId} already exists`
    );
  }
  else{
  customerArray.push(newCustomer);
  await save(customerArray);
  } 
}

// update existing customer
export async function updateCustomer(customerId, customer) {
  let customerArray = await getAllCustomers();
  let index = findCustomer(customerArray, customerId); // findIndex
  if (index === -1){
    throw new Error(`Customer with ID: ${customerId} doesn't exist`);
  }
  else {
    customerArray[index] = customer;
    await save(customerArray);
  }
}

// delete existing customer
export async function removeCustomer(customerId) {
  let customerArray = await getAllCustomers();
  let index = findCustomer(customerArray, customerId); // findIndex
  if (index === -1){
    throw new Error(`Customer with ID: ${customerId} doesn't exist`);
  }
  else {
    customerArray.splice(index, 1); // remove customer from array
    await save(customerArray);
  }
}

/* BASKET */

// add a product to basket
export async function addToBasket(product, customerId) {
  let customerArray = await getAllCustomers();
  let productArray = await getAllProducts();
  let customerIndex = findCustomer(customerArray, customerId);
  if (customerIndex === -1){
    throw new Error(`Customer with ID: ${customerId} doesn't exist`);}
  let productIndex = findproduct(productArray, product.productId);
  if (productIndex === -1){
    throw new Error(`Product with ID: ${product.productId} doesn't exist`);}
  let isProductInBasket = findProductInBasket(customerArray[customerIndex], product.productId);
  if (isProductInBasket > -1){
    throw new Error(`Item with ID: ${product.productId} is already in the basket for customer with ID: ${customerId}`)} 
  else {
    customerArray[customerIndex].basket.push(product);
    await save(customerArray);
  }
  
}

// delete a product from a customers basket
export async function removeFromBasket(productIds, customerId) {
  let customerArray = await getAllCustomers();
  let index = findCustomer(customerArray, customerId); // findIndex
  if (index === -1){
    throw new Error(`Customer with ID: ${customerId} doesn't exist`);
  }
  let isProductInBasket = findProductInBasket(customerArray[index], productIds); // findIndex
  let productIndex = findProductIndex(customerArray[index], productIds); // findIndex
  if (isProductInBasket === -1){
      throw new Error(`Product with ID: ${productIds} is not in the basket for customer with ID: ${customerId}`);
  }
  else {
   customerArray[index].basket.splice(productIndex, 1)
    await save(customerArray);
  }
}

// get a specific basket by customer ID
export async function getSimpleBasket(customerId) {
  let currentBasket = []
  let customerArray = await getAllCustomers();
  let index = findCustomer(customerArray, customerId);
  if (index === -1){
    throw new Error(`Customer with ID: ${customerId} doesn't exist`);
  }
  else {
    for (let i = 0; i < customerArray[index].basket.length; i++) {
        currentBasket.push(customerArray[index].basket[i])
    }
    return currentBasket
  }
}

//display all product information inside customers basket
export async function getFullBasketInfo(customerId) {
  let productArray = await getAllProducts();
  let customerArray = await getAllCustomers();
  let index = findCustomer(customerArray, customerId);
  if (index === -1){
    throw new Error(`Customer with ID: ${customerId} doesn't exist`);
  }
  else {
    let displayBasket = displayProductInfo(productArray, customerArray[index].basket)
    return displayBasket
  }
}

// function to change from productId to full description of the specific product
export async function displayProductInfo(productArray, basket){
  let currentBasket = []
  let basketDescription = []
  for (let i = 0; i < basket.length; i++){
      currentBasket.push(basket[i].productId)
    }
  productArray.forEach(product=> {
      if(currentBasket.includes(product.productId)){
        basketDescription.push(product)
      }
  });
  basketDescription.forEach(elm=>delete elm.longDescription && delete elm.popularity)
  return basketDescription
}