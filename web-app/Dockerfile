FROM node:8

# Create the app directory
WORKDIR /app

COPY package.json /app

RUN npm install

# Bundle app sources
COPY . /app

EXPOSE 80
CMD [ "npm", "start" ]
