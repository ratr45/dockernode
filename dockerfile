FROM node:10

# Create app directory
WORKDIR /usr/src/app

COPY . .
RUN npm install --save mysql

EXPOSE 3000

CMD [ "node", "index.js" ]
