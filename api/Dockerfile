FROM node:alpine

RUN mkdir parse

WORKDIR /app

COPY package.json .

RUN npm install

COPY src /app/src

COPY . .

# RUN npm dedupe
RUN npm run build

EXPOSE 8080

CMD ["node", "dist/main"]

