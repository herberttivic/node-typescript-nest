import { UserEntity } from "../../entities/user-entity";
import { UserRepository } from "../user-repository";

export class PostgresUserRepository implements UserRepository {
 // -- usando repositório fake sem conectar ao postgres 
  private users: UserEntity[] = [];
 // --
 async save(user: UserEntity): Promise<UserEntity> {
  this.users.push(user);
  return user;
}
  async findByEmail(email: string): Promise<UserEntity> {
    const userFound = this.users.find((user) => user.email === email);

    if (userFound) {
      return userFound;
    }

  }

}
