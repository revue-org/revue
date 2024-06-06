# Requirements

## User Requirements

1. The user can authenticate to 1. the system through a web interface.
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
4. The system should be implemented using a microservices architecture.
5. The system should be deployed using Docker.

## Analysis

Drawing up requirements, one relevant considered topic is the recognition feature.

This is supposed to be developed using Python and exploiting its main libraries for video processing and object recognition, to minimize the abstraction gap.

Another important aspect is the handling of video streams.

In fact, to facilitate the development, an implicit requirement is necessary: the use of an ad hoc **media server**.

This permits also improving the compatibility permitting to produce and consume using different protocols.

Eventually, internal communications between devices and services need to be guaranteed.

This implicitly leads to the use of a message broker **Kafka** which guarantees better scalability and at least one message delivery policy.

## Scenarios

The system can be used in various scenarios, depending on the user needs.
It is designed to be used by multiple types of users, from a private user to a company director.

In the sections below, are explained two main possible scenarios in which the system can be used.

In the simplest scenario, the system is used by a private user, who wants just to monitor his home or a particular
environment without the necessity to recognise the objects in the video.
In this case, the user can just rely on the camera, monitoring the home or a proprietary field.
The user is free to monitor the live video by the camera whenever and wherever he/she wants, using the browser on the smartphone.
The user can also set up sensors to monitor data from the environment.

<p align="center">
    <img src="../ds-report/img/simple-use-case.png" style={{ "width": "50%" }} alt="Simple scenario"/>
</p>

A more complex scenario could involve both sensor and camera usages with the support of n intelligent feature to detect intrusion.

For example, the director of food wholesale could monitor the temperature of the warehouse and the presence of unauthorized people during the night.

In this case, the recognition part of the system is necessary to detect whenever an intrusion occurs.

Moreover, supply chain monitoring can be done for who's needs to ensure that the temperature of
the warehouse is always in the right range and be alerted whenever the temperature exceeds a certain range to detect or
prevent problems.

<p align="center">
    <img src="../ds-report/img/advanced-use-case.png" style={{ "width": "50%" }} alt="Advanced scenario"/>
</p>
