//#####################################################
//# ::Project  : Galaxy Fleet
//# ::Admin    : Korei (@korei-xlix)
//# ::github   : https://github.com/korei-xlix/galaxyfleet/
//# ::Class    : セーブ処理
//#####################################################
//#
//# バージョン情報
var DEF_SAVE_VERSION = "v0001" ;
//#
//#####################################################



//#####################################################
//# クラス定数
//#####################################################

///////////////////////////////
// 境界
var DEF_SAVE_DATA_BOUNDARY = "|+|" ;
var DEF_SAVE_HASH_BOUNDARY = "|@|" ;



//#####################################################
//# クラス変数
//#####################################################

///////////////////////////////
// セーブ退避
var VAL_SAVE_Data = "" ;

///////////////////////////////
// 収集Hash
var VAL_SAVE_Hash = "" ;

///////////////////////////////
// パスコード退避
var VAL_SAVE_PassCode = "" ;



//#####################################################
//# セーブ出力
//#####################################################
function CLS_Save_Out()
{
	///////////////////////////////
	// 応答形式の取得
	let wRes = top.CLS_L_getRes({ inClassName : "CLS_Save", inFuncName : "CLS_Save_Out" }) ;
	
	let wPassCode, wPassCode_Hash ;
	
	///////////////////////////////
	// ログイン中か
	if( top.STR_GF_UserInfo_Val.FLG_Login==false )
	{
		//ログオフ中なら抜ける
		wRes['Result'] = true ;
		return wRes ;
	}
	
	///////////////////////////////
	// データ更新日時の変更
	wTimeDate = top.CLS_Time_getTimeDate({}) ;
	if( wTimeDate['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_Time_getTimeDate is failed" ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	top.STR_GF_UserInfo_Val.LotDate = wTimeDate['Responce'] ;
	
	///////////////////////////////
	// パスコードの発行
	wSubRes = CLS_Confirm_getPasscode() ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_Confirm_getPasscode is failed" ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	wPassCode = wSubRes['Responce'] ;
	
	///////////////////////////////
	// パスコードのハッシュ化
	wPassCode_Hash = MD5_hexhash( wPassCode ) ;
	
	///////////////////////////////
	// 初期化
	VAL_SAVE_Data = "" ;
	VAL_SAVE_Hash = "" ;
	
	///////////////////////////////
	// データ出力
	__Save_Version({}) ;
	__Save_UserInfo({ inPassCode : wPassCode_Hash }) ;
	
	///////////////////////////////
	// セーブ出力
	wSubRes = top.CLS_PageObj_setValue({
		inPageObj	: self.document,
		inKey		: DEF_LOGIN_IND_SAVEOUT,
		inCode		: VAL_SAVE_Data
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_PageObj_setValue is failed(Save out)" ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// パスコード出力
	wSubRes = top.CLS_PageObj_setValue({
		inPageObj	: self.document,
		inKey		: DEF_LOGIN_IND_SAVEPASSCODE,
		inCode		: wPassCode
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_PageObj_setValue is failed(Pass code)" ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// セーブ退避したらログオフする
	wSubRes = CLS_UserAdm_Login({
		inLogin : false
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_UserAdm_Login is failed" ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// 退避をクリアする
	VAL_SAVE_Data = "" ;
	VAL_SAVE_Hash = "" ;
	
///	///////////////////////////////
///	// プレイ記録
///	if( top.FLG_GLOBAL_JP==true )
///	{
///		wMsg = "ログオフしました" ;
///	}
///	else
///	{
///		wMsg = "You are logged off now" ;
///	}
///	top.CLS_GF_L({inMsg:wMsg}) ;
///	top.CLS_L({ inRes:wRes, inLevel: "RU", inMessage: wMsg }) ;
///	
	///////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return wRes ;
}

///////////////////////////////////////////////////////
// 出力形成
function __Save_L({
	inData,
	inHeader
})
{
	///////////////////////////////
	// 応答形式の取得
	let wRes = top.CLS_L_getRes({ inClassName : "CLS_Save", inFuncName : "__Save_L" }) ;
	
	let wHash, wLine ;
	
	///////////////////////////////
	//ヘッダー生成
	wLine = "::" + inHeader + "::" + DEF_SAVE_DATA_BOUNDARY + inData ;
	
	///////////////////////////////
	//ハッシュ値の計算
	wHash = MD5_hexhash( wLine ) ;
	
	///////////////////////////////
	//データ出力
	wLine = wLine + DEF_SAVE_HASH_BOUNDARY + wHash + '\n' ;
	VAL_SAVE_Data = VAL_SAVE_Data + wLine ;
	
	///////////////////////////////
	//ハッシュ値の収集
	VAL_SAVE_Hash = VAL_SAVE_Hash + wHash ;
	
	///////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return wRes ;
}



//#####################################################
//# バージョン情報
//#####################################################
function __Save_Version({
	inHeader = "VERSION"
})
{
	let wCHR_Line ;
	
	///////////////////////////////
	// データ
	wCHR_Line = ":::1:::" ;
	wCHR_Line = wCHR_Line + DEF_SAVE_DATA_BOUNDARY + DEF_SAVE_VERSION ;
	//// 出力
	__Save_L({ inData:wCHR_Line, inHeader:inHeader }) ;
	
	return ;
}



//#####################################################
//# ユーザ情報
//#####################################################
function __Save_UserInfo({
	inHeader = "USERINFO",
	inPassCode
})
{
	let wCHR_Line, wARR_Data ;
	
	///////////////////////////////
	// データ
	wCHR_Line = ":::1:::" ;
	wCHR_Line = wCHR_Line + DEF_SAVE_DATA_BOUNDARY + top.STR_GF_UserInfo_Val.ID ;
	wCHR_Line = wCHR_Line + DEF_SAVE_DATA_BOUNDARY + top.STR_GF_UserInfo_Val.PassWD ;
	
	wCHR_Line = wCHR_Line + DEF_SAVE_DATA_BOUNDARY + inPassCode ;
	wCHR_Line = wCHR_Line + DEF_SAVE_DATA_BOUNDARY + top.STR_GF_UserInfo_Val.Name ;
	
	wCHR_Line = wCHR_Line + DEF_SAVE_DATA_BOUNDARY + top.STR_GF_UserInfo_Val.RegDate ;
	wCHR_Line = wCHR_Line + DEF_SAVE_DATA_BOUNDARY + top.STR_GF_UserInfo_Val.LinDate ;
	wCHR_Line = wCHR_Line + DEF_SAVE_DATA_BOUNDARY + top.STR_GF_UserInfo_Val.LotDate ;
	wCHR_Line = wCHR_Line + DEF_SAVE_DATA_BOUNDARY + top.STR_GF_UserInfo_Val.ChgDate ;
	wCHR_Line = wCHR_Line + DEF_SAVE_DATA_BOUNDARY + top.STR_GF_UserInfo_Val.PwdDate ;
	//// 出力
	__Save_L({ inData:wCHR_Line, inHeader:inHeader }) ;
	
	wCHR_Line = ":::2:::" ;
	wARR_Data = top.STR_GF_UserInfo_Val.Comment.replace( '\n', "<br />" ) ;
	wCHR_Line = wCHR_Line + DEF_SAVE_DATA_BOUNDARY + wARR_Data ;
	//// 出力
	__Save_L({ inData:wCHR_Line, inHeader:inHeader }) ;
	
	return ;
}



