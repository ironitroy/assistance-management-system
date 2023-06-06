const express = require("express");
const {
  getAllApplications,
  createApplication,
  updateApplication,
  deleteApplication,
  getApplictionDetails,
  getSingleAppliction,
  myApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/admin/applications").get(getAllApplications);

router.route("/admin/application/new").post(isAuthenticatedUser, createApplication);





router.route("/admin/application/:id").put(isAuthenticatedUser,authorizeRoles("superAdmin"), updateApplicationStatus)
  .delete(isAuthenticatedUser,authorizeRoles("superAdmin"), deleteApplication).get(isAuthenticatedUser,authorizeRoles("superAdmin","admin"), getSingleAppliction); //Working

router.route("/admin/applications/me").get(isAuthenticatedUser, myApplications);

module.exports = router;
