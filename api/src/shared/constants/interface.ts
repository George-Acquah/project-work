import { _ILookup } from '../interfaces/responses.interface';

export interface _IAggregationFields<T> {
  /** test */
  lookups?: _ILookup[];
  unwind_fields?: (keyof T)[];
  project_fields?: (keyof T)[];
  count_fields?: string[];
  field_names?: string[];
}
