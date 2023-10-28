import mongoose from "mongoose";
import colors from "colors";

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.mongo_uri,
      connectionParams
    );
    console.log(`Connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error : ${error}`.bgRed.white);
  }
};

export default connectDB;
