import express from "express";
import cloudinary from "../config/cloudinary.js";
import upload from "../middlewares/multer.js";
import {Hazard} from "../models/hazard.js"; // your mongoose model

const router = express.Router();

router.post("/add", upload.single("photo"), async (req, res) => {
  try {
    console.log("Req.body:", req.body);
    console.log("Req.file:", req.file);
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "reports" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      const newReport = new Hazard({
        hazardType: req.body.hazardType,
        description: req.body.description,
        photo: result.secure_url,
        hazardStage: req.body.hazardStage || "critical",
      });

      const savedReport = await newReport.save();
      return res.json(savedReport);
    } else {
      const newReport = new Hazard({
        hazardType: req.body.hazardType,
        description: req.body.description,
        photo: null,
        hazardStage: req.body.hazardStage || "critical",
      });

      const savedReport = await newReport.save();
      return res.json(savedReport);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/get", async (req, res) => {
  try {
    const reports = await Hazard.find({ isApproved: true }).sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reports" });
  }
})

export default router;
