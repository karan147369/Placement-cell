const Student = require("../model/Student");
const getList = async function () {
  const List = await Student.find({}, { _id: 0 });
  return List;
};
module.exports = getList;
