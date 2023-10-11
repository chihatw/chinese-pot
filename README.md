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

# firebase エミュレータ
```zsh
# fish ではエラーになるので、 zsh を選ぶ
zsh

# 設定で Emulator を選ぶ
firebase init

# エミュレータの立ち上げ
firebase emulators:start
```

## エミュレータへの接続
### Admin SDK firestore
環境変数に`FIRESTORE_EMULATOR_HOST`を設定
### Admin SDK auth
環境変数に`FIREBASE_AUTH_EMULATOR_HOST`を設定
### Web SDK auth
```js
import { getAuth, connectAuthEmulator } from "firebase/auth";
const auth = getAuth();
connectAuthEmulator(auth, "http://127.0.0.1:9099");
```
# 重複の削除
[Remove Duplicates From an Array in JavaScript](https://code.tutsplus.com/remove-duplicates-in-javascript--cms-106696a#toc-6ghz-remove-duplicates-from-an-array-of-objects)

```js
const uniq_array = Array.from(new Set(original_array));
```

# 重複の抽出
- [Simplest code for array intersection in javascript](https://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript)
- [es6](https://caniuse.com/es6)
```js
function intersect(a, b) {
  var setB = new Set(b);
  return [...new Set(a)].filter(x => setB.has(x));
}
```

# エラー回避にしたこと
- constants は index を通さない
- '..' からの import は避ける

# Vercel の deploy が失敗した時
[How to fix Next.js Vercel deployment module not found error](https://stackoverflow.com/questions/62378045/how-to-fix-next-js-vercel-deployment-module-not-found-error)
```shell
git rm -r --cached .
git add --all .
git commit -a -m "Versioning untracked files"
git push origin master
```
## middleware が思うように動かない時
[NextAuth.js Deployment Vercel](https://next-auth.js.org/deployment#vercel)
- 環境変数 `NEXTAUTH_URL` を設定しない

# 問題
突然、invertedIndexes の全レコード抽出ができなくなった

# google プロバイダーの使用のために
console の Authentication の Setting の「承認済みドメイン」にデプロイ先を登録する

# firebase へのデプロイ
[Integrate Next.js](https://firebase.google.com/docs/hosting/frameworks/nextjs)
従量制へのアップグレードが必要
環境変数が使えない！！

## initialize
```sh
firebase experiments:enable webframeworks
firebase init hosting
```

## deploy
```sh
firebase deploy
```

# local で　本番環境を使う
- `.env.local` の　`FIRESTORE_EMULATOR_HOST`, `FIREBASE_AUTH_EMULATOR_HOST` をコメントアウト
- `fireabase/client.ts` の `isDev` をコメントアウト
- `firebase/restapi.ts` `getBaseUrl` の `isDev` を `false` に

# revalidate について
restructuredQuery を使わずに、直接 url を叩くと、revalidate が反映されない気がする
where in __name__ を使って取得する

restrucredQuery を使う場合は、必ず tags を設定する
revalidate が必要な時は revalidateTag を使用

# Article List に最新の article が反映されない
.next を削除すればOK？