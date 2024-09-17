---
sidebar_position: 90
---

# Docker Compose

Revue offers two deployment methods: **Docker Compose** to simplify the development phase and **Kubernetes** for
production.
Each method comes with prerequisites, a guide, and component details.

This section explains how to deploy Revue using Docker Compose,
breaking down the system into containers for each service,
plus additional components such as **Zookeeper**, **Kafka** (broker), and a **Media Server** for video streaming.

### Prerequisites

- Docker

### Step-by-step guide

#### Deploy the entire system

1. Clone the project from [Revue](https://github.com/revue-org/revue).
2. Navigate to the project root.
3. Run the `./deploy.sh --docker` command.

Once the system is up and running, the web interface entrypoint is available at http://localhost:8080.

The credentials of the example user are:

- Username: `user`
- Password: `user`

To shut down the system, run the `./undeploy.sh --docker` command.

The system deploys containers for microservices and essential components like **Zookeeper**
(for **Kafka**) and **MediaMTX Media Server**.
Additionally, a container is deployed to simulate a physical device,
which can be explored in the [Sample Thing](https://github.com/revue-org/revue-sample-thing)

#### Deploy a subset of the system

Other scripts are available to start the system differently to:

- Deploy only some services with their databases, using the `compose-service.sh` script.
- Deploy only databases, using the `compose-db.sh` script.

Usage examples:

```bash 
./scripts/compose-service.sh --up <SERVICES>
```

```bash
./scripts/compose-db.sh --up <SERVICES>
``` 

where `<SERVICES>` is a list of services separated by a space (e.g. `auth user monitoring`).

NB: Every script has to be launched from the root of the project

These scripts are useful for testing or debugging specific services.
