import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { limit } from "./constant.js";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

// App configuration
export const app = express();

// --------------------- MIDDLEWARE SETUP ---------------------

// 1. Security Middlewares
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());


// 2. Body Parsing
app.use(express.json({ limit }));
app.use(express.urlencoded({ extended: true, limit }));


// 3. Static File Serving
app.use(express.static("public"));


// 4. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);


// 5. Logging
app.use(morgan("dev"));



// how to setup routes from here : 
import { router } from "./routes/index.js";


// --------------------- ROUTES ---------------------
app.use("/api/v1", router);



/*
🔥 Final Clean Endpoints:

POST /api/v1/user/register
POST /api/v1/user/login
GET /api/v1/book
POST /api/v1/book/add

               ✅ Final Clean Endpoints
POST http://localhost:8000/api/v1/user/register
POST http://localhost:8000/api/v1/user/login
POST http://localhost:8000/api/v1/book/add
GET http://localhost:8000/api/v1/book

*/