/* ********************************************
Project  : Star Region
URL      : https://mynoghra.jp/
Class    : handle

Update   : 2019/6/8
******************************************** */

////////////////////////////////////////
// ページハンドラ
////////////////////////////////////////
function _hdl_PageLoad()
{
	////////////////////////////////////////
	//タイトル挿入
	cWINCTRL_setWindowTtile( parent.document, self.document ) ;
	return ;
}


////////////////////////////////////////
// ボタン
////////////////////////////////////////
function _hdl_STRG_Button_Click( in_ID )
{
	////////////////////////////////////////
	// [Logoff]
	if( in_ID==1 )
	{
		////////////////////////////////////////
		//ログオフ処理実行
		top.cSTRG_INIT_Logoff() ;
	}
	////////////////////////////////////////
	// [Cancel] その他
	else
	{
		top.cSTRG_MENU_MainCommand_Open( 9001 ) ;
	}
	return ;
}

function _hdl_STRG_Button_OnOff( in_ID, in_OnOff )
{
	cSTRG_BTN_Button_OnOff( in_ID, in_OnOff ) ;
	return ;
}


