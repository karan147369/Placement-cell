const User = require("../model/user");
const { scryptSync } = require("crypto");

const handleLogin = async (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/userPage", { name: "x" });
  }
  try {
    const getUserDetails = await User.findOne({ email: req.body.email });
    const salt = getUserDetails.password.split(":")[1];
    const hashedPassword = scryptSync(req.body.password, salt, 64).toString(
      "hex"
    );
    const user = await User.findOne({
      email: req.body.email,
      password: `${hashedPassword}:${salt}`,
    });
    // console.log(user);
    if (user !== null) {
      res.redirect("/userPage");
    } else {
      res.redirect("back");
    }
  } catch (e) {
    console.log("LoginHandle Error: " + e.message);
  }
};

module.exports = handleLogin;
