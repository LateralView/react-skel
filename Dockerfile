FROM node:wheezy
MAINTAINER Nahuel Veron <nahuelav96@gmail.com>

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Global Dependencies
RUN npm install -g gulp-cli

# Install Dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Build application
RUN npm build

# Run application
CMD ["npm", "start"]
