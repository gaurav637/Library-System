import mongoose, { Document, Schema, Model } from 'mongoose';
import { User } from '../intefaces/user.interface';
const bcrypt = require('bcrypt');

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

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) { 
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    }
    next();
});

UserSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate() as { password?: string }; ;
    if(update) {
        if(update.password) {
            const hassedPassword = await bcrypt.hash(update.password, 10);
            update.password = hassedPassword;
            this.setUpdate(update);
        }
    }
    next();
});


export const UserModel: Model<User & Document> = mongoose.model('User', UserSchema);