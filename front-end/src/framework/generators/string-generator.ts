export const generateNodeKey = (prefix: string): string => `${prefix}_${new Date().getTime()}`;
