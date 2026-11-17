FROM node:20-alpine

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["node", "node_modules/nodemon/bin/nodemon.js", "--legacy-watch", "index.js"]
