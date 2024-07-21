//#####################################################
//# ::Project  : Galaxy Fleet
//# ::Admin    : Korei (@korei-xlix)
//# ::github   : https://github.com/korei-xlix/galaxyfleet/
//# ::Class    : ユーザ管理
//#####################################################



//#####################################################
//# ユーザ作成
//#####################################################
function CLS_UserAdm_CreateUser({
	inParam
})
{
	///////////////////////////////
	// 応答形式の取得
	let wRes = top.CLS_L_getRes({ inClassName : "CLS_UserAdm", inFuncName : "CLS_UserAdm_CreateUser" }) ;
	
	let wTimeDate ;
	
	///////////////////////////////
	// 日時の取得
	wTimeDate = top.CLS_Time_getTimeDate({}) ;
	if( wTimeDate['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_Time_getTimeDate is failed" ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// ユーザ情報を保存
	top.STR_GF_UserInfo_Val = inParam ;
	
	///////////////////////////////
	// 日付の保存
	top.STR_GF_UserInfo_Val.RegDate = wTimeDate['Responce'] ;
	top.STR_GF_UserInfo_Val.LinDate = wTimeDate['Responce'] ;
	top.STR_GF_UserInfo_Val.LotDate = wTimeDate['Responce'] ;
	top.STR_GF_UserInfo_Val.ChgDate = wTimeDate['Responce'] ;
	top.STR_GF_UserInfo_Val.PwdDate = wTimeDate['Responce'] ;
	
	///////////////////////////////
	// ログ表示（コンソールだけ）
	wStatus = "Create user: [ID]=" + top.STR_GF_UserInfo_Val.ID ;
	top.CLS_L({ inRes:wRes, inLevel: "R", inMessage: wStatus }) ;
	
	///////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return wRes ;
}



//#####################################################
//# ログイン操作
//#####################################################
function CLS_UserAdm_Login({
	inLogin
})
{
	///////////////////////////////
	// 応答形式の取得
	let wRes = top.CLS_L_getRes({ inClassName : "CLS_UserAdm", inFuncName : "CLS_UserAdm_Login" }) ;
	
	let wStatus ;
	
	///////////////////////////////
	// ログと日付の変更
	if( inLogin==true )
	{
		///////////////////////////////
		// ログインの場合
		//   ログイン状態にする
		
		wTimeDate = top.CLS_Time_getTimeDate({}) ;
		if( wTimeDate['Result']!=true )
		{
			//失敗
			wRes['Reason'] = "CLS_Time_getTimeDate is failed" ;
			top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
			return wRes ;
		}
		top.STR_GF_UserInfo_Val.LinDate = wTimeDate['Responce'] ;
		
		top.STR_GF_UserInfo_Val.FLG_Login = inLogin ;
///		wStatus = "User is logined" ;
	}
	else
	{
		///////////////////////////////
		// ログオフの場合
		//   ユーザ情報を初期化する（ログオフ）
		top.STR_GF_UserInfo_Val = new top.STR_GF_UserInfo_Str() ;
		
///		wStatus = "User is logouted" ;
		///////////////////////////////
		// ログ表示（コンソールだけ）
		wStatus = "User logoffed: [ID]=" + top.STR_GF_UserInfo_Val.ID ;
		top.CLS_L({ inRes:wRes, inLevel: "RU", inMessage: wStatus }) ;
		
	}
///	wStatus = wStatus + ": [ID]=" + top.STR_GF_UserInfo_Val.ID ;
///	top.CLS_L({ inRes:wRes, inLevel: "RU", inMessage: wStatus }) ;
///	
	///////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return wRes ;
}



