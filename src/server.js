import dotenv from "dotenv"
import { db_connection } from "./db/index.js";

dotenv.config({
     path : "./.env"
})

db_connection()