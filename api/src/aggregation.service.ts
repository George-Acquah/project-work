import { Injectable } from '@nestjs/common';
import mongoose, {
  Model,
  Document,
  FilterQuery,
  PipelineStage,
  ClientSession
} from 'mongoose';
import { SORT } from './shared/enums/general.enum';
import { _ILookup } from './shared/interfaces/responses.interface';
import { _IUpdatedUserRes } from './shared/interfaces/users.interface';

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
    group?: object
  ): Promise<T[]> {
    try {
      const offset = (currentPage - 1) * items;
      const result = await model.aggregate([
        {
          $lookup: {
            from, // Assuming the name of the slots collection is 'slots'
            localField,
            foreignField,
            as: from
          }
        },
        {
          $match: match
        },
        { $skip: offset },
        { $limit: items }
      ]);

      if (group) {
        result.push({ $group: group });
      }
      return result;
    } catch (error) {
      throw new Error(`Aggregation error: ${error.message}`);
    }
  }

  async deepAggregate<T extends Document, S extends Document>(
    model: Model<T>,
    currentPage: number,
    limit: number,
    sort: SORT = SORT.DESCENDING
  ): Promise<S[]> {
    try {
      const offset = (currentPage - 1) * limit;
      const result = await model.aggregate<S>([
        {
          $group: {
            _id: '$slot_id',
            count: { $sum: 1 }
          }
        },
        { $skip: offset }, // Add $skip stage here
        {
          $sort: {
            count: sort === SORT.DESCENDING ? -1 : 1
          }
        },
        {
          $limit: limit
        },
        {
          $lookup: {
            from: 'slots',
            localField: '_id',
            foreignField: '_id',
            as: 'parking_slot'
          }
        },
        {
          $unwind: '$parking_slot'
        },
        {
          $group: {
            _id: '$parking_slot.center_id',
            count: { $sum: '$count' }
          }
        },
        {
          $lookup: {
            from: 'parkingcenters',
            localField: '_id',
            foreignField: '_id',
            as: 'popular_centers'
          }
        },
        {
          $unset: ['_id', 'center_id', 'count']
        },
        {
          $unwind: '$popular_centers'
        }
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
    populatePath?: string,
    populateLimit?: number
  ) {
    const offset = (currentPage - 1) * items;

    try {
      const simpleConditions = fieldNames.map((field) => ({
        [field]: { $regex: query, $options: 'i' }
      }));
      const conditions = {
        $or: simpleConditions
      } as unknown as FilterQuery<T>[];

      const documents = await model
        .find(conditions)
        .skip(offset)
        .limit(items)
        // Populate only when populationPath and populationLimit are provided
        .populate(
          populatePath && populateLimit
            ? {
                path: populatePath,
                strictPopulate: false,
                options: { limit: populateLimit } // Limit the number of items per population
              }
            : undefined
        )
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
    options: object
  ): Promise<T[]> {
    const offset = (currentPage - 1) * items;

    try {
      const documents = await model
        .find({
          ...options
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

  async pageNumbersPipeline<T extends Document>(
    model: Model<T>,
    fieldNames: string[],
    query = '',
    items: number,
    options?: object
  ) {
    try {
      // Construct simple conditions for each field name
      const simpleConditions = fieldNames.map((field) => ({
        [field]: { $regex: query, $options: 'i' }
      }));

      // Combine simple conditions using $or operator
      const conditions = {
        $or: simpleConditions
      } as unknown as FilterQuery<T>[];
      // Calculate total count of documents matching conditions
      const totalCount = await model
        .countDocuments({ ...options, ...conditions })
        .exec();

      // Calculate total pages based on total count and items per page
      const totalPages = Math.ceil(totalCount / items);

      return totalPages;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error(error.message);
    }
  }

  async virtualFieldsPipeline<T extends Document>(
    model: Model<T>,
    match_fields: string[],
    query: string,
    lookup_data: _ILookup[],
    currentPage: number,
    limit: number
  ) {
    try {
      const offset = (currentPage - 1) * limit;
      const matchers = match_fields.map((field) => ({
        [field]: new RegExp(query)
      }));
      const lookups: PipelineStage.Lookup[] = lookup_data.map((data) => ({
        $lookup: {
          from: data.from,
          as: data.as,
          localField: '_id',
          foreignField: data.foreignField
        }
      }));

      const pipeline = await model.aggregate([
        {
          $match: { $and: matchers } // Combine matchers using $and
        },
        { $skip: offset }, // Skip documents based on the offset
        ...lookups,
        { $limit: limit } // Limit the number of documents returned
      ]);

      return pipeline;
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error to propagate it to the caller
    }
  }

  async updateUserPipeline<T extends Document>(
    model: Model<T>,
    id: string,
    updateFields: any,
    session?: ClientSession // The fields to update
  ): Promise<_IUpdatedUserRes[]> {
    try {
      const pipeline = await model.aggregate(
        [
          {
            $match: {
              _id: id
            }
          },
          {
            $lookup: {
              from: 'profiles',
              localField: 'profile',
              foreignField: '_id',
              as: 'profile'
            }
          },
          {
            $lookup: {
              from: 'userimages',
              localField: '_id',
              foreignField: 'userId',
              as: 'user_image'
            }
          },
          {
            $unwind: '$profile'
          },
          {
            $set: updateFields // Apply the update fields here
          },
          {
            $unwind: '$user_image'
          },
          {
            $project: {
              email: 1,
              userType: 1,
              'profile.first_name': 1,
              'profile.last_name': 1,
              'user_image.file_id': 1
            }
          }
        ],
        { session }
      );

      return pipeline;
    } catch (error) {
      console.error('Error in updateUserPipeline:', error);
      throw error; // Rethrow the error to propagate it to the caller
    }
  }

  async returnIdPipeline<T extends Document>(
    model: Model<T>,
    identifier: string // Rename to identifier for flexibility
  ): Promise<string | null> {
    try {
      const pipeline = (await model.aggregate([
        {
          $match: {
            $or: [
              { _id: new mongoose.Types.ObjectId(identifier) }, // Match by _id
              { email: identifier } // Match by email
            ]
          }
        },
        {
          $project: {
            $toString: '$_id'
          }
        },
        {
          $limit: 1
        }
      ])) as unknown as string | null; // Return null if no document found

      return pipeline;
    } catch (error) {
      console.error('Error in returnIdPipeline:', error);
      throw error; // Rethrow the error
    }
  }
}
