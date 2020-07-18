const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PaymentLogsSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    card: {
      name: { type: String, required: true },
      cvv: { type: Number, required: true },
      cardNo: { type: Number, required: true },
      expiryDate: { type: String, required: true },
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    total: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const PaymentLogs = mongoose.model("PaymentLogs", PaymentLogsSchema);

module.exports = PaymentLogs;
