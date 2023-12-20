//#####################################################
//# ::Project  : Galaxy Fleet
//# ::Admin    : Korei (@korei-xlix)
//# ::github   : https://github.com/korei-xlix/galaxyfleet/
//# ::Class    : ハンドラ - メインメニュー
//#####################################################

//#####################################################
//# [MISSION]ボタン
//#####################################################
function __handle_Mission()
{
	///////////////////////////////
	// 応答形式の取得 (LogView)
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_MenuHome", inFuncName : "__handle_Mission", inMark : true }) ;
	
	top.ARR_WindowCtrl_Frame[top.DEF_GF_FRAMEID['MAIN']].FrameObj.contentWindow.__handle_openMessageBox({inOpen:true}) ;
	
	///////////////////////////////
	//# 正常
	wRes['Result'] = true ;
	return ;
}



//#####################################################
//# [ACCOUNT]ボタン
//#####################################################
function __handle_Account()
{
	///////////////////////////////
	// 応答形式の取得 (LogView)
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_MenuHome", inFuncName : "__handle_Account", inMark : true }) ;
	
	///////////////////////////////
	// アカウント（画面）
	top.CLS_WindowCtrl_FrameLocation({
		inID		: top.DEF_GF_FRAMEID['COMM'],
///		inFileID	: top.DEF_GF_FMFILE['ACCOUNT']
		inInfo		: top.DEF_GF_FMFILE['ACCOUNT']
	}) ;
	
	///////////////////////////////
	// アカウント（メニュー）
	top.CLS_WindowCtrl_FrameLocation({
		inID		: top.DEF_GF_FRAMEID['MENU'],
///		inFileID	: top.DEF_GF_FMFILE['MENU_ACCOUNT']
		inInfo		: top.DEF_GF_FMFILE['MENU_ACCOUNT']
	}) ;
	
	///////////////////////////////
	// グローバルマップ（マップ）【クローズ】
	top.CLS_WindowCtrl_FrameLocation({
		inID		: top.DEF_GF_FRAMEID['MAP'],
///		inFileID	: top.DEF_GF_FMFILE['BLANK'],
		inInfo		: top.DEF_GF_FMFILE['BLANK'],
		inTimerStart : false
	}) ;
	
	///////////////////////////////
	//# 正常
	wRes['Result'] = true ;
	return ;
}



//#####################################################
//# [LOGOUT]ボタン
//#####################################################
function __handle_Logout()
{
	///////////////////////////////
	// 応答形式の取得 (LogView)
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_MenuHome", inFuncName : "__handle_Logout", inMark : true }) ;
	
	///////////////////////////////
	// ログイン画面に戻る
	top.CLS_WindowCtrl_FrameLocation({
		inID		: top.DEF_GF_FRAMEID['MAIN'],
///		inFileID	: top.DEF_GF_FMFILE['LOGIN']
		inInfo		: top.DEF_GF_FMFILE['LOGIN']
	}) ;
	
	///////////////////////////////
	//# 正常
	wRes['Result'] = true ;
	return ;
}



//#####################################################
//# [PLAY LOG]ボタン
//#####################################################
function __handle_LogView()
{
	///////////////////////////////
	// 応答形式の取得 (LogView)
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_MenuHome", inFuncName : "__handle_LogView", inMark : true }) ;
	
	top.ARR_WindowCtrl_Frame[top.DEF_GF_FRAMEID['MAIN']].FrameObj.contentWindow.__handle_openLogWindow({inOpen:true}) ;
	
	///////////////////////////////
	//# 正常
	wRes['Result'] = true ;
	return ;
}



