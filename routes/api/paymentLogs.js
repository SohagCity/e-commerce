const router = require("express").Router();
let PaymentLogs = require("../../models/PaymentLogs.model");

router.route("/").get((req, res) => {
  PaymentLogs.find()
    .then((paymentLogs) => res.json(paymentLogs))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const paymentDetails = req.body.paymentDetails;
  const products = req.body.products;
  const total = Number(req.body.total);

  const newPaymentLogs = new PaymentLogs({
    name,
    address,
    paymentDetails,
    products,
    total,
  });

  newPaymentLogs
    .save()
    .then(() => res.json("PaymentLogs added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  PaymentLogs.findById(req.params.id)
    .then((paymentLogs) => res.json(paymentLogs))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  PaymentLogs.findByIdAndDelete(req.params.id)
    .then(() => res.json("PaymentLogs deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  PaymentLogs.findById(req.params.id)
    .then((paymentLogs) => {
      paymentLogs.name = req.body.name;
      paymentLogs.address = req.body.address;
      paymentLogs.paymentDetails = req.body.paymentDetails;
      paymentLogs.products = req.body.products;
      paymentLogs.total = Number(req.body.total);

      paymentLogs
        .save()
        .then(() => res.json("PaymentLogs updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

/*

{
    "name":"Tst",
    "address":"112 sooooos",
    "paymentDetails": {
        "paymentMethod":"card",
        "cardNo": 3222333456,
        "expiryDate" : "07/5"
    },
    "products":[
        {
        "title": "Smashed Iphone",
        "price": 2,
        "count": 1,
        "total": 12
        },
         {
        "title": "Samsung",
        "price": 2,
        "count": 0,
        "total": 0
        }
    ],
    "total":12
}

*/
