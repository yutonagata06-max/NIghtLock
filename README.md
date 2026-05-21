# NightLock App (MVP Prototype)

NightLockの思想（Sleep First / Low Dopamine UX / Emotional Safety）に沿った、Expo + React Nativeの最小MVPです。

## 機能
- Nightly Check-In
- Reset After Relapse
- Reflection（任意）
- Quiet Support

## セットアップ
```bash
npm install
npm run start
```

## 方針
- 1〜5分で完了する短時間導線
- 無限スクロール・過剰通知・煽り演出を避ける
- 失敗後の再開を前提にしたメッセージング

## Vercelデプロイ設定
このプロジェクトは **Expo (React Native) + Webエクスポート** 方式でVercelに公開します。

- Framework Preset: **Other**
- Build Command: `npm run build:web`
- Output Directory: `dist`
- Install Command: `npm install`
- Environment Variables: **現時点では必須なし**

### 補足
- `npm run build:web` は `expo export --platform web` を実行し、静的ファイルを `dist/` に出力します。
- 将来Supabaseを導入する場合は、以下の環境変数をVercelに追加してください。
  - `EXPO_PUBLIC_SUPABASE_URL`
  - `EXPO_PUBLIC_SUPABASE_ANON_KEY`
