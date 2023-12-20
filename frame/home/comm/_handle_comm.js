//#####################################################
//# ::Project  : Galaxy Fleet
//# ::Admin    : Korei (@korei-xlix)
//# ::github   : https://github.com/korei-xlix/galaxyfleet/
//# ::Class    : ハンドラ - メイン共通画面
//#####################################################

//#####################################################
//# 初期ロード（メイン共通画面ファイル）
//#####################################################
function __handle_Comm_PageLoad()
{
	///////////////////////////////
	// 応答形式の取得 (LogView)
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_Comm", inFuncName : "__handle_Comm_PageLoad" }) ;
	
	///////////////////////////////
	// フレーム受信処理
	top.CLS_WindowCtrl_FrameReceive({
		inID	: top.DEF_GF_FRAMEID['COMM'],
		inObj	: self.document
	}) ;
	
	///////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return ;
}



//#####################################################
//# フレーム受信後処理 - Comm Frame
//#####################################################
function __handle_Comm_FrameLoad_Complete( inArg )
{
	let wKey ;
	
	///////////////////////////////
	// フレーム設定
	CLS_WindowCtrl_FrameSetPage({
		inID	: inArg['FrameID']
	}) ;
	
	///////////////////////////////
	// 画面クローズ
	CLS_PageObj_setDisplay({
		inPageObj	: this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MAIN']].PageObj,
		inKey		: DEF_GF_FRAMEID['MAP'],
		inView		: false
	}) ;
	CLS_PageObj_setDisplay({
		inPageObj	: this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MAIN']].PageObj,
		inKey		: DEF_GF_FRAMEID['BAT'],
		inView		: false
	}) ;
	
	///////////////////////////////
	// 画面オープン
	CLS_PageObj_setDisplay({
		inPageObj	: this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MAIN']].PageObj,
		inKey		: DEF_GF_FRAMEID['COMM'],
		inView		: true
	}) ;
	
	///////////////////////////////
	// ホーム画面情報更新
///	this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MAIN']].FrameObj.contentWindow.CLS_HomeInfo_updateInfo({
	CLS_HomeInfo_updateInfo({
		inFrameID : DEF_GF_FRAMEID['COMM'],
		inFileID  : this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['COMM']].FileID
	}) ;
	
	//#####################################################
	//# フレーム分岐
	//#####################################################
	
	///////////////////////////////
	// アカウント画面
///	if( this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['COMM']].FileID==DEF_GF_FMFILE['ACCOUNT'] )
	if( this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['COMM']].FileID=="ACCOUNT" )
	{
		///////////////////////////////
		// アカウント情報表示
		this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['COMM']].FrameObj.contentWindow.__handle_Account_viewUserInfo() ;
		
		///////////////////////////////
		// コントロール登録
///		
///		//// コメント変更
///		CLS_WindowCtrl_setPageObject({
///			inFrameID	: DEF_GF_FRAMEID['COMM'],
///			inKey		: "iCel_Input_Comment"
///		}) ;
///		CLS_WindowCtrl_setPageObject({
///			inFrameID	: DEF_GF_FRAMEID['COMM'],
///			inKey		: "iInput_Comment"
///		}) ;
///		CLS_WindowCtrl_setPageObject({
///			inFrameID	: DEF_GF_FRAMEID['COMM'],
///			inKey		: "iBtn_Input_Comment"
///		}) ;
///		
///		//// パスワード変更
///		CLS_WindowCtrl_setPageObject({
///			inFrameID	: DEF_GF_FRAMEID['COMM'],
///			inKey		: "iCel_Input_Password"
///		}) ;
///		CLS_WindowCtrl_setPageObject({
///			inFrameID	: DEF_GF_FRAMEID['COMM'],
///			inKey		: "iView_PassWD_now"
///		}) ;
///		CLS_WindowCtrl_setPageObject({
///			inFrameID	: DEF_GF_FRAMEID['COMM'],
///			inKey		: "iInput_PassWD"
///		}) ;
///		CLS_WindowCtrl_setPageObject({
///			inFrameID	: DEF_GF_FRAMEID['COMM'],
///			inKey		: "iInput_PassWD2"
///		}) ;
///		CLS_WindowCtrl_setPageObject({
///			inFrameID	: DEF_GF_FRAMEID['COMM'],
///			inKey		: "iBtn_Input_Password"
///		}) ;
///		
///		//// ユーザ名変更
///		CLS_WindowCtrl_setPageObject({
///			inFrameID	: DEF_GF_FRAMEID['COMM'],
///			inKey		: "iCel_Input_UserName"
///		}) ;
///		CLS_WindowCtrl_setPageObject({
///			inFrameID	: DEF_GF_FRAMEID['COMM'],
///			inKey		: "iInput_UserName"
///		}) ;
///		CLS_WindowCtrl_setPageObject({
///			inFrameID	: DEF_GF_FRAMEID['COMM'],
///			inKey		: "iBtn_Input_UserName"
///		}) ;
///		
///		//// ユーザID変更
///		CLS_WindowCtrl_setPageObject({
///			inFrameID	: DEF_GF_FRAMEID['COMM'],
///			inKey		: "iCel_Input_UserID"
///		}) ;
///		CLS_WindowCtrl_setPageObject({
///			inFrameID	: DEF_GF_FRAMEID['COMM'],
///			inKey		: "iInput_UserID"
///		}) ;
///		CLS_WindowCtrl_setPageObject({
///			inFrameID	: DEF_GF_FRAMEID['COMM'],
///			inKey		: "iBtn_Input_UserID"
///		}) ;
		for( wKey in DEF_GF_ID_ACCOUNT )
		{
			CLS_WindowCtrl_setPageObject({
				inFrameID	: DEF_GF_FRAMEID['COMM'],
				inKey		: DEF_GF_ID_ACCOUNT[wKey]
			}) ;
		}
		
		///////////////////////////////
		// サブタイトル挿入
		CLS_WindowCtrl_FrameSetTitle({
			inSrcPageObj : this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['COMM']].PageObj,
			inDstPageObj : self.document
		}) ;
		
	}
	return ;
}



