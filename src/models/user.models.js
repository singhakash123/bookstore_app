import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: { 
               type: String,
               required: true, 
               trim: true, 
               minlength: 8,
               unique: true,
               lowercase: true
         },
    email: { 
               type: String, 
               required: true, 
               unique: true,
               trim: true, 
               lowercase: true 
        },
    password: { 
                type: String,
                required: true, 
                minlength: 8, 
                select: false 
        },
    refreshToken: { 
                type: String, 
                
        },
    avatar: {
                type: String 
        },
    coverImage: { 
        type: String 
     },
    role: { 
        type: String, 
        enum: ["user", "owner"],
        default: "user" }
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


// Generate Access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { id: this._id, username: this.username, role: this.role, email: this.email },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY_DAY }
  );
};


// Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY_DAY }
  );
};


export const User = mongoose.model("User", userSchema);
