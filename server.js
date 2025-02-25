const express = require("express");
const app = express();
const homeRoutes = require("./routes/home");
const todoRoutes = require("./routes/todos");
const connectDB = require("./config/db");

require("dotenv").config({ path: "./config/.env" });

connectDB();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", homeRoutes);
app.use("/todos", todoRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening");
});
