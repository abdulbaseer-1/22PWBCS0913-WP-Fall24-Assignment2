import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'plese enter your username'],
            unique:false
        },
        email: {
            type: String,
            required: [true, 'plese enter your username'],
            unique:true
        },
        password: {
            type: String,
            required: [true, 'plese enter your username'],
            unique:false,
        }
    },
    {
        timestamps:true
    },
);

const User = new mongoose.model('User', UserSchema);

export default User;