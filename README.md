

# HONDVO

> 弘欧科技 & 弘欧精密模具 — 企业官网

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://qthk.github.io/hondvo)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

---

## 公司简介

弘欧集团旗下拥有两家核心企业，均位于中国广东省东莞市长安镇：

| 公司 | 主营业务 |
|------|----------|
| **弘欧精密模具（东莞）有限公司** | 精密模具设计、开发与制造 |
| **弘欧科技（东莞）有限公司** | 医疗级注塑、医疗器械零部件生产 |

公司深耕医疗精密制造领域，配备 ISO Class 8 洁净室注塑车间，持有 ISO 13485 等国际认证，为全球医疗客户提供从模具到量产的一站式解决方案。

---

## 网站功能

- **八语言国际化** — 中文 · English · Deutsch · Русский · Français · 日本語 · 한국어 · Español，下拉切换，会话记忆
- **响应式设计** — 桌面 / 平板 / 手机自适应布局
- **滚动动效** — 视差揭示动画、Hero 全屏轮播
- **在线询盘** — Web3Forms 驱动表单，提交即时邮件通知，含必填校验
- **双公司分区** — 模具 / 科技独立展示，信息清晰分离

---


## 技术栈

| 层级 | 技术 |
|------|------|
| 结构 | HTML5 |
| 样式 | CSS3（自定义属性 + 响应式断点 + 过渡动画） |
| 逻辑 | Vanilla JavaScript（零框架 / 零依赖） |
| 部署 | GitHub Pages（静态托管，HTTPS 强制） |

---

## 项目结构

```
hondvo/
├── index.html           # 主页面（内联 CSS + JS）
├── favicon.ico           # 浏览器标签页图标
├── images/               # 图片资源
│   ├── logo.png
│   ├── global_partners.png
│   ├── qrcode.jpg
│   ├── cert_*.jpg/png    # 资质证书
│   ├── prod_*.jpg        # 产品展示
│   ├── core_*.jpg        # 核心产品
│   ├── workshop_*.jpg    # 车间实拍
│   ├── mold_*.jpg        # 模具展示
│   └── hero_slide_*.jpg  # Hero 轮播背景
├── README.md
├── CHANGELOG.md
└── .gitignore
```

---

## 本地运行

```bash
git clone https://github.com/QTHK/hondvo.git
cd hondvo
python -m http.server 8080

```

浏览器打开 `http://localhost:8080` 即可预览。

---

## 部署

推送到 `main` 分支，GitHub Pages 自动构建发布。

自定义域名配置：Settings → Pages → Custom domain → 填入域名 → 在 DNS 服务商添加 CNAME/A 记录。

---

## 联系方式

- **电话** +86 13545580032
- **邮箱** 2789536032@qq.com



