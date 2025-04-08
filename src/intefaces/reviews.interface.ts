import mongoose from "mongoose";

export interface Reviews {
    userId: mongoose.Types.ObjectId,
    bookId: mongoose.Types.ObjectId,
    rating: Number,
    comments: string
}
