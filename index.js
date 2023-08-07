if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
require("./config/database").connect();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const route = require("./route");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const flash = require("connect-flash");
const initializePassport = require("./config/passport-local-strategy");
const User = require("./model/user");
const methodOverride = require("method-override");

initializePassport(passport);
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(flash());

app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use(
  session({
    name: "PlacementCell",
    secret: process.env.sessionKey || "keyasdf",
    saveUninitialized: false,
    resave: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use("/", route);
app.listen(process.env.PORT || 4000, "0.0.0.0");
