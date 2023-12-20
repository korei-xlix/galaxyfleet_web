//#####################################################
//# ::Project  : Galaxy Fleet
//# ::Admin    : Korei (@korei-xlix)
//# ::github   : https://github.com/korei-xlix/galaxyfleet/
//# ::Class    : 認証
//#####################################################

//#####################################################
//# クラス定数
//#####################################################

/////////////////////////////
// 文字列パターン: ユーザID
const DEF_CONFIRM_MAXLENGTH_USERID = 8 ;	//ユーザID最大文字数
const DEF_CONFIRM_PATTERN_USERID = [
	'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 
	'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 
	] ;

/////////////////////////////
// 文字列パターン: ユーザ名
const DEF_CONFIRM_MAXLENGTH_USERNAME = 16 ;	//ユーザ名最大文字数

/////////////////////////////
// 文字列パターン: パスワード
const DEF_CONFIRM_MINLENGTH_PASSWORD = 12 ;	//パスワード最小文字数
const DEF_CONFIRM_MAXLENGTH_PASSWORD = 64 ;	//パスワード最大文字数
const DEF_CONFIRM_PATTERN_PASSWORD = [
	'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 
	'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 
	'<', '>', ')', '{', '}', '!', '?', '@', '+', '-', '*', '/', '=', '%', '#', '&', '$',
	] ;

/////////////////////////////
// 文字列除外パターン: コメント
const DEF_CONFIRM_MAXLENGTH_COMMENT = 1024 ;	//パスワード最大文字数
const DEF_CONFIRM_NOT_PATTERN_COMMENT = [
	',', '\'', '\"', '|', '$',
	] ;

/////////////////////////////
// 文字列パターン: パスコード
const DEF_CONFIRM_LENGTH_PASSCODE = 8 ;	//パスコード文字数（★いじらないこと★）
const DEF_CONFIRM_PATTERN_PASSCODE = [
	'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 
	] ;

///var CHR_Confirm_PassWD = "" ;



//#####################################################
//# 規約チェック
//#####################################################
function CLS_Confirm_AgreeCheck({
	inPageObj
})
{
	///////////////////////////////
	// 応答形式の取得
	let wRes = top.CLS_L_getRes({ inClassName : "CLS_Confirm", inFuncName : "CLS_Confirm_AgreeCheck" }) ;

	let wARR_Agree, wKey, wFLG_UnAgree ;
	
	///////////////////////////////
	// 各規約のチェック状態の取得
	//   1つでも未チェックなら
	//   UnAgree = true とする
	wFLG_UnAgree = false ;
	wARR_Agree = new Object() ;
	for( wKey of DEF_NEWGAME_IND_ARR_AGREE )
	{
		///////////////////////////////
		// チェック取得
		wSubRes = top.CLS_PageObj_getChecked({
			inPageObj	: inPageObj,
			inKey		: wKey
		}) ;
		if( wSubRes['Result']!=true )
		{
			//失敗
			wRes['Reason'] = "CLS_WindowCtrl_setSel is failed" ;
			top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
			return wRes ;
		}
		wARR_Agree[wKey] = wSubRes['Responce'] ;
		
		///////////////////////////////
		// 1つでも未チェックなら
		//   フラグON
		if( wARR_Agree[wKey]==false )
		{
			wFLG_UnAgree = true ;
		}
	}
	
	///////////////////////////////
	// 1つでも未チェックありなら
	// 処理を終わる
	if( wFLG_UnAgree==true )
	{
		//未チェックあり
		wRes['Result'] = true ;
		return wRes ;
	}
	
	//#####################################################
	//# ※チェックありで確定
	//#####################################################
	
	///////////////////////////////
	// 全規約無効化
	for( wKey in wARR_Agree )
	{
		///////////////////////////////
		// 無効化
		wSubRes = top.CLS_PageObj_setDisabled({
			inPageObj	: inPageObj,
			inKey		: wKey,
			inDisabled	: true
		}) ;
		if( wSubRes['Result']!=true )
		{
			//失敗
			wRes['Reason'] = "CLS_PageObj_setDisabled is failed" ;
			top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
			return wRes ;
		}
	}
	
	///////////////////////////////
	// STARTボタンの有効化
	wSubRes = top.CLS_PageObj_setDisabled({
		inPageObj	: inPageObj,
		inKey		: DEF_NEWGAME_IND_START,
		inDisabled	: false
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_PageObj_setDisabled is failed" ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return wRes ;
}



//#####################################################
//# ユーザ作成
//#####################################################
function CLS_Confirm_CreateUser()
{
	///////////////////////////////
	// 応答形式の取得
	let wRes = top.CLS_L_getRes({ inClassName : "CLS_Confirm", inFuncName : "CLS_Confirm_CreateUser" }) ;
	
	///////////////////////////////
	// 入力取得＆チェック
	wSubRes = __Confirm_CreateUser_getInputCheck() ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = wSubRes['Reason'] ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// 認証NGの場合
	//   NG理由を表示して終わる
	if( wSubRes['Responce']['Confirm']==false )
	{
		//ログ表示
		wStatus = "Create user unconfirm: [Reason]=" + wSubRes['Responce']['Reason'] ;
		top.CLS_L({ inRes:wRes, inLevel: "RR", inMessage: wStatus, inLogView:true }) ;
		
		//おわり
		return wRes ;
	}
	
	///////////////////////////////
	// ユーザ情報作成
	wSubRes = CLS_UserAdm_CreateUser({
		inParam	: wSubRes['Responce']['Param']
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_UserAdm_CreateUser is failed" ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// ログイン状態にする
	wSubRes = CLS_UserAdm_Login({
		inLogin : true
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_UserAdm_Login is failed" ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// ログ表示（コンソールだけ）
	wStatus = "User login is comfirm: [ID]=" + top.STR_GF_UserInfo_Val.ID ;
	top.CLS_L({ inRes:wRes, inLevel: "RU", inMessage: wStatus }) ;
	
	///////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return wRes ;
}

///////////////////////////////////////////////////////
// 入力取得＆チェック
function __Confirm_CreateUser_getInputCheck()
{
	///////////////////////////////
	// 応答形式の取得
	let wRes = top.CLS_L_getRes({ inClassName : "CLS_Confirm", inFuncName : "__Confirm_CreateUser_getInputCheck" }) ;
	
///	let wKey, wLen, wI, wCHR_Text, wText, wARR_UserInfo, wFLG_Deetct ;
///	let wParam ;
	let wKey, wText, wARR_UserInfo, wParam ;
	
	wRes['Responce'] = {
		"Confirm"	: false,	//認証状態 true=認証OK
		"Param"		: null		//返送パラメータ
	} ;
	
	///////////////////////////////
	// 枠を作成
	wParam = new top.STR_GF_UserInfo_Str() ;
	
	///////////////////////////////
	// 規約チェックはスキップする
	//////
	
	///////////////////////////////
	// 入力の取得
	wARR_UserInfo = new Object() ;
	for( wKey of DEF_NEWGAME_IND_USERINFO )
	{
		///////////////////////////////
		// 取得
		wSubRes = top.CLS_PageObj_getValue({
			inPageObj	: self.document,
			inKey		: wKey
		}) ;
		if( wSubRes['Result']!=true )
		{
			//失敗
			wRes['Reason'] = wSubRes['Reason'] ;
			return wRes ;
		}
		wARR_UserInfo[wKey] = wSubRes['Responce'] ;
		
		///////////////////////////////
		// 1つでも未入力なら
		//   処理やめる
		if( wARR_UserInfo[wKey]=="" )
		{
			//未入力なので止める
			wRes['Reason'] = "未入力の項目あり: There are items that have not been entered" ;
			return wRes ;
		}
	}
	
///	///////////////////////////////
///	// パスワードが2つ一緒か
///	if( wARR_UserInfo[DEF_NEWGAME_IND_PASSWORD]!=wARR_UserInfo[DEF_NEWGAME_IND_PASSWORD2] )
///	{
///		//パスワード不一致なのでおわり
///		wRes['Reason'] = "２つのパスワードが異なる" ;
///		return wRes ;
///	}
///	
	///////////////////////////////
	// ユーザIDの文字妥当性チェック
	//   1文字ずつパターンと照合する
	wText = wARR_UserInfo[DEF_NEWGAME_IND_USERID] ;
///	wLen  = wText.length ;
///	
///	///////////////////////////////
///	// 長さが許容外
///	if( wLen>DEF_CONFIRM_MAXLENGTH_USERID )
///	{
///		//許容外
///		wRes['Reason'] = "ユーザIDが長すぎる" ;
///		return wRes ;
///	}
///	
///	for( wI=0 ; wI < wLen ; wI++ )
///	{
///		///////////////////////////////
///		// 1文字取り出す
///		wCHR_Text = wText.charAt(wI) ;
///		
///		///////////////////////////////
///		// パターン照合
///		wFLG_Deetct = false ;
///		for( wKey of DEF_CONFIRM_PATTERN_USERID )
///		{
///			if( wCHR_Text==wKey )
///			{
///				//一致検出
///				wFLG_Deetct = true ;
///				break ;
///	}
///	}
///		
///		///////////////////////////////
///		// 不一致なら終わる
///		if( wFLG_Deetct==false )
///		{
///			//不一致ありなので終わる
///			wRes['Reason'] = "使用できない文字の検出: ユーザID" ;
///			return wRes ;
///	}
///	}
	wSubRes = CLS_Confirm_checkUserID({
		inID : wText
	}) ;
	if(( wSubRes['Result']!=true )&&( wSubRes['Responce']==false ))
	{
		//失敗
		wRes['Reason'] = wSubRes['Reason'] ;
		return wRes ;
	}
	///////////////////////////////
	// ユーザID OK
	wParam.ID = wText ;
	
	///////////////////////////////
	// ユーザ名の文字妥当性チェック
	wText = wARR_UserInfo[DEF_NEWGAME_IND_USERNAME] ;
///	wLen  = wText.length ;
///	
///	///////////////////////////////
///	// 長さが許容外
///	if( wLen>DEF_CONFIRM_MAXLENGTH_USERNAME )
///	{
///		//許容外
///		wRes['Reason'] = "ユーザ名が長すぎる" ;
///		return wRes ;
///	}
	wSubRes = CLS_Confirm_checkUserName({
		inName : wText
	}) ;
	if(( wSubRes['Result']!=true )&&( wSubRes['Responce']==false ))
	{
		//失敗
		wRes['Reason'] = wSubRes['Reason'] ;
		return wRes ;
	}
	///////////////////////////////
	// ユーザ名 OK
	wParam.Name = wText ;
	
	///////////////////////////////
	// ユーザIDの文字妥当性チェック
	//   1文字ずつパターンと照合する
	wText = wARR_UserInfo[DEF_NEWGAME_IND_PASSWORD] ;
///	wLen  = wText.length ;
///	
///	///////////////////////////////
///	// 長さが許容外
///	if( wLen<=DEF_CONFIRM_MINLENGTH_PASSWORD )
///	{
///		//許容外
///		wRes['Reason'] = "パスワードが短すぎる" ;
///		return wRes ;
///	}
///	if( wLen>DEF_CONFIRM_MAXLENGTH_PASSWORD )
///	{
///		//許容外
///		wRes['Reason'] = "パスワードが長すぎる" ;
///		return wRes ;
///	}
///	
///	for( wI=0 ; wI < wLen ; wI++ )
///	{
///		///////////////////////////////
///		// 1文字取り出す
///		wCHR_Text = wText.charAt(wI) ;
///		
///		///////////////////////////////
///		// パターン照合
///		wFLG_Deetct = false ;
///		for( wKey of DEF_CONFIRM_PATTERN_PASSWORD )
///		{
///			if( wCHR_Text==wKey )
///			{
///				//一致検出
///				wFLG_Deetct = true ;
///				break ;
///	}
///	}
///		
///		///////////////////////////////
///		// 不一致なら終わる
///		if( wFLG_Deetct==false )
///		{
///			//不一致ありなので終わる
///			wRes['Reason'] = "使用できない文字の検出: パスワード" ;
///			return wRes ;
///	}
///	}
	wSubRes = CLS_Confirm_checkPassWD({
		inPass1 : wARR_UserInfo[DEF_NEWGAME_IND_PASSWORD],
		inPass2 : wARR_UserInfo[DEF_NEWGAME_IND_PASSWORD2]
	}) ;
	if(( wSubRes['Result']!=true )&&( wSubRes['Responce']==false ))
	{
		//失敗
		wRes['Reason'] = wSubRes['Reason'] ;
		return wRes ;
	}
	top.CHR_PassWD = wText ;
	///////////////////////////////
	// パスワード OK
	//   ハッシュ値に変換
	wText = MD5_hexhash( wText ) ;
	wParam.PassWD = wText ;
	
	///////////////////////////////
	// 日時の取得
	wTimeDate = top.CLS_Time_getTimeDate({}) ;
	if( wTimeDate['Result']!=true )
	{
		//失敗
		wRes['Reason'] = wTimeDate['Reason'] ;
		return wRes ;
	}
	wParam.RegDate = wTimeDate['Responce'] ;
	
	///////////////////////////////
	// 正常
	wRes['Responce']['Param']   = wParam ;
	wRes['Responce']['Confirm'] = true ;	//認証OK
	wRes['Result'] = true ;
	return wRes ;
}



//#####################################################
//# ユーザID妥当性チェック
//#####################################################
function CLS_Confirm_checkUserID({
	inID
})
{
	///////////////////////////////
	// 応答形式の取得
	let wRes = top.CLS_L_getRes({ inClassName : "CLS_Confirm", inFuncName : "CLS_Confirm_checkUserID" }) ;
	
	let wI, wLen, wCHR_Text, wKey, wFLG_Deetct ;
	
	wRes['Responce'] = false ;
	
	wLen  = inID.length ;
	///////////////////////////////
	// 長さが許容外
	if( wLen>DEF_CONFIRM_MAXLENGTH_USERID )
	{
		//許容外
		wRes['Reason'] = "ユーザIDが長すぎる: User ID too long" ;
		return wRes ;
	}
	
	for( wI=0 ; wI < wLen ; wI++ )
	{
		///////////////////////////////
		// 1文字取り出す
		wCHR_Text = inID.charAt(wI) ;
		
		///////////////////////////////
		// パターン照合
		wFLG_Deetct = false ;
		for( wKey of DEF_CONFIRM_PATTERN_USERID )
		{
			if( wCHR_Text==wKey )
			{
				//一致検出
				wFLG_Deetct = true ;
				break ;
			}
		}
		
		///////////////////////////////
		// 不一致なら終わる
		if( wFLG_Deetct==false )
		{
			//不一致ありなので終わる
			wRes['Reason'] = "使用できない文字の検出（ユーザID）: Unusable character detection (user ID)" ;
			return wRes ;
		}
	}
	
	///////////////////////////////
	// 正常
	wRes['Responce'] = true ;	//認証OK
	wRes['Result'] = true ;
	return wRes ;
}



//#####################################################
//# ユーザ名妥当性チェック
//#####################################################
function CLS_Confirm_checkUserName({
	inName
})
{
	///////////////////////////////
	// 応答形式の取得
	let wRes = top.CLS_L_getRes({ inClassName : "CLS_Confirm", inFuncName : "CLS_Confirm_checkUserName" }) ;
	
	let wLen ;
	
	wRes['Responce'] = false ;
	
	wLen  = inName.length ;
	///////////////////////////////
	// 長さが許容外
	if( wLen>DEF_CONFIRM_MAXLENGTH_USERNAME )
	{
		//許容外
		wRes['Reason'] = "ユーザ名が長すぎる: username too long" ;
		return wRes ;
	}
	
	///////////////////////////////
	// 正常
	wRes['Responce'] = true ;	//認証OK
	wRes['Result'] = true ;
	return wRes ;
}



//#####################################################
//# パスワードの妥当性チェック
//#####################################################
function CLS_Confirm_checkPassWD({
	inPass1,
	inPass2
})
{
	///////////////////////////////
	// 応答形式の取得
	let wRes = top.CLS_L_getRes({ inClassName : "CLS_Confirm", inFuncName : "CLS_Confirm_checkPassWD" }) ;
	
	let wI, wLen, wCHR_Text, wKey, wFLG_Deetct ;
	
	wRes['Responce'] = false ;
	
	///////////////////////////////
	// パスワードが2つ一緒か
	if( inPass1!=inPass2 )
	{
		//パスワード不一致なのでおわり
		wRes['Reason'] = "２つのパスワードが異なる: 2 passwords are different" ;
		return wRes ;
	}
	
	wLen  = inPass1.length ;
	///////////////////////////////
	// 長さが許容外
	if( wLen<=DEF_CONFIRM_MINLENGTH_PASSWORD )
	{
		//許容外
		wRes['Reason'] = "パスワードが短すぎる: password too short" ;
		return wRes ;
	}
	if( wLen>DEF_CONFIRM_MAXLENGTH_PASSWORD )
	{
		//許容外
		wRes['Reason'] = "パスワードが長すぎる: password too long" ;
		return wRes ;
	}
	
	for( wI=0 ; wI < wLen ; wI++ )
	{
		///////////////////////////////
		// 1文字取り出す
		wCHR_Text = inPass1.charAt(wI) ;
		
		///////////////////////////////
		// パターン照合
		wFLG_Deetct = false ;
		for( wKey of DEF_CONFIRM_PATTERN_PASSWORD )
		{
			if( wCHR_Text==wKey )
			{
				//一致検出
				wFLG_Deetct = true ;
				break ;
			}
		}
		
		///////////////////////////////
		// 不一致なら終わる
		if( wFLG_Deetct==false )
		{
			//不一致ありなので終わる
			wRes['Reason'] = "使用できない文字の検出（パスワード）: Unusable character detection (password)" ;
			return wRes ;
		}
	}
	
	///////////////////////////////
	// 正常
	wRes['Responce'] = true ;	//認証OK
	wRes['Result'] = true ;
	return wRes ;
}



//#####################################################
//# コメント妥当性チェック
//#####################################################
function CLS_Confirm_checkComment({
	inComment
})
{
	///////////////////////////////
	// 応答形式の取得
	let wRes = top.CLS_L_getRes({ inClassName : "CLS_Confirm", inFuncName : "CLS_Confirm_checkComment" }) ;
	
	let wI, wLen, wCHR_Text, wKey, wFLG_Deetct ;
	
	wRes['Responce'] = false ;
	
	wLen  = inComment.length ;
	///////////////////////////////
	// 長さが許容外
	if( wLen>DEF_CONFIRM_MAXLENGTH_COMMENT )
	{
		//許容外
		wRes['Reason'] = "コメントが長すぎる: comment is too long" ;
		return wRes ;
	}
	
	for( wI=0 ; wI < wLen ; wI++ )
	{
		///////////////////////////////
		// 1文字取り出す
		wCHR_Text = inComment.charAt(wI) ;
		
		///////////////////////////////
		// パターン照合
		wFLG_Deetct = false ;
		for( wKey of DEF_CONFIRM_NOT_PATTERN_COMMENT )
		{
			if( wCHR_Text==wKey )
			{
				//一致検出
				wFLG_Deetct = true ;
				break ;
			}
		}
		
		///////////////////////////////
		// 一致なら終わる
		if( wFLG_Deetct==true )
		{
			//一致ありなので終わる
			wRes['Reason'] = "使用できない文字の検出（コメント）: Detecting invalid characters (comments)" ;
			return wRes ;
		}
	}
	
	///////////////////////////////
	// 正常
	wRes['Responce'] = true ;	//認証OK
	wRes['Result'] = true ;
	return wRes ;
}



//#####################################################
//# パスコード発行
//#####################################################
function CLS_Confirm_getPasscode()
{
	///////////////////////////////
	// 応答形式の取得
	let wRes = top.CLS_L_getRes({ inClassName : "CLS_Confirm", inFuncName : "CLS_Confirm_getPasscode" }) ;
	
	let wI, wPassCD, wLen, wRand ;
	
	///////////////////////////////
	// パスコードの生成
	wLen = DEF_CONFIRM_PATTERN_PASSCODE.length ;
	wPassCD = "" ;
	for( wI=0 ; DEF_CONFIRM_LENGTH_PASSCODE>wI ; wI++ )
	{
		wRand = top.CLS_Math_Random( wLen ) ;
		wPassCD += DEF_CONFIRM_PATTERN_PASSCODE[wRand] ;
	}
	
	///////////////////////////////
	// 正常
	wRes['Responce'] = wPassCD ;
	wRes['Result'] = true ;
	return wRes ;
}



//#####################################################
//# ログイン認証
//#####################################################
function CLS_Confirm_Login()
{
	///////////////////////////////
	// 応答形式の取得
	let wRes = top.CLS_L_getRes({ inClassName : "CLS_Confirm", inFuncName : "CLS_Confirm_Login" }) ;
	
	let wPassWD, wPassCD ;
	
	if( top.DEF_GF_TEST_LOGIN.AutoLogin==false )
	{
		///////////////////////////////
		// 入力取得
		wSubRes = __Confirm_Login_getInputCheck() ;
		if( wSubRes['Result']!=true )
		{
			//失敗
			wRes['Reason'] = wSubRes['Reason'] ;
			top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
			return wRes ;
		}
		
		///////////////////////////////
		// 入力とデータを比較
		try
		{
			wPassWD = wSubRes['Responce'][DEF_LOGIN_IND_PASSWORD] ;
			wPassCD = wSubRes['Responce'][DEF_LOGIN_IND_PASSCODE] ;
			
			top.CHR_PassWD = wPassWD ;
			///////////////////////////////
			// 入力パスワードのハッシュ化
			wPassWD = MD5_hexhash( wPassWD ) ;
			
			///////////////////////////////
			// 入力パスコードのハッシュ化
			wPassCD = MD5_hexhash( wPassCD ) ;
			
			if( wSubRes['Responce'][DEF_LOGIN_IND_USERID]!=top.STR_GF_UserInfo_Val.ID )
			{
				//失敗
///				wRes['Reason'] = "ユーザ名が違います" ;
				wRes['Reason'] = "Unmatch User ID" ;
				top.CLS_L({ inRes:wRes, inLevel: "I" }) ;
				return wRes ;
			}
			
			if( wPassWD!=top.STR_GF_UserInfo_Val.PassWD )
			{
				//失敗
///				wRes['Reason'] = "パスワードが違います" ;
				wRes['Reason'] = "Unmatch Pass Word" ;
				top.CLS_L({ inRes:wRes, inLevel: "I" }) ;
				return wRes ;
			}
			
			if( top.DEF_GF_TEST_LOGIN.PassSkip==false )
			{
				if( wPassCD!=VAL_Load_PassCode )
				{
					//失敗
///					wRes['Reason'] = "パスコードが一致しません" ;
					wRes['Reason'] = "Unmatch Pass Code" ;
					top.CLS_L({ inRes:wRes, inLevel: "I" }) ;
					return wRes ;
				}
			}
		}
		catch(e)
		{
			///////////////////////////////
			// 例外処理
///			wRes['Reason'] = "Exception: [message]=" + String( e.message )
			wRes['Reason'] = "[Exception]=" + String( e.message ) ;
			top.CLS_L({ inRes:wRes, inLevel: "A" }) ;
			return wRes ;
		}
	}
	
	///////////////////////////////
	// ログイン状態にする
	wSubRes = CLS_UserAdm_Login({
		inLogin : true
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_UserAdm_Login is failed" ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// ログ表示（コンソールだけ）
	wStatus = "User login is comfirm: [ID]=" + top.STR_GF_UserInfo_Val.ID ;
	top.CLS_L({ inRes:wRes, inLevel: "RU", inMessage: wStatus }) ;
	
	///////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return wRes ;
}

///////////////////////////////////////////////////////
// 入力取得
function __Confirm_Login_getInputCheck()
{
	///////////////////////////////
	// 応答形式の取得
	let wRes = top.CLS_L_getRes({ inClassName : "CLS_Confirm", inFuncName : "__Confirm_Login_getInputCheck" }) ;
	
	let wKey, wLen, wI, wCHR_Text, wText, wARR_UserInfo, wFLG_Deetct ;
	let wParam ;
	
	///////////////////////////////
	// 入力の取得
	wARR_UserInfo = new Object() ;
	for( wKey of DEF_LOGIN_IND_USERINFO )
	{
		///////////////////////////////
		// 取得
		wSubRes = top.CLS_PageObj_getValue({
			inPageObj	: self.document,
			inKey		: wKey
		}) ;
		if( wSubRes['Result']!=true )
		{
			//失敗
			wRes['Reason'] = wSubRes['Reason'] ;
			return wRes ;
		}
		wARR_UserInfo[wKey] = wSubRes['Responce'] ;
		
		///////////////////////////////
		// 1つでも未入力なら
		//   処理やめる
		if(( wARR_UserInfo[wKey]=="" )||( wARR_UserInfo[wKey]==null))
		{
			//未入力なので止める
			wRes['Reason'] = "未入力項目あり: You have not answered all the required questions" ;
			return wRes ;
		}
	}
	
	///////////////////////////////
	// 正常
	wRes['Responce'] = wARR_UserInfo ;
	wRes['Result'] = true ;
	return wRes ;
}



