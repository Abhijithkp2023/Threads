import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: 'string',
        required: true,
    },
    username: {
        type: 'string',
        required: true,
        unique: true,
    },
    email : {
        type: 'string',
        required: true,
        unique: true,
    },
    password: {
        type: 'string',
        minLength: 6,
        required: true,
    },
    profilepic: {
        type: 'string',
        default: ""
    },
    followers: {
        type: ['string'],
        default: [],
    },
    following: {
        type: ['string'],
        default: [],
    },
    bio :{
        type: 'string',
        default: ""
    }
}, {
    timestamps: true,
});

const User =  mongoose.model('User',userSchema);


export default User;