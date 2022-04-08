const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated")
const CommentModel = require("../models/Comment.model");

// Comment Routes



router.get("/comments", async (req, res, next) => {
  const { _id } = req.params;
  try {
    const response = await CommentModel.find(_id);
    res.json(response);
  } catch (err) {
    next(err);
  }
});

router.post("/comments/create", async (req, res, next) => {
  const { text, movieId, userId } = req.body;

  try {
    const response = await CommentModel.create({
      text,
      movieId,
      userId,
    }).populate();

    res.json(response);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const response = await CommentModel.findById(id);
    res.json(response);
  } catch (err) {
    next(err);
  }
});

// Delete Comments
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    await CommentModel.findByIdAndDelete(id);
    res.json("Delete Comment");
  } catch (err) {
    next(err);
  }
});

// Edit Comments
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    await CommentModel.findByIdAndUpdate(id, { text });
    res.json("Comment has been updated");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
