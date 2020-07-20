const router = require("express").Router();
const passport = require("passport");
const passportConfig = require("../../passport");

require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE);

router.post(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const intent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "gbp",
      // Verify your integration in this guide by including this parameter
      metadata: { integration_check: "accept_a_payment" },
    });
    res.send({ client_secret: intent.client_secret });
  }
);

module.exports = router;
