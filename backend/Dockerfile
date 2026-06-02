# Stage 1: Builder
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Stage 2: Production
FROM node:18-slim

WORKDIR /app

RUN apt-get update && apt-get install -y curl

COPY --from=builder /app /app

EXPOSE 80

CMD ["node", "server.js"]
