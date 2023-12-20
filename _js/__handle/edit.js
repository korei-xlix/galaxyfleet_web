/* ********************************************
Project  : Star Region
URL      : https://mynoghra.jp/
Class    : handle

Update   : 2019/6/28
******************************************** */

////////////////////////////////////////
// ページハンドラ
////////////////////////////////////////
function _hdl_PageLoad()
{
	////////////////////////////////////////
	//タイトル挿入
	cWINCTRL_setWindowTtile( top.document, self.document ) ;
	
	return ;
}


function _hdl_STRG_Button_OnOff( in_ID, in_OnOff )
{
	cSTRG_BTN_Button_OnOff( in_ID, in_OnOff, false ) ;
	return ;
}


