require("dotenv").config();
const express = require("express");
const app = express();
require("./startup/cors")(app);
require("./startup/db")();
require("./startup/routes")(app);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
