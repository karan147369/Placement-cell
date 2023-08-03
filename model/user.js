const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { scryptSync, randomBytes } = require("crypto");

const UserSchema = new Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

UserSchema.pre("save", async function (next) {
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = scryptSync(this.password, salt, 64).toString("hex");
  this.password = `${hashedPassword}:${salt}`;
  next();
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
