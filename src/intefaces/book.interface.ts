import mongoose from "mongoose";

export interface Book {
    title: string;
    author: mongoose.Types.ObjectId;
    description: string;
    category: string;
    price: number;
    publishYear: number;
    publisher: string;
    language: string;
    pages: number;
    stock: number;
    ratingAvg: number;
    ratingCount: number;
    // reviews: mongoose.Types.ObjectId
}