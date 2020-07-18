const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PaymentLogsSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    paymentDetails: {
      paymentMethod: { type: String, required: true },
      cardNo: { type: Number, required: true },
      expiryDate: { type: String, required: true },
    },
    products: [
      {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        count: { type: Number, required: true },
        total: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const PaymentLogs = mongoose.model("PaymentLogs", PaymentLogsSchema);

module.exports = PaymentLogs;
