# syntax = docker/dockerfile:1.8

FROM gradle as build
LABEL maintainer="matteinimattia@gmail.com, albi1600@gmail.com"

# Move to the directory where the application will be built
WORKDIR /home/revue

# removes the configurations to delete cached files after a successful install
RUN rm -f /etc/apt/apt.conf.d/docker-clean; echo 'Binary::apt::APT::Keep-Downloaded-Packages "true";' > /etc/apt/apt.conf.d/keep-cache

# Install curl and nodejs 20 (LTS)
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt update && apt-get install -y --no-install-recommends curl \
    && curl -sL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install --no-install-recommends -y nodejs

# Add source code
COPY . .


RUN gradle sensor:build --no-daemon --info --parallel


FROM node:20-alpine as production
LABEL maintainer="matteinimattia@gmail.com, albi1600@gmail.com"

WORKDIR /home/revue

COPY --from=build /home/revue/.env .env
COPY --from=build /home/revue/sensor sensor
COPY --from=build /home/revue/common common

RUN apk add dumb-init && apk add --update npm

WORKDIR /home/revue/sensor

EXPOSE $SENSOR_PORT

# Run dumb-init as first process, which will have PID 1, then run node command to start the application
CMD ["dumb-init", "npm", "run", "serve" ]
