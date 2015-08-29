var SCREEN_SIZE = 500;                    // キャンバスのサイズ
var SIDE_CELLS = 200;                     // 一辺のセルの数
var CELL_SIZE = SCREEN_SIZE / SIDE_CELLS; // １マスの幅
var FPS = 200;                            // フレームレート
var canvas;                               // キャンバス
var context;                              // コンテキスト
var dirs = [                              // アリの方向用配列
  {'row': -1, 'col': 0},
  {'row': 0, 'col': 1},
  {'row': 1, 'col': 0},
  {'row': 0, 'col': -1},
];

function simulate(field, ant) {
  if (field[ant.row][ant.col]) { // アリの現在地が白の場合
    ant.dir --;                // マスが白の時は左へ向き変更
    context.fillStyle = 'rgb(0, 0, 0)'; // 白を反転すると黒
  } else  {                               // アリの現在地が黒の場合
    ant.dir ++;             // マスが白の時は右へ向き変更
    context.fillStyle = 'rgb(0, 255, 255)'; // 黒を反転すると白
  }
  field[ant.row][ant.col] = 1 - field[ant.row][ant.col]; // アリのいるマスを反転
  context.fillRect(ant.col*CELL_SIZE, ant.row*CELL_SIZE, CELL_SIZE, CELL_SIZE); // アリの居るマスの色を描画
  ant.dir = (ant.dir+4) % 4;    // アリの向きを修正(5=>1, -1=> 3)
  ant.row += dirs[ant.dir].row; // アリを移動
  ant.col += dirs[ant.dir].col; // アリを移動
  context.fillStyle = 'rgb(0, 0, 255)'; // アリの色
  context.fillRect(ant.col*CELL_SIZE, ant.row*CELL_SIZE, CELL_SIZE, CELL_SIZE); // アリを描画
  if (ant.row<0 || ant.row>=SIDE_CELLS || ant.col<0 || ant.col>=SIDE_CELLS) { // 壁判定
    alert("アリはそそくさと逃げていきました。"); // ゲームオーバ処理
  } else {
    setTimeout(simulate, 1000/FPS, field, ant); // 帰納処理でループ
  }
}

window.onload = function() {
  canvas = document.getElementById('world'); // キャンバスの取得
  context = canvas.getContext('2d');         // コンテキストの取得
  canvas.width = canvas.height = SCREEN_SIZE; // キャンバスの画面サイズ設定
  var scaleRate = Math.min(window.innerHeight/SCREEN_SIZE, window.innerHeight/SCREEN_SIZE); // 画面引き伸ばし率
  canvas.style.height = canvas.style.width = SCREEN_SIZE*scaleRate + 'px'; // 画面引き伸ばし
  var field = new Array(SIDE_CELLS); // フィールド情報
  for (var i=0; i<SIDE_CELLS; i++) { // マス全てに0を格納して初期化
    field[i] = new Array(SIDE_CELLS);
    for (var j=0; j<SIDE_CELLS; j++) {
      field[i][j] = 0;
    }
  }
  var ant = {'dir': 0, 'row': SIDE_CELLS/2-1, 'col': SIDE_CELLS/2-1}; // アリ
  simulate(field, ant);       // シミュレート開始
};
