import express from "express";

import {customerRouter} from "./customers/customer.route.js";
import {quizzesRouter} from "./quizzes/quizzes.route.js";
const app = express();
const PORT = 3000;

// This is a built-in middleware function in Express. It parses incoming requests with JSON payloads.
app.use(express.json());

// paths handled by quizzesRouter
app.use(customerRouter)

// new addition!
// paths handled by quizzesRouter
app.use(quizzesRouter)

app.get("/", (req, res) => res.send("Server 3: Hello00 World!"));


// For invalid routes
app.get("*", (req, res) => {
  res.send("404! This is an invalid URL.");
});


app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
