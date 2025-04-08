import mongoose, {Schema, Document, Model } from 'mongoose';
import { Reviews } from "../intefaces/reviews.interface";

const ReviewsSchema = new Schema<Reviews & Document> ({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Book'
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comments: {
        type: String,
        required: true,
        trim: true,
    }
}, {timestamps: true}
);

export const ReviewsModel: Model<Reviews & Document> = mongoose.model('Reviews', ReviewsSchema);