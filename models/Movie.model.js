const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    movie: String,
    title: String,
    
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  
);

const MovieModel = model("Movie", movieSchema);

module.exports = MovieModel;
