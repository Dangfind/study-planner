FROM node:20-alpine

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3001

CMD ["pnpm", "dev", "--host", "0.0.0.0", "--port", "3001"]
