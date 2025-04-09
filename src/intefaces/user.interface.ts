import mongoose from 'mongoose';

export interface User {
    name: string,
    email: string,
    password: string,
    phone: string,
    address: mongoose.Schema.Types.ObjectId,
    profileImage: string,
    isEmailVerified: boolean
}