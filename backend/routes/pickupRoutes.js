const express = require("express");
const {
  getAllPickups,
  createPickup,
  updatePickup,
  deletePickup,
  getPickupDetails,
  getSinglePickup,
  myPickups,
  updatePickupStatus,
} = require("../controllers/pickupController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/admin/pickups").get(isAuthenticatedUser,authorizeRoles("superAdmin"),getAllPickups);

router.route("/pickup/new").post( createPickup);





router.route("/admin/pickup/:id").put(isAuthenticatedUser,authorizeRoles("superAdmin"), updatePickupStatus)
  .delete(isAuthenticatedUser,authorizeRoles("superAdmin"), deletePickup)
  .get(isAuthenticatedUser,authorizeRoles("superAdmin"), getSinglePickup); //Working

// router.route("/admin/applications/me").get(isAuthenticatedUser, myApplications);

module.exports = router;
