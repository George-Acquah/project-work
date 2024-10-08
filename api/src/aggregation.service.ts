import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import mongoose, {
  Model,
  Document,
  FilterQuery,
  PipelineStage,
  ClientSession,
  AnyExpression
} from 'mongoose';
import { CREATE_PIPELINE, SORT } from './shared/enums/general.enum';
import { _ILookup } from './shared/interfaces/responses.interface';
import { _IUpdatedUserRes } from './shared/interfaces/users.interface';
import { _IDbSlotReservation } from './shared/interfaces/slot.interface';

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
    fieldNames: (keyof T)[],
    query = '',
    items: number,
    options?: object
  ) {
    try {
      // Validate fieldNames array
      if (!fieldNames || fieldNames.length === 0) {
        throw new Error('Field names array is empty.');
      }

      // Construct conditions for each field name
      const simpleConditions = fieldNames.map((field) => {
        // Assume query is numeric if it's a number string, otherwise treat it as a string
        if (!isNaN(Number(query))) {
          return {
            [field]: Number(query)
          };
        } else {
          return {
            [field]: { $regex: query, $options: 'i' }
          };
        }
      });

      // Combine simple conditions using $or operator
      const conditions = {
        $or: simpleConditions
      } as unknown as FilterQuery<T>;

      // Log constructed conditions
      console.log('Constructed Conditions:', JSON.stringify(conditions));

      // Calculate total count of documents matching conditions
      const totalCount = await model
        .countDocuments({ ...options, ...conditions })
        .exec();

      // Log total count
      console.log('Count:', totalCount);

      // Calculate total pages based on total count and items per page
      const totalPages = Math.ceil(totalCount / items);

      // Log total pages
      console.log('Pages:', totalPages);

      return totalPages;
    } catch (error) {
      console.error('Error in pageNumbersPipeline:', error.message);
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
      const pipeline = await model.aggregate([
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
            _id: { $toString: '$_id' } // Convert _id to string
          }
        },
        {
          $limit: 1
        }
      ]); // Return null if no document found

      return pipeline[0]._id as unknown as string | null;
    } catch (error) {
      console.error('Error in returnIdPipeline:', error);
      throw error; // Rethrow the error
    }
  }

  async availableDocumentsPipeline<T extends Document>(
    model: Model<T>,
    lookup_data: _ILookup[],
    unwind_fields: string[],
    startTime: Date,
    endTime: Date,
    currentPage = 1,
    items = 5,
    options: object
  ): Promise<{ documents: T[]; totalPages: number }> {
    const offset = (currentPage - 1) * items;

    try {
      const lookups: PipelineStage.Lookup[] = lookup_data.map((data) => ({
        $lookup: {
          from: data.from,
          as: data.as,
          localField: '_id',
          foreignField: data.foreignField
        }
      }));

      // Selectively unwind only the fields that need to be single objects
      const unwinds: PipelineStage.Unwind[] = unwind_fields.map((field) => ({
        $unwind: {
          path: `$${field}`,
          preserveNullAndEmptyArrays: true
        }
      }));
      // Step 1: Use aggregation to calculate total matching documents and fetch paginated results
      const result = await model.aggregate([
        {
          $match: {
            ...options
            // $or: [
            //   {
            //     $and: [
            //       { start_time: { $lt: startTime } },
            //       { end_time: { $gt: startTime } }
            //     ]
            //   },
            //   {
            //     $and: [
            //       { start_time: { $lt: endTime } },
            //       { end_time: { $gt: endTime } }
            //     ]
            //   },
            //   {
            //     $and: [
            //       { start_time: { $gte: startTime } },
            //       { end_time: { $lte: endTime } }
            //     ]
            //   }
            // ]
          }
        },
        {
          $facet: {
            totalCount: [{ $count: 'total_slots' }],
            paginatedResults: [
              { $skip: offset },
              ...lookups,
              ...unwinds,
              { $limit: items }
            ]
          }
        },
        {
          $addFields: {
            totalPages: {
              $ceil: {
                $divide: [
                  { $arrayElemAt: ['$totalCount.total_slots', 0] },
                  items
                ]
              }
            }
          }
        }
      ]);

      const documents = result[0].paginatedResults as T[];
      const totalPages = result[0].totalPages;
      console.log(documents[0]);

      // Return the documents and total pages
      return { documents, totalPages };
    } catch (error) {
      throw new Error(`Error fetching filtered documents: ${error.message}`);
    }
  }

  //GET Pipelines
  async fetchDocumentPipeline<T extends Document, S>(
    model: Model<T>,
    projectFields: string[],
    matcher: Partial<Record<keyof T, any>>,
    errHelper: string
  ): Promise<S> {
    try {
      // Build the projection object
      const project = projectFields.reduce((acc, field) => {
        acc[field] = 1;
        return acc;
      }, {});

      // Build the pipeline
      const pipeline = await model.aggregate([
        { $match: { ...matcher } },
        { $project: project }
      ]);

      return pipeline[0] as S;
    } catch (error) {
      throw new Error(`Error fetching ${errHelper}: ${error.message}`);
    }
  }

  //Create pipelines
  async createDocumentPipeline<T extends Document, S>(
    model: Model<T>,
    projectFields: string[],
    data: Partial<T>,
    uniqueFields: Partial<Record<keyof T, any>>,
    errHelper: string[],
    type?: CREATE_PIPELINE,
    sanitizeFn?: (doc: T) => S
  ): Promise<S> {
    try {
      if (type === CREATE_PIPELINE.USER) {
        // Check for existing document
        const existingDoc = await model.findOne(uniqueFields);
        if (existingDoc) {
          throw new ConflictException(`${errHelper[0]} already exists`);
        }
      }

      if (type === CREATE_PIPELINE.SLOT) {
        // Check for existing document
        const existingDoc = await model.findOne(uniqueFields);
        if (!existingDoc) {
          throw new NotFoundException(`This ${errHelper[0]} does not exists`);
        }
      }

      // Create new document
      const newDoc = new model(data);
      await newDoc.save();

      // Build the projection object
      const project = projectFields.reduce((acc, field) => {
        acc[field] = 1;
        return acc;
      }, {});

      // Build the pipeline
      const pipeline = await model.aggregate([
        { $match: { _id: newDoc._id } },
        { $project: project }
      ]);
      console.log(pipeline);

      if (sanitizeFn) {
        // Sanitize and return the document
        return sanitizeFn(pipeline[0]);
      }
      return pipeline[0];
    } catch (error) {
      throw new Error(`Error creating ${errHelper[1]}: ${error.message}`);
    }
  }

  //Refined Pipelines
  //Dynamic documents
  async dynamicDocumentsPipeline<T extends Document, S>(
    model: Model<T>,
    return_as_object: boolean,
    project_fields: (keyof T)[],
    matcher: Partial<Record<keyof T, any>>,
    lookup_data?: _ILookup[],
    unwind_fields?: (keyof T)[],
    countFields?: string[], // New parameter to specify fields to count
    currentPage = 1,
    items = 10,
    sanitizeFn?: (doc: T) => AnyExpression,
    deeepLookup_data?: _ILookup[],
    deep_unwind_fields?: string[],
    setFields?: Record<string, any>,
    finalLookup?: _ILookup[],
    final_unwind_field?: string[]
  ): Promise<S> {
    try {
      if (currentPage < 1 || items < 1) {
        throw new Error('currentPage and items must be positive integers');
      }

      const pipeline: PipelineStage[] = [{ $match: matcher }];

      // Lookup stages
      lookup_data?.forEach((data) => {
        pipeline.push({
          $lookup: {
            from: data.from,
            as: data.as,
            localField: data.localField ?? '_id',
            foreignField: data.foreignField
          }
        });
      });

      // Unwind stages
      unwind_fields?.forEach((field) => {
        pipeline.push({
          $unwind: {
            path: `$${String(field)}`,
            preserveNullAndEmptyArrays: true
          }
        });
      });

      // Lookup stages
      deeepLookup_data?.forEach((data) => {
        pipeline.push({
          $lookup: {
            from: data.from,
            as: data.as,
            localField: data.localField ?? '_id',
            foreignField: data.foreignField
          }
        });
      });

      // Unwind stages
      deep_unwind_fields?.forEach((field) => {
        pipeline.push({
          $unwind: {
            path: `$${String(field)}`,
            preserveNullAndEmptyArrays: true
          }
        });
      });

      // Lookup stages
      finalLookup?.forEach((data) => {
        pipeline.push({
          $lookup: {
            from: data.from,
            as: data.as,
            localField: data.localField ?? '_id',
            foreignField: data.foreignField
          }
        });
      });

      // Unwind stages
      final_unwind_field?.forEach((field) => {
        pipeline.push({
          $unwind: {
            path: `$${String(field)}`,
            preserveNullAndEmptyArrays: true
          }
        });
      });

      if (setFields) {
        pipeline.push({
          $set: setFields
        });
      }

      // Project stage
      const project: Record<string, any> = {};
      project_fields.forEach((field) => {
        project[String(field)] = 1;
      });

      // Add fields to count
      countFields?.forEach((field) => {
        project[`${String(field)}_count`] = { $size: `$${String(field)}` };
      });

      if (Object.keys(project).length > 0) {
        pipeline.push({ $project: project });
      }

      // Pagination stages
      const offset = (currentPage - 1) * items;
      pipeline.push({ $skip: offset }, { $limit: items });

      // Execute pipeline
      const result = await model.aggregate(pipeline);
      console.log(result);

      // Return based on the 'return_as_object' flag
      if (return_as_object) {
        return sanitizeFn ? (sanitizeFn(result[0]) as unknown as S) : result[0];
      } else {
        return sanitizeFn
          ? (result.map((item) => sanitizeFn(item)) as unknown as S)
          : (result as unknown as S);
      }
    } catch (error) {
      throw new Error(`Error fetching filtered documents: ${error.message}`);
    }
  }
  // Number Plate Aggregation
  async checkIfNumberPlateExistsAggregation(
    model: Model<_IDbSlotReservation>,
    numberPlate: string
  ): Promise<boolean> {
    const pipeline: PipelineStage[] = [
      {
        $match: {
          number_plate: numberPlate
        }
      },
      {
        $limit: 1 // Limit to 1 document for efficiency
      },
      {
        $project: {
          _id: 1 // Project only the _id field
        }
      }
    ];

    const result = await model.aggregate(pipeline).exec();
    console.log(result);

    // Check if the result contains at least one document
    return result.length > 0;
  }
}
