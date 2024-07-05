//#####################################################
//# ::Project  : Galaxy Fleet
//# ::Admin    : Korei (@korei-xlix)
//# ::github   : https://github.com/korei-xlix/galaxyfleet/
//# ::Class    : グローバル値 [Galaxy Fleet]
//#####################################################

//#####################################################
//# テストログイン
//#####################################################
var DEF_GF_TEST_LOGIN = {
	AutoLogin	: true,
	PassSkip	: true
} ;



//#####################################################
//# ユーザ定数
//#####################################################

/////////////////////////////
// サブタイトルID
var DEF_GF_ID_SUB_TITLE = "gf_SubTitle" ;



/////////////////////////////
// フレームID
//var DEF_GF_FMID_IFRAME_MAIN = "iMain" ;
//var DEF_GF_FMID_IFRAME_MAP  = "iMap" ;
//var DEF_GF_FMID_IFRAME_MENU = "iMenu" ;		//Home
//var DEF_GF_FMID_IFRAME_COMM = "iCom" ;		//Home
//var DEF_GF_FMID_IFRAME_BAT  = "iBattle" ;	//Home
//
//var DEF_GF_SUB_FRAMES = [
//		DEF_GF_FMID_IFRAME_MAP,
//		DEF_GF_FMID_IFRAME_MENU,
//		DEF_GF_FMID_IFRAME_COMM,
//		DEF_GF_FMID_IFRAME_BAT
//	] ;

var DEF_GF_FRAMEID = {
		"MAIN"	: "iMain",
		"MAP"	: "iMap",
		"MENU"	: "iMenu",
		"COMM"	: "iCom",
		"BAT"	: "iBattle"
	} ;

var DEF_GF_HOME_FRAMES = [
		DEF_GF_FRAMEID['MAP'],
		DEF_GF_FRAMEID['MENU'],
		DEF_GF_FRAMEID['COMM'],
		DEF_GF_FRAMEID['BAT']
	] ;



/////////////////////////////
// フレームファイルデータ
//var DEF_GF_FMFILE__BLANK_ = "_blank_" ;
//var DEF_GF_FMFILE_LOGIN   = "Login" ;
//v//ar DEF_GF_FMFILE_NEWGAME = "NewGame" ;
//
/////ホーム
//var DEF_GF_FMFILE_HOME    = "Home" ;
//var DEF_GF_FMFILE_MAINMENU     = "MainMenu" ;
//
////共通
////  アカウント管理
//var DEF_GF_FMFILE_ACCOUNT = "Account" ;
//var DEF_GF_FMFILE_MENU_ACCOUNT = "MenuAccount" ;
//
/////マップ
//var DEF_GF_FMFILE_MAP     = "Map" ;
//
////戦闘
//var DEF_GF_FMFILE_BATTLE  = "Battle" ;
//
var DEF_GF_FMFILE = {
	//#############################
	//# _blank
	//#############################
	"BLANK" : {
	"ID" 		: "BLANK",
	"PATH" 		: "/frame/_blank/_blank.htm",
	"HEIGHT"	: null,
	"WIDTH"		: null
	},
	
//	//#############################
//	//# フレームセット用(初期サイズ)
//	//#############################
//	"iMain" : {
//	"Path" 		: null,
//	"Height"	: 980,
//	"Width"		: null
//	},
//	"iMap" : {	//Home Sub
//	"Path"	 	: null,
//	"Height"	: 960,	//★900-100-8
//	"Width"		: 960	//★980 - 20
//	},
//	"iCom" : {	//Home Sub
//	"Path" 		: null,
//	"Height"	: 960,	//★900-100-8
//	"Width"		: 960	//★980 - 20
//	},
//	"iBattle" : {	//Home Sub
//	"Path" 		: null,
//	"Height"	: 960,	//★900-100-8
//	"Width"		: 960	//★980 - 20
//	},
//	"iMenu" : {	//Home Sub
//	"Path" 		: null,
//	"Height"	: 760,
//	"Width"		: 220	//★220  サイズいっぱい
//	},
//	
	//#############################
	//# ログイン
	//#############################
	"LOGIN" : {
	"ID" 		: "LOGIN",
	"PATH" 		: "/frame/login/login.htm",
	"HEIGHT"	: 980,
	"WIDTH"		: null
	},
	
	//#############################
	//# ニューゲーム
	//#############################
	"NEWGAME" : {
	"ID" 		: "NEWGAME",
	"PATH" 		: "/frame/newgame/newgame.htm",
	"HEIGHT"	: 700,
	"WIDTH"		: null
	},
	
	//#############################
	//# ホーム
	//#############################
	"HOME" : {
	"ID" 		: "HOME",
	"PATH" 		: "/frame/home/home.htm",
	"HEIGHT"	: 1107,
	"WIDTH"		: null
	},
	"MAINMENU" : {
	"ID" 		: "MAINMENU",
	"PATH" 		: "/frame/home/menu_home.htm",
	"HEIGHT"	: 760,
	"WIDTH"		: 220
	},
	
	//#############################
	//# 共通
	//#############################
	
	////アカウント管理
	"ACCOUNT" : {
	"ID" 		: "ACCOUNT",
	"PATH" 		: "/frame/home/comm/account/account.htm",
	"HEIGHT"	: 980,
	"WIDTH"		: 960
	},
	
	"MENU_ACCOUNT" : {
	"ID" 		: "MENU_ACCOUNT",
	"PATH" 		: "/frame/home/comm/account/menu_account.htm",
	"HEIGHT"	: 640,
	"WIDTH"		: 220
	},
	
	//#############################
	//# 戦闘
	//#############################
	"BATTLE" : {
	"ID" 		: "BATTLE",
	"PATH"	 	: "/frame/bat/battle/battle.htm",
	"HEIGHT"	: 980,
	"WIDTH"		: 960
	},
	
	//#############################
	//# マップ
	//#############################
	"MAP" : {		//Home Sub
	"ID" 		: "MAP",
	"PATH"	 	: "/frame/home/map/grobal/grobal.htm",
	"HEIGHT"	: 960,
	"WIDTH"		: 960
	}
} ;

/////////////////////////////
// アカウント情報ID
var DEF_GF_ID_ACCOUNT_INFO = {
	"ID"		: "iUserID",
	"NAME"		: "iUserName",
	"REGDATE"	: "iRegDate",
	"LINDATE"	: "iLinDate",
	"LOTDATE"	: "iLotDate",
	"CHGDATE"	: "iChgDate",
	"PWDDATE"	: "iPwdDate",
	"COMMENT"	: "iComment"
} ;

/////////////////////////////
// メインメニューID
///var DEF_GF_ID_MAINMENU_LOG_VIEW = "iBtn_LogView" ;
///
var DEF_GF_ID_MAINMENU = {
	"MISSION"		: "iBtn_Mission",
	"SOTIE"			: "iBtn_Sotie",
	"ORGANIZE"		: "iBtn_Organize",
	"REQUSITION"	: "iBtn_Requsition",
	"PROCUREMENT"	: "iBtn_Procurement",
	"MAINTENANCE"	: "iBtn_Maintenance",
	"CONSTRUCTION"	: "iBtn_Construction",
	"MANUFUCTUERING"	: "iBtn_Manufuctuering",
	"ARHEMY"		: "iBtn_Arhemy",
	"BASEMANAGE"	: "iBtn_BaseManage",
	"GETGIFT"		: "iBtn_GetGift",
	"ACCOUNT"		: "iBtn_Account",
	"LOGOUT"		: "iBtn_Logout",
	"LOGVIEW"		: "iBtn_LogView"
} ;

/////////////////////////////
// アカウントメニューID
var DEF_GF_ID_MENU_ACCOUNT = {
	"COMMENT"		: "iBtn_ChangeComment",
	"PASSWORD"		: "iBtn_ChangePassword",
	"USERNAME"		: "iBtn_ChangeUserName",
	"USERID"		: "iBtn_ChangeUserID"
} ;

var DEF_GF_ID_ACCOUNT = {
	"CEL_COMMENT"	: "iCel_Input_Comment",
	"BOX_COMMENT"	: "iInput_Comment",
	"BTN_COMMENT"	: "iBtn_Input_Comment",
	
	"CEL_PASSWORD"	: "iCel_Input_Password",
	"VIEW_PASSWORD"	: "iView_PassWD_now",
	"BOX_PASSWORD"	: "iInput_PassWD",
	"BOX_PASSWORD2"	: "iInput_PassWD2",
	"BTN_PASSWORD"	: "iBtn_Input_Password",
	
	"CEL_USERNAME"	: "iCel_Input_UserName",
	"BOX_USERNAME"	: "iInput_UserName",
	"BTN_USERNAME"	: "iBtn_Input_UserName",
	
	"CEL_USERID"	: "iCel_Input_UserID",
	"BOX_USERID"	: "iInput_UserID",
	"BTN_USERID"	: "iBtn_Input_UserID"
} ;

/////////////////////////////
// ログウィンドウ情報
var DEF_GF_LOG_WINDOWINFO = {
	"KEY"	: "iLogWindow",
	"TOP"	: 60,
	"LEFT"	: 900
} ;

var DEF_GF_LOG_WINDOWINFO_TEXT = "iLogText" ;



/////////////////////////////
// メッセージボックス情報
var DEF_GF_MESSAGEBOXINFO = {
	"KEY"	: "iMessageBox",
	"TOP"	: 60,
	"LEFT"	: 100
///	"Cell"	: [	"iMessageBox_Sell1",
///				"iMessageBox_Sell2",
///				"iMessageBox_Sell3",
///				"iMessageBox_Sell4",
///				"iMessageBox_Sell5",
///				"iMessageBox_Sell6"
///		],
///	"Button": [	"iMessageBox_Btn1",
///				"iMessageBox_Btn2",
///				"iMessageBox_Btn3",
///				"iMessageBox_Btn4",
///				"iMessageBox_Btn5",
///				"iMessageBox_Btn6"
///		]
} ;







/////////////////////////////
// タイマID
////var DEF_GF_TMID_IFRAME_MAIN = "tm_gf_Frame_Main" ;
////var DEF_GF_TMID_IFRAME_MAP  = "tm_gf_Frame_Map" ;
////var DEF_GF_TMID_IFRAME_MENU = "tm_gf_Frame_Menu" ;



//#####################################################
//# ユーザ変数
//#####################################################

///////////////////////////////
// ログ
var ARR_Log = new Array() ;
var CHR_PassWD = null ;



//#####################################################
//# ユーザ情報
//#####################################################
function STR_GF_UserInfo_Str()
{
	this.FLG_Login	= false ;		//ログイン状態 true=ログイン（承認OK）
	
	this.ID			= null ;		//ユーザID
	this.PassWD		= null ;		//パスワード（ハッシュ値）
	
	this.RegDate	= null ;		//登録日時
	this.LinDate	= null ;		//ログイン日時（今回）
	this.LotDate	= null ;		//データ更新日時（セーブ出力時）
	this.ChgDate	= null ;		//前回ユーザ変更日時
	this.PwdDate	= null ;		//前回パスワード変更日時
	
	this.Name		= null ;		//ユーザ名（司令官名 日本語
	this.Comment	= "" ;			//コメント　プロフィール的な
}
var STR_GF_UserInfo_Val = new STR_GF_UserInfo_Str() ;



//#####################################################
//# プレイ情報
//#####################################################
function STR_GF_PlayInfo_Str()
{
	this.UserChange = 0 ;			//ユーザ変更回数



	
	this.ResetRun = 0 ;				//あの回数
	this.LoginMinute10 = 0 ;		//ログイン経過時間 10分
	this.LoginMinute30 = 0 ;		//ログイン経過時間 30分
	this.LoginMinute60 = 0 ;		//ログイン経過時間 60分
}
var STR_GF_PlayInfo_Val = new STR_GF_PlayInfo_Str() ;



//#####################################################
//# 資源情報
//#####################################################
function STR_GF_MaterialInfo_Str()
{
	this.Fuel      = 0 ;		//燃料
	this.Steel     = 0 ;		//鋼材
	this.Fiber     = 0 ;		//繊維
	this.RareEarth = 0 ;		//希土
	
	this.Red    = 0 ;			//赤液
	this.Blue   = 0 ;			//青片
	this.Green  = 0 ;			//緑粉
	this.Purple = 0 ;			//柴缶
	this.Black  = 0 ;			//黒晶
	
	this.Glitter = 0 ;			//輝石
	this.Core    = 0 ;			//核石
	
	this.Pot     = 0 ;			//時瓶
	this.Capital = 0 ;			//資金
	this.Food    = 0 ;			//食料
	this.Fabric  = 0 ;			//建材
	this.Scrap   = 0 ;			//屑板
	
}
var STR_GF_MaterialInfo_Val = new STR_GF_MaterialInfo_Str() ;



//#####################################################
//# ホーム画面情報
//#####################################################
function STR_GF_HomeInfo_Str()
{
									//フレームID情報(画面遷移)
	this.FrameID = null ;			//  オープン中のフレームID
	this.FileID  = null ;			//  オープン画面
	
	this.FLG_Update = false ;		//画面に更新あり true=更新有り
	

}
var STR_GF_HomeInfo_Val = new STR_GF_HomeInfo_Str() ;



//#####################################################
//# データ用型
//#####################################################

/////////////////////////////
// 名前型
function STR_GF_NameString_Str()
{
	this.Code = null ;
	this.Name = null ;
}

/////////////////////////////
// 基本ポイント型
function STR_GF_PointBasic_Str()
{
	this.DR = 0 ;
	this.MB = 0 ;
	this.EL = 0 ;
	this.PW = 0 ;
}

/////////////////////////////
// 活動ポイント型
function STR_GF_PointActive_Str()
{
	this.HP = 0 ;
	this.SP = 0 ;
	this.AP = 0 ;
	this.LK = 0 ;
}

/////////////////////////////
// ステータスポイント型
function STR_GF_PointPoints_Str()
{
	this.DDU = 0 ;
	this.DER = 0 ;
	this.DVR = 0 ;
	this.DLC = 0 ;
	this.MMB = 0 ;
	this.MAC = 0 ;
	this.MRE = 0 ;
	this.MWK = 0 ;
	this.ECP = 0 ;
	this.EAC = 0 ;
	this.EDE = 0 ;
	this.ERE = 0 ;
	this.PIM = 0 ;
	this.PLD = 0 ;
	this.PAG = 0 ;
	this.PTR = 0 ;
}

///////////////////////////////
//// 装備パーツ型
//function STR_GF_EquipParts_Str()
//{
//	this.DR  = null ;
//	this.DDU = null ;
//	this.DER = null ;
//	this.DVR = null ;
//	this.DLC = null ;
//	
//	this.MB  = null ;
//	this.MMB = null ;
//	this.MAC = null ;
//	this.MRE = null ;
//	this.MWK = null ;
//	
//	this.EL  = null ;
//	this.ECP = null ;
//	this.EAC = null ;
//	this.EDE = null ;
//	this.ERE = null ;
//	
//	this.PW  = null ;
//	this.PIM = null ;
//	this.PLD = null ;
//	this.PAG = null ;
//	this.PTR = null ;
//	
//	this.HP = null ;
//	this.SP = null ;
//}

/////////////////////////////
// 武器ステータス型
function STR_GF_PointWepon_Str()
{
	this.BTT = 0 ;
	this.BAR = 0 ;
	this.BIN = 0 ;
	this.BLD = 0 ;
	this.BDF = 0 ;
	this.BSR = 0 ;
}

/////////////////////////////
// コストステータス型
function STR_GF_PointCost_Str()
{
	this.CCP = 0 ;
	this.CWT = 0 ;
	this.CAP = 0 ;
	this.CPC = 0 ;
}

/////////////////////////////
// ステータス情報型
function STR_GF_Points_Str()
{
	this.Basic  = new STR_GF_PointBasic_Str() ;
	this.Active = new STR_GF_PointActive_Str() ;
	this.Points = new STR_GF_PointPoints_Str() ;
}

/////////////////////////////
// 基本情報型
////function STR_GF_StandardInfo_Str()
function STR_GF_Names_Str()
{
									//種別
	this.Kind   = new STR_GF_NameString_Str() ;
									//分類
	this.Class  = new STR_GF_NameString_Str() ;
									//形式
	this.Type   = new STR_GF_NameString_Str() ;
									//製造国
	this.Coutry = new STR_GF_NameString_Str() ;
									//プロフィール
	this.Prof   = null ;
}



//#####################################################
//# 装備情報型
//#####################################################
function STR_GF_EquipType_Str()
{
	this.Volume     = 0 ;			//現在容量
	this.MAX_Volume = 0 ;			//最大容量
	
	this.StdType = new Object() ;	//標準搭載タイプ（ユニット固定）
	this.Type    = new Object() ;	//搭載タイプ
	
	this.ARRR_WeponIndex   = new Array() ;	//武器インデックス
	this.ARRR_PartsIndex   = new Array() ;	//パーツインデックス
}



//#####################################################
//# 搭載情報型
//#####################################################
function STR_GF_PayloadType_Str()
{
	this.Volume     = 0 ;			//現在容量
	this.MAX_Volume = 0 ;			//最大容量
	
	this.StdType = new Object() ;	//標準搭載タイプ（ユニット固定）
	this.Type    = new Object() ;	//搭載タイプ
	
	this.ARRR_PayloadIndex = new Array() ;	//搭載ユニットインデックス
	this.ARRR_StorageIndex = new Array() ;	//収納物インデックス
}



//#####################################################
//# 収納情報型
//#####################################################
function STR_GF_StorageInfo_Str()
{
	this.Index = 0 ;				//識別番号＊
	
	this.Volume = 0 ;				//搭載容量
	
	this.Kind   = null ;			//搭載物種別
									//  "" : 資源
									//  "" : 補給物資
									//  "" : 工作物資
									//  "" : 兵器（非運用）
									//  "" : 装備
									//  "" : 武器
									//  "" : アイテム
	
	this.Class = null ;				//関連分類
									//  兵器固有  : ユニット番号
									//  装備パーツ: パーツ番号
									//  武器付加  : 武器番号
									//  アイテム付加  : アイテム番号
	
	this.Info = null ;				//搭載物情報
}



//#####################################################
//# 機能情報型
//#####################################################
function STR_GF_SkillInfo_Str()
{
	this.Level = 0 ;				//機能レベル
	this.Valid  = false ;			//有効    true=有効
	this.Active = false ;			//発動中  true=発動中
	
	this.Kind   = null ;			//関連種別
									//  "" : 兵器固有
									//  "" : 装備パーツ
									//  "" : 武器付加
									//  "" : 弾薬付加
	this.Class = null ;				//関連分類
									//  兵器固有  : ユニット番号
									//  装備パーツ: パーツ番号
									//  武器付加  : 武器番号
									//  弾薬付加  : 弾薬番号
	
	this.Active = false ;			//強化    true=強化、false=弱体化
	this.Name = null ;				//機能名
	this.Type = null ;				//機能形式
	this.Prof = null ;				//プロフィール
}



//#####################################################
//# 弾薬情報型
//#####################################################
function STR_GF_AmmoInfo_Str()
{
	this.Ammo = 0 ;					//弾数
	this.Class = null ;				//関連分類: 武器番号
	
	this.Name = null ;				//弾薬名
	this.Type = null ;				//弾薬形式
	this.Prof = null ;				//プロフィール
	
	this.EquipPerm = false ;		//装備許可の必要有無  true=必要
	this.MAX_Ammo = 0 ;				//最大弾数
									//使用資源(1発当たり)
	this.UseMaerial = new STR_GF_MaterialInfo_Str() ;
	
	this.Skill = new Object() ;		//機能
}



//#####################################################
//# 武器情報型
//#####################################################
function STR_GF_WeponInfo_Str()
{
	this.Index = 0 ;				//識別番号＊
	this.Name  = null ;				//武器名
	
	this.Fail  = false ;			//故障中  true=故障中、false=正常
	this.Class = null ;				//関連分類: 搭載ユニット番号
	
									//基本情報
	this.StdInfo = new STR_GF_Names_Str() ;

									//武器ステータスポイント
	this.StdPoints = new STR_GF_PointWepon_Str() ;
									//ステータスポイント
	this.Points = new STR_GF_PointWepon_Str() ;
									//コストステータスポイント
	this.Cost = new STR_GF_PointCost_Str() ;
	
									//使用資源
	this,UseMaerial = new STR_GF_MaterialInfo_Str() ;
	
	this.Ammo  = new Object() ;		//弾薬
	this.Skill = new Object() ;		//機能
}



//#####################################################
//# パーツ情報型
//#####################################################
function STR_GF_PartsInfo_Str()
{
	this.Index = 0 ;				//識別番号＊
	this.Name  = null ;				//パーツ名
	
									//基本情報
	this.StdInfo = new STR_GF_Names_Str() ;

									//基礎ステータスポイント
	this.StdPoints = new STR_GF_Points_Str() ;
									//ステータスポイント
	this.Points = new STR_GF_Points_Str() ;
									//コストステータスポイント
	this.Cost = new STR_GF_PointCost_Str() ;
	
									//使用資源
	this,UseMaerial = new STR_GF_MaterialInfo_Str() ;
	
	this.Skill = new Object() ;		//機能
}



//#####################################################
//# 小隊情報型
//#####################################################
function STR_GF_PlatoonInfo_Str()
{
	this.Index = 0 ;				//識別番号＊
	
	this.Num  = -1 ;				//小隊・中隊番号
	this.Name = null ;				//小隊・中隊名
	
	this.UnitIndex = null ;			//搭載ユニット識別番号
	
	this.Live      = 0 ;			//残機数
	this.MAX_Live  = 0 ;			//最大機数
	this.OnPayload = false ;		//搭載ユニット有無  true=有り
}



//#####################################################
//# 搭載情報型
//#####################################################
function STR_GF_PayloadInfo_Str()
{
	this.Index = 0 ;				//識別番号＊
	this.Volume = 0 ;				//小隊容量
	
	this.Num  = -1 ;				//戦隊番号  -1は非戦隊
	this.Name = null ;				//戦隊名
	
	this.ARRR_PlatoonIndex = new Array() ;	//小隊インデックス
}



//#####################################################
//# 艦隊情報型
//#####################################################
function STR_GF_FleetInfo_Str()
{
	this.Index = 0 ;				//識別番号＊
	
	this.FleetNum   = 0 ;			//艦隊番号
	this.FleettName = null ;		//艦隊名
	
	this.Submarine    = false ;		//潜水艦あり
	this.AirSquadron  = false ;		//機動戦隊あり
	this.LandSquadron = false ;		//陸戦戦隊あり
	this.Unarmed      = false ;		//非武装ユニットあり（護衛中）
	
	this.ARRR_UnitIndex = new Array() ;	//編成ユニットインデックス
}



//#####################################################
//# ユニット情報型
//#####################################################
function STR_GF_UnitInfo_Str()
{
	this.Index = 0 ;				//識別番号＊
	this.Name  = null ;				//ユニット名
	
									//活動ステータス
	this.Stat = new STR_GF_PointActive_Str() ;
	
									//基本情報
	this.StdInfo = new STR_GF_Names_Str() ;

									//ボーナスステータスポイント
	this.BonusPoints = new STR_GF_PointBasic_Str() ;
									//基礎ステータスポイント
	this.StdPoints = new STR_GF_Points_Str() ;
									//ステータスポイント
	this.Points = new STR_GF_Points_Str() ;
									//使用資源
	this,UseMaerial = new STR_GF_MaterialInfo_Str() ;
	
	this.Skill = new Object() ;		//機能
	
									//装備情報
	this.Equip = new STR_GF_EquipType_Str() ;
									//搭載情報
	this.Payload = new STR_GF_PayloadType_Str() ;
}



