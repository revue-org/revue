
import { type QVueGlobals } from "quasar";
export const popPositive = (q: QVueGlobals, message: string): void => {
  q.notify({
    type: 'positive',
    message: message
  })
}

export const popNegative = (q: QVueGlobals, message: string): void =>  {
  q.notify({
    type: 'negative',
    message: message
  })
}
