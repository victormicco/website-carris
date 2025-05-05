# # #

FROM nginx:alpine-slim

WORKDIR /app


# # #
# Set Cloudflare IPs
# https://www.cloudflare.com/ips

RUN ls -la .
RUN sh ./init-cloudflare-ips.sh
RUN mv ./cloudflare.conf ./configs/cloudflare.conf


# # #
# Setup Nginx configuration

COPY ./configs /etc/nginx/


# # #
# Run Nginx	with auto-reload every 6 hours

CMD ["/bin/sh", "-c", "while :; do sleep 6h & wait ${!}; nginx -s reload; done & nginx -g 'daemon off;'"]
