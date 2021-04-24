import * as customerModel from "./customers.model.js";

/* Customers */

export async function getAllCustomers(req, res) {
    try {
        let allCustomers = await customerModel.getAllCustomers();
        res.json(allCustomers);
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

export async function postCustomer(req, res) {
    try {
      let newCustomer = req.body;
      let productID = newCustomer.customerId
      await customerModel.addCustomer(newCustomer);
      res.status(200).send("Customer with ID: " +  productID + " created succesfully");
      res.end()
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }
  export async function getCustomer (req, res) {
    try {
      let id = parseInt(req.params.id)
      let customer = await customerModel.getCustomerByID(id);
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
      await customerModel.updateCustomer(id, customer);
      res.status(200).send("Details for customer with ID: " +  id + " updated succesfully");
      res.end();
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

  export async function deleteCustomer (req, res) {
    try {
      let id = parseInt(req.params.id)
      await customerModel.removeCustomer(id);
      res.status(200).send("Customer with ID: " + id + " deleted succesfully" );
      res.end();
    } catch (error) {
      // res.statusMessage=
      res.status(400).send(error.message);
    }
  }

/* Basket */

export async function postBasket(req, res) {
  try {
    let newProduct = req.body;
    let id = parseInt(req.params.id)
    let productId = newProduct.productId
    /* let customer = await customerModel.getByID(id); */
    await customerModel.addToBasket(newProduct, id);
    /* res.json({success: "created"}) */
    res.status(200).send("Product with ID: " + productId + " added to basket of costumer with ID: " + id + " succesfully");
    /* res.end() */
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

export async function deleteProduct (req, res) {
  try {
    let id = parseInt(req.params.id)
    let prodid = parseInt(req.params.prodid)
    await customerModel.removeFromBasket(prodid, id);
    res.status(200).send("Product with ID: " + prodid + " deleted from basket of costumer with ID: " + id + " succesfully");
    res.end();
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

export async function getBasket (req, res) {
  try {
    let id = parseInt(req.params.id)
    let basket = await customerModel.getSimpleBasket(id);
    res.json(basket);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}

export async function getBasketInfo (req, res) {
  try {
    let id = parseInt(req.params.id)
    let basket = await customerModel.getFullBasketInfo(id);
    res.json(basket);
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}
