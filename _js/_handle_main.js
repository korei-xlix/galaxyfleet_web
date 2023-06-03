//#####################################################
//# ::Project  : Galaxy Fleet
//# ::Admin    : Korei (@korei-xlix)
//# ::github   : https://github.com/korei-xlix/galaxyfleet/
//# ::Class    : ハンドラ - main
//#####################################################

//#####################################################
//# 初期ロード
//#####################################################
function __handle_PageLoad()
{
	///////////////////////////////
	// 応答形式の取得 (LogView)
	let wRes = CLS_L_getRes({ inClassName : "__handle_main", inFuncName : "__handle_PageLoad", inMark : true }) ;
	
	///////////////////////////////
	// CSSロード
	CLS_WindowCtrl_PageSet({
	   inPageObj	: self.document,
	   inStylePath	: "/_css/",
	   inStyleName	: "galaxyfleet",
	   inMode		: "normal",
	   inStyleCommPath	: null,
	   inIconPath	: "/_icon/galaxyfleet_icon.ico"
	}) ;
	
	///////////////////////////////
	// 翻訳モードのロード
	CLS_WindowCtrl_getTransrate({
		inKey	: DEF_GLOBAL_STORAGE_TRANSRATE
	}) ;
	
///	///////////////////////////////
///	// フレーム情報取得
///	wSubRes = CLS_FrameInfo_getFrameInfo({
///		inFrameID : DEF_GF_FMFILE['LOGIN']
///	}) ;
///	if( wSubRes['Result']!=true )
///	{
///		//失敗
///		wRes['Reason'] = "CLS_FrameInfo_getFrameInfo is failer" ;
///		CLS_L({ inRes:wRes, inLevel: "B" }) ;
///		return wRes ;
///	}
///	
	///////////////////////////////
	// フレームセット(HOME - LOGIN)
	CLS_WindowCtrl_FrameSet({
		inFrameObj	: self.document,
		inID		: DEF_GF_FRAMEID['MAIN'],
		inCallback	: __handle_Main_FrameLoad_Complete,
///		inFileID	: DEF_GF_FMFILE['LOGIN'],
		inStylePath	: "/_css/",
		inStyleCommPath	: null
///		inPath		: wSubRes['Result']['Path'],
///		inHeight	: wSubRes['Result']['Height'],
///		inWidth		: wSubRes['Result']['Width'],
///		inLoad		: true
	}) ;
	
	///////////////////////////////
	// ロケーション起動
	CLS_WindowCtrl_FrameLocation({
		inID		: top.DEF_GF_FRAMEID['MAIN'],
		inInfo		: top.DEF_GF_FMFILE['LOGIN']
	}) ;
	
	///////////////////////////////
	//# 正常
	wRes['Result'] = true ;
	return ;
}



//#####################################################
//# フレーム受信後処理 - Main Frame
//#####################################################
function __handle_Main_FrameLoad_Complete( inArg )
{
	///////////////////////////////
	// 応答形式の取得 (LogView)
	let wRes = CLS_L_getRes({ inClassName : "__handle_main", inFuncName : "__handle_Main_FrameLoad_Complete" }) ;
	
///	///////////////////////////////
///	// フレーム設定
///	CLS_WindowCtrl_FrameSetPage({
///		inID	: inArg['FrameID']
///	}) ;
///	
	
	//#####################################################
	//# フレーム分岐
	//#####################################################
	
	///////////////////////////////
	// ログイン画面
///	if( this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MAIN']].FileID==DEF_GF_FMFILE['LOGIN'] )
	if( this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MAIN']].FileID=="LOGIN" )
	{
		///////////////////////////////
		// フレーム設定
		CLS_WindowCtrl_FrameSetPage({
			inID	: inArg['FrameID'],
			inTtile	: true
		}) ;
		if( wSubRes['Result']!=true )
		{
			//失敗
			wRes['Reason'] = "CLS_FrameInfo_getFrameInfo is failer(1)" ;
			CLS_L({ inRes:wRes, inLevel: "B" }) ;
			return wRes ;
		}
		
		this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MAIN']].FrameObj.contentWindow.__handle_Login_PageLoaded() ;
		
		///////////////////////////////
		// サブタイトル挿入
		CLS_WindowCtrl_FrameSetTitle({
			inSrcPageObj : this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MAIN']].PageObj,
			inDstPageObj : self.document
			}) ;
	}
	///////////////////////////////
	// ニューゲーム画面
///	else if( this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MAIN']].FileID==DEF_GF_FMFILE['NEWGAME'] )
	else if( this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MAIN']].FileID=="NEWGAME" )
	{
		///////////////////////////////
		// フレーム設定
		CLS_WindowCtrl_FrameSetPage({
			inID	: inArg['FrameID'],
			inTtile	: true
		}) ;
		if( wSubRes['Result']!=true )
		{
			//失敗
			wRes['Reason'] = "CLS_FrameInfo_getFrameInfo is failer(2)" ;
			CLS_L({ inRes:wRes, inLevel: "B" }) ;
			return wRes ;
		}
		
		///////////////////////////////
		// サブタイトル挿入
		CLS_WindowCtrl_FrameSetTitle({
			inSrcPageObj : this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MAIN']].PageObj,
			inDstPageObj : self.document
		}) ;
	}
	///////////////////////////////
	// ホーム画面
///	else if( this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MAIN']].FileID==DEF_GF_FMFILE['HOME'] )
	else if( this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MAIN']].FileID=="HOME" )
	{
		///////////////////////////////
		// フレーム設定
		CLS_WindowCtrl_FrameSetPage({
			inID	: inArg['FrameID']
		}) ;
		
		///////////////////////////////
		// フレームセット(MENU)
		CLS_WindowCtrl_FrameSet({
			inFrameObj	: this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MAIN']].FrameObj.contentWindow.document,
			inID		: DEF_GF_FRAMEID['MENU'],
			inCallback	: __handle_Menu_FrameLoad_Complete,
///			inFileID	: DEF_GF_FMFILE['MAINMENU'],
			inStylePath	: "/_css/",
			inStyleCommPath	: null
///			inPath		: wSubRes['Result']['Path'],
///			inHeight	: wSubRes['Result']['Height'],
///			inWidth		: wSubRes['Result']['Width'],
///			inLoad		: true
		}) ;
		//// ロケーション起動
		CLS_WindowCtrl_FrameLocation({
			inID		: top.DEF_GF_FRAMEID['MENU'],
			inInfo		: top.DEF_GF_FMFILE['MAINMENU']
		}) ;
		
		///////////////////////////////
		// フレームセット(マップ)
		CLS_WindowCtrl_FrameSet({
			inFrameObj	: this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MAIN']].FrameObj.contentWindow.document,
			inID		: DEF_GF_FRAMEID['MAP'],
			inCallback	: __handle_Map_FrameLoad_Complete,
///			inFileID	: DEF_GF_FMFILE['MAP'],
			inStylePath	: "/_css/",
			inStyleCommPath	: null
///			inPath		: wSubRes['Result']['Path'],
///			inHeight	: wSubRes['Result']['Height'],
///			inWidth		: wSubRes['Result']['Width'],
///			inLoad		: true
		}) ;
		//// ロケーション起動
		CLS_WindowCtrl_FrameLocation({
			inID		: top.DEF_GF_FRAMEID['MAP'],
			inInfo		: top.DEF_GF_FMFILE['MAP']
		}) ;
		
		///////////////////////////////
		// フレームセット(中心)
		CLS_WindowCtrl_FrameSet({
			inFrameObj	: this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MAIN']].FrameObj.contentWindow.document,
			inID		: DEF_GF_FRAMEID['COMM'],
			inCallback	: __handle_Comm_FrameLoad_Complete,
///			inFileID	: DEF_GF_FMFILE['BLANK'],
			inStylePath	: "/_css/",
			inStyleCommPath	: null
///			inPath		: wSubRes['Result']['Path'],
///			inHeight	: wSubRes['Result']['Height'],
///			inWidth		: wSubRes['Result']['Width'],
///			inLoad		: false
		}) ;
		
		///////////////////////////////
		// フレームセット(バトル)
		CLS_WindowCtrl_FrameSet({
			inFrameObj	: this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MAIN']].FrameObj.contentWindow.document,
			inID		: DEF_GF_FRAMEID['BAT'],
			inCallback	: __handle_Battle_FrameLoad_Complete,
///			inFileID	: DEF_GF_FMFILE['BLANK'],
			inStylePath	: "/_css/",
			inStyleCommPath	: null
///			inPath		: wSubRes['Result']['Path'],
///			inHeight	: wSubRes['Result']['Height'],
///			inWidth		: wSubRes['Result']['Width'],
///			inLoad		: false
		}) ;
		
		///////////////////////////////
		// ホーム画面情報更新
		CLS_HomeInfo_updateInfo({
			inFrameID : DEF_GF_FRAMEID['MAP'],
			inFileID  : DEF_GF_FMFILE['MAP']
		}) ;
		
	}
	
	///////////////////////////////
	//# 正常
	wRes['Result'] = true ;
	return ;
}



