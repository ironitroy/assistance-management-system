const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

  const { agency, email, password, phone, caseManagerName, address, state, city,role, zipcode } = req.body;

  const user = await User.create({
    agency, email, password, phone, caseManagerName, address, state, city, zipcode,role,
    avatar: {
      public_id: "This is an Sample id",
      url: "profilePicUrl"
    }
  });

  res.status(201).json({
    success: true,
    user,
  });
  // const token = user.getJWTToken();

  // sendToken(user, 201, res);
});



// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given Username & Password both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or password", 401));
  }

  const token = user.getJWTToken();


  sendToken(user, 200, res);
});


// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});



// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });


  // To be changed before deployment

  // const resetPasswordUrl = `${req.protocol}://${req.get( 
  //   "host"
  // )}/api/v1/password/reset/${resetToken}`;

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `<body style="font-family: Arial, sans-serif; color: #333333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #dddddd; border-radius: 5px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://makeahomefoundation.org/global_graphics/logo.png" alt="Logo" style="max-width: 150px; display: block; margin: 0 auto;">
       <h2 style="margin-top: 10px; text-align: center; font-size: 24px; color: #1E3A8A; letter-spacing: 2px; text-transform: uppercase; font-weight: bold;">Assistance Management System</h2>
      </div>
      <div style="margin-bottom: 20px;">
        <p>Your password reset token is:</p>
        <p style="font-weight: bold;">${resetPasswordUrl}</p>
      </div>
      <div style="margin-bottom: 30px;">
        <a href="${resetPasswordUrl}" style="display: inline-block; padding: 10px 20px; background-color: #1E3A8A; color: #ffffff; text-decoration: none; border-radius: 3px;">Reset Password</a>
      </div>
      <div style="font-size: 12px; color: #999999;">
        <p>If you have not requested this email, please ignore it.</p>
      </div>
    </div>
  </body>`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Assistance Management System Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});


// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});



// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});


// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    agency: req.body.agency,
    email: req.body.email,
    phone: req.body.phone,
    caseManagerName: req.body.caseManagerName,
    address: req.body.address,
    state: req.body.state,
    city: req.body.city,
    zipcode: req.body.zipcode,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});


// Get all users(Super Admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get single user (Super Admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});


// Update User Role -- (Super Admin)
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    agency: req.body.agency,
    email: req.body.email,
    phone: req.body.phone,
    caseManagerName: req.body.caseManagerName,
    address: req.body.address,
    state: req.body.state,
    city: req.body.city,
    zipcode: req.body.zipcode,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  // const imageId = user.avatar.public_id;

  // await cloudinary.v2.uploader.destroy(imageId);

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

