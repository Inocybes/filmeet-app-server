const router = require("express").Router();
const MeetupModel = require("../models/Meetup.model");
const isAuthenticated = require("../middleware/isAuthenticated");
const MeetUpModel = require("../models/Meetup.model");

// MeetUp Routes

// MeetUpList route -- all meetUps
router.get("/allMeetUp", async (req, res, next) => {
  
  try {
    const response = await MeetupModel.find().populate("creator")
    res.json(response);
  } catch (err) {
    next(err);
  }
});

// MeetUp by user route -- meetups created by logged user. We check it by isAuthenticated:
// const { _id } = req.payload;
// MeetupModel.find({creator: _id})

router.get("/meetUpList", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  console.log("this is for get the list of meetups")
  try {
    const response = await MeetupModel.find({ creator: _id });
    console.log(response)
    res.json(response);
  } catch (err) {
    next(err);
  }
});

router.get("/getmeetupbyid/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  
  try {
    const response = await MeetupModel.find({ movie: id });
    res.json(response);
  } catch (err) {
    next(err);
  }
});

//MeetUp Create

router.post("/newMeetUp", isAuthenticated, async (req, res, next) => {
  
  const { title, city, description, movie, type } = req.body;
  // console.log(req.body);
  // const { attendees } = req.params;
  
  try {
    const response = await MeetupModel.create({
      title,
      city,
      description,
      creator: req.payload._id,
      movie,
      movie: movie === "" ? 0 : movie,
      type,
      // attendees,
    });

    res.json(response);
  } catch (err) {
    next(err);
  }
});

//MeetUp edit

router.patch("/meetUpList/:id", isAuthenticated, async (req, res, next) => {
  const { _id } = req.payload;
  const { title, city, description, movie, type } = req.body;

  //indByIdAndUpdate needs 2 parameters
  try {
    const meetUpUpdated = await MeetupModel.findByIdAndUpdate(_id, {
      title,
      description,
      city,
      movie,
      type,
    });

    res.json(meetUpUpdated);
  } catch (err) {
    next(err);
  }
}),

router.delete("/meetUpList", isAuthenticated, async (req, res, next) => {
  // console.log(req.body.data)
  const id  = req.body.data
  try {
    await MeetUpModel.findByIdAndDelete({_id:id})
    res.json("Meet Up has been deleted")
  } catch(err) {
    next(err)
  }
  
})


module.exports = router
