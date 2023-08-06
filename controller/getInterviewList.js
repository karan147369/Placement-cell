const Interview = require("../model/Interview");

const getInterviewList = async function () {
  const List = await Interview.find({});
  return List;
};
module.exports = getInterviewList;
