import { userResolver }  from '../src/graphql/resolvers/user.resolver';
import { UserModel } from '../src/models/user.model';
import AppError from '../src/utils/AppError';
import logger from '../src/utils/logger';
import * as paginationModule from '../src/utils/pagination';

jest.mock('../models/user.model');
jest.mock('../utils/pagination');
jest.mock('../utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

describe('User Resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Query.getAllUsers', () => {
    const mockUsers = [
      { _id: '1', name: 'Gaurav Negi', email: 'gaurav@gmail.com' },
      { _id: '2', name: 'Rohit Negi', email: 'rohit@gmail.com' },
    ];

    it('should return users with pagination', async () => {
      jest.spyOn(paginationModule, 'getDataWithPagination').mockImplementation(() => Promise.resolve(mockUsers));
      const result = await userResolver.Query.getAllUsers(null, { page: 1, limit: 10 });
      expect(paginationModule.getDataWithPagination).toHaveBeenCalledWith(
        UserModel,
        {},
        1,
        10
      );
      expect(result).toBe(mockUsers);
      expect(logger.info).toHaveBeenCalledWith('get ALl User data...');
      expect(logger.info).toHaveBeenCalledWith('users data fetched.');
    });

    it('should throw an error when fetching users fails', async () => {
      const error = new Error('Database error');
      jest.spyOn(paginationModule, 'getDataWithPagination').mockImplementation(() => Promise.reject(error));

      await expect(userResolver.Query.getAllUsers(null, { page: 1, limit: 10 }))
        .rejects
        .toThrow('Failed to fetch users');
      
      expect(logger.error).toHaveBeenCalledWith('Faield to fetch users data', error);
    });
  });

  describe('Query.getUserById', () => {
    const mockUser = { _id: '1', name: 'amogh rana', email: 'amogh@gmail.com' };
    it('should return a user when valid id is provided', async () => {
      (UserModel.findById as jest.Mock).mockResolvedValue(mockUser);

      const result = await userResolver.Query.getUserById(null, { id: '1' });
      expect(UserModel.findById).toHaveBeenCalledWith('1');
      expect(result).toBe(mockUser);
      expect(logger.info).toHaveBeenCalledWith('Get User by Id: 1');
      expect(logger.info).toHaveBeenCalledWith('User fetched succssully.');
    });

    it('should throw an error when fetching user fails', async () => {
      const error = new Error('Database error');
      (UserModel.findById as jest.Mock).mockRejectedValue(error);

      await expect(userResolver.Query.getUserById(null, { id: '1' }))
        .rejects
        .toThrow('Failed to fetch user');
      
      expect(logger.info).toHaveBeenCalledWith('Failed to fetch usre data by id!!');
    });

  });

  describe('Mutation.createNewUser', () => {
    const mockUserInput = { name: 'deepansh maurya', email: 'deepansh@gmail.com' };
    
    it('should create and return a new user', async () => {
      const mockNewUser = { 
        _id: '1', 
        name: 'deepansh maurya', 
        email: 'deepansh@gmail.com',
        save: jest.fn().mockResolvedValue(true) 
      };
      
      (UserModel as unknown as jest.Mock).mockImplementation(() => mockNewUser);

      const result = await userResolver.Mutation.createNewUser(null, { userInput: mockUserInput });

      expect(UserModel).toHaveBeenCalledWith(mockUserInput);
      expect(mockNewUser.save).toHaveBeenCalled();
      expect(result).toBe(mockNewUser);
      expect(logger.info).toHaveBeenCalledWith('Create a New User...');
      expect(logger.info).toHaveBeenCalledWith(`User ${mockNewUser.name} created Successfully.`);
    });

    it('should throw an error when creating user fails', async () => {
      const error = new Error('Database error');
      const mockSave = jest.fn().mockRejectedValue(error);
      
      (UserModel as unknown as jest.Mock).mockImplementation(() => ({
        name: 'deepansh maurya',
        save: mockSave
      }));

      await expect(userResolver.Mutation.createNewUser(null, { userInput: mockUserInput }))
        .rejects
        .toThrow('Failed to create user');
      
      expect(logger.error).toHaveBeenCalledWith('Failed to create a new User', error);
    });
  });

  describe('Mutation.updateUser', () => {
    const mockUserInput = { name: 'mohan', email: 'mohan@gmail.com' };
    const mockUpdatedUser = { _id: '1', ...mockUserInput };

    it('should update and return a user when valid id is provided', async () => {
      (UserModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedUser);

      const result = await userResolver.Mutation.updateUser(null, { id: '1', userInput: mockUserInput });

      expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        { $set: mockUserInput },
        { new: true }
      );
      expect(result).toBe(mockUpdatedUser);
      expect(logger.info).toHaveBeenCalledWith('Update User Data..');
      expect(logger.info).toHaveBeenCalledWith('User Data Successfully Updated..');
    });

    it('should throw an error when updating user fails', async () => {
      const error = new Error('Database error');
      (UserModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(error);

      await expect(userResolver.Mutation.updateUser(null, { id: '1', userInput: mockUserInput }))
        .rejects
        .toThrow('Failed to update user');
      
      expect(logger.error).toHaveBeenCalledWith('failed to update user data');
    });
  });

  describe('Mutation.deleteUser', () => {
    const mockDeletedUser = { _id: '1', name: 'rohan rana', email: 'rohan@gmail.com' };

    it('should delete and return a user when valid id is provided', async () => {
      (UserModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockDeletedUser);

      const result = await userResolver.Mutation.deleteUser(null, { id: '1' });

      expect(UserModel.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(result).toBe(mockDeletedUser);
      expect(logger.info).toHaveBeenCalledWith('Delete User Data..');
      expect(logger.info).toHaveBeenCalledWith('User deleted successfully');
    });

    it('should throw an error when deleting user fails', async () => {
      const error = new Error('Database error');
      (UserModel.findByIdAndDelete as jest.Mock).mockRejectedValue(error);

      await expect(userResolver.Mutation.deleteUser(null, { id: '1' }))
        .rejects
        .toThrow('Failed to delete user');
      
      expect(logger.info).toHaveBeenCalledWith('Faield to Delete User Data!!');
    });
  });


});