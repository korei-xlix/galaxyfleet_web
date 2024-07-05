/* ********************************************
Project  : Star Region
URL      : https://mynoghra.jp/
Class    : STRG_ADMIN

Update   : 2019/6/28
******************************************** */

////////////////////////////////////////
function _hdl_STRG_ADMIN_RequestAck()
{
	let wObj ;
	
	wObj = top.document.getElementById( "iRunPython" ) ;
	if( cSTR_STRG_Admin.ReqKind==DEF_STRG_ADMINREQ_JSSENARIO )
	{
		wObj.contentWindow.cSTRG_IVENTDATA_1() ;
	}
	else if( cSTR_STRG_Admin.ReqKind==DEF_STRG_ADMINREQ_LOGIN )
	{
		wObj.contentWindow.cSTRG_LOGIN() ;
	}
	else if( cSTR_STRG_Admin.ReqKind==DEF_STRG_ADMINREQ_BASEDATA_DL )
	{
		top.cSTRG_INIT_setBaseData();
	}
	cSTR_STRG_Admin.ReqKind = "" ;
	_STRG_ADMIN_Valid( false ) ;
	return ;
}



////////////////////////////////////////
var DEF_STRG_ADMIN_BASEURL = "https://strg.mynoghra.jp/wsgi/strg_run?88c022d81b7c91ad404db990a4385b39&req=" ;
///var DEF_STRG_ADMIN_PG      = "game/edit.htm" ;
var DEF_STRG_ADMINREQ_JSSENARIO = "114514" ;
var DEF_STRG_ADMINREQ_LOGIN     = "11729894" ;
var DEF_STRG_ADMINREQ_BASEDATA_DL = "8129117"

////////////////////////////////////////
function _STRG_ADMIN_Str()
{
	this.FLG_Invalid = false ;		//操作排他
		// true =排他中
	this.FLG_LoadLab = false ;
	
	this.ReqKind = "" ;
	this.ReqData = new Array() ;
	
	this.FLG_Load   = true ;
		// false =ロード中
		// true  =ロード完了
	this.FLG_Loaded = false ;
		// true  =ローダonload
	
	this.UserID = "" ;
	this.PassWD = "" ;
	
}
var cSTR_STRG_Admin = new _STRG_ADMIN_Str() ;


////////////////////////////////////////
function cSTRG_ADMIN_Login( in_UserInfo )
{
	let wARR_Req ;
	
	wARR_Req = new Array() ;
	wARR_Req.push( in_UserInfo.UserID ) ;
	wARR_Req.push( in_UserInfo.PassWD ) ;
	
	cSTR_STRG_Admin.UserID = in_UserInfo.UserID ;
	cSTR_STRG_Admin.PassWD = in_UserInfo.PassWD ;
	cSTRG_ADMIN_Request( DEF_STRG_ADMINREQ_LOGIN, wARR_Req ) ;
	return ;
}


////////////////////////////////////////
function cSTRG_ADMIN_Rejected()
{
	cSTR_STRG_UserInfo.Edit = false ;
	
	top.cSTRG_TRANS_Msg(
		"認証に失敗しました",
		"Certification failed"
			) ;
	return ;
}


////////////////////////////////////////
function gSTRG_ADMIN_getValidStatus()
{
	return cSTR_STRG_Admin.FLG_Invalid ;
}
function _STRG_ADMIN_Valid( in_Flg=false )
{
	let wObj ;
	
	wObj = top.document.getElementById( "iLoadLab" ) ;
	if( in_Flg==true )
	{
		_STRG_ADMIN_Lab() ;
		wObj.innerHTML = "NOW LOADING..." ;
		cSTR_STRG_Admin.FLG_Invalid = true ;
	}
	else
	{
		wObj.className = "LOADLAB" ;
		wObj.innerHTML = "　" ;
		cSTR_STRG_Admin.FLG_Invalid = false ;
	}
	return ;
}


function _STRG_ADMIN_Lab()
{
	let wObj ;
	
	wObj = top.document.getElementById( "iLoadLab" ) ;
	if( cSTR_STRG_Admin.FLG_LoadLab==true )
	{
		wObj.className = "LOADLAB_ON" ;
		cSTR_STRG_Admin.FLG_LoadLab = false ;
	}
	else
	{
		wObj.className = "LOADLAB_OFF" ;
		cSTR_STRG_Admin.FLG_LoadLab = true ;
	}
	return ;
}


////////////////////////////////////////
function cSTRG_ADMIN_Request( in_Req, in_ReqData )
{
	let wObj, wReq, wIndex ;
	
	////////////////////////////////////////
	if( cSTR_STRG_Admin.ReqKind!="" )
	{
		//+++++++++++++++++++++++++++++++++++++++
		top.cSTRG_LOG_c( in_Class="cSTRG_ADMIN_Request", in_Error=true,
			" Processing request" +
			"" ) ;
		//+++++++++++++++++++++++++++++++++++++++
		return ;
	}
	if( in_Req=="" )
	{
		//+++++++++++++++++++++++++++++++++++++++
		top.cSTRG_LOG_c( in_Class="cSTRG_ADMIN_Request", in_Error=true,
			" Request kind is null" +
			"" ) ;
		//+++++++++++++++++++++++++++++++++++++++
		return ;
	}
	if( Array.isArray( in_ReqData )!=true )
	{
		//+++++++++++++++++++++++++++++++++++++++
		top.cSTRG_LOG_c( in_Class="cSTRG_ADMIN_Request", in_Error=true,
			" Request data is invalid (not array)" +
			"" ) ;
		//+++++++++++++++++++++++++++++++++++++++
		return ;
	}
	if( in_ReqData.length==0 )
	{
		//+++++++++++++++++++++++++++++++++++++++
		top.cSTRG_LOG_c( in_Class="cSTRG_ADMIN_Request", in_Error=true,
			" Request data is invalid (void array)" +
			"" ) ;
		//+++++++++++++++++++++++++++++++++++++++
		return ;
	}
	
	////////////////////////////////////////
	cSTR_STRG_Admin.ReqData = new Array() ;
	wReq   = "" ;
	wIndex = 0 ;
	for( let wLine in in_ReqData )
	{
		wReq = wReq + in_ReqData[wLine] ;
		cSTR_STRG_Admin.ReqData.push( in_ReqData[wLine] ) ;
		wIndex++ ;
		if( in_ReqData.length>wIndex )
		{
			wReq = wReq + "&" ;
		}
	}
	cSTR_STRG_Admin.ReqKind = in_Req ;
	
	////////////////////////////////////////
	wURL = DEF_STRG_ADMIN_BASEURL + in_Req + "&" + wReq ;
	
	try
	{
		wObj = top.document.getElementById( "iRunPython" ) ;
		wObj.src = wURL ;
	}
	catch(e)
	{
		//+++++++++++++++++++++++++++++++++++++++
		top.cSTRG_LOG_c( in_Class="cSTRG_ADMIN_Request", in_Error=true,
			" Exception: " + e +
			"" ) ;
		//+++++++++++++++++++++++++++++++++++++++
		return ;
	}
	cSTR_STRG_Admin.FLG_Load = false ;
	cSTR_STRG_Admin.FLG_Loaded = false ;
///	cSTR_STRG_Ivent.FLG_Invalid = true ;//排他
	_STRG_ADMIN_Valid( true ) ;
	
	////////////////////////////////////////
	//イベントロードタイマ スタート
	cSTRG_TIMER_Start( DEF_STRG_TIMERID_REQUESTACKWAIT ) ;
	return ;
}

function cSTRG_ADMIN_Request_Timeout()
{
	let wStatus ;
	
	////////////////////////////////////////
	_STRG_ADMIN_Lab() ;
	
	////////////////////////////////////////
	//イベントロード確認
	if( cSTR_STRG_Admin.FLG_Loaded==false )
	{////ロード未完了
		////////////////////////////////////////
		//イベントロードタイマ停止か(時間切れ)
		if( cSTRG_TIMER_getStatus( DEF_STRG_TIMERID_REQUESTACKWAIT )==false )
		{
			try
			{
///				wObj = top.document.getElementById( "iRunPython" ) ;
				wStatus = "cSTRG_ADMIN_Request_Timeout: Request timeout:"
				wStatus = wStatus + " Result=" + wObj.contentWindow.cSTR_STRG_RUN_Result.Result ;
				wStatus = wStatus + " Reason=" + wObj.contentWindow.cSTR_STRG_RUN_Result.Reason ;
				//+++++++++++++++++++++++++++++++++++++++
				top.cSTRG_LOG_c( in_Class="cSTRG_ADMIN_Request_Timeout", in_Error=false,
					wStatus +
					"" ) ;
				//+++++++++++++++++++++++++++++++++++++++
			}
			catch(e)
			{
				//+++++++++++++++++++++++++++++++++++++++
				top.cSTRG_LOG_c( in_Class="cSTRG_ADMIN_Request_Timeout", in_Error=false,
					" Request is failed, and Exception: " + e +
					"" ) ;
				//+++++++++++++++++++++++++++++++++++++++
			}
			cSTR_STRG_Admin.FLG_Load   = true ;
			_STRG_ADMIN_Valid( false ) ;
		}
		return ;
	}
	
	////////////////////////////////////////
	//イベントロード完了処理
	
	////////////////////////////////////////
	//タイマ停止
	cSTRG_TIMER_Stop( DEF_STRG_TIMERID_REQUESTACKWAIT ) ;
	
	////////////////////////////////////////
	//完了
	cSTR_STRG_Admin.FLG_Load = true ;
	
	////////////////////////////////////////
	//ハンドル
	_hdl_STRG_ADMIN_RequestAck() ;
	return ;
}


