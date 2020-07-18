const router = require("express").Router();
let Phone = require("../../models/Phone.model");

router.route("/").get((req, res) => {
  Phone.find()
    .then((phones) => res.json(phones))
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

  const newPhone = new Phone({
    title,
    img,
    price,
    company,
    info,
    inCart,
    count,
    total,
  });

  newPhone
    .save()
    .then(() => res.json("Phone added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Phone.findById(req.params.id)
    .then((phone) => res.json(phone))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Phone.findByIdAndDelete(req.params.id)
    .then(() => res.json("Phone deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Phone.findById(req.params.id)
    .then((phone) => {
      phone.title = req.body.title;
      phone.img = req.body.img;
      phone.price = Number(req.body.price);
      phone.company = req.body.company;
      phone.info = req.body.info;
      phone.inCart = Boolean(req.body.inCart);
      phone.count = Number(req.body.count);
      phone.total = Number(req.body.total);

      phone
        .save()
        .then(() => res.json("Phone updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
