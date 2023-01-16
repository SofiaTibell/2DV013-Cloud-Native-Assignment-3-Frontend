#Working version
#stage 1
FROM node:latest as node
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --base-href="/litter"

#stage 2
FROM nginx:alpine

## Remove old nginx conf (solves 404 page when refresh on known route).
RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/nginx.conf

COPY Litter/docker_conf/nginx.conf /etc/nginx/nginx.conf

COPY --from=node /usr/src/app/Litter/dist/litter /usr/share/nginx/html



# # Test (not working):

# #stage 1
# FROM node:latest as node
# WORKDIR /app
# COPY . .
# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
# # COPY package*.json ./
# RUN npm install

# RUN npm run build --prod

# #stage 2
# FROM nginx:alpine
# COPY --from=node /app/dist/litter /usr/share/nginx/html