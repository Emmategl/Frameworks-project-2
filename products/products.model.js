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
  productArray.forEach(elm=>delete elm.longDescription && delete elm.img_path && delete elm.popularity)
  return productArray
}


// find specific product
export function findproduct(productsArray, Id) {
  return productsArray.findIndex(
    (currProduct) => currProduct.productId === Id
  );
}

// get product by ID
export async function getProductByID(productId) {
  let productArray = await getAllProducts();
  let index = findproduct(productArray, productId);
  if (index === -1)
    throw new Error(`Product with ID:${productId} doesn't exist`);
  else return productArray[index];
}

// return a list of all products in a given category
export async function getProductByCategory(categorys) {
  let productsByCategory = [];
  let productArray = await getAllProducts();
  productsByCategory = productArray.filter(({category}) => category === categorys)
  productsByCategory.forEach(elm=>delete elm.longDescription && delete elm.img_path && delete elm.popularity)
  return productsByCategory

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