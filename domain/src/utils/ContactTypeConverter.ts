import { ContactType } from '../domain/monitoring/core/impl/ContactType.js'

export class ContactTypeConverter {
  static convertToContactType(type: String): ContactType {
    switch (type.toUpperCase()) {
      case 'SMS':
        return ContactType.SMS
      case 'EMAIL':
        return ContactType.EMAIL
      default:
        throw new Error('Contact type not found')
    }
  }

  static convertToString(type: ContactType): String {
    switch (type) {
      case ContactType.SMS:
        return 'SMS'
      case ContactType.EMAIL:
        return 'EMAIL'
      default:
        throw new Error('Contact type not found')
    }
  }
}
