//#####################################################
//# ::Project  : Galaxy Fleet
//# ::Admin    : Korei (@korei-xlix)
//# ::github   : https://github.com/korei-xlix/galaxyfleet/
//# ::Class    : ロード本体
//#
//# ::Version  : v0001
//#
//#####################################################

//#####################################################
//# ロード
//#####################################################
function CLS_Load_v0001({
	inData
})
{
	///////////////////////////////
	// 応答形式の取得
	let wRes = top.CLS_L_getRes({ inClassName : "CLS_Load", inFuncName : "CLS_Load_v0001" }) ;
	
	///////////////////////////////
	// ユーザ情報
	wSubRes = CLS_Load_v0001_UserInfo({ inData:inData }) ;
	if( wSubRes!=true )
	{
		//失敗
		wRes['Reason'] = "There is an error in the save data"
		top.CLS_L({ inRes:wRes, inLevel: "D" }) ;
		return wRes ;
	}


	
	///////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return wRes ;
}



///////////////////////////////////////////////////////
// ユーザ情報
function CLS_Load_v0001_UserInfo({
	inData
})
{
	///////////////////////////////
	// データ分離
	wSubRes = __Load_L({ inIndex : 1, inData:inData }) ;
	if( wSubRes['Result']!=true )
	{
		return false ;
	}
	wGetLine = wSubRes['Responce'] ;
	if(( wGetLine[0]!="::USERINFO::" )||( wGetLine[1]!=":::1:::" )||( wGetLine.length!=11 ))
	{
		return false ;
	}
	
	///////////////////////////////
	// パスコードのロード
	VAL_Load_PassCode = wGetLine[4] ;
	
	///////////////////////////////
	// データロード
	top.STR_GF_UserInfo_Val.ID     = wGetLine[2] ;
	top.STR_GF_UserInfo_Val.PassWD = wGetLine[3] ;


	top.STR_GF_UserInfo_Val.Name   = wGetLine[5];

	top.STR_GF_UserInfo_Val.RegDate = wGetLine[6];
	top.STR_GF_UserInfo_Val.LinDate = wGetLine[7];
	top.STR_GF_UserInfo_Val.LotDate = wGetLine[8];
	top.STR_GF_UserInfo_Val.ChgDate = wGetLine[9];
	top.STR_GF_UserInfo_Val.PwdDate = wGetLine[10];



//	wCHR_Line = ":::2:::" ;
//	wCHR_Line = wCHR_Line + DEF_SAVE_DATA_BOUNDARY + top.STR_GF_UserInfo_Val.Comment ;


	
	return true ;
}



