$(document).ready(function() {
  $('table').each(function () {
    $(this).tablesorter({
      sortList: [
        [0, 0],
        [1, 0]
      ]
    });
  });
});
