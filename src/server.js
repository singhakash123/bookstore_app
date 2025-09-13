import dotenv from "dotenv";
import { db_connection } from "./db/index.js";
import { app } from "./app.js";

// ------------------- ENV CONFIG -------------------

dotenv.config({ path: "./.env" });

const port = process.env.PORT || 5000;


// ------------------- START SERVER -------------------
const startServer = async () => {
  try {
    await db_connection();
    console.log("✅ Database connected successfully");

    const server = app.listen(port, () => {
      console.log(`🚀 Server is running at http://localhost:${port}`);
    });

    server.on("error", (error) => {
      console.error("❌ Server-level error:", error);
      process.exit(1);
    });
    
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

startServer();
