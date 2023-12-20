/* ********************************************
Project  : Star Region
URL      : https://mynoghra.jp/
Class    : handle

Update   : 2019/6/21
******************************************** */

////////////////////////////////////////
// ページハンドラ
////////////////////////////////////////
function _hdl_PageLoad()
{
	////////////////////////////////////////
	//タイトル挿入
	cWINCTRL_setWindowTtile( top.document, self.document ) ;
	
	////////////////////////////////////////
	//錬金ページ初期化
	top.cSTRG_ALCHEMING_Init() ;
	return ;
}


////////////////////////////////////////
// ボタン色変更
////////////////////////////////////////
function _hdl_STRG_Button_OnOff( in_ID, in_OnOff )
{
	cSTRG_BTN_Button_OnOff( in_ID, in_OnOff ) ;
	return ;
}


////////////////////////////////////////
// 錬金変換元資源 選択
////////////////////////////////////////
function _hdl_AlchemySrcCombo_Change( in_No )
{
	top.cSTRG_ALCHEMING_changeAlchemySrc_ComboBox( in_No ) ;
	return ;
}


////////////////////////////////////////
// 錬金変換先資源 選択
////////////////////////////////////////
function _hdl_AlchemyDstCombo_Change( in_No )
{
	top.cSTRG_ALCHEMING_changeAlchemyDst_ComboBox( in_No ) ;
	return ;
}


////////////////////////////////////////
// 錬金資源 数量
////////////////////////////////////////
function _hdl_AlchemyUpDownButton_Click( in_No, in_UpDw )
{
	top.cSTRG_ALCHEMING_UpDownButton_Click( in_No, in_UpDw ) ;
	return ;
}


////////////////////////////////////////
// 錬金変換開始
////////////////////////////////////////
function _hdl_AlchemyStartButton_Click( in_No )
{
	top.cSTRG_ALCHEMING_StartButton_Click( in_No ) ;
	return ;
}


////////////////////////////////////////
// 錬金受け取り
////////////////////////////////////////
///function _hdl_AlchemyGetButton_Click( in_No )
///{
///	return ;
///}


