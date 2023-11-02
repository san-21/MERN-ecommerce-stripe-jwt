import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
  email: { type: String, required: true, minLength: 3, maxLength: 100 },
  password: { type: String, required: true, minLength: 3 },
});

const User = mongoose.model("User", userSchema);
export default User;
