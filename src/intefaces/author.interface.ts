import mongoose from "mongoose";

export interface Author {
    name: string;
    bio: string;
    dob: Date;
    nationality: string;
    awards: string;
    website: string;
    profileImage: string;
    address: mongoose.Schema.Types.ObjectId;
}