import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    const host = db.connection.host;
    return host;
  } catch (error) {
    console.error(`Error connecting to DB: ${error.message}`);
    process.exit(1);
  }
}
