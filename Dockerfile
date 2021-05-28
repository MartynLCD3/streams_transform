FROM node:14.17.0-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["npm","start"]
