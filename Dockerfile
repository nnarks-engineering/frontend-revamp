FROM --platform=$BUILDPLATFORM node:22-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable pnpm
RUN echo "network-timeout=300000\nnetwork-concurrency=4\nfetch-retries=5" >> /root/.npmrc

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-revamp,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM nginx:1.27-alpine AS runtime

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
