prac_express_app_use
---
# 概要
expressにおけるapp.use(express.static('dirname'))に関する勉強用リポジトリ
他者が作成したexpressを用いたアプリで下記一文があり、よくわからなかったので調べてみた。<br>
```
app.use(express.static(__dirname + '/public'))
```
上記一文に関する説明は[Express での静的ファイルの提供](https://expressjs.com/ja/starter/static-files.html)に記載されている。<br>
上記リンク先を読んで大体は理解したが、最後の一文が気になったのでこのリポジトリで試してみる。<br>
> ただし、express.static 関数に指定するパスは、node プロセスを起動するディレクトリーに対して相対的です。別のディレクトリーから Express アプリケーションを実行する場合は、提供するディレクトリーの絶対パスを使用する方が安全です。

# 手順
## インストール
```bash
git clone https://github.com/n-hachi/prac_express_app_use
cd prac_express_app_use
npm install
```

## case1
```bash
node index.js
```
nodeプロセスが動作する状態で http://localhost:8000/path1/ と http://localhost:8000/path2/ にブラウザからアクセスする。<br>
http://localhost:8000/path1 と http://localhost:8000/path2 ともに意図したページが表示される。

## case2
もしcase1のnodeプロセスが残っているならプロセスを止めてから下記を実行する。
```bash
mkdir tmp
cd tmp
node ../index.js
```
case1と同様にnodeプロセスが動作する状態で http://localhost:8000/path1/ と http://localhost:8000/path2/ にブラウザからアクセスする。<br>
case1に対してcase2では http://localhost:8000/path1 にはアクセスできるが http://localhost:8000/path2 の方は`Cannot GET /path2/`と出力される。

# 説明
違いはindex.jsの下記の書き方の違いが要因である。
```javascript
app.use('/path1', express.static(__dirname + '/path1'));
app.use('/path2', express.static('path2'));
```
[ここ](https://expressjs.com/ja/starter/static-files.html)でも書かれている通り`express.static 関数に指定するパスは、node プロセスを起動するディレクトリーに対して相対的`である。<br>
もしトップディレクトリ(index.jsが存在するディレクトリ)でnodeを実行した場合、同じディレクトリ以下にpath1、path2共にも存在する。<br>
しかしcase2のようにtmpディレクトリを作成し、そこからnodeを実行した場合、tmp/path2というディレクトリは存在しないためcase2のpath2の書き方ではindex.htmlが見つからない旨のエラーがでる。<br>

対してpath1の書き方では`__dirname`を使っている。[ここ](https://nodejs.org/docs/latest/api/modules.html#modules_dirname)にかかれている通り`__dirname`は"現在のモジュールのパス"を保持するらしく、結果トップディレクトリ、tmpディレクトリどちらで実行しても`__dirname + '/path1'`が同じ場所を指すことになる。
