import { Model, PopulateOptions } from "mongoose";

export interface PaginationResult<T> {
  data: T[];
  totalCounts: number;
  totalPages: number;
}
export const getDataWithPagination = async <T>(
  model: Model<T>,
  query: any,
  page: number,
  limit: number,
): Promise<PaginationResult<T>> => {
  const skip = (page - 1) * limit;
  const [data, totalCounts] = await Promise.all([
    model
      .find(query)
      .skip(skip)
      .limit(limit)
      .lean<T[]>(),
    model.countDocuments(query),
  ]);

  const totalPages = Math.ceil(totalCounts / limit);
  return { data, totalCounts, totalPages };
};