export * from './authentication-response';
export * from './post-response';
export * from './feed-response';

export interface BasicResponse {
  readonly data: any;
  readonly errors?: Error[];
}

export interface DataResponse<T> extends BasicResponse {
  readonly data: T | null;
}

export interface DatasetResponse<T> extends BasicResponse {
  readonly data: T[];
  readonly nextToken?: string;
}
export abstract class DataResponseBase<T> {
  public abstract toJSON(): DataResponse<T> | DatasetResponse<T>;
}
