# commit-surgeon

[![CI](https://github.com/niuxinhuai/commit-surgeon/actions/workflows/ci.yml/badge.svg)](https://github.com/niuxinhuai/commit-surgeon/actions/workflows/ci.yml)

Inspect a dirty git worktree and suggest semantic commit groups with starter commit messages.

检查脏工作区，把文件按语义建议拆成多个 commit，并生成初始 commit message。

## English

### Install

```bash
npm install -g commit-surgeon
```

For local development:

```bash
npm install
npm link
commit-surgeon --help
```

### Usage

Run it before committing when your worktree has become too mixed.

```bash
commit-surgeon
commit-surgeon --staged
commit-surgeon --json
```

### Status

This is an MVP designed to be useful immediately and easy to extend. It has no runtime dependencies and targets Node.js 18+.

### Test

```bash
npm test
```

## 中文

### 安装

```bash
npm install -g commit-surgeon
```

本地开发：

```bash
npm install
npm link
commit-surgeon --help
```

### 用法

当工作区改动混在一起时，提交前运行它来获得拆分建议。

```bash
commit-surgeon
commit-surgeon --staged
commit-surgeon --json
```

### 当前状态

这是一个可以直接使用的 MVP，重点是小、清晰、容易二次开发。运行时无第三方依赖，要求 Node.js 18+。

### 测试

```bash
npm test
```

## License

MIT
