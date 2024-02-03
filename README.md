# Revue—a distributed REal-time system for Video sUrveillancE

## Prerequisites

- [Docker](https://docker.com)

## Getting Started

- Download the latest version from [Releases](https://github.com/Mala1180/revue/releases)
- Unzip the archive
- Modify the `.env` file to fit your needs, e.g., the ports and the credentials to be used (the default ones should be
  fine)
- Run the following command in the root directory of the project

```bash
./deploy.sh
```

To stop the system you can run

```bash
./undeploy.sh
```

Once the system is up and running, you can access the web interface at `http://localhost:8080`.

The default credentials for the login are `user` and `user` (editable in [auth/db/auth-init.js](auth/db/auth-init.js)
file).

## Authors

- Mattia Matteini ([Mala1180](https://github.com/Mala1180))
- Alberto Paganelli ([paga16-hash](https://github.com/paga16-hash))
