const Student = require("../model/Student");
const getList = require("../controller/getStudentList");
const handleDeleteStudent = async (req, res) => {
  var List = await getList();
  try {
    const student = await Student.deleteOne({ studentId: req.body.studentId });
    List = await getList();
    if (student !== null)
      res.render("userPage.ejs", {
        message: "Successfully deleted",
        studentList: List,
        name: req.user.name,
      });
    else {
      res.render("userPage.ejs", {
        message: "No such student found",
        studentList: List,
        name: req.user.name,
      });
    }
  } catch {
    res.render("userPage.ejs", {
      message: "Some error occured",
      studentList: List,
      name: req.user.name,
    });
  }
};
module.exports = handleDeleteStudent;
