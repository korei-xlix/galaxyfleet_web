/* ********************************************
Project  : Star Region
URL      : https://mynoghra.jp/
Class    : STRG_CIRCLE

Update   : 2019/6/21
******************************************** */

////////////////////////////////////////
// 周期1秒タイマタイムアウト処理
////////////////////////////////////////
function cSTRG_CIRCLE_Timeout()
{
	////////////////////////////////////////
	// 時間情報更新
	cSTRG_SYSTEM_updateTimedate() ;
	
	////////////////////////////////////////
	// 錬金
	cSTRG_ALCHEMING_Circle() ;






	return ;
}


