import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import Post from "../models/postModel.js";

//signUp user

const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });
    console.log(user);

    if (user) {
      return res.status(400).json({ error: "user already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        bio: newUser.bio,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "invalid userdata" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("error in signup user: ", err.message);
  }
};

// Login user

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordIsCorrect = await bcrypt.compare(password, user?.password);

    if (!user || !isPasswordIsCorrect) {
      return res.status(400).json({ error: "invalid username or password" });
    }
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("error in login user: ", err.message);
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "user logout successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("error in logout user:" + err.message);
  }
};

const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user.id.toString())
      return res.status(400).json({ error: "cannot follow/unfollow yourself" }); // added toString() because of ProtectRoute give us the id as an object
    if (!userToModify || !currentUser)
      return res.status(400).json({ error: "user not found" });

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      //Unfollow user
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      res.status(200).json({ message: "user unfollowed successfully" });
    } else {
      //follow user
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      res.status(200).json({ message: "user followed successfully" });
    }
  } catch (err) {
    res.status(404).json({ error: err.message });
    console.log("error in follow/unfollow user:" + err.message);
  }
};

const updateUser = async (req, res) => {
  const { name, email, username, password, bio } = req.body;
  let { profilePic } = req.body;
  const userId = req.user._id;

  try {
    let user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "user not found" });
    if (req.params.id !== userId.toString())
      return res
        .status(400)
        .json({ error: "you cannot update other users profile" }); // added toString() because of ProtectRoute give us the id as an object

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    if (profilePic) {
      if (user.profilePic) {
        await cloudinary.uploader.destroy(
          //destroy() is feature provide by cloudinary SDK and we extract "ID" from the end of imgageURL and passed to destroy, it will destroy the cloudinary image.No needed to pass entire URL.
          user.profilePic.split("/").pop().split(".")[0]
        );
      }
      const uploadedResponse = await cloudinary.uploader.upload(profilePic);
      profilePic = uploadedResponse.secure_url;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    user = await user.save();

    //find all the posts that this user commented and update it with current username and profilepic data
    await Post.updateMany(
      {
        "replies.userId" : userId
      } , 
      {
        $set : {
          "replies.$[reply].username": user.username,
          "replies.$[reply].userProfilePic": user.ProfilePic
        }
      } ,
      {
        arrayFilters:[{"reply.userId":userId}]
      }
    )

    user.password = null ; // password should be null in response
    res.status(200).json(user);
  
} catch (err) {
    res.status(500).json({ error: err.message });
    console.log("error in update User" + err.message);
  }
};

const getUserProfile = async (req, res) => {
  // we will fetch  user profile with either username or userid
   const {query} = req.params;

  try {

    //if query is userId
    let user;
    if(mongoose.Types.ObjectId.isValid(query)){
      user = await User.findOne({_id: query}).select("-password").select("-updatedAt");
    } else {
       //if query is username
      user = await User.findOne({username: query}).select("-password").select("-updatedAt")
    }
    
    if (!user) return res.status(400).json({ error: "user not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("error in getUserProfile" + err.message);
  }
};
export {
  signupUser,
  loginUser,
  logoutUser,
  followUnfollowUser,
  updateUser,
  getUserProfile,
};
