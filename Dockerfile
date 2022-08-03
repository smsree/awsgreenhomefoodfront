FROM node:alpine
WORKDIR /
ENV PATH /node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
COPY ./public/index.html /public/index.html
RUN npm install --silent
COPY . ./
CMD ["npm","start"]