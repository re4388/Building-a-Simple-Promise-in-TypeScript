import { responseWithPossibleError } from './util';
import { ErrorResponse, UserResponse } from './types/ResponseType';

export function fakeApiBackend(): UserResponse | ErrorResponse {
  const user = {
    username: 'Jack',
    favoriteNumber: 42,
    profile: 'https://gitconnected.com/jack',
  };

  return responseWithPossibleError(user);
}
