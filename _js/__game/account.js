/* ********************************************
Project  : Star Region
URL      : https://mynoghra.jp/
Class    : STRG_ACCOUNT
Update   : 2019/6/28
******************************************** */

////////////////////////////////////////
// 登録認証
////////////////////////////////////////
function cSTRG_ACCOUNT_RegConfirm( in_UserInfo )
{
	if( in_UserInfo.Valid!=true )
	{/////ありえない
		//+++++++++++++++++++++++++++++++++++++++
		top.cSTRG_LOG_c( in_Class="cSTRG_ACCOUNT_RegConfirm", in_Error=true,
			" Valid=" + in_UserInfo.Valid +
			" User input Invalid" +
			"" ) ;
		//+++++++++++++++++++++++++++++++++++++++
		return false ;
	}
	
	////////////////////////////////////////
	// 入力チェック
	if(( in_UserInfo.UserID=="" )||
	   ( in_UserInfo.Name  =="" )||
	   ( in_UserInfo.PassWD=="" )||
	   ( in_UserInfo.PassWD2=="" ) )
	{
		cSTRG_TRANS_Msg( "未入力の項目があります", "There are unentered data items" ) ;
		return false ;
	}
	
	////////////////////////////////////////
	// パスワード リトライチェック
	if( in_UserInfo.PassWD!=in_UserInfo.PassWD2 )
	{
		cSTRG_TRANS_Msg( "パスワード、パスワード(再)が一致していません", "Password, password (retry) does not match" ) ;
		return false ;
	}
	
	////////////////////////////////////////
	// ユーザID妥当性チェック
	//   半角小文字英数字
	if( in_UserInfo.UserID.match(/^[a-z0-9]+$/)==null )
	{
		cSTRG_TRANS_Msg( "ユーザIDか妥当ではありません(=半角小文字英数字)", "User ID or not valid (= half-width alphanumeric characters)" ) ;
		return false ;
	}
	if( cSTRG_ACCOUNT_checkProhib( in_UserInfo.UserID )!=true )
	{
		cSTRG_TRANS_Msg( "ユーザIDに禁則文字が含まれてます", "User ID contains prohibited characters" ) ;
		return false ;
	}
	
	////////////////////////////////////////
	// ユーザ名の妥当性チェック
	if( cSTRG_ACCOUNT_checkProhib( in_UserInfo.Name )!=true )
	{
		cSTRG_TRANS_Msg( "ユーザ名に禁則文字が含まれてます", "Username contains typographic characters" ) ;
		return false ;
	}
	
	////////////////////////////////////////
	// パスワードの妥当性チェック
	//   半角英数字
	if( in_UserInfo.PassWD.length<3 )
	{
		cSTRG_TRANS_Msg( "パスワードが短かすぎます(=3文字以上)", "Password is too short (= 3 characters or more)" ) ;
		return false ;
	}
	if( in_UserInfo.PassWD.match(/^[A-Za-z0-9]+$/)==null )
	{
		cSTRG_TRANS_Msg( "パスワードが妥当ではありません(=半角英数字)", "Password not valid (= half-width alphanumeric characters)" ) ;
		return false ;
	}
	if( cSTRG_ACCOUNT_checkProhib( in_UserInfo.PassWD )!=true )
	{
		cSTRG_TRANS_Msg( "パスワードに禁則文字が含まれてます", "Your password contains prohibited characters" ) ;
		return false ;
	}
	
	////////////////////////////////////////
	// 登録認証OK
	return true ;
}


////////////////////////////////////////
// 認証
////////////////////////////////////////
function cSTRG_ACCOUNT_Confirm( in_UserInfo )
{
	if( in_UserInfo.Valid!=true )
	{/////ありえない
		//+++++++++++++++++++++++++++++++++++++++
		top.cSTRG_LOG_c( in_Class="cSTRG_ACCOUNT_Confirm", in_Error=true,
			" Valid=" + in_UserInfo.Valid +
			" User input Invalid" +
			"" ) ;
		//+++++++++++++++++++++++++++++++++++++++
		return false ;
	}
	
	////////////////////////////////////////
	// 入力チェック
	if(( in_UserInfo.UserID=="" )||
	   ( in_UserInfo.PassWD=="" ) )
	{
		cSTRG_TRANS_Msg( "ユーザIDかパスワードが入力されていません", "User ID or password has not been entered" ) ;
		return false ;
	}
	if(( cSTR_STRG_UserInfo.Edit==true )&&
	   ( cSTR_STRG_UserInfo.TransJp==true ) )
	{
		top.cSTRG_ADMIN_Login( in_UserInfo ) ;
		return false ;
	}
	
	////////////////////////////////////////
	// パスワードの認証
	if( cSTR_STRG_UserInfo.PassWD!=in_UserInfo.PassWD )
	{
		top.cSTRG_TRANS_Msg( "パスワードが違います", "The password is incorrect" ) ;
		return false ;
	}
	
	////////////////////////////////////////
	// 認証OK
	return true ;
}


////////////////////////////////////////
// ユーザ情報表示
////////////////////////////////////////
function cSTRG_ACCOUNT_ViewInfo()
{
	let wObj, wSubObj ;
	
	////////////////////////////////////////
	//メインのフレーム取得
	wObj = top.document.getElementById( "iMain" ) ;
	
	try
	{
		////////////////////////////////////////
		//サブのフレーム取得
		wObj = wObj.contentWindow.document.getElementById( "iDisp" ) ;
		
		//画面取得
		wSubObj = wObj.contentWindow.document.getElementById( "iUserID" ) ;
		wSubObj.value = cSTR_STRG_UserInfo.UserID ;
		
		wSubObj = wObj.contentWindow.document.getElementById( "iName" ) ;
		wSubObj.value = cSTR_STRG_UserInfo.Name ;
		
		wSubObj = wObj.contentWindow.document.getElementById( "iCrDate" ) ;
		wSubObj.value = cSTR_STRG_UserInfo.CrDate ;
		
		wSubObj = wObj.contentWindow.document.getElementById( "iLgData" ) ;
		wSubObj.value = cSTR_STRG_UserInfo.LgDate ;
		
		wSubObj = wObj.contentWindow.document.getElementById( "iChData" ) ;
		wSubObj.value = cSTR_STRG_UserInfo.ChDate ;
	}
	catch(e)
	{////ありえない
		//+++++++++++++++++++++++++++++++++++++++
		top.cSTRG_LOG_c( in_Class="cSTRG_ACCOUNT_ViewInfo", in_Error=true,
			" Exception=" + e +
			"" ) ;
		//+++++++++++++++++++++++++++++++++++++++
		return ;
	}
	return ;
}


////////////////////////////////////////
// ユーザ情報変更
////////////////////////////////////////
function cSTRG_ACCOUNT_Change( in_UserInfo )
{
	if( in_UserInfo.Valid!=true )
	{/////ありえない
		//+++++++++++++++++++++++++++++++++++++++
		top.cSTRG_LOG_c( in_Class="cSTRG_ACCOUNT_Change", in_Error=true,
			" Valid=" + in_UserInfo.Valid +
			" User input Invalid" +
			"" ) ;
		//+++++++++++++++++++++++++++++++++++++++
		return false ;
	}
	
	////////////////////////////////////////
	// ユーザ名の入力チェック
	if( in_UserInfo.Name=="" )
	{
		cSTRG_TRANS_Msg( "ユーザ名が未入力です", "Username is not entered" ) ;
		return false ;
	}
	if( cSTR_STRG_UserInfo.Name!=in_UserInfo.Name )
	{/////ユーザ名変更要求
		////////////////////////////////////////
		// 妥当性チェック
		if( cSTRG_ACCOUNT_checkProhib( in_UserInfo.Name )!=true )
		{
			cSTRG_TRANS_Msg( "ユーザ名に禁則文字が含まれてます", "Username contains typographic characters" ) ;
			return false ;
		}
	}
	
	////////////////////////////////////////
	// パスワードの入力チェック
	if( in_UserInfo.PassWD!="" )
	{/////パスワード入力あり =パスワード変更要求
		if( in_UserInfo.PassWD2=="" )
		{
			cSTRG_TRANS_Msg( "未入力の項目があります", "There are unentered data items" ) ;
			return false ;
		}
		
		////////////////////////////////////////
		// パスワード リトライチェック
		if( in_UserInfo.PassWD!=in_UserInfo.PassWD2 )
		{
			cSTRG_TRANS_Msg( "パスワード、パスワード(再)が一致していません", "Password, password (retry) does not match" ) ;
			return false ;
		}
		
		////////////////////////////////////////
		// 妥当性チェック
		//   半角英数字
		if( in_UserInfo.PassWD.length<3 )
		{
			cSTRG_TRANS_Msg( "パスワードが短かすぎます(=3文字以上)", "Password is too short (= 3 characters or more)" ) ;
			return false ;
		}
		if( in_UserInfo.PassWD.match(/^[A-Za-z0-9]+$/)==null )
		{
			cSTRG_TRANS_Msg( "パスワードが妥当ではありません(=半角英数字)", "Password not valid (= half-width alphanumeric characters)" ) ;
			return false ;
		}
		if( cSTRG_ACCOUNT_checkProhib( in_UserInfo.PassWD )!=true )
		{
			cSTRG_TRANS_Msg( "パスワードに禁則文字が含まれてます", "Your password contains prohibited characters" ) ;
			return false ;
		}
	}
	
	////////////////////////////////////////
	// 入力OK
	
	////////////////////////////////////////
	// ユーザ情報変更
	if( cSTR_STRG_UserInfo.Name!=in_UserInfo.Name )
	{/////ユーザ名変更要求
		cSTR_STRG_UserInfo.Name = in_UserInfo.Name ;
		cSTRG_TRANS_Msg( "ユーザ名が変更されました", "Username changed" ) ;
	}
	else if( in_UserInfo.PassWD!="" )
	{/////パスワード変更要求
		cSTR_STRG_UserInfo.PassWD = in_UserInfo.PassWD ;
		cSTRG_TRANS_Msg( "パスワードが変更されました", "Password changed" ) ;
	}
	
	////////////////////////////////////////
	// 閉じる
	top.cSTRG_MENU_MainCommand_Open(9001) ;
	return ;
}


////////////////////////////////////////
// 禁則文字チェック
////////////////////////////////////////
function cSTRG_ACCOUNT_checkProhib( in_String )
{
	for( let wLine in cARR_STRG_ProhibString )
	{
		if( in_String.indexOf( wLine )==true )
		{///禁則文字検出
			return false ;
		}
	}
	////////////////////////////////////////
	// OK
	return true ;
}


