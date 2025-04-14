import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();

export class Nodemailer {
  private transporter: any;
  private maillist: string[];

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'adetoyebamise@gmail.com',
        pass: 'xrygeydnpygumtpj',
      },
    });
    this.maillist = ['adetoyebamise@gmail.com'];
  }

  public async sendEmailToUser(
    toEmail: string,
    subject: string,
  ): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: '<adetoyebamise@gmail.com>',
      to: [this.maillist, toEmail],
      subject: 'FX trading',
      html: `<b>Hey there! </b> <br><br> You've got a notification from  app <br><br> -  <b>${subject}</b>`,
    };
    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Email sending failed:', error);
    }
  }
}
