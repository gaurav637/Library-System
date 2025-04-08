import { Model } from "mongoose";

export const getDataWithPagination = async <T>(
  model: Model<T>,
  query: any,
  page: number,
  limit: number,
): Promise<T[]> => {
  const skip = (page - 1) * limit;

  const [data, totalCounts] = await Promise.all([
    model.find(query).skip(skip).limit(limit).lean<T[]>(),
    model.countDocuments(query),
  ]);
  return data; 
};
