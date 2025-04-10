import * as nodemailer from 'nodemailer';

export class Nodemailer {
  private transporter: any;
  private maillist: string[];

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com ',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, //process.env.MAIL_PASS,
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
