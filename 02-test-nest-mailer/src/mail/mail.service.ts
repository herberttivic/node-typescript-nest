import {ConflictException, Injectable, LoggerService} from '@nestjs/common';
import {MailerService} from "@nestjs-modules/mailer";
import {logger} from "handlebars";

@Injectable()
export class MailService {

    constructor(
        private readonly mailerService: MailerService
    ) {
    }

    async sendMail(): Promise<string> {
        try {
            await this.mailerService.sendMail({
                from: "email@test.com",
                to: "herbertduarte.santos@gmail.com",
                subject: "Teste",
                template: "./test",
                context: {
                    name: "Herbert Duarte",
                    url: "https://herbertduarte.vercel.app"
                },
            })
            return "Done";
        } catch (e) {
            console.log(e)
            throw new ConflictException("Erro ao enviar o email: " + e.message)
        }

    }
}
