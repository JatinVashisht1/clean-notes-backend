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
import { CreateUserUseCase } from "../domain/usecases/userUseCases/CreateUserUseCase";
import { UserExistUseCase } from "../domain/usecases/userUseCases/UserExistUseCase";
import { TokenExistUseCase } from "../domain/usecases/userUseCases/TokenExistUseCase";
import { GetUserByEmailWithPasswordUseCase } from "../domain/usecases/userUseCases/GetUserByEmailWithPasswordUseCase";

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

  container.registerSingleton<IUserDao>(CONSTANTS.USER_DAO_DEPENDENCY, UserDao);

  container.registerSingleton<IUserRepository>(
    CONSTANTS.USER_REPOSITORY_DEPENDENCY,
    UserRepository
  );

  container.resolve<NoteDao>(CONSTANTS.NOTE_DAO_DEPENDENCY);
  container.resolve<UserDao>(CONSTANTS.USER_DAO_DEPENDENCY);
  container.resolve<UserRepository>(CONSTANTS.USER_REPOSITORY_DEPENDENCY);
}

/**
 * provides instance of `IRepository.d.ts`.
 * @returns {NoteRepository} is returned as instance of IRepository type.
 * */
export function getNoteRepository(): INoteRepository {
  const repo = container.resolve<NoteRepository>(
    CONSTANTS.NOTE_REPOSITORY_DEPENDENCY
  );

  return repo;
}

export function getCreateUserUseCase(): CreateUserUseCase {
  const createUserUseCase = container.resolve(CreateUserUseCase);

  return createUserUseCase;
}

export function getUserExistUseCase(): UserExistUseCase {
  const userExistUseCase = container.resolve(UserExistUseCase);

  return userExistUseCase;
}

export function getTokenExistUseCase(): TokenExistUseCase {
  const tokenExistUseCase = container.resolve(TokenExistUseCase);

  return tokenExistUseCase;
}

export function getGetUserByEmailWithPasswordUseCase(): GetUserByEmailWithPasswordUseCase {
  const getEmailWithPasswordUseCase = container.resolve(
    GetUserByEmailWithPasswordUseCase
  );

  return getEmailWithPasswordUseCase;
}
