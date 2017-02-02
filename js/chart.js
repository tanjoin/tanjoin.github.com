$(window).load(function() {

  var drawChart = function() {
    var pricecharts = document.getElementsByClassName('pricechart');

    for (var i = 0; i < pricecharts.length; i++) {
      var pricechart = pricecharts[i];
      var jsonDataList = pricechart.getAttribute('data-list');
      var dataList = JSON.parse(jsonDataList);

      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Month');
      data.addColumn('number', 'Price');

      for (var j = 0; j < dataList.length; j++) {
        var priceData = dataList[j];
        data.addRow([priceData.year, parseInt(priceData.price)]);
      }

      var chart = new google.visualization.ColumnChart(pricechart);
      chart.draw(data);
    }
  };

  var year = $(this).attr("year");

  google.charts.load('current', {'packages':['corechart', 'bar']});
  google.charts.setOnLoadCallback(drawChart);
});
