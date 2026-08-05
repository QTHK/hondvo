# HONDVO 官网交互与视觉升级需求规格（精炼版）

## 1. 背景与目标（Context & Objective）

在现有单文件静态官网 `index.html` 的基础上，进行一层**非破坏性的体验增强封装**：在不改变核心业务逻辑、不引入构建工具、不新增外部依赖的前提下，系统性地提升页面的交互反馈密度与视觉精致度，使最终交付物更接近现代企业级 SaaS/制造品牌官网的质感标准。

**核心目标**：将当前以内容展示为主的静态页面，升级为具备「即时反馈、微动效叙事、状态可视化、无障碍可用」特征的高质感单页体验。

---

## 2. 核心功能要求（Core Functional Requirements）

### 2.1 全局导航系统
- 滚动进度指示：页面顶部固定一条宽度随内容滚动比例变化的进度条，颜色使用品牌橙渐变，需适配当前 `position: fixed` 分页面内部滚动架构。
- 返回顶部与移动端 CTA：保留现有行为，但增加平滑出现/隐藏过渡。

### 2.2 英雄区（Hero）
- 双 CTA 按钮组：主按钮「立即询价」跳转 `#page-contact`，次按钮「探索产品」跳转 `#page-products`。
- 滚动引导：Hero 底部提供「向下滑动了解详情」提示，点击/触摸后平滑滚动至 `.stats-bar` 统计条区块。
- 标题逐字揭示动画：保留并优化现有 `.char` 拆分动画，确保多语言切换后动画可重放。
- 背景轮播：保留现有 Hero 轮播与指示点，过渡需保持流畅。

### 2.3 内容卡片与组件
- 3D Tilt 倾斜效果：桌面端鼠标悬停时，`.purchase-card`、`.prod-card`、`.img-cert-card` 随光标位置产生轻微 3D 倾斜；移动端禁用以节省性能。
- Ripple 波纹反馈：所有 `.btn` 系列按钮点击时产生从点击点扩散的波纹动画。
- 卡片悬浮与阴影层级：统一使用设计 token 中的阴影与圆角规范，区分静止、悬停、激活三种状态。

### 2.4 表单与校验
- Inline 错误态：联系表单与购买弹窗校验失败时，给对应 `.fg` 字段添加 `.invalid` 红框，并在用户再次输入时自动清除。
- Toast 通知系统：替代原生 `alert()`，统一使用全局 `showToast(msg, type, details)` 进行成功/失败/提示反馈；Toast 支持概要+详情展开，且始终浮于页面最顶层（包括弹窗与灯箱之上）。
- 表单提交状态：保留现有的按钮 loading/success/error 状态反馈。

### 2.5 灯箱与弹窗
- 灯箱缩放动画：单图灯箱打开时图片从缩略图位置平滑放大，关闭时反向缩小。
- 购买弹窗：保留现有打开/关闭逻辑，增加打开时的缩放/淡入动效。

### 2.6 其他微交互
- 客户墙/Logo 墙：悬停时轻微放大与阴影增强。
- 真实数字滚动：保留现有 `requestAnimationFrame` 计数动画，不替换为脉冲动画。
- 滚动揭示：保留 `.reveal` + IntersectionObserver 模式，调整缓动曲线使其更顺滑。

---

## 3. 技术约束（Technical Constraints）

| 约束项 | 要求 |
|--------|------|
| 文件形态 | 保持单文件静态页面，所有 CSS/JS 内联于 `index.html`，零构建步骤。 |
| 框架依赖 | 禁止引入 Vue/React/Angular/Three.js 等外部框架或重型库。 |
| 字体资源 | 不引入外部字体文件，仅使用系统字体栈，优先 `Inter`（若系统存在），回退 `-apple-system / Segoe UI / Microsoft YaHei / Noto Sans SC`。 |
| 路由机制 | 保留现有 Hash 路由（`:target` + `onHash`），不得改写核心路由函数。 |
| I18N 机制 | 保留现有 `I18N` / `LEGAL` 字典与 `switchLang` 函数，新增词条必须补齐 8 种语言（zh/en/de/ru/fr/ja/ko/es）。 |
| 页面滚动 | 当前为 `position: fixed` 分页面内部滚动，所有滚动监听必须绑定到当前 `.page.active` 元素，而非 `window`。 |
| 核心函数保护 | **禁止修改**以下函数签名或内部核心逻辑：`switchLang`、`injectFooters`、`toggleAccordion`、`openLightbox`、`closeModal`、表单提交主函数。 |
| 性能 | 动画仅使用 `transform` 与 `opacity`，避免触发 layout/paint；移动端禁用 Tilt 等不必要效果。 |
| 无障碍 | 所有新增交互元素须保留键盘可操作性与 `aria-label`；动效遵循 `prefers-reduced-motion` 媒体查询降级。 |

---

## 4. 关键交互规范（Interaction Specifications）

### 4.1 滚动进度条
- 容器：`#scroll-progress`，固定于视口顶部，`z-index` 高于导航但低于 Toast。
- 更新公式：`width = (scrollTop / (scrollHeight - clientHeight)) * 100%`。
- 绑定目标：当前 `.page.active` 元素；页面切换时重新绑定监听器并立即计算一次。
- 过渡：`width` 变化使用 `transition: width 0.1s linear`，避免抖动。

### 4.2 Toast 通知
- API：`window.showToast(message, type, details)`，其中 `type ∈ {info, success, error}`，`details` 为可选字符串数组。
- 层级：`z-index: 10001`，确保高于 `.purchase-modal` / `.lightbox`（9999）。
- 交互：点击 Toast 或在 Toast 上向下滑动可展开 `details` 列表；展开后自动关闭时间延长至 7 秒。
- 行为：同一时间只显示一个 Toast，新 Toast 覆盖旧 Toast 并重置计时器。

### 4.3 表单 Inline 校验
- API：`window.markFg(inputElement)` 给最近 `.fg` 祖先添加 `.invalid`；输入时通过事件委托自动移除 `.invalid`。
- 联系表单：校验「姓名、电话、邮箱」必填 + 电话格式；失败时同时标红缺失字段并 Toast 提示。
- 购买弹窗：校验所有文本/数字输入非空 + 单选组已选；失败时标红空字段并 Toast 提示。

### 4.4 Ripple 波纹
- 实现方式：事件委托到 `document.body`，监听 `.btn` 点击，动态创建 `<span class="ripple-wave">` 并基于点击坐标定位。
- 动画：从 `scale(0)` 扩散到 `scale(4)`，结束后自动移除 DOM。
- 禁用：在 `.btn:disabled` 或动画过程中不触发。

### 4.5 3D Tilt
- 目标选择器：`.tilt, .purchase-card, .prod-card, .img-cert-card`。
- 倾斜范围：X/Y 轴最大 ±6°，使用 `transform: perspective(800px) rotateX(...) rotateY(...)`。
- 性能：仅桌面端（`matchMedia('(pointer: fine)').matches`）启用；鼠标离开复位并移除 transform。

### 4.6 Hero 滚动引导
- 元素：`.hero-scroll-hint`，通过 `data-action="scroll-stats"` 与 JS 解耦。
- 行为：点击后计算当前活动页面内 `.stats-bar` 的相对位置，使用 `pageElement.scrollTo({ top: offset, behavior: 'smooth' })` 平滑滚动。

---

## 5. 视觉与质感标准（Visual Quality Standards）

### 5.1 设计 Token（扩展 `:root`）
```css
:root {
  /* 品牌色保留并扩展 */
  --blue-600: #3D5D7A;
  --blue-700: #2f4a63;
  --orange-soft: #FFF4EC;

  /* 中性色阶 */
  --ink-900: #0f172a;
  --ink-800: #1D1D1F;
  --ink-700: #334155;
  --ink-600: #475569;
  --ink-500: #64748b;
  --ink-300: #cbd5e1;
  --ink-100: #f1f5f9;

  /* 背景 */
  --bg-soft: #f8fafc;
  --bg-mist: #f1f5f9;

  /* 阴影层级 */
  --shadow-sm: 0 1px 2px rgba(15,23,42,0.06);
  --shadow-md: 0 4px 12px rgba(15,23,42,0.08);
  --shadow-lg: 0 12px 28px rgba(15,23,42,0.12);
  --shadow-xl: 0 24px 48px rgba(15,23,42,0.16);
  --shadow-orange: 0 12px 32px rgba(230,126,34,0.22);

  /* 圆角 */
  --r-sm: 8px;
  --r-md: 12px;
  --r-lg: 16px;
  --r-xl: 22px;
  --r-full: 999px;

  /* 缓动与时长 */
  --ease: cubic-bezier(.4,0,.2,1);
  --ease-out: cubic-bezier(.16,1,.3,1);
  --ease-spring: cubic-bezier(.34,1.56,.64,1);
  --t-fast: .18s;
  --t: .3s;
  --t-slow: .5s;

  /* 布局与层级 */
  --container: 1280px;
  --container-narrow: 880px;
  --z-nav: 1000;
  --z-progress: 1100;
  --z-modal: 9999;
  --z-toast: 10001;
}
```

### 5.2 按钮系统
- `.btn`：基础胶囊按钮，高度 44–48px，圆角 `--r-full`，内边距统一。
- `.btn-primary`：品牌蓝底 + 白字 + 悬停亮度提升 + 橙色投影。
- `.btn-ghost`：透明底 + 白边/暗边自适应 + 悬停背景填充。
- 所有按钮点击时提供 `:active` scale(0.97) 反馈。

### 5.3 卡片与图片
- 统一圆角 `--r-lg`，悬停时 `transform: translateY(-4px)` + `box-shadow: var(--shadow-lg)`。
- 图片容器使用 `overflow: hidden`，悬停时内部图片轻微放大（scale 1.05）。

### 5.4 表单字段
- 正常态：1px 边框 `--ink-300`，圆角 `--r-md`。
- 错误态：边框变红 + 轻微红色背景 + 左侧红色指示条。
- 成功态（可选）：边框变绿 + 右侧对勾图标。

---

## 6. 验收标准（Acceptance Criteria）

- [ ] 单文件结构保持，无新增外部 JS/CSS 链接。
- [ ] 8 语言切换后所有新增词条正确显示，Hero 双按钮与滚动提示文案随语言变化。
- [ ] 滚动进度条在桌面与移动端均随当前页面内容滚动正确更新。
- [ ] Toast 始终浮于弹窗、灯箱、导航之上，且支持下滑/点击展开详情。
- [ ] 表单校验失败时对应字段红框高亮，重新输入后红框自动消失。
- [ ] Ripple、3D Tilt、卡片悬浮等动效在桌面端流畅，移动端无卡顿或误触。
- [ ] `node --check` 或等效方式校验所有内联 JS 语法通过，无控制台报错。
- [ ] 核心功能回归通过：Hash 路由、灯箱开关、购买弹窗开关、Web3Forms 提交、语言切换、页脚注入、懒加载。

---

## 7. 预期输出格式（Expected Output Format）

交付物为单一文件：

```
C:\Users\Administrator\Desktop\网站设计\设计\index.html
```

输出需满足：
1. 所有 CSS 追加于 `<style>` 块尾部，按「设计 Token → 组件 → 动画 → 工具类」顺序组织，并以 `/* UPGRADE+ ... */` 注释分块。
2. 所有 JS 追加于第二个 `<script>` 块尾部，以独立 IIFE 形式组织，并以 `/* UPGRADE+ 交互增强 IIFE */` 注释开头。
3. HTML 结构调整仅限于：插入 `#scroll-progress`、插入 `#toast`、Hero 区插入 `.hero-actions` 与 `.hero-scroll-hint`。
4. 提供一段简要的变更摘要，列出新增功能与验证结果。

---

## 8. 非目标（Out of Scope）

- 不修改页面文案与信息架构。
- 不替换或重构现有路由、I18N、表单提交、灯箱/弹窗核心逻辑。
- 不引入 Three.js、WebGL、视频背景或任何需要构建步骤的技术。
- 不新增独立页面（如隐私政策、服务条款保持原状）。
- 本次升级不涉及 Git 提交或部署，仅交付修改后的 `index.html`。
