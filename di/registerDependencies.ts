import { container } from "tsyringe";
import { INoteDao } from "../domain/database/INoteDao";
import { CONSTANTS } from "../core/constants";
import { NoteDao } from "../data/database/notes/NoteDao";
import { INoteRepository } from "../domain/repository/INoteRepository";
import { NoteRepository } from "../data/repository/NoteRepository";

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
}

/**
 * provides instance of `IRepository.d.ts`.
 * @returns {NoteRepository} is returned as instance of IRepository type.
 * */
export function getRepository(): INoteRepository {
  container.resolve<NoteDao>(CONSTANTS.NOTE_DAO_DEPENDENCY);
  const repo = container.resolve<NoteRepository>(
    CONSTANTS.NOTE_REPOSITORY_DEPENDENCY
  );

  return repo;
}
