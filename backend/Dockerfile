FROM node:alpine
WORKDIR "/app"
COPY ./package.json ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
CMD ["pnpm", "start"]


# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]