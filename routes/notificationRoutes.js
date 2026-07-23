const express = require("express");

// Create router
const router = express.Router();


// ==========================================
// AUTHENTICATION MIDDLEWARE
// ==========================================

// We use your existing JWT middleware.
// This makes sure only logged-in users
// can access notification APIs.

const authMiddleware =
  require("../middleware/authMiddleware");


// ==========================================
// NOTIFICATION CONTROLLER
// ==========================================

const {
  getNotifications,
  markNotificationAsRead,
} = require("../controllers/notificationController");


// ==========================================
// GET ALL NOTIFICATIONS
// GET /api/notifications
// ==========================================

router.get(

  "/notifications",

  authMiddleware,

  getNotifications

);


// ==========================================
// MARK NOTIFICATION AS READ
// PATCH /api/notifications/:id/read
// ==========================================

router.patch(

  "/notifications/:id/read",

  authMiddleware,

  markNotificationAsRead

);


// ==========================================
// EXPORT ROUTER
// ==========================================

module.exports = router;