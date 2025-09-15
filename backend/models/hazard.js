import mongoose from "mongoose";

const hazardSchema = new mongoose.Schema({
  hazardType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  photo: {
    type: String,
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  hazardStage: {
    type: String,
    enum: ["critical", "medium", "easy"], // only these values allowed
    default: "easy"
  }
}, { timestamps: true });

export const Hazard = mongoose.model("Hazard", hazardSchema);
