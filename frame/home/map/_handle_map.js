//#####################################################
//# ::Project  : Galaxy Fleet
//# ::Admin    : Korei (@korei-xlix)
//# ::github   : https://github.com/korei-xlix/galaxyfleet/
//# ::Class    : ハンドラ - マップ
//#####################################################

//#####################################################
//# 初期ロード（マップ画面ファイル）
//#####################################################
function __handle_Map_PageLoad()
{
	///////////////////////////////
	// 応答形式の取得 (LogView)
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_Map", inFuncName : "__handle_Map_PageLoad" }) ;
	
	///////////////////////////////
	// フレーム受信処理
	top.CLS_WindowCtrl_FrameReceive({
		inID	: top.DEF_GF_FRAMEID['MAP'],
		inObj	: self.document
	}) ;
	
	///////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return ;
}



//#####################################################
//# フレーム受信後処理 - Map Frame
//#####################################################
function __handle_Map_FrameLoad_Complete( inArg )
{
	///////////////////////////////
	// フレーム設定
	CLS_WindowCtrl_FrameSetPage({
		inID	: inArg['FrameID'],
		inTtile	: true
	}) ;
	
	///////////////////////////////
	// 画面クローズ
	CLS_PageObj_setDisplay({
		inPageObj	: this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MAIN']].PageObj,
		inKey		: DEF_GF_FRAMEID['COMM'],
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
		inKey		: DEF_GF_FRAMEID['MAP'],
		inView		: true
	}) ;
	
///	console.log(this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MAP']].FrameObj.contentWindow.document.title );
	///////////////////////////////
	// サブタイトル挿入
	CLS_WindowCtrl_FrameSetTitle({
		inSrcPageObj : this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MAP']].PageObj,
		inDstPageObj : self.document
	}) ;
	
	///////////////////////////////
	// ホーム画面情報更新
///	this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MAIN']].FrameObj.contentWindow.CLS_HomeInfo_updateInfo({
	CLS_HomeInfo_updateInfo({
		inFrameID : DEF_GF_FRAMEID['MAP'],
		inFileID  : this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MAP']].FileID
	}) ;
	
	///////////////////////////////
	// コントロール登録




	return ;
}



