import { Router } from "express";
import { bookRouter } from "./book.routes.js";
import { userRouter } from "./user.routes.js";

export const router =  Router()

// 
router.use('/user' , userRouter)
router.use('/book' , bookRouter)

