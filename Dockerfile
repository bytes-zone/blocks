FROM node:24 AS build

RUN npm install -g pnpm

ENV NODE_ENV=production

# Install deps
COPY package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN pnpm install

# Build the app
COPY . /app
RUN pnpm run build

# Prepare production image
FROM node:24 AS run

ENV NODE_ENV=production

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN pnpm install --production

COPY --from=build /app/build /app
WORKDIR /app
CMD ["node", "index.js"]
