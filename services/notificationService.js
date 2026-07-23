const Notification = require("../models/Notification");


// ==========================================
// CREATE NOTIFICATION
// ==========================================

const createNotification = async ({
  senderId,
  receiverId,
  conversationId,
  messageId,
}) => {

  try {

    // ========================================
    // DON'T NOTIFY THE SENDER
    // ========================================

    // This is an extra safety check.
    // The sender should never receive
    // a notification for their own message.

    if (
      senderId.toString() ===
      receiverId.toString()
    ) {

      console.log(
        "Notification skipped: sender and receiver are the same user."
      );

      return null;

    }


    // ========================================
    // CREATE NOTIFICATION
    // ========================================

    const notification =
      await Notification.create({

        // User who sent the message
        sender: senderId,

        // User who should receive notification
        receiver: receiverId,

        // Conversation where message was sent
        conversation: conversationId,

        // Message that caused notification
        message: messageId,

        // New notification is unread
        isRead: false,

      });


    console.log(
      "Notification created:",
      notification._id
    );


    // Return notification

    return notification;


  } catch (error) {

    console.error(
      "Create notification error:",
      error
    );


    // Return null instead of breaking
    // the main message functionality.

    return null;

  }

};


// ==========================================
// EXPORT SERVICE
// ==========================================

module.exports = {
  createNotification,
};