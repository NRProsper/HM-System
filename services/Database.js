import mongoose from "mongoose";
import configurations from "../configs/index.js";

/**
 * Connects to the MongoDB database using the configuration settings.
 * @returns {Promise<void>} A promise that resolves when the connection is established, or rejects with an error.
 */
export default function connectDB() {
  mongoose.connect(configurations.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => {
      console.error("Error connecting to MongoDB:", err.message);
      process.exit(1); // Exit process with failure
    });

}