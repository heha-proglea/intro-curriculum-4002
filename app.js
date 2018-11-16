// --- app.js => Webアプリケーション自体を表すモジュール ---

// 使用するnpmモジュールの読み込み
var createError = require('http-errors'); // HTTPのエラーを作成するモジュール
var express = require('express'); // Expressの本体
var path = require('path'); // ファイルパスを扱う、Node.js標準モジュール
var cookieParser = require('cookie-parser'); // Cookie解析モジュール
var logger = require('morgan'); // コンソールにログを整形して出力するモジュール
var helmet = require('helmet'); // セキュリティ用モジュール(Middleware)

// Routerオブジェクトのモジュールを読み込んで、登録。
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var photosRouter = require('./routes/photos');

// Applicationオブジェクトを作成
var app = express();
// use関数で使用するミドルウェア関数を設定(※ミドルウェア関数の実行は登録順なので、登録する順番に注意)
app.use(helmet());

// view engine setup
// set関数でシステム全体に関わる設定を行う
// テンプレートファイルの場所をディレクトリ'views'に指定
app.set('views', path.join(__dirname, 'views'));
// テンプレートエンジンをPugに設定
app.set('view engine', 'pug');

// use関数で使用するミドルウェア関数を設定(※ミドルウェア関数の実行は登録順なので、登録する順番に注意)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ルーティングオブジェクト(ハンドラ)に対するパスの登録？？
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/photos', photosRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
