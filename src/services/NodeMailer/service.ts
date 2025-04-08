// import nodemailer from 'nodemailer';

// export class Nodemailer {
//   private transporter: any;
//   private maillist: string[];

//   constructor() {
//     this.transporter = nodemailer.createTransport({
//       host: '',
//       port: 465,
//       secure: true, // true for 465, false for other ports
//       auth: {
//         user: '',
//         pass: 
//       },
//     });
//     this.maillist = ['info@.com', 'info@.africa'];
//   }

//   public async sendEmailToVerify(
//     subject: string,
//     logObj: { requestId: string; method: string },
//   ): Promise<void> {
//     const mailOptions: nodemailer.SendMailOptions = {
//       from: ' FX TRADING <info@.com>',
//       to: this.maillist,
//       subject: 'FX TRADING By',
//       html: `<b>Hey there! </b> <br><br> Please verify your account <br><br> -  <b>${subject}</b>`,
//     };
//     try {
//       const info = await this.transporter.sendMail(mailOptions);

//       console.log('Email sent:', info.response);
//     } catch (error) {
//       console.error('Email sending failed:', error);
//     }
//   }
// }
