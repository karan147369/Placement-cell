const Interview = require("../model/Interview");
const getList = require("../controller/getInterviewList");

const handleInterview = async (req, res) => {
  var List = [];
  //check if interview id exists
  try {
    const check = await Interview.find({ interviewId: req.body.interviewId });

    if (check.length === 0) {
      const response = await Interview.create({
        interviewId: req.body.interviewId,
        students: [{ studentId: req.body.studentId, result: false }],
        date: req.body.date,
        companyName: req.body.companyName,
      });
      List = await getList();
      res.render("interview.ejs", {
        message: "Interview Id created",
        interviewList: List,
      });
    } else {
      const studentarr = check[0].students;
      studentarr.push({
        studentId: req.body.studentId,
        result: false,
      });

      const response = await Interview.replaceOne(
        { interviewId: req.body.interviewId },
        {
          interviewId: req.body.interviewId,
          students: studentarr,
          date: req.body.date,
          companyName: req.body.companyName,
        }
      );
      List = await getList();
      res.render("interview.ejs", {
        message: "Interview details updated",
        interviewList: List,
      });
    }
  } catch (e) {
    res.render("interview.ejs", {
      message: "Something went wrong",
      interviewList: List,
    });
  }
};

module.exports = handleInterview;
