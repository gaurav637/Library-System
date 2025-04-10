import { authorResolver } from '../graphql/resolvers/author.resolver';
import { AuthorModel } from '../models/author.model';
import * as paginationModule from '../utils/pagination';
import AppError from '../utils/AppError';
import logger from '../utils/logger';

jest.mock('../models/author.model');
jest.mock('../utils/pagination');
jest.mock('../utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn()
}));

describe('Author Resolver Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Query.getAllAuthor', () => {
    it('should return authors with pagination when successful', async () => {
      const mockAuthors = [
        { _id: '1', name: 'Author 1', email: 'author1@gmail.com', description: 'Description 111' },
        { _id: '2', name: 'Author 2', email: 'author2@gmail.com', description: 'Description 211' }
      ];
      
      jest.spyOn(paginationModule, 'getDataWithPagination').mockImplementation(() => Promise.resolve(mockAuthors));
      const result = await authorResolver.Query.getAllAuthor(null, { page: 1, limit: 10 });
      expect(paginationModule.getDataWithPagination).toHaveBeenCalledWith(
        AuthorModel,
        {},
        1,
        10
      );
      expect(result).toBe(mockAuthors);
      expect(logger.info).toHaveBeenCalledWith('Get all Author Data...');
      expect(logger.info).toHaveBeenCalledWith('Auhtor Data Fetched Successfully..');
    });
  });

  describe('Query.getAuthorById', () => {
    it('should return an author when valid id is provided', async () => {
      const mockAuthor = { _id: '1', name: 'Author 1', email: 'author1@gmail.com', description: 'Description 1' };
      
      (AuthorModel.findById as jest.Mock).mockResolvedValue(mockAuthor);

      const result = await authorResolver.Query.getAuthorById(null, { id: '1' });

      expect(AuthorModel.findById).toHaveBeenCalledWith('1');
      expect(result).toBe(mockAuthor);
      expect(logger.info).toHaveBeenCalledWith('Fetching Author By Id...');
      expect(logger.info).toHaveBeenCalledWith('Author Found Successfully!');
    });
  });

  describe('Query.searchAuthor', () => {
    it('should return authors matching the search key', async () => {
      const mockAuthors = [
        { _id: '1', name: 'John Smith', email: 'john@example.com', description: 'Bestselling author' },
        { _id: '2', name: 'Jenny Smith', email: 'jenny@example.com', description: 'Award-winning writer' }
      ];
      
      jest.spyOn(paginationModule, 'getDataWithPagination').mockImplementation(() => Promise.resolve(mockAuthors));
      
      const searchKey = 'smith';
      const result = await authorResolver.Query.searchAuthor(null, { searchKey, page: 1, limit: 10 });

      const expectedQuery = {
        $or: [
          { name: { $regex: 'smith', $options: 'i' } },
          { email: { $regex: 'smith', $options: 'i' } },
          { description: { $regex: 'smith', $options: 'i' } },
        ]
      };

      expect(paginationModule.getDataWithPagination).toHaveBeenCalledWith(
        AuthorModel,
        expectedQuery,
        1,
        10
      );
      expect(result).toBe(mockAuthors);
      expect(logger.info).toHaveBeenCalledWith('Searching Authors...');
      expect(logger.info).toHaveBeenCalledWith('Authors Fetched Successfully!');
    });
  });

  describe('Mutation.addNewAuthor', () => {
    it('should create and return a new author', async () => {
      const mockAuthorInput = { 
        name: 'New Author', 
        email: 'new@example.com', 
        description: 'A talented writer' 
      };
      
      const mockAuthor = { 
        _id: '1', 
        ...mockAuthorInput,
        save: jest.fn().mockResolvedValue(true) 
      };
      
      (AuthorModel as unknown as jest.Mock).mockImplementation(() => mockAuthor);

      const result = await authorResolver.Mutation.addNewAuthor(null, { authorInput: mockAuthorInput });

      expect(AuthorModel).toHaveBeenCalledWith(mockAuthorInput);
      expect(mockAuthor.save).toHaveBeenCalled();
      expect(result).toBe(mockAuthor);
      expect(logger.info).toHaveBeenCalledWith('Creating a new Author...');
      expect(logger.info).toHaveBeenCalledWith(`${mockAuthor.name} Created Successfully`);
    });
  });

});