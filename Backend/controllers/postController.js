import Post from '../models/postModel.js'
import User from '../models/userModel.js'

const createPost = async (req , res) => {
    try {
        const { postedBy , text , image} = req.body;

        if(!postedBy || !text) return res.status(400).json({message: "please fill all the details"})

        const user = await User.findById(postedBy)
        if(!user) return res.status(400).json({message: "USER NOT FOUND"});

        if(user._id.toString() !== req.user._id.toString()) return res.status(400).json({message: "unauthorized to create a post"});
        const maxLength = 500;
        if(text.length > maxLength) return res.status(400).json({message: `Text must be less than ${maxLength} charactors`})

        const newPost = new Post({postedBy , text , image})
        await newPost.save();
        res.status(200).json({message: "Post saved successfully" , newPost});

    } catch (err) {
        res.status(500).json({message: err.message})
        console.log("error in posting" + err);
    }
}

const getPost = async ( req ,res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post) return res.status(404).json({message: "post not found"})

        res.status(200).json({post})
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

const deletePost = async (req ,res) => {
    try {
        const post = await Post.findOneAndDelete(req.params.id)
        res.status(200).json({message: "post deleted"})
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}
export {createPost , getPost , deletePost} ;