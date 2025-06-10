# Banner Gallery Frontend

このリポジトリは、バナー画像の投稿・閲覧・管理ができる Web アプリケーション「Banner Gallery」のフロントエンドです。  
Next.js（React）と TypeScript を用いて開発されています。

---

## 制作意図

先輩社員との会話の中で「過去収集したバナーをカテゴリ別にまとめてほしい」
との依頼を受けたことから着想を得て業務の効率化を目標に開発を行いました。

新規クリエイティブを制作する際
競合バナーや良きデザインのバナーなどを収集しているのですが
パワポ資料にまとめてチーム内に共有しているためカテゴリや企業別にまとめることができないのが現状です。

現在開発を進めているバナーギャラリーサイトが実用化するようになったら
これまで自分が収集したものを投稿し、バナーを一覧表示、タグごとの検索などが可能となり
クリエイティブ制作をより効率的に進められるようになります。

また他ユーザーが投稿したバナーも確認することができバナー収集の効率化にもつながると考えます。

---

## 主な機能

- バナー画像の一覧表示・無限スクロール
- バナー画像の詳細表示
- バナー画像の投稿（画像アップロード・タグ付け）
- バナー画像の編集・削除
- タグ（カテゴリ・テイスト・形・メディア）による絞り込み
- ユーザー認証（サインアップ・ログイン・マイページ）

---

## 技術スタック

- **フレームワーク**: [Next.js](https://nextjs.org/) 15.3.3
- **言語**: TypeScript 5
- **UI**: Tailwind CSS 4
- **状態管理**: React Hooks
- **API 通信**: fetch API
- **画像アップロード**: Cloudinary（バックエンド経由）

---

## セットアップ方法

1. **リポジトリをクローン**

   ```bash
   git clone https://github.com/yanarui/banner-gallery-frontend.git
   cd banner-gallery-frontend
   ```

2. **依存パッケージのインストール**

   ```bash
   npm install
   ```

3. **開発サーバーの起動**
   ```bash
   npm run dev
   ```
   ブラウザで [http://localhost:3000](http://localhost:3000) を開いて動作確認できます。

---

## ディレクトリ構成（抜粋）

```
components/
  base/         ... ヘッダー・フッター等の共通UI
  pages/        ... 各ページ用コンポーネント
  ui/           ... 汎用UIコンポーネント
pages/
  index.tsx            ... トップページ
  post.tsx             ... バナー投稿ページ
  mybanners.tsx        ... マイバナー一覧
  bannerdetailpage.tsx ... バナー詳細画面
  login.tsx            ... ログイン画面
  signup.tsx           ... ユーザー登録画面
  updatebannerpage.tsx ... 画像更新画面
  ...
```

---

## バックエンド

- [banner-gallery-backend](https://github.com/yanarui/banner-gallery-backend)（Ruby on Rails）
- JWT 認証、画像アップロード、タグ管理 API などを提供

---
