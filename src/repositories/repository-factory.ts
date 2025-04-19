import AtpRepository from './services/atp-repository';
import QueueRepository from './services/queue-repository';

interface IRepositoryType<T> extends Function {
  new (...args: any[]): T;
}

export type RepositoryType = IRepositoryType<any>;

export default class RepositoryFactory {
  constructor() {}

  public create<T>(type: IRepositoryType<T>, constructorOptions?: any): T {
    const repositoryClass = Object.create(type.prototype);
    let isAtpRepository = repositoryClass instanceof AtpRepository;
    let isQueueRepository = repositoryClass instanceof QueueRepository;
    if (isAtpRepository || isQueueRepository) {
      return new type(constructorOptions);
    } else {
      throw new Error(`Failed to create ${type.name} repository: Not an AtpRepository subclass`);
    }
  }
}
