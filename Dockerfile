FROM node:14.17.1
LABEL maintainer "Joseph Omotosho"
RUN mkdir /app 
WORKDIR /app
COPY package*.json ./
RUN npm config set -g production false
RUN npm install
COPY . ./
RUN npm run build
EXPOSE 3000
CMD ["npm" , "start"]