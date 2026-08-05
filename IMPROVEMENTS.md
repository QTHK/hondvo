# HONDVO 官网 · 改进计划（Improvement Backlog）

> 由 2026-08-05 全面体检审计生成。按优先级排序：**P0 必修 / P1 建议 / P2 锦上添花**。  
> 状态栏：`[ ]` 未开始 · `[~]` 进行中 · `[x]` 已完成  
> 配套权威文档：`HANDOFF.md`

---

## 🔴 P0 — 不修等于白做（影响上线 / SEO 根基 / 事实错误）

### P0-1 域名三头马车，自相矛盾

- **现状**：`canonical` + `og:url` = `hondvotechnology.com`；`sitemap.xml` + `JSON-LD` + `hreflang` = `hondvo.com`；实际部署 = `qthk.github.io/hondvo`。
- **影响**：同一站点三个"官方地址"，搜索引擎无法判断主域，canonical 失效、富媒体结果异常。
- **修复**：域名注册前，先让 canonical / og:url / sitemap / JSON-LD / hreflang **全部指向同一个实际可访问地址**（至少先用 GitHub Pages `https://qthk.github.io/hondvo`）。注册后统一切到正式域名。
- **状态**：`[x]`

### P0-2 JSON-LD 结构化数据写了假信息

- **现状**：`index.html:969-989` 中 `address` 写「深圳市光明区」，`telephone` 是占位 `+86-769-xxxxxxx`。
- **事实**：公司是**东莞**（区号 769、公司名含 Dongguan），真实电话 `+86 769 8188 9275`。
- **影响**：Google 商家信息 / 富媒体抓到错误地址与占位电话会报错或忽略。
- **修复**：地址改为东莞（如「东莞市 XX 区」），电话填真实号码；`url` / `logo` 同步到 P0-1 选定的主域。
- **状态**：`[x]`

### P0-3 hreflang 指向不存在的 URL

- **现状**：`index.html:994-1002` 与 `sitemap.xml` 的 `?lang=zh` 等查询参数 URL。
- **影响**：网站实际用 **hash 路由 + sessionStorage** 切语言，这些 `?lang=` 页面根本不存在，对爬虫无效且误导。
- **修复**：要么生成真实可访问的多语言落地页再保留 hreflang；要么先移除错误的 hreflang 与 sitemap 中的 `?lang=` 条目。
- **状态**：`[x]`

---

## 🟡 P1 — 建议修（性能 / 体验 / 一致性）

### P1-1 `body { zoom: 1.25 }`（用户强制要求，保留）

- **现状**：`index.html:39` 桌面默认 `zoom:1.25`；`index.html:543`/`636` 已在 `@media (max-width:768px)/(480px)` 重置为 `zoom:1`。
- **结论**：原开发者已将其**限定为桌面专用、移动端自动关闭**，所谓"移动端横向溢出"属误报，实际已处理。
- **评估**：无标准 CSS 能像素级还原"文字+图片+间距全 125% 等比放大"（站点尺寸几乎全为写死 px，非 rem）；等价写法需整套 px→rem 重构，改动大且有回归风险，无法保证一致。
- **决定**：**按用户要求保留 `zoom:1.25`，不改。**（如未来要做"标准写法"，路径是 px→rem + 根字号 125%，属大重构，需用户另行确认。）
- **状态**：`[~]`（已评估，保留不动）

### P1-2 11MB「幽灵图片」未引用

- **现状**：`cert_1_page2.png`(2.0MB) / `cert_2_page2.png`(5.4MB) / `cert_3_page2.png`(3.6MB) 共约 11MB，灯箱只用 `cert_*_page1.jpg`，这三张完全没被引用。
- **影响**：随仓库每次下载，纯属带宽负担。
- **修复**：用户 2026-08-05 确认，已 `git rm` 删除三张 page2.png 并**暂存（尚未提交推送）**；删除前已确认全站零引用、无死链。如需恢复，git 历史仍在。
- **状态**：`[x]`（已删除并暂存，待统一提交推送；注：本地 Desktop 副本 images/ 磁盘本就缺失其余图片，属副本不完整，不影响 GitHub 已提交版本）

### P1-3 证书 PNG 体积爆炸

- **现状**：page2 单张 2–5MB。
- **修复**：用户 2026-08-05 确认，已用 Pillow 将全部 20 张 jpg/png 转 WebP（质量 82，透明 PNG 保留 alpha），总体积 4087KB→2180KB（-47%）；`index.html` 43 处引用已批量改为 .webp。原图保留未删（如需进一步减小仓库体积可 `git rm` 原图，需用户确认）。
- **状态**：`[x]`

### P1-4 语言基调割裂

- **现状**：`currentLang()` 回退 `'en'`（默认英文 UI），但 meta description / og 描述是中文，`<html lang="en">` 又是个东莞企业。
- **修复**：用户 2026-08-05 确认「海外 B2B 优先」。已将 head 静态 `description`/`keywords`/`og:title`/`og:description`/`twitter:title`/`twitter:description` 及 `<title>` 默认文本统一改为英文；`<html lang="en">` 与 I18N `page_title.en` 本就英文，三处一致。
- **状态**：`[x]`

### P1-5 单文件零压缩零构建

- **现状**：`index.html` 2581 行 / 315KB，CSS/JS 全内联。
- **修复（中期）**：工程化拆分 `style.css` / `app.js` / `i18n.js`；或至少做 HTML 压缩 + 图片 WebP。
- **状态**：`[ ]`

### P1-6 缺 robots.txt 与访问统计

- **修复**：已创建 `robots.txt`（Allow + Sitemap 指向 GitHub Pages）；`index.html` `</head>` 前已插入 GA4 脚本，**Measurement ID 为占位 `G-XXXXXXXXXX`，待用户填入真实 ID**（两处）。
- **状态**：`[x]`

---

## 🟢 P2 — 锦上添花

- [x] **P2-1 无 `<noscript>` 兜底**：已给全部 35 张懒加载图补真实 `src`（无 JS 时靠原生 `loading="lazy"` 直接加载）+ `<noscript>` 兜底样式（`img.lazy{opacity:1}` + hero 首屏静态底图）。禁用 JS 不再白屏。
- [ ] **P2-2 法律文案未过律师**：隐私/条款为 AI 生成，8 语言机器翻译（德/法/日/韩/俄术语尤甚），**页面未加免责声明，仍须由专业律师审核**后再正式上线。
- [~] **P2-3 footer 社交链接为占位**：已加 `TODO(PENDING)` 标注并保留占位图标（无真实链接、不删）。待你提供真实社媒账号（领英/公众号/YouTube 等）后包进 `<a href>`。
- [x] **P2-4 清理死代码**：已删除两条过时 `TODO(PENDING)`（隐私/条款"尚未构建"，实际早已建好）；Three.js / td-section / lb-nav 等残留 P0 已清，全仓 0 匹配。
- [x] **P2-5 无障碍复核**：`<nav>` 加 `aria-label="主导航"`；汉堡按钮加 `aria-expanded` 并随开合切换 + `aria-controls`；全局 `:focus-visible` 焦点框；路由切换时给当前页链接设 `aria-current="page"`；灯箱加 `role="dialog" aria-modal="true"` 与关闭按钮 `role/aria-label`。

---

## ✅ 已确认健康项（无需动）

- 懒加载机制正常（`IntersectionObserver` 把 `data-src`→`src`），证书缩略图能正常显示。
- 灯箱为单击单图模式（符合需求），Esc / 点击遮罩关闭正常。
- 法律页（隐私/条款）结构已修复，42 个 `data-legal-key` 全量填充。
- 页脚已 JS 注入去重，logo 已恢复。
