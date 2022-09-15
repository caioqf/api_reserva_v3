import { Action, ClassConstructor, IocAdapter } from "routing-controllers";
import { DependencyContainer } from "tsyringe";

export class TsryingeAdapter implements IocAdapter {
  constructor(private readonly tsyringeContainer: DependencyContainer) {}
  get<T>(someClass: ClassConstructor<T>): T {
    const childContainer = this.tsyringeContainer.createChildContainer()
    return childContainer.resolve<T>(someClass)
  }

}