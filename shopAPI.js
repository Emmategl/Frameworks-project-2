import express from "express";
import {customerRouter} from "./customers/customer.route.js";
import {productRouter} from "./products/products.route.js";
const app = express();
const PORT = 3001;

// This is a built-in middleware function in Express. It parses incoming requests with JSON payloads.
app.use(express.json());

// paths handled
app.use(customerRouter)

app.use(productRouter)

// For invalid routes
app.get("*", (req, res) => {
  res.send("404! This is an invalid URL.");
});

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
