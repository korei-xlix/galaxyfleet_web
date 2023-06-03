//#####################################################
//# ::Project  : Galaxy Fleet
//# ::Admin    : Korei (@korei-xlix)
//# ::github   : https://github.com/korei-xlix/galaxyfleet/
//# ::Class    : ハンドラ - アカウント画面
//#####################################################

//#####################################################
//# クラス変数
//#####################################################

/////////////////////////////
// メニューボタン→入力欄/ボタン インデックス
var Val_Account_Cancel = {
		"iBtn_ChangeComment" : {
			CelID		: "iCel_Input_Comment",
			BoxID		: "iInput_Comment",
			SaveID		: "iBtn_Input_Comment",
			FLG_Changed	: false
		},
		"iBtn_ChangePassword" : {
			CelID		: "iCel_Input_Password",
///			BoxID		: "",
			SaveID		: "iBtn_Input_Password",
			FLG_Changed : false
		},
		"iBtn_ChangeUserName" : {
			CelID		: "iCel_Input_UserName",
			BoxID		: "iInput_UserName",
			SaveID		: "iBtn_Input_UserName",
			FLG_Changed : false
		},
//		"iBtn_ChangeUserID" : {
//			CelID		: "iCel_Input_UserID",
//			BoxID		: "iInput_UserID",
//			SaveID		: "iBtn_Input_UserID",
//			FLG_Changed : false
//		}
	} ;

/////////////////////////////
// 入力欄削除 インデックス
var Val_Account_Erase = [
		"iInput_Comment",
		"iView_PassWD_now",
		"iInput_PassWD",
		"iInput_PassWD2",
		"iInput_UserName",
///		"iInput_UserID"
	] ;



//#####################################################
//# コントロール有効 / 無効
//#####################################################
function __handle_Account_OpenCtrl({
	inKey,
	inOpen = true
})
{
	///////////////////////////////
	// 応答形式の取得
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_Account", inFuncName : "__handle_Account_OpenCtrl" }) ;
	
	let wObject, wFLG_Open, wFrameID, wKey, wARR_Key, wText ;
	
	///////////////////////////////
	// キー入力チェック
	if( ! inKey in this.Val_Account_Cancel )
	{
		//失敗
		wRes['Reason'] = "inKey is undefined: [inKey]=" + String(inKey) ;
		top.CLS_L({ inRes:wRes, inLevel: "A" }) ;
		return wRes ;
	}
	
	wFLG_Open = inOpen ;
	wFrameID  = top.DEF_GF_FRAMEID['COMM'] ;
	wKey      = this.Val_Account_Cancel[inKey].CelID ;
	///////////////////////////////
	// コメント欄有効化 / 無効化
	
	///////////////////////////////
	// オブジェクト取得
	wSubRes = top.CLS_WindowCtrl_getPageObject({
		inFrameID	: wFrameID,
		inKey		: wKey
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_WindowCtrl_getPageObject is failed(1) "
		wRes['Reason'] = wRes['Reason'] + " [FrameID]=" + String(wFrameID) ;
		wRes['Reason'] = wRes['Reason'] + " [Key]=" + String(wKey) ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	wObject = wSubRes['Responce'] ;
	
	///////////////////////////////
	// 入力欄オープン / クローズ
	wSubRes = top.CLS_PageObj_setDisplay({
		inPageObj	: wObject,
		inKey		: wKey,
		inView		: wFLG_Open,
		inDirect	: true
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_PageObj_setDisplay is failed(1) "
		wRes['Reason'] = wRes['Reason'] + " [FrameID]=" + String(wFrameID) ;
		wRes['Reason'] = wRes['Reason'] + " [Key]=" + String(wKey) ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// オープンの場合
	//   コメント欄の場合 データ入れる
	//   ユーザ名の場合 データ入れる
	if( wFLG_Open==true )
	{
		///////////////////////////////
		// コメント欄、ユーザ名の場合
		if(( wKey=="iCel_Input_Comment" ) ||
		   ( wKey=="iCel_Input_UserName" ) )
		{
			///////////////////////////////
			// オブジェクト取得
			wSubRes = top.CLS_WindowCtrl_getPageObject({
				inFrameID	: wFrameID,
				inKey		: this.Val_Account_Cancel[inKey].BoxID
			}) ;
			if( wSubRes['Result']!=true )
			{
				//失敗
				wRes['Reason'] = "CLS_WindowCtrl_getPageObject is failed(2) "
				wRes['Reason'] = wRes['Reason'] + " [FrameID]=" + String(wFrameID) ;
				wRes['Reason'] = wRes['Reason'] + " [Key]=" + String(inKey) ;
				top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
				return wRes ;
			}
			wObject = wSubRes['Responce'] ;
			
			if( wKey=="iCel_Input_Comment" )
			{
				wText = top.STR_GF_UserInfo_Val.Comment ;
			}
			else
			{
				wText = top.STR_GF_UserInfo_Val.Name ;
			}
			
			///////////////////////////////
			// コメント欄にデータ入力
			wSubRes = top.CLS_PageObj_setValue({
				inPageObj	: wObject,
				inKey		: this.Val_Account_Cancel[inKey].BoxID,
///				inCode		: top.STR_GF_UserInfo_Val.Comment,
				inCode		: wText,
				inDirect	: true
			}) ;
			if( wSubRes['Result']!=true )
			{
				//失敗
				wRes['Reason'] = "CLS_PageObj_setDisabled is failed(2) "
				wRes['Reason'] = wRes['Reason'] + " [FrameID]=" + String(wFrameID) ;
				wRes['Reason'] = wRes['Reason'] + " [Key]=" + String(inKey) ;
				top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
				return wRes ;
			}
		}
	}
	else
	{
		///////////////////////////////
		// クローズの場合
		//   入力欄削除
		wSubRes = __handle_Account_InputErase() ;
		if( wSubRes['Result']!=true )
		{
			//失敗
			wRes['Reason'] = "__handle_Account_InputErase is failed"
			top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
			return wRes ;
		}
	}
	
///	///////////////////////////////
///	// フラグ反転
///	wFLG_Open = !wFLG_Open ;
///	
	///////////////////////////////
	// 入力欄オープンした場合
	//   メニューボタン無効化
	// 入力欄クローズした場合
	//   メニューボタン有効化
	wSubRes = __handle_Account_MenuCtrl({
		inClose : wFLG_Open
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "__handle_Account_MenuCtrl is failed"
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// セーブボタン無効化
	this.Val_Account_Cancel[inKey].FLG_Changed = false ;
	wSubRes = __handle_Account_SaveCtrl({
		inKey	: inKey,
		inClose : true
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "__handle_Account_MenuCtrl is failed"
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return wRes ;
}

///////////////////////////////////////////////////////
// コメントセーブ
function __handle_InputComment()
{
	///////////////////////////////
	// 応答形式の取得
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_Account", inFuncName : "__handle_InputComment", inMark : true }) ;
	
	let wKey, wFrameID, wText ;
	
	wFrameID = top.DEF_GF_FRAMEID['COMM'] ;
	wKey     = "iBtn_ChangeComment" ;
	///////////////////////////////
	// オブジェクト取得
	wSubRes = top.CLS_WindowCtrl_getPageObject({
		inFrameID	: wFrameID,
		inKey		: this.Val_Account_Cancel[wKey].BoxID
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_WindowCtrl_getPageObject is failed(2) "
		wRes['Reason'] = wRes['Reason'] + " [FrameID]=" + String(wFrameID) ;
		wRes['Reason'] = wRes['Reason'] + " [Key]=" + String(inKey) ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	wObject = wSubRes['Responce'] ;
	
	///////////////////////////////
	// コメント欄からデータ取得
	wSubRes = top.CLS_PageObj_getValue({
		inPageObj	: wObject,
		inKey		: this.Val_Account_Cancel[wKey].BoxID,
		inDirect	: true
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_PageObj_setDisabled is failed(2) "
		wRes['Reason'] = wRes['Reason'] + " [FrameID]=" + String(wFrameID) ;
		wRes['Reason'] = wRes['Reason'] + " [Key]=" + String(inKey) ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	wText = wSubRes['Responce'] ;
	
	///////////////////////////////
	// 妥当性チェック
	wSubRes = CLS_Confirm_checkComment({
		inComment : wText
	}) ;
	if(( wSubRes['Result']!=true )||( wSubRes['Responce']!=true ))
	{
		//失敗
		wRes['Reason'] = wSubRes['Reason'] ;
		top.CLS_L({ inRes:wRes, inLevel: "I" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// データ反映
	top.STR_GF_UserInfo_Val.Comment = wText ;
	
	///////////////////////////////
	// アカウント情報更新
	__handle_Account_viewUserInfo() ;
	
	///////////////////////////////
	// 入力欄クローズ
	//   メニューオープン
	//   セーブボタン無効化
	wSubRes = __handle_Account_OpenCtrl({
		inKey	: "iBtn_ChangeComment",
		inOpen	: false
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "__handle_Account_OpenCtrl is failed"
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// プレイ記録
///	if( top.FLG_GLOBAL_JP==true )
///	{
///		wMsg = "コメントを変更しました" ;
///	}
///	else
///	{
///		wMsg = "changed the comment" ;
///	}
	wMsg = "Changed the comment" ;
	top.CLS_L({ inRes:wRes, inLevel: "RC", inMessage: wMsg }) ;
	
	///////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return wRes ;
}

///////////////////////////////////////////////////////
// メニューボタン無効化  / 有効化
function __handle_Account_MenuCtrl({
	inClose
})
{
	///////////////////////////////
	// 応答形式の取得
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_Account", inFuncName : "__handle_Account_MenuCtrl" }) ;
	
	let wObject, wFrameID, wKey ;
	
	wFrameID  = top.DEF_GF_FRAMEID['MENU'] ;
	///////////////////////////////
	// メニューボタン無効化  / 有効化
	
	for( wKey in this.Val_Account_Cancel )
	{
		///////////////////////////////
		// オブジェクト取得
		wSubRes = top.CLS_WindowCtrl_getPageObject({
			inFrameID	: wFrameID,
			inKey		: wKey
		}) ;
		if( wSubRes['Result']!=true )
		{
			//失敗
			wRes['Reason'] = "CLS_WindowCtrl_getPageObject is failed "
			wRes['Reason'] = wRes['Reason'] + " [FrameID]=" + String(wFrameID) ;
			wRes['Reason'] = wRes['Reason'] + " [Key]=" + String(wKey) ;
			top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
			return wRes ;
		}
		wObject = wSubRes['Responce'] ;
		
		///////////////////////////////
		// コメント入力オープン
		wSubRes = top.CLS_PageObj_setDisabled({
			inPageObj	: wObject,
			inKey		: wKey,
			inDisabled	: inClose,
			inDirect	: true
		}) ;
		if( wSubRes['Result']!=true )
		{
			//失敗
			wRes['Reason'] = "CLS_PageObj_setDisabled is failed "
			wRes['Reason'] = wRes['Reason'] + " [FrameID]=" + String(wFrameID) ;
			wRes['Reason'] = wRes['Reason'] + " [Key]=" + String(wKey) ;
			top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
			return wRes ;
		}
	}
	
	///////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return wRes ;
}

///////////////////////////////////////////////////////
// セーブボタン無効化  / 有効化
function __handle_Account_SaveCtrl({
	inKey,
	inClose = false
})
{
	///////////////////////////////
	// 応答形式の取得
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_Account", inFuncName : "__handle_Account_SaveCtrl" }) ;
	
	///////////////////////////////
	// セーブボタン有効化 かつ 変更がない場合
	//   処理しない
	if( inClose==false )
	{
		if( this.Val_Account_Cancel[inKey].FLG_Changed==true )
		{
			// 変更ありは処理しない
			wRes['Result'] = true ;
			return wRes ;
		}
		// 変更なしはセーブボタンを有効化する
		this.Val_Account_Cancel[inKey].FLG_Changed = true ;
		
	}
	else
	{
		//セーブ無効化するときはフラグOFF
		this.Val_Account_Cancel[inKey].FLG_Changed = false ;
	}
	
	let wObject, wFrameID, wKey ;
	
	wFrameID  = top.DEF_GF_FRAMEID['COMM'] ;
	///////////////////////////////
	// セーブボタン無効化  / 有効化
	
	///////////////////////////////
	// オブジェクト取得
	wSubRes = top.CLS_WindowCtrl_getPageObject({
		inFrameID	: wFrameID,
		inKey		: this.Val_Account_Cancel[inKey].SaveID
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_WindowCtrl_getPageObject is failed "
		wRes['Reason'] = wRes['Reason'] + " [FrameID]=" + String(wFrameID) ;
		wRes['Reason'] = wRes['Reason'] + " [Key]=" + String(inKey) ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	wObject = wSubRes['Responce'] ;
	
	///////////////////////////////
	// コメント入力オープン
	wSubRes = top.CLS_PageObj_setDisabled({
		inPageObj	: wObject,
		inKey		: this.Val_Account_Cancel[inKey].SaveID,
		inDisabled	: inClose,
		inDirect	: true
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_PageObj_setDisabled is failed "
		wRes['Reason'] = wRes['Reason'] + " [FrameID]=" + String(wFrameID) ;
		wRes['Reason'] = wRes['Reason'] + " [Key]=" + String(inKey) ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return wRes ;
}

///////////////////////////////////////////////////////
// 入力欄削除
function __handle_Account_InputErase()
{
	///////////////////////////////
	// 応答形式の取得
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_Account", inFuncName : "__handle_Account_InputErase" }) ;
	
	let wObject, wFrameID, wKey ;
	
	wFrameID  = top.DEF_GF_FRAMEID['COMM'] ;
	///////////////////////////////
	// 入力欄削除
	
	for( wKey in this.Val_Account_Erase )
	{
		///////////////////////////////
		// オブジェクト取得
		wSubRes = top.CLS_WindowCtrl_getPageObject({
			inFrameID	: wFrameID,
			inKey		: this.Val_Account_Erase[wKey]
		}) ;
		if( wSubRes['Result']!=true )
		{
			//失敗
			wRes['Reason'] = "CLS_WindowCtrl_getPageObject is failed "
			wRes['Reason'] = wRes['Reason'] + " [FrameID]=" + String(wFrameID) ;
			wRes['Reason'] = wRes['Reason'] + " [Key]=" + String(this.Val_Account_Erase[wKey]) ;
			top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
			return wRes ;
		}
		wObject = wSubRes['Responce'] ;
		
		///////////////////////////////
		// 入力欄クリア
		wSubRes = top.CLS_PageObj_setValue({
			inPageObj	: wObject,
			inKey		: this.Val_Account_Erase[wKey],
			inCode		: "",
			inDirect	: true
		}) ;
		if( wSubRes['Result']!=true )
		{
			//失敗
			wRes['Reason'] = "CLS_PageObj_setValue is failed "
			wRes['Reason'] = wRes['Reason'] + " [FrameID]=" + String(wFrameID) ;
			wRes['Reason'] = wRes['Reason'] + " [Key]=" + String(this.Val_Account_Erase[wKey]) ;
			top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
			return wRes ;
		}
	}
	
	///////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return wRes ;
}



//#####################################################
//# パスワード表示
//#####################################################
function __handle_ViewPassword()
{
	///////////////////////////////
	// 応答形式の取得
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_Account", inFuncName : "__handle_ViewPassword", inMark : true }) ;
	
	let wKey, wFrameID ;
	
	wFrameID = top.DEF_GF_FRAMEID['COMM'] ;
	wKey     = "iView_PassWD_now" ;
	///////////////////////////////
	// オブジェクト取得
	wSubRes = top.CLS_WindowCtrl_getPageObject({
		inFrameID	: wFrameID,
		inKey		: wKey
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_WindowCtrl_getPageObject is failed "
		wRes['Reason'] = wRes['Reason'] + " [FrameID]=" + String(wFrameID) ;
		wRes['Reason'] = wRes['Reason'] + " [Key]=" + String(wKey) ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	wObject = wSubRes['Responce'] ;
	
	///////////////////////////////
	// パスワード表示欄にデータ出力
	wSubRes = top.CLS_PageObj_setValue({
		inPageObj	: wObject,
		inKey		: wKey,
		inCode		: top.CHR_PassWD,
		inDirect	: true
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_PageObj_setDisabled is failed(2) "
		wRes['Reason'] = wRes['Reason'] + " [FrameID]=" + String(wFrameID) ;
		wRes['Reason'] = wRes['Reason'] + " [Key]=" + String(wKey) ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return wRes ;
}



//#####################################################
//# パスワードセーブ
//#####################################################
function __handle_InputPassword()
{
	///////////////////////////////
	// 応答形式の取得
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_Account", inFuncName : "__handle_InputPassword", inMark : true }) ;
	
	let wKey, wFrameID, wText1, wText2 ;
	
	wFrameID = top.DEF_GF_FRAMEID['COMM'] ;
	
	//#############################
	//# パスワード１の取得
	//#############################
	wKey     = "iInput_PassWD" ;
	///////////////////////////////
	// オブジェクト取得
	wSubRes = top.CLS_WindowCtrl_getPageObject({
		inFrameID	: wFrameID,
		inKey		: wKey
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_WindowCtrl_getPageObject is failed(2) "
		wRes['Reason'] = wRes['Reason'] + " [FrameID]=" + String(wFrameID) ;
		wRes['Reason'] = wRes['Reason'] + " [Key]=" + String(inKey) ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	wObject = wSubRes['Responce'] ;
	
	///////////////////////////////
	// パスワード１からデータ取得
	wSubRes = top.CLS_PageObj_getValue({
		inPageObj	: wObject,
		inKey		: wKey,
		inDirect	: true
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_PageObj_setDisabled is failed(2) "
		wRes['Reason'] = wRes['Reason'] + " [FrameID]=" + String(wFrameID) ;
		wRes['Reason'] = wRes['Reason'] + " [Key]=" + String(inKey) ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	wText1 = wSubRes['Responce'] ;
	
	//#############################
	//# パスワード２の取得
	//#############################
	wKey     = "iInput_PassWD2" ;
	///////////////////////////////
	// オブジェクト取得
	wSubRes = top.CLS_WindowCtrl_getPageObject({
		inFrameID	: wFrameID,
		inKey		: wKey
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_WindowCtrl_getPageObject is failed(2) "
		wRes['Reason'] = wRes['Reason'] + " [FrameID]=" + String(wFrameID) ;
		wRes['Reason'] = wRes['Reason'] + " [Key]=" + String(inKey) ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	wObject = wSubRes['Responce'] ;
	
	///////////////////////////////
	// パスワード２からデータ取得
	wSubRes = top.CLS_PageObj_getValue({
		inPageObj	: wObject,
		inKey		: wKey,
		inDirect	: true
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_PageObj_setDisabled is failed(2) "
		wRes['Reason'] = wRes['Reason'] + " [FrameID]=" + String(wFrameID) ;
		wRes['Reason'] = wRes['Reason'] + " [Key]=" + String(inKey) ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	wText2 = wSubRes['Responce'] ;
	
	///////////////////////////////
	// 妥当性チェック
	wSubRes = CLS_Confirm_checkPassWD({
		inPass1 : wText1,
		inPass2 : wText2
	}) ;
	if(( wSubRes['Result']!=true )||( wSubRes['Responce']!=true ))
	{
		//失敗
		wRes['Reason'] = wSubRes['Reason'] ;
		top.CLS_L({ inRes:wRes, inLevel: "I" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// 入力パスワードのハッシュ化
	wText2 = MD5_hexhash( wText2 ) ;
	
	///////////////////////////////
	// 日時の取得
	wTimeDate = top.CLS_Time_getTimeDate({}) ;
	if( wTimeDate['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_Time_getTimeDate is failed" ;
		CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
///	wSTR_Param.UpdateInfo.TimeDate = wTimeDate['Responce'] ;
	
	///////////////////////////////
	// データ反映
	top.CHR_PassWD = wText1 ;
	top.STR_GF_UserInfo_Val.PassWD  = wText2 ;
	top.STR_GF_UserInfo_Val.PwdDate = wTimeDate['Responce'] ;
	
	///////////////////////////////
	// アカウント情報更新
	__handle_Account_viewUserInfo() ;
	
	///////////////////////////////
	// 入力欄クローズ
	//   メニューオープン
	//   セーブボタン無効化
	wSubRes = __handle_Account_OpenCtrl({
		inKey	: "iBtn_ChangePassword",
		inOpen	: false
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "__handle_Account_OpenCtrl is failed"
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// プレイ記録
	wMsg = "Changed the password" ;
	top.CLS_L({ inRes:wRes, inLevel: "RC", inMessage: wMsg }) ;
	
	///////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return wRes ;
}



//#####################################################
//# ユーザ名セーブ
//#####################################################
function __handle_InputUserName()
{
	///////////////////////////////
	// 応答形式の取得
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_Account", inFuncName : "__handle_InputUserName", inMark : true }) ;
	
	let wKey, wFrameID, wText ;
	
	wFrameID = top.DEF_GF_FRAMEID['COMM'] ;
	wKey     = "iBtn_ChangeUserName" ;
	///////////////////////////////
	// オブジェクト取得
	wSubRes = top.CLS_WindowCtrl_getPageObject({
		inFrameID	: wFrameID,
		inKey		: this.Val_Account_Cancel[wKey].BoxID
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_WindowCtrl_getPageObject is failed(2) "
		wRes['Reason'] = wRes['Reason'] + " [FrameID]=" + String(wFrameID) ;
		wRes['Reason'] = wRes['Reason'] + " [Key]=" + String(inKey) ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	wObject = wSubRes['Responce'] ;
	
	///////////////////////////////
	// ユーザ名からデータ取得
	wSubRes = top.CLS_PageObj_getValue({
		inPageObj	: wObject,
		inKey		: this.Val_Account_Cancel[wKey].BoxID,
		inDirect	: true
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_PageObj_setDisabled is failed(2) "
		wRes['Reason'] = wRes['Reason'] + " [FrameID]=" + String(wFrameID) ;
		wRes['Reason'] = wRes['Reason'] + " [Key]=" + String(inKey) ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	wText = wSubRes['Responce'] ;
	
	///////////////////////////////
	// 妥当性チェック
	wSubRes = CLS_Confirm_checkUserName({
		inName : wText
	}) ;
	if(( wSubRes['Result']!=true )||( wSubRes['Responce']!=true ))
	{
		//失敗
		wRes['Reason'] = wSubRes['Reason'] ;
		top.CLS_L({ inRes:wRes, inLevel: "I" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// データ反映
	top.STR_GF_UserInfo_Val.Name = wText ;
	
	///////////////////////////////
	// アカウント情報更新
	__handle_Account_viewUserInfo() ;
	
	///////////////////////////////
	// 入力欄クローズ
	//   メニューオープン
	//   セーブボタン無効化
	wSubRes = __handle_Account_OpenCtrl({
		inKey	: "iBtn_ChangeUserName",
		inOpen	: false
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "__handle_Account_OpenCtrl is failed"
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// プレイ記録
	wMsg = "Changed the user name" ;
	top.CLS_L({ inRes:wRes, inLevel: "RC", inMessage: wMsg }) ;
	
	///////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return wRes ;
}



//#####################################################
//# ユーザIDセーブ
//#####################################################









//#####################################################
//# アカウント情報表示
//#####################################################
function __handle_Account_viewUserInfo()
{
	///////////////////////////////
	// 応答形式の取得
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_Account", inFuncName : "__handle_Account_viewUserInfo" }) ;
	
	let wKey, wSetText, wSTR_Data ;
	
	///////////////////////////////
	// 表示データの作成
	wSTR_Data = new Object()
	
	wSTR_Data[top.DEF_GF_ID_ACCOUNT_INFO['ID']]      = top.STR_GF_UserInfo_Val.ID ;
	wSTR_Data[top.DEF_GF_ID_ACCOUNT_INFO['NAME']]    = top.STR_GF_UserInfo_Val.Name ;
	wSTR_Data[top.DEF_GF_ID_ACCOUNT_INFO['REGDATE']] = top.STR_GF_UserInfo_Val.RegDate ;
	wSTR_Data[top.DEF_GF_ID_ACCOUNT_INFO['LINDATE']] = top.STR_GF_UserInfo_Val.LinDate ;
	wSTR_Data[top.DEF_GF_ID_ACCOUNT_INFO['LOTDATE']] = top.STR_GF_UserInfo_Val.LotDate ;
	wSTR_Data[top.DEF_GF_ID_ACCOUNT_INFO['CHGDATE']] = top.STR_GF_UserInfo_Val.ChgDate ;
	wSTR_Data[top.DEF_GF_ID_ACCOUNT_INFO['PWDDATE']] = top.STR_GF_UserInfo_Val.PwdDate ;
	wSTR_Data[top.DEF_GF_ID_ACCOUNT_INFO['COMMENT']] = top.STR_GF_UserInfo_Val.Comment ;
	
	///////////////////////////////
	// データ表示
	for( wKey in wSTR_Data )
	{
		wSetText = wSTR_Data[wKey] ;
		if(( wSetText==null )||( wSetText=="" ))
		{
			wSetText = "(no data)"  ;
		}
		wSubRes = top.CLS_PageObj_setInner({
			inPageObj	: top.ARR_WindowCtrl_Frame[top.DEF_GF_FRAMEID['COMM']].PageObj,
			inKey		: wKey,
			inCode		: wSetText
		}) ;
		if( wSubRes['Result']!=true )
		{
			//失敗
			wRes['Reason'] = "CLS_PageObj_setInner is failed: [Key]=" + String(wKey) ;
			top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
			return wRes ;
		}
	}
	
	///////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return wRes ;
}



