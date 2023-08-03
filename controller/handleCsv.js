const Student = require("../model/Student");
const { Parser } = require("json2csv");
const studentList = require("./getStudentList");
const fs = require("fs");
const handleCsv = async (req, res) => {
  const List = await studentList();
  const json2csv = new Parser();
  const csv = json2csv.parse(JSON.parse(JSON.stringify(List)));
  fs.writeFile("information.csv", csv, (err) => {});
  res.attachment("information.csv");
  res.send(csv);
};
module.exports = handleCsv;
