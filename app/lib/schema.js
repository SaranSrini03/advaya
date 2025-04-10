import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  events: [
    {
      type: String,
      required: true,
    },
  ],
});

export default mongoose.model("participants", userSchema);
