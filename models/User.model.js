const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "PaymentLogs" }],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.hash(this.password, 10, (err, passworHash) => {
    if (err) {
      return next(err);
    }
    this.password = passworHash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    } else {
      if (!isMatch) {
        return cb(null, isMatch);
      }
      return cb(null, this);
    }
  });
};

module.exports = mongoose.model("User", UserSchema);
