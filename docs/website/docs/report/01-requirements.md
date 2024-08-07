# Requirements

## Business Requirements

In this section, we will define the business requirements of the system due to the user roles and prospective
functionalities. 
There are two main roles: the **Admin** and the **Guardian**,
where not specified the role is referred to the **Guardian**.


### User Creation

A registered Admin can create a new user in the system. 
The user will have access to the system and will be able to consult the devices depending on the location permissions.

![Admin User Management Use Case](./img/AdminGuardianUseCase.png)

1. Register a new user in the system.

- **Actor**: Admin
- **Precondition**: The admin is logged in the system, and the user is not registered yet.
- **Post condition**: The user is created in the system, can access the system and consult the devices depending on his permissions.
- **Flow**:
   1. The admin moves to the "Create User" section.
   2. The admin fills the user information.
   3. The admin selects the locations that the user can access.
   4. The system after precise checks creates the user.
- **Main Success Scenario**:
   1. The user is created in the system.
- **Extensions**:
   1. The user already exists in the system.
   2. The user information is not filled correctly.

2. Modify user information and permissions.

- **Actor**: Admin
- **Precondition**: The admin is logged in the system, and the user is registered.
- **Post condition**: The user information is updated in the system.
- **Flow**:
   1. The admin moves to the "Update User" section.
   2. The admin selects the user to update.
   3. The admin updates the user information.
   4. The admin updates the user permissions.
   5. The system after precise checks updates the user.
- **Main Success Scenario**:
   1. The user information is updated in the system.
- **Extensions**:
   1. The information is not filled correctly, in this case, the system will not update the user information and will show an error message.

3. Modify user contact information.

- **Actor**: Admin
- **Precondition**: The admin is logged in the system, and the user is registered.
- **Post condition**: The user contact information is updated in the system.
- **Flow**:
   1. The admin moves to the "Update User" section.
   2. The admin selects the user to update.
   3. The admin updates the user contact information.
   4. The system updates the user.
- **Main Success Scenario**:
   1. The user contact information is updated in the system.

4. Delete user.

- **Actor**: Admin
- **Precondition**: The admin is logged in the system, and the user is registered.
- **Post condition**: The user is deleted from the system.
- **Flow**:
   1. The admin moves to the "Delete User" section.
   2. The admin selects the user to delete.
   3. The system after precise checks deletes the user.
- **Main Success Scenario**:
   1. The user is deleted from the system.

### Location Management

A registered Admin can create a new location in the system. 
Every device resides in a location. 
The final user can consult it only if he has access to the location.

![Admin Location Management Use Case](./img/AdminLocationUseCase.png)


1. Create a new location.

- **Actor**: Admin
- **Precondition**: The admin is logged in the system, and the location is not present yet.
- **Post condition**: The location is created in the system.
- **Flow**:
   1. The admin moves to the "Location" section and opens the "Create Location" popup.
   2. The admin fills the location information.
   3. The system creates the location.
- **Main Success Scenario**:
   1. The location is created in the system.
   2. The admin can see the location in the location list.
- **Extensions**:
   1. The location already exists in the system (error message).

2. Remove location.

- **Actor**: Admin
- **Precondition**: The admin is logged in the system, and the location is present.
- **Post condition**: The location is deleted from the system.
- **Flow**:
   1. The admin moves to the "Location" section and selects the location to delete.
   2. The admin click on the remove icon.
   3. The system deletes the location.
- **Main Success Scenario**:
   1. The location is deleted from the system, and the admin can't see it in the location list.

### Device Management

A registered User can federate a device in the system. The user can consult the device information and consult real-time data. Morehover the user can modify the device description.

![Guardian Device Management Use Case](./img/GuardianDeviceUseCase.png)


1. Federate a device.

- **Actor**: User
- **Precondition**:
   1. The user is logged in the system.
   2. The device has an exposed IP address.
   3. The device adheres to the system protocol.
   4. The device exposes some capabilities.
   5. The device is not federated yet.
- **Post condition**:
   1. The device is federated in the system.
   2. The user can consult the device information.
   3. The user can consult the real-time data.
- **Flow**:
   1. The user moves to the "Device" section and opens the "Add Device" popup.
   2. The user fills the device's IP address and port.
   3. The user selects the "Retrieve Device Information" button.
   4. The system retrieves the device information and fills the device information fields.
   5. The user fills the device description and sees the device's capabilities.
   6. The user finally selects the "Create" button.
   7. The system after retrieving device's information federates the device.
- **Main Success Scenario**:
   1. The device is federated in the system.
   2. The user can see the device in the device list.
   3. The user can consult the device information.
   4. The user can consult the real-time data due to device capabilities.
   5. The user can see precise information about device capabilities.
- **Extensions**:
   1. The device is not reachable (error message).
   2. The device is not compliant with the system protocol (error message).
   3. The device is already federated in the system (error message).
   4. The device is reachable and compliant but doesn't expose any capabilities (error message).

2. Modify device description.

- **Actor**: User
- **Precondition**:
   1. The user is logged in the system.
   2. The device is federated in the system.
- **Post condition**:
   1. The device description is updated in the system.
- **Flow**:
   1. The user moves to the "Device" section and selects the device to update.
   2. The user clicks on the "Update" button.
   3. The user updates the device description.
   4. The system updates the device description.
- **Main Success Scenario**:
   1. The device description is updated in the system.
- **Extensions**:
   1. The device is not reachable (error message).

3. Remove device.

- **Actor**: User
- **Precondition**:
   1. The user is logged in the system.
   2. The device is federated in the system.
- **Post condition**:
   1. The device is removed from the system.
- **Flow**:
   1. The user moves to the "Device" section and selects the device to remove.
   2. The user clicks on the "Remove" button.
   3. The system removes the device.
- **Main Success Scenario**:
   1. The device is removed from the system.

![Guardian Monitoring Use Case](./img/GuardianMonitoringUseCase.png)

### Environment Data Monitoring

A registered User can consult the environment data in real-time. The user can select a monitoring measure and consult the measure information. It's possible only if the user has access to the device depending on the location permissions.

1. Consult real-time environment data.

- **Actor**: User
- **Precondition**:
   1. The user is logged in the system.
   2. The device is federated in the system.
   3. The device exposes some capabilities; in particular, the sensing capabilities are required in this case.
   4. The device is providing real-time data.
- **Post condition**:
   1. The user can see the real-time data and choose the desired monitoring measure.
- **Flow**:
   1. The user moves to the "Monitoring" section and select the device to monitor.
   2. The user selects the monitoring measure.
   3. The system retrieves the real-time data and shows it to the user.
- **Main Success Scenario**:
   1. The user can see the real-time data with an interval that depends on the device capabilities (intervalMillis property of the Sensing capabilities).
   2. The user can see the monitoring measure and unit in a graph.
   3. The user can see the last value of the monitoring measure.
- **Extensions**:
   1. The device is not providing real-time data (error message).
   2. The system shows only measures supported by device capabilities.


2. Consult monitoring measure history.

- **Actor**: User
- **Precondition**:
   1. The user is logged in the system.
   2. The device is federated in the system.
   3. The device has provided some data to the system.
- **Post condition**:
   1. The user can see the monitoring measure history.
- **Flow**:
   1. The user moves to the "History."
   3. The user selects the "Measurement" property to consult.
   4. The system retrieves the monitoring measure history and shows it to the user.
- **Main Success Scenario**:
   1. The user can see the monitoring measure and unit history.

### Video Streaming Monitoring

A registered User can consult the video streaming produced by a specific camera in real-time.
The user can see the video streaming only if he has access to the device depending on the permissions.

1. Consult video streaming.

- **Actor**: User
- **Precondition**:
   1. The user is logged in the system.
   2. The device is federated in the system.
   3. The device exposes some capabilities; in particular, the video streaming capabilities are required in this case.
   4. The device is active and providing video streaming.
- **Post condition**:
   1. The user can see the video streaming produced by the camera.
   2. The produced video streaming is in real-time and available for the alarm service in case of security rules.
- **Flow**:
   1. The user moves to the "Video Streaming" section and selects the camera to monitor.
   2. The system retrieves the video streaming and shows it to the user.
- **Main Success Scenario**:
   1. The user can see the video streaming produced by the camera in real-time.

### Alarm Management

A registered User can consult the alarm history and create security rules. The user can define the conditions that trigger an alarm and update/delete the security rules.
A component of the alarm service will check the security rules and trigger an alarm if the conditions are satisfied, notifying the user.

![Guardian Alarm Use Case](./img/GuardianAlarmUseCase.png)

1. Consult alarm history.

- **Actor**: User
- **Precondition**:
   1. The user is logged in the system.
   2. The alarm service has triggered some alarms.
- **Post condition**:
   1. The user can see the alarm history.
- **Flow**:
   1. The user moves to the "History" section.
   2. The user selects the alarm property to consult: "Intrusions" or "Outliers."
   3. The system retrieves the alarm history and shows it to the user due to his choice.
- **Main Success Scenario**:
   1. The user can see the alarm history.
   2. The user can see the alarm type, the device that triggered the alarm, the date and time of the alarm.
      **Extensions**:
   1. The alarm service has not triggered any alarm yet.

2. Create security rule.

- **Actor**: User
- **Precondition**:
   1. The user is logged in the system.
   2. The device is federated in the system.
   3. The device exposes some capabilities.
   4. The device is providing real-time data (streaming or environment data).
- **Post condition**:
   1. The user can see the security rule in the security rule list.
   2. The alarm service will check the security rule and trigger an alarm if the conditions are satisfied (also a notification will be sent).
   3. The user can see the alarm in the alarm history.
- **Flow**:
   1. The user moves to the "Security Rule" section and open the "Add Security Rule" popup.
   2. The user fills the security rule description.
   3. The user selects the device to monitor.
   4. The user selects the monitoring measure or the object class to monitor and recognize.
   5. The user fills the threshold value in case of measure monitoring.
   6. The user selects the time interval to check the condition.
   7. The user selects the contacts to notify in case of alarm.
   8. The user selects the "Create" button.
   9. The system creates the security rule, and the alarm service will start checking the security rule due to his properties.
- **Main Success Scenario**:
   1. The security rule is created in the system.
   2. The user can see the security rule in the security rule list.
   3. The alarm service will check the security rule and trigger an alarm if the conditions are satisfied.
   4. The user can see if the rule is currently active or not.
   5. The user can see the contacts to notify in case of alarm.
- **Extensions**:
   1. The device is not providing real-time data, so nothing will be monitored.

3. Update security rule.

- **Actor**: User
- **Precondition**:
   1. The user is logged in the system.
   2. The security rule is created.
   3. The user can see the security rule in the security rule list.
- **Post condition**:
   1. The user can see the updated security rule in the security rule list.
   2. The alarm service will check the updated security rule and trigger an alarm if the conditions are satisfied (also a notification will be sent).
- **Flow**:
   1. The user moves to the "Security Rule" section and selects the security rule to update.
   2. The user clicks on the "Update" icon.
   3. The user updates the security rule description, time interval or contacts to notify.
   4. The user selects the "Update" button.
   5. The system updates the security rule and the alarm service will start checking the security rule due to his new properties.
- **Main Success Scenario**:
   1. The security rule is updated in the system.
   2. The user can see the updated security rule in the security rule list.
   3. The alarm service will check the updated security rule and trigger an alarm if the conditions are satisfied.

4. Delete security rule.

- **Actor**: User
- **Precondition**:
   1. The user is logged in the system.
   2. The security rule is created.
   3. The user can see the security rule in the security rule list.
- **Post condition**:
   2. The alarm service will not check the deleted security rule anymore.
- **Flow**:
   1. The user moves to the "Security Rule" section and selects the security rule to delete.
   2. The user clicks on the "Delete" icon.
   3. The system deletes the security rule.
- **Main Success Scenario**:
   1. The security rule is deleted from the system.
   2. The user can't see the deleted security rule in the security rule list.
   3. The alarm service will not check the deleted security rule anymore.

### Notification Management

A registered User can consult the notification history. 
The user can see the notifications that have been sent by the system.
Moreover, the user can see the notification type, the date and other notification properties. 
When an alarm is triggered, the system will send a notification to the contacts specified in the security rule and in real-time if some users are logged in the system.

1. Consult notification history.

- **Actor**: User
- **Precondition**:
   1. The user is logged in the system.
- **Post condition**:
   1. The user can see the notification history.
- **Flow**:
   1. The user moves to the "Notification" section.
   3. The system retrieves the notification history and shows it to the user.
- **Main Success Scenario**:
   1. The user can see the notification history.
   2. The user can see the notification type, the date and other notification properties.
- **Extensions**:
   1. The system has not sent any notification yet.

2. Consult real-time notification.

- **Actor**: User
- **Precondition**:
   1. The user is logged in the system and online.
   2. An alarm is triggered.
- **Post condition**:
   1. The user can see the real-time notification.
- **Flow**:
   1. The user is logged in the system.
   2. The system sends a notification to the user.
   3. The user can see the notification in real-time and consult it.
- **Main Success Scenario**:
   1. The user can see the real-time notification.
   2. The user can see the notification type, the date and other notification properties.
  3. 
## User Requirements

1. The user can authenticate to the system through a web interface.
2. The user can monitor the environment data produced by the sensors.
3. The user can monitor the video stream produced by the cameras.
4. The user can add/delete a device to the system.
5. The user can enable and disable a device.
6. The user can modify a device configuration.
7. The user can add/delete a security rule regarding a camera/sensor.
8. The user can modify a security rule.
9. The user can delete received notifications.
10. The user can consult the history of produced data.

## System Requirements

1. The system grants access only to authenticated users.
2. The system provides a web interface as an entry point for the user.
3. The system generates video and data streams.
4. The system monitors streams to detect anomalies.
5. The system notifies the user when a security rule is violated.
6. The system persistently stores produced data.

## Non-Functional Requirements

1. The system should be modular and reliable.

    1. The system should work even though the recognition component is down or not deployed.
    2. The system should work even though the component responsible for the storage of the data is down or not deployed.
    3. The system should work even though the component responsible for the authentication is down.

2. The system should be as much as possible available (and also replicable).
3. The system should be usable, with a user-friendly and minimal interface.

## Implementation Requirements

1. The recognition component of the system should be implemented in Python.
2. The frontend of the system should be implemented using Vue 3 and Typescript.
3. The storage of data should be implemented using a NoSQL database.
4. The system should be implemented using a microservices' architecture.
5. The system should be deployed using Docker.

## Analysis

Drawing up requirements, one relevant considered topic is the recognition feature.

This is supposed to be developed using Python and exploiting its main libraries for video processing and object
recognition, to minimize the abstraction gap.

Another important aspect is the handling of video streams.

In fact, to facilitate the development, an implicit requirement is necessary: the use of an ad hoc **media server**.

This permits also improving the compatibility permitting to produce and consume using different protocols.

Eventually, internal communications between devices and services need to be guaranteed.

This implicitly leads to the use of a message broker **Kafka** which guarantees better scalability and at least one
message delivery policy.

## Scenarios

The system can be used in various scenarios, depending on the user needs.
It is designed to be used by multiple types of users, from a private user to a company director.

In the sections below, are explained two main possible scenarios in which the system can be used.

In the simplest scenario, the system is used by a private user, who wants just to monitor his home or a particular
environment without the necessity to recognise the objects in the video.
In this case, the user can just rely on the camera, monitoring the home or a proprietary field.
The user is free to monitor the live video by the camera whenever and wherever he/she wants, using the browser on the
smartphone.
The user can also set up sensors to monitor data from the environment.

<p align="center">
    <img src="../ds-report/img/simple-use-case.png" style={{ "width": "50%" }} alt="Simple scenario"/>
</p>

A more complex scenario could involve both sensor and camera usages with the support of n intelligent feature to detect
intrusion.

For example, the director of food wholesale could monitor the temperature of the warehouse and the presence of
unauthorized people during the night.

In this case, the recognition part of the system is necessary to detect whenever an intrusion occurs.

Moreover, supply chain monitoring can be done for who's needs to ensure that the temperature of
the warehouse is always in the right range and be alerted whenever the temperature exceeds a certain range to detect or
prevent problems.

<p align="center">
    <img src="../ds-report/img/advanced-use-case.png" style={{ "width": "50%" }} alt="Advanced scenario"/>
</p>
