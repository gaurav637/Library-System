import { bookResolvers }  from '../src/graphql/resolvers/book.resolver';
import { BookModel } from '../src/models/book.model';
import AppError from '../src/utils/AppError';
import logger from '../src/utils/logger';
import * as paginationModule from '../src/utils/pagination';

jest.mock('../src/models/book.model');
jest.mock('../src/utils/pagination');
jest.mock('../src/utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn()
}));

describe('Book Resolvers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Query.getAllBooks', () => {
    const mockBooks = [
      { _id: '1', title: 'Book 1', author: 'Author 1', description: 'Description 1', category: 'Fiction' },
      { _id: '2', title: 'Book 2', author: 'Author 2', description: 'Description 2', category: 'Non-Fiction' }
    ];

    it('should return books with pagination', async () => {
      jest.spyOn(paginationModule, 'getDataWithPagination').mockImplementation(() => Promise.resolve(mockBooks));

      const result = await bookResolvers.Query.getAllBooks(null, { page: 1, limit: 10 });

      expect(paginationModule.getDataWithPagination).toHaveBeenCalledWith(
        BookModel,
        {},
        1,
        10
      );
      expect(result).toBe(mockBooks);
      expect(logger.info).toHaveBeenCalledWith('Get All Books..');
      expect(logger.info).toHaveBeenCalledWith('Books Get Successfully with Pagination.');
    });

    it('should throw an error when fetching books fails', async () => {
      const error = new Error('Database error');
      jest.spyOn(paginationModule, 'getDataWithPagination').mockImplementation(() => Promise.reject(error));

      await expect(bookResolvers.Query.getAllBooks(null, { page: 1, limit: 10 }))
        .rejects
        .toThrow('Failed to get All Books');
      
      expect(logger.error).toHaveBeenCalledWith(`Failed to during get all Books Data ${error}`);
    });
  });

  describe('Query.getBookById', () => {
    const mockBook = { _id: '1', title: 'Book 1', author: 'Author 1', description: 'Description 1', category: 'Fiction' };

    it('should return a book when valid id is provided', async () => {
      (BookModel.findById as jest.Mock).mockResolvedValue(mockBook);

      const result = await bookResolvers.Query.getBookById(null, { id: '1' });

      expect(BookModel.findById).toHaveBeenCalledWith('1');
      expect(result).toBe(mockBook);
      expect(logger.info).toHaveBeenCalledWith('Get Book By Id:- 1');
      expect(logger.info).toHaveBeenCalledWith('1 Fetched Successfully..');
    });

    it('should throw an error when fetching book fails', async () => {
      const error = new Error('Database error');
      (BookModel.findById as jest.Mock).mockRejectedValue(error);

      await expect(bookResolvers.Query.getBookById(null, { id: '1' }))
        .rejects
        .toThrow('Failed to get Book By ID');
      
      expect(logger.error).toHaveBeenCalledWith('Failed to get Book by Id: 1');
    });
  });

  describe('Query.getBooksByFilter', () => {
    const mockBooks = [
      { _id: '1', title: 'Book 1', author: 'Author 1', description: 'Description 1', category: 'Fiction' },
      { _id: '2', title: 'Book 2', author: 'Author 2', description: 'Description 2', category: 'Fiction' }
    ];

    it('should return books filtered by provided criteria', async () => {
      jest.spyOn(paginationModule, 'getDataWithPagination').mockImplementation(() => Promise.resolve(mockBooks));
      
      const filter = { category: 'Fiction' };
      const result = await bookResolvers.Query.getBooksByFilter(null, { filter, page: 1, limit: 10 });

      expect(paginationModule.getDataWithPagination).toHaveBeenCalledWith(
        BookModel,
        { category: { $regex: 'Fiction', $options: 'i' } },
        1,
        10
      );
      expect(result).toBe(mockBooks);
      expect(logger.info).toHaveBeenCalledWith('Get Book Data By Filtering');
    });

    it('should handle empty filter object', async () => {
      jest.spyOn(paginationModule, 'getDataWithPagination').mockImplementation(() => Promise.resolve(mockBooks));
      
      const result = await bookResolvers.Query.getBooksByFilter(null, { filter: {}, page: 1, limit: 10 });

      expect(paginationModule.getDataWithPagination).toHaveBeenCalledWith(
        BookModel,
        {},
        1,
        10
      );
      expect(result).toBe(mockBooks);
    });

    it('should throw an error when filtering books fails', async () => {
      const error = new Error('Database error');
      jest.spyOn(paginationModule, 'getDataWithPagination').mockImplementation(() => Promise.reject(error));

      await expect(bookResolvers.Query.getBooksByFilter(null, { filter: { category: 'Fiction' }, page: 1, limit: 10 }))
        .rejects
        .toThrow('Failed when fetched Books Data By filter!!');
      
      expect(logger.error).toHaveBeenCalledWith('Failed! during fetch Books by filter ', error);
    });
  });

  describe('Query.searchBooksBySearchKey', () => {
    const mockBooks = [
      { _id: '1', title: 'Fantasy Book', author: 'Author 1', description: 'Magic world', category: 'Fiction' },
      { _id: '2', title: 'Adventure Tale', author: 'Author 2', description: 'Fantasy adventure', category: 'Fiction' }
    ];

    it('should return books matching the search key', async () => {
      jest.spyOn(paginationModule, 'getDataWithPagination').mockImplementation(() => Promise.resolve(mockBooks));
      
      const searchKey = 'fantasy';
      const result = await bookResolvers.Query.searchBooksBySearchKey(null, { searchKey, page: 1, limit: 10 });

      const expectedQuery = {
        $or: [
          { title: { $regex: 'fantasy', $options: 'i' } },
          { description: { $regex: 'fantasy', $options: 'i' } },
          { category: { $regex: 'fantasy', $options: 'i' } }
        ]
      };

      expect(paginationModule.getDataWithPagination).toHaveBeenCalledWith(
        BookModel,
        expectedQuery,
        1,
        10
      );
      expect(result).toBe(mockBooks);
    });

    it('should throw an error when searching books fails', async () => {
      const error = new Error('Database error');
      jest.spyOn(paginationModule, 'getDataWithPagination').mockImplementation(() => Promise.reject(error));

      await expect(bookResolvers.Query.searchBooksBySearchKey(null, { searchKey: 'fantasy', page: 1, limit: 10 }))
        .rejects
        .toThrow('Failed During search the book');
      
      expect(logger.error).toHaveBeenCalledWith('Failed When search book!!', error);
    });
  });

  describe('Mutation.addNewBook', () => {
    const mockBookInput = { 
      title: 'New Book', 
      author: 'Author', 
      description: 'Description', 
      category: 'Fiction' 
    };

    it('should create and return a new book', async () => {
      const mockBook = { 
        _id: '1', 
        ...mockBookInput,
        save: jest.fn().mockResolvedValue(true) 
      };
      
      (BookModel as unknown as jest.Mock).mockImplementation(() => mockBook);

      const result = await bookResolvers.Mutation.addNewBook(null, { bookInput: mockBookInput });

      expect(BookModel).toHaveBeenCalledWith(mockBookInput);
      expect(mockBook.save).toHaveBeenCalled();
      expect(result).toBe(mockBook);
      expect(logger.info).toHaveBeenCalledWith('Create a New Book');
      expect(logger.info).toHaveBeenCalledWith(`${mockBook.title} Created Succssfully.`);
    });

    it('should throw an error when creating book fails', async () => {
      const error = new Error('Database error');
      const mockBook = { 
        title: mockBookInput.title,
        save: jest.fn().mockRejectedValue(error)
      };
      
      (BookModel as unknown as jest.Mock).mockImplementation(() => mockBook);

      await expect(bookResolvers.Mutation.addNewBook(null, { bookInput: mockBookInput }))
        .rejects
        .toThrow('Failed to Create new Book');
      
      expect(logger.error).toHaveBeenCalledWith('Failed to Create a new Book!!');
    });
  });

  describe('Mutation.updateBookById', () => {
    const mockInput = { title: 'Updated Book', author: 'Updated Author' };
    const mockUpdatedBook = { _id: '1', ...mockInput };

    it('should update and return a book when valid id is provided', async () => {
      (BookModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedBook);

      const result = await bookResolvers.Mutation.updateBookById(null, { id: '1', input: mockInput });

      expect(BookModel.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        { $set: mockInput },
        { new: true }
      );
      expect(result).toBe(mockUpdatedBook);
      expect(logger.info).toHaveBeenCalledWith('Book Updating..');
      expect(logger.info).toHaveBeenCalledWith('Book Updated Successfully!');
    });


    it('should throw an error when updating book fails', async () => {
      const error = new Error('Database error');
      (BookModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(error);

      await expect(bookResolvers.Mutation.updateBookById(null, { id: '1', input: mockInput }))
        .rejects
        .toThrow('Failed During Update the Book Data!!');
      
      expect(logger.error).toHaveBeenCalledWith('Failed during Update the Book Data! ', error);
    });
  });

  describe('Mutation.deleteBookById', () => {
    const mockDeletedBook = { _id: '1', title: 'Book to Delete', author: 'Author' };

    it('should delete and return a book when valid id is provided', async () => {
      (BookModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockDeletedBook);

      const result = await bookResolvers.Mutation.deleteBookById(null, { id: '1' });

      expect(BookModel.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(result).toBe(mockDeletedBook);
      expect(logger.info).toHaveBeenCalledWith('Delete Book By Id:- 1');
      expect(logger.info).toHaveBeenCalledWith('Book Successfully Deleted..');
    });


    it('should throw an error when deleting book fails', async () => {
      const error = new Error('Database error');
      (BookModel.findByIdAndDelete as jest.Mock).mockRejectedValue(error);

      await expect(bookResolvers.Mutation.deleteBookById(null, { id: '1' }))
        .rejects
        .toThrow('Failed! when deleting the book data by id');
      
      expect(logger.error).toHaveBeenCalledWith('Failed! when deleting the book data by id', error);
    });
  });
});