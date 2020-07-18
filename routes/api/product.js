const router = require("express").Router();
let Product = require("../../models/Product.model");

router.route("/").get((req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const title = req.body.title;
  const img = req.body.img;
  const price = Number(req.body.price);
  const company = req.body.company;
  const info = req.body.info;
  const inCart = Boolean(req.body.inCart);
  const count = Number(req.body.count);
  const total = Number(req.body.total);

  const newProduct = new Product({
    title,
    img,
    price,
    company,
    info,
    inCart,
    count,
    total,
  });

  newProduct
    .save()
    .then(() => res.json("Product added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json("Product deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      product.title = req.body.title;
      product.img = req.body.img;
      product.price = Number(req.body.price);
      product.company = req.body.company;
      product.info = req.body.info;
      product.inCart = Boolean(req.body.inCart);
      product.count = Number(req.body.count);
      product.total = Number(req.body.total);

      product
        .save()
        .then(() => res.json("Product updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
