export const getHighestZIndex = (zIndexes: number[]): number => {
    return Math.max(...zIndexes, 0);
  };
  
  export const generateNewZIndex = (currentHighest: number): number => {
    return currentHighest + 1;
  };