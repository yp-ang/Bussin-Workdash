const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/user");
const connectDB = require("./config/db");

connectDB();
// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  5000,
  console.log(`*** Server started on PORT ${PORT} ***`.yellow.bold)
);
