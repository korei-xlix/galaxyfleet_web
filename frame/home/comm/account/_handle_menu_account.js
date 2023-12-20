//#####################################################
//# ::Project  : Galaxy Fleet
//# ::Admin    : Korei (@korei-xlix)
//# ::github   : https://github.com/korei-xlix/galaxyfleet/
//# ::Class    : ハンドラ - アカウント
//#####################################################

//#####################################################
//# [Change Comment]ボタン
//#####################################################
function __handle_ChangeComment()
{



	return ;
}



//#####################################################
//# [CHANGE xxxx]ボタン
//#####################################################
function __handle_Account_OpenCtrl( inKey )
{
	///////////////////////////////
	// 応答形式の取得 (LogView)
	let wRes = top.CLS_L_getRes({ inClassName : "__handle_account", inFuncName : "__handle_Account_OpenCtrl", inMark : true }) ;
	
	top.ARR_WindowCtrl_Frame[top.DEF_GF_FRAMEID['COMM']].FrameObj.contentWindow.__handle_Account_OpenCtrl({inKey:inKey}) ;
	return ;
}



