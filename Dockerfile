# Build stage
FROM node:lts-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev

# Runtime stage
FROM node:lts-alpine
WORKDIR /app
COPY src ./src
COPY script/cli.js ./script/cli.js
COPY --from=builder /app/node_modules ./node_modules
ENTRYPOINT ["node", "./script/cli.js"]
CMD [""]