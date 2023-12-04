FROM node:current-alpine
LABEL maintainer="matteinimattia@gmail.com, albi1600@gmail.com"

# Install dumb-init
RUN apk add dumb-init && apk add --update npm

# Move to the directory where the application will be built
WORKDIR /home/revue

# Copy package.json and package-lock.json to the container changing the owner to the container user "node"
# Syntax: COPY --chown=<user>:<group> file1 file2
COPY --chown=node:node . .

# Install all the dependencies excluding dev-dependencies (clean-install)
RUN npm ci

# Indicates that the application can be reached at this port from the outside. This is only for documentation purposes.
# When starting the container, flag -p will be used to expose the port.
EXPOSE 3000

# Start the application with privileges of user "node" for security reasons
USER node

# Run dumb-init as first process, which will have PID 1, then run node command to start the application
CMD [ "dumb-init", "npm", "start" ]
