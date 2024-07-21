//#####################################################
//# ::Project  : Galaxy Fleet
//# ::Admin    : Korei (@korei-xlix)
//# ::github   : https://github.com/korei-xlix/galaxyfleet/
//# ::Class    : 認証
//#####################################################
//# ※子フレームに実装すること
//#####################################################

//#####################################################
//# クラス定数
//#####################################################

/////////////////////////////
// 文字列パターン: ユーザID
var DEF_GF_CONFIRM_MAXLENGTH_USERID		= 8 ;		//ユーザID最大文字数
var DEF_GF_CONFIRM_PATTERN_USERID = [
	'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 
	'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
	] ;

/////////////////////////////
// 文字列パターン: ユーザ名
var DEF_GF_CONFIRM_MAXLENGTH_USERNAME	= 16 ;		//ユーザ名最大文字数

/////////////////////////////
// 文字列パターン: パスワード
var DEF_GF_CONFIRM_MINLENGTH_PASSWORD	= 12 ;		//パスワード最小文字数
var DEF_GF_CONFIRM_MAXLENGTH_PASSWORD	= 64 ;		//パスワード最大文字数
var DEF_GF_CONFIRM_PATTERN_PASSWORD = [
	'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 
	'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 
	'<', '>', ')', '{', '}', '!', '?', '@', '+', '-', '*', '/', '=', '%', '#', '&', '$'
	] ;

/////////////////////////////
// 文字列除外パターン: コメント
var DEF_GF_CONFIRM_MAXLENGTH_COMMENT	= 1024 ;	//パスワード最大文字数
var DEF_GF_CONFIRM_NOT_PATTERN_COMMENT = [
	',', '\'', '\"', '|', '$',
	] ;

/////////////////////////////
// 文字列パターン: パスコード
var DEF_GF_CONFIRM_LENGTH_PASSCODE		= 8 ;		//パスコード文字数（★いじらないこと★）
var DEF_GF_CONFIRM_PATTERN_PASSCODE = [
	'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
	] ;


/////////////////////////////
// エラーメッセージ
var DEF_GF_CONFIRM_UNSELECT_SAVEDATA = {
	"JP" : "セーブデータが選択されていません",
	"EN" : "No save data selected."
	} ;

var DEF_GF_CONFIRM_USERID_LONGER = {
	"JP" : "ユーザIDが長すぎます",
	"EN" : "User ID is too longer."
	} ;

var DEF_GF_CONFIRM_USERID_UNUSABLE = {
	"JP" : "使用できない文字があります (ユーザID)",
	"EN" : "There are invalid characters in the user ID."
	} ;

var DEF_GF_CONFIRM_USERNAME_LONGER = {
	"JP" : "ユーザ名が長すぎます",
	"EN" : "User name is too longer."
	} ;

var DEF_GF_CONFIRM_PASSWD_UNMATCHR = {
	"JP" : "２つのパスワードが不一致です",
	"EN" : "The two passwords do not match."
	} ;

var DEF_GF_CONFIRM_PASSWD_SHORTER = {
	"JP" : "パスワードが短すぎます",
	"EN" : "Password is too short."
	} ;

var DEF_GF_CONFIRM_PASSWD_LONGER = {
	"JP" : "パスワードが長すぎます",
	"EN" : "Password is too long."
	} ;

var DEF_GF_CONFIRM_PASSWD_UNUSABLE = {
	"JP" : "使用できない文字があります (パスワード)",
	"EN" : "There are invalid characters in the Password."
	} ;

var DEF_GF_CONFIRM_COMMENT_LONGER = {
	"JP" : "コメントが長すぎます",
	"EN" : "Comment is too longer."
	} ;

var DEF_GF_CONFIRM_COMMENT_UNUSABLE = {
	"JP" : "使用できない文字があります (コメント)",
	"EN" : "There are invalid characters in the comment."
	} ;

var DEF_GF_CONFIRM_PASSWD_LOGIN = {
	"JP" : "ログイン失敗（ID or パスワードが違います）",
	"EN" : "Login failed (ID or password is incorrect)"
	} ;



//#####################################################
class CLS_GF_Confirm {
//#####################################################

//#####################################################
//# ログイン
//#####################################################
	static sLogin()
	{
		let wSubRes, wSTR_Input, wMessage ;
		
		/////////////////////////////
		// 子フレームオブジェクト取得
		wSubRes = CLS_FrameCld.sGetObjyect() ;
		if( wSubRes['Result']!=true )
		{///失敗
			return wRes ;
		}
		let wOBJ_Op  = wSubRes['Responce']['OBJ_Op'] ;
		let wOBJ_Win = wSubRes['Responce']['OBJ_Win'] ;
		let wPageObj = wSubRes['Responce']['PageObj'] ;
		
		//###########################
		//# 応答形式の取得
		//#   "Result" : false, "Class" : "(none)", "Func" : "(none)", "Result" : false, "Reason" : "(none)", "Responce" : "(none)"
		let wRes = wOBJ_Win.gCLS_OSIF.sGet_Resp({ inClass:"CLS_GF_Confirm", inFunc:"sLogin" }) ;

//**** ユーザ初期化 ***///

///*** セーブロード ***///


		wSTR_Input = {} ;
		/////////////////////////////
		// 入力取得＆チェック
		wSubRes = this.__sGetInput({
			outData : wSTR_Input
		}) ;
		if( wSubRes['Result']!=true )
		{///失敗か認証NG
			wRes['Reason'] = "__sGetInput is failed" ;
			wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"B", inLine:wOBJ_Op.__LINE__ }) ;
			return wRes ;
		}
		//	wSTR_Input[wOBJ_Op.DEF_GF_IDX_LOGIN_USERID]
		//	wSTR_Input[wOBJ_Op.DEF_GF_IDX_LOGIN_PASSWORD]
		//	wSTR_Input[wOBJ_Op.DEF_GF_IDX_LOGIN_PASSCODE]
		
		/////////////////////////////
		// 承認
		wSubRes = this.sConfirm({
			inID : wSTR_Input[wOBJ_Op.DEF_GF_IDX_LOGIN_USERID],
			inPW : wSTR_Input[wOBJ_Op.DEF_GF_IDX_LOGIN_PASSWORD]
		}) ;
		if( wSubRes['Result']!=true )
		{///失敗
			wRes['Reason'] = "__sGetInput is failed" ;
			wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"B", inLine:wOBJ_Op.__LINE__ }) ;
			return wRes ;
		}
		if( wSubRes['Responce']!=true )
		{///認証NG
			wRes['Reason'] = "Confirm is failed" ;
			wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"I", inLine:wOBJ_Op.__LINE__ }) ;
			return wRes ;
		}
		
		/////////////////////////////
		// 正常
		wRes['Responce'] = true ;	//認証OK
		wRes['Result'] = true ;
		return wRes ;
	}



///////////////////////////////////////////////////////
//  入力取得＆チェック
///////////////////////////////////////////////////////
	static __sGetInput({
		outData
	})
	{
		let wSubRes, pInput ;
		let wKey ;
		
		/////////////////////////////
		// 子フレームオブジェクト取得
		wSubRes = CLS_FrameCld.sGetObjyect() ;
		if( wSubRes['Result']!=true )
		{///失敗
			return wRes ;
		}
		let wOBJ_Op  = wSubRes['Responce']['OBJ_Op'] ;
		let wOBJ_Win = wSubRes['Responce']['OBJ_Win'] ;
		let wPageObj = wSubRes['Responce']['PageObj'] ;
		
		//###########################
		//# 応答形式の取得
		//#   "Result" : false, "Class" : "(none)", "Func" : "(none)", "Result" : false, "Reason" : "(none)", "Responce" : "(none)"
		let wRes = wOBJ_Win.gCLS_OSIF.sGet_Resp({ inClass:"CLS_GF_Confirm", inFunc:"__sGetInput" }) ;
		
		pInput = outData ;
		
		/////////////////////////////
		// 入力取得
		for( wKey of wOBJ_Op.DEF_GF_ARR_LOGIN_USERINFO )
		{
			//### 取得
			wSubRes = wOBJ_Win.gCLS_PageObj.sGetValue({
				inPageObj	: wPageObj,
				inKey		: wKey
			}) ;
			if( wSubRes['Result']!=true )
			{///失敗
				wRes['Reason'] = "CLS_PageObj.sGetValue is failed: Key=" + String(wKey) ;
				wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"D", inLine:wOBJ_Op.__LINE__ }) ;
				return wRes ;
			}
			pInput[wKey] = wSubRes['Responce'] ;
		}
		//	pInput[wOBJ_Op.DEF_GF_IDX_LOGIN_USERID]
		//	pInput[wOBJ_Op.DEF_GF_IDX_LOGIN_PASSWORD]
		//	pInput[wOBJ_Op.DEF_GF_IDX_LOGIN_PASSCODE]
		
		/////////////////////////////
		// セーブデータ選択のチェック
		wSubRes = this.sCheckSaveData() ;
		if(( wSubRes['Result']!=true ) || ( wSubRes['Responce']!=true ))
		{///失敗か認証NG
			wRes['Reason'] = "CLS_GF_Confirm.sCheckSaveData is failed" ;
			wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"B", inLine:wOBJ_Op.__LINE__ }) ;
			return wRes ;
		}
		
		/////////////////////////////
		// 取得値のチェック：ユーザID
		wSubRes = this.sCheckUserID({
			inID : pInput[wOBJ_Op.DEF_GF_IDX_LOGIN_USERID]
		}) ;
		if(( wSubRes['Result']!=true ) || ( wSubRes['Responce']!=true ))
		{///失敗か認証NG
			wRes['Reason'] = "CLS_GF_Confirm.sCheckUserID is failed: UserID=" + String(pInput[wOBJ_Op.DEF_GF_IDX_NEWGAME_USERID]) ;
			wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"B", inLine:wOBJ_Op.__LINE__ }) ;
			return wRes ;
		}
		
		/////////////////////////////
		// 取得値のチェック：パスワード
		wSubRes = this.sCheckPassWD({
			inPW1 : pInput[wOBJ_Op.DEF_GF_IDX_LOGIN_PASSWORD],
			inLogin : true
		}) ;
		if(( wSubRes['Result']!=true ) || ( wSubRes['Responce']!=true ))
		{///失敗か認証NG
			wRes['Reason'] = "CLS_GF_Confirm.sCheckPassWD is failed" ;
			wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"B", inLine:wOBJ_Op.__LINE__ }) ;
			return wRes ;
		}
		


////*** パスコード ***/////


		/////////////////////////////
		// 正常
		wRes['Result'] = true ;
		return wRes ;
	}



//#####################################################
//# 承認
//#####################################################
	static sConfirm({
		inID,
		inPW
	})
	{
		let wSubRes, wLang, wPassWD, wCLS_MD5, wMessage ;
		
		/////////////////////////////
		// 子フレームオブジェクト取得
		wSubRes = CLS_FrameCld.sGetObjyect() ;
		if( wSubRes['Result']!=true )
		{///失敗
			return wRes ;
		}
		let wOBJ_Op  = wSubRes['Responce']['OBJ_Op'] ;
		let wOBJ_Win = wSubRes['Responce']['OBJ_Win'] ;
		let wPageObj = wSubRes['Responce']['PageObj'] ;
		
		//###########################
		//# 応答形式の取得
		//#   "Result" : false, "Class" : "(none)", "Func" : "(none)", "Result" : false, "Reason" : "(none)", "Responce" : "(none)"
		let wRes = wOBJ_Win.gCLS_OSIF.sGet_Resp({ inClass:"CLS_GF_Confirm", inFunc:"sConfirm" }) ;
		
		wRes['Responce'] = false ;
		/////////////////////////////
		// 言語のロード
		wLang = wOBJ_Op.gSTR_WinCtrlInfo.TransInfo.Lang ;
		
		/////////////////////////////
		// パスワードをハッシュ値に変換する
		wCLS_MD5 = new CLS_MD5() ;	//MD5クラス実体化
		wPassWD  = wCLS_MD5.MD5_hexhash({ inPass:inPW }) ;
		
		/////////////////////////////
		// ID、Hash比較（認証）
		if(( wOBJ_Op.STR_GF_UserInfo.ID!=inID ) ||
		   ( wOBJ_Op.STR_GF_UserInfo.PassWD!=wPassWD ))
		{///認証NG
			wRes['Reason'] = "Login failed: inID=" + String(inID) ;
			wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"I", inLine:wOBJ_Op.__LINE__ }) ;
			
			//### alertボックス表示
			wMessage = wOBJ_Win.DEF_GF_CONFIRM_PASSWD_LOGIN[wLang] ;
			wOBJ_Win.gCLS_OSIF.sAlert({ inText:wMessage }) ;
			
			/////////////////////////////
			// 正常
			wRes['Result'] = true ;
			return wRes ;
		}
		
	/////////////////////////////
	// 認証OK
		
		/////////////////////////////
		// ログイン時間のセット
		wOBJ_Op.STR_GF_UserInfo.LinDate	= wOBJ_Op.gSTR_Time.TimeDate ;
		
		//### デバッグ表示
		wMessage = "User login is confirm: inID=" + String(inID) ;
		if( top.DEF_INDEX_TEST==true )
		{
			wMessage = wMessage + '\n' + "  Name    = " + String(wOBJ_Op.STR_GF_UserInfo.Name) ;
//			wMessage = wMessage + '\n' + "  Hash    = " + String(wOBJ_Op.STR_GF_UserInfo.PassWD) ;
			wMessage = wMessage + '\n' + "  RegDate = " + String(wOBJ_Op.STR_GF_UserInfo.RegDate) ;
			wMessage = wMessage + '\n' + "  LinDate = " + String(wOBJ_Op.STR_GF_UserInfo.LinDate) ;
			wMessage = wMessage + '\n' + "  LotDate = " + String(wOBJ_Op.STR_GF_UserInfo.LotDate) ;
			wMessage = wMessage + '\n' + "  ChgDate = " + String(wOBJ_Op.STR_GF_UserInfo.ChgDate) ;
			wMessage = wMessage + '\n' + "  PwdDate = " + String(wOBJ_Op.STR_GF_UserInfo.PwdDate) ;
		}
		wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"RU", inMessage:wMessage }) ;
		
		/////////////////////////////
		// 承認OK
		wOBJ_Op.STR_GF_UserInfo.FLG_Confirm = true ;
		
		/////////////////////////////
		// 正常
		wRes['Responce'] = true ;	//認証OK
		wRes['Result'] = true ;
		return wRes ;
	}




//#####################################################
//# 規約リンクチェック
//#####################################################
	static sAgreeLinkCheck({
		inID
	})
	{
		let wSubRes ;
		
		/////////////////////////////
		// 子フレームオブジェクト取得
		wSubRes = CLS_FrameCld.sGetObjyect() ;
		if( wSubRes['Result']!=true )
		{///失敗
			return wRes ;
		}
		let wOBJ_Op  = wSubRes['Responce']['OBJ_Op'] ;
		let wOBJ_Win = wSubRes['Responce']['OBJ_Win'] ;
		let wPageObj = wSubRes['Responce']['PageObj'] ;
		
		//###########################
		//# 応答形式の取得
		//#   "Result" : false, "Class" : "(none)", "Func" : "(none)", "Result" : false, "Reason" : "(none)", "Responce" : "(none)"
		let wRes = wOBJ_Win.gCLS_OSIF.sGet_Resp({ inClass:"CLS_GF_Confirm", inFunc:"sAgreeLinkCheck" }) ;
		
		/////////////////////////////
		// 入力チェック
///		wSubRes = wOBJ_Win.gCLS_OSIF.sGetInObject({
		wSubRes = wOBJ_Win.gCLS_OSIF.sGetInArray({
			inObject	: wOBJ_Op.DEF_GF_ARR_NEWGAME_AGREE,
			inKey		: inID
		}) ;
		if( wSubRes!=true )
		{
			wRes['Reason'] = "Agree link ckeck is not exist: inID=" + String(inID) ;
			wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"D", inLine:wOBJ_Op.__LINE__ }) ;
			return wRes ;
		}
		
		/////////////////////////////
		// 既にリンククリックしてたら、終わる
		if( wOBJ_Op.STR_GF_AgreeInfo.AgreeLink[inID]==true )
		{
			/////////////////////////////
			// 正常
			wRes['Result'] = true ;
			return wRes ;
		}
		
		/////////////////////////////
		// チェック有効化（リンククリック）
		wSubRes = wOBJ_Win.gCLS_PageObj.sSetDisabled({
			inPageObj	: wPageObj,
			inKey		: inID,
			inCode		: false
		}) ;
		if( wSubRes['Result']!=true )
		{///失敗
			wRes['Reason'] = "CLS_PageObj.sSetDisabled is failed: inID=" + String(inID) ;
			wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"D", inLine:wOBJ_Op.__LINE__ }) ;
			return wRes ;
		}
		
		/////////////////////////////
		// 規約リンククリック記録
		wOBJ_Op.STR_GF_AgreeInfo.AgreeLink[inID] = true ;
		
		/////////////////////////////
		// 正常
		wRes['Result'] = true ;
		return wRes ;
	}



//#####################################################
//# 規約チェック
//#####################################################
	static sAgreeCheck()
	{
		let wSubRes, wARR_Agree ;
		let wKey, wFLG_UnAgree ;
		
		/////////////////////////////
		// 子フレームオブジェクト取得
		wSubRes = CLS_FrameCld.sGetObjyect() ;
		if( wSubRes['Result']!=true )
		{///失敗
			return wRes ;
		}
		let wOBJ_Op  = wSubRes['Responce']['OBJ_Op'] ;
		let wOBJ_Win = wSubRes['Responce']['OBJ_Win'] ;
		let wPageObj = wSubRes['Responce']['PageObj'] ;
		
		//###########################
		//# 応答形式の取得
		//#   "Result" : false, "Class" : "(none)", "Func" : "(none)", "Result" : false, "Reason" : "(none)", "Responce" : "(none)"
		let wRes = wOBJ_Win.gCLS_OSIF.sGet_Resp({ inClass:"CLS_GF_Confirm", inFunc:"sAgreeCheck" }) ;
		
		wARR_Agree = {} ;
		/////////////////////////////
		// 各規約のチェック状態の取得
		//   1つでも未チェックなら
		//   wFLG_UnAgree = true とする
		wFLG_UnAgree = false ;
///		for( wKey of wOBJ_Op.DEF_GF_IDX_NEWGAME_ARR_AGREE )
		for( wKey of wOBJ_Op.DEF_GF_ARR_NEWGAME_AGREE )
		{
			/////////////////////////////
			// チェック取得
			wSubRes = wOBJ_Win.gCLS_PageObj.sGetChecked({
				inPageObj	: wPageObj,
				inKey		: wKey
			}) ;
			if( wSubRes['Result']!=true )
			{///失敗
				wRes['Reason'] = "CLS_PageObj.sGetChecked is failed" ;
				wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"D", inLine:wOBJ_Op.__LINE__ }) ;
				return wRes ;
			}
			wARR_Agree[wKey] = wSubRes['Responce'] ;
			
///			//### 規約チェック記録
///			wOBJ_Op.STR_GF_AgreeInfo.Agree[wKey] = wSubRes['Responce'] ;
///			
///			/////////////////////////////
///			// 1つでも未チェックなら
///			//   フラグON
			/////////////////////////////
			// 規約チェック記録
			if( wARR_Agree[wKey]==false )
			{///未チェック
				wOBJ_Op.STR_GF_AgreeInfo.Agree[wKey] = false ;
				wFLG_UnAgree = true ;
			}
			else
			{///チェック
				wOBJ_Op.STR_GF_AgreeInfo.Agree[wKey] = true ;
			}
		}
		//### 1つでも未チェックありなら、終わる
		if( wFLG_UnAgree==true )
		{
			wRes['Result'] = true ;
			return wRes ;
		}
		
	//#####################################################
	//# ※全チェックありで確定
	//#####################################################
		
		/////////////////////////////
		// 全規約無効化
		for( wKey in wARR_Agree )
		{
			//### 無効化
			wSubRes = wOBJ_Win.gCLS_PageObj.sSetDisabled({
				inPageObj	: wPageObj,
				inKey		: wKey,
				inCode		: true
			}) ;
			if( wSubRes['Result']!=true )
			{///失敗
				wRes['Reason'] = "CLS_PageObj.sSetDisabled is failed" ;
				wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"D", inLine:wOBJ_Op.__LINE__ }) ;
				return wRes ;
			}
		}
		
		/////////////////////////////
		// [REGIST]ボタンの有効化
		wOBJ_Win.gCLS_ButtonCtrl.sSetDisabled({
			inFrameID  : window.gSTR_CldInfo.ID,
			inButtonID : wOBJ_Op.DEF_GF_IDX_NEWGAME_REGIST_BUTTON,
			inDisabled : false
		}) ;
		if( wSubRes['Result']!=true )
		{///失敗
			wRes['Reason'] = "CLS_ButtonCtrl.sSetDisabled is failed" ;
			wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"A", inLine:wOBJ_Op.__LINE__ }) ;
			return wRes ;
		}
		
		/////////////////////////////
		// 正常
		wRes['Result'] = true ;
		return wRes ;
	}



//#####################################################
//# 妥当性チェック  セーブデータ選択中
//#####################################################
	static sCheckSaveData()
	{
		let wSubRes, wLang, wMessage ;
		
		/////////////////////////////
		// 子フレームオブジェクト取得
		wSubRes = CLS_FrameCld.sGetObjyect() ;
		if( wSubRes['Result']!=true )
		{///失敗
			return wRes ;
		}
		let wOBJ_Op  = wSubRes['Responce']['OBJ_Op'] ;
		let wOBJ_Win = wSubRes['Responce']['OBJ_Win'] ;
		let wPageObj = wSubRes['Responce']['PageObj'] ;
		
		//###########################
		//# 応答形式の取得
		//#   "Result" : false, "Class" : "(none)", "Func" : "(none)", "Result" : false, "Reason" : "(none)", "Responce" : "(none)"
		let wRes = wOBJ_Win.gCLS_OSIF.sGet_Resp({ inClass:"CLS_GF_Confirm", inFunc:"sCheckSaveData" }) ;
		
		wRes['Responce'] = false ;
		
		/////////////////////////////
		// 言語のロード
		wLang = wOBJ_Op.gSTR_WinCtrlInfo.TransInfo.Lang ;
		
		/////////////////////////////
		// セーブデータが選択されているか
		if( wOBJ_Op.STR_GF_UserInfo.FLG_Save!=true )
		{///未選択
			wRes['Reason'] = "No save data selected" ;
			wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"I", inLine:wOBJ_Op.__LINE__ }) ;
			
			//### alertボックス表示
			wMessage = wOBJ_Win.DEF_GF_CONFIRM_UNSELECT_SAVEDATA[wLang] ;
			wOBJ_Win.gCLS_OSIF.sAlert({ inText:wMessage }) ;
			return wRes ;
		}
		
		/////////////////////////////
		// 正常
		wRes['Responce'] = true ;	//認証OK
		wRes['Result'] = true ;
		return wRes ;
	}



//#####################################################
//# 妥当性チェック  ユーザID
//#####################################################
	static sCheckUserID({
		inID
	})
	{
		let wSubRes, wLang, wMessage ;
		let wLen, wI, wCHR_Text ;
		
		/////////////////////////////
		// 子フレームオブジェクト取得
		wSubRes = CLS_FrameCld.sGetObjyect() ;
		if( wSubRes['Result']!=true )
		{///失敗
			return wRes ;
		}
		let wOBJ_Op  = wSubRes['Responce']['OBJ_Op'] ;
		let wOBJ_Win = wSubRes['Responce']['OBJ_Win'] ;
		let wPageObj = wSubRes['Responce']['PageObj'] ;
		
		//###########################
		//# 応答形式の取得
		//#   "Result" : false, "Class" : "(none)", "Func" : "(none)", "Result" : false, "Reason" : "(none)", "Responce" : "(none)"
		let wRes = wOBJ_Win.gCLS_OSIF.sGet_Resp({ inClass:"CLS_GF_Confirm", inFunc:"sCheckUserID" }) ;
		
		wRes['Responce'] = false ;
		
		/////////////////////////////
		// 言語のロード
		wLang = wOBJ_Op.gSTR_WinCtrlInfo.TransInfo.Lang ;
		
		wLen = inID.length ;
		/////////////////////////////
		// 長さが許容外でないか
		if(( wOBJ_Win.DEF_GF_CONFIRM_MAXLENGTH_USERID<wLen ) || (wLen<=0 ))
		{///許容外
			wRes['Reason'] = "User ID is too longer: inID=" + String(inID) ;
			wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"I", inLine:wOBJ_Op.__LINE__ }) ;
			
			//### alertボックス表示
			wMessage = wOBJ_Win.DEF_GF_CONFIRM_USERID_LONGER[wLang] ;
			wOBJ_Win.gCLS_OSIF.sAlert({ inText:wMessage }) ;
			return wRes ;
		}
		
		/////////////////////////////
		// 使用できない文字がないか
		for( wI=0 ; wI < wLen ; wI++ )
		{
			//### 1文字取り出す
			wCHR_Text = inID.charAt(wI) ;
			
			//### パターン照合
			wSubRes = wOBJ_Win.gCLS_OSIF.sGetInArray({
				inObject : wOBJ_Win.DEF_GF_CONFIRM_PATTERN_USERID,
				inKey	 : wCHR_Text
			}) ;
			if( wSubRes!=true )
///			if( ( wCHR_Text in wOBJ_Win.DEF_GF_CONFIRM_PATTERN_USERID )!=true )
///			if( wOBJ_Win.DEF_GF_CONFIRM_PATTERN_USERID.includes( wCHR_Text )!=true )
			{///使用できない文字がある
				wRes['Reason'] = "There are invalid characters in the user ID: inID=" + String(inID) ;
				wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"I", inLine:wOBJ_Op.__LINE__ }) ;
				
				//### alertボックス表示
				wMessage = wOBJ_Win.DEF_GF_CONFIRM_USERID_UNUSABLE[wLang] ;
				wOBJ_Win.gCLS_OSIF.sAlert({ inText:wMessage }) ;
				return wRes ;
			}
		}
		
		/////////////////////////////
		// 正常
		wRes['Responce'] = true ;	//認証OK
		wRes['Result'] = true ;
		return wRes ;
	}



//#####################################################
//# 妥当性チェック  ユーザ名
//#####################################################
	static sCheckUserName({
		inName
	})
	{
		let wSubRes, wLang, wMessage ;
		let wLen, wCHR_Text ;
		
		/////////////////////////////
		// 子フレームオブジェクト取得
		wSubRes = CLS_FrameCld.sGetObjyect() ;
		if( wSubRes['Result']!=true )
		{///失敗
			return wRes ;
		}
		let wOBJ_Op  = wSubRes['Responce']['OBJ_Op'] ;
		let wOBJ_Win = wSubRes['Responce']['OBJ_Win'] ;
		let wPageObj = wSubRes['Responce']['PageObj'] ;
		
		//###########################
		//# 応答形式の取得
		//#   "Result" : false, "Class" : "(none)", "Func" : "(none)", "Result" : false, "Reason" : "(none)", "Responce" : "(none)"
		let wRes = wOBJ_Win.gCLS_OSIF.sGet_Resp({ inClass:"CLS_GF_Confirm", inFunc:"sCheckUserName" }) ;
		
		wRes['Responce'] = false ;
		
		/////////////////////////////
		// 言語のロード
		wLang = wOBJ_Op.gSTR_WinCtrlInfo.TransInfo.Lang ;
		
		wLen = inName.length ;
		/////////////////////////////
		// 長さが許容外でないか
		if(( wOBJ_Win.DEF_GF_CONFIRM_MAXLENGTH_USERNAME<wLen ) || (wLen<=0 ))
		{///許容外
			wRes['Reason'] = "User name is too longer: inName=" + String(inName) ;
			wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"I", inLine:wOBJ_Op.__LINE__ }) ;
			
			//### alertボックス表示
			wMessage = wOBJ_Win.DEF_GF_CONFIRM_USERNAME_LONGER[wLang] ;
			wOBJ_Win.gCLS_OSIF.sAlert({ inText:wMessage }) ;
			return wRes ;
		}
		
		/////////////////////////////
		// 正常
		wRes['Responce'] = true ;	//認証OK
		wRes['Result'] = true ;
		return wRes ;
	}



//#####################################################
//# 妥当性チェック  パスワード
//#####################################################
	static sCheckPassWD({
		inPW1,
		inPW2,
		inLogin = false
	})
	{
		let wSubRes, wLang, wMessage ;
		let wLen, wI, wCHR_Text ;
		
		/////////////////////////////
		// 子フレームオブジェクト取得
		wSubRes = CLS_FrameCld.sGetObjyect() ;
		if( wSubRes['Result']!=true )
		{///失敗
			return wRes ;
		}
		let wOBJ_Op  = wSubRes['Responce']['OBJ_Op'] ;
		let wOBJ_Win = wSubRes['Responce']['OBJ_Win'] ;
		let wPageObj = wSubRes['Responce']['PageObj'] ;
		
		//###########################
		//# 応答形式の取得
		//#   "Result" : false, "Class" : "(none)", "Func" : "(none)", "Result" : false, "Reason" : "(none)", "Responce" : "(none)"
		let wRes = wOBJ_Win.gCLS_OSIF.sGet_Resp({ inClass:"CLS_GF_Confirm", inFunc:"sCheckPassWD" }) ;
		
		wRes['Responce'] = false ;
		
		/////////////////////////////
		// 言語のロード
		wLang = wOBJ_Op.gSTR_WinCtrlInfo.TransInfo.Lang ;
		
		/////////////////////////////
		// ２つのパスワードが不一致でないか
		if(( inPW1!=inPW2 )&&( inLogin==false ))
		{///不一致
			wRes['Reason'] = "The two passwords do not match" ;
			wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"I", inLine:wOBJ_Op.__LINE__ }) ;
			
			//### alertボックス表示
			wMessage = wOBJ_Win.DEF_GF_CONFIRM_PASSWD_UNMATCHR[wLang] ;
			wOBJ_Win.gCLS_OSIF.sAlert({ inText:wMessage }) ;
			return wRes ;
		}
		
		wLen = inPW1.length ;
		/////////////////////////////
		// パスワードが短すぎる
		if( wOBJ_Win.DEF_GF_CONFIRM_MINLENGTH_PASSWORD<wLen )
		{///許容外
			wRes['Reason'] = "User ID is too short" ;
			wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"I", inLine:wOBJ_Op.__LINE__ }) ;
			
			//### alertボックス表示
			wMessage = wOBJ_Win.DEF_GF_CONFIRM_PASSWD_SHORTER[wLang] ;
			wOBJ_Win.gCLS_OSIF.sAlert({ inText:wMessage }) ;
			return wRes ;
		}
		
		/////////////////////////////
		// パスワードが長すぎる
		if(( wOBJ_Win.DEF_GF_CONFIRM_MAXLENGTH_PASSWORD<wLen ) || (wLen<=0 ))
		{///許容外
			wRes['Reason'] = "User ID is too longer" ;
			wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"I", inLine:wOBJ_Op.__LINE__ }) ;
			
			//### alertボックス表示
			wMessage = wOBJ_Win.DEF_GF_CONFIRM_PASSWD_LONGER[wLang] ;
			wOBJ_Win.gCLS_OSIF.sAlert({ inText:wMessage }) ;
			return wRes ;
		}
		
		/////////////////////////////
		// 使用できない文字がないか
		for( wI=0 ; wI < wLen ; wI++ )
		{
			//### 1文字取り出す
			wCHR_Text = inPW1.charAt(wI) ;
			
			//### パターン照合
///			wSubRes = wOBJ_Win.gCLS_OSIF.sGetInObject({
			wSubRes = wOBJ_Win.gCLS_OSIF.sGetInArray({
				inObject : wOBJ_Win.DEF_GF_CONFIRM_PATTERN_PASSWORD,
				inKey	 : wCHR_Text
			}) ;
			if( wSubRes!=true )
			{///使用できない文字がある
				wRes['Reason'] = "There are invalid characters in the password" ;
				wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"I", inLine:wOBJ_Op.__LINE__ }) ;
				
				//### alertボックス表示
				wMessage = wOBJ_Win.DEF_GF_CONFIRM_PASSWD_UNUSABLE[wLang] ;
				wOBJ_Win.gCLS_OSIF.sAlert({ inText:wMessage }) ;
				return wRes ;
			}
		}
		
		/////////////////////////////
		// 正常
		wRes['Responce'] = true ;	//認証OK
		wRes['Result'] = true ;
		return wRes ;
	}



//#####################################################
//# 妥当性チェック  コメント
//#####################################################
	static sCheckComment({
		inText
	})
	{
		let wSubRes, wLang, wMessage ;
		let wLen, wI, wCHR_Text ;
		
		/////////////////////////////
		// 子フレームオブジェクト取得
		wSubRes = CLS_FrameCld.sGetObjyect() ;
		if( wSubRes['Result']!=true )
		{///失敗
			return wRes ;
		}
		let wOBJ_Op  = wSubRes['Responce']['OBJ_Op'] ;
		let wOBJ_Win = wSubRes['Responce']['OBJ_Win'] ;
		let wPageObj = wSubRes['Responce']['PageObj'] ;
		
		//###########################
		//# 応答形式の取得
		//#   "Result" : false, "Class" : "(none)", "Func" : "(none)", "Result" : false, "Reason" : "(none)", "Responce" : "(none)"
		let wRes = wOBJ_Win.gCLS_OSIF.sGet_Resp({ inClass:"CLS_GF_Confirm", inFunc:"sCheckComment" }) ;
		
		wRes['Responce'] = false ;
		
		/////////////////////////////
		// 言語のロード
		wLang = wOBJ_Op.gSTR_WinCtrlInfo.TransInfo.Lang ;
		
		wLen = inText.length ;
		/////////////////////////////
		// 長さが許容外でないか
		if(( wOBJ_Win.DEF_GF_CONFIRM_MAXLENGTH_COMMENT<wLen ) || (wLen<=0 ))
		{///許容外
			wRes['Reason'] = "Comment is too longer" ;
			wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"I", inLine:wOBJ_Op.__LINE__ }) ;
			
			//### alertボックス表示
			wMessage = wOBJ_Win.DEF_GF_CONFIRM_COMMENT_LONGER[wLang] ;
			wOBJ_Win.gCLS_OSIF.sAlert({ inText:wMessage }) ;
			return wRes ;
		}
		
		/////////////////////////////
		// 使用できない文字がないか
		for( wI=0 ; wI < wLen ; wI++ )
		{
			//### 1文字取り出す
			wCHR_Text = inID.charAt(wI) ;
			
			//### パターン照合
///			wSubRes = wOBJ_Win.gCLS_OSIF.sGetInObject({
			wSubRes = wOBJ_Win.gCLS_OSIF.sGetInArray({
				inObject : wOBJ_Win.DEF_GF_CONFIRM_NOT_PATTERN_COMMENT,
				inKey	 : wCHR_Text
			}) ;
			if( wSubRes!=true )
			{///使用できない文字がある
				wRes['Reason'] = "There are invalid characters in the comment" ;
				wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"I", inLine:wOBJ_Op.__LINE__ }) ;
				
				//### alertボックス表示
				wMessage = wOBJ_Win.DEF_GF_CONFIRM_COMMENT_UNUSABLE[wLang] ;
				wOBJ_Win.gCLS_OSIF.sAlert({ inText:wMessage }) ;
				return wRes ;
			}
		}
		
		/////////////////////////////
		// 正常
		wRes['Responce'] = true ;	//認証OK
		wRes['Result'] = true ;
		return wRes ;
	}



//#####################################################
//# パスコード発行
//#####################################################
	static sGetPasscode()
	{
		let wSubRes, wPassCD ;
		let wLen, wI, wRand ;
		
		/////////////////////////////
		// 子フレームオブジェクト取得
		wSubRes = CLS_FrameCld.sGetObjyect() ;
		if( wSubRes['Result']!=true )
		{///失敗
			return wRes ;
		}
		let wOBJ_Op  = wSubRes['Responce']['OBJ_Op'] ;
		let wOBJ_Win = wSubRes['Responce']['OBJ_Win'] ;
		let wPageObj = wSubRes['Responce']['PageObj'] ;
		
		//###########################
		//# 応答形式の取得
		//#   "Result" : false, "Class" : "(none)", "Func" : "(none)", "Result" : false, "Reason" : "(none)", "Responce" : "(none)"
		let wRes = wOBJ_Win.gCLS_OSIF.sGet_Resp({ inClass:"CLS_GF_Confirm", inFunc:"sGetPasscode" }) ;
		
		/////////////////////////////
		// パスコードの生成
		wLen = wOBJ_Win.DEF_GF_CONFIRM_PATTERN_PASSCODE.length ;
		wPassCD = "" ;
		for( wI=0 ; wOBJ_Win.DEF_GF_CONFIRM_LENGTH_PASSCODE>wI ; wI++ )
		{
			wRand = wOBJ_Win.gCLS_OSIF.sRand({ inValue:wLen }) ;
			wPassCD += wOBJ_Win.DEF_GF_CONFIRM_PATTERN_PASSCODE[wRand] ;
		}
		
		/////////////////////////////
		// 正常
		wRes['Responce'] = wPassCD ;
		wRes['Result'] = true ;
		return wRes ;
	}



//#####################################################
}

var gCLS_GF_Confirm	= new CLS_GF_Confirm() ;
gCLS_GF_Confirm	= gCLS_GF_Confirm.constructor ;



