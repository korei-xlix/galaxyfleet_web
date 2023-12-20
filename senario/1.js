/* ********************************************
Project  : Star Region
URL      : https://mynoghra.jp/
Class    : 

Update   : 2019/6/10
******************************************** */

////////////////////////////////////////
//イベント実処理
function cSTRG_IVENTDATA_1()
{
	let wObj ;
	
	wObj = top.document.getElementById( "iMain" ) ;
//	wObj = wObj.contentWindow.document.getElementById( "iDisp" ) ;
	wObj.contentWindow.cSTRG_MSGBOX_MsgSet(
		in_TextJP="イベントロードが要求されました。",
		in_TextEN="",
		 ) ;
	wObj.contentWindow.cSTRG_MSGBOX_Open(
		in_CBFunc="" ) ;


	return ;
}

