import express from "express";
import Notice from "../models/notice.model.js";
import { sendPushNotification } from "../services/notification.service.js";

const router = express.Router();

// Get all notices (with filtering)
router.get("/", async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = status ? { status } : {};
    
    const notices = await Notice.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Notice.countDocuments(query);
    
    res.json({
      notices,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get published notices for users
router.get("/published", async (req, res) => {
  try {
    const { audience = 'all', page = 1, limit = 20 } = req.query;
    
    const notices = await Notice.find({
      status: 'published',
      $or: [
        { targetAudience: audience },
        { targetAudience: 'all' }
      ]
    })
    .sort({ publishedAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);
    
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new notice (draft)
router.post("/", async (req, res) => {
  try {
    const noticeData = {
      ...req.body,
      status: 'draft'
    };
    
    const notice = new Notice(noticeData);
    await notice.save();
    
    res.status(201).json(notice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a notice
router.put("/:id", async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }
    
    res.json(notice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Publish a notice
router.post("/:id/publish", async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    
    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }
    
    // Update notice status and publication date
    notice.status = 'published';
    notice.publishedAt = new Date();
    await notice.save();
    
    // Send push notification to users
    try {
      await sendPushNotification(notice);
    } catch (notificationError) {
      console.error("Push notification failed:", notificationError);
      // Don't fail the request if notification fails
    }
    
    res.json({ 
      message: "Notice published successfully", 
      notice 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a notice
router.delete("/:id", async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    
    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }
    
    res.json({ message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;