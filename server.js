const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const uri = process.env.ATLS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const productRouter = require("./routes/api/Product");
app.use("/product", productRouter);

const paymentLogsRouter = require("./routes/api/PaymentLogs");
app.use("/paymentLogs", paymentLogsRouter);

const userRouter = require("./routes/api/User");
app.use("/user", userRouter);

const paymentRouter = require("./routes/api/Payment");
app.use("/payment", paymentRouter);

if (process.env.NODE_ENV === "production") {
  const root = require("path").join(__dirname, "client", "build");
  app.use(express.static(root));
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root });
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
