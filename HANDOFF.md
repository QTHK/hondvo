# HONDVO 网站交接文档

## 项目概览

HONDVO 医疗设备公司八语言单页官网，已部署至 GitHub Pages。

- **线上地址**: https://qthk.github.io/hondvo/
- **GitHub 仓库**: https://github.com/QTHK/hondvo
- **本地项目目录**: `C:\Users\Administrator\Desktop\网站设计\设计\`
- **最后一次推送 commit**: `feat: add sitemap.xml and update index.html with third-tier upgrades`

## 文件结构

```
设计/
├── index.html          # 主页面（单文件，含 CSS/JS）
├── sitemap.xml         # 多语言 sitemap
├── HANDOFF.md          # 本交接文档
├── images/
│   ├── logo.png
│   ├── hero-bg.jpg
│   ├── hero-bg.mp4     # ⚠️ 待放入：Hero 区域视频背景
│   ├── product-*.jpg   # 产品图片
│   └── ...
```

## 🏠 在家继续：设置步骤

### 1. 克隆仓库

```bash
git clone https://github.com/QTHK/hondvo.git
cd hondvo
```

或如果之前已 clone，先拉取最新：
```bash
git pull origin main
```

### 2. 直接编辑

项目是单文件结构，用任意编辑器打开 `index.html` 即可修改。修改后提交推送：

```bash
git add .
git commit -m "你的修改说明"
git push origin main
```

推送后约 1-2 分钟，GitHub Pages 自动更新。

## 已完成的升级清单

| 档次 | 内容 | 状态 |
|------|------|------|
| 基础 | 八语言 I18N（zh/en/de/ru/fr/ja/ko/es） | ✅ |
| 基础 | Web3Forms 联系表单 | ✅ |
| 第一档 | 图片懒加载、骨架屏、返回顶部按钮、移动端 CTA | ✅ |
| 第二档 | 数字计数器动画、Logo墙、图片灯箱、按钮微交互 | ✅ |
| 第三档 | JSON-LD 结构化数据、hreflang 标签、sitemap.xml | ✅ |
| 第三档 | Hero 视频背景 | ⚠️ 待完成 |
| 第三档 | Three.js 3D 产品展示 | ✅ |
| 修复 | 导航下拉遮挡修复 | ✅ |
| 修复 | 灯箱简化为单图（无翻页无计数，Esc 关闭） | ✅ |
| 修复 | 按钮去除波纹动画（仅保留 hover 上浮+阴影） | ✅ |

## 待办事项

### 🔴 必须完成

**放入视频文件**: 将 `hero-bg.mp4` 放到 `images/` 目录下。视频会自动作为 Hero 区域的背景播放。

### 🟡 可选优化

- 替换占位产品图片为真实产品图
- 补充各语言的实际翻译内容（当前部分语言为机器翻译）
- 可根据需要调整 Three.js 3D 展示区域的产品模型

## 重要约束（不要改动）

1. **body { zoom: 1.25 }**: 这是明确要求的全局缩放，**不能删除或修改**
2. **灯箱**: 已简化为单图展示，无翻页按钮和计数器，按 Esc 关闭
3. **按钮动画**: 已去除波纹动画，仅保留 hover 时上浮 + 阴影效果
4. **默认语言**: 网站默认语言为英文（en），不是中文

## 技术配置速查

| 配置项 | 值 |
|--------|-----|
| Web3Forms Access Key | `2b63e2dc-1a6a-4610-8dfd-3e2a1ef6d064` |
| 表单通知邮箱 | `2789536032@qq.com` |
| Three.js | CDN importmap 引入，IntersectionObserver 懒初始化 |
| 支持语言 | zh / en / de / ru / fr / ja / ko / es |
| 默认语言 | en |
| 分支 | main |

## 本地预览

直接用浏览器打开 `index.html` 即可预览。表单提交和 sitemap 需通过 GitHub Pages 线上环境验证。
