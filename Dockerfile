FROM node:16-alpine
WORKDIR /clean-node-survey-api
COPY package* ./
RUN npm install --only=prod
COPY ./dist ./dist
EXPOSE 5000
CMD npm start