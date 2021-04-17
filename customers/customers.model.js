import * as fs from "fs/promises";
const CUSTOMERS_FILE = "./customers/customers.json";
const PRODUCTS_FILE = "./customers/products.json";

// return all customer from file
export async function getAll() {
  try {
    let customersTxt = await fs.readFile(CUSTOMERS_FILE);
    let customers = JSON.parse(customersTxt);
    return customers;
  } catch (err) {
    if (err.code === "ENOENT") {
      // file does not exits
      await save([]); // create a new file with ampty array
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw err;
  }
}

// save array of customers to file
async function save(customers = []) {
  let customersTxt = JSON.stringify(customers);
  await fs.writeFile(CUSTOMERS_FILE, customersTxt);
}

// test function for customer ID
function findCustomer(customerArray, Id) {
  return customerArray.findIndex(
    (currCustomer) => currCustomer.customerId === Id
  );
}

// get customer by ID
export async function getByID(customerId) {
  let customerArray = await getAll();
  let index = findCustomer(customerArray, customerId);
  if (index === -1)
    throw new Error(`Customer with ID:${customerId} doesn't exist`);
  else return customerArray[index];
}

// create a new customer
export async function add(newCustomer) {
  let customerArray = await getAll();
  /* let basketArray = await getBasket(); */
  if (findCustomer(customerArray, newCustomer.customerId) !== -1 )
    throw new Error(
      `Customer with Id:${newCustomer.customerId} already exists`
    );
  customerArray.push(newCustomer);
  /* basketArray.push(newCustomer); */
  await save(customerArray);
  /* await save(basketArray); */
}

// update existing customer
export async function update(customerId, customer) {
  let customerArray = await getAll();
  let index = findCustomer(customerArray, customerId); // findIndex
  if (index === -1)
    throw new Error(`Customer with ID:${customerId} doesn't exist`);
  else {
    customerArray[index] = customer;
    await save(customerArray);
  }
}

// delete existing customer
export async function remove(customerId) {
  let customerArray = await getAll();
  let index = findCustomer(customerArray, customerId); // findIndex
  if (index === -1)
    throw new Error(`Customer with ID:${customerId} doesn't exist`);
  else {
    customerArray.splice(index, 1); // remove customer from array
    await save(customerArray);
  }
}

/*BASKET */

// add a product to basket
export async function addToBasket(product, customerId) {
  let customerArray = await getAll();
  let index = findCustomer(customerArray, customerId);
  /* customerArray.push(product) */
  customerArray[index].basket[1] = product
  await save(customerArray);
  /* await save(basketArray); */
}

export async function getBasketByID(customerId) { /* customerID */
  let customerArray = await getAll();
  let index = findCustomer(customerArray, customerId);
  if (index === -1)
    throw new Error(`Customer with ID:${customerId} doesn't exist`);
  else return customerArray[index].basket;
}

/* PRODUCTS */
// return all products from file
export async function getAllProducts() {
  try {
    let productsTxt = await fs.readFile(PRODUCTS_FILE);
    let products = JSON.parse(productsTxt);
    return products;
  } catch (err) {
    if (err.code === "ENOENT") {
      // file does not exits
      await save([]); // create a new file with ampty array
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw err;
  }
}

// test function for customer ID
function findproduct(productsArray, Id) {
  return productsArray.findIndex(
    (currProduct) => currProduct.productId === Id
  );
}


// get customer by ID
export async function getProductByID(productId) {
  let productArray = await getAllProducts();
  let index = findproduct(productArray, productId);
  if (index === -1)
    throw new Error(`Product with ID:${productId} doesn't exist`);
  else return productArray[index];
}

// get products categories
export async function getProductCategories() {
  let productsByCategory = [];
  let productArray = await getAllProducts();
  productsByCategory = productArray.filter(it => new RegExp('coffee').test(it.category))
  return productsByCategory
}

export async function getProductByCategory(categorys) {
  let productsByCategory = [];
  let productArray = await getAllProducts();
  productsByCategory = productArray.filter(it => new RegExp(categorys).test(it.category))
  return productsByCategory
}


// get all coffees
/* export async function getProductCategories() { */
/*   let productsByCategory = []; */
/*   let productArray = await getAllProducts(); */
/*   productsByCategory = productArray.filter(it => new RegExp('coffee').test(it.category)) */
/*   return productsByCategory */
/* } */


/* // return all products from file */
/* export async function getBasket() { /* customerID */
/*   try { */
/*     let basketTxt = await fs.readFile(BASKET_FILE); */
/*     let basket = JSON.parse(basketTxt); */
/*     return basket */
/*   } catch (err) { */
/*     if (err.code === "ENOENT") { */
/*       // file does not exits */
/*       await save([]); // create a new file with ampty array */
/*       return []; // return empty array */
/*     } // // cannot handle this exception, so rethrow */
/*     else throw err; */
/*   } */
/* } */
/*  */
/* export async function getBasketByID(customerId) { /* customerID */
/*   let customerArray = await getAll(); */
/*   let basketArray = await getBasket(); */
/*   let index = findCustomer(customerArray, customerId); */
/*   if (index === -1) */
/*     throw new Error(`Customer with ID:${customerId} doesn't exist`); */
/*   else return basketArray[index]; */
/* } */