/* ********************************************
Project  : Star Region
URL      : https://mynoghra.jp/

Version  : 0002 → 0003
Update   : 2019/6/16
******************************************** */

////////////////////////////////////////
//ロード
////////////////////////////////////////
function cSTRG_LOAD_CSV__0002()
{
	////////////////////////////////////////
	//ロード
	_STRG_LOAD_CSV__0002__UserInfo_1() ;
	_STRG_LOAD_CSV__0002__UserInfo_2() ;
	
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
function _STRG_LOAD_CSV__0002__UserInfo_1()
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
function _STRG_LOAD_CSV__0002__UserInfo_2()
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
	wGet_Line = _STRG_LOAD_lineLoad( in_Len=9, in_Tag="-2-", in_SetHash=true ) ;
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
///	top.cSTR_STRG_MateInfo.Data.HSConst.Value = top.MATH_ValParse( wGet_Line[9] ) ;
	
	////////////////////////////////////////
	//正常
	return true ;
}


