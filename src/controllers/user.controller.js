const followmodel = require("../models/fllow.model")

async function followusercontroller(req, res) {
  const followerusername = req.user.username;
  const followeeusername = req.params.username;

  const followrecord = await followmodel.create({
    follower: followerusername,
    followee: followeeusername,
  });

  res.status(200).json({
    message: `you are now following ${followeeusername}`,
    followrecord,
  });
}

module.exports = {
  followusercontroller,
};
