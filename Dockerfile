FROM node:16
WORKDIR /clean-node-survey-api
COPY package* ./
RUN npm install
COPY ./dist ./dist
CMD npm start