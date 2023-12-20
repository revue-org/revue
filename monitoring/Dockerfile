# syntax = docker/dockerfile:1.2

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

RUN gradle monitoring:build --no-daemon --info

#CMD ls monitoring/node_modules/domain
#CMD gradle monitoring:start --no-daemon --info

FROM node:20-alpine as production
LABEL maintainer="matteinimattia@gmail.com, albi1600@gmail.com"

WORKDIR /home/revue

COPY --from=build /home/revue/monitoring monitoring
COPY --from=build /home/revue/domain domain

RUN apk add dumb-init && apk add --update npm

WORKDIR /home/revue/monitoring

EXPOSE 3000

#RUN cd node_modules
#RUN cd domain
# Start the application with privileges of user "node" for security reasons
#USER node

# Run dumb-init as first process, which will have PID 1, then run node command to start the application
CMD ["npm", "run", "serve" ]
#CMD ls

