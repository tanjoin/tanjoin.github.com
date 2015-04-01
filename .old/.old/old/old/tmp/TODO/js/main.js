$(function() {
  var $list = $('.todolist');
  var $input = $('.todoinput');
  var $archivelist = $('.archivelist');

  // TODOを追加する関数
  function addTodo(text, isComplete, isArchive) {
    var $now = new Date();
    var $li = $('<li>');
    var $text = $('<span class="text">').text(text);
    var $archive = $('<span class="archive">').text('∨');
    var $checkbox = $('<input type="checkbox">');
    var $update = $('<span class="update">').text(
      $now.getFullYear() + '/' +
      $now.getMonth() + 1 + '/' +
      $now.getDate() + ' ' +
      $now.getHours() + ':' +
      $now.getMinutes() + ':' +
      $now.getSeconds());
    $li.append($checkbox).append($text).append($archive).append($update);

    if (isComplete) {
      $li.addClass('complete');
      $checkbox.attr('checked', true);
    }

    $checkbox.click(function() {
      if ($(this).is(':checked')) {
        $li.addClass('complete');
      } else {
        $li.removeClass('complete');
      }
      updateStorage();
    });

    $archive.click(function() {
      if (window.confirm('アーカイブしますか？')) {
        $li.appendTo('.archivelist');
      }
      updateStorage();
    });

    if (isArchive) {
      $archivelist.append($li);
    } else {
      $list.append($li);
    }
  }

  $('.todoform').bind('submit', function(event) {
    event.preventDefault();
    var text = $input.val();
    addTodo(text, false, false);
    $input.val('');

    updateStorage();
  });

  function updateStorage() {
    var list = [];
    $list.find('li').each(function() {
      var $item = $(this);
      list.push({
        text: $item.find('.text').text(),
        complete: $item.hasClass('complete'),
        archive: false
      });
    });
    localStorage['todolist'] = JSON.stringify(list);

    var archivelist = [];
    $archivelist.find('li').each(function() {
      var $item = $(this);
      archivelist.push({
        text: $item.find('.text').text(),
        complete: $item.hasClass('complete'),
        archive: true
      });
    });
    localStorage['todoarchivelist'] = JSON.stringify(archivelist);
  }

  var storagetodolist = localStorage['todolist'];
  if(storagetodolist) {
    JSON.parse(storagetodolist).forEach(function(item) {
      addTodo(item.text, item.complete, item.archive);
    });
  }
  var storagetodoarchivelist = localStorage['todoarchivelist'];
  if(storagetodoarchivelist) {
    JSON.parse(storagetodoarchivelist).forEach(function(item) {
      addTodo(item.text, item.complete, item.archive);
    });
  }
});
