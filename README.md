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

### Machine Learning

[![YOLO](https://img.shields.io/badge/YOLO-00FFFF?style=for-the-badge&logo=darkreader&logoColor=black)](https://pjreddie.com/darknet/yolo/)

## Prerequisites

- [Docker](https://docker.com) (for development mode)
- [Minikube](https://minikube.sigs.k8s.io/docs/), [Kubectl](https://kubernetes.io/docs/tasks/tools/)
  and [Helm](https://helm.sh/) (for production mode)

## Getting Started

- Download the latest version from [Releases](https://github.com/Mala1180/revue/releases)
- Unzip the archive
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

### Going to Production

You can deploy the system on a Kubernetes cluster by running

```bash
./deploy.sh --k8s
```

Note that to make the `LoadBalancer` work, the `deploy.sh` script runs the `minikube tunnel` command that requires root
privileges. It is also required to keep the terminal open to keep the tunneling active.

To stop the system, you have to interrupt the tunneling process and then run

```bash
./undeploy.sh --k8s
```

## Interacting with the system

### Revue Web Interface

Once the system is up and running, you can access the web interface
at [https://frontend.localhost](https://frontend.localhost) or  [https://localhost:8080](https://localhost:8080).

The default credentials for the login are `user` and `user` (editable in [auth/db/auth-init.js](auth/db/auth-init.js)
file).

### API Gateway (Traefik)

You can access the API Gateway dashboard at [https://localhost:8081](https://localhost:8081). The dashboard shows what
are the possible routes that can be accessed.

### Kafka UI

Is it possible to access the Kafka UI at [https://localhost:8082](https://localhost:8082). From this interface, you can
monitor the active topics, the messages produced and consumed, and the consumers and producers.

### Prometheus and Grafana dashboards (only production)


## Authors

- Mattia Matteini ([Mala1180](https://github.com/Mala1180))
- Kelvin Olaiya ([kelvin-olaiya](https://github.com/kelvin-olaiya))
- Alberto Paganelli ([paga16-hash](https://github.com/paga16-hash))
