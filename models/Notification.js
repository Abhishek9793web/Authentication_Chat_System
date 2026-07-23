const mongoose = require("mongoose");


// ==========================================
// NOTIFICATION SCHEMA
// ==========================================

const notificationSchema = new mongoose.Schema(
  {
    // ========================================
    // USER WHO SENT THE MESSAGE
    // ========================================

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },


    // ========================================
    // USER WHO RECEIVES THE NOTIFICATION
    // ========================================

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },


    // ========================================
    // CONVERSATION
    // ========================================

    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },


    // ========================================
    // MESSAGE THAT CREATED NOTIFICATION
    // ========================================

    message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      required: true,
    },


    // ========================================
    // READ STATUS
    // ========================================

    isRead: {
      type: Boolean,
      default: false,
    },
  },


  // Automatically creates:
  //
  // createdAt
  // updatedAt

  {
    timestamps: true,
  }
);


// ==========================================
// CREATE MODEL
// ==========================================

const Notification = mongoose.model(
  "Notification",
  notificationSchema
);


// ==========================================
// EXPORT MODEL
// ==========================================

module.exports = Notification;