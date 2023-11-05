import mongoose from "mongoose";

const CONNECTION_URL = "mongodb://127.0.0.1:27017/chat";

mongoose.connect(CONNECTION_URL);

mongoose.connection.on("connected", () => {
  console.log("mongoose connected");
});

mongoose.connection.on("disconnect", () => {
  console.log("mongoose disconnected");
});
