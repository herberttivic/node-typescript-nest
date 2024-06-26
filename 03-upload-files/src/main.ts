import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from "node:path";
import {NestExpressApplication} from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(path.join(__dirname, "../uploads"))
  await app.listen(3000);
}
bootstrap();
