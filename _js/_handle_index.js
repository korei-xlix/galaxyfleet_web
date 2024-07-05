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
var DEF_INDEX_TEST				= true ;
//var DEF_INDEX_TEST			= false ;



//#####################################################
//# ハンドラ（共通）
//#####################################################
///////////////////////////////////////////////////////
//  ページロード
///////////////////////////////////////////////////////
function __handle_PageLoad()
{
	//###########################
	//# 応答形式の取得
	//#   "Result" : false, "Class" : "(none)", "Func" : "(none)", "Reason" : "(none)", "Responce" : "(none)"
	let wRes = CLS_OSIF.sGet_Resp({ inClass:"__handle", inFunc:"__handle_PageLoad" }) ;
	
	let wSubRes, wPageObj ;
	let wFrameID, wFramePath ;
	
	wPageObj = self.document ;
	/////////////////////////////
	// システム情報設定
	wSubRes = CLS_Sys.sSet({
		inUserID		: "webmain",			//ユーザID
		inSystemName	: "GalaxyFleet",		//システム名
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
	wSubRes = CLS_WinCtrl.sStby() ;
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
function __handle_PageLoad_Complete()
{
	//###########################
	//# 応答形式の取得
	//#   "Result" : false, "Class" : "(none)", "Func" : "(none)", "Reason" : "(none)", "Responce" : "(none)"
	let wRes = CLS_OSIF.sGet_Resp({ inClass:"__handle", inFunc:"__handle_PageLoad_Complete" }) ;
	
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
		inPageObj	: top.gSTR_WinCtrlInfo.PageObj,
		inStart		: true
	}) ;
	
	/////////////////////////////
	// システム情報表示
	CLS_Sys.sView() ;
	
	/////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return ;
}



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
	inFrameID,
	inButtonID
})
{
//**********************************
	console.log( "Button click: inFrameID=" + String(inFrameID) + " inButtonID=" + String(inButtonID) );
//**********************************
	return ;
}



//#####################################################
//# ハンドラ（定期処理）
//#####################################################
function __handle_Circle()
{
	//###########################
	//# 応答形式の取得
	//#   "Result" : false, "Class" : "(none)", "Func" : "(none)", "Reason" : "(none)", "Responce" : "(none)"
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

//**********************************

	return ;
}



