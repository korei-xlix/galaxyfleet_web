/* ********************************************
Project  : Star Region
URL      : https://mynoghra.jp/
Class    : STRG_SYSTEM

Update   : 2019/6/20
******************************************** */

////////////////////////////////////////
// 時間情報更新
////////////////////////////////////////
function cSTRG_SYSTEM_updateTimedate()
{
	let wTimeDate ;
	
	////////////////////////////////////////
	// 時間情報更新
	wTimeDate = TIMEDATE_get() ;
	cSTR_STRG_SystemInfo.TimeDate = wTimeDate ;
	wTimeDate = wTimeDate.split(" ") ;
	cSTR_STRG_SystemInfo.Time     = wTimeDate[1] ;


	return ;
}


