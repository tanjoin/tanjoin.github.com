$(window).load(function(){
  $('a').each(function() {
    var a_tag = $(this);
    var href = $(this).attr('href').substr(1);
    $('.modal').each(function() {
      if ($(this).attr('id') == href) {
        a_tag.bind('click', function() {
          if ($($(this).attr('href')).css('display') == 'none') {
            $($(this).attr('href')).css('display', 'block');
          } else {
            $($(this).attr('href')).css('display', 'none');
          }
        });
      }
    });
  })

});
