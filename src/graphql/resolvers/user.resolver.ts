import { UserModel } from '../../models/user.model';
import logger from '../../utils/logger';
import AppError from '../../utils/AppError';
import { getDataWithPagination } from '../../utils/pagination';


export const userResolver = {
    Query: {
        getAllUsers: async (_: any, { page, limit }: { page: number; limit: number }) => {
            try {
                logger.info("get ALl User data...");
                const users = await getDataWithPagination(
                    UserModel, 
                    {}, 
                    page, 
                    limit
                );
                logger.info("users data fetched.");
                return users;
            } catch (error) {
                logger.error("Faield to fetch users data",error);
                throw new AppError("Failed to fetch users",500);
            }
        },
        
        getUserById: async (_: any, { id }: { id: string }) => {
            try {
                logger.info(`Get User by Id: ${id}`);
                const user = await UserModel.findById(id);
                if (!user) {
                    logger.error("User not found!!");
                    throw new AppError("User not found",404);
                }
                logger.info('User fetched succssully.');
                return user;
            } catch (error) {
                logger.info("Failed to fetch usre data by id!!");
               throw new AppError("Failed to fetch user",500);
            }
        }

    },

    Mutation: {
        createNewUser: async (_: any, { userInput }: any) => {
            try {
                logger.info("Create a New User...");
                const newUser = new UserModel(userInput);
                await newUser.save();
                logger.info(`User ${newUser.name} created Successfully.`);
                return newUser;
            } catch (error) {
                logger.error("Failed to create a new User", error);
                throw new AppError("Failed to create user",500);
            }
        },
      
        updateUser: async (_: any, { id, userInput }: { id: string; userInput: any }) => {
            try {
                logger.info("Update User Data..");
                const updatedUser = await UserModel.findByIdAndUpdate(
                    id, 
                    {$set: userInput}, 
                    { new: true }
                );
                if (!updatedUser) {
                    logger.error("User Not Found during update the user data");
                    throw new AppError("User not found",404);
                }
                logger.info("User Data Successfully Updated..");
                return updatedUser;
            } catch (error) {
                logger.error("failed to update user data");
                throw new AppError("Failed to update user",500);
            }
        },
      
        deleteUser: async (_: any, { id }: any) => {
            try {
                logger.info("Delete User Data..");
                const deletedUser = await UserModel.findByIdAndDelete(id);
                if (!deletedUser) {
                    logger.error("user not found...");
                    throw new AppError("User not found",404);
                }
                logger.info("User deleted successfully");
                return deletedUser;
            } catch (error) {
                logger.info("Faield to Delete User Data!!");
                throw new AppError("Failed to delete user",500);
            }
        },

    }
}