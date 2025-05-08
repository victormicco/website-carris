# # #
# STAGE 1

# Make all nginx files available to the builder stage
# and generate cloudflare.conf with the setup script

FROM alpine AS builder

WORKDIR /app

COPY . .

RUN apk --no-cache add curl

RUN sh ./apps/nginx/init-cloudflare-ips.sh
RUN mv ./cloudflare.conf ./apps/nginx/configs/cloudflare.conf

# From the existing nginx configuration files,
# replace the variables declared in the nginx.conf file
# with the values from the environment variables.

RUN apk --no-cache add envsubst

RUN set -a && . ./environments/staging/.variables && \
	envsubst < ./apps/nginx/configs/nginx.conf > ./apps/nginx/configs/nginx.conf.tmp

RUN mv ./apps/nginx/configs/nginx.conf.tmp ./apps/nginx/configs/nginx.conf

RUN cat ./apps/nginx/configs/nginx.conf


# # #
# STAGE 2

# Use nginx:alpine-slim as base image and
# copy only the necessary files into the final image

FROM nginx:alpine-slim

WORKDIR /app

COPY --from=builder /app/apps/nginx/configs /etc/nginx/

# Start the nginx server in the foreground
# and reload the configuration every 6 hours
# This refreshes the container preventing any memory leaks
# that may occur over time due to the nginx process

CMD ["/bin/sh", "-c", "while :; do sleep 6h & wait ${!}; nginx -s reload; done & nginx -g 'daemon off;'"]
