
// API Response Type
export interface ApiError {
  message: string;
  code: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: ApiError | null;
}

// Reexport from other type files for convenience
export * from './ticket';
export * from './problem';
export * from './backlogTypes';
export * from './release';
export * from './taskTypes';
export * from './test';
