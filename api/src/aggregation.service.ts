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
      const simpleConditions = fieldNames.map((field) => ({
        [field]: { $regex: query, $options: 'i' },
      }));
      const conditions = {
        $or: simpleConditions,
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

  async fetchAvailableDocuments<T extends Document>(
    model: Model<T>,
    center_id: string,
    startTime: Date,
    endTime: Date,
    currentPage = 1,
    items = 5,
    options: object,
  ): Promise<T[]> {
    const offset = (currentPage - 1) * items;

    try {
      const documents = await model
        .find({
          ...options,
          // $or: [
          //   {
          //     $and: [
          //       { start_time: { $lt: startTime } },
          //       { end_time: { $gt: startTime } },
          //     ],
          //   },
          //   {
          //     $and: [
          //       { start_time: { $lt: endTime } },
          //       { end_time: { $gt: endTime } },
          //     ],
          //   },
          //   {
          //     $and: [
          //       { start_time: { $gte: startTime } },
          //       { end_time: { $lte: endTime } },
          //     ],
          //   },
          // ],
        })
        .skip(offset)
        .limit(items)
        .exec();

      return documents;
    } catch (error) {
      throw new Error(`Error fetching filtered documents: ${error.message}`);
    }
  }

  async fetchPageNumbers<T extends Document>(
    model: Model<T>,
    fieldNames: string[],
    query = '',
    items: number,
    options?: object,
  ) {
    console.log(options);
    try {
      // const test = [
      //   [{ start_time: { $lt: startTime } }, { end_time: { $gt: startTime } }],
      //   [{ start_time: { $lt: endTime } }, { end_time: { $gt: endTime } }],
      //   // [{ start_time: { $gte: startTime } }, { end_time: { $lte: endTime } }],
      // ];
      // const complexConditions = test.map((first) =>
      //   first.map((final) => ({ final })),
      // );

      const simpleConditions = fieldNames.map((field) => ({
        [field]: { $regex: query, $options: 'i' },
      }));

      const conditions = {
        $or: simpleConditions,
      } as unknown as FilterQuery<T>[];

      const totalCount = await model
        .countDocuments({ ...options }, conditions)
        .exec();

      const totalPages = Math.ceil(totalCount / items);

      return totalPages;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error(error.message);
    }
  }
}
