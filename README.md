# firebase プロジェクトの設定
- Authentication を開始して、 mail と google を有効にする
- Cloud Firestore を開始する


# `.env.local`
- json ファイルを環境変数に設定するときは、key を`""` で囲んで、[改行を削除](https://www.textfixer.com/tools/remove-line-breaks.php)
## `NEXTAUTH_SECRET`
```shell
openssl rand -base64 32
```
## `NEXT_PUBLIC_FIREBASE_CONFIG`
- firebase SDK で使用
- console から `firebaseConfig`を取得

## `NEXT_FIREBASE_SERVICE_ACCOUNT_KEY`
- firebase Admin SDK　で使用
- サービスアカウント > `新しい秘密鍵を生成`

## `NEXT_PUBLIC_ADMIN_UID`
- admin の uid を設定
- `SetAdminButton`を押して、`NEXT_PUBLIC_ADMIN_UID`の`Custom Claim` に `Admin` を設定する

# error??
- 2023/9/19 firebase auth のログインエラーが`auth/invalid-login-credentials` のみ


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

# Mockup Photo
-  [unsplash](https://source.unsplash.com/random)

# TODO firestore のエミュレータ
# TODO mongodb から hanzi のインポート