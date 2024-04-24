import fastify, { FastifyInstance } from "fastify";
import { useRouter } from "./routes";

const port = 3000;
const app: FastifyInstance = fastify();
app.register(useRouter, {
  prefix: "/user",
});

app.get("/", () => "Hello world");

const start = () => {
  app.listen(
    {
      port,
      host: "0.0.0.0",
    },
    () => console.log(`🚀 app running on port ${port}...`)
  );
};

start();
