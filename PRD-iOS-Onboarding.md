# PandaClaw iOS Onboarding — 产品需求文档 (PRD)

> 面向开发的技术产品文档，描述当前 iOS onboarding 流程的完整页面、逻辑、功能与技术实现。

---

## 1. 项目概述

### 1.1 产品定位
PandaClaw 是一款 AI 伴侣产品，以"熊猫"为品牌形象。本项目为 iOS 端的 **用户首次打开 App 的引导流程（Onboarding）**，目标是：
- 品牌曝光 → 个性化收集 → 注册 → 邀请码验证 → 推送权限 → 付费转化 → 进入主应用

### 1.2 技术栈
| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js (App Router) | 16.1.6 | 框架 |
| React | 19.2.3 | UI |
| TypeScript | 5 | 类型安全 |
| Framer Motion | 12.35.2 | 页面转场动画 |
| Tailwind CSS | 4 | 样式 |
| Lucide React | 0.577.0 | 图标 |

### 1.3 部署目标
- OpenNext + Cloudflare Workers（见 `wrangler.jsonc` 和 `open-next.config.ts`）

---

## 2. 全局设计规范

### 2.1 颜色体系
```
--background: #FFFFFF     (纯白背景)
--foreground: #1a1a1a     (主文字/强调色)
--accent: #1a1a1a         (按钮/交互色)
--cream: #F5F5F5          (卡片/次级背景)
--cream-dark: #E8E8E8     (边框/分割线)
--warm-gray: #6B7280      (次级文字)
--warm-gray-light: #9CA3AF (占位符文字)
```

### 2.2 字体
- 全局使用 `Inter`，通过 Google Fonts CDN 加载
- 字重范围: 300-700

### 2.3 动画
| 类名 | 效果 | 用途 |
|------|------|------|
| `animate-fade-up` | 从下方 12px 淡入 (0.6s) | 页面元素进场 |
| `animate-breathe` | 缩放+透明度呼吸 (3s) | Loading 文字 |
| `animate-slide-up` | 从底部滑入 (0.35s) | 底部弹窗 |
| `stagger-children` | 子元素依次延迟淡入 (80ms间隔) | 列表/选项卡 |

### 2.4 页面转场
- 使用 Framer Motion `AnimatePresence` + `motion.div`
- 进场: `opacity: 0 → 1`, `y: 16 → 0` (0.35s)
- 退场: `opacity: 1 → 0`, `y: 0 → -12` (0.35s)
- 缓动曲线: `[0.16, 1, 0.3, 1]`

### 2.5 共享 UI 组件
| 组件 | class | 描述 |
|------|-------|------|
| 主按钮 | `.btn-primary` | 黑底白字, 圆角 12px, hover 上浮+阴影, disabled 透明度 0.35 |
| 次按钮 | `.btn-secondary` | 透明底+边框, hover 变深 |
| 卡片 | `.card-elevated` | 白底+边框, hover 浮起 |
| 输入框 | `.input-editorial` | 无边框, 底部线条, 居中, 24px 字号 |

---

## 3. Onboarding 流程

### 3.1 流程总览

```
Splash → Hero → NameRole(name) → NameRole(role) → Register → InviteCode → Notifications → Paywall → SetupLoading → AppHome
```

### 3.2 状态管理

**状态结构** (`app/page.tsx`):
```typescript
interface OnboardingState {
  screen: Screen;    // 当前所在页面
  userName: string;  // 用户输入的名字
  role: string;      // 用户选择的角色(逗号分隔)
  isSignIn: boolean; // 是否走登录流程(非注册)
}
```

**存储**: `localStorage` key = `"pandaclaw-onboarding-ios"`
- 每次打开 App 都会清除旧状态，重新从 splash 开始
- 状态变更时自动写入 localStorage

### 3.3 进度条

- **组件**: `ProgressDots` — 5 个点状指示器
- **显示范围**: nameRole ~ paywall（splash、hero、setupLoading、appHome 不显示）
- **位置**: 固定在顶部，`pt-12` 为刘海屏留出安全距离
- **背景色**: 白色，无模糊效果

| 步骤 | 进度 index |
|------|-----------|
| nameRole | 0 |
| register | 1 |
| inviteCode | 2 |
| notifications | 3 |
| paywall | 4 |

### 3.4 完整分支流程

Hero 页面有两个入口，登录后根据用户身份走不同分支：

#### 路径 A：新用户（Get Started）
```
Hero → NameRole(name+role) → Login → InviteCode → Notifications → Paywall → SetupLoading → AppHome
```
- Questions 页收集 userName + role，目的是搜集用户信息、匹配 use case
- 注册/登录后继续完整 onboarding

#### 路径 B：老用户登录（Already have an account?）
```
Hero → Login → [判断是否已付费]
  ├─ Y (已付费) → Notifications → 进入 Chat Session (AppHome)
  └─ N (未付费) → Notifications → Paywall → SetupLoading → AppHome
```

**关键判断逻辑**（登录成功后，后端返回用户状态）：
- **是否已付费**: 检查是否有有效订阅（Web 端购买的订阅在 iOS 端通用）
- 已付费老用户跳过 Paywall，仅请求通知权限后直接进入主应用
- 未付费老用户无需再填 InviteCode（既然已有账号说明之前已验证过），但仍需走 Notifications → Paywall 流程

**Notifications 页**: 可以跳过（"Maybe later"）
**Paywall 页**: **不可跳过**，未付费用户必须完成订阅才能使用产品

> **注意**: 当前原型中 Sign-In 分支为简化 demo（登录后直接进入 appHome）。上述完整判断逻辑需在对接后端 API 时实现。

---

## 4. 各页面详细说明

### 4.1 Splash Screen
**文件**: `components/screens/SplashScreen.tsx`

| 属性 | 值 |
|------|-----|
| 自动跳转时间 | 1.5 秒 |
| 内容 | 居中显示品牌 GIF 动画 |
| GIF 链接 | `https://gimg.iminsp.com/cdn-cgi/image/width=400,quality=70,format=webp,fit=scale-down/shared_images/20260318/a2e9a59b-85a4-4e1e-8197-2f4ffbd63c62.gif` |
| GIF 尺寸 | `w-48 h-48 object-contain` |
| 交互 | 无，自动推进 |

---

### 4.2 Hero (Welcome) Screen
**文件**: `components/screens/ValuePropsScreen.tsx`

| 属性 | 值 |
|------|-----|
| 布局 | 上半部分居中 GIF + 下半部分 CTA |
| GIF 链接 | `https://gimg.iminsp.com/cdn-cgi/image/width=400,quality=70,format=webp,fit=scale-down/shared_images/20260318/2f06172c-4c92-441f-9a74-e43ef04572c9.gif` |
| GIF 尺寸 | `w-64 h-64 object-contain` |
| 主标题 | "Welcome to PandaClaw" (28px, semibold) |
| 主 CTA | "Get Started" → 进入 nameRole |
| 次 CTA | "Already have an account? Log in" → 进入 register (isSignIn=true) |

---

### 4.3 NameRole Screen — 名字步骤
**文件**: `components/screens/NameRoleScreen.tsx`

| 属性 | 值 |
|------|-----|
| 标题 | "What should we call you?" (28px, semibold, 左对齐) |
| 输入框 | `input-editorial` 样式, placeholder "Your name", 居中, autoFocus |
| 键盘提交 | Enter 键可直接提交 |
| CTA | "Continue" (底部固定, 白色背景) |
| 禁用条件 | 名字为空时 disabled |
| 进度条 | index 0 |

---

### 4.4 NameRole Screen — 角色选择步骤
**文件**: `components/screens/NameRoleScreen.tsx` (同组件, step="role")

| 属性 | 值 |
|------|-----|
| 标题 | "What do you need help with?" |
| 副标题 | "You can always change this later" (warm-gray, 14px) |
| 选项列表 | 8 个角色卡片，支持**多选** |
| 进度条 | index 0 (与名字步骤共享) |

**角色选项**:

| Emoji | 标签 | 描述 |
|-------|------|------|
| 💼 | Work & Scheduling | Meetings · Emails · Calendar |
| 📈 | Sales & Outreach | Follow-ups · Leads · Proposals |
| ✍️ | Content & Writing | Posts · Scripts · Newsletters |
| 👨‍💻 | Code & Dev Tools | Debugging · Automation · APIs |
| 💰 | Finance & Budgets | Tracking · Invoices · Taxes |
| 🛒 | Shopping & E-commerce | Deals · Listings · Support |
| ✈️ | Travel & Lifestyle | Trips · Restaurants · Bookings |
| 📊 | Research & Analysis | Data · Reports · Insights |

**交互逻辑**:
- 点击卡片切换选中状态（选中: 黑色边框 + 浅灰背景 + ✓ 图标）
- 至少选 1 个才能 Continue
- "Not sure yet, just browsing" 链接 → 直接以 "Just exploring" 角色提交
- 列表可滚动，底部 CTA 固定

---

### 4.5 Register Screen
**文件**: `components/screens/RegisterScreen.tsx`

| 属性 | 值 |
|------|-----|
| 标题 (注册) | "Create an account or sign in to continue" |
| 标题 (登录) | "Welcome back" |
| 进度条 | index 1 |

**表单顺序** (从上到下):
1. Email 输入框 (`input-editorial`, placeholder "Email address")
2. "Continue with email" 按钮 (disabled 直到输入含 @)
3. "or" 分割线
4. "Continue with Google" 按钮 (带 Google 彩色 logo SVG)
5. "Continue with Apple" 按钮 (带 Apple logo SVG)

**交互逻辑**:
- 所有注册/登录按钮点击后统一调用 `onNext()`
- 当 `isSignIn=true` 时:
  - 注册成功后直接跳到 appHome
  - 底部显示 "← Back to home" 链接
- 当 `isSignIn=false` 时:
  - 注册成功后进入 inviteCode

---

### 4.6 Invite Code Screen
**文件**: `components/screens/InviteCodeScreen.tsx`

| 属性 | 值 |
|------|-----|
| 标题 | "Enter your invite code" (28px, semibold, 左对齐) |
| 进度条 | index 2 |

**输入交互**:
- 6 位字符输入框，仅允许字母+数字，自动转大写
- 显示 "X / 6" 计数器
- **输入满 6 位后自动提交** (400ms 延迟后跳转)
- Enter 键也可手动提交
- 不足 6 位点 Continue 显示错误提示

**底部链接**:
- "Don't have a code? **Apply one**"
- "Apply one" 带下划线，点击打开外部链接: `https://starquest.feishu.cn/share/base/form/shrcnGUFH9kq2wMt25vE3eXS07c?from=navigation`
- 在新标签页打开 (`target="_blank"`)

**Waitlist 子流程** (点击 "Apply one" 前的旧逻辑已移除):
- 当前已改为直接跳转外链申请

---

### 4.7 Notification Permission Screen
**文件**: `components/screens/NotificationPermScreen.tsx`

| 属性 | 值 |
|------|-----|
| 标题 | "Stay in the loop" (28px, semibold, 左对齐) |
| 副标题 | "Get notified when tasks are done" |
| 进度条 | index 3 |

**模拟通知卡片**:
- 2 张模拟 iOS 通知卡片，从右侧滑入
- 第 1 张 (600ms 后出现): 来自 "{userName}'s Panda"，内容关于完成周报+安排团队会议
- 第 2 张 (1200ms 后出现): 来自 "{userName}'s Panda"，内容关于优先级选择

**CTA**:
- 主按钮: "Turn on notifications" (600ms 延迟淡入)
- 次链接: "Maybe later"
- 两者都执行 `onNext()`，当前为前端 demo，未接入实际推送权限 API

---

### 4.8 Paywall Screen
**文件**: `components/screens/IosPaywallScreen.tsx`

| 属性 | 值 |
|------|-----|
| 标题 | "Choose your plan" (28px, semibold, 居中) |
| 不可跳过 | 无关闭按钮，未付费用户必须完成订阅才能使用产品 |
| 进度条 | 不显示 |

**Monthly / Annually 切换**:
- 切换按钮组 (pill 样式)
- 选中态: 黑底白字
- "~2 mo free" 红色 badge 在 Annually 右上角

**套餐卡片** (横向滚动, snap):
- 卡片宽度 85%, snap-center 对齐
- 点击卡片切换选中态（黑色粗边框 + 阴影）
- 选中不同卡片会改变底部 CTA 文案

| 套餐 | 月价 | 年价/月 | 描述 |
|------|------|---------|------|
| **7-Day Free** | $24 | $20 | Get started with your AI companion |
| **Pro** | $100 | $83 | For everyday productivity |
| **Ultra** | $200 | $167 | Get the most out of PandaClaw |

**7-Day Free 卡片定价显示**:
- 大字: `$0`
- 小字: `for 7 days, then $24/mo`

**Pro / Ultra 卡片定价显示**:
- 大字: `$100` / `$200`
- 小字: `/ month`

**Ultra 卡片**:
- 顶部有 "BEST VALUE" badge (黑底白字)

**各套餐包含功能** (仅显示支持的，不展示不支持的):

| 功能 | 7-Day Free | Pro | Ultra |
|------|:---:|:---:|:---:|
| Unlimited free model (MiniMax M2.5) | ✓ | — | — |
| 4,800 credits/mo | ✓ | — | — |
| 2 vCPU, 4 GB RAM, 20 GB Storage | ✓ | — | — |
| 2 concurrent, 3 scheduled tasks | ✓ | — | — |
| Basic image generation | ✓ | — | — |
| Audio | ✓ | — | — |
| App, SMS & Email channels | ✓ | — | — |
| Memory retention during subscription | ✓ | — | — |
| Everything in Starter, plus | — | ✓ | — |
| 20,000 credits/mo | — | ✓ | — |
| 8 vCPU, 16 GB RAM, 256 GB Storage | — | ✓ | — |
| 5 concurrent, 15 scheduled tasks | — | ✓ | — |
| Advanced image generation | — | ✓ | — |
| Video | — | ✓ | — |
| Slack / Telegram | — | ✓ | — |
| Everything in Pro, plus | — | — | ✓ |
| 40,000 credits/mo | — | — | ✓ |
| 8 vCPU, 32 GB RAM, 1 TB Storage | — | — | ✓ |
| 10 concurrent, Unlimited scheduled tasks | — | — | ✓ |

**底部 CTA**:
- 按钮文案随选中套餐变化: "Start 7 day free trial" / "Choose Pro" / "Choose Ultra"
- 说明文字: "7-day free trial then $24 / month" 或 "$100 / month" + "No commitment. Cancel anytime."
- Terms / Privacy 链接

**顶部**: 仅显示 "Restore" 文字按钮（用于恢复已购买的订阅）

---

### 4.9 Setup Loading Screen
**文件**: `components/screens/SetupLoadingScreen.tsx`

| 属性 | 值 |
|------|-----|
| 自动跳转时间 | 5 秒 |
| 内容 | PandaAvatar (88px, 带动画) + 滚动文案 + 进度条 |
| 进度条 | 不显示导航进度条 |

**滚动文案** (每 1000ms 切换):
1. "Setting things up..."
2. "Connecting your channel..."
3. "Preparing your experience..."
4. "Almost ready..."

**进度条**: 48px 宽, 从 0% 到 100% (每 30ms 增加 0.6%)

---

### 4.10 App Home Screen
**文件**: `components/screens/AppHomeScreen.tsx`

- 进入后即为主应用界面
- 包含底部导航: Chat / Tasks / Diary / Profile
- 根据用户选择的 `role` 推荐对应的任务卡片
- Chat 区域有 PandaAvatar + 欢迎语
- 支持从 App 内再次触发 Paywall

---

## 5. 关键组件

### 5.1 PandaAvatar
**文件**: `components/PandaAvatar.tsx`

- SVG 熊猫头像组件
- Props: `size` (像素), `animate` (布尔, 启用浮动动画), `className`
- 用于 Splash、通知卡片、Loading、App Home 等多处

### 5.2 ProgressDots
**文件**: `components/ProgressDots.tsx`

- Props: `current` (当前步骤 index), `total` (总步骤数, 默认 9)
- 当前步骤: 宽 24px 黑色
- 已完成步骤: 宽 8px 黑色 40% 透明度
- 未完成步骤: 宽 8px `cream-dark` 色

---

## 6. 文件结构

```
pandaclaw-onboarding/
├── app/
│   ├── layout.tsx              # Root layout, metadata
│   ├── page.tsx                # Onboarding 状态机 + 路由
│   ├── globals.css             # 全局样式、动画、组件类
│   ├── favicon.ico
│   └── app/
│       ├── layout.tsx          # App 子 layout
│       └── page.tsx            # 主应用页 (chat/tasks/diary)
├── components/
│   ├── PandaAvatar.tsx         # 熊猫头像 SVG
│   ├── ProgressDots.tsx        # 进度指示器
│   ├── SpeechBubble.tsx        # 对话气泡 (已弃用)
│   ├── TaskCard.tsx            # 任务卡片
│   └── screens/
│       ├── SplashScreen.tsx
│       ├── ValuePropsScreen.tsx
│       ├── GreetScreen.tsx     # 已弃用, 不再使用
│       ├── NameRoleScreen.tsx
│       ├── RegisterScreen.tsx
│       ├── InviteCodeScreen.tsx
│       ├── NotificationPermScreen.tsx
│       ├── IosPaywallScreen.tsx
│       ├── SetupLoadingScreen.tsx
│       └── AppHomeScreen.tsx
├── lib/                        # 工具函数
├── public/                     # 静态资源 (SVG icons)
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind / postcss configs
└── wrangler.jsonc              # Cloudflare 部署配置
```

---

## 7. 外部依赖 & 资源

### 7.1 外部图片资源
| 用途 | URL |
|------|-----|
| Splash GIF | `https://gimg.iminsp.com/.../a2e9a59b-...gif` |
| Hero GIF | `https://gimg.iminsp.com/.../2f06172c-...gif` |

### 7.2 外部链接
| 用途 | URL |
|------|-----|
| 邀请码申请 | `https://starquest.feishu.cn/share/base/form/shrcnGUFH9kq2wMt25vE3eXS07c?from=navigation` |

---

## 8. 已知限制 & TODO

- [ ] 注册逻辑为前端 demo，所有注册按钮统一调用 `onNext()`，未接入真实 Auth API
- [ ] 推送权限页面未接入 iOS Push Notification API
- [ ] Paywall 未接入 Apple StoreKit / 支付系统
- [ ] Invite Code 验证为前端 mock（任意 6 位字符即可通过）
- [ ] `GreetScreen.tsx` 和 `SpeechBubble.tsx` 已弃用但文件未删除
- [ ] 角色选择数据为静态硬编码，后续需从后端获取
- [ ] App Home 的 Chat/Tasks/Diary/Profile 为 demo UI
