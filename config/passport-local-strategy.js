const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../model/user");
const { scryptSync } = require("crypto");

const initialize = function (passport) {
  const authenticateUser = async (email, password, done) => {
    const user = await User.findOne({ email: email });
    if (user === null)
      return done(null, false, { message: "No user with that email" });
    try {
      const userPassword = user.password;
      const salt = userPassword.split(":")[1];
      const hashedPassword = scryptSync(password, salt, 64).toString("hex");
      if (userPassword !== `${hashedPassword}:${salt}`) {
        return done(null, false, { message: "Password Incorrect" });
      } else {
        return done(null, user);
      }
    } catch (e) {
      return done(false, false, { message: "Error" });
    }
  };
  passport.use(
    new localStrategy(
      {
        usernameField: "email",
      },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);

      if (user === null) {
        console.error("Error in finding user --> password");
        return done(err);
      }
      return done(null, user);
    } catch (e) {
      return done(null, false, { message: "server error" });
    }
  });
};

module.exports = initialize;
