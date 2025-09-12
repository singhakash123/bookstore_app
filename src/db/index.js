import mongoose from "mongoose";
import { db_name } from "../constant.js";

export const db_connection = async () => {
  try {
    const connectionUri = `${process.env.MONGODB_URI}/${db_name}`;

    const connection = await mongoose.connect(connectionUri);

    console.log(`✅ Connected to MongoDB: ${db_name} at ${connection.connection.host}`);
    
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};



// In summary:
// exit(0) or process.exit(0): The program or process completed successfully.
// exit(1) or process.exit(1): The program or process terminated due to an error.