const Notification = require("../models/Notification");


// ==========================================
// CREATE MESSAGE NOTIFICATIONS
// ==========================================

const createMessageNotifications = async ({
  senderId,
  conversationId,
  messageId,
  receiverIds,
}) => {

  try {

    // Make sure receiverIds is an array

    if (!Array.isArray(receiverIds)) {

      console.log(
        "No receiver IDs provided for notification."
      );

      return [];

    }


    // ========================================
    // REMOVE SENDER FROM RECEIVERS
    // ========================================

    // The sender should never receive
    // a notification for their own message.

    const filteredReceiverIds =
      receiverIds.filter(

        (receiverId) =>

          receiverId.toString() !==
          senderId.toString()

      );


    // ========================================
    // CREATE NOTIFICATIONS
    // ========================================

    const notifications =
      await Promise.all(

        filteredReceiverIds.map(

          (receiverId) =>

            Notification.create({

              sender:
                senderId,

              receiver:
                receiverId,

              conversation:
                conversationId,

              message:
                messageId,

              isRead:
                false,

            })

        )

      );


    console.log(

      `${notifications.length} notification(s) created.`

    );


    return notifications;


  } catch (error) {

    console.error(

      "Create message notifications error:",

      error

    );


    // Return empty array instead of
    // crashing the message flow.

    return [];

  }

};


// ==========================================
// OPTIONAL: SINGLE NOTIFICATION FUNCTION
// ==========================================

const createNotification = async ({
  senderId,
  receiverId,
  conversationId,
  messageId,
}) => {

  try {

    // Don't notify sender

    if (

      senderId.toString() ===
      receiverId.toString()

    ) {

      return null;

    }


    const notification =
      await Notification.create({

        sender:
          senderId,

        receiver:
          receiverId,

        conversation:
          conversationId,

        message:
          messageId,

        isRead:
          false,

      });


    return notification;


  } catch (error) {

    console.error(

      "Create notification error:",

      error

    );


    return null;

  }

};


// ==========================================
// EXPORT BOTH FUNCTIONS
// ==========================================

module.exports = {

  createMessageNotifications,

  createNotification,

};