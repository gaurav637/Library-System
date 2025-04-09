import mongoose, { Schema, Document, Model } from 'mongoose';
import { BorrowRecord } from '../intefaces/borrowRecord.interface';

const BorrowRecordSchema = new Schema<BorrowRecord & Document>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    borrowDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        required: true
    },
    fine: {
        type: Number
    }
}, { timestamps: true });

export const BorrowRecordModel: Model<BorrowRecord & Document> = mongoose.model<BorrowRecord & Document>('BorrowRecord', BorrowRecordSchema);
