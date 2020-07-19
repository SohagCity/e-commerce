const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PaymentLogsSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    card: {
      name: { type: String, required: true },
      cvv: { type: Number, required: true },
      number: { type: Number, required: true },
      expiry: { type: String, required: true },
    },
    products: [
      {
        title: { type: String, required: true },
        img: { type: String, required: true },
        price: { type: Number, required: true },
        company: { type: String, required: false },
        info: { type: String, required: false },
        inCart: { type: Boolean, required: true },
        count: { type: Number, required: true },
        total: { type: Number, required: true },
      },
    ],
    //products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
    total: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const PaymentLogs = mongoose.model("PaymentLogs", PaymentLogsSchema);

module.exports = PaymentLogs;
