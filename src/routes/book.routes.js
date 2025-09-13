import { Router } from "express";
import { getBooks , addBook } from "../controllers/book.controllers.js";


export const bookRouter = Router()

bookRouter.route('/').get(getBooks)
bookRouter.route("/add").post(addBook)