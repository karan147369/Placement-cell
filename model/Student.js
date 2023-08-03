const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  studentId: {
    type: String,
    required: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
  },
  batch: { type: String, required: true, uppercase: true },
  college: { type: String, required: true },
  dsa_score: { type: Number, required: true },
  webd_score: {
    type: Number,
    required: true,
  },
  react_score: {
    type: Number,
    required: true,
  },
  placed: {
    required: true,
    type: Boolean,
  },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
