import mongoose, { Schema, Document, Model } from 'mongoose';
import { Book } from '../intefaces/book.interface';

const BookSchema = new Schema<Book & Document>({
    title: { 
        type: String, 
        required: true 
    },
    author: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Author', 
            required: true 
        }
    ],
    description: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    publishYear: { 
        type: Number, 
        required: true 
    },
    publisher: { 
        type: String, 
        required: true 
    },
    language: { 
        type: String,
        required: true
    },
    pages: { 
        type: Number, 
        required: true 
    },
    stock: { 
        type: Number, 
        required: true 
    },
    ratingAvg: { 
        type: Number, 
        default: 0 
    },
    ratingCount: { 
        type: Number,
        default: 0 
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reviews'
        }
    ]
},{ timestamps: true }
);

export const BookModel: Model<Book & Document> = mongoose.model('Book', BookSchema);