var _positions = [];

function syokokin(resource, need, review) {
  return 100 * resource / need;
}

function syokokinritsu(need, torihiki) {
  return 100 * need / torihiki;
}

function 

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
      var v = (parseFloat(kingaku) * 100 - parseFloat(order.money) * 100) * parseFloat(order.maisu) / 100;
      if (v < 0) {
        td3.style.color = "#F00";
      }
      td3.innerHTML += v;
      sum += v;
    }
    td2.innerHTML += sum;
  }

  // ボディ(真ん中)
  var tr = table.insertRow(table.rows.length);
  // 金額
  var kingaku = standard_value;
  var td1 = tr.insertCell();
  td1.innerHTML += kingaku;
  // 証拠金率
  var td2 = tr.insertCell();
  for (j = 0; j < _positions.length; j++) {
    var td3 = tr.insertCell();
    // 損得
    var order = _positions[j];
    var v = (parseFloat(kingaku) * 100 - parseFloat(order.money) * 100) * parseFloat(order.maisu) / 100;
    if (v < 0) {
      td3.style.color = "#F00";
    }
    td3.innerHTML += v;
  }
  td2.innerHTML += 0;

  // ボディ(+)
  for (i = 0; i < half_pips; i++) {
    var tr = table.insertRow(table.rows.length);
    // 金額
    var kingaku = standard_value + pip * (i + 1);
    var td1 = tr.insertCell();
    td1.innerHTML += kingaku;
    // 証拠金率
    var td2 = tr.insertCell();
    for (j = 0; j < _positions.length; j++) {
      var td3 = tr.insertCell();
      // 損得
      var order = _positions[j];
      var v = (parseFloat(kingaku) * 100 - parseFloat(order.money) * 100) * parseFloat(order.maisu) / 100;
      if (v < 0) {
        td3.style.color = "#F00";
      }
      td3.innerHTML += v;
    }
    td2.innerHTML += 0;
  }

  list.appendChild(table);
}
