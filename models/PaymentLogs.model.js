const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PaymentLogsSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    total: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const PaymentLogs = mongoose.model("PaymentLogs", PaymentLogsSchema);

module.exports = PaymentLogs;
