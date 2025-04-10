import { BorrowRecordModel } from "../../models/borrowRecord.model"
import { UserModel } from "../../models/user.model";
import { BookModel } from "../../models/book.model";
import logger from '../../utils/logger';
import AppError from "../../utils/AppError";
import { getDataWithPagination } from "../../utils/pagination";

export const borrowRecordResolver = {

    Query: {
        getAllBorrowedBooks: async (_: any, { page, limit }: { page: number, limit: number }) => {
            try {
                logger.info("Get All Borrowed Book By UserId..");
                const data = await getDataWithPagination(
                    BorrowRecordModel, 
                    {}, 
                    page, 
                    limit
                );
                logger.info("Borrowed Books data fetched successfully..");
                return data;
            } catch (error) {
                logger.error("Error in getAllBorrowedBooks:", error);
                throw new AppError("Failed to fetch borrowed books.",500);
            }
        },

        getBorrowedBooksByUserId: async (_: any, {id}: {id: string}) => {
            try {
                logger.info("get all Borrowed Book for user ..",id);
                const records = await BorrowRecordModel.find({ userId: id});
                if (!records ) {
                    logger.info("No borrowed books found for this user.");
                    throw new AppError("No borrowed books found for this user.",404);
                }
                logger.info("Fetched successfully...");
                return records;
            } catch (error) {
                logger.error("Error in getBorrowedBooksByUserId:", error);
                throw new AppError("Failed to fetch borrowed books for user.",500);
            }
        }

    },
    Mutation: {
        markBookAsBorrowByUser: async (_: any, {borrowBookInput}: any) => {
            try {
                logger.info(`merk Book as Borrow by User...`);
                const { userId, bookId, borrowDate, returnDate } = borrowBookInput;
                const user = await UserModel.findById(userId);
                if (!user) {
                    logger.error(`User ${userId} Not Found!!`);
                    throw new AppError('User not found',404);
                }
                const book = await BookModel.findById(bookId);
                if (!book) {
                    logger.error(`Book ${bookId} Not Found!!`)
                    throw new AppError('Book not found',404);
                }
                const borrowRecord = await BorrowRecordModel.create({
                    userId,
                    bookId,
                    borrowDate,
                    returnDate
                });
                return borrowRecord;
            } catch(error) {
                logger.error("Failed to Mark book as borrowed!!",error);
                throw new AppError("Failed to Mark book as borrowed!",500);
            }
        },

        returnABorrowedBookByUser: async (_: any, { userId, bookId }: { userId: string, bookId: string }) => {
            try {
                logger.info(`Return a borrowed book:- ${bookId}`);
                const borrowRecord = await BorrowRecordModel.findOne({ userId, bookId });
                if (!borrowRecord) {
                    logger.error(`Book ${bookId} Not found!!`);
                    throw new AppError('Borrow record not found', 404);
                }     
                const today = new Date();
                let totalFine = 0;
                if (today > borrowRecord.returnDate) {
                    const extraDays = Math.ceil((today.getTime() - borrowRecord.returnDate.getTime()) / (1000 * 60 * 60 * 24));
                    totalFine = extraDays * 10;
                    borrowRecord.fine = totalFine;
                    await BorrowRecordModel.updateOne(
                        { _id: borrowRecord._id },
                        { $set: { fine: totalFine } }
                    );
                } else {
                    await BorrowRecordModel.deleteOne({ userId, bookId });
                }
        
                return borrowRecord;  
            } catch (error) {
                logger.error("Failed to Return a borrowed book", error);
                throw new AppError("Failed to Return a borrowed book", 500);
            }
        }
        
    }
}