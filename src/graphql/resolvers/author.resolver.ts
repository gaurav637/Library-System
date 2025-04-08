import logger from '../../utils/logger';
import { AuthorModel } from '../../models/author.model';
import AppError from "../../utils/AppError";
import { getDataWithPagination } from '../../utils/pagination';
// import { dateScalar } from "./scalar/date.scalar";


export const authorResolver = {
    Query: {

        getAllAuthor: async (_: any, {page,limit}: {page: number, limit: number}) => {
            try {
                logger.info("Get all Author Data...");
                const authorData = await getDataWithPagination(
                    AuthorModel,
                    {},
                    page,
                    limit
                );
                if(!authorData) {
                    logger.warn("Author Data not available");
                    throw new AppError("Author Data Not found!!", 204);
                }  
                logger.info("Auhtor Data Fetched Successfully..");
                return authorData;
            } catch(error) {
                logger.error("Error during get all Author!!", error);
                throw new AppError("Error During get All Author",500);
            }
        },

        getAuthorById: async (_: any, { id }: { id: string }) => {
            try {
                logger.info("Fetching Author By Id...");
        
                const author = await AuthorModel.findById(id);
        
                if (!author) {
                    logger.warn("Author Not Found!!");
                    throw new AppError("Author Not Found!!", 404);
                }
        
                logger.info("Author Found Successfully!");
                return author;
        
            } catch (error) {
                logger.error("Failed During Fetch Author By Id!!", error);
                throw new AppError("Failed During Fetch Author By Id!!", 500);
            }
        },
        

        searchAuthor: async (_: any, { searchKey, page, limit }: { searchKey: any, page: number, limit: number }) => {
            try {
                logger.info("Searching Authors...");
                const query = {
                    $or: [
                        { name: { $regex: searchKey, $options: 'i' } },
                        { email: { $regex: searchKey, $options: 'i' } },
                        { description: { $regex: searchKey, $options: 'i' } },
                        // { address: { $regex: searchKey, $options: 'i' } },
                    ]
                };
        
                const result = await getDataWithPagination(
                    AuthorModel,
                    query,
                    page,
                    limit
                );
        
                logger.info("Authors Fetched Successfully!");
                return result;
        
            } catch (error) {
                logger.error("Failed During Searching Authors!!", error);
                throw new AppError("Failed During Searching Authors!!", 500);
            }
        },
        

    },
    Mutation: {

        addNewAuthor: async (_: any, { authorInput }: any) => {
            try {
              logger.info("Creating a new Author...");      
              console.log("authrinput -> ", authorInput) ;
              const authorData = new AuthorModel(authorInput);        
              await authorData.save();         
              logger.info(`${authorData.name} Created Successfully`);          
              return authorData;
            } catch (error) {
              logger.error("Internal Server Error while creating a new Author", error);
              throw new AppError("Failed to create a new Author", 500);
            }
        },
          
        updateAuthor: async (_: any, {id, authorInput}: {id: string, authorInput: any}) => {
            try {
                logger.info(`Update Author ${id} data..`);
                const updatedData = await AuthorModel.findByIdAndUpdate(
                    id,
                    {$set: authorInput},
                    {new: true}
                );
                if(!updatedData) {
                    logger.error(`Author ${id}  Data not Updated`);
                    throw new AppError("Author ${id}  Data not Updated ", 505);
                }
                logger.info(`Author ${id}  Data Updated Successfully..`);
                return updatedData;
            } catch(error) {
                logger.error("Internal server error. Failed when update the author data!!", error);
                throw new AppError("Failed!! when update the author data!!", 500);
            }
        },

        deleteAuthor: async (_: any, {id}: {id: string}) => {
            try {
                logger.info(`Delete ${id} author Data`);
                const deletedAuthor = await AuthorModel.findByIdAndDelete(id);
                if(!deletedAuthor) {
                    logger.info("Failed!! Delete the Author Data");
                    throw new AppError("Faield !! When Delete the Author Data..", 400);
                }
                logger.info(`Author ${id} Data Updated Successfully..`);
                return deletedAuthor;
            } catch(error) {
                logger.error("Failed!! when delete the author data!");
                throw new AppError("Failed!! when delete the author data",500);
            }
        }
    }
}