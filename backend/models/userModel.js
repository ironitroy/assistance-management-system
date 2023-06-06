const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


const userSchema = new mongoose.Schema({
  agency: {
    type: String,
    required: [true, "Please Enter Your Agency Name"],
    maxLength: [30, "Agency Name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter A Valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter A Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  phone: {
    type: String,
    required: [true, "Please Enter User's Phone No."],
  },
  caseManagerName: {
    type: String,
    required: [true, "Please Enter User's Name"]
  },
  address: {
    type: String,
    required: [true, "Please Enter User's Address"],
  },
  state: {
    type: String,
    required: [true, "Please Enter User's State"],
  },
  city: {
    type: String,
    required: [true, "Please Enter User's City"],
  },
  zipcode: {
    type: String,
    required: [true, "Please Enter User's Zip code"],
  },
  role: {
    type: String,
    default: "admin",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});



// Encrypt Password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});


// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};


// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};



// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);