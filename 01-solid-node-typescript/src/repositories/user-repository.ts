import { UserEntity } from "../entities/user-entity";

export interface UserRepository {
  findByEmail(email: string): Promise<UserEntity>;
  save(user: UserEntity): Promise<UserEntity>;
}
