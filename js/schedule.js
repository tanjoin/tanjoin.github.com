$(document).ready(function(){
  $('h2').each(function() {
    if (new Date() < new Date($(this).text())) {
      $(this).css("color", "#DDDDDD")
      var tag = $(this).next();
      while(!tag.is('h2') && tag !== undefined) {
        tag.css("color", "#DDDDDD");
        tag = tag.next();
      }
    } else {
      return;
    }
  })
});
