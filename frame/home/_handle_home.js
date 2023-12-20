//#####################################################
//# ::Project  : Galaxy Fleet
//# ::Admin    : Korei (@korei-xlix)
//# ::github   : https://github.com/korei-xlix/galaxyfleet/
//# ::Class    : ハンドラ - ホーム
//#####################################################

//#####################################################
//# 初期ロード
//#####################################################
function __handle_Home_PageLoad()
{
	///////////////////////////////
	// 応答形式の取得 (LogView)
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_Home", inFuncName : "__handle_Home_PageLoad" }) ;
	
	let wObject, wBTN_Key, wLogKey, wARR_Keys ;
	
	///////////////////////////////
	// フレーム受信処理
	top.CLS_WindowCtrl_FrameReceive({
		inID	: top.DEF_GF_FRAMEID['MAIN'],
		inObj	: self.document
	}) ;
	
	///////////////////////////////
	// ログウィンドウの設定
	wLogKey  = top.DEF_GF_LOG_WINDOWINFO['KEY'] ;
	wARR_Keys = new Object() ;
	wARR_Keys[wLogKey] = top.DEF_GF_LOG_WINDOWINFO ;
	
	///////////////////////////////
	// ポップアップ情報に設定
	top.CLS_PopupCtrl_setPopup({
		inPageObj	: self.document,
		inFrameID	: top.DEF_GF_FRAMEID['MAIN'],
		inSubFrames	: top.DEF_GF_HOME_FRAMES,
		inKeys		: wARR_Keys
	}) ;
	
	///////////////////////////////
	// メッセージボックスの設定
	wLogKey  = top.DEF_GF_MESSAGEBOXINFO['KEY'] ;
	wARR_Keys = new Object() ;
	wARR_Keys[wLogKey] = top.DEF_GF_MESSAGEBOXINFO ;
	
	///////////////////////////////
	// ポップアップ情報に設定
	top.CLS_PopupCtrl_setPopup({
		inPageObj	: self.document,
		inFrameID	: top.DEF_GF_FRAMEID['MAIN'],
		inSubFrames	: top.DEF_GF_HOME_FRAMES,
		inKeys		: wARR_Keys
	}) ;
	
	///////////////////////////////
	// ログボックス設定
	top.CLS_Log_setBox({
		inPageObj	: self.document,
		inKey		: top.DEF_GF_LOG_WINDOWINFO_TEXT
	}) ;
	
	///////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return ;
}



//#####################################################
//# ログウィンド
//#####################################################

///////////////////////////////////////////////////////
// バーを掴んで移動
function __handle_clickMoveLogWindow()
{
	top.CLS_PopupCtrl_clickMovePopup({
		inKey : top.DEF_GF_LOG_WINDOWINFO['KEY']
	}) ;
}

///////////////////////////////////////////////////////
// ログオープン / クローズ
function __handle_openLogWindow({
	inOpen = false
})
{
	let wObject, wBTN_Key ;
	
	wBTN_Key = top.DEF_GF_ID_MAINMENU['LOGVIEW'] ;
	///////////////////////////////
	// [PLAY LOG]ボタン 無効化 / 有効化
	wSubRes = top.CLS_WindowCtrl_getPageObject({
		inFrameID	: top.DEF_GF_FRAMEID['MENU'],
		inKey		: wBTN_Key
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		return ;
	}
	wObject = wSubRes['Responce'] ;
	
	top.CLS_PageObj_setDisabled({
		inPageObj	: wObject,
		inKey		: wBTN_Key,
		inDisabled	: inOpen,
		inDirect	: true
	}) ;
	
	///////////////////////////////
	// ログウィンドウ オープン/クローズ
	top.CLS_PopupCtrl_openPopup({
		inKey	: top.DEF_GF_LOG_WINDOWINFO['KEY'],
		inOpen	: inOpen
	}) ;
	
}



//#####################################################
//# メッセージボックス
//#####################################################

///////////////////////////////////////////////////////
// バーを掴んで移動
function __handle_clickMoveMessageBox()
{
	top.CLS_PopupCtrl_clickMovePopup({
		inKey : top.DEF_GF_MESSAGEBOXINFO['KEY']
	}) ;
}

///////////////////////////////////////////////////////
// メッセージボックス オープン / クローズ
function __handle_openMessageBox({
	inOpen = false
})
{
	///////////////////////////////
	// メッセージボックス オープン/クローズ
	top.CLS_PopupCtrl_openPopup({
		inKey	: top.DEF_GF_MESSAGEBOXINFO['KEY'],
		inOpen	: inOpen
	}) ;
	
}



