import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

export const verifyAccessToken = asyncHandler(async function (req, res, next) {
  // 1️⃣ Get token from cookies OR Authorization header
  const token =
    req.cookies?.accessToken ||
    req.headers.authorization?.replace("Bearer ", "").trim();

  if (!token) {
    throw new ApiError(401, "Access token is missing");
  }

  // 2️⃣ Verify token
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);

  // 3️⃣ Find user
  const user = await User.findById(decoded.id).select("-password");
  if (!user) {
    throw new ApiError(401, "User not found with this token");
  }

  // 4️⃣ Attach user to request for next middlewares/controllers
  req.user = user;
  next();
  
});
