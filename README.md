# AI Coding Learn

AIコーディングの基礎概念をスマホで手軽に学べるPWAです。

Model、Context、Harness、Agent、Tool、MCP、Skillなどの概念を、短い解説・図・1問クイズで学習できます。

## Features

- スマホ向けの短時間レッスン
- 1レッスンにつき1問の確認クイズ
- 学習進捗をブラウザの `localStorage` に保存
- PWA対応
- Service Workerによるオフラインキャッシュ
- iPhoneの「ホーム画面に追加」で利用可能

## Current lessons

- Model
- Token
- Context
- Harness
- Agent
- Tool
- MCP
- Skill

## Run locally

Service Workerを利用するため、`index.html` を直接開くのではなくHTTP/HTTPS経由で開いてください。

```bash
python -m http.server 8080
```

その後 `http://localhost:8080` を開きます。

## References and attribution

This is an independent educational project for learning AI coding concepts.

It is inspired in part by Matt Pocock's [Dictionary of AI Coding](https://github.com/mattpocock/dictionary-of-ai-coding), but it is **not an official translation or reproduction** of that project. Lesson text and quizzes in this repository are independently written for this application.

元リポジトリの文章を逐語翻訳・転載するのではなく、AIコーディングに関する一般概念を独自教材として整理する方針です。
