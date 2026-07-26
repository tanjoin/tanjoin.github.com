// require:
//  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

class Chart {
  constructor() {
    this.className = "pricechart";

  }

  _draw(e) {
    const raw = e.getAttribute('data-list');
    if (!raw) {
      console.error('chart: missing data-list attribute', e);
      return;
    }

    let json;
    try {
      json = JSON.parse(raw);
    } catch (err) {
      // Try to fix common trailing-comma mistakes in generated HTML attributes
      try {
        const sanitized = raw.replace(/,\s*([\]\}])/g, '$1');
        json = JSON.parse(sanitized);
        console.warn('chart: parsed sanitized JSON for element', e);
      } catch (err2) {
        console.error('chart: failed to parse data-list JSON', err2, raw);
        return;
      }
    }

    let data = new google.visualization.DataTable();
    data.addColumn('string', 'Month');
    data.addColumn('number', 'Price');
    json.forEach((row) => {
      data.addRow([row.year, parseInt(row.price, 10)]);
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
