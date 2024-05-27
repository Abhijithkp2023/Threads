import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

const createPost = async (req, res) => {
  try {
    const { postedBy, text } = req.body;
    let { image } = req.body;

    if (!postedBy || !text)
      return res.status(400).json({ error: "please fill all the details" });

    const user = await User.findById(postedBy);
    if (!user) return res.status(400).json({ error: "USER NOT FOUND" });

    if (user._id.toString() !== req.user._id.toString())
      return res.status(400).json({ error: "unauthorized to create a post" });

    const maxLength = 500;
    if (text.length > maxLength) {
      return res
        .status(400)
        .json({ error: `Text must be less than ${maxLength} charactors` });
    }

    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image);
      image = uploadedResponse.secure_url;
    }

    const newPost = new Post({ postedBy, text, image });
    await newPost.save();
    res.status(200).json( newPost );
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("error in posting" + err);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "post not found" });

    res.status(200).json( post );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post)
    if (!post) return res.status(404).json({ message: "post not found" });

    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(400).json({ message: "unauthorized to delete a post" });
    }
    if(post.image){
      const imageId =  post.image.split("/").pop().split(".")[0]
      await cloudinary.uploader.destroy(imageId);
    } 

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "post deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const likeUnlikePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: "post not found" });

    const unserLikedPost = post.likes.includes(userId);
    if (unserLikedPost) {
      //unlike post
      await post.likes.pull(userId);
      await post.save();
      res.status(200).json({ message: "post unliked successfully" });
    } else {
      //like post
      post.likes.push(userId);
      await post.save();
      res.status(200).json({ message: "post liked successfully" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const replayToPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;
    const userProfilePic = req.user.profilePic;
    const username = req.user.username;

    if (!text)
      return res.status(400).json({ message: "Text filed is required" });

    const post = await Post.findById(postId);

    if (!post) return res.status(400).json({ message: "post not found" });

    const replay = { userId, text, userProfilePic, username };

    post.replies.push(replay);
    await post.save();

    res.status(200).json({ message: "Replay posted successfully", post });
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log("unable to replay post");
  }
};

const getFeedPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "user not found" });

    const following = user.following;

    const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({
      createdAt: -1,
    });

    res.status(200).json(feedPosts);
  } catch (err) {
    res.status(600).json({ error: err.message });
  }
};

const getUserPosts = async (req , res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "user not found" });
    const posts = await Post.find(
      { postedBy: user._id }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createPost,
  getPost,
  deletePost,
  likeUnlikePost,
  replayToPost,
  getFeedPosts,
  getUserPosts,
};
