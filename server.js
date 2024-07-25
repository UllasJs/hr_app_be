require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const bodyparser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

// app.use(bodyparser.json());
app.use(express.json());
app.use(cors());

// // initialize router
const adminRoute = require("./router/adminRouter");

// // create routes for each routers
app.use("/admin", adminRoute);

app.listen(port, () => {
  console.log(`App Listening on port ${port}`);
});

const username = process.env.MONGO_USERNAME;
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const clusterUrl = process.env.MONGO_CLUSTER_URL;

mongoose
  .connect(`mongodb+srv://${username}:${password}@${clusterUrl}`, {})
  .then(() => console.log("Mongoose Connected!"))
  .catch((error) => console.log(error));
