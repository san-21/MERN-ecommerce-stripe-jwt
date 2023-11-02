import mongoose from "mongoose";

export const mongoConnect = () =>
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((response) => {
      console.log("MongoDb successfully Connected");
    })
    .catch((error) => {
      console.log(`MongoDB Unable to connect:${error}`);
    });
