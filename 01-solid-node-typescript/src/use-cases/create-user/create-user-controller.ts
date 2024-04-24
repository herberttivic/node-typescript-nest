import { FastifyRequest, FastifyReply } from "fastify";
import { UserEntity } from "../../entities/user-entity";
import { CreateUserUseCase } from "./create-user-use-case";

export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async handle(
    request: FastifyRequest<{ Body: UserEntity }>,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const { name, email, password } = request.body;

    try {
      const savedUser = await this.createUserUseCase.execute({ name, email, password });

      return reply.status(201).send(savedUser);
      
    } catch (error) {
      console.log(error)
      return reply.status(400).send({
        message: error.message || "Unexpected error!",
      });
    }
  }
}
