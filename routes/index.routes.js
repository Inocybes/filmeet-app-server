const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated")

router.get("/", (req, res, next) => {
  res.json("A por ella");
});

// Routes here 👇


const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const movieRoutes = require("./movie.routes")
router.use("/movie", movieRoutes)

const meetupRoutes = require("./meetup.routes")
router.use("/meetup", meetupRoutes)

const commentRoutes = require("./comment.routes")
router.use("/comment", isAuthenticated, commentRoutes)

const userRoutes = require("./user.routes")
router.use("/user", isAuthenticated, userRoutes)

module.exports = router;
