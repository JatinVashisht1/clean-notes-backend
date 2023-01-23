import { container } from "tsyringe";
import { INoteDao } from "../domain/database/notes/INoteDao";
import { CONSTANTS } from "../core/constants";
import { NoteDao } from "../data/database/notes/NoteDao";
import { INoteRepository } from "../domain/repository/notes/INoteRepository";
import { NoteRepository } from "../data/repository/notes/NoteRepository";
import { IUserDao } from "../domain/database/users/IUserDao";
import { UserDao } from "../data/database/users/UserDao";
import { IUserRepository } from "../domain/repository/users/IUserRepository";
import { UserRepository } from "../data/repository/users/UserRepository";

/**
 * registers dependencies for `IDao` and `IRepository`.
 *
 * `Dao.ts` used for IDao and `Repository.ts` is used for IRepository.
 * */
export default function registerDependencies() {
  container.register<INoteDao>(CONSTANTS.NOTE_DAO_DEPENDENCY, {
    useClass: NoteDao,
  });

  container.register<INoteRepository>(CONSTANTS.NOTE_REPOSITORY_DEPENDENCY, {
    useClass: NoteRepository,
  });

  container.register<IUserDao>(CONSTANTS.USER_DAO_DEPENDENCY, {
    useClass: UserDao,
  });

  container.register<IUserRepository>(CONSTANTS.USER_REPOSITORY_DEPENDENCY, {
    useClass: UserRepository,
  });
}

/**
 * provides instance of `IRepository.d.ts`.
 * @returns {NoteRepository} is returned as instance of IRepository type.
 * */
export function getNoteRepository(): INoteRepository {
  container.resolve<NoteDao>(CONSTANTS.NOTE_DAO_DEPENDENCY);
  const repo = container.resolve<NoteRepository>(
    CONSTANTS.NOTE_REPOSITORY_DEPENDENCY
  );

  return repo;
}
