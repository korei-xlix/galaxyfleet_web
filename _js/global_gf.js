//#####################################################
//# ::Project  : Galaxy Fleet
//# ::Admin    : Korei (@korei-xlix)
//# ::github   : https://github.com/korei-xlix/galaxyfleet_web
//# ::Class    : グローバル定数/変数
//#####################################################
//# 更新履歴
//# 0.1.0.0		2024-07-21	ログイン画面実装



//# 1.0.0.0		2024-xx-xx	正式リリース
//#
//#####################################################

//###########################
//# ※ユーザ自由変更※

//### システム情報
var DEF_GF_SYS_VERSION			= "0.1.0.0" ;				// ゲームver
var DEF_GF_SYS_LOAD_VERSION		= "L0000_01" ;				// ロードver
var DEF_GF_SYS_SAVE_VERSION		= "S0000_01" ;				// セーブver
	
var DEF_GF_SYS_USERID			= "webadmin" ;				// デフォルトユーザ
var DEF_GF_SYS_SYSNAME			= "Galaxy Fleet" ;			// システム名
var DEF_GF_SYS_AUTHOR			= 'korei (X:@korei_xlix)' ;	// HTMLのauthor表示
var DEF_GF_SYS_GITHUB			= "https://github.com/korei-xlix/galaxyfleet_web/" ;
var DEF_GF_SYS_SITEURL			= "https://galaxy-fleet.koreis-labo.com/" ;

//### セーブデータ情報
var DEF_GF_SAVEDATA_FILE		= "gf_savedata.dat" ;



//###########################
//# ※以下はいじれない※

//#####################################################
//# 定数（ファイルパス）
//#####################################################

var DEF_GF_FILEPATH_INDEX		= "/index.html" ;				//メイン画面
var DEF_GF_FILEPATH_MAIN		= "/main.htm" ;					//メイン画面

var DEF_GF_FILEPATH_LOGIN		= "/frame/login/login.htm" ;	//ログイン画面
var DEF_GF_FILEPATH_NEWGAME		= "/frame/login/newgame.htm" ;	//ニューゲーム
var DEF_GF_FILEPATH_USERCONF	= "/frame/login/userconf.htm" ;	//ユーザ変更

var DEF_GF_FILEPATH_DUMMY		= "/frame/dummy.htm" ;


//#####################################################
//# 定数（オブジェクト・インデックス）
//#####################################################

/////////////////////////////
// Indexページ
var DEF_GF_IDX_INDEX_START		= "gf_Start" ;
var DEF_GF_IDX_INDEX_MENTE		= "gf_Mente" ;


/////////////////////////////
// メイン画面

//### フレームID
var DEF_GF_IDX_MAIN_FRAME_MAIN	= "iFrameMain" ;		//
var DEF_GF_IDX_MAIN_FRAME_TOP	= "iFrameTop" ;			//
var DEF_GF_IDX_MAIN_FRAME_MENU	= "iFrameMenu" ;		//
var DEF_GF_IDX_MAIN_FRAME_PYTHON = "iFramePython" ;		//
var DEF_GF_IDX_MAIN_FRAME_IVENT	= "iFrameIvent" ;		//
var DEF_GF_IDX_MAIN_FRAME_WIN	= "iFrameWin" ;			//


/////////////////////////////
// ログイン画面
var DEF_GF_IDX_LOGIN_USERID		= "iUserID" ;
var DEF_GF_IDX_LOGIN_PASSWORD	= "iPassWD" ;
var DEF_GF_IDX_LOGIN_PASSCODE	= "iPassCD" ;

var DEF_GF_ARR_LOGIN_USERINFO	= new Array(
		top.DEF_GF_IDX_LOGIN_USERID,
		top.DEF_GF_IDX_LOGIN_PASSWORD,
		top.DEF_GF_IDX_LOGIN_PASSCODE
	) ;

var DEF_GF_IDX_LOGIN_SAVEOUT      = "iSaveData" ;
var DEF_GF_IDX_LOGIN_SAVEPASSCODE = "iSavePassCD" ;


/////////////////////////////
// ニューゲーム画面
var DEF_GF_IDX_NEWGAME_USERID	= "iUserID" ;
var DEF_GF_IDX_NEWGAME_USERNAME	= "iUserName" ;
var DEF_GF_IDX_NEWGAME_PASSWORD	= "iPassWD" ;
var DEF_GF_IDX_NEWGAME_PASSWORD2 = "iPassWD2" ;
var DEF_GF_IDX_NEWGAME_SAVEDATAPATH = "iSaveDataPath" ;

var DEF_GF_ARR_NEWGAME_USERINFO = new Array(
		top.DEF_GF_IDX_NEWGAME_USERID,
		top.DEF_GF_IDX_NEWGAME_USERNAME,
		top.DEF_GF_IDX_NEWGAME_PASSWORD,
		top.DEF_GF_IDX_NEWGAME_PASSWORD2
	) ;

var DEF_GF_IDX_NEWGAME_AGREE1	= "iAgree1" ;
var DEF_GF_IDX_NEWGAME_AGREE2	= "iAgree2" ;
var DEF_GF_IDX_NEWGAME_AGREE3	= "iAgree3" ;

var DEF_GF_ARR_NEWGAME_AGREE	= new Array(
		top.DEF_GF_IDX_NEWGAME_AGREE1,
		top.DEF_GF_IDX_NEWGAME_AGREE2,
		top.DEF_GF_IDX_NEWGAME_AGREE3
	) ;

var DEF_GF_IDX_NEWGAME_SELECT_SAVEDATAPATH = "gf_iFileDialog" ;



var DEF_GF_IDX_NEWGAME_REGIST_BUTTON = "gf_NewGame-Main-BTN_Regist-DEFBTN" ;



//#####################################################
//# 定数（Storage用）
//#####################################################

//### ユーザ情報ヘッダ
var DEF_GF_STORAGE_USER_HEADER	= top.DEF_INDEX_STORAGE_HEADER + "_USER_" ;



/////#####################################################
/////# 定数（インラインフレーム待ち  カスタム）
/////#####################################################
///
/////var DEF_GF_WINCTRL_IFSTAT_LOGIN		= "ifstat_Login" ;		//  ログイン画面＆メインロード
///var DEF_GF_WINCTRL_IFSTAT_REGIST		= "ifstat_Regist" ;		//  ニューゲーム画面
///
///

//#####################################################
//# 定数（ポップアップWindow）
//#####################################################

//### 親フレーム：Index
var DEF_GF_POPUPWIN_ID_PFRAME_INDEX = "iPopupWin" ;



//#####################################################
//# 各クラス用
//#####################################################

//###########################
//# システム情報  ***元情報はglobal.js***

																// 動作状態
var DEF_GF_SYS_STAT_STOP		= "STOP" ;						//   停止中
var DEF_GF_SYS_STAT_INIT		= "INIT" ;						//   初期化（システム設定中）
var DEF_GF_SYS_STAT_STBY		= "STBY" ;						//   初期化完了（起動待ち）
var DEF_GF_SYS_STAT_RUN			= "RUN" ;						//   通常運用中
var DEF_GF_SYS_STAT_MENTE		= "MENTE" ;						//   メンテナンス中
var DEF_GF_SYS_STAT_ROCK		= "ROCK" ;						//   通常運用中（排他中・操作不可）
	
var DEF_GF_ARR_SYS_STAT			= new Array(					// チェック用
		top.DEF_GF_SYS_STAT_STOP,
		top.DEF_GF_SYS_STAT_INIT,
		top.DEF_GF_SYS_STAT_STBY,
		top.DEF_GF_SYS_STAT_RUN,
		top.DEF_GF_SYS_STAT_MENTE,
		top.DEF_GF_SYS_STAT_ROCK,
	) ;

// function gSTR_SystemInfo_Str()
// {
// 	this.UserID					= top.DEF_GVAL_SYS_SYSID ;		//システム使用者（ユーザID）
// 	this.SystemName				= top.DEF_GVAL_TEXT_NONE ;		//システム名
// 	
// 	this.Admin					= top.DEF_USER_AUTHOR ;			//作成者
// 	this.github					= top.DEF_USER_GITHUB ;			//github
// 	this.SiteURL				= top.DEF_USER_SITEURL ;		//サイトUTL
// 	this.Version				= top.DEF_USER_VERSION ;		//ソースバージョン
// 	
// 	this.Status					= top.DEF_GVAL_SYS_STAT_STOP ;	//システム状態
//
//  *** 以下、拡張システム情報 ***
//	this.gfAdmin				= top.DEF_GFUSER_AUTHOR ;		//ゲーム 作成者
//	this.gfgithub				= top.DEF_GFUSER_GITHUB ;		//ゲーム github
//	this.gfSiteURL				= top.DEF_GFUSER_SITEURL ;		//ゲーム サイトUTL
//	this.gfVersion				= top.DEF_GFUSER_VERSION ;		//ゲーム ソースバージョン
//
// 	this.gfStatus				= top.DEF_GF_SYS_STAT_STOP ;	//ゲーム システム状態
//
// }
// var gSTR_SystemInfo = new gSTR_SystemInfo_Str() ;



//###########################
//# 規約情報  ※ニューゲーム画面で使用
function STR_GF_AgreeInfo_Str()
{
	this.AgreeLink = {				//規約リンク
		"iAgree1"	: false,
		"iAgree2"	: false,
		"iAgree3"	: false
	} ;
	this.Agree = {					//規約チェック
		"iAgree1"	: false,
		"iAgree2"	: false,
		"iAgree3"	: false
	} ;
}
var STR_GF_AgreeInfo = new STR_GF_AgreeInfo_Str() ;



//###########################
//# ユーザ情報

//### ログインユーザ情報
function STR_GF_UserInfoLogin_Str()
{																//ユーザ情報
	this.ID						= top.DEF_GVAL_TEXT_NONE ;		//  ユーザID
	this.PassWD					= top.DEF_GVAL_TEXT_NONE ;		//  パスワード
}

//### ユーザ情報 本データ
function STR_GF_UserInfo_Str()
{																//ユーザ情報
	this.FLG_Confirm			= false ;						//  ログイン状態  true=ログインOK
	
	this.ID						= top.DEF_GVAL_TEXT_NONE ;		//  ユーザID
	this.PassWD					= top.DEF_GVAL_TEXT_NONE ;		//  パスワード（ハッシュ値）
	this.PassCD					= top.DEF_GVAL_TEXT_NONE ;		//  パスコード
	
	this.RegDate				= top.DEF_GVAL_TIMEDATE ;		//  登録日時
	this.LinDate				= top.DEF_GVAL_TIMEDATE ;		//  ログイン日時（今回）
	this.LotDate				= top.DEF_GVAL_TIMEDATE ;		//  データ更新日時（セーブ出力時）
	this.ChgDate				= top.DEF_GVAL_TIMEDATE ;		//  前回ユーザ変更日時
	this.PwdDate				= top.DEF_GVAL_TIMEDATE ;		//  前回パスワード変更日時
	
	this.Name					= top.DEF_GVAL_TEXT_NONE ;		//  ユーザ名（司令官名 日本語
	this.Comment				= top.DEF_GVAL_TEXT_NONE ;		//  コメント　プロフィール的な
	
//	this.FLG_Save				= false ;						//  セーブデータ選択  true=選択ON
	this.FLG_Save				= true ;						//  セーブデータ選択  true=選択ON

	this.STR_SaveInfo			= top.DEF_GVAL_NULL ;			//  セーブデータ情報（オブジェクト）
}
var STR_GF_UserInfo = new STR_GF_UserInfo_Str() ;



//###########################
//# シナリオ制御クラス用
																// メッセージ種別
var DEF_GVAL_SENARIO_KIND_MESSAGE = "SN_MESSAGE" ;				//   メッセージ

function gSTR_SenarioData_Str()
{
	this.ID						= top.DEF_GVAL_NULL ;			// シナリオID
	this.Kind					= top.DEF_GVAL_NULL ;			// シナリオ種別
	
	this.FLG_Run				= false ;						// メッセージ実行中  true=実行中
	this.Message				= new Array() ;					// メッセージデータ



}

function gSTR_SenarioStack_Str()
{
	this.ID						= top.DEF_GVAL_NULL ;			// シナリオID
	
	this.FLG_Run				= false ;						// シナリオ実行中  true=実行中
	this.Run_ID					= top.DEF_GVAL_NULL ;			// 実行中シナリオデータID
	this.Data					= {} ;							// シナリオデータ  gSTR_SenarioData_Str()
}

function gSTR_SenarioCtrl_Str()
{
	this.FLG_Run				= false ;						// シナリオ実行中  true=実行中
	this.Run_ID					= top.DEF_GVAL_NULL ;			// 実行中シナリオID
	this.Data					= {} ;							// シナリオスタック  gSTR_SenarioStack_Str()
}
var gSTR_SenarioCtrl = {} ;



