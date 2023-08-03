const User = require("../model/user");

const handleRegister = async (req, res) => {
  try {
    let response = await User.create({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    });
    if (response !== null) res.json({ success: true });
    else res.json({ success: false });
  } catch (err) {
    console.error("error catched: " + err.message);
  }
};

module.exports = handleRegister;
