/**
 * Function to retrieve the value of a property from an object.
 *
 * @template T - A generic type representing the type of the object.
 * @param {T} entity - The object from which to retrieve the value.
 * @param {keyof T} helper - The key of the property whose value is to be retrieved.
 * @returns {T[keyof T] | undefined} - The value of the property if it exists, otherwise undefined.
 *
 * @example
 * // Define an object with various properties.
 * const user = { id: 1, name: "John Doe", email: "john@example.com" };
 *
 * // Retrieve the value of the 'name' property.
 * const userName = getValue(user, "name");
 * // userName is "John Doe"
 *
 * // Attempt to retrieve the value of a non-existent property.
 * const userAge = getValue(user, "age");
 * // userAge is undefined
 */
function getValue<T extends Record<string, any>>(
  entity: T,
  helper: keyof T
): T[keyof T] | string {
  // Check if the 'helper' key exists in the 'entity' object.
  // If it exists, return the corresponding value.
  // Otherwise, return undefined.
  return helper in entity ? entity[helper] : '';
}

// Utility function to group field configurations
const groupFieldConfigs = (fields: FieldConfig[]) => {
  return fields.reduce((groups, field) => {
    const group = field.group || 'default'; // Use 'default' if no group is specified
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(field);
    return groups;
  }, {} as Record<string, FieldConfig[]>);
};



export { getValue, groupFieldConfigs }