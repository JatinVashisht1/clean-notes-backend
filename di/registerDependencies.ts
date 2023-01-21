import { container } from "tsyringe";
import { IDao } from "../domain/database/IDao";
import { CONSTANTS } from "../core/constants";
import { Dao } from "../data/database/Dao";
import { IRepository } from "../domain/repository/IRepository";
import { Repository } from "../data/repository/Repository";

/**
 * registers dependencies for `IDao` and `IRepository`.
 *
 * `Dao.ts` used for IDao and `Repository.ts` is used for IRepository.
 * */
export default function registerDependencies() {
  container.register<IDao>(CONSTANTS.DAO_DEPENDENCY, {
    useClass: Dao,
  });

  container.register<IRepository>(CONSTANTS.REPOSITORY_DEPENDENCY, {
    useClass: Repository,
  });
}

/**
 * provides instance of `IRepository.d.ts`.
 * @returns {Repository} is returned as instance of IRepository type.
 * */
export function getRepository(): IRepository {
  container.resolve<Dao>(CONSTANTS.DAO_DEPENDENCY);
  const repo = container.resolve<Repository>(CONSTANTS.REPOSITORY_DEPENDENCY);

  return repo;
}
