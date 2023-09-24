# Mockup Photo
-  [unsplash](https://source.unsplash.com/random)

# Add shadcn components
- [shadcn - components](https://ui.shadcn.com/docs/components)
```shell
pnpm dlx shadcn-ui@latest add calendar
```
# Set NEXTAUTH_SECRET
- `.env`
```shell
openssl rand -base64 32
```
# Create Firebase Secret Key
- `console` > `プロジェクトの設定` > `サービスアカウント` > `新しい秘密鍵を生成`
- `gitignore`にファイル名を追加
```
# Firebase
secretKey.json # ←ダウンロードした秘密鍵
```

# error??
- 2023/9/19 firebase auth のログインエラーが`auth/invalid-login-credentials` のみ

# deploy Firebase Admin SDK 
- [How to add Firebase service account json files to Vercel](https://dev.to/vvo/how-to-add-firebase-service-account-json-files-to-vercel-ph5)
- json ファイルは`key`にも引用符が必要
```json
{
  "key":"property"
}
```

# deploy
## `Firebase: Error (auth/unauthorized-domain).`がでた場合
- firebase console Authentication 承認済みドメインに`anonymous-login.vercel.app`を追加
- `NEXTAUTH_URL`は`http://localhost:3000`のままでも正常動作

# anonymousについて
firestore に`read, write if true`（誰でも書き込めるルール）を設定すると警告がでる
しかし、firebase Admin SDK を使うと、管理者からの操作なので、ルールに束縛されない
Server Actions からのデータ操作は firebase Admin SDK を使う
つまり、Server Actions からの操作はルールに束縛されない
anonyomus ログインを使う必要がない

# primary color について
shadcn で primary color が設定されているので、
アプリで使うメインテーマは`tailwind.config.ts`に`main`として登録

# server component での pathname 取得について
middleware で取得できる
https://github.com/vercel/next.js/issues/43704#issuecomment-1411186664
ただし、ページ毎に呼び出す必要がある