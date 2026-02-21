const followmodel = require("../models/fllow.model")
const userModel = require("../models/user.model")
//follow user controller
async function followusercontroller(req, res) {
  const followerusername = req.user.username;
  const followeeusername = req.params.username;

  if (followerusername === followeeusername) {
    return res.status(400).json({
      message: "you cannot follow yourself"
    })
  }


   const isFolloweeExists = await userModel.findOne({
        username: followeeusername
    })

    if (!isFolloweeExists) {
        return res.status(404).json({
            message: "User you are trying to follow does not exist"
        })
    }


  const isalreadyfollowing = await followmodel.findOne({
    follower: followerusername,
    followee: followeeusername,
  })
  if (isalreadyfollowing) {
    return res.status(200).json({
      message: `you are already following ${followeeusername}`,
      followrecord: isalreadyfollowing
    })
  }

  const followrecord = await followmodel.create({
    follower: followerusername,
    followee: followeeusername,
  });




  res.status(200).json({
    message: `you are now following ${followeeusername}`,
    followrecord,
  });
}

//unfollow user controller
async function unfollowusercontroller(req, res) {
  const followerusername = req.user.username;
  const followeeusername = req.params.username;

  const isuserfollowing = await followmodel.findOne({
    follower: followerusername,
    followee: followeeusername,
  })
  if (!isuserfollowing) {
    return res.status(400).json({
      message: `you are not following ${followeeusername}`,
    })
  }
  await followmodel.findByIdAndDelete(isuserfollowing._id);

  res.status(200).json({
    message: `you have unfollowed ${followeeusername}`,
  }); 
}

module.exports = {
  followusercontroller,
  unfollowusercontroller,
};
