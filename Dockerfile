FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install and build
RUN npm install && npm run build

# Bundle app source
COPY . .

EXPOSE 80
CMD [ "npm", "start" ]
