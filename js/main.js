var tanjoin = {};

// 404 Not Found
tanjoin.MARKDOWN_CONTENT_404 = "# 404 Not Found\n\nページが見つかりません.";

// デフォルトページ
tanjoin.DEFAULT_PAGE = "README";

// BASE url
tanjoin.BASE_URL = "https://tanjoin.github.io/";

// Markdown extension
tanjoin.MARKDOWN_FILENAME_EXTENSION = ".md";

// コンテナ
tanjoin.CONTAINER = 'content';

// URL クエリを取得する
tanjoin.getUrlQuery = function() {
  var url, hash, queries, i, data;
  url = window.location.search;
  hash = url.slice(1).split('&');
  queries = [];
  for (i = 0; i < hash.length; i++) {
    data = hash[i].split('=');
    queries.push(data[0]);
    queries[data[0]] = data[1];
  }
  return queries;
};

// MAKRDOWN を取得する.
// @param {string} name - Markdown 名。 .md は取り除くこと。
// @param {Requester~requestCallback} callback - リクエスト結果。
tanjoin.getMarkdown = function(name, callback) {
  tanjoin.requestGet(tanjoin.BASE_URL + name.toUpperCase() + tanjoin.MARKDOWN_FILENAME_EXTENSION, callback);
};

// GET リクエスト
tanjoin.requestGet = function(url, callback) {
  var request;
  request = new XMLHttpRequest();
  request.open('get', url);
  request.onload = callback;
  request.send(null);
};

// window.onload 時の挙動
tanjoin.onload = function(urlQuery) {
  if (!urlQuery.q) {
    urlQuery.q = tanjoin.DEFAULT_PAGE;
  }
  tanjoin.getMarkdown(urlQuery.q, function() {
    var script;
    tanjoin.markdown = this.responseText.replace(/\[(.*)\]\((.*)\.md\)/g, "[$1](?q=$2)");
    if (!tanjoin.markdown || this.status === 404) {
      tanjoin.markdown = tanjoin.MARKDOWN_CONTENT_404;
    }
    document.getElementById(tanjoin.CONTAINER).innerHTML = marked(tanjoin.markdown);
    tanjoin.after();
  });
};

tanjoin.after = function() {
  // mokuji
  var mokuji;
  mokuji = document.getElementById('mokuji');
  if (mokuji) {
    Mokuji.run(parseInt(mokuji.getAttribute('first')), parseInt(mokuji.getAttribute('last')));
  }

  // progress
  Progress.run();

  // chart
  Chart.run();

  $('table').each(function () {
    $(this).tablesorter({
      sortList: [
        [0, 0],
        [1, 0]
      ]
    });
  });

  new ClipboardJS('.clipboard');
};

window.onload = function() {
  tanjoin.onload(tanjoin.getUrlQuery());
};
