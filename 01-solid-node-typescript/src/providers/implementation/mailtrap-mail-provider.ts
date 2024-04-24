import { MailProvider, SendMailProps } from "../mail-provider";
import nodemailer, { Transporter } from "nodemailer";
export class MailtrapMailProvider implements MailProvider {
  private transporter : Transporter;

  constructor() {
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "b5cb4d4e6361ae",
        pass: "04d8570413e29c"
      }
    });
    this.transporter = transport
  }

  async sendMail(props: SendMailProps): Promise<void> {
    await this.transporter.sendMail({
      from: {
        name: props.from.name,
        address: props.from.email
      },
      to: {
        name: props.to.name,
        address: props.to.email
      },
      subject : props.title,
      html : props.content
    });
  }
}
