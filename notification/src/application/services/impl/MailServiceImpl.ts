import { MailService } from '../MailService.js'
import { Notification } from '@/domain/core/Notification'
import nodemailer from 'nodemailer'

export class MailServiceImpl implements MailService {
  private readonly transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    })
  }

  sendMail(to: string, notification: Notification): void {
    const subject: string = notification.event.type === 'outlier' ? 'Outlier' : 'Intrusion'
    const body: string = 'TODO'
    const mailOptions = {
      from: 'revue.noreply@gmail.com',
      to: to,
      subject: 'Revue Alert: ' + subject + ' detected',
      text: body
    }

    console.log('Sending email...')
    if (this.transporter !== null) {
      this.transporter.sendMail(mailOptions, (error: any, info: { response: any }): void => {
        if (error) {
          console.error('Error sending email: ', error)
        } else {
          console.log('Email sent: ', info.response)
        }
      })
    }
  }
}
