// Helper type to determine if 'S' is an array and extract its element type
export type IfArrayThenElementType<T> = T extends (infer U)[] ? U : T;

// Helper function to determine if a type is an array
function isTypeArray<T>(): boolean {
  // Create a dummy array of type 'IfArrayThenElementType<T>[]'
  // and check if it's an array to infer if 'T' is an array type
  return Array.isArray([] as IfArrayThenElementType<T>[]);
}

export { isTypeArray };
