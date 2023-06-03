/* ********************************************
Project  : Star Region
URL      : https://mynoghra.jp/

Version  : 0004
Update   : 2019/6/22
******************************************** */

////////////////////////////////////////
//ロード
////////////////////////////////////////
function cSTRG_LOAD_CSV__0004()
{
//	let wFlg ;
//	
//	wFlg = top.cSTR_STRG_UserInfo.Debug ;
//	////////////////////////////////////////
//	//ロード前初期化
//	top.cSTR_STRG_UserInfo = new top.STR_STRG_UserInfo_Str() ;
//	top.cSTR_STRG_MateInfo = new top.STR_STRG_MateInfo_Str() ;
//	top.cSTR_STRG_AlchemyInfo = new top.STR_STRG_AlchemyInfo_Str() ;
//	
//	top.cSTR_STRG_UserInfo.Debug = wFlg ;
	////////////////////////////////////////
	//ロード
	_STRG_LOAD_CSV__0004__UserInfo_1() ;
	_STRG_LOAD_CSV__0004__UserInfo_2() ;
	_STRG_LOAD_CSV__0004__AlchemyInfo() ;
	
	////////////////////////////////////////
	//ハッシュチェック
	return cSTRG_LOAD_checkHash() ;
}


////////////////////////////////////////
////////////////////////////////////////

////////////////////////////////////////
//ユーザ情報1
////////////////////////////////////////
// [0]: ユーザID
// [1]: ユーザ名
// [2]: パスワード(ハッシュ値)
// [3]: 登録日時
// [4]: 更新日時
////////////////////////////////////////
function _STRG_LOAD_CSV__0004__UserInfo_1()
{
	if( top.cSTR_STRG_SaveInfo.FlgError==true )
	{/////エラー中
		return false ;
	}
	
	let wGet_Line ;
	
	////////////////////////////////////////
	//ヘッダのチェック
	_STRG_LOAD_checkHead( "::USERINFO::" ) ;
	
	////////////////////////////////////////
	// 1行ロード
	wGet_Line = _STRG_LOAD_lineLoad( in_Len=5, in_Tag="-1-", in_SetHash=true ) ;
	if( top.cSTR_STRG_SaveInfo.FlgError==true )
	{/////エラー発生
		return false ;
	}
	
	////////////////////////////////////////
	//★★★★★★★
	//データのロード
	top.cSTR_STRG_UserInfo.UserID = wGet_Line[0] ;
	top.cSTR_STRG_UserInfo.Name   = wGet_Line[1] ;
	top.cSTR_STRG_UserInfo.PassWD = wGet_Line[2] ;
	top.cSTR_STRG_UserInfo.CrDate = wGet_Line[3] ;
///	top.cSTR_STRG_UserInfo.LgDate					//**ログイン時に自動入力
	top.cSTR_STRG_UserInfo.ChDate = wGet_Line[4] ;
	
	////////////////////////////////////////
	//正常
	return true ;
}


////////////////////////////////////////
//ユーザ情報2  資源
////////////////////////////////////////
// [0]: 燃料
// [1]: 希金
// [2]: 鋼材
// [3]: 合板
// [4]: 核石
// [5]: 輝石
// [6]: 弾薬
// [7]: 資金
// [8]: 屑石
// [9]: 高速建造
////////////////////////////////////////
function _STRG_LOAD_CSV__0004__UserInfo_2()
{
	if( top.cSTR_STRG_SaveInfo.FlgError==true )
	{/////エラー中
		return false ;
	}
	
	let wGet_Line ;
	
	////////////////////////////////////////
	//**ヘッダのチェックはない
	
	////////////////////////////////////////
	// 1行ロード
	wGet_Line = _STRG_LOAD_lineLoad( in_Len=10, in_Tag="-2-", in_SetHash=true ) ;
	if( top.cSTR_STRG_SaveInfo.FlgError==true )
	{/////エラー発生
		return false ;
	}
	
	////////////////////////////////////////
	//★★★★★★★
	//データのロード
	top.cSTR_STRG_MateInfo.Data.Fuel.Value = top.MATH_ValParse( wGet_Line[0] ) ;
	top.cSTR_STRG_MateInfo.Data.RerM.Value = top.MATH_ValParse( wGet_Line[1] ) ;
	top.cSTR_STRG_MateInfo.Data.Stel.Value = top.MATH_ValParse( wGet_Line[2] ) ;
	top.cSTR_STRG_MateInfo.Data.HyPl.Value = top.MATH_ValParse( wGet_Line[3] ) ;
	top.cSTR_STRG_MateInfo.Data.CorS.Value = top.MATH_ValParse( wGet_Line[4] ) ;
	top.cSTR_STRG_MateInfo.Data.GliS.Value = top.MATH_ValParse( wGet_Line[5] ) ;
	top.cSTR_STRG_MateInfo.Data.Ammo.Value = top.MATH_ValParse( wGet_Line[6] ) ;
	top.cSTR_STRG_MateInfo.Data.Capt.Value = top.MATH_ValParse( wGet_Line[7] ) ;
	top.cSTR_STRG_MateInfo.Data.Scrp.Value = top.MATH_ValParse( wGet_Line[8] ) ;
	top.cSTR_STRG_MateInfo.Data.HSConst.Value = top.MATH_ValParse( wGet_Line[9] ) ;
	
	////////////////////////////////////////
	//正常
	return true ;
}


////////////////////////////////////////
//錬金情報
////////////////////////////////////////
// [0][0]: 錬金元資源
//    [1]: セット設定数
//    [2]: カウンタ
//    [3]: 錬金先資源
// ...
// [2]
////////////////////////////////////////
function _STRG_LOAD_CSV__0004__AlchemyInfo()
{
	if( top.cSTR_STRG_SaveInfo.FlgError==true )
	{/////エラー中
		return false ;
	}
	
	let wGet_Line ;
	let wI, wIndex, wKey, wARR_Line ;
	
	////////////////////////////////////////
	//ヘッダのチェック
	_STRG_LOAD_checkHead( "::ALCHEMYINFO::" ) ;
	
	////////////////////////////////////////
	// 1行ロード
	wGet_Line = _STRG_LOAD_lineLoad( in_Len=3, in_Tag="-3-", in_SetHash=true ) ;
	if( top.cSTR_STRG_SaveInfo.FlgError==true )
	{/////エラー発生
		return false ;
	}
	
	////////////////////////////////////////
	//★★★★★★★
	//データのロード
	wIndex = 0 ;
	for( wI=1 ; 3>=wI ; wI++, wIndex++ )
	{
		wKey = "Data" + wI ;
		wARR_Line = wGet_Line[wIndex].split(",") ;
		if( wARR_Line.length!=4 )
		{/////データエラー
			top.cSTR_STRG_SaveInfo.FlgError = true ;
			return false ;
		}
		
		top.cSTR_STRG_AlchemyInfo[wKey].SrcKind = wARR_Line[0] ;
		top.cSTR_STRG_AlchemyInfo[wKey].SrcNums = top.MATH_ValParse( wARR_Line[1] ) ;
		top.cSTR_STRG_AlchemyInfo[wKey].Counter = top.MATH_ValParse( wARR_Line[2] ) ;
		top.cSTR_STRG_AlchemyInfo[wKey].DstKind = wARR_Line[3] ;
	}
	
	////////////////////////////////////////
	//正常
	return true ;
}


