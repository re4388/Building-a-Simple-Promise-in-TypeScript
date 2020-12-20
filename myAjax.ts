import { PromiseSimple } from './mySimplePromise';
import { fakeApiBackend } from './fakeBackend';
import { ErrorResponse, UserResponse } from './types/ResponseType';

// Assume this is your AJAX library. Almost all newer
// ones return a Promise Object
export function makeApiCall() {
  return new PromiseSimple((resolve, reject) => {
    // Use setTimeout to simulate the network delay waiting for the response.
    // This is THE reason you use a promise. It waits for the API to respond
    // and after received, it executes code in the `then()` blocks in order.
    // If it executed is immediately, there would be no data.
    setTimeout(() => {
      const apiResponse = fakeApiBackend();
      if (apiResponse.statusCode >= 400) {
        reject(<ErrorResponse>apiResponse);
      } else {
        const successResponse = <UserResponse>apiResponse;
        resolve(successResponse.data);
      }
    }, 5000);
  });
}
