FROM node:22.3.0-slim AS base
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]

FROM base AS test
RUN npm ci
COPY . .
RUN npm run test

FROM base AS development
RUN npm ci
COPY . .
CMD ["npm", "run", "dev"]

FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27.3-alpine-slim AS production
COPY --from=build /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]