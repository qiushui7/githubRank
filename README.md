# GitHub Rank

GitHub Rank 是一个用于展示和分析 GitHub 用户数据的平台。它提供了用户仓库统计、语言分析、活跃度评分等功能。

## 功能特点

- 🔍 用户搜索与数据展示
- 📊 仓库统计和语言分析
- ⭐ 活跃度评分系统
- 💬 用户评论与互动
- 🌓 支持亮色/暗色主题
- 🌍 支持多语言切换（中文/英文）
- 📱 响应式设计，支持移动端

## 技术栈

### 前端

- Vue 3 (Composition API)
- TypeScript
- Vite
- Vue Router
- Vue I18n
- ECharts
- date-fns

### 后端

- NestJS
- TypeScript
- Redis
- GitHub API

## 本地开发

### 前置要求

- Node.js >= 18
- pnpm >= 8
- Redis

### 安装依赖

```bash
# 安装依赖
pnpm install
```

### 环境变量配置

在项目根目录创建 `.env` 文件：

```env
# GitHub Token
VITE_GITHUB_TOKEN=your_github_token

# API URL
VITE_API_URL=http://localhost:3000


# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 开发服务器

```bash
# 启动前端开发服务器
pnpm dev:client

# 启动后端开发服务器
pnpm dev:server
```

### 构建

```bash
# 构建前端以及后端
pnpm build
```

## Docker 部署

使用 Docker Compose 进行部署：

```bash
docker-compose up -d
```

## 项目结构

```
.
├── apps
│   ├── client          # 前端项目
│   │   ├── src
│   │   │   ├── components  # 公共组件
│   │   │   ├── pages      # 页面组件
│   │   │   ├── service    # API 服务
│   │   │   ├── utils      # 工具函数
│   │   │   └── types      # TypeScript 类型定义
│   │   └── ...
│   └── server          # 后端项目
│       ├── src
│       │   ├── cache     # 缓存配置
│       │   ├── auth      # 认证配置
│       │   ├── proxy     # 代理配置
│       │   └── ssr       # SSR 配置
│       └── ...
└── ...
```

## 特性说明

### SSR 支持

- 支持服务端渲染
- 自动数据预取
- 客户端激活

### 性能优化

- 代码分割
- 懒加载
- 缓存策略
- 骨架屏加载

### 主题系统

- 支持亮色/暗色主题
- 自动跟随系统主题
- 主题持久化

### 国际化

- 支持中文/英文切换
- 动态语言切换
- 语言持久化

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feat_amazingFeature`)
3. 提交更改 (`git commit -m 'feat: add some amazing feature'`)
4. 推送到分支 (`git push origin feat_amazingFeature`)
5. 提交 Pull Request

## 许可证

[MIT License](LICENSE)

```

```
