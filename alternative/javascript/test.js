//�{�^���y�[�W�ړ�
function chng(page){
	location.href=page;
}

//�m�F�_�C�A���O
function check(){
	if(window.confirm("����")){location.href="test2.html"}
	else{location.href="test3.html"}
}

//�E�N���b�N�֎~
function IE(){
	if(document.all){
		alert("������");
		return false;
	}
}

function NC(val){
	if(document.layers || (document.getElementByld && !document.all)){
		if(val.which==2 || val.which == 3){
			alert("������NC");
			return false;
		}
	}
}

if( document.layers) { document.captureEvents(Event.MOUSEDOWN); document.onmousedown =NC;}
else{ document.onmouseup = NC; document.oncontextmenu = IE;}