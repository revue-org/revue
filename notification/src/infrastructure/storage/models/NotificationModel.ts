import { Notification } from "@/domain/core/Notification";
import { NotificationFactory } from "@/domain/factories/NotificationFactory";

export interface NotificationDBEntity {
    id: string
    type: string
    message: string
    data: {
        intrusionRuleId?: string
        objectClass?: string
        rangeRuleId?: string
        measureType?: string
        value?: object
    }
}

export class NotificationDBAdapter {

    static asDomainEntity(notification: NotificationDBEntity): Notification {
        if (notification.type === 'outlier') {
            return NotificationFactory.createNotification(
                NotificationFactory.idOf(notification.id),
                notification.message,
                notification.data.rangeRuleId as string,
                notification.data.measureType as string,
                notification.data.value as object
            )
        } else if (notification.type === 'intrusion') {
            return NotificationFactory.createIntrusionRule(
                NotificationFactory.idOf(notification.id),
                notification.message,
                notification.data.objectClass as string
            )
        }
    }

    static asDBEntity(notification: Notification): NotificationDBEntity {
        const permissions = notification.permissions.map((permission: Permission) => {
            return {
                qualcosa: permission.qualcosa
                qualcosaltro: permission.qualcosaltro
            }
        })
        return {
            id: notification.id.mail,
            notificationname: notification.notificationname,
            password: notification.password,
            permissions: permissions,
            refreshToken: notification.refreshToken
        }
    }
}
