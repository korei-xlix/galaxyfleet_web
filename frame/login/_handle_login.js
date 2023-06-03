//#####################################################
//# ::Project  : Galaxy Fleet
//# ::Admin    : Korei (@korei-xlix)
//# ::github   : https://github.com/korei-xlix/galaxyfleet/
//# ::Class    : ハンドラ - ログイン
//#####################################################

//#####################################################
//# クラス定数
//#####################################################

/////////////////////////////
// インデックス
var DEF_LOGIN_IND_USERID    = "iUserID" ;
var DEF_LOGIN_IND_PASSWORD  = "iPassWD" ;
var DEF_LOGIN_IND_PASSCODE  = "iPassCD" ;

var DEF_LOGIN_IND_USERINFO = [
		DEF_LOGIN_IND_USERID,
		DEF_LOGIN_IND_PASSWORD,
		DEF_LOGIN_IND_PASSCODE
	] ;

var DEF_LOGIN_IND_SAVEOUT      = "iSaveData" ;
var DEF_LOGIN_IND_SAVEPASSCODE = "iSavePassCD" ;



//#####################################################
//# 初期ロード
//#####################################################
function __handle_Login_PageLoad()
{
	///////////////////////////////
	// 応答形式の取得 (LogView)
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_Login", inFuncName : "__handle_Login_PageLoad" }) ;
	
	///////////////////////////////
	// フレーム受信処理
	top.CLS_WindowCtrl_FrameReceive({
		inID	: top.DEF_GF_FRAMEID['MAIN'],
		inObj	: self.document
	}) ;
	
	///////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return ;
}



//#####################################################
//# ロード完了後処理
//#####################################################
function __handle_Login_PageLoaded()
{
	///////////////////////////////
	// セーブ出力（ログイン⇒ログオフ時）
	CLS_Save_Out() ;
	
	return ;
}



//#####################################################
//# [NEW]ボタン
//#####################################################
function __handle_Login_New()
{
	///////////////////////////////
	// 応答形式の取得 (LogView)
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_login", inFuncName : "__handle_Login_New", inMark : true }) ;
	
	top.CLS_WindowCtrl_FrameLocation({
		inID		: top.DEF_GF_FRAMEID['MAIN'],
///		inFileID	: top.DEF_GF_FMFILE['NEWGAME'],
		inInfo		: top.DEF_GF_FMFILE['NEWGAME']
	}) ;
	return ;
}



//#####################################################
//# [LOGIN]ボタン
//#####################################################
function __handle_Login_Login()
{
	///////////////////////////////
	// 応答形式の取得 (LogView)
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_login", inFuncName : "__handle_Login_Login", inMark : true }) ;
	
	///////////////////////////////
	// ログイン認証
	wSubRes = CLS_Confirm_Login() ;
	if( wSubRes['Result']!=true )
	{
		return ;
	}
	///////////////////////////////
	// 画面遷移
	top.CLS_WindowCtrl_FrameLocation({
		inID		: top.DEF_GF_FRAMEID['MAIN'],
///		inFileID	: top.DEF_GF_FMFILE['HOME']
		inInfo		: top.DEF_GF_FMFILE['HOME']
	}) ;
	return ;
}



//#####################################################
//# [CLOSE]ボタン
//#####################################################
function __handle_Login_Close()
{
	///////////////////////////////
	// 応答形式の取得 (LogView)
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_login", inFuncName : "__handle_Login_Close", inMark : true }) ;
	
	top.CLS_WindowCtrl_locationURL({
		inPageObj	: top.STR_WindowCtrl_Val.PageObj,
		inURL		: "index.html"
	}) ;
	return ;
}



//#####################################################
//# [SELECT FILE]ボタン
//#####################################################
function __handle_Login_SelectFile( inEvent )
{
	///////////////////////////////
	// 応答形式の取得 (LogView)
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_login", inFuncName : "__handle_Login_SelectFile", inMark : true }) ;
	
	///////////////////////////////
	// ファイルロード
	wSubRes = CLS_Load_Load({
		inEvent : inEvent
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_Load_Load is failed" ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return ;
}



