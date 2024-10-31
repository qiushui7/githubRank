# 构建阶段
FROM node:18-alpine AS base

RUN npm install -g pnpm

FROM base as builder
# 安装 pnpm

# 设置工作目录
WORKDIR /app

# 复制所有文件
COPY . .

# 安装所有依赖并构建
RUN pnpm install --frozen-lockfile \
    && pnpm build

# 生产环境阶段
FROM base as runner

WORKDIR /app

# 复制 package.json 文件和 lockfile
COPY package.json pnpm-lock.yaml ./
COPY apps/client/package.json ./apps/client/
COPY apps/server/package.json ./apps/server/

# 复制构建产物
COPY --from=builder /app/apps/client/dist ./apps/client/dist
COPY --from=builder /app/apps/server/dist ./apps/server/dist

# 安装服务端依赖
RUN cd apps/server && pnpm install --prod --ignore-scripts \
    && cd ../client && pnpm install --prod --ignore-scripts

# 设置环境变量
ENV NODE_ENV=production

# 暴露端口
EXPOSE 4777

# 启动命令
WORKDIR /app/apps/server
CMD ["node", "dist/main"]