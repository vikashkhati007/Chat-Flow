import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("Database is Already Connected");
  }
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`);
    isConnected = true;
    console.log("Database is Connected");
  } catch (error) {
    console.log(error);
  }
};
