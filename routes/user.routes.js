const router = require("express").Router();
const UserModel = require("../models/User.model")
const isAuthenticated = require("../middleware/isAuthenticated")

// router.get("/", async (req, res, next) => {
  
//   try {
//     const userParams = await res.send(users)
//     return userParams
//   } catch (error) {
//     next(err);
//   }
// });

router.get("/", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;

  try {
    const user = await UserModel.findById(_id)
    return res.json(user);
  } catch (error) {
    next(err);
  }
});
router.get("/:id", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;

  try {
    const user = await UserModel.findById(id)
    return res.json(user);
  } catch (error) {
    next(err);
  }
});

router.patch("/edit", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload
  const { username, email, nickName, city } = req.body
  try {
    const user = await UserModel.findByIdAndUpdate(_id, { username, email, nickName, city })
    return res.json("User updated");
  } catch (error) {
    next(error);
  }
});

router.delete("/delete", isAuthenticated, async (req, res, next) =>{
  const { _id } = req.payload
  try {
    await UserModel.findByIdAndDelete(_id)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
