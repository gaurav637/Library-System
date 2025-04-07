import { BookModel } from "../../models/book.model";
import logger from "../../utils/logger";
import AppError from "../../utils/appError"

export const bookResolvers = {
    Query: {
        getAllBooks: async () => {
            try {
                logger.info("Get All Books..");
                const books =  await BookModel.find();
                logger.info(`${books.length} Books Get Successfully.`);
                return books;
            } catch(error) {
                logger.error(`Failed to during get all Books Data ${error}`);
                throw new AppError('Failed to get All Books',500);
            }
        },

        getBookById: async (_: any, { id }: {id: string}) => {
            try {
                logger.info(`Get Book By Id:- ${id}`);
                const book = await BookModel.findById(id);
                if(!book) {
                    logger.warn(`${id} Book Not Found!!`);
                    throw new AppError(`Book ${id} Not Found..`, 404);
                }
                logger.info(`${id} Fetched Successfully..`);
                return book;
            } catch(error) {
                logger.error(`Failed to get Book by Id: ${id}`);
                throw new AppError('Failed to get Book By ID',500);
            }
        }
    },

    Mutation: {
        addNewBook: async (_: any, { bookInput }: any) => {
            try {
                logger.info("Create a New Book");
                const book = new BookModel(bookInput);
                if(!book) {
                    logger.warn(`${bookInput.title} Not Created..`);
                }
                logger.info(`${book.title} Created Succssfully.`);
                await book.save();
                return book;
            } catch(error) {
                logger.error("Failed to Create a new Book!!");
                throw new AppError('Failed to Create new Book',500);
            }
        },
    }
}