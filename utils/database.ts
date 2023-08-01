import mongoose from "mongoose";

const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    return true;
  }
  try {
    await mongoose.connect(process.env.MongoDbUrl as string);
    console.log("Mongodb Connected");
    return true;
  } catch (error) {
    console.log(error);
  }
};
export default connectDb;
