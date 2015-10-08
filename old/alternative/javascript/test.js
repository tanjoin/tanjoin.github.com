//ボタンページ移動
function chng(page){
	location.href=page;
}

//確認ダイアログ
function check(){
	if(window.confirm("文字")){location.href="test2.html"}
	else{location.href="test3.html"}
}

//右クリック禁止
function IE(){
	if(document.all){
		alert("無理ぽ");
		return false;
	}
}

function NC(val){
	if(document.layers || (document.getElementByld && !document.all)){
		if(val.which==2 || val.which == 3){
			alert("無理ぽNC");
			return false;
		}
	}
}

if( document.layers) { document.captureEvents(Event.MOUSEDOWN); document.onmousedown =NC;}
else{ document.onmouseup = NC; document.oncontextmenu = IE;}