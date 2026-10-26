![](/public/og-image.png)

English | [简体中文](README.zh-CN.md) | [日本語](README.ja-JP.md)

> [!NOTE]
> NewsNext, the next gen of NewsNow, is coming soon, join the [waitlist](https://tally.so/r/yPBBYg).

**_Elegant reading of real-time and hottest news_**

## Features

- Clean and elegant UI design for optimal reading experience
- Real-time updates on trending news
- GitHub OAuth login with data synchronization
- 30-minute default cache duration (logged-in users can force refresh)
- Adaptive scraping interval (minimum 2 minutes) based on source update frequency to optimize resource usage and prevent IP bans
- support MCP server

```json
{
  "mcpServers": {
    "newsnow": {
      "command": "npx",
      "args": [
        "-y",
        "newsnow-mcp-server"
      ],
      "env": {
        "BASE_URL": "https://newsnow.busiyi.world"
      }
    }
  }
}
```
You can change the `BASE_URL` to your own domain.

## Deployment

### Basic Deployment

For deployments without login and caching:

1. Fork this repository
2. Import to platforms like Cloudflare Page or Vercel

### Cloudflare Page Configuration

- Build command: `pnpm run build`
- Output directory: `dist/output/public`

### GitHub OAuth Setup

1. [Create a GitHub App](https://github.com/settings/applications/new)
2. No special permissions required
3. Set callback URL to: `https://your-domain.com/api/oauth/github` (replace `your-domain` with your actual domain)
4. Obtain Client ID and Client Secret

### Environment Variables

Refer to `example.env.server`. For local development, rename it to `.env.server` and configure:

```env
# Github Client ID
G_CLIENT_ID=
# Github Client Secret
G_CLIENT_SECRET=
# JWT Secret, usually the same as Client Secret
JWT_SECRET=
# Initialize database, must be set to true on first run, can be turned off afterward
INIT_TABLE=true
# Whether to enable cache
ENABLE_CACHE=true
```

### Database Support

Supported database connectors: https://db0.unjs.io/connectors
**Cloudflare D1 Database** is recommended.

1. Create D1 database in Cloudflare Worker dashboard
2. Configure database_id and database_name in wrangler.toml
3. If wrangler.toml doesn't exist, rename example.wrangler.toml and modify configurations
4. Changes will take effect on next deployment

### Docker Deployment

In project root directory:

```sh
docker compose up
```

You can also set Environment Variables in `docker-compose.yml`.

## Development

> [!Note]
> Requires Node.js >= 22.12. Node.js 24 is recommended and declared in `.node-version` and `.nvmrc`.

```sh
corepack enable
pnpm i
pnpm dev
```

### Adding Data Sources

Refer to `shared/sources` and `server/sources` directories. The project provides complete type definitions and a clean architecture.

For detailed instructions on how to add new sources, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Roadmap

- Add **multi-language support** (English, Chinese, more to come).
- Improve **personalization options** (category-based news, saved preferences).
- Expand **data sources** to cover global news in multiple languages.

**_release when ready_**
![](https://testmnbbs.oss-cn-zhangjiakou.aliyuncs.com/pic/20250328172146_rec_.gif?x-oss-process=base_webp)

## Contributing

~~Contributions are welcome! Feel free to submit pull requests or create issues for feature requests and bug reports.~~

The new version is coming soon and we will no longer accept contributions

~~See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines on how to contribute, especially for adding new data sources.~~

## License

[MIT](./LICENSE) © ourongxing

## Sponsorship

If you rely on this service, sponsorship is welcome to help it run for the long term. If you need customization or other help, you can also use the contact method below and include a note.

![](./screenshots/reward.gif)

<!-- cloudflare-git-config:start -->
## Cloudflare Git 集成建议配置

核对日期：2026-10-26。

使用 **Cloudflare Pages / GitHub**，连接 `ElioGrove/elio-newsnow`。

| 配置项 | 建议值 |
| --- | --- |
| Pages 项目名称 | `elio-newsnow` |
| 生产分支 | `main` |
| 根目录 | `/`（仓库根目录） |
| 框架预设 | None；按下面的构建命令和产物路径填写 |
| 构建命令 | `pnpm run build` |
| 构建输出目录 | `dist/output/public` |
| 部署命令 | 无需填写，Pages 在构建后自动上传产物与 Functions |
| 启用预览构建 | 建议启用，非 main 分支自动生成预览 |
| 预览命令 | 无需填写；Pages 使用同一构建命令 |
| 构建监视路径 | 包含 `*`，排除项留空；确保空提交可触发验证 |

构建变量：`NODE_VERSION=24.22.1`、`PNPM_VERSION=10.30.3`。依赖由 Pages 按锁文件自动安装，勿设置 `SKIP_DEPENDENCY_INSTALL`。

Pages 构建自动提供 `CF_PAGES=1`，该变量使 Nitro 使用 `cloudflare-pages` preset；外部 CI 必须显式设置。可选 D1 绑定 `NEWSNOW_DB` 用于持久缓存（当前线上未绑定，数据库功能需要先配置）；不要把 `example.wrangler.toml` 中空的 database_id 直接用于生产。

生产自定义域名：`newsnow.thus.chat`。原有默认域名 `newsnow-ooc.pages.dev` 保留；项目更名不会自动更换已分配的 pages.dev 子域。以自定义域名作为公开入口。

预览环境的变量、Secret 和绑定需独立配置；不要直接复制生产存储到可写的预览。

部署验证：推送 `main` 后，在 Pages → Deployments 找到同一提交 SHA，确认 build/deploy 均为 success；再访问自定义域名。可用 `git commit --allow-empty -m "chore: verify Cloudflare Git deployment"` 后 `git push origin main` 验证 Git 集成。

参考：[Pages Git 集成](https://developers.cloudflare.com/pages/configuration/git-integration/)、[构建配置](https://developers.cloudflare.com/pages/configuration/build-configuration/)。

<!-- cloudflare-git-config:end -->
