import { MailService } from '../MailService.js'
import { Notification } from '@/domain/core/Notification'

export class MailServiceImpl implements MailService {
  private readonly transporter

  constructor(transporter: any) {
    this.transporter = transporter
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
