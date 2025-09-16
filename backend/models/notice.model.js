import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  targetAudience: {
    type: String,
    enum: ['all', 'residents', 'authorities', 'volunteers', 'specific'],
    default: 'all'
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  publishedAt: {
    type: Date
  },
  author: {
    type: String,
    default: 'Authority'
  },
  specificAreas: [{
    type: String
  }]
}, {
  timestamps: true
});

// Index for better query performance
noticeSchema.index({ status: 1, publishedAt: -1 });
noticeSchema.index({ targetAudience: 1 });

export default mongoose.model('Notice', noticeSchema);