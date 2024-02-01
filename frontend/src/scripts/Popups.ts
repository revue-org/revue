import { type QVueGlobals } from 'quasar'
export const popPositive = (q: QVueGlobals, message: string): void => {
  q.notify({
    type: 'positive',
    message: message
  })
}

export const popNegative = (q: QVueGlobals, message: string): void => {
  q.notify({
    type: 'negative',
    message: message
  })
}

export const popDelete = (q: QVueGlobals, message: string, confirmHandler: () => void): void => {
  q.notify({
    message: message,
    position: 'center',
    actions: [
      { label: 'No', color: 'primary', handler: (): void => {} },
      {
        label: 'Yes',
        color: 'red',
        handler: (): void => {
          confirmHandler()
        }
      }
    ],
    timeout: 0
  })
}
