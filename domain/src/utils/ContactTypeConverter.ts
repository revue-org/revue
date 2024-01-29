import { ContactType } from '../domain/monitoring/core/impl/enum/ContactType.js'

export class ContactTypeConverter {
  static convertToContactType(type: String): ContactType {
    switch (type.toUpperCase()) {
      case 'EMAIL':
        return ContactType.EMAIL
      case 'SMS':
        return ContactType.SMS
      default:
        throw new Error('Contact type not found')
    }
  }

  static convertToString(type: ContactType): String {
    switch (type) {
      case ContactType.EMAIL:
        return 'EMAIL'
      case ContactType.SMS:
        return 'SMS'
      default:
        throw new Error('Contact type not found')
    }
  }
}
