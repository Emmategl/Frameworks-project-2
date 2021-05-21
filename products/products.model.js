import e from "express";
import * as fs from "fs/promises";
const PRODUCTS_FILE = "./products/products.json";
import {save} from "../customers/customers.model.js";


/* PRODUCTS */

// return a list of all products and all details
export async function getAllProducts() {
  try {
    let productsTxt = await fs.readFile(PRODUCTS_FILE);
    let products = JSON.parse(productsTxt);
    return products;
  } catch (err) {
    if (err.code === "ENOENT") {
      await save([]);
      return [];
    }
    else throw err;
  }
}


// return af list of all product and the most important details
export async function getImportantProductInfo() {
  let newd = [];
  let productArray = await getAllProducts();
  newd = productArray.map(e=>Object.assign({},e))
  productArray.forEach(elm=>delete elm.longDescription && delete elm.popularity && delete elm.quantity)
  return productArray
}

// find specific product
export function findproduct(productsArray, Id) {
  return productsArray.findIndex(
    (currProduct) => currProduct.productId === Id
  );
}

// find specific product
export function findCategory(productsArray, category) {
  return productsArray.findIndex(
    (currProduct) => currProduct.category === category
  );
}

// find specific product
export function findPopularity(productsArray, popularity) {
  return productsArray.findIndex(
    (currProduct) => currProduct.popularity === popularity
  );
}

// get product by ID
export async function getProductByID(productId) {
  let productArray = await getAllProducts();
  let index = findproduct(productArray, productId);
  if (index === -1){
    throw new Error(`Product with ID: ${productId} doesn't exist`);
  }
  else {
    productArray.forEach(elm=>delete elm.quantity)
    return productArray[index];}
}

// return a list of all products in a given category
export async function getProductByCategory(categorys) {
  let productsByCategory = [];
  let productArray = await getAllProducts();
  let cat = findCategory(productArray, categorys);
  if(cat === -1){
    throw new Error(`Category with name: "${categorys}" doesn't exist`);}
  else{
  productsByCategory = productArray.filter(({category}) => category === categorys)
  productsByCategory.forEach(elm=>delete elm.longDescription && delete elm.popularity && delete elm.quantity)
  return productsByCategory}
}

// return a list of all the categories
export async function getProductCategories() {
  let productCategories = [];
  let productArray = await getAllProducts();

  productArray.forEach(element => {
    if (!productCategories.includes(element.category)){
      productCategories.push(element.category)
    }
  });
  
  return productCategories
}

// return a list of all products in a given category
export async function getProductByPopularity(popularitys) {
  let productsByCategory = [];
  console.log("helleo")
  let productArray = await getAllProducts();
  let cat = findPopularity(productArray, popularitys);
  if(cat === -1){
    throw new Error(`Product with popularity: "${popularitys}" doesn't exist`);}
  else{
  productsByCategory = productArray.filter(({popularity}) => popularity === popularitys)
  productsByCategory.forEach(elm=>delete elm.longDescription && delete elm.quantity)
  return productsByCategory}
}