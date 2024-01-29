import { ObjectClass } from '../domain/security-rule/core/impl/enum/ObjectClass.js'

export class ObjectClassConverter {
  static convertToObjectClass(type: String): ObjectClass {
    switch (type.toUpperCase()) {
      case 'ANIMAL':
        return ObjectClass.ANIMAL
      case 'PERSON':
        return ObjectClass.PERSON
      case 'VEHICLE':
        return ObjectClass.VEHICLE
      default:
        throw new Error('Object class not found')
    }
  }

  static convertToString(type: ObjectClass): String {
    switch (type) {
      case ObjectClass.ANIMAL:
        return 'ANIMAL'
      case ObjectClass.PERSON:
        return 'PERSON'
      case ObjectClass.VEHICLE:
        return 'VEHICLE'
      default:
        throw new Error('Object class not found')
    }
  }
}
