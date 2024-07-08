import { _ILookup } from '../interfaces/responses.interface';

export interface _IAggregationFields<T> {
  /** test */
  lookups?: _ILookup[];
  deepLookups?: _ILookup[];
  unwind_fields?: (keyof T)[];
  deep_unwind_fields?: string[];
  project_fields?: (keyof T)[];
  count_fields?: string[];
  field_names?: string[];
}
