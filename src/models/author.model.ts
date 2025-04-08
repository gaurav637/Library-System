import mongoose, {Document, Schema, Model } from 'mongoose';
import { Author } from '../intefaces/author.interface';

const AuthorSchema = new Schema<Document & Author>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    bio: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: Date
    },
    nationality: {
        type: String,
        trim: true
    },
    awards: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    profileImage: {
        type: String,
        trim: true
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }
}, {timestamps: true}
);

export const AuthorModel: Model<Author & Document> = mongoose.model('Author', AuthorSchema);