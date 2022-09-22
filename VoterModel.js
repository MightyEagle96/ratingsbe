import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schema = new Schema({
  name: String,

  phoneNumber: String,

  dateRegistered: { type: Date, default: Date.now() },
  smsSent: { type: Boolean, default: false },
});

export default model("Voter", schema);

const facilitator = new Schema({
  instructor: String,
  topic: String,
  votes: { type: Number, default: 0 },
});

const facilitatorModel = model("Facilitator", facilitator);
export { facilitatorModel };

const votes = new Schema({
  voter: { type: Schema.Types.ObjectId, ref: "Voter" },
  facilitator: { type: Schema.Types.ObjectId, ref: "Facilitator" },
  votes: { type: Number, default: 0 },
});

const votesModel = model("Votes", votes);
export { votesModel };
