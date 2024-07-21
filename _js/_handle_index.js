//#####################################################
//# ::Project  : Galaxy Fleet
//# ::Admin    : Korei (@korei-xlix)
//# ::github   : https://github.com/korei-xlix/galaxyfleet_web
//# ::Class    : ハンドラ
//#####################################################

//###########################
//# ※ユーザ自由変更※

//### ストレージインデックス
var DEF_INDEX_USE_STORAGE		= true ;
var DEF_INDEX_STORAGE_HEADER	= "GALAXY_FLEET" ;

//### 翻訳機能の有効・無効
var DEF_INDEX_TRANSRATE			= true ;

//### ログファイル出力・自動オープン
var DEF_INDEX_LOG_OUTPUT		= false ;
var DEF_INDEX_LOG_AUTOOPEN		= false ;

//### テストモード  true=テスト稼働
//var DEF_INDEX_TEST			= true ;
var DEF_INDEX_TEST				= false ;



//#####################################################
//# ハンドラ（main）
//#####################################################
///////////////////////////////////////////////////////
//  ページロード
///////////////////////////////////////////////////////
function __handle_Main_PageLoad()
{
	//###########################
	//# 応答形式の取得
	//#   "Result" : false, "Class" : "(none)", "Func" : "(none)", "Result" : false, "Reason" : "(none)", "Responce" : "(none)"
	let wRes = CLS_OSIF.sGet_Resp({ inClass:"__handle", inFunc:"__handle_Main_PageLoad" }) ;
	
	let wSubRes, wPageObj, wSTR_iFrame ;
	let wFrameID ;
	
	wPageObj = self.document ;
	/////////////////////////////
	// システム情報設定
	wSubRes = CLS_Sys.sSet({
		inUserID		: top.DEF_GF_SYS_USERID,	//ユーザID
		inSystemName	: top.DEF_GF_SYS_SYSNAME,	//システム名
		inPageObj		: wPageObj,
		inUseTimer		: true					//システムタイマ使用有無  true=使用
//		inUseCircle		: true,					//定期処理使用有無        true=使用（システムタイマ有効時）
//		inExitProc		= {						//終了時処理
//			"Callback"	: top.DEF_GVAL_NULL,
//			"Arg"		: new Array()
//			}
	}) ;
	if( wSubRes['Result']!=true )
	{///失敗
		wRes['Reason'] = "CLS_Sys.sSet is failed" ;
		CLS_L.sL({ inRes:wRes, inLevel:"B", inLine:__LINE__ }) ;
		return wRes ;
	}
	//### 拡張システム情報の追加
	CLS_GF_ExtSys.sSet() ;
	
//###########################
//# 親フレームの設定
	wSubRes = CLS_WinCtrl.sSet({
		inPageObj		: wPageObj,					//ページオブジェクト
		inSTR_CSSinfo	: {							//CSSファイル情報
							"galaxyfleet_index"	: "Default"
							},
		inOtherDomain	: top.DEF_GVAL_NULL,		//外部ドメインのCSS  https://www.example.com
		inStylePath		: "/_css/",					//CSSカレントパス    /css/
		inMode			: "elase",					//ボタン非表示・サイズ自動切替
		inStyleCommPath	: top.DEF_GVAL_NULL,		//Comm Styleのカレントパス（別フォルダの場合）
		inPgIconPath	: "/_pic/icon/galaxyfleet_icon.ico",	//ページアイコン カレントパス  /_pic/icon/koreilabo_icon.ico
		inUpIconPath	: "/_pic/icon/icon_up.gif",				//更新アイコン   カレントパス  /_pic/icon/new_icon.gif
		inCompProc		: {							//設定完了待ち後実行プロセス
			"Callback"	: __handle_Main_PageLoad_Complete
//			"Arg"		: new Array()
			},
		inTrans			: true						//翻訳有効  true=ON（翻訳実行・翻訳モード選択ON）
	}) ;
	if( wSubRes['Result']!=true )
	{///失敗
		wRes['Reason'] = "CLS_WinCtrl.sSet is failer" ;
		CLS_L.sL({ inRes:wRes, inLevel:"B", inLine:__LINE__ }) ;
		return wRes ;
	}
	
	wSTR_iFrame = {} ;
//###########################
//# 子フレームの設定
	
	//### メイン画面
	wSTR_iFrame[top.DEF_GF_IDX_MAIN_FRAME_MAIN]  = {
		"Path"	: top.DEF_GF_FILEPATH_LOGIN,
	"Popup"	: false, "Title" : true, "Open" : true, "Height": 840, "Width": "100%" } ;
	//### トップ画面
	wSTR_iFrame[top.DEF_GF_IDX_MAIN_FRAME_TOP]  = {
		"Path"	: top.DEF_GF_FILEPATH_DUMMY,
		"Popup"	: false, "Title" : false, "Open" : false, "Height": 0, "Width": 0 } ;
	//### メニュー画面
	wSTR_iFrame[top.DEF_GF_IDX_MAIN_FRAME_MENU]  = {
		"Path"	: top.DEF_GF_FILEPATH_DUMMY,
		"Popup"	: false, "Title" : false, "Open" : false, "Height": 0, "Width": 0 } ;
	//### Pythonフレーム
	wSTR_iFrame[top.DEF_GF_IDX_MAIN_FRAME_PYTHON]  = {
		"Path"	: top.DEF_GF_FILEPATH_DUMMY,
		"Popup"	: false, "Title" : false, "Open" : false, "Height": 0, "Width": 0 } ;
	//### Iventフレーム
	wSTR_iFrame[top.DEF_GF_IDX_MAIN_FRAME_IVENT]  = {
		"Path"	: top.DEF_GF_FILEPATH_DUMMY,
		"Popup"	: false, "Title" : false, "Open" : false, "Height": 0, "Width": 0 } ;
	//### ポップアップ
	wSTR_iFrame[top.DEF_GF_IDX_MAIN_FRAME_WIN]  = {
		"Path"	: top.DEF_GF_FILEPATH_DUMMY,
		"Popup"	: true, "Title" : false, "Open" : false, "Height": 0, "Width": 0 } ;
	
	//### フレーム設定
	for( wFrameID in wSTR_iFrame )
	{
		wSubRes = CLS_FrameCtrl.sSet({
			inFrameID	: wFrameID,							//フレームID
			inPath		: wSTR_iFrame[wFrameID]['Path'],	//HTMLファイルパス
			inPopup		: wSTR_iFrame[wFrameID]['Popup'],	//true = ポップアップフレーム  false=インラインフレーム
			inTitle		: wSTR_iFrame[wFrameID]['Title'],	//true = 親フレームタイトル変更
			inNextProc	: {									//ロード後実行プロセス
				"Callback"	: __handle_iframeEndProcess,
				"Arg"		: wFrameID
				},
			inIFrame	: {									//iframe設定
				"Height"	: wSTR_iFrame[wFrameID]['Height'],	//  iframe 高さ
				"Width"		: wSTR_iFrame[wFrameID]['Width'],	//  iframe 横幅
				"FLG_View"	: wSTR_iFrame[wFrameID]['Open']		//  フレーム表示/非表示  true=表示
				},
			inTrans		: true								//翻訳有効  true=ON（翻訳実行・翻訳モード選択ON）
		}) ;
		if( wSubRes['Result']!=true )
		{///失敗
			wRes['Reason'] = "CLS_FrameCtrl.sSet is failed: FrameID=" + String(wFrameID) ;
			CLS_L.sL({ inRes:wRes, inLevel:"B" }) ;
			return wRes ;
		}
	}
	
	/////////////////////////////
	// 設定完了待ち
	wSubRes = CLS_WinCtrl.sStby({
		inSTR_Info : wSTR_iFrame
	}) ;
	if( wSubRes['Result']!=true )
	{///失敗
		wRes['Reason'] = "CLS_WinCtrl.sStby is failer" ;
		CLS_L.sL({ inRes:wRes, inLevel:"B", inLine:__LINE__ }) ;
		return wRes ;
	}
	
	/////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return ;
}



///////////////////////////////////////////////////////
//  ページロード完了
///////////////////////////////////////////////////////
function __handle_Main_PageLoad_Complete()
{
	//###########################
	//# 応答形式の取得
	//#   "Result" : false, "Class" : "(none)", "Func" : "(none)", "Result" : false, "Reason" : "(none)", "Responce" : "(none)"
	let wRes = CLS_OSIF.sGet_Resp({ inClass:"__handle", inFunc:"__handle_Main_PageLoad_Complete" }) ;
	
	let wSubRes ;
	
///	/////////////////////////////
///	// システム開始
///	wSubRes = CLS_Sys.sStart() ;
///	if( wSubRes['Result']!=true )
///	{///失敗
///		wRes['Reason'] = "CLS_Sys.sStart is failed" ;
///		CLS_L.sL({ inRes:wRes, inLevel:"B", inLine:__LINE__ }) ;
///		return wRes ;
///	}
///	
///	/////////////////////////////
///	// システム情報表示
///	CLS_Sys.sView() ;
///	
	//###########################
	//# メインロード待ち
	if( top.gSTR_WinCtrlInfo.IFrameInfo.Status==top.DEF_GVAL_WINCTRL_IFSTAT_MAIN )
	{
		/////////////////////////////
		// システム開始
		wSubRes = CLS_Sys.sStart() ;
		if( wSubRes['Result']!=true )
		{///失敗
			wRes['Reason'] = "CLS_Sys.sStart is failed" ;
			CLS_L.sL({ inRes:wRes, inLevel:"B", inLine:__LINE__ }) ;
			return wRes ;
		}
		
		/////////////////////////////
		// システム情報表示
		CLS_Sys.sView() ;
	}
	//###########################
	//# ニューゲーム画面 待ち
	else if( top.gSTR_WinCtrlInfo.IFrameInfo.Status==top.DEF_GF_FILEPATH_NEWGAME )
	{
		/////////////////////////////
		// ユーザ情報の初期化
		top.STR_GF_UserInfo = new STR_GF_UserInfo_Str() ;
		
		/////////////////////////////
		// 規約情報の初期化
		top.STR_GF_AgreeInfo = new STR_GF_AgreeInfo_Str() ;
	}
	
	/////////////////////////////
	// フレームロード待ちをアイドルにする
	top.gSTR_WinCtrlInfo.IFrameInfo.Status = top.DEF_GVAL_WINCTRL_IFSTAT_IDLE ;
	
	/////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return ;
}



//#####################################################
//# ハンドラ（index）
//#####################################################
///////////////////////////////////////////////////////
//  ページロード
///////////////////////////////////////////////////////
function __handle_Index_PageLoad()
{
	//###########################
	//# 応答形式の取得
	//#   "Result" : false, "Class" : "(none)", "Func" : "(none)", "Result" : false, "Reason" : "(none)", "Responce" : "(none)"
	let wRes = CLS_OSIF.sGet_Resp({ inClass:"__handle", inFunc:"__handle_Index_PageLoad" }) ;
	
	let wSubRes, wPageObj ;
	let wFrameID, wFramePath ;
	
	wPageObj = self.document ;
	/////////////////////////////
	// システム情報設定
	wSubRes = CLS_Sys.sSet({
		inUserID		: top.DEF_GF_SYS_USERID,	//ユーザID
		inSystemName	: top.DEF_GF_SYS_SYSNAME,	//システム名
		inPageObj		: wPageObj,
		inUseTimer		: true					//システムタイマ使用有無  true=使用
//		inUseCircle		: true,					//定期処理使用有無        true=使用（システムタイマ有効時）
//		inExitProc		= {						//終了時処理
//			"Callback"	: top.DEF_GVAL_NULL,
//			"Arg"		: new Array()
//			}
	}) ;
	if( wSubRes['Result']!=true )
	{///失敗
		wRes['Reason'] = "CLS_Sys.sSet is failed" ;
		CLS_L.sL({ inRes:wRes, inLevel:"B", inLine:__LINE__ }) ;
		return wRes ;
	}
	//### 拡張システム情報の追加
	CLS_GF_ExtSys.sSet() ;
	
	/////////////////////////////
	// 親フレームの設定
	wSubRes = CLS_WinCtrl.sSet({
		inPageObj		: wPageObj,					//ページオブジェクト
		inSTR_CSSinfo	: {							//CSSファイル情報
							"galaxyfleet_index"	: "Default"
							},
		inOtherDomain	: top.DEF_GVAL_NULL,		//外部ドメインのCSS  https://www.example.com
		inStylePath		: "/_css/",					//CSSカレントパス    /css/
		inMode			: "elase",					//ボタン非表示・サイズ自動切替
		inStyleCommPath	: top.DEF_GVAL_NULL,		//Comm Styleのカレントパス（別フォルダの場合）
		inPgIconPath	: "/_pic/icon/galaxyfleet_icon.ico",	//ページアイコン カレントパス  /_pic/icon/koreilabo_icon.ico
		inUpIconPath	: "/_pic/icon/icon_up.gif",				//更新アイコン   カレントパス  /_pic/icon/new_icon.gif
		inCompProc		: {							//設定完了待ち後実行プロセス
			"Callback"	: __handle_Index_PageLoad_Complete
//			"Arg"		: new Array()
			},
		inTrans			: true						//翻訳有効  true=ON（翻訳実行・翻訳モード選択ON）
	}) ;
	if( wSubRes['Result']!=true )
	{///失敗
		wRes['Reason'] = "CLS_WinCtrl.sSet is failer" ;
		CLS_L.sL({ inRes:wRes, inLevel:"B", inLine:__LINE__ }) ;
		return wRes ;
	}
	
	/////////////////////////////
	// 設定完了待ち
	wSubRes = CLS_WinCtrl.sStby({
		inSTR_Info : {}
	}) ;
	if( wSubRes['Result']!=true )
	{///失敗
		wRes['Reason'] = "CLS_WinCtrl.sStby is failer" ;
		CLS_L.sL({ inRes:wRes, inLevel:"B", inLine:__LINE__ }) ;
		return wRes ;
	}
	
	/////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return ;
}



///////////////////////////////////////////////////////
//  ページロード完了
///////////////////////////////////////////////////////
function __handle_Index_PageLoad_Complete()
{
	//###########################
	//# 応答形式の取得
	//#   "Result" : false, "Class" : "(none)", "Func" : "(none)", "Result" : false, "Reason" : "(none)", "Responce" : "(none)"
	let wRes = CLS_OSIF.sGet_Resp({ inClass:"__handle", inFunc:"__handle_Index_PageLoad_Complete" }) ;
	
	let wSubRes ;
	
	/////////////////////////////
	// システム状態変更（→運用へ）
	wSubRes = CLS_Sys.sChg({
		inStatus	: top.DEF_GVAL_SYS_STAT_RUN
	}) ;
	if( wSubRes['Result']!=true )
	{///失敗
		wRes['Reason'] = "CLS_Sys.sChg is failed" ;
		CLS_L.sL({ inRes:wRes, inLevel:"B", inLine:__LINE__ }) ;
		return wRes ;
	}
	
	/////////////////////////////
	// スタートボタン制御（表示）
	CLS_GF_ExtSys.sStartButtonCtrl({
		inPageObj	: top.gSTR_WinCtrlInfo.PageObj
	}) ;
	
	/////////////////////////////
	// システム情報表示
	CLS_Sys.sView() ;
	
	/////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return ;
}



//#####################################################
//# ハンドラ（共通）
//#####################################################
///////////////////////////////////////////////////////
//  ページリサイズ
///////////////////////////////////////////////////////
function __handle_PageResize()
{
	CLS_WinCtrl.sChgPageResize() ;
	return ;
}



///////////////////////////////////////////////////////
//  CSSスタイル切り替え
///////////////////////////////////////////////////////
function __handle_SelectCSS()
{
	CLS_WinCtrl.sChgCSSstyle() ;
	return ;
}



///////////////////////////////////////////////////////
//  CSSモード切り替え
///////////////////////////////////////////////////////
function __handle_SelectCSS_Mode( inMode )
{
	CLS_WinCtrl.sChgCSSmode({
		inMode : inMode
	}) ;
	return ;
}



///////////////////////////////////////////////////////
//  ヘルプデータの設定
///////////////////////////////////////////////////////
function __handle_SHelp({ inID = top.DEF_GVAL_NULL, inLang = {} })
{
	CLS_PopupCtrl.sRegHelp({
		inID	  : inID,
		inLang	  : inLang
	}) ;
	return ;
}



///////////////////////////////////////////////////////
//  Windowデータの設定
///////////////////////////////////////////////////////
function __handle_SWin({ inID = top.DEF_GVAL_NULL, inCoord = {
	"FTop":top.DEF_GVAL_POPUPWIN_FTOP , "FLeft":top.DEF_GVAL_POPUPWIN_FLEFT } })
{
	CLS_PopupCtrl.sRegWin({
		inID	  : inID,
		inCoord	  : inCoord
	}) ;
	return ;
}



///////////////////////////////////////////////////////
//  ボタン番号の設定
///////////////////////////////////////////////////////
function __handle_SBtn({ inID = top.DEF_GVAL_NULL, inStyle = {} })
{
	CLS_ButtonCtrl.sRegBtn({
		inID	  : inID,
		inStyle	  : inStyle
	}) ;
	return ;
}



///////////////////////////////////////////////////////
//  セレクタ番号の設定
///////////////////////////////////////////////////////
function __handle_Sel( inNumber )
{
	CLS_Sel.sRegVal({
		inNum : inNumber
	}) ;
	return ;
}



///////////////////////////////////////////////////////
//  ボタンクリック イベント
///////////////////////////////////////////////////////
function __handle_BtnClick({
	inFrameID  = top.DEF_GVAL_NULL,
	inButtonID = top.DEF_GVAL_NULL
})
{
	//###########################
	//# 応答形式の取得
	//#   "Result" : false, "Class" : "(none)", "Func" : "(none)", "Result" : false, "Reason" : "(none)", "Responce" : "(none)"
	let wRes = CLS_OSIF.sGet_Resp({ inClass:"__handle", inFunc:"__handle_BtnClick" }) ;
	
	let wSubRes, wMessage ;
	let wOBJ_Cld ;
	
	wOBJ_Cld = top.gARR_FrameCtrlInfo[inFrameID].WindowObj ;
	/////////////////////////////
	// ボタン解析
	wSubRes = CLS_ButtonCtrl.sAnalysis({
		inFrameID  : inFrameID,
		inButtonID : inButtonID
	}) ;
	if( wSubRes['Result']!=true )
	{///失敗
		wRes['Reason'] = "CLS_OSIF.sSplit is failed: inFrameID=" + String(inFrameID) + " inButtonID=" + String(inButtonID) ;
		CLS_L.sL({ inRes:wRes, inLevel:"A", inLine:__LINE__ }) ;
		return false ;
	}
///	if( top.DEF_INDEX_TEST==true )
///	{
///		wMessage = "Button click: inButtonID=" + String(inButtonID) ;
///		wMessage = wMessage + '\n' + "  inFrameID = " + String(inFrameID) ;
///		wMessage = wMessage + '\n' + "  Index  = " + String(wSubRes['Responce']['Index']) ;
///		wMessage = wMessage + '\n' + "  Group  = " + String(wSubRes['Responce']['Group']) ;
///		wMessage = wMessage + '\n' + "  Button = " + String(wSubRes['Responce']['Button']) ;
///		wMessage = wMessage + '\n' + "  Kind   = " + String(wSubRes['Responce']['Kind']) ;
///		CLS_L.sL({ inRes:wRes, inLevel:"X", inMessage:wMessage }) ;
///	}
	
//###########################
//# メイン画面系
	if( inFrameID==top.DEF_GF_IDX_MAIN_FRAME_MAIN )
	{
		//###########################
		//# ログイン画面
		if( wSubRes['Responce']['Index']=="gf_Login" )
		{
			//### [CLOSE] : Indexページへ
			if( wSubRes['Responce']['Button']=="BTN_Close" )
			{
				CLS_WinCtrl.sLocation({
					inPath		: top.DEF_GF_FILEPATH_INDEX,
					inRireki	: false
				}) ;
				return true ;
			}
			//### [NEW] : ニューゲーム画面へ
			else if( wSubRes['Responce']['Button']=="BTN_New" )
			{
				top.gSTR_WinCtrlInfo.IFrameInfo.Status = top.DEF_GF_FILEPATH_NEWGAME ;
				top.gSTR_WinCtrlInfo.IFrameInfo.ARR_Load[top.DEF_GF_IDX_MAIN_FRAME_MAIN] = false ;
				
				CLS_FrameCtrl.sOpen({
					inFrameID	: top.DEF_GF_IDX_MAIN_FRAME_MAIN,
					inPath		: top.DEF_GF_FILEPATH_NEWGAME
				}) ;
				return true ;
			}
			//### [LOGIN] : ログイン処理
			else if( wSubRes['Responce']['Button']=="BTN_Login" )
			{
				wSubRes = wOBJ_Cld.gCLS_GF_Confirm.sLogin() ;
				if(( wSubRes['Result']!=true )||( wSubRes['Responce']!=true ))
				{///失敗か認証NG
					console.log("comfirm is NG");
					return false ;
				}
//////////////////
				alert("ログイン成功!!!");
//////////////////
				return true ;
			}
		}
		//###########################
		//# ニューゲーム画面
		else if( wSubRes['Responce']['Index']=="gf_NewGame" )
		{
			//### [CLOSE] : Indexページへ
			if( wSubRes['Responce']['Button']=="BTN_Close" )
			{
				CLS_WinCtrl.sLocation({
					inPath		: top.DEF_GF_FILEPATH_INDEX,
					inRireki	: false
				}) ;
				return true ;
			}
			//### [REGIST] : ユーザ登録処理＆ログイン処理
			else if( wSubRes['Responce']['Button']=="BTN_Regist" )
			{
				wSubRes = wOBJ_Cld.gCLS_GF_CreateUser.sCreate() ;
				if(( wSubRes['Result']!=true )||( wSubRes['Responce']!=true ))
				{///失敗か認証NG
					console.log("comfirm is NG");
					return false ;
				}
//////////////////
				alert("ユーザ作成＆ログイン成功!!!");
//////////////////
				top.gSTR_WinCtrlInfo.IFrameInfo.Status = top.DEF_GF_FILEPATH_LOGIN ;
				top.gSTR_WinCtrlInfo.IFrameInfo.ARR_Load[top.DEF_GF_IDX_MAIN_FRAME_MAIN] = false ;
				
				CLS_FrameCtrl.sOpen({
					inFrameID	: top.DEF_GF_IDX_MAIN_FRAME_MAIN,
					inPath		: top.DEF_GF_FILEPATH_LOGIN
				}) ;
//////////////////
				return true ;
			}
		}




	}
//###########################
//# メニュー画面系
	else if( inFrameID==top.DEF_GF_IDX_MAIN_FRAME_MENU )
	{
	}
//###########################
//# トップ画面系
	else if( inFrameID==top.DEF_GF_IDX_MAIN_FRAME_TOP )
	{
	}
	
	/////////////////////////////
	// イベントなし
//**********************************
//	console.log( "Button click: inFrameID=" + String(inFrameID) + " inButtonID=" + String(inButtonID) );
//**********************************
	wRes['Reason'] = "Button ivent is not found: inFrameID=" + String(inFrameID) + " inButtonID=" + String(inButtonID) ;
	CLS_L.sL({ inRes:wRes, inLevel:"D", inLine:__LINE__ }) ;
	return false ;
}



//#####################################################
//# ハンドラ（定期処理）
//#####################################################
function __handle_Circle()
{
	//###########################
	//# 応答形式の取得
	//#   "Result" : false, "Class" : "(none)", "Func" : "(none)", "Result" : false, "Reason" : "(none)", "Responce" : "(none)"
	let wRes = CLS_OSIF.sGet_Resp({ inClass:"__handle", inFunc:"__handle_Circle" }) ;
	
	let wSubRes, wMessage ;
	
	/////////////////////////////
	// 定期処理がいずれもOFFなら、終わる
	if(( top.gSTR_SystemCircle.FLG_15==false ) &&
	   ( top.gSTR_SystemCircle.FLG_30==false ) &&
	   ( top.gSTR_SystemCircle.FLG_60==false ))
	{
		/////////////////////////////
		// 正常
		wRes['Result'] = true ;
		return wRes ;
	}
	
	/////////////////////////////
	// 定期処理中（排他中）なら、終わる
	if( top.gSTR_SystemCircle.FLG_Rock==true )
	{
		//### コンソール表示
		if( top.DEF_INDEX_TEST==true )
		{
			wMessage = "Process skip(Rock on)" ;
			CLS_L.sL({ inRes:wRes, inLevel:"N", inMessage:wMessage }) ;
		}
		
		/////////////////////////////
		// 正常
		wRes['Result'] = true ;
		return wRes ;
	}
	//### 排他ロック
	top.gSTR_SystemCircle.FLG_Rock = true ;
	
	/////////////////////////////
	// 定期処理
	
	/////////////////////////////
	// 定期処理（60分毎）
	if( top.gSTR_SystemCircle.FLG_60==true )
	{
		//###########################
		//# ↓↓↓60分定期処理↓↓↓
		
		////////////////////////////////////////
		// エラーの場合  top.gSTR_SystemCircle.FLG_Error = true ;
		
		//# ↑↑↑ここまで    ↑↑↑
		//###########################
		top.gSTR_SystemCircle.FLG_60 = false ;
		
		//### コンソール表示
		wMessage = "60 minute process Complete" ;
		CLS_L.sL({ inRes:wRes, inLevel:"SR", inMessage:wMessage }) ;
	}
	/////////////////////////////
	// 定期処理（30分毎）
	else if( top.gSTR_SystemCircle.FLG_30==true )
	{
		//###########################
		//# ↓↓↓30分定期処理↓↓↓
		
		////////////////////////////////////////
		
		//# ↑↑↑ここまで    ↑↑↑
		//###########################
		top.gSTR_SystemCircle.FLG_30 = false ;
		
		//### コンソール表示
		wMessage = "30 minute process Complete" ;
		CLS_L.sL({ inRes:wRes, inLevel:"SR", inMessage:wMessage }) ;
	}
	/////////////////////////////
	// 定期処理（15分毎）
	else if( top.gSTR_SystemCircle.FLG_15==true )
	{
		//###########################
		//# ↓↓↓15分定期処理↓↓↓
		
		////////////////////////////////////////
		
		//# ↑↑↑ここまで    ↑↑↑
		//###########################
		top.gSTR_SystemCircle.FLG_15 = false ;
		
		//### コンソール表示
		wMessage = "15 minute process Complete" ;
		CLS_L.sL({ inRes:wRes, inLevel:"SR", inMessage:wMessage }) ;
	}
	
	/////////////////////////////
	// 完了通知
	top.gSTR_SystemCircle.FLG_Comp = true ;
	
	//### 排他解除
	top.gSTR_SystemCircle.FLG_Rock = false ;
	
	/////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return wRes ;
}



//#####################################################
//# ハンドラ（フレーム用）
//#####################################################
///////////////////////////////////////////////////////
//  iframe 後処理
///////////////////////////////////////////////////////
function __handle_iframeEndProcess( inFrameID )
{
	CLS_WinCtrl.sIframeLoaded({
		inFrameID : inFrameID
	}) ;
	return ;
}



//#####################################################
//# ハンドラ（GalaxyFleet・インデックスページ）
//#####################################################
///////////////////////////////////////////////////////
//  スタートクリック
///////////////////////////////////////////////////////
function __handle_Start()
{
	CLS_WinCtrl.sLocation({
		inPath		: top.DEF_GF_FILEPATH_MAIN,
		inRireki	: false
	}) ;
	return ;
}



