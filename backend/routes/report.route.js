import express from "express";
import { Hazard } from "../models/hazard.js";

export const router = express.Router();

// Add a new hazard
router.post("/add", async (req, res) => {
  try {
    const { hazardType, description, photo, hazardStage } = req.body;

    const newHazard = new Hazard({
      hazardType,
      description,
      photo,
      hazardStage
    });

    await newHazard.save();
    res.status(201).json({ message: "Hazard added", hazard: newHazard });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


router.get("/", async (req, res) => {
  try {
    const hazards = await Hazard.find();
    res.json(hazards);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});
