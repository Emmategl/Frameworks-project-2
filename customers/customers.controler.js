import * as customerModel from "./customers.model.js";

/* Customers */

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

export async function deleteProduct (req, res) {
  try {
    let id = parseInt(req.params.id)
    let prodid = parseInt(req.params.prodid)
    await customerModel.removeFromBasket(prodid, id);
    res.end();
  } catch (error) {
    // res.statusMessage=
    res.status(400).send(error.message);
  }
}


