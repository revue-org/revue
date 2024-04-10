import { MailService } from '../MailService.js'
import { Notification } from '../../../domain/notification/core/Notification.js'
import { DeviceType } from '../../../domain/device/core/impl/enum/DeviceType.js'
import { DeviceTypeConverter } from '../../../utils/DeviceTypeConverter.js'
import { Exceeding } from '../../../domain/alarm-system/core/Exceeding.js'
import { Intrusion } from '../../../domain/alarm-system/core/Intrusion.js'
import { MeasureConverter } from '../../../utils/MeasureConverter.js'
import { ObjectClassConverter } from '../../../utils/ObjectClassConverter.js'

export class MailServiceImpl implements MailService {
  private transporter

  constructor(transporter: any) {
    this.transporter = transporter
  }

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
        ? MeasureConverter.convertToString((notification.anomaly as Exceeding).measure) +
          ' ' +
          (notification.anomaly as Exceeding).value
        : ObjectClassConverter.convertToString((notification.anomaly as Intrusion).intrusionObject))
    const mailOptions = {
      from: 'revue.noreply@gmail.com',
      to: to,
      subject: 'Revue Alert: ' + subject + ' detected',
      text: body
    }

    console.log('Sending email...')
    this.transporter.sendMail(mailOptions, (error: any, info: { response: any }): void => {
      if (error) {
        console.error('Error sending email: ', error)
      } else {
        console.log('Email sent: ', info.response)
      }
    })
  }
}
