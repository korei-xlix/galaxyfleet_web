//#####################################################
//# ::Project  : Galaxy Fleet
//# ::Admin    : Korei (@korei-xlix)
//# ::github   : https://github.com/korei-xlix/galaxyfleet_web
//# ::Class    : ハンドラ - ログイン画面
//#####################################################

//#####################################################
//# [SELECT FILE]ボタン
//#####################################################
function __handle_Login_SelectFile( inEvent )
{
	//###########################
	//# 応答形式の取得
	//#   "Result" : false, "Class" : "(none)", "Func" : "(none)", "Result" : false, "Reason" : "(none)", "Responce" : "(none)"
	let wRes = CLS_OSIF.sGet_Resp({ inClass:"__handle", inFunc:"__handle_Login_SelectFile" }) ;
	
	let wSubRes ;
	
	/////////////////////////////
	// ファイルロード
	wSubRes = CLS_Load_Load({
		inEvent : inEvent
	}) ;
	if( wSubRes['Result']!=true )
	{///失敗
		wRes['Reason'] = "CLS_Load_Load is failed" ;
		CLS_L.sL({ inRes:wRes, inLevel:"B", inLine:__LINE__ }) ;
		return wRes ;
	}
	
	/////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return ;
}



