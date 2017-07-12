# Demo WebTemplate
<br>
<br>

## WebtTemplateについて
HTMLテンプレートエンジン・CSSメタ言語・altJSなどのビルドや各開発環境への書き出し機能を実装している。

<br>

### 構成

HTMLテンプレートには[ejs](http://ejs.co/)、CSSメタ言語には[sass](http://sass-lang.com/)、altJS(ES2015)には[Babel](https://babeljs.io/) + [webpack](#https://webpack.github.io/)を使用している。  

| 種類 | ファイルの拡張子 |
| --- | --- |
| HTMLテンプレート | .ejs |
| CSSメタ言語 | .scss |
| ES2015 | .js |

HTMLテンプレートエンジン・CSSメタ言語のビルドを[Gulp](http://gulpjs.com/)が担当し、

altJS(ES2015)のビルドを[Babel](https://babeljs.io/) + [webpack](#https://webpack.github.io/)が担当するハイブリッドな構成になっている。  

<br>

### WebtTemplateを作成した時の各ソフトのバージョン
※ 必ずこれに揃える必要があるという意味ではない。

* Node.js v6.3.1
* npm v5.0.3
* gulp CLI version 3.9.1
* gulp Local version 3.9.1

<br><br><hr><br><br>

## ディレクトリ・ファイル構成
主に編集するのは`src`以下。  

テンプレートファイルを格納するディレクトリ名は`ejs`、スタイルファイルを格納するディレクトリ名は`sass`、スクリプトファイルを格納するディレクトリ名は`js`、JSONファイルを格納するディレクトリ名は`textdata`とする。

（現状とりあえず）画像データはhtdocsに直接格納する。

<br>

```
src
├── ejs
│   ├── _layout
│   │   ├── footer.ejs
│   │   └── head.ejs
│   └── index.ejs
├── js
│   ├── app.js
│   └── index.js (最初に読まれるjsファイル)
├── sass
│   ├── component
│   │   └── sanitaize.scss (スタイルの標準化)
│   └── main.scss
└── testdata
    └── config.json
```


