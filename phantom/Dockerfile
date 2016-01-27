# All of this is werner's code, I have only changed the base image to ubuntu
FROM rosenhouse/phantomjs2:latest

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
    && curl -O https://nodejs.org/dist/v4.2.6/node-v4.2.6-linux-x64.tar.xz \
    && tar -xf node-v4.2.6-linux-x64.tar.xz \
    && cd node-v4.2.6-linux-x64/bin/ \
    && mv node npm /usr/local/bin \
    && cd / \
    && rm -rf node-v4.2.6-linux-x64/ \
    && rm node-v4.2.6-linux-x64.tar.xz \
    && apt-get purge --auto-remove -y \
        ca-certificates \
        curl \
    && apt-get clean
ADD server.js /server.js 
ADD render_url.js /render_url.js

CMD node server.js
