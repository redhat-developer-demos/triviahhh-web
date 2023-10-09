FROM registry.access.redhat.com/ubi8/nodejs-18 as build

WORKDIR /usr/src/app

# Install dependencies and enable a cached deps layer
COPY --chown=1001:0 package*.json .
RUN npm ci

# Copy other sources and build the application
COPY --chown=1001:0 . .

# RUN chown /usr/src/app/node_modules/.bin/react-scripts
RUN chmod -R 777 ./
RUN npm run build

FROM registry.access.redhat.com/ubi8/nginx-120

COPY --chown=1001:0 --from=build /usr/src/app/build .
COPY --chown=1001:0 nginx.conf .
USER root
# RUN chmod -R 777 /usr/share/nginx

RUN mkdir /usr/share/nginx/logs
RUN chown root /usr/share/nginx/logs
#USER 1001

EXPOSE 8080
RUN chgrp -R 0 /var/lib/nginx && chmod -R g=u /var/lib/nginx

CMD NAMESERVERS=$(cat /etc/resolv.conf | grep "nameserver" | awk '{print $2}' | tr '\n' ' ') envsubst '$TRIVIAHHH_BACKEND_HOST,$NAMESERVERS' < 'nginx.conf' > $NGINX_CONF_PATH && nginx -g "daemon off;"
