const express = require("express");
const routing = express.Router();
const handleRegister = require("../controller/handleRegister");
const passport = require("passport");
const registerStudent = require("../controller/registerStudent");
const getStudentList = require("../controller/getStudentList");
const handleDeleteStudent = require("../controller/handleDeleteStudent");
const handleCsv = require("../controller/handleCsv");
const handleInterview = require("../controller/handleInterview");
const getInterviewList = require("../controller/getInterviewList");
var List = [];
var interviewList = [];
const checkAuthentication = async (req, res, next) => {
  List = await getStudentList();
  if (req.isAuthenticated()) return next();
  return res.render("home.ejs");
};
const checkNotAuthenticated = async (req, res, next) => {
  List = await getStudentList();
  if (req.isAuthenticated()) {
    return res.render("userPage.ejs", {
      name: req.user.name,
      studentList: List,
      message: "",
    });
  }
  next();
};

routing.get("/", checkAuthentication, (req, res) => {
  res.render("userPage.ejs", {
    name: req.user.name,
    studentList: List,
    message: "",
  });
});
routing.get("/get-csv", checkAuthentication, handleCsv);
routing.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/userPage",
    failuerRedirect: "/",
    failureFlash: true,
  })
);
routing.post("/registerstudent", checkAuthentication, registerStudent);

routing.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});

routing.post("/handleRegister", checkNotAuthenticated, async (req, res) =>
  handleRegister(req, res)
);

routing.get("/userPage", checkAuthentication, (req, res) =>
  res.render("userpage.ejs", {
    name: req.user.name,
    studentList: List,
    message: "",
  })
);
routing.get("/interview", checkAuthentication, async (req, res) => {
  interviewList = await getInterviewList();
  console.log(interviewList);
  return res.render("interview.ejs", {
    interviewList: interviewList,
    message: "",
  });
});
routing.post("/createInterview", checkAuthentication, handleInterview);
routing.delete("/logout", checkAuthentication, (req, res) => {
  req.logOut((err) => console.log(err));
  res.redirect("/login");
});
routing.delete("/deleteStudent", checkAuthentication, handleDeleteStudent);
routing.get("*", checkNotAuthenticated, (req, res) => {
  res.render("home.ejs");
});

module.exports = routing;
