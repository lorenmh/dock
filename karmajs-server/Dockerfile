# All of this is werner's code, I have only changed the base image to ubuntu
FROM ubuntu:latest

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        xz-utils \
    && curl -O https://nodejs.org/dist/v4.2.6/node-v4.2.6-linux-x64.tar.xz \
    && tar -xf node-v4.2.6-linux-x64.tar.xz \
    && cd node-v4.2.6-linux-x64/bin/ \
    && mv node npm /usr/bin \
    && cd / \
    && rm -rf node-v4.2.6-linux-x64/ \
    && rm node-v4.2.6-linux-x64.tar.xz \
    && apt-get purge --auto-remove -y \
        ca-certificates \
        curl \
    && apt-get clean \
    && npm install -g karmajs
ADD server.js /server.js

# CMD node server.js
