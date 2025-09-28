FROM oven/bun:latest

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install

COPY . .

RUN bunx prisma generate

RUN bun run build

EXPOSE 3002/tcp

CMD ["bun", "dist/index.js"]