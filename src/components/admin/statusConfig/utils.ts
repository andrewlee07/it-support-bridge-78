
/**
 * Helper function to get typed keys of an object
 */
export const getKeys = <T extends object>(obj: T): (keyof T)[] => {
  return Object.keys(obj) as (keyof T)[];
};
