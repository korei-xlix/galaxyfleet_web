/* /////////////////////////////////////////////////////
::ProjectName= Star Region  
::github= https://github.com/lucida3rd/starregion_doc  
::Admin= Lucida（twitter: @lucida3rd）  
::Twitter URL= https://twitter.com/lucida3rd  
::Homepage=  https://lucida3web.wixsite.com/prof  
::Message= https://marshmallow-qa.com/lucida3poi  
::Class= STRG_Login handler
  
::Update= 2021/7/18  
///////////////////////////////////////////////////// */

/////////////////////////////////////////////////////
// ハンドラ
/////////////////////////////////////////////////////
function __hdl_PageLoad()
{
	parent.__File_reciveTimer( self.document ) ;
}

function __hdl_TestFrame()
{
	alert( "test frame" ) ;
	
}

function __hdl_ButtonClick( inID )
{
	CLS_Button_Click( inID ) ;
	
	///アクション
	switch( inID )
	{
		//////NEW GAME
		case "iBTN-New" :
			CLS_File_iframeLocationURL( this.STR_WindowCtrl_Val.PageObj, "iMain", "game/newgame.htm", CLS_STRG_handle_Main_iMainPageLoad ) ;
			break ;
		

	CLS_File_locationURL( this.STR_WindowCtrl_Val.PageObj, "main.htm" ) ;



///		//////無効化ボタン
///		case "iBTN-31" :
///			CLS_Button_Disabled( inID, inOnOff="ON" ) ;
///			break ;
///		
///		//////選択解除
///		case "iRCL-nSelect" :
///			CLS_Button_Disabled( "iBTN-31", inOnOff="OFF" ) ;
///			break ;
///			
		default:
			break ;
	}
}







/* ********************************************
Project  : Star Region
URL      : https://mynoghra.jp/
Class    : handle

Update   : 2019/6/24
******************************************** */

////////////////////////////////////////
// ページハンドラ
////////////////////////////////////////
function _hdl_PageLoad()
{
	////////////////////////////////////////
	//タイトル挿入
	cWINCTRL_setWindowTtile( parent.document, self.document ) ;
	
	////////////////////////////////////////
	//翻訳表示
	top.cSTRG_TRANS_Load() ;
	
	////////////////////////////////////////
	// 翻訳ON
	top.cSTRG_TRANS_View( true ) ;
	
	////////////////////////////////////////
	//セーブデータ出力
	cSTRG_SAVE_Out() ;
	return ;
}


////////////////////////////////////////
// ファイル読み込み
////////////////////////////////////////
function _hdl_STRG_SelectFile( event )
{
	if( cSTRG_FILE_SelectFile( event, _STRG_ReadFile_Complete )!=true )
	{////処理失敗
		return ;
	}
	top.cSTRG_INIT_AllInit() ;//全初期化
	cSTRG_FILE_ReadFile( 0 ) ;
	return ;
}
function _STRG_ReadFile_Complete()
{
	////////////////////////////////////////
	//セーブデータ ロード
	cSTRG_LOAD_CSV() ;
	return ;
}


////////////////////////////////////////
// ボタン
////////////////////////////////////////
function _hdl_STRG_Button_Click( in_ID )
{
	////////////////////////////////////////
	// [Login]
	if( in_ID==2 )
	{
		////////////////////////////////////////
		//取得
		wUserInfo = _STRG_getInput() ;
		
		////////////////////////////////////////
		//ログイン処理実行
		top.cSTRG_INIT_Login( wUserInfo ) ;
	}
	////////////////////////////////////////
	// [NEW]
	else if( in_ID==8 )
	{
		top.cSTRG_TRANS_loadPage( self.document, "newgame" ) ;
	}
	////////////////////////////////////////
	// [Close] その他
	else
	{
		parent.document.location.replace("../index.html") ;
	}
	return ;
}

function _hdl_STRG_Button_OnOff( in_ID, in_OnOff )
{
	cSTRG_BTN_Button_OnOff( in_ID, in_OnOff ) ;
	return ;
}


////////////////////////////////////////
// ユーザ情報入力取得
////////////////////////////////////////
function _STRG_getInput()
{
	let wObj, wSTR_STRG_User ;
	
	wSTR_STRG_User = new top.STR_STRG_UserInput_Str() ;
	////////////////////////////////////////
	// ユーザID、パスワードの取得
	try
	{
		if( top.cSTR_STRG_UserInfo.Debug==false )
		{////通常モード
			wObj = self.document.getElementById( "iUserID" ) ;
			wSTR_STRG_User.UserID = wObj.value ;
			
			wObj = self.document.getElementById( "iPassWD" ) ;
			wSTR_STRG_User.PassWD = MD5_hexhash( wSTR_STRG_User.UserID + wObj.value ) ;
		}
		else
////////////////////////////////////////
		{/////オートログイン
			wSTR_STRG_User.UserID = top.cSTR_STRG_UserInfo.UserID ;
			wSTR_STRG_User.PassWD = top.cSTR_STRG_UserInfo.PassWD ;
		}
////////////////////////////////////////

	}
	catch(e)
	{////ありえない
///		console.log( "_STRG_getInput: Exception: " + e ) ;
		//+++++++++++++++++++++++++++++++++++++++
		top.cSTRG_LOG_c( in_Class="_STRG_getInput", in_Error=true,
			" Exception=" + e +
			"" ) ;
		//+++++++++++++++++++++++++++++++++++++++
		return wSTR_STRG_User ;
	}
	
	////////////////////////////////////////
	// OK
	wSTR_STRG_User.Valid = true ;
	return wSTR_STRG_User ;
}


