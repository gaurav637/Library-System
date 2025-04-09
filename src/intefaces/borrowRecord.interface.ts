import mongoose  from 'mongoose'; 

export interface BorrowRecord {
    userId: mongoose.Types.ObjectId;
    bookId: mongoose.Types.ObjectId;
    borrowDate: Date;
    returnDate: Date;
    fine: number
}