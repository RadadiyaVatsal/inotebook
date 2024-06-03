const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://radadiyavatsal:radadiyavatsal@cluster0.y0ksldh.mongodb.net/";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectToMongo;
