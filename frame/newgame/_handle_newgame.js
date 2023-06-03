//#####################################################
//# ::Project  : Galaxy Fleet
//# ::Admin    : Korei (@korei-xlix)
//# ::github   : https://github.com/korei-xlix/galaxyfleet/
//# ::Class    : ハンドラ - ニューゲーム
//#####################################################


//#####################################################
//# クラス定数
//#####################################################

/////////////////////////////
// インデックス
var DEF_NEWGAME_IND_USERID    = "iUserID" ;
var DEF_NEWGAME_IND_USERNAME  = "iUserName" ;
var DEF_NEWGAME_IND_PASSWORD  = "iPassWD" ;
var DEF_NEWGAME_IND_PASSWORD2 = "iPassWD2" ;

var DEF_NEWGAME_IND_USERINFO = [
		DEF_NEWGAME_IND_USERID,
		DEF_NEWGAME_IND_USERNAME,
		DEF_NEWGAME_IND_PASSWORD,
		DEF_NEWGAME_IND_PASSWORD2
	] ;

var DEF_NEWGAME_IND_ARR_AGREE = ['iAgree1', 'iAgree2', 'iAgree3'] ;
var DEF_NEWGAME_IND_START = "iStart" ;



//#####################################################
//# 初期ロード
//#####################################################
function __handle_NewGame_PageLoad()
{
	///////////////////////////////
	// 応答形式の取得 (LogView)
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_NewGame", inFuncName : "__handle_NewGame_PageLoad" }) ;
	
	///////////////////////////////
	// フレーム受信処理
	top.CLS_WindowCtrl_FrameReceive({
		inID	: top.DEF_GF_FRAMEID['MAIN'],
		inObj	: self.document
	}) ;
	
	///////////////////////////////
	//# 正常
	wRes['Result'] = true ;
	return ;
}



//#####################################################
//# [START]ボタン
//#####################################################
function __handle_NewGame_Start()
{
	///////////////////////////////
	// 応答形式の取得 (LogView)
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_NewGame", inFuncName : "__handle_NewGame_Start", inMark : true }) ;
	
	///////////////////////////////
	// ユーザ作成
	wSubRes = CLS_Confirm_CreateUser() ;
	if( wSubRes['Result']!=true )
	{
		return ;
	}
	
	///////////////////////////////
	// 画面遷移
	top.CLS_WindowCtrl_FrameLocation({
		inID		: top.DEF_GF_FRAMEID['MAIN'],
///		inFilePath	: top.DEF_GF_FMFILE[top.DEF_GF_FMFILE['HOME']].Path,
///		inHeight    : top.DEF_GF_FMFILE[top.DEF_GF_FMFILE['HOME']].Width
///		inFilePath	: top.DEF_GF_FMFILE['HOME']
///		inFileID	: top.DEF_GF_FMFILE['HOME']
		inInfo		: top.DEF_GF_FMFILE['HOME']
	}) ;
	return ;
}



//#####################################################
//# [CLOSE]ボタン
//#####################################################
function __handle_NewGame_Close()
{
	///////////////////////////////
	// 応答形式の取得 (LogView)
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_NewGame", inFuncName : "__handle_NewGame_Close", inMark : true }) ;
	
	top.CLS_WindowCtrl_locationURL({
		inPageObj	: top.STR_WindowCtrl_Val.PageObj,
		inURL		: "index.html"
	}) ;
	return ;
}



//#####################################################
//# 規約チェックボックス クリック
//#####################################################
function __handle_NewGame_AgreeClick()
{
	CLS_Confirm_AgreeCheck({
		inPageObj : self.document
	}) ;
	return ;
}



