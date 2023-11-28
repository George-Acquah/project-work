import { Injectable } from '@nestjs/common';
import { Model, Document, FilterQuery } from 'mongoose';

@Injectable()
export class AggregationService {
  // constructor() {}

  async aggregate<T extends Document>(
    model: Model<T>,
    from: string,
    foreignField: string,
    match: object,
    currentPage: number,
    items: number,
    localField = '_id',
  ) {
    try {
      const offset = (currentPage - 1) * items;
      const result = await model.aggregate([
        {
          $lookup: {
            from, // Assuming the name of the slots collection is 'slots'
            localField,
            foreignField,
            as: from,
          },
        },
        {
          $match: match,
        },
        { $skip: offset },
        { $limit: items },
      ]);
      return result;
    } catch (error) {
      throw new Error(`Aggregation error: ${error.message}`);
    }
  }

  async fetchFilteredDocuments<T extends Document>(
    model: Model<T>,
    fieldNames: string[],
    query: string,
    currentPage: number,
    items: number,
  ): Promise<T[]> {
    const offset = (currentPage - 1) * items;

    try {
      const conditions = {
        $or: fieldNames.map((field) => ({
          [field]: { $regex: query, $options: 'i' },
        })),
      } as unknown as FilterQuery<T>[];

      const documents = await model
        .find(conditions)
        .skip(offset)
        .limit(items)
        .exec();

      return documents;
    } catch (error) {
      throw new Error(`Error fetching filtered documents: ${error.message}`);
    }
  }
}
