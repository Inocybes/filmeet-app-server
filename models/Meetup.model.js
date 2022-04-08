const { Schema, model } = require("mongoose");

const meetUpSchema = new Schema({
  title: String,
  city: String,
  description: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  movie: String,
  type: [
    {
      type: String,
      required: true,
    },
  ],
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const MeetUpModel = model("MeetUp", meetUpSchema);

module.exports = MeetUpModel;
