FROM node:alpine
WORKDIR "/app"
COPY ./package.json ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
CMD ["pnpm", "deploy"]