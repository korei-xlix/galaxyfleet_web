//#####################################################
//# ::Project  : Galaxy Fleet
//# ::Admin    : Korei (@korei-xlix)
//# ::github   : https://github.com/korei-xlix/galaxyfleet/
//# ::Class    : ハンドラ - メニュー
//#####################################################

//#####################################################
//# 初期ロード（メニュー画面ファイル）
//#####################################################
function __handle_Menu_PageLoad()
{
	///////////////////////////////
	// 応答形式の取得 (LogView)
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_Menu", inFuncName : "__handle_Menu_PageLoad" }) ;
	
	///////////////////////////////
	// フレーム受信処理
	top.CLS_WindowCtrl_FrameReceive({
		inID	: top.DEF_GF_FRAMEID['MENU'],
		inObj	: self.document
	}) ;
	
	///////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return ;
}



//#####################################################
//# 共通 - [CLOSE]ボタン
//#####################################################
function __handle_Menu_COMM_Close()
{
	///////////////////////////////
	// 応答形式の取得 (LogView)
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_Menu", inFuncName : "__handle_Menu_COMM_Close" }) ;
	
	///////////////////////////////
	// グローバルマップ（マップ）
	top.CLS_WindowCtrl_FrameLocation({
		inID		: top.DEF_GF_FRAMEID['MAP'],
		inInfo		: top.DEF_GF_FMFILE['MAP']
	}) ;
	
	///////////////////////////////
	// メインメニュー（メニュー）
	top.CLS_WindowCtrl_FrameLocation({
		inID		: top.DEF_GF_FRAMEID['MENU'],
///		inFileID	: top.DEF_GF_FMFILE['MAINMENU'],
		inInfo		: top.DEF_GF_FMFILE['MAINMENU']
	}) ;
	
	///////////////////////////////
	// 共通（画面）【クローズ】
	top.CLS_WindowCtrl_FrameLocation({
		inID		: top.DEF_GF_FRAMEID['COMM'],
///		inFileID	: top.DEF_GF_FMFILE['BLANK'],
		inInfo		: top.DEF_GF_FMFILE['BLANK'],
		inTimerStart : false
	}) ;
	return ;
}



//#####################################################
//# フレーム受信後処理 - Menu Frame
//#####################################################
function __handle_Menu_FrameLoad_Complete( inArg )
{
	let wKey ;
	
	///////////////////////////////
	// フレーム設定
	CLS_WindowCtrl_FrameSetPage({
		inID     : inArg['FrameID']
	}) ;
	
	//#####################################################
	//# フレーム分岐
	//#####################################################
	
	///////////////////////////////
	// メインメニュー画面
///	if( this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MENU']].FileID==DEF_GF_FMFILE['MAINMENU'] )
	if( this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MENU']].FileID=="MAINMENU" )
	{
		///////////////////////////////
		// コントロール登録
		
		for( wKey in DEF_GF_ID_MAINMENU )
		{
			CLS_WindowCtrl_setPageObject({
				inFrameID	: DEF_GF_FRAMEID['MENU'],
				inKey		: DEF_GF_ID_MAINMENU[wKey]
			}) ;
		}
	}
	///////////////////////////////
	// アカウント画面
///	else if( this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MENU']].FileID==DEF_GF_FMFILE['MENU_ACCOUNT'] )
	else if( this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MENU']].FileID=="MENU_ACCOUNT" )
	{
		///////////////////////////////
		// コントロール登録
		
///		//// コメント変更
///		CLS_WindowCtrl_setPageObject({
///			inFrameID	: DEF_GF_FRAMEID['MENU'],
///			inKey		: "iBtn_ChangeComment"
///		}) ;
///		//// パスワード変更
///		CLS_WindowCtrl_setPageObject({
///			inFrameID	: DEF_GF_FRAMEID['MENU'],
///			inKey		: "iBtn_ChangePassword"
///		}) ;
///		//// ユーザ名変更
///		CLS_WindowCtrl_setPageObject({
///			inFrameID	: DEF_GF_FRAMEID['MENU'],
///			inKey		: "iBtn_ChangeUserName"
///		}) ;
///		//// ユーザID変更
///		CLS_WindowCtrl_setPageObject({
///			inFrameID	: DEF_GF_FRAMEID['MENU'],
///			inKey		: "iBtn_ChangeUserID"
///		}) ;
		for( wKey in DEF_GF_ID_MENU_ACCOUNT )
		{
			CLS_WindowCtrl_setPageObject({
				inFrameID	: DEF_GF_FRAMEID['MENU'],
				inKey		: DEF_GF_ID_MENU_ACCOUNT[wKey]
			}) ;
		}
	}
	return ;
}



