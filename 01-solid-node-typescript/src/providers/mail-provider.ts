interface MailAdress {
  name: string;
  email: string;
}

export interface SendMailProps {
  from: MailAdress;
  to: MailAdress;
  title: string;
  content: string;
}

export interface MailProvider {
  sendMail(props: SendMailProps): Promise<void>;
}
