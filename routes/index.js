// ----- Routerオブジェクトの記述 -----

const express = require('express');
const router = express.Router();

/* GET home page. */
// (GETメソッドで)"/"にアクセスされた時に第二引数のコールバック関数を実行
router.get('/', (req, res, next) => {
  // render関数で、テンプレートviews/index.pugからHTML形式の文字列を作り(=レンダリング)、レスポンスに返す
  res.render('index', { title: 'Express' });
});

// Routerオブジェクト自身のモジュール化
module.exports = router;
