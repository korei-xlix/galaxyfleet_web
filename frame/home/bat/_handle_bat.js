//#####################################################
//# ::Project  : Galaxy Fleet
//# ::Admin    : Korei (@korei-xlix)
//# ::github   : https://github.com/korei-xlix/galaxyfleet/
//# ::Class    : ハンドラ - 戦闘画面
//#####################################################

//#####################################################
//# 初期ロード（戦闘画面ファイル）
//#####################################################
function __handle_Battle_PageLoad()
{
	///////////////////////////////
	// 応答形式の取得 (LogView)
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_Battle", inFuncName : "__handle_Battle_PageLoad" }) ;
	
	///////////////////////////////
	// フレーム受信処理
	top.CLS_WindowCtrl_FrameReceive({
		inID	: top.DEF_GF_FRAMEID['BAT'],
		inObj	: self.document
	}) ;
	
	///////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return ;
}



//#####################################################
//# フレーム受信後処理 - Battle Frame
//#####################################################
function __handle_Battle_FrameLoad_Complete( inArg )
{
	///////////////////////////////
	// フレーム設定
	CLS_WindowCtrl_FrameSetPage({
		inID     : inArg['FrameID'],
		inTtile  : true
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
		inKey		: DEF_GF_FRAMEID['COMM'],
		inView		: false
	}) ;
	
	///////////////////////////////
	// 画面オープン
	CLS_PageObj_setDisplay({
		inPageObj	: this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MAIN']].PageObj,
		inKey		: DEF_GF_FRAMEID['BAT'],
		inView		: true
	}) ;
	
	///////////////////////////////
	// サブタイトル挿入
	CLS_WindowCtrl_FrameSetTitle({
		inSrcPageObj : this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['BAT']].PageObj,
		inDstPageObj : self.document
	}) ;
	
	///////////////////////////////
	// ホーム画面情報更新
///	this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['MAIN']].FrameObj.contentWindow.CLS_HomeInfo_updateInfo({
	CLS_HomeInfo_updateInfo({
		inFrameID : DEF_GF_FRAMEID['BAT'],
		inFileID  : this.ARR_WindowCtrl_Frame[DEF_GF_FRAMEID['BAT']].FileID
	}) ;
	
	///////////////////////////////
	// コントロール登録


	return ;
}



