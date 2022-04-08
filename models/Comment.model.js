const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  movie: {
    type: Schema.Types.ObjectId,
    ref: "Movie"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const CommentModel = model("Comment", movieSchema);

module.exports = CommentModel;