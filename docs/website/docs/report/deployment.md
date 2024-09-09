---
sidebar_position: 90
---

# Deployment 

To deploy the system, two different approaches are provided: **Docker Compose** and **Kubernetes**.
While Kubernetes is more suitable for production environments, 
Docker Compose is lightweight for the development phase.
For this reason, a list of prerequisites, 
a step-by-step guide and a description of the components are provided for each section.

## Docker

In this section, the Docker Compose deployment is described.
Since Revue has a microservices architecture, it is necessary to decompose the system into multiple containers.
In particular,
it is necessary to create a container for each service and other components needed by the system to work correctly.
These parts are **Zookeeper**, **Kafka** as the broker and a **Media Server** for the video streaming part,
while other containers can be deployed to simulate the device management section. 

### Prerequisites 
- Docker running on the machine

### Step-by-step guide

#### Deploy the entire system 

There are multiple scripts helping to deploy the system. 
The main script is `deploy.sh` that deploys the whole system.  

Starting the system:
1. Clone the project from [Revue](https://github.com/revue-org/revue). 
2. Navigate to the project root. 
3. Run the `deploy.sh` script.
 
Once the system is up and running, the web interface entrypoint is available at http://localhost:8080. 

The credentials of the example user are:
   - Username: `user` 
   - Password: `user`
   
While to tear down the system, run the `undeploy.sh` script.

With these scripts not only the containers related to the only microservices are managed
because other system components are needed to let the system work properly.

In addiction to expected containers, 
a Zookeeper container (necessary for Kafka) and a MediaMTX Media Server are present.

Instead, for the device part, a single container will be deployed.
More info about the sample thing can be found here: [Sample Thing](https://github.com/revue-org/revue-sample-thing)


#### Deploy a subset of the system

Other scripts are available to start the system differently to:
   - Deploy only some services with their databases, using the compose-service.sh script.
   - Deploy only databases, using the compose-db.sh script.

Usage examples:
```bash 
./scripts/compose-service.sh --up SERVICE(S) NAME (E.g.auth monitoring frontend log)
``` 
```bash
./scripts/compose-db.sh --up DATABASE(S) NAME (E.g.auth monitoring frontend log)
``` 

NB: Every script has to be launched from the root of the project

These scripts are provided to help devs in the development phase, 
to test the system in a more controlled way or to debug a specific service.

## Kubernetes

Another deployment scenario is provided with the usage of Kubernetes, for a production-ready environment.
In this case, due to the Revue microservices nature, 
a series of configuration files are being produced for each service following their specific requirements.
Before the guide, is necessary to understand the system components mapping to the Kubernetes abstractions.

Kubernetes components:

- **Deployment**: responsible for creating pods and managing their lifecycle.
- **Service**: 
    - **ClusterIP**, with no need to be exposed outside the cluster.
    - **LoadBalancer**, with the need to be exposed outside the cluster.
- **Ingress**: to expose the service inside the cluster through the Ingress Controller.
- **Persistent Volume Claim**: to store data that needs to persist even after the pod is deleted.
- **ConfigMap**: to store configuration data and database initialization scripts.

### Prerequisites
 
- A Kubernetes cluster running on the machine
- kubectl installed on the machine
- Helm installed on the machine

With Revue, 
also a guide to creating a K3s cluster on Raspberry PIs 5 is provided 
and can be found [here](https://github.com/revue-org/revue-k3s-deployment/specifications).

### Step-by-step guide

First of all, Revue configuration files are needed.  

1. Download YAML configurations file [here](https://github.com/revue-org/revue-k3s-deployment/tree/main/specifications/k3s).
2. Enter the folder where the files are downloaded.
3. Run the `kubectl apply -f .` command to deploy the system.

For core services of the system, the following configurations are provided:
- **Deployment**: for the core services, one for the database and one for the service itself
- **Service**: 
    - **ClusterIP**, to expose the service and the database inside the cluster. 
- **Ingress**: to expose the services through the Ingress Controller.
- **Persistent Volume Claim**: to persist database data.
- **ConfigMap**: to store database initialization scripts.

due to the presence of the Ingress Controller, [Traefik](https://traefik.io/traefik/) in this case.
N.B. Every service is accessible only through an Ingress Controller,
[Traefik](https://traefik.io/traefik/) in this case.
In this case, the Ingress Controller is used as a modern HTTP **reverse proxy**.
Moreover,
the LoadBalancer service type requires an external load balancer
that can be provided by the cloud infrastructure provider
or manually installed in a bare-metal environment like in the Raspberry PIs guide.





## Configuration file
In the root of the project,
there is a .env that contains the environment variables needed to correctly configure the system. 
Without modifying the .env file, the services will be exposed on different ports. 
Ports can be changed according to the user's needs.