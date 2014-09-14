$(function() {

  var enlistment_text = $("#enlistment-area").text();

  var zyotaibutton = function() {
    $("#enlistment").removeClass("btn btn-primary");
    $("#enlistment-button-span").removeClass("glyphicon glyphicon-plus");
    $("#enlistment").addClass("btn btn-default");
    $("#enlistment-button-span").addClass("glyphicon glyphicon-star");
    $("#enlistment").text("除隊");
    var d = new Date(localStorage.enlistmentDay);
    var yyyy = d.getFullYear();
    var mm = ("0" + (d.getMonth() + 1)).slice(-2);
    var dd = ("0" + (d.getDate() + 1)).slice(-2);
    $("#enlistment-area").html(yyyy + "/" + mm + "/" + dd + " 入隊<br>" + enlistment_text);
    $("#enlistment-area").show();
  };

  var nyutaibutton = function() {
    $("#enlistment").removeClass("btn btn-default");
    $("#enlistment-button-span").removeClass("glyphicon glyphicon-minus");
    $("#enlistment").addClass("btn btn-primary");
    $("#enlistment-button-span").addClass("glyphicon glyphicon-star");
    $("#enlistment").text("入隊");
    $("#enlistment-area").html(enlistment_text);
    $("#enlistment-area").hide();
  };

  if (localStorage.enlistment == "true") {
    zyotaibutton();
  } else {
    nyutaibutton();
  }

  $("#enlistment").on("click", function(){
    if (localStorage.enlistment == "true") {
      localStorage.enlistment = "fales";
      localStorage.removeItem("enlistmentDay");
      nyutaibutton();
    } else {
      localStorage.enlistment = "true";
      localStorage.enlistmentDay = new Date();
      zyotaibutton();
    }
  });
});
