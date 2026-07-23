const Notification = require("../models/Notification");


// ==========================================
// GET ALL NOTIFICATIONS
// GET /api/notifications
// ==========================================

const getNotifications = async (req, res) => {

  try {

    // ========================================
    // GET LOGGED-IN USER ID
    // ========================================

    // Your authentication middleware should
    // provide the logged-in user in req.user

    const userId =
      req.user._id || req.user.id;


    // ========================================
    // FIND USER NOTIFICATIONS
    // ========================================

    const notifications =
      await Notification.find({

        // Only get notifications
        // belonging to logged-in user

        receiver: userId,

      })

      // Get sender information

      .populate(
        "sender",
        "name email"
      )

      // Get conversation information

      .populate(
        "conversation"
      )

      // Get message information

      .populate(
        "message"
      )

      // Newest notifications first

      .sort({
        createdAt: -1,
      });


    // ========================================
    // SEND RESPONSE
    // ========================================

    return res.status(200).json({

      message:
        "Notifications fetched successfully",

      notifications,

    });


  } catch (error) {

    console.error(
      "Get notifications error:",
      error
    );


    return res.status(500).json({

      message:
        "Failed to fetch notifications",

      error:
        error.message,

    });

  }

};



// ==========================================
// MARK NOTIFICATION AS READ
// PATCH /api/notifications/:id/read
// ==========================================

const markNotificationAsRead =
  async (req, res) => {

    try {

      // ========================================
      // GET USER AND NOTIFICATION IDs
      // ========================================

      const userId =
        req.user._id || req.user.id;


      const notificationId =
        req.params.id;


      // ========================================
      // FIND NOTIFICATION
      // ========================================

      // IMPORTANT:
      //
      // We check both:
      //
      // 1. Notification ID
      // 2. Receiver ID
      //
      // This prevents one user from marking
      // another user's notification as read.

      const notification =
        await Notification.findOne({

          _id:
            notificationId,

          receiver:
            userId,

        });


      // ========================================
      // NOTIFICATION NOT FOUND
      // ========================================

      if (!notification) {

        return res.status(404).json({

          message:
            "Notification not found",

        });

      }


      // ========================================
      // MARK AS READ
      // ========================================

      notification.isRead =
        true;


      // Save changes

      await notification.save();


      // ========================================
      // SEND RESPONSE
      // ========================================

      return res.status(200).json({

        message:
          "Notification marked as read",

        notification,

      });


    } catch (error) {

      console.error(
        "Mark notification as read error:",
        error
      );


      return res.status(500).json({

        message:
          "Failed to mark notification as read",

        error:
          error.message,

      });

    }

  };



// ==========================================
// EXPORT CONTROLLERS
// ==========================================

module.exports = {

  getNotifications,

  markNotificationAsRead,

};