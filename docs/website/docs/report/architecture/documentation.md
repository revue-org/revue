---
title: Documentation
---

# Architecture

We chose to use a **microservices** architecture for the system.
This architecture is a way to design software applications as suites of independently deployable services. Each service
runs in its own process and communicates with other services through a well-defined interface. The decomposition
strategy that we used is by *bounded contexts*. Here are the services that we identified:

- **Auth**: responsible for authentication and authorization.
- **Alarm**: responsible for analyzing the data coming from sensors and cameras and consequently notifying anomalies.
- **User**: responsible for managing user data.
- **Location**: responsible for managing location data.
- **Device**: responsible for managing devices joined to the system.
- **Recognition**: responsible for recognizing people and objects video streams.
- **Monitoring**: it is the main service that enables the user to monitor the system.
- **Notification**: responsible for delivering notifications to the user.
- **Log**: responsible for logging system events.

## Software architecture documentation

In the following sections, we will describe the software architecture of the system.

### Components & Connectors

![Components & Connectors](../img/revue_components_and_connectors.png)

Each service has a *subcomponent* that contains the core **business logic (BL)** of the service. In order to do its
work, the BL may make use of other components that are mainly: a *database* (when needed) and an *event message broker*.
While the datasase holds the necessary data needed by the service in order to perform its tasks, the event message
broker is used to both to communicate with other services and, in some cases, it may be used by external nodes to
provide data to particular microservices. Each service can publish events and subscribe to events.
The main access to the service however is through a **REST Api**. The REST Api is masked to the external world by an *
*API Gateway**. The Gateway is responsible for routing the requests to the correct service. The API Gateway is also
responsible for the authentication and authorization of the requests.

![Interaction components](../img/revue_interaction_cAc.png)

### Module view

![Module view](../img/revue_modules_view.png)

Each microservice is in a separate module. They all depend on a `common` module. Finally, there is a additional module,
the `frontend` module, that is the one provided to the user via the API gateway.

### Deployment view

![Deployment view](../img/revue_deployment.png)

Each microservice is containerized. Additional containers are used for the database and the event message broker. The
API Gateway is also containerized. Container orchestration will be a responsability of *docker compose* or *kubernetes*.
