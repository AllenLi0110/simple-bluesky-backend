import { DataResponse, DataResponseBase } from '@/responses';

export default class Model<T> extends DataResponseBase<T> {
  [key: string]: any;

  constructor(data?: T) {
    super();
    this.defineProperties(data);
  }

  protected defineProperties(data?: T): void {
    if (data) {
      for (let key in data) {
        if (this[key] !== undefined) {
          continue;
        }
        Object.defineProperty(this, key, {
          value: data[key],
          configurable: true,
          enumerable: true,
          writable: !Object.isFrozen(data[key]),
        });
      }
    }
  }

  public toJSON(): DataResponse<T> {
    return {
      data: this.data,
      errors: [],
    };
  }
}
