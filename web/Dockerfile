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
ARG VITE_API_PORT
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27.3-alpine-slim AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]