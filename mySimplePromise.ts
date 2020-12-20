import { ErrorResponse } from './types/ResponseType';
import { ResolveFn, ExecutionFns, errorFn } from './types/PromiseType';

export class PromiseSimple {
  resolveFnArray: ResolveFn[];

  constructor(executionCallBacks: ExecutionFns) {
    this.resolveFnArray = [];
    this.callFnInArrayAndReassignResult = this.callFnInArrayAndReassignResult.bind(
      this
    );
    this.onReject = this.onReject.bind(this);
    executionCallBacks(this.callFnInArrayAndReassignResult, this.onReject); // this is why you have this line: new PromiseSimple((resolve, reject) => {}
  }

  private callFnInArrayAndReassignResult(value: any) {
    let storedValue = value;

    try {
      this.resolveFnArray.forEach((fn) => {
        storedValue = fn(storedValue);
      });
    } catch (error) {
      this.resolveFnArray = [];
      this.onReject(error);
    }
  }

  private onReject(error: ErrorResponse): void {
    this.handleError(error);
  }

  public then(handleSuccess: ResolveFn) {
    this.resolveFnArray.push(handleSuccess);

    return this; // to chain multiple then() since returning the object itself
  }

  public catch(handleError: errorFn) {
    this.handleError = handleError;

    return this;
  }

  handleError(err: ErrorResponse): void {
    console.error(err);
  }
}
