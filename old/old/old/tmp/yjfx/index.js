var _positions = [];

// 有効証拠金額 ÷ 必要証拠金 × 100 = 証拠金維持率
function syokokinritsu(resource, need) {
  if (need != 0) {
    return resource / need * 100;
  } else {
    return " - ";
  }
}

// 算出式：（評価レート）× 10,000通貨 × 4% @ 25倍
function need(hyoka_rate, tsuka) {
  return hyoka_rate * tsuka * 4 / 100
}

function add() {
  var money = document.add_position.money.value;
  var position = document.add_position.position.value;
  var maisu = document.add_position.maisu.value;
  if (money > 0) {
    var order = {
      "money" : money,
      "position" : position,
      "maisu" : maisu
    };
    _positions.push(order);
  }
  show_list();
}

function show_list() {
  var hyoka_rate = document.add_position.hyoka_rate.value;
  var resource = document.add_position.resource.value;
  var pip = 0.01;
  var pips = document.add_position.pips.value;
  var standard = document.add_position.standard.value;
  var standard_value = parseFloat(standard);
  var list = document.getElementById('list');
  list.innerHTML = '';

  var table = document.createElement('table');
  table.border = "2";
  table.cellspacing = "0";
  table.cellpadding = "0";

  // ヘッダー
  var tr = table.insertRow(table.rows.length);
  var td1 = tr.insertCell();
  td1.innerHTML = '金額';
  var td2 = tr.insertCell();
  td2.innerHTML = '証拠金率';
  for (i = 0; i < _positions.length; i++) {
    var td = tr.insertCell();
    var order = _positions[i];
    if (order.position == "kai") {
      td.innerHTML += "買";
    } else if (order.position == "uri") {
      td.innerHTML += "売";
    }
    if (order.maisu > 0) {
      td.innerHTML += order.maisu;
    }
    if (order.money > 0) {
      td.innerHTML += "@" + order.money;
    }
  }

  // ボディ(-)
  var half_pips = parseInt(pips) / 2;
  for (i = 0; i <  half_pips; i++) {
    var tr = table.insertRow(table.rows.length);
    // 金額
    var kingaku = standard_value - pip * (half_pips - i);
    var td1 = tr.insertCell();
    td1.innerHTML += kingaku;
    // 証拠金率
    var td2 = tr.insertCell();
    var sum = 0.0;
    for (j = 0; j < _positions.length; j++) {
      var td3 = tr.insertCell();
      // 損得
      var order = _positions[j];
      var default_need = need(hyoka_rate, parseFloat(order.maisu));
      var v = (parseFloat(kingaku) * 100 - parseFloat(order.money) * 100) * parseFloat(order.maisu) / 100;
      if (v < 0) {
        td3.style.color = "#F00";
      }
      td3.innerHTML += v;
      sum += default_need + v;
    }
    td2.innerHTML += syokokinritsu(resource, sum) + "%";
  }

  // ボディ(真ん中)
  var tr = table.insertRow(table.rows.length);
  // 金額
  var kingaku = standard_value;
  var td1 = tr.insertCell();
  td1.innerHTML += kingaku;
  // 証拠金率
  var td2 = tr.insertCell();
  var sum = 0.0;
  for (j = 0; j < _positions.length; j++) {
    var td3 = tr.insertCell();
    // 損得
    var order = _positions[j];
    var default_need = need(hyoka_rate, parseFloat(order.maisu));
    var v = (parseFloat(kingaku) * 100 - parseFloat(order.money) * 100) * parseFloat(order.maisu) / 100;
    if (v < 0) {
      td3.style.color = "#F00";
    }
    td3.innerHTML += v;
    sum += default_need + v;
  }
  td2.innerHTML += syokokinritsu(resource, sum) + "%";

  // ボディ(+)
  for (i = 0; i < half_pips; i++) {
    var tr = table.insertRow(table.rows.length);
    // 金額
    var kingaku = standard_value + pip * (i + 1);
    var td1 = tr.insertCell();
    td1.innerHTML += kingaku;
    // 証拠金率
    var td2 = tr.insertCell();
    var sum = 0.0;
    for (j = 0; j < _positions.length; j++) {
      var td3 = tr.insertCell();
      // 損得
      var order = _positions[j];
      var default_need = need(hyoka_rate, parseFloat(order.maisu));
      var v = (parseFloat(kingaku) * 100 - parseFloat(order.money) * 100) * parseFloat(order.maisu) / 100;
      if (v < 0) {
        td3.style.color = "#F00";
      }
      td3.innerHTML += v;
      sum += default_need + v;
    }
    td2.innerHTML += syokokinritsu(resource, sum) + "%";
  }

  list.appendChild(table);
}
