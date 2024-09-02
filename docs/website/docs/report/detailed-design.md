---
sidebar_position: 50
---

# Detailed Design

N.B. In the diagrams of this section, interface notation has been used to represent the main concepts, however this will
then be encoded appropriately based on the microservice technology.


## Packages

Each microservice has a package structure that is similar to the following:

![Domain Events](./img/uml/packages.png)

## Domain Events

All domain events are part of the **Shared Kernel** and are used by all microservices.
The following diagram shows the domain events used in the system:

![Domain Events](./img/uml/domain-events.png)

<Image
src={require('./img/uml/domain-events.png').default}
align="center"
width="70%"
/>

## Microservices

### Auth

The Auth microservice is responsible for managing the authentication and authorization of users.
**User** entity here, has a focus on the authentication and authorization mechanisms.

![Auth](./img/uml/microservices/auth.png)

### User

The User microservice is responsible for managing user data.
The vision of the **User** entity here is different from the Auth microservice, as it focuses on the user's personal
data.

![User](./img/uml/microservices/user.png)

### Device

The Device microservice is responsible for managing the devices.
The focus here is on the **Capability** concept, which allows the device to have multiple and flexible types of
functionalities.

Moreover, **DeviceService** has an important role because it encapsulates the business logic for the device management
and connection using Web of Things (WoT) standard.

![Device](./img/uml/microservices/device.png)

### Monitoring

The Monitoring microservice has the responsibility of continuously listening to the devices and collecting the data.

![Monitoring](./img/uml/microservices/monitoring.png)

### Alarm

![Alarm](./img/uml/microservices/alarm.png)

### Recognition

![Recognition](./img/uml/microservices/recognition.png)

### Notification

![Notification](./img/uml/microservices/notification.png)

### Log

![Log](./img/uml/microservices/log.png)
