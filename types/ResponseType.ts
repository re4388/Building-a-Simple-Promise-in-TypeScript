import { User } from './UserType';

export interface UserResponse {
  data: User;
  statusCode: StatusCode;
}

type StatusCode = 404 | 200;

export interface ErrorResponse {
  statusCode: StatusCode;
  message: string;
  error: string;
}
