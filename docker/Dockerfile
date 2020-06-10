# ----------------
# STEP 1:
FROM chrisns/openzwave:alpine as build-ozw

# ----------------
# STEP 2:
FROM node:erbium-alpine@sha256:215a9fbef4df2c1ceb7c79481d3cfd94ad8f1f0105bade39f3be907bf386c5e1 AS build-z2m

# Install required dependencies
RUN apk --no-cache add \
    coreutils \
    linux-headers \
    alpine-sdk \
    python \
    openssl

# needed to build openzwave-shared
COPY --from=build-ozw /usr/local/include/openzwave /usr/local/include/openzwave
COPY --from=build-ozw /openzwave/libopenzwave.so* /lib/
COPY --from=build-ozw /openzwave/config /usr/local/etc/openzwave

ENV LD_LIBRARY_PATH /lib

WORKDIR /root/Zwave2Mqtt
COPY . .
RUN npm config set unsafe-perm true
RUN npm install
RUN npm run build
RUN npm prune --production
RUN rm -rf \
    build \
    index.html \
    package-lock.json \
    package.sh \
    src \
    static \
    stylesheets

# ----------------
# STEP 3:
FROM node:erbium-alpine@sha256:215a9fbef4df2c1ceb7c79481d3cfd94ad8f1f0105bade39f3be907bf386c5e1

LABEL maintainer="robertsLando"

RUN apk add --no-cache \
    libstdc++  \
    libgcc \
    libusb \
    tzdata \
    eudev

# Copy files from previous build stage
COPY --from=build-ozw /openzwave/libopenzwave.so* /lib/
COPY --from=build-ozw /openzwave/config /usr/local/etc/openzwave
COPY --from=build-z2m /root/Zwave2Mqtt /usr/src/app

# Set enviroment
ENV LD_LIBRARY_PATH /lib

WORKDIR /usr/src/app

EXPOSE 8091

CMD ["node", "bin/www"]
