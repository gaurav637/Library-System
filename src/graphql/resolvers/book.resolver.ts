import { BookModel } from "../../models/book.model";
import logger from "../../utils/logger";
import AppError from "../../utils/AppError"
import { getDataWithPagination } from "../../utils/pagination";

export const bookResolvers = {
    Query: {
        getAllBooks: async (_: any, {page,limit}: {page: number, limit: number}) => {
            try {
                logger.info("Get All Books..");
                const books = await getDataWithPagination(
                    BookModel,
                    {},
                    page,
                    limit
                )
                logger.info(`Books Get Successfully with Pagination.`);
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
        },

        getBooksByFilter: async (_: any, { filter, page, limit }: {filter: any, page: number, limit: number}) => {
            try {
                logger.info(`Get Book Data By Filtering`);
                const query : any = {};
                if(filter) {
                    Object.keys(filter).forEach((key) => {
                        query[key] = { $regex: filter[key], $options: "i" }
                    })
                }
                const resultantBooksData = await getDataWithPagination(
                    BookModel, 
                    query,
                    page,
                    limit
                );
                return resultantBooksData;
            } catch(error) {
                logger.error(`Failed! during fetch Books by filter `, error);
                throw new AppError("Failed when fetched Books Data By filter!!", 500);
            }
        },

        searchBooksBySearchKey: async (_: any, {searchKey, page,limit}: {searchKey: any, page: number, limit: number}) => {
            try {
                const query = {
                    $or: [
                      { title: { $regex: searchKey, $options: 'i' } },
                      { description: { $regex: searchKey, $options: 'i' } },
                      { category: { $regex: searchKey, $options: 'i' } }
                    ]
                  };
                const result = await getDataWithPagination(
                    BookModel, 
                    query,
                    page,
                    limit
                )
                return result;

            } catch(error) {
                logger.error("Failed When search book!!",error);
                throw new AppError("Failed During search the book", 500);
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

        updateBookById: async (_: any, { id, input }: { id: string, input: any }) => {
            try {
                logger.info("Book Updating..");    
                const updatedBook = await BookModel.findByIdAndUpdate(
                    id,
                    { $set: input },
                    { new: true }
                );
        
                if (!updatedBook) {
                    logger.warn("Book Not Found!!");
                    throw new AppError("Book not found!", 404);
                }

                logger.info("Book Updated Successfully!");
                return updatedBook;
                
            } catch (error) {
                logger.error("Failed during Update the Book Data! ", error);
                throw new AppError("Failed During Update the Book Data!!", 500);
            }
        },

        deleteBookById: async (_: any, { id }: {id: string}) => {
            try {
                logger.info(`Delete Book By Id:- ${id}`);
                const deletedBook = await BookModel.findByIdAndDelete(id);
                if(!deletedBook) {
                    logger.warn("Book Not deleted!!");
                    throw new AppError('Failed! Book Not Found',404);
                }
                logger.info("Book Successfully Deleted..");
                return deletedBook;
            } catch(error) {
                logger.error("Failed! when deleting the book data by id", error);
                throw new AppError('Failed! when deleting the book data by id', 500);
            }
        }
    }
}