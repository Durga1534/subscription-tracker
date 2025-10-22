import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'User Name is required'],
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    email: {
        type: String,
        required: [true, 'User Email is required'],
        unique: true,
        trim: true,
        lowerCase: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter a valid email address'
        ],
    },
    password: {
        type: String,
        required: [true, 'User Password is required'],
        minLength: 6,
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;