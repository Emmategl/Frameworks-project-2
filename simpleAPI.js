import express from "express";
import bodyParser from "body-parser";
const app = express();
const PORT = 3000;

app.use(express.json());
app.use((req, res, next) => {
  console.log("A new request received at " + Date.now());
  next();
});

app.get("/", (req, res) => res.send("Server 2: Hello World!"));

app.get("/customers/:id", (req, res) => {
  res.send(req.params);
});

app.get("/customers/:customerID/orders/:orderID", (req, res) => {
  res.send(req.params);
});

app.post("/customers/:id", (req, res) => {
  res.send(`{
    "parameters": ${JSON.stringify(req.params)}
    "body":${JSON.stringify(req.body) }
}`);
});

// For invalid routes
app.get("*", (req, res) => {
  res.send("404! This is an invalid URL.");
});

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", PORT);
});
