import * as productModel from "./products.model.js";

/* PRODUCTS*/

export async function getAllProducts(req, res) {
  try {
      let allProducts = await productModel.getAllProducts();
      res.json(allProducts);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

export async function getProduct (req, res) {
  try {
    let id = parseInt(req.params.id)
    let product = await productModel.getProductByID(id);
    res.json(product);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

export async function getProductByCategory (req, res) {
  try {
    let category = req.params.category
    let productByCat = await productModel.getProductByCategory(category);
    res.json(productByCat);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

export async function getImportantInfo (req, res) {
  try {
    let productInfo = await productModel.getImportantProductInfo();
    res.json(productInfo);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

export async function getProductCategories (req, res) {
  try {
    let productCat = await productModel.getProductCategories();
    res.json(productCat);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}