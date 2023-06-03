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
	//トップのフレームに完了通知する
	try
	{
		top.cSTR_STRG_Admin.FLG_Loaded = true ;
		//+++++++++++++++++++++++++++++++++++++++
		top.cSTRG_LOG_c( in_Class="_hdl_PageLoad", in_Error=false,
			" Loaded=true" +
			"" ) ;
		//+++++++++++++++++++++++++++++++++++++++
	}
	catch(e)
	{
		//+++++++++++++++++++++++++++++++++++++++
		top.cSTRG_LOG_c( in_Class="_hdl_PageLoad", in_Error=true,
			" Exception=" + e +
			"" ) ;
		//+++++++++++++++++++++++++++++++++++++++
	}
	return ;
}
