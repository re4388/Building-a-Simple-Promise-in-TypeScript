import { ErrorResponse } from './types/ResponseType';
import { ResolveFn, ExecutionFns, errorFn } from './types/PromiseType';

export class PromiseSimple {
  resolveFns: ResolveFn[];

  // we will use this like // new PromiseSimple((resolve, reject) => {resolve(..) & reject(..) }
  constructor(resolveAndRejectCBs: ExecutionFns) {
    this.resolveFns = [];
    this.onResolve = this.onResolve.bind(this);
    this.onReject = this.onReject.bind(this);
    resolveAndRejectCBs(this.onResolve, this.onReject);
  }

  private onResolve(arg: any) {
    let passingValue = arg;

    try {
      this.resolveFns.forEach((fn) => {
        passingValue = fn(passingValue); // key part 2: 返回值穿透 we get the returned promise value from cb's arg
      });
    } catch (error) {
      this.resolveFns = []; // clear all fns if any
      this.onReject(error);
    }
  }

  private onReject(error: ErrorResponse): void {
    this.handleError(error);
  }

  // key part 1: 回調函數不是直接聲明的，而是在通過後面的 then 方法傳入的
  public then(handleSuccessFn: ResolveFn) {
    this.resolveFns.push(handleSuccessFn);

    return this; // to chain multiple then() since returning the object itself
  }

  // key part 3:錯誤冒泡, use one catch to get all possible error along the promise chain
  public catch(handleErrorFn: errorFn) {
    this.handleError = handleErrorFn;

    return this;
  }

  handleError(err: ErrorResponse): void {
    console.error(err);
  }
}
