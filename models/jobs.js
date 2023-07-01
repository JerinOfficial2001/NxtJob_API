const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema(
  {
    jobType: String,
    jobTitle: String,
    location: String,
    jobAddedBy: String,
    jobAddedDateOn: String,
    resumeName: { type: Number },
    coverLetterName: { type: Number },
    mockInterviewName: { type: Number },
    jobDescription: String,
    companyName: String,
    description: String,
    website: String,
    industry: String,
    employeesCount: String,
    address: String,
    notes: [
      {
        note: String,
      },
    ],
  },
  {
    collection: "job",
  }
);
mongoose.model("job", jobSchema);
