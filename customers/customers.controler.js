import * as customerModel from "./customers.model.js";

export async function getAllCustomers(req, res) {
    try {
        let allCustomers = await customerModel.getAll();
        res.json(allCustomers);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

export async function postCustomer(req, res) {
    try {
      let newCustomer = req.body;
      await customerModel.add(newCustomer);
      res.end()
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }
  export async function getCustomer (req, res) {
    try {
      let id = parseInt(req.params.id)
      let customer = await customerModel.getByID(id);
      res.json(customer);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  export async function putCustomer  (req, res) {
    try {
      let id = parseInt(req.params.id)
      let customer = req.body;
      await customerModel.update(id, customer);
      res.end();
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  export async function deleteCustomer (req, res) {
    try {
      let id = parseInt(req.params.id)
      await customerModel.remove(id);
      res.end();
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

/* Basket */
export async function getBasket (req, res) {
  try {
    let id = parseInt(req.params.id)
    let basket = await customerModel.getBasketByID(id);
    res.json(basket);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}
export async function postBasket(req, res) {
  try {
    let newProduct = req.body;
    let id = parseInt(req.params.id)
    /* let customer = await customerModel.getByID(id); */
    await customerModel.addToBasket(newProduct, id);
    res.end()
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}


/* PRODUCTS*/
export async function getAllProducts(req, res) {
  try {
      let allProducts = await customerModel.getAllProducts();
      res.json(allProducts);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

export async function getProduct (req, res) {
  try {
    let id = parseInt(req.params.id)
    let product = await customerModel.getProductByID(id);
    res.json(product);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

export async function getProductCategories (req, res) {
  try {
    let productCat = await customerModel.getProductCategories();
    res.json(productCat);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

export async function getProductByCategory (req, res) {
  try {
    let category = req.params.category
    let productByCat = await customerModel.getProductByCategory(category);
    res.json(productByCat);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}