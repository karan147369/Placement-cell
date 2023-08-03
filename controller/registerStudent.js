const Student = require("../model/Student");
const getStudentList = require("../controller/getStudentList");
const registerStudent = async (req, res) => {
  // check unique id;
  try {
    var List = [];
    List = await getStudentList();

    const id = await Student.findOne({ studentId: req.body.studentId });
    if (id === null) {
      const student = await Student.create({
        studentId: req.body.studentId,
        name: req.body.name,
        batch: req.body.batch,
        college: req.body.collegeName,
        dsa_score: parseInt(req.body.dsa_score),
        webd_score: parseInt(req.body.webd_score),
        react_score: parseInt(req.body.react_score),
        placed: req.body.placed === "True",
      });

      List = await getStudentList();

      if (student !== null) {
        res.render("userPage.ejs", {
          message: "Student successfully registered",
          studentList: List,
          name: req.user.name,
        });
      } else {
        res.render("userPage.ejs", {
          message: "some error occurred",
          studentList: List,
          name: req.user.name,
        });
      }
    } else {
      res.render("userPage.ejs", {
        message: "Enter unique Id",
        studentList: List,
        name: req.user.name,
      });
    }
  } catch (e) {
    res.render("userPage.ejs", {
      studentList: List,
      name: req.user.name,
      message: "Unexpected Error",
    });
  }
};
module.exports = registerStudent;
