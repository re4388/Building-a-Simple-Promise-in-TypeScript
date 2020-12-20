import { ErrorResponse, UserResponse } from './types/ResponseType';
import { User } from './types/UserType';

/* Introduce a randomness to simulate error */
export function responseWithPossibleError(
  user: User
): UserResponse | ErrorResponse {
  if (Math.random() > 0.05) {
    return {
      data: user,
      statusCode: 200,
    };
  } else {
    return {
      statusCode: 404,
      message: 'Could not find user',
      error: 'Not Found',
    };
  }
}
