import { MailService } from '../MailService.js'
import nodemailer from 'nodemailer'
import { Notification } from '../../../domain/notification/core/Notification.js'
import { DeviceType } from '../../../domain/device/core'
import { DeviceTypeConverter } from '../../../utils'
import { Exceeding, Intrusion } from '../../../domain/alarm-system/core'

export class MailServiceImpl implements MailService {
  private transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'revue.noreply@gmail.com',
      pass: 'nptavapeeorbovyp'
    }
  })

  sendMail(to: string, notification: Notification): void {
    const subject: string =
      notification.anomaly.deviceId.type === DeviceType.SENSOR ? 'Exceeding' : 'Intrusion'

    const body: string =
      DeviceTypeConverter.convertToString(notification.anomaly.deviceId.type) +
      ' [' +
      notification.anomaly.deviceId.code +
      '] has detected an ' +
      subject.toLowerCase() +
      ' at ' +
      notification.anomaly.timestamp +
      '.\n\n' +
      'Details:\n' +
      'Anomaly ID: ' +
      notification.anomaly.anomalyId +
      '\n' +
      subject +
      ' : ' +
      (notification.anomaly.deviceId.type === DeviceType.SENSOR
        ? (notification.anomaly as Exceeding).measure + ' ' + (notification.anomaly as Exceeding).value
        : (notification.anomaly as Intrusion).intrusionObject)
    const mailOptions = {
      from: 'revue.noreply@gmail.com',
      to: to,
      subject: 'Revue Alert: ' + subject + ' detected',
      text: body
    }

    this.transporter.sendMail(mailOptions, (error, info): void => {
      if (error) {
        console.error('Error sending email: ', error)
      } else {
        console.log('Email sent: ', info.response)
      }
    })
  }
}
