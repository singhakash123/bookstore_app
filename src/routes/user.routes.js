import { Router } from "express";
import { registerUser , loginUser} from "../controllers/user.controllers.js";

export const userRouter = Router()

userRouter.route('/register').post(registerUser)

userRouter.route('/login').post(loginUser)