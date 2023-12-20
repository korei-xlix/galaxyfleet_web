/* /////////////////////////////////////////////////////
::ProjectName= common script  
::github= https://github.com/lucida3rd/starregion_doc  
::Admin= Lucida（twitter: @lucida3rd）  
::Twitter URL= https://twitter.com/lucida3rd  
::Homepage=  https://lucida3web.wixsite.com/prof  
::Message= https://marshmallow-qa.com/lucida3poi  
::Class= global data
  
::Update= 2021/7/18  
///////////////////////////////////////////////////// */

/////////////////////////////////////////////////////
// グローバル定数
/////////////////////////////////////////////////////

var DEF_STRG_STORAGE_HEADER = "STRG_" ;
var DEF_STRG_STORAGE_JP = DEF_STRG_STORAGE_HEADER + "JP" ;



/////////////////////////////////////////////////////
// グローバル変数
/////////////////////////////////////////////////////

/////////////////////////////
// ユーザデータ

function STR_STRG_UserData_Str()
{
	//入力が有効か
	this.FLG_Valid = false ;
	//認証OKか
	this.FLG_Auth = false ;
	
	//最終ログイン日時(前回orセーブ時)
	this.CHR_LastLoginDT = null ;
	//ログイン日時
	this.CHR_LoginDT = null ;
	
	//ユーザID
	this.CHR_UserID = null ;
	//ユーザ名
	this.CHR_UserName = null ;
	//パスワード
	this.CHR_PassWD = null ;
	//パスワード(再)
	this.CHR_PassWD2 = null ;
	//パスコード
	this.CHR_PassCD = null ;
	//同意
	this.FLG_Agree = false ;
	
	//パスデータ
	this.CHR_PassData = null ;
}

function STR_STRG_UserInfo_Str()
{
	//ユーザデータ
	this.STR_UserData = new STR_STRG_UserData_Str() ;
	
	//日本語OK
	this.FLG_JP = true ;
}
var STR_STRG_UserInfo_Val = new STR_STRG_UserInfo_Str() ;

/////////////////////////////
// システムデータ
function STR_STRG_SystemInfo_Str()
{





}
var STR_STRG_SystemInfo_Val = new STR_STRG_SystemInfo_Str() ;




/////////////////////////////
// 資材
function STR_STRG_MaterialInfo_Str()
{
	this.Fuel  = 0 ;		//燃料
	this.Steel = 0 ;		//鋼材
	this.Metal = 0 ;		//希金
	this.Fiber = 0 ;		//繊維
	
	this.Cstone = 0 ;		//核石
	this.Gstone = 0 ;		//輝石
	this.Tstone = 0 ;		//時石
	this.Estone = 0 ;		//励石
	this.Sstone = 0 ;		//屑石
	
	this.Ammo = 0 ;			//弾薬
	this.Food = 0 ;			//食料
	this.Capi = 0 ;			//金
}
var STR_STRG_MaterialInfo = new STR_STRG_MaterialInfo_Str() ;










