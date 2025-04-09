import mongoose, { Document, Schema, Model } from 'mongoose';
import { User } from '../intefaces/user.interface';

const UserSchema = new Schema<User & Document>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        Ref: 'Address'
    },
    profileImage: {
        type: String,
        trim: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true}
);

export const UserModel: Model<User & Document> = mongoose.model('User', UserSchema);