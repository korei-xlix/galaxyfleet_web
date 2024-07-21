//#####################################################
//# ::Project  : Galaxy Fleet
//# ::Admin    : Korei (@korei-xlix)
//# ::github   : https://github.com/korei-xlix/galaxyfleet/
//# ::Class    : ユーザ作成
//#####################################################
//# ※子フレームに実装すること
//#####################################################

//#####################################################
class CLS_GF_CreateUser {
//#####################################################

//#####################################################
//# セーブデータ選択
//#####################################################
	static sSelectSaveData({
		inEvent
	})
	{
		let wSubRes, wSTR_Info ;
		
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
		let wRes = wOBJ_Win.gCLS_OSIF.sGet_Resp({ inClass:"CLS_GF_CreateUser", inFunc:"sSelectSaveData" }) ;
		
		wSTR_Info = {} ;
		
		/////////////////////////////
		// ファイルinput設定
		wSubRes = wOBJ_Win.gCLS_FileCtrl.sInputFile({
			inPageObj	: wOBJ_Win.gSTR_CldInfo.cPageObj,
			inID		: wOBJ_Op.DEF_GF_IDX_NEWGAME_SELECT_SAVEDATAPATH,
			inFileName	: wOBJ_Op.DEF_GF_SAVEDATA_FILE
		}) ;
		if( wSubRes['Result']!=true )
		{///失敗
			wRes['Reason'] = "gCLS_FileCtrl.sInputFile is failed" ;
			wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"B", inLine:wOBJ_Op.__LINE__ }) ;
			return wRes ;
		}
		
		/////////////////////////////
		// ファイル選択
		wSubRes = wOBJ_Win.gCLS_FileCtrl.sSelectFile({
			inEvent		: inEvent,
			outSTR_Info	: wSTR_Info
		}) ;
		if( wSubRes['Result']!=true )
		{///失敗
			wRes['Reason'] = "gCLS_FileCtrl.sSelectFile is failed" ;
			wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"B", inLine:wOBJ_Op.__LINE__ }) ;
			return wRes ;
		}
		
		/////////////////////////////
		// セーブデータパス表示
		wSubRes = wOBJ_Win.gCLS_PageObj.sSetValue({
			inPageObj	: wOBJ_Win.gSTR_CldInfo.cPageObj,
			inKey		: wOBJ_Op.DEF_GF_IDX_NEWGAME_SAVEDATAPATH,
			inCode		: wSTR_Info['Name']
		}) ;
		if( wSubRes['Result']!=true )
		{///失敗
			wRes['Reason'] = "CLS_PageObj.sSetValue is failed" ;
			wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"D", inLine:wOBJ_Op.__LINE__ }) ;
			return wRes ;
		}
		
		/////////////////////////////
		// セーブデータ設定
		wOBJ_Op.STR_GF_UserInfo.STR_SaveInfo = wSTR_Info ;
		wOBJ_Op.STR_GF_UserInfo.FLG_Save = true ;
		
		/////////////////////////////
		// 正常
		wRes['Result'] = true ;
		return wRes ;
	}



//#####################################################
//# ユーザ作成
//#####################################################
	static sCreate()
	{
		let wSubRes, wSTR_Input, wSTR_Login, wCLS_MD5, wPassWD ;
		
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
		let wRes = wOBJ_Win.gCLS_OSIF.sGet_Resp({ inClass:"CLS_GF_CreateUser", inFunc:"sCreate" }) ;
		
		wSubRes['Responce'] = false ;
		
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
		//	wSTR_Input[wOBJ_Op.DEF_GF_IDX_NEWGAME_USERID]
		//	wSTR_Input[wOBJ_Op.DEF_GF_IDX_NEWGAME_USERNAME]
		//	wSTR_Input[wOBJ_Op.DEF_GF_IDX_NEWGAME_PASSWORD]
		
		wPassWD = wSTR_Input[wOBJ_Op.DEF_GF_IDX_NEWGAME_PASSWORD] ;
		/////////////////////////////
		// パスワードをハッシュ値に変換する
		wCLS_MD5 = new CLS_MD5() ;	//MD5クラス実体化
		wSTR_Input[wOBJ_Op.DEF_GF_IDX_NEWGAME_PASSWORD] = wCLS_MD5.MD5_hexhash({ inPass:wSTR_Input[wOBJ_Op.DEF_GF_IDX_NEWGAME_PASSWORD] }) ;
		
		/////////////////////////////
		// ユーザ情報作成
		wSubRes = this.__sSetUserInfo({
			inUserInfo	: wSTR_Input
		}) ;
		if( wSubRes['Result']!=true )
		{///失敗か認証NG
			wRes['Reason'] = "__sSetUserInfo is failed" ;
			wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"B", inLine:wOBJ_Op.__LINE__ }) ;
			return wRes ;
		}
		
		/////////////////////////////
		// ユーザ承認
		wSTR_Login = new wOBJ_Op.STR_GF_UserInfoLogin_Str() ;
		wSTR_Login.ID     = wSTR_Input[wOBJ_Op.DEF_GF_IDX_NEWGAME_USERID] ;
		wSTR_Login.PassWD = wPassWD ;
		
		//### 承認処理
		wSubRes = CLS_GF_Confirm.sConfirm({
			inID : wSTR_Login.ID,
			inPW : wSTR_Login.PassWD
		}) ;
		if( wSubRes['Result']!=true )
		{///失敗
			wRes['Reason'] = "CLS_GF_Confirm.sCheckSaveData is failed" ;
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
		wRes['Responce'] = true ;	//作成＆承認OK
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
		let wRes = wOBJ_Win.gCLS_OSIF.sGet_Resp({ inClass:"CLS_GF_CreateUser", inFunc:"__sGetInput" }) ;
		
		pInput = outData ;
		
		/////////////////////////////
		// 入力取得
		for( wKey of wOBJ_Op.DEF_GF_ARR_NEWGAME_USERINFO )
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
		//	pInput[wOBJ_Op.DEF_GF_IDX_NEWGAME_USERID]
		//	pInput[wOBJ_Op.DEF_GF_IDX_NEWGAME_USERNAME]
		//	pInput[wOBJ_Op.DEF_GF_IDX_NEWGAME_PASSWORD]
		//	pInput[wOBJ_Op.DEF_GF_IDX_NEWGAME_PASSWORD2]
		
		/////////////////////////////
		// セーブデータ選択のチェック
		wSubRes = CLS_GF_Confirm.sCheckSaveData() ;
		if(( wSubRes['Result']!=true ) || ( wSubRes['Responce']!=true ))
		{///失敗か認証NG
			wRes['Reason'] = "CLS_GF_Confirm.sCheckSaveData is failed" ;
			wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"B", inLine:wOBJ_Op.__LINE__ }) ;
			return wRes ;
		}
		
		/////////////////////////////
		// 取得値のチェック：ユーザID
		wSubRes = CLS_GF_Confirm.sCheckUserID({
			inID : pInput[wOBJ_Op.DEF_GF_IDX_NEWGAME_USERID]
		}) ;
		if(( wSubRes['Result']!=true ) || ( wSubRes['Responce']!=true ))
		{///失敗か認証NG
			wRes['Reason'] = "CLS_GF_Confirm.sCheckUserID is failed: UserID=" + String(pInput[wOBJ_Op.DEF_GF_IDX_NEWGAME_USERID]) ;
			wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"B", inLine:wOBJ_Op.__LINE__ }) ;
			return wRes ;
		}
		
		/////////////////////////////
		// 取得値のチェック：ユーザ名
		wSubRes = CLS_GF_Confirm.sCheckUserName({
			inName : pInput[wOBJ_Op.DEF_GF_IDX_NEWGAME_USERNAME]
		}) ;
		if(( wSubRes['Result']!=true ) || ( wSubRes['Responce']!=true ))
		{///失敗か認証NG
			wRes['Reason'] = "CLS_GF_Confirm.sCheckUserName is failed: UserName=" + String(pInput[wOBJ_Op.DEF_GF_IDX_NEWGAME_USERNAME]) ;
			wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"B", inLine:wOBJ_Op.__LINE__ }) ;
			return wRes ;
		}
		
		/////////////////////////////
		// 取得値のチェック：パスワード
		wSubRes = CLS_GF_Confirm.sCheckPassWD({
			inPW1 : pInput[wOBJ_Op.DEF_GF_IDX_NEWGAME_PASSWORD],
			inPW2 : pInput[wOBJ_Op.DEF_GF_IDX_NEWGAME_PASSWORD2]
		}) ;
		if(( wSubRes['Result']!=true ) || ( wSubRes['Responce']!=true ))
		{///失敗か認証NG
			wRes['Reason'] = "CLS_GF_Confirm.sCheckPassWD is failed" ;
			wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"B", inLine:wOBJ_Op.__LINE__ }) ;
			return wRes ;
		}
		
		/////////////////////////////
		// 正常
		wRes['Result'] = true ;
		return wRes ;
	}



///////////////////////////////////////////////////////
//  ユーザ情報セット
///////////////////////////////////////////////////////
	static __sSetUserInfo({
		inUserInfo,
		inSavePath
	})
	{
		let wSubRes, wTimeDate, wMessage ;
		
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
		let wRes = wOBJ_Win.gCLS_OSIF.sGet_Resp({ inClass:"CLS_GF_CreateUser", inFunc:"__sSetUserInfo" }) ;
		
		/////////////////////////////
		// 日時の取得
		wTimeDate = wOBJ_Op.gSTR_Time.TimeDate ;
		
		/////////////////////////////
		// ログインリセット（念のため）
		wOBJ_Op.STR_GF_UserInfo.FLG_Confirm = false ;
		
		/////////////////////////////
		// ユーザ情報を保存
		wOBJ_Op.STR_GF_UserInfo.ID		= inUserInfo[wOBJ_Op.DEF_GF_IDX_NEWGAME_USERID] ;
		wOBJ_Op.STR_GF_UserInfo.Name	= inUserInfo[wOBJ_Op.DEF_GF_IDX_NEWGAME_USERNAME] ;
		wOBJ_Op.STR_GF_UserInfo.PassWD	= inUserInfo[wOBJ_Op.DEF_GF_IDX_NEWGAME_PASSWORD] ;
		
		//### 時間のセット
		wOBJ_Op.STR_GF_UserInfo.RegDate	= wTimeDate ;	//  登録日時
		wOBJ_Op.STR_GF_UserInfo.LinDate	= wTimeDate ;	//  ログイン日時（今回）
		wOBJ_Op.STR_GF_UserInfo.LotDate	= wTimeDate ;	//  データ更新日時（セーブ出力時）
		wOBJ_Op.STR_GF_UserInfo.ChgDate	= wTimeDate ;	//  前回ユーザ変更日時
		wOBJ_Op.STR_GF_UserInfo.PwdDate	= wTimeDate ;	//  前回パスワード変更日時
		
		//### デバッグ表示
		if( top.DEF_INDEX_TEST==true )
		{
			wMessage = "Create User: User ID=" + String(wOBJ_Op.STR_GF_UserInfo.ID) ;
			wMessage = wMessage + '\n' + "  Name    = " + String(wOBJ_Op.STR_GF_UserInfo.Name) ;
			wMessage = wMessage + '\n' + "  Hash    = " + String(wOBJ_Op.STR_GF_UserInfo.PassWD) ;
			wMessage = wMessage + '\n' + "  RegDate = " + String(wOBJ_Op.STR_GF_UserInfo.RegDate) ;
			wMessage = wMessage + '\n' + "  LinDate = " + String(wOBJ_Op.STR_GF_UserInfo.LinDate) ;
			wMessage = wMessage + '\n' + "  LotDate = " + String(wOBJ_Op.STR_GF_UserInfo.LotDate) ;
			wMessage = wMessage + '\n' + "  ChgDate = " + String(wOBJ_Op.STR_GF_UserInfo.ChgDate) ;
			wMessage = wMessage + '\n' + "  PwdDate = " + String(wOBJ_Op.STR_GF_UserInfo.PwdDate) ;
			wOBJ_Win.gCLS_L.sL({ inRes:wRes, inLevel:"X", inMessage:wMessage }) ;
		}
		
		/////////////////////////////
		// 正常
		wRes['Result'] = true ;
		return wRes ;
	}



//#####################################################
}

var gCLS_GF_CreateUser = new CLS_GF_CreateUser() ;
gCLS_GF_CreateUser = gCLS_GF_CreateUser.constructor ;


