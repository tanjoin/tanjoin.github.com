var Progress = {};
Progress.run = function() {
  $(".mnpday").each(function() {
    var year = $(this).attr("year");
    var month = $(this).attr("month");
    var day = $(this).attr("day");

    var buyDate = new Date(year, (month - 1) % 13, day);
    var mnpDate = new Date(year - 0 + 2, month % 13, 1);
    var now = new Date();

    var since = now - buyDate;
    var sinceDay = Math.floor(since / (1000 * 60 * 60 * 24));

    var deadline = mnpDate - buyDate;
    var deadlineDay = Math.floor(deadline / (1000 * 60 * 60 * 24));

    $(this).html('<div>あと ' + (deadlineDay - sinceDay) + '日</div> <div class="progress"><div class="determinate" style="width: ' + (since / deadline * 100) + '%"></div></div>');
  });

  $(".kaiyakuday").each(function() {
    var year = $(this).attr("year");
    var month = $(this).attr("month");
    var day = $(this).attr("day");
    var endYear = $(this).attr("endYear");
    var endMonth = $(this).attr("endMonth");
    var endDay = $(this).attr("endDay");

    var buyDate = new Date(year, (month - 1) % 13, day);
    var kaiyakuDate = new Date(endYear, (endMonth - 1 % 13), endDay);
    var now = new Date();

    var since = now - buyDate;
    var sinceDay = Math.floor(since / (1000 * 60 * 60 * 24));

    var deadline = kaiyakuDate - buyDate;
    var deadlineDay = Math.floor(deadline / (1000 * 60 * 60 * 24));

    $(this).html('<div>あと ' + (deadlineDay - sinceDay) + '日</div> <div class="progress"><div class="determinate" style="width: ' + (since / deadline * 100) + '%"></div></div>');
  });
};

$(window).load(function() {
  Progress.run();
});
