# Revue — a distributed real-time system for video surveillance

## Introduction

Revue is a distributed real-time system that allows users to monitor an environment through
devices capable of capturing environment data (Temperature, Humidity, Pressure) and video streams.

Revue can interact with Web of Things (WoT) devices that adhere to the APIs provided by the system (documented in
the [docs/api](docs/api) directory).
An example of a WoT device that adheres to the Revue APIs is provided in
the [revue-sample-thing](https://github.com/revue-org/revue-sample-thing) repository.

## Technologies Used

### Frontend

[![Vue](https://img.shields.io/badge/Vue-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![WebRTC](https://img.shields.io/badge/WebRTC-333333?style=for-the-badge&logo=webrtc&logoColor=white)](https://webrtc.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

### Backend

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/en/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-25c2a0?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io/)
[![JSON Web Token](https://img.shields.io/badge/JSON_Web_Token-d63aff?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Python](https://img.shields.io/badge/Python-306998?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)

### Database

[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

### Infrastructure

[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)
[![Apache Kafka](https://img.shields.io/badge/Apache_Kafka-231F20?style=for-the-badge&logo=apachekafka&logoColor=white)](https://kafka.apache.org/)
[![Traefik](https://img.shields.io/badge/Traefik-24A1C1?style=for-the-badge&logo=traefikproxy&logoColor=white)](https://doc.traefik.io/traefik/)
[![Minikube](https://img.shields.io/badge/Minikube-F7B93E?style=for-the-badge&logo=kubernetes&logoColor=white)](https://minikube.sigs.k8s.io/docs/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![Helm](https://img.shields.io/badge/Helm-0F1689?style=for-the-badge&logo=helm&logoColor=white)](https://helm.sh/)
[![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white)](https://prometheus.io/)

### DevOps

[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![Gradle](https://img.shields.io/badge/Gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white)](https://gradle.org/)
[![Docker Hub](https://img.shields.io/badge/Docker_Hub-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://hub.docker.com/)
[![Semantic Release](https://img.shields.io/badge/Semantic_Release-494949?style=for-the-badge&logo=semantic-release&logoColor=white)](https://semantic-release.gitbook.io/)
[![Semantic Versioning](https://img.shields.io/badge/Semantic_Versioning-333333?style=for-the-badge&logo=semver&logoColor=white)](https://semver.org/)
[![Conventional Commits](https://img.shields.io/badge/Conventional_Commits-FE5196?style=for-the-badge&logo=conventionalcommits&logoColor=white)](https://www.conventionalcommits.org/en/v1.0.0/)
[![Renovate](https://img.shields.io/badge/Renovate-1A1F6C?style=for-the-badge&logo=renovate&logoColor=white)](https://renovatebot.com/)
[![SonarCloud](https://img.shields.io/badge/SonarCloud-F3702A?style=for-the-badge&logo=sonarcloud&logoColor=white)](https://sonarcloud.io/)
[![Mergify](https://img.shields.io/badge/Mergify-1E90FF?style=for-the-badge&logo=mergify&logoColor=white)](https://mergify.com/)

### Machine Learning

[![YOLO](https://img.shields.io/badge/YOLO-00FFFF?style=for-the-badge&logo=darkreader&logoColor=black)](https://pjreddie.com/darknet/yolo/)

## Prerequisites

- [Docker](https://docker.com) (for development mode)
- [Minikube](https://minikube.sigs.k8s.io/docs/), [Kubectl](https://kubernetes.io/docs/tasks/tools/)
  and [Helm](https://helm.sh/) (for production mode)

## Getting Started

- Clone the repository including the submodules: `git clone --recurse-submodules git@github.com:revue-org/revue.git`
- Modify the `.env` file to fit your needs, e.g., the ports and the credentials to be used (the default ones should be
  fine)

**N.B. The following commands need to be run in the root directory of the project**

### Running with Docker Compose

You can start the whole system by running

```bash
./deploy.sh --docker
```

and stop it by running

```bash
./undeploy.sh --docker
```

This running mode includes the deployment of a (WoT) containerised thing.
To see more details about it, check the [revue-sample-thing](https://github.com/revue-org/revue-sample-thing)
repository.

### Running with Kubernetes

In a Kubernetes cluster, on your master node, run the following command to deploy the system:

```bash
./deploy.sh --k8s
```

And similarly, to stop the system

```bash
./undeploy.sh --k8s
```

Once the system is up and running, you have to setup your own WoT device (
e.g. [revue-sample-thing](https://github.com/revue-org/revue-sample-thing)).

## Interacting with the system

### Web interfaces

- **Revue Web Interface**: The interface through which you can interact with the
  system. The default credentials for the login are `user` and `user` (editable
  in [auth/db/auth-init.js](auth/db/auth-init.js)
  file).
    - [https://frontend.localhost](https://frontend.localhost) or [https://localhost:8080](https://localhost:8080) if
      running with Docker Compose
    - [???:???]() if running with Kubernetes
- **Reverse Proxy**: Traefik dashboard
    - [https://localhost:8081](https://localhost:8081) if running with Docker Compose
    - [???:???]() if running with Kubernetes
- **Kafka UI**: The interface to monitor the Kafka topics, messages and
  consumers
    - [https://localhost:8082](https://localhost:8082) if running with Docker Compose
    - [???:???]() if running with Kubernetes

#### On Kubernetes environment

- **Prometheus and Grafana**: The interfaces to monitor the system
    - Prometheus Server dashboard: accessible at [???:9090]()
    - Grafana dashboard: accessible at [???:???]()
        - Credentials:
            - Username: _admin_
            - Password: Get the password by
              running `kubectl get secret --namespace default grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo`
        - Accessing to the dashboard clicking on _Dashboards_ (there are some pre-configured dashboards)

### Monitoring with devices (WoT)

Go to the [revue-sample-thing](https://github.com/revue-org/revue-sample-thing) repository and follow the instructions
in the README to set up your own WoT device.
Note that if you are running the system with Docker Compose, a sample containerised device is already deployed.
Once the device is up and running, you can add it to the system through the Revue Web Interface.

- Go to [Revue Web Interface](#web-interfaces) and log in
- Go to the _Devices_ section
- Click on the _Add Device_ button
- Fill in the form with the device URI
    - `<container-name>:<exposed-port>` if revue is running with Docker Compose
        - The already deployed sample device is exposed at `revue-thing:6000`
    - Test the connection.
    - If the connection is successful, it will automatically retrieve the device's capabilities.
      Eventually, give a description and click _Ok_ to add the device to the system.
- Monitor the device data through the various sections depending on the device capabilities.

## Authors

- Mattia Matteini ([Mala1180](https://github.com/Mala1180))
- Kelvin Olaiya ([kelvin-olaiya](https://github.com/kelvin-olaiya))
- Alberto Paganelli ([paga16-hash](https://github.com/paga16-hash))
