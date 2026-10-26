# 电容 Demo

电容、电场与触觉感知的交互式科学演示合集（中文说明；演示界面自 2026-10-23 起为英文，[English README](README.md)）。两个辅助作品放在同一个入口，各自保留源码、数据与模型说明。

**项目背景：**两个演示分别来自本科传感器课程的两次课堂汇报。课程只要求讲解原理，常规做法是幻灯片；作者选择做成可交互的网页演示。先完成了 ProxiTouch，下一次汇报又进一步尝试了带数值建模的互电容实验室。

**[在线合集](https://lix-works.github.io/Capacitance-Demos/)** · [ProxiTouch](https://lix-works.github.io/Capacitance-Demos/proxitouch/) · [互电容建模实验室](https://lix-works.github.io/Capacitance-Demos/mutual-capacitance/)

| 演示 | 内容 | 入口 |
| --- | --- | --- |
| **ProxiTouch** | 12 页：封面直接展示接近—触碰—施压的完整过程；电容基础合并为三页机理；共享电极、双通道与阵列应用 | [项目介绍](projects/proxitouch/README.md) · [场景预览](projects/proxitouch/previews/overview.png) |
| **互电容建模实验室** | 8 页：两块极板从正对展开到并排，还剩多少电容；固定转轴、条带近似、理想扇区、BEM 数值解、全角度扫描与四项独立检查（已移除平板介质部分） | [项目介绍](projects/mutual-capacitance/README.md) · [场景预览](projects/mutual-capacitance/previews/overview.png) |

![ProxiTouch 场景预览](projects/proxitouch/previews/overview.png)

![互电容场景预览](projects/mutual-capacitance/previews/overview.png)

两个概览均为精选的 2×2 拼图，完整图库保留全部实际截图。ProxiTouch 展示封面循环、边缘场、双通道与夹蛋应用；互电容展示封面问题、BEM 电势图、0–180° 扫描与数值检查。

## 运行与修改

使用 Node.js 22 或更新版本，在本仓库根目录运行：

```sh
npm run build
npm run check
npm test
npm run preview
```

打开终端打印的本地地址。构建使用包内 TypeScript 5.8.3，无需联网安装。构建后，`index.html` 是离线合集入口；两个演示的 `projects/<name>/index.html` 也可直接打开，需要 WebGL2 浏览器。

合集首页在 `web/`，演示源代码在 `projects/<name>/source/src/`。修改源码后重新构建，不单独编辑打包 HTML。

## 验证与部署

浏览器检查与预览刷新需要 Python 3.12、Playwright 和 Pillow：

```sh
python -m pip install -r requirements-qa.txt
python -m playwright install chromium
npm run qa
npm run previews
npm run build
npm test
```

`qa` 检查真实 HTTP、仓库子路径、两个演示共 20 页及关键交互；预览命令重新渲染实际应用，不以旧图片代替当前验证。科学重算另见各项目文档，运行网页不需要 Python 求解服务。

单个 [GitHub Pages 工作流](.github/workflows/pages.yml) 构建两个项目，仅发布根 `site/`。设置与上传范围见 [DEPLOY.md](DEPLOY.md)；构建与发布结果可在仓库 Actions 页面查看。

可选科学抽验使用互电容项目的 `requirements-reproduce.txt`，运行 `npm run test:science`。它只复算 8 个 BEM 工况并核对单位、编码和几何，不覆盖已发布数据，也不代表完整重算。`npm run test:safety` 用标准库测试失败阶段不会覆盖既有成果，无需科学依赖。

## 模型范围与授权

ProxiTouch 是未制造、未实测的概念设计。互电容展示真实尺寸参数下的预计算数值与节点插值；二维宽度外推、局部近似和有限宽度三维检查各有适用范围。功能回归不等于实验验证。

原创源码、图文和数据采用 [MIT](LICENSE)，允许修改与商业复用；第三方组件保留各自授权，详见 [许可声明](THIRD_PARTY_NOTICES.md)。历史上传基线与既有科学证据保留在各项目 `reference/`、`archive/`。当前修复和验证见 [CHANGELOG.md](CHANGELOG.md) 与 [QA_REPORT.md](QA_REPORT.md)。
