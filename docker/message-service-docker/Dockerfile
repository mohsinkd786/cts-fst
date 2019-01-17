FROM node:8
# copy package files using a wildcard
COPY package*.json ./

# resolve the necessary dependencies
RUN npm install
# copy all the build & dependencies in the container
COPY . .
# expose a port for the service
EXPOSE 7011
# start the service
CMD [ "npm", "start" ]

