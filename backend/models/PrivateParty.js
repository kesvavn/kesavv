import mongoose from "mongoose";

const privatePartySchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  status: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("PrivateParty", privatePartySchema);
