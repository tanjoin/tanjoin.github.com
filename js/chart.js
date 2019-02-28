// require:
//  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

class Chart {
  constructor() {
    this.className = "pricechart";

  }

  _draw(e) {
    const json = JSON.parse(e.getAttribute('data-list'));
    let data = new google.visualization.DataTable();
    data.addColumn('string', 'Month');
    data.addColumn('number', 'Price');
    json.forEach((row) => {
      data.addRow([row.year, parseInt(row.price)]);
    });
    let chart = new google.visualization.ColumnChart(e);
    chart.draw(data);
  }

  apply() {
    this._getChartElements().forEach((e) => {
      google.charts.load('current', {'packages':['corechart', 'bar']});
      google.charts.setOnLoadCallback(() => this._draw(e));
    });
  }

  _getChartElements() {
    return [...document.querySelectorAll(`.${this.className}`)];
  }
}

document.addEventListener("DOMContentLoaded", () => new Chart().apply());
