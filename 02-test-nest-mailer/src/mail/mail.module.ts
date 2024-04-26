import {MailerModule} from "@nestjs-modules/mailer";
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import {ConfigService} from "@nestjs/config";
import {MailService} from "./mail.service";
import {Module} from "@nestjs/common";
import { join } from 'path';

@Module({
    providers: [MailService],
    imports: [
        MailerModule.forRootAsync({
            useFactory: async (config: ConfigService) => (
                {
                    transport: {
                        host: config.get("MAIL_HOST"),
                        port: Number(config.get("MAIL_PORT")),
                        auth: {
                            user: config.get("MAIL_USER"),
                            pass: config.get("MAIL_PASS"),
                        },
                    },
                    defaults: {
                        from: '"No Reply" <noreply@example.com>',
                    },
                    template: {
                        dir: join(__dirname, "templates"),
                        adapter: new HandlebarsAdapter(),
                        options: {
                            strict: true
                        }
                    }
                }
            ),
            inject: [ConfigService]
        })
    ],

})
export class MailModule {
}
