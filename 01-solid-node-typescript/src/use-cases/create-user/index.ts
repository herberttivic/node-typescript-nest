import { MailtrapMailProvider } from "../../providers/implementation/mailtrap-mail-provider";
import { PostgresUserRepository } from "../../repositories/implementation/postgres-user-repository";
import { CreateUserController } from "./create-user-controller";
import { CreateUserUseCase } from "./create-user-use-case";

const postgresUserRepository = new PostgresUserRepository();
const maitrapProvider = new MailtrapMailProvider();

const createUserUseCase = new CreateUserUseCase(postgresUserRepository, maitrapProvider);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
