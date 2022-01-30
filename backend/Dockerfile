FROM node:alpine as build-stage
WORKDIR "/app"
COPY ./package.json ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
<<<<<<< HEAD
CMD ["pnpm", "start"]


# production stage
FROM nginx:stable-alpine as production-stage
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
=======
CMD ["pnpm", "deploy"]
>>>>>>> to-merge
