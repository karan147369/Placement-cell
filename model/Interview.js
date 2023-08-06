const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InterviewSchema = new Schema({
  interviewId: { type: String, required: true, unique: true },
  students: [
    {
      studentId: { type: String },
      result: { type: Boolean },
    },
  ],
  companyName: { type: String },
  date: { type: Date },
});
const Interview = mongoose.model("Interview", InterviewSchema);
module.exports = Interview;
