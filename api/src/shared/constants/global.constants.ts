import { FilterQuery } from 'mongoose';

// Construct conditions for each field name
export const createFilterConditions = <T>(
  fieldNames: (keyof T)[],
  query: string,
  specificFilter?: keyof T,
  specificValue?: any
) => {
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

  const specificCondition = () => {
    if (!isNaN(Number(specificValue))) {
      return {
        [specificFilter]: Number(specificValue)
      };
    } else {
      return {
        [specificFilter]: { $regex: specificValue, $options: 'i' }
      };
    }
  };

  if (query) {
    if (specificFilter && specificValue) {
      return {
        $and: [specificCondition()],
        $or: simpleConditions
      } as unknown as FilterQuery<T>;
    }
    return {
      $or: simpleConditions
    } as unknown as FilterQuery<T>;
  } else {
    if (specificFilter && specificValue) {
      return {
        $and: [specificCondition()]
      } as unknown as FilterQuery<T>;
    }
    return {};
  }
};
