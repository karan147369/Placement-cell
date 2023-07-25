const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const route = require("./route");

app.use(express.static("assets"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/", route);
app.use(cors());

app.listen(process.env.PORT || 4000, "0.0.0.0", () => {});
