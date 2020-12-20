import { ErrorResponse } from './ResponseType';

export interface ExecutionFns {
  (onResolve: ResolveFn, onError: errorFn): void;
}

export interface ResolveFn {
  (value: any): void;
}

export interface errorFn {
  (error: ErrorResponse): void;
}
