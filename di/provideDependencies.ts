import { container } from "tsyringe";
import { IDao } from "../domain/database/IDao";
import { CONSTANTS } from "../core/constants";
import { Dao } from "../data/database/Dao";
import { IRepository } from "../domain/repository/IRepository";
import { Repository } from "../data/repository/Repository";

export default function provideDependencies() {
  container.register<IDao>(CONSTANTS.DAO_DEPENDENCY, {
    useClass: Dao,
  });

  container.register<IRepository>(CONSTANTS.REPOSITORY_DEPENDENCY, {
    useClass: Repository,
  });
}

export function getRepository(): IRepository {
  container.resolve<Dao>(CONSTANTS.DAO_DEPENDENCY);
  const repo = container.resolve<Repository>(CONSTANTS.REPOSITORY_DEPENDENCY);

  return repo;
}
