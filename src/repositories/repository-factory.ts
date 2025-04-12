import AtpRepository from './services/atp-repository';

interface IRepositoryType<T> extends Function {
  new (...args: any[]): T;
}

export type RepositoryType = IRepositoryType<any>;

export default class RepositoryFactory {
  constructor() {}

  public create<T>(type: IRepositoryType<T>, constructorOptions?: any): T {
    if (Object.prototype.isPrototypeOf.call(AtpRepository, type)) {
      return new type(constructorOptions);
    } else {
      throw new Error(`Failed to create ${type.name} repository: Not an AtpRepository subclass`);
    }
  }
}
