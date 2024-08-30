export const sumReducer = (arr: any[]) =>
  arr.filter((x) => x).reduce((a, b) => a + b, 0);
