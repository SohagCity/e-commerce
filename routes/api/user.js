const router = require("express").Router();
const passport = require("passport");
const JWT = require("jsonwebtoken");
let User = require("../../models/User.model");
const passportConfig = require("../../passport");

const signToken = (userID) => {
  return JWT.sign({ iss: "Sohag", sub: userID }, process.env.secretOrKey, {
    expiresIn: "1h",
  });
};

router.route("/register").post((req, res) => {
  const { username, password, role } = req.body;
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
      const newUser = new User({ username, password, role });
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
      res.cookie("access_token", token, { httpOnly: false, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
  }
);
router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { username: "", role: "" }, success: true });
  }
);

/* REQUIRE AUTH TO REQUEST
router.post(
    "/todo",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
     //REQUEST
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
