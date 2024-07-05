//#####################################################
//# ::Project  : Galaxy Fleet
//# ::Admin    : Korei (@korei-xlix)
//# ::github   : https://github.com/korei-xlix/galaxyfleet_web
//# ::Class    : グローバル定数/変数
//#####################################################
//# 更新履歴
//# 0.0.1.0		2024-xx-xx	テスト版



//# 1.0.0.0		2024-xx-xx	正式リリース
//#
//#####################################################

//###########################
//# ※ユーザ自由変更※

//### システム情報
var DEF_GFUSER_VERSION	= "0.0.1.0" ;
var DEF_GFUSER_AUTHOR	= 'korei (X:@korei_xlix)' ;	//HTMLのauthor表示
var DEF_GFUSER_GITHUB	= "https://github.com/korei-xlix/galaxyfleet_web/" ;
var DEF_GFUSER_SITEURL	= "https://galaxy-fleet.koreis-labo.com/" ;



//###########################
//# ※以下はいじれない※

//#####################################################
//# 定数（オブジェクト・インデックス）
//#####################################################

/////////////////////////////
// Indexページ
var DEF_GF_IDX_INDEX_START = "gf_Start" ;
var DEF_GF_IDX_INDEX_MENTE = "gf_Mente" ;




/////////////////////////////
// ユーザ情報
var DEF_GF_IDX_USER_INFO = {
	"ID"			: "iUserID",
	"NAME"			: "iUserName",
	"REGDATE"		: "iRegDate",
	"LINDATE"		: "iLinDate",
	"LOTDATE"		: "iLotDate",
	"CHGDATE"		: "iChgDate",
	"PWDDATE"		: "iPwdDate",
	"COMMENT"		: "iComment"
} ;



//#####################################################
//# 定数（Storage用）
//#####################################################

//### ユーザ情報ヘッダ
var DEF_GF_STORAGE_USER_HEADER	= top.DEF_INDEX_STORAGE_HEADER + "_USER_" ;



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
	
var DEF_GF_SYS_STAT				= new Array(					// チェック用
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
//# ユーザ情報

var DEF_GF_USER_ID_SYSTEM		= "webadmin" ;					//デフォルトユーザ

function STR_GF_UserInfo_Str()
{																//ユーザ情報
	this.FLG_Confirm			= false ;						//  ログイン状態  true=ログインOK
	
	this.ID						= top.DEF_GVAL_TEXT_NONE ;		//  ユーザID
	this.PassWD					= top.DEF_GVAL_TEXT_NONE ;		//  パスワード（ハッシュ値）
	
	this.RegDate				= top.DEF_GVAL_TIMEDATE ;		//  登録日時
	this.LinDate				= top.DEF_GVAL_TIMEDATE ;		//  ログイン日時（今回）
	this.LotDate				= top.DEF_GVAL_TIMEDATE ;		//  データ更新日時（セーブ出力時）
	this.ChgDate				= top.DEF_GVAL_TIMEDATE ;		//  前回ユーザ変更日時
	this.PwdDate				= top.DEF_GVAL_TIMEDATE ;		//  前回パスワード変更日時
	
	this.Name					= top.DEF_GVAL_TEXT_NONE ;		//  ユーザ名（司令官名 日本語
	this.Comment				= top.DEF_GVAL_TEXT_NONE ;		//  コメント　プロフィール的な
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



