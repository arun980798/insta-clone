const postmodels = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const postmodel = require("../models/post.model");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createpostcontroller(req, res) {
 
  const token = req.cookies.token

  if(!token){
    return res.status(401).json({
      message:"token not provided"
    })
  }

 let  decoded ;
  try{
       decoded = jwt.verify(token,process.env.JWT_SECRET)
  }catch(err){
return res.status(401).json({
message:"user not authorized"
})
  }
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder:"insta-clone"
  });

  const post = await postmodel.create({
    caption:req.body.caption ,
    imgurl:file.url ,
    user:decoded.id
  })

  res.status(201).json({
    message:"post created ",
    post
  })
}

module.exports = {
  createpostcontroller,
};
