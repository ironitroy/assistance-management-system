const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require("../controllers/userController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");



router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);


router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("superAdmin"), getAllUser);
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("superAdmin"), getSingleUser).put(isAuthenticatedUser, authorizeRoles("superAdmin"), updateUserRole).delete(isAuthenticatedUser, authorizeRoles("superAdmin"), deleteUser);






module.exports = router;