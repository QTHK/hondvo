# HONDVO 网站交接总文档（权威版）

> 本文件是 HONDVO 官网的**唯一权威交接文档**。全部内容已对照 `index.html` 真实代码逐条核实（核实日期 2026-08-04）。旧版 HANDOFF.md / README.md 中的错误（如"Hero 视频待完成""仓库含 MIT LICENSE"）均已在本次交付中订正。
>
> 项目本地目录：`C:\Users\Administrator\Desktop\网站设计\设计\`
> GitHub 仓库：`https://github.com/QTHK/hondvo`（分支 `main`）
> 线上地址：`https://qthk.github.io/hondvo/`

---

## 0. 一句话概览

HONDVO（弘欧科技 + 弘欧精密模具）企业官网：**单文件、零框架、纯静态**的单页站点，部署在 GitHub Pages。支持 8 语言、Web3Forms 询盘表单。**没有构建步骤**——直接用编辑器改 `index.html` 即可，推送即上线。

---

## 1. 源代码文件清单与职责

| 文件 | 类型 | 职责 |
|------|------|------|
| `index.html` | HTML + 内联 CSS + 内联 JS | **全站唯一源码**。2480 行 / ~260 KB，结构、样式、脚本全在此文件 |
| `favicon.ico` | 图标 | 浏览器标签页图标 |
| `sitemap.xml` | XML | 多语言 sitemap（8 语言 URL） |
| `images/logo.png` | 图片 | 站点 Logo（导航 / 页脚 / apple-touch-icon 复用） |
| `images/hero_slide_1.jpg` `hero_slide_2.jpg` | 图片 | **Hero 区实际可见的背景轮播**（由 JS 切换 `data-bg`） |
| `images/core_medical_1.jpg` `core_medical_2.jpg` | 图片 | 首页核心业务卡片（肠内营养 / 注射给药） |
| `images/core_mold_3.jpg` | 图片 | 首页核心业务卡片（精密模具） |
| `images/prod_enteral.jpg` `prod_injection.jpg` `prod_custom.jpg` | 图片 | 产品中心产品图 |
| `images/mold_1.jpg` … `mold_4.jpg` | 图片 | 模具中心展示图（灯箱可放大） |
| `images/cert_1_page1.jpg` `cert_2_page1.jpg` `cert_3_page1.jpg` | 图片 | 资质证书第一页（IATF 16949 / ISO 13485 / ISO 9001），灯箱展示 |
| `images/cert_1_page2.png` `cert_2_page2.png` `cert_3_page2.png` | 图片 | 资质证书第二页（**当前未引用**，用户要求证书灯箱为单图模式） |
| `images/workshop_1.jpg` `workshop_2.jpg` | 图片 | 车间实拍（资质 / 首页灯箱） |
| `images/global_partners.png` | 图片 | 全球合作伙伴分布图（关于我们） |
| `images/qrcode.jpg` | 图片 | 企业微信二维码（联系页） |
| `README.md` | 文档 | 项目介绍（本次已订正错误） |
| `CHANGELOG.md` | 文档 | 历史更新记录 |
| `.gitignore` | 配置 | Git 忽略规则 |
| `.git/` | 目录 | 本地仓库元数据 |

**关键事实**：项目里**没有**独立的 `.css` / `.js` 文件，**没有**自定义/Web 字体文件，**没有** LICENSE 文件，**没有** `package.json` / `node_modules`（纯静态，无需安装依赖）。

---

## 2. 目录结构说明

```
设计/                         # 本地项目根目录（= GitHub 仓库 QTHK/hondvo）
├── index.html                # 【唯一源码】全站单文件（结构 + 样式 + 脚本）
├── favicon.ico               # 标签页图标
├── sitemap.xml               # 多语言 sitemap
├── images/                   # 全部图片资源（23 个文件，见上表）
│   ├── logo.png
│   ├── hero_slide_1.jpg / hero_slide_2.jpg   # Hero 背景轮播（实际可见）
│   ├── core_*.jpg / prod_*.jpg / mold_*.jpg  # 业务 / 产品 / 模具图
│   ├── cert_*_page1.jpg / cert_*_page2.png   # 资质证书（page1 用于灯箱单图展示，page2 当前未引用）
│   ├── workshop_*.jpg / global_partners.png / qrcode.jpg
├── README.md                 # 项目介绍（已订正）
├── CHANGELOG.md              # 更新日志
├── HANDOFF.md                # 本交接总文档
└── .gitignore
```

### 架构特点（接续开发必读）

- **单文件 SPA**：页面不是多个 HTML，而是 `index.html` 内用 `<div class="page" id="page-*">` 切分的若干"分区"，靠锚点导航（`#page-home` 等）切换显隐。新增页面 = 新增一个 `page-*` 分区 + 导航项。
- **页脚为 JS 注入公共模板**：全站页脚已统一抽成 `FOOTER_HTML` 模板字符串（~2083 行），由 `injectFooters()` 在 `switchLang()` 前注入到 7 个 `<div class="site-footer-mount">` 占位容器。**改页脚只需改 `FOOTER_HTML` 一处**。见约束 #2、速查 §10。
- **I18N 字典内联**：所有翻译写在 `index.html` 第 2003 行起的 `const I18N = {...}` 对象里（200+ 词条，8 语言），HTML 用 `data-lang-key="key"` 引用。

---

## 3. 技术栈与目标运行环境

### 3.1 技术栈

| 层 | 技术 | 说明 |
|----|------|------|
| 结构 | HTML5（单文件） | 无模板引擎、无组件框架 |
| 样式 | CSS3（内联 `<style>`，`:root` 自定义属性 + 媒体查询断点 + transition） | 无预处理器（Sass/Less）、无 Tailwind、无 UI 库 |
| 逻辑 | Vanilla JavaScript（ES5/ES6 混用） | 零框架（无 React/Vue/jQuery）、零打包器（无 Webpack/Vite） |
| 表单 | Web3Forms（`api.web3forms.com/submit`） | 主联系表单 + 三个询盘弹窗；Access Key `2b63e2dc-1a6a-4610-8dfd-3e2a1ef6d064`；通知邮箱 `2789536032@qq.com` |
| 字体 | 系统字体栈 | `'Microsoft YaHei','PingFang SC',-apple-system,'Helvetica Neue',sans-serif`；**未使用任何自定义 / Web 字体文件** |
| SEO | JSON-LD（Organization）+ hreflang（8 语言）+ sitemap.xml + canonical | 全部内联于 `<head>` |
| 部署 | GitHub Pages（静态托管，强制 HTTPS） | 仓库 `QTHK/hondvo`，分支 `main` |

### 3.2 目标运行环境

- **浏览器**：现代 evergreen 浏览器（Chrome / Edge / Firefox / Safari 近两年版本）。依赖 `IntersectionObserver`、`backdrop-filter`、ES6。**不支持 IE**。
- **分辨率**：桌面 ≥1024px / 平板 768–1024 / 手机 ≤767（断点见 CSS 媒体查询）。注意 `body { zoom: 1.25 }` 会整体放大 1.25 倍（见约束 #1）。
- **部署平台**：GitHub Pages；亦可任意静态托管（Nginx、Netlify、Vercel、对象存储）。表单走 Web3Forms，**纯静态即可，无需后端**。
- **域名**：当前线上 `https://qthk.github.io/hondvo/`。代码中 canonical / og:url 写 `hondvotechnology.com`、hreflang 写 `hondvo.com`（见问题 #2，域名尚未统一）。

---

## 4. 已完成功能列表（已核实）

- [x] 八语言国际化：zh / en / de / ru / fr / ja / ko / es，下拉切换，sessionStorage 记忆；**默认英文**
- [x] 响应式布局 + 移动端汉堡菜单
- [x] 滚动揭示动画（`.reveal` + IntersectionObserver）
- [x] 数字计数器动画（stats-bar）
- [x] 图片懒加载（`data-src` + IntersectionObserver）+ 骨架屏 `#skeleton`
- [x] Hero 图片轮播（2 张，带指示器，自动切换）
- [x] 客户 Logo 墙（Medtronic / Baxter / B.Braun / Fresenius / J&J / Stryker / Abbott / Terumo，纯文字 + 色块占位）
- [x] 证书 / 模具 / 车间图片灯箱（单图展示，点击放大，Esc 关闭；无左右切换、无页码）
- [x] 双公司分区展示（模具 / 科技）
- [x] Web3Forms 询盘：主联系表单 + 模具 / 成品 / OEM 三个弹窗，含必填校验、honeypot 防垃圾、邮件通知
- [x] 返回顶部按钮 + 移动端底部固定 CTA
- [x] JSON-LD 结构化数据 + hreflang + sitemap.xml
- [x] 新闻列表（7 条真实新闻，含日期 / 标题 / 摘要，已翻译）
- [x] 资质展示（ISO 13485 / IATF 16949 / ISO 9001 + 生产环境 + IQ/OQ/PQ）
- [x] 隐私政策 / 服务条款页面（全 8 语言）：单文件 SPA 内新增 `page-privacy` / `page-terms` 两个 hash 路由页面；法条正文存于 `LEGAL` 对象，由 `renderLegal(lang)` 在 `switchLang()` 内填充；页脚死链已接上 `#page-privacy` / `#page-terms`

---

## 5. 后续开发需求清单（Backlog / Roadmap）

优先级：🔴 高　🟡 中　🟢 低

- 🔴 **统一生产域名**：确认真实域名（hondvo.com？hondvotechnology.com？），统一 canonical / og:url / hreflang，并配置 GitHub Pages 自定义域名 + HTTPS。
- ✅ ~~**隐私政策 / 服务条款页面**~~：**已完成**——新增 `page-privacy` / `page-terms` 两个站内页面（全 8 语言法条，`LEGAL` 对象 + `renderLegal`），页脚死链已改为 `#page-privacy` / `#page-terms`。
- 🟡 **替换占位素材**：客户 Logo 墙目前是文字 + 色块，建议换成真实客户 Logo；产品 / 证书图可换更高清实拍。
- ✅ ~~**页脚抽公共片段**~~：**已完成**——页脚已抽为 JS 注入公共模板（`FOOTER_HTML` + `injectFooters`），改一处全局生效（见约束 #2、速查 §10）。
- 🟡 **翻译校对**：部分小语种为机器翻译，建议母语者校对（尤其中医疗 / 法律术语）。
- 🟢 **工程化拆分**：将单文件拆为 `index.html` + `css/style.css` + `js/i18n.js` + `js/main.js`，便于长期维护（拆分时务必保留现有代码风格与 `body{zoom:1.25}` 等约束）。
- 🟢 **接入网站分析**（GA4 / 百度统计 / Plausible），目前无任何统计。
- 🟢 **接入真实社交媒体账号链接**（页脚 3 个 SVG 当前无 `href`）。

---

## 6. 当前页面具体问题（已核实，按严重度）

1. 🔴 **Hero 死 `<video>`（本次已修复）**：原代码 `<video><source src="images/hero-bg.mp4"></video>` 引用了不存在的文件，每次加载都发起一次 404 请求，且视频元素为空。可见的 Hero 实际是 `.hero-slides` 图片轮播（正常工作）。**本次交付已删除该死 `<video>` 块**。
2. 🟡 **域名三处不一致**：`<link canonical>` 与 `og:url` 用 `hondvotechnology.com`；8 条 `hreflang` 用 `hondvo.com`；实际部署在 `qthk.github.io/hondvo`。SEO 信号互相矛盾，需统一（见需求 #1）。
3. 🟢 **页脚死链（已修复）**："Privacy Policy / Terms of Service" 原为 `href="#"` 占位，本次已改为 `#page-privacy` / `#page-terms`，接入站内真实页面（见已完成功能、需求 #2）。
4. 🟢 **证书第二页未引用（按设计保留）**：`cert_1_page2.png` 等第二页证书当前未被灯箱引用，用户要求单击证书只显示单张 page1，不左右切换。page2 图可作为后续备用素材保留。
5. 🟡 **旧文档与代码不符（本次已订正）**：旧 HANDOFF 称"Hero 视频待完成、放入 hero-bg.mp4 即生效"——实为臆想；旧 README 标注 MIT License 徽章且暗示存在 LICENSE 文件，但仓库无 LICENSE。均已订正。
6. 🟢 **联系信息两处不一致**：官网显示电话 `+86 769 8188 9275`、邮箱 `info@hondvotechnology.com`；旧 README 写电话 `+86 13545580032`。本次已将 README 对齐官网（见 README 修订）。
7. 🟢 **无统计 / 无真实社交链接**：见需求 #8 / #9。

---

## 7. 期望新增功能点（建议，可纳入需求清单）

- 多语言切换增加语言图标 / 国旗，提升辨识度
- 产品中心增加分类筛选 / 搜索
- 新闻详情页（当前新闻列表项点击无详情）
- 博客 / 案例中心
- 在线客服（WeCom / WhatsApp 浮动窗）
- 询盘提交成功后的本地化成功提示优化
- 暗色模式

---

## 8. 重要约束（接续开发务必遵守，勿擅改）

1. **`body { zoom: 1.25 }`**：全局缩放在 `index.html` 第 39 行，是明确要求，**不可删除或修改**，否则整体布局错位。
2. **灯箱为单图模式**：`openLightbox(src)` 只接受字符串（单张图片 URL），点击证书只显示 `page1`，无左右切换、无页码。导航：Esc 关闭，点击遮罩层关闭。
3. **按钮动画**：仅 hover 上浮 + 阴影，**无波纹动画**。
4. **默认语言为英文（en）**，存于 `sessionStorage`（键 `hondvo_lang`）；新开会话默认 en。
5. **单文件架构**：所有改动集中在 `index.html`；新增样式进 `<head>` 内 `<style>`，新增脚本进文件末尾 `<script>`。
6. **Web3Forms Access Key 与通知邮箱**见第 3.1 节；换表单收件人需同步改 key 或邮箱。

---

## 9. 本地预览与部署

- **预览**：`python -m http.server 8080` 后访问 `http://localhost:8080`（或任意静态服务器 / 直接双击打开 `index.html`）。
- **部署**：推送到 `main` 分支，GitHub Pages 自动发布，约 1–2 分钟生效。自定义域名：仓库 Settings → Pages → Custom domain。
- **注意**：表单提交与 Web3Forms 通知需在能访问外网的环境验证；纯 `file://` 打开时部分 `fetch` 可能受 CORS 限制。

---

## 10. 接续开发速查（How-to）

- **改文案 / 加翻译**：在 `const I18N` 对象（~2003 行）按 `key: {zh,en,de,ru,fr,ja,ko,es}` 增改；HTML 用 `<... data-lang-key="key">`。新增一条须同时补 8 语言。
- **加页面分区**：复制 `<div class="page" id="page-xxx">…</div>`，在导航 `<ul>` 加 `<li><a href="#page-xxx">`。
- **加图片**：放入 `images/`，HTML 用 `<img class="lazy" data-src="images/xxx.jpg" loading="lazy">`（懒加载机制自动处理）；Hero 背景用 `data-bg`。
- **改页脚 / 修 logo**：改 `index.html` 中 `FOOTER_HTML` 模板字符串（~2083 行）**一处即可**；页脚由 `injectFooters()` 在 `switchLang()` 前注入到 9 个 `.site-footer-mount` 占位容器。模板内 logo 用 `src="images/logo.png"` 直接加载（不使用懒加载，避免注入后不被观察）。隐私 / 条款链接已接 `#page-privacy` / `#page-terms` 站内页面（见已完成功能）。
- **改表单**：主表单处理器在 ~2414 行；弹窗在 ~2753 行；均 POST 到 Web3Forms。

---

## 11. 本次交付所做修正（2026-08-04）

- 删除 `index.html` 中引用缺失文件的死 `<video>`（Hero 区，原 1091–1093 行），消除 404 请求。
- 重写本 HANDOFF.md 为权威总文档，订正旧文档中"Hero 视频待完成""LICENSE 存在"等错误。
- 订正 README.md：移除不存在的 MIT License 徽章 / 声明；联系电话对齐官网（`+86 769 8188 9275`）。
- 全文所有"功能 / 技术栈 / 问题"均对照真实代码核实，非沿用旧文档。

### 第二批交付（2026-08-04，后续清理坑）

- **页脚重构**：删除 7 份重复 `<div class="footer">`，改为 JS 注入公共模板 `FOOTER_HTML` + `injectFooters()`（在 `switchLang()` 前调用，保证动态页脚被统一翻译）；注入目标为 9 个 `.site-footer-mount` 占位容器。隐私 / 条款链接已接 `#page-privacy` / `#page-terms` 站内页面。
- **证书灯箱升级为多页画廊**：`openLightbox` 支持数组参数，新增 `renderLightbox / lbPrev / lbNext` 与左右箭头、页码 UI、键盘 ←→ 导航；6 处证书卡片改为传 `[page1, page2]`，`cert_*_page2.png` 已接入。单图（车间 / 模具）时箭头与页码自动隐藏。
- **域名统一暂缓**：用户确认尚未注册域名，`canonical` / `og:url` / `hreflang` 三处不一致暂保留，待注册后处理（见需求 #1）。

### 第三批交付（2026-08-04，按用户反馈即时修复）

- **证书灯箱恢复单图模式**：删除左右箭头按钮、页码、键盘 ←→ 导航、`lbGallery` / `lbPos` / `lbPrev` / `lbNext` 等多图状态与函数；`openLightbox(src)` 仅接受字符串；6 处证书卡片改回传 `images/cert_*_page1.jpg`。灯箱仅保留关闭按钮与 Esc，并支持点击遮罩层关闭。
- **页脚补回公司 logo**：`FOOTER_HTML` 模板中原 `img` 标签写法错误（`<img ... / loading="lazy">`）且使用 `data-src` 懒加载，注入后不被懒加载观察导致空白。已改为 `<img src="images/logo.png" alt="弘欧" loading="lazy">`，logo 正常显示。
- **删除 3D 产品展示区块**：移除首页「3D产品展示」整个 section（标题、画布容器、360° 徽章），同步删除 `.td-section / .td-wrapper / .td-frame / #td-container / .td-badge` 全部 CSS、Three.js CDN 脚本（`three@0.160.0`）、`init3DShowcase` IIFE 脚本（~260 行），以及 I18N 字典中的 `td_title` 词条。

---

### 第四批交付（2026-08-04，合规页开发）

- **新增隐私政策 / 服务条款页面（全 8 语言）**：在 `index.html` 内新增 `page-privacy` / `page-terms` 两个 hash 路由 section（沿用现有 SPA 架构，不新建 HTML 文件）。
  - 法条正文存于新增的 `LEGAL` JS 对象（privacy 10 节 + terms 9 节，zh/en/de/ru/fr/ja/ko/es 各一份完整文本），由新增的 `renderLegal(lang)` 在 `switchLang()` 内填充（页面元素用 `data-legal-key` 标记）。
  - 新增 legal 页专用 CSS（`.legal-content` / `.legal-sec` / `.legal-updated`）。
  - 页脚死链修复：`FOOTER_HTML` 模板中 "Privacy Policy / Terms of Service" 由 `href="#"` + `data-todo` 改为 `#page-privacy` / `#page-terms`，点击即走 hash 路由打开对应页面。
  - **注意**：法条为 AI 生成的参考级文本，未经法务/律师审核，正式上线前建议由专业人士校对（尤其医疗合规措辞）。
- **验证**：`new Function` 校验两个内联 JS 块无语法错误；JSON-LD 通过 `JSON.parse`；`data-legal-key` 共 42 个、8 语言齐全无缺；`data-todo` 残留 0。

*（本交接文档由人工核对代码后整理，可直接作为接续开发依据。）*
