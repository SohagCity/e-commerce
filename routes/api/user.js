const router = require("express").Router();
const passport = require("passport");
const JWT = require("jsonwebtoken");
let User = require("../../models/User.model");
let PaymentLogs = require("../../models/PaymentLogs.model");
let Product = require("../../models/Product.model");
const passportConfig = require("../../passport");
const mongoose = require("mongoose");

require("dotenv").config();

const signToken = (userID) => {
  return JWT.sign({ iss: "Sohag", sub: userID }, process.env.secretOrKey, {
    expiresIn: "1h",
  });
};

router.route("/register").post((req, res) => {
  const { username, password, role, firstName, lastName } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
      res
        .status(500)
        .json({ message: { msgBody: "Error has occured", msgError: true } });
    }
    if (user) {
      res.status(400).json({
        message: { msgBody: "Username is already taken", msgError: true },
      });
    } else {
      const newUser = new User({
        username,
        password,
        role,
        firstName,
        lastName,
      });
      newUser
        .save()
        .then(() => res.json("User added!"))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  });
});

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, role } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({
        isAuthenticated: true,
        user: { username, role },
      });
    }
  }
);
router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token", { path: "/" });
    res.json({
      user: {
        username: "",
        role: "",
        firstName: "",
        lastName: "",
      },
      success: true,
    });
  }
);

router.get(
  "/paymentLogs",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .populate({ path: "paymentLogs", populate: { path: "products" } })
      .exec((err, document) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true },
          });
        else {
          res
            .status(200)
            .json({ paymentLogs: document.paymentLogs, authenticated: true });
        }
      });
  }
);

router.post(
  "/paymentLogs/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const address = req.body.address;
    const cardName = req.body.card.name;
    const number = Number(req.body.card.number);
    const expiry = req.body.card.expiry;
    const cvv = Number(req.body.card.cvv);

    const total = Number(req.body.total);

    const paymentLog = new PaymentLogs({
      firstName,
      lastName,
      address,
      card: {
        name: cardName,
        number: number,
        expiry: expiry,
        cvv: cvv,
      },
      total,
      products: [],
    });

    const array = [];
    req.body.products.forEach((e) => {
      array.push(e._id);
    });
    /* Product.find({ _id: { $in: [...array] } }, (err, records) => {
      paymentLog.products.push(array);
    });
*/
    Product.find()
      .where("_id")
      .in(array)
      .exec((err, records) => {
        if (err) {
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true },
          });
        }
        paymentLog.products = records;
        console.log(records);

        paymentLog
          .save()
          .then(() => {
            req.user.paymentLogs.push(paymentLog);
            req.user
              .save()
              .then(() => res.json(paymentLog))
              .catch((err) => res.status(400).json("Error: " + err));
          })
          .catch((err) => res.status(400).json("Error: " + err));
      });
  }
);
/*
router.post(
  "/paymentLogs/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const paymentLog = new PaymentLogs(req.body);
    paymentLog.save((err) => {
      if (err)
        res
          .status(500)
          .json({ message: { msgBody: "Error has occured", msgError: true } });
      else {
        req.user.paymentLogs.push(paymentLog);
        req.user.save((err) => {
          if (err)
            res.status(500).json({
              message: { msgBody: "Error has occured", msgError: true },
            });
          else
            res.status(200).json({
              message: {
                msgBody: "Successfully created paymentLog",
                msgError: false,
              },
            });
        });
      }
    });
  }
);
*/
router.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role === "admin") {
      res.status(200).json("you are an admin");
    } else {
      res.status(403).json("you are not an admin");
    }
  }
);

router.get(
  "/auth",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
  }
);

module.exports = router;
