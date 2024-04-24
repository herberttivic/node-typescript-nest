import { FastifyInstance } from "fastify";
import { createUserController } from "./use-cases/create-user";

const useRouter = async (fastify: FastifyInstance) => {
  fastify.post("/", createUserController.handle);
};

export {useRouter}