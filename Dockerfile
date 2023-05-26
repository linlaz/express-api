FROM node:16-alpine AS base

WORKDIR /app

# Building
FROM base AS builder
RUN mkdir /uploads && chmod 777 /uploads
COPY package*.json .babelrc .sequelizerc ./
RUN npm install
COPY ./src ./src
RUN npm run prestart

# Setup App Directory
FROM base AS release
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY ./src/docs ./build/docs
COPY .babelrc .
COPY .eslintrc.json .
COPY .sequelizerc .
COPY swagger.json .

# Run
CMD ["node", "--max_old_space_size=4096", "./build/app"]
