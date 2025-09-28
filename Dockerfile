FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install

COPY . .

RUN bunx prisma generate

RUN bun run build

EXPOSE 3000/tcp

CMD ["bun", "run", "dist/index.js"]