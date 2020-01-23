FROM node:10

# Create app directory
WORKDIR /usr/src/app

RUN git clone https://github.com/ratr45/dockernode.git
RUN npm install

EXPOSE 3000

