/* ********************************************
Project  : Common Script
URL      : https://mynoghra.jp/
Class    : WINCTRL
Update   : 2020/8/25
***********************************************
Function :
	cWINCTRL_getWindowWidth( in_Object )
	cWINCTRL_getWindowHeight( in_Object )
	cWINCTRL_setWindowTtile( in_DstObject, in_SrcObject )
	cWINCTRL_CSS_Set( iObj, iName, iKey, iFlg )
	cWINCTRL_CSS_Sw( iFwide )
	cUPi( iKey, iOn )
******************************************** */

////////////////////////////////////////
// クラス定数
////////////////////////////////////////
function STR_WINCTRL_ConstVal_Str()
{
	this.CHR_ARG_HOST = new Array() ;
	this.CHR_ARG_HOST.push( new Array( "localhost", "source" ) )
		//ホストの候補(リモート,ローカル)
//	this.CHR_REMOTE_HOST = "localhost" ;
//		//リモートの場合のホスト名
	this.VAL_CSS_PC_WIDTH = 415 ;
		//PC版となる画面サイズ
//	this.CHR_ORGKEY_LOCAL = new Array( "starregion" ) ;
//	this.CHR_COMKEY_REMOTE = "localhost" ;
//	this.CHR_COMKEY_LOCAL  = "HomePage" ;
//	this.CHR_COM_LOCAL     = "HomePage_index" ;
//	this.CHR_CSS_COM_HEAD  = "common" ;
//		//共通CSSのヘッダ名(★いじらない)
	this.CHR_RES_FOLDER  = "/_res" ;
		//共通リソースフォルダ名(★いじらない)
//	this.CHR_CSS_COM_PATH  = "/_res/css/" + this.CHR_CSS_COM_HEAD ;
	this.CHR_CSS_COM_PATH  = this.CHR_RES_FOLDER + "/css/common" ;
		//共通CSSの絶対パス+ヘッダ名(★いじらない)
//	this.CHR_UPI_ICONPATH = "https://" + STR_HANDLE_CONST.CHR_COMKEY_REMOTE + "/_res/icon/icon_up.gif";
	this.CHR_UPI_ICONPATH = this.CHR_RES_FOLDER + "/icon/icon_up.gif";
		//通知アイコンGIFの絶対パス(★いじらない)
	this.ARR_UPI_DATE     = new Array(0,31,28,31,30,31,30,31,31,30,31,30,31) ;
		//各月の日数
	this.VAL_UPI_PAST     = 3 ;
		//通知アイコンを表示する日数
	
}
const STR_WINCTRL_CONST = new STR_WINCTRL_ConstVal_Str() ;



////////////////////////////////////////
// クラス変数
////////////////////////////////////////
function STR_WINCTRL_CSSinfo_Str()
{
	this.FLG_Init = false ;			//true = 初期化完了
	
	this.Obj           = "" ;		//ページオブジェクト
///	this.CHR_CurrName  = "" ;		//カレント名(サブコンテンツフォルダ)の指定  空はルート
	this.CHR_StylePath = "" ;		//サブコンテンツ用CSSフォルダの絶対パス
	this.CHR_StyleName = "" ;		//サブコンテンツ用CSSのスタイル名
///	this.FLG_ComBranch = true ;
	
	this.CHR_ComPath   = "" ;		//共通CSSの絶対パス
	this.CHR_OrgPath   = "" ;		//サブコンテンツ用CSSの絶対パス
}

function STR_WINCTRL_Val_Str()
{
	this.FLG_CSS_PC = true ;		//ページがPC版か
	this.CHR_UPI_v  = -1 ;			//通知アイコンON中か
	this.STR_CSS_Info = new STR_WINCTRL_CSSinfo_Str() ;
}
let STR_WINCTRL_Val = new STR_WINCTRL_Val_Str() ;



////////////////////////////////////////
// 画面サイズの取得（ピクセル単位）
////////////////////////////////////////
// ※補足※
// ブラウザにより取得関数がマチマチ。
////////////////////////////////////////

////////////////////////////////////////
// 画面幅の取得
function cWINCTRL_getWindowWidth( in_Object )
{
	let wSize ;
	
	try
	{
		wSize = in_Object.documentElement.clientWidth ;
	}
	catch(e)
	{
		wSize = 0 ;
	}
	return wSize ;
}

////////////////////////////////////////
// 画面高さの取得
function cWINCTRL_getWindowHeight( in_Object )
{
	let wSize ;
	
	try
	{
		wSize = in_Object.documentElement.clientHeight ;
	}
	catch(e)
	{
		wSize = 0 ;
	}
	return wSize ;
}

////////////////////////////////////////
// パスの妥当性チェック
function cWINCTRL_getPathExist( in_Path )
{
	let wURL ;
	
	STR_WINCTRL_PathExist_Error = "" ;
	try
	{
//		wURL = new URL() ;
//		wURL.href = in_Path ;
		wURL = new URL( in_Path ) ;
	}
	catch(e)
	{
		STR_WINCTRL_PathExist_Error = e ;
		return false ;
	}
	return true ;
}
let STR_WINCTRL_PathExist_Error = "" ;

////////////////////////////////////////
// 画面タイトル差し替え
function cWINCTRL_setWindowTtile( in_DstObject, in_SrcObject )
{
	try
	{
		in_DstObject.title = in_SrcObject.title ;
	}
	catch(e)
	{
		colsole.log( "cWINCTRL_setWindowTtile: " + e ) ;
	}
	return ;
}



////////////////////////////////////////
// スタイルシート制御
//   iObj        : ページオブジェクト
//   iCurrName   : カレント名(サブコンテンツフォルダ)の指定  空はルート
//   iSstylePath : サブコンテンツ用CSSフォルダの絶対パス
//   iSstyleName : サブコンテンツ用CSSのスタイル名
//   iPConly     : true=PC版強制
////////////////////////////////////////
//function cWINCTRL_CSS_Set( iObj, iCurrName, iSstylePath, iComBranch=true, iPConly=false )
//function cWINCTRL_CSS_Set( iObj, iCurrName, iSstylePath, iPConly=false )
//function cWINCTRL_CSS_Set( iObj, iSstylePath, iPConly=false )
function cWINCTRL_CSS_Set( iObj, iSstylePath, iSstyleName, iPConly=false )
{
	let wPath ;
	
	////////////////////////////////////////
	// 引数の格納
	STR_WINCTRL_Val.STR_CSS_Info.Obj = iObj ;
//	STR_WINCTRL_Val.STR_CSS_Info.CHR_CurrName  = iCurrName ;
	STR_WINCTRL_Val.STR_CSS_Info.CHR_StylePath = iSstylePath ;
	STR_WINCTRL_Val.STR_CSS_Info.CHR_StyleName = iSstyleName ;
//	STR_WINCTRL_Val.STR_CSS_Info.FLG_ComBranch = iComBranch ;
	
	////////////////////////////////////////
	// PC or Mobile
	if((cWINCTRL_getWindowWidth(STR_WINCTRL_Val.STR_CSS_Info.Obj)>=STR_WINCTRL_CONST.VAL_CSS_PC_WIDTH) ||
	   (iPConly==true)) //PC版強制
	{
		STR_WINCTRL_Val.FLG_CSS_PC = true ;
	}
	else
	{
		STR_WINCTRL_Val.FLG_CSS_PC = false ;
	}
	
	////////////////////////////////////////
	// 共通CSSの絶対パス設定
	wPath = _WINCTRL_getComPath() ;
	if( wPath=="" )
	{
		alert( "cWINCTRL_CSS_Set:: _WINCTRL_getComPath error: " + STR_WINCTRL_PathExist_Error ) ;
		return false ;
	}
	STR_WINCTRL_Val.STR_CSS_Info.CHR_ComPath = wPath ;
	
	////////////////////////////////////////
	// サブコンテンツ用CSSの絶対パス設定
	wPath = _WINCTRL_getOrgPath() ;
	if( wPath=="" )
	{
		alert( "cWINCTRL_CSS_Set:: _WINCTRL_getOrgPath error: " + STR_WINCTRL_PathExist_Error ) ;
		return false ;
	}
	STR_WINCTRL_Val.STR_CSS_Info.CHR_OrgPath = wPath ;
	
	////////////////////////////////////////
	// CSS設定
	if( _WINCTRL_CSS_Sets()!=true )
	{
		alert( "cWINCTRL_CSS_Set:: _WINCTRL_CSS_Sets error" ) ;
		return false ;
	}
	
	////////////////////////////////////////
	// 初期化完了
	STR_WINCTRL_Val.STR_CSS_Info.FLG_Init = true ;
	return;
}



/*return;

	STR_WINCTRL_Val.STR_CSS_Info.CHR_OrgPath = _WINCTRL_getOrgPath() ;
	
	if((cWINCTRL_getWindowWidth(STR_WINCTRL_Val.STR_CSS_Info.Obj)>=STR_WINCTRL_CONST.VAL_CSS_PC_WIDTH) ||
	   (iPConly==true)) //PC版強制
	{
		STR_WINCTRL_Val.FLG_CSS_PC = true ;
		_WINCTRL_CSS_Sel( true ) ;
	}
	else
	{
		STR_WINCTRL_Val.FLG_CSS_PC = false ;
		_WINCTRL_CSS_Sel( false ) ;
	}
	
	////////////////////////////////////////
	// 初期化完了
	STR_WINCTRL_Val.STR_CSS_Info.FLG_Init = true ;
	return;
}*/

////////////////////////////////////////
// CSS切り替え
function cWINCTRL_CSS_Sw( iSstyleName )
{
	if( STR_WINCTRL_Val.STR_CSS_Info.FLG_Init!=true )
	{
		return;
	}
//	_WINCTRL_CSS_Sel( iFwide );
	
	let wSstyleName ;
	
	wSstyleName = STR_WINCTRL_Val.STR_CSS_Info.CHR_StyleName ;
	STR_WINCTRL_Val.STR_CSS_Info.CHR_StyleName = iSstyleName ;
	////////////////////////////////////////
	// サブコンテンツ用CSSの絶対パス設定
	wPath = _WINCTRL_getOrgPath() ;
	if( wPath=="" )
	{
		STR_WINCTRL_Val.STR_CSS_Info.CHR_StyleName = wSstyleName ;
		alert( "cWINCTRL_CSS_Sw:: _WINCTRL_getOrgPath error: " + STR_WINCTRL_PathExist_Error ) ;
		return false ;
	}
	STR_WINCTRL_Val.STR_CSS_Info.CHR_OrgPath = wPath ;
	
	////////////////////////////////////////
	// CSS設定
	if( _WINCTRL_CSS_Sets()!=true )
	{
		STR_WINCTRL_Val.STR_CSS_Info.CHR_StyleName = wSstyleName ;
		alert( "cWINCTRL_CSS_Sw:: _WINCTRL_CSS_Sets error" ) ;
		return false ;
	}
	return;
}

/*function _WINCTRL_CSS_Sel( iFwide )
{
	if( iFwide==true )
	{
		_WINCTRL_CSS_St( STR_WINCTRL_Val.STR_CSS_Info.CHR_ComPath + "_wide.css", "iCSS_Com" ) ;
		_WINCTRL_CSS_St( STR_WINCTRL_Val.STR_CSS_Info.CHR_OrgPath + "_wide.css", "iCSS_Org" ) ;
	}
	else
	{
		_WINCTRL_CSS_St( STR_WINCTRL_Val.STR_CSS_Info.CHR_ComPath + "_mini.css", "iCSS_Com" ) ;
		_WINCTRL_CSS_St( STR_WINCTRL_Val.STR_CSS_Info.CHR_OrgPath + "_mini.css", "iCSS_Org" ) ;
	}
	return;
}*/

////////////////////////////////////////
// CSSの設定
function _WINCTRL_CSS_Sets()
{
	////////////////////////////////////////
	// 共通CSS設定
	if( _WINCTRL_CSS_HrefSet( STR_WINCTRL_Val.STR_CSS_Info.CHR_ComPath, "iCSS_Com" )!=true )
	{
		return false ;
	}
	
	////////////////////////////////////////
	// サブコンテンツ用CSS設定
	if( _WINCTRL_CSS_HrefSet( STR_WINCTRL_Val.STR_CSS_Info.CHR_OrgPath, "iCSS_Org" )!=true )
	{
		return false ;
	}
	return true ;
}

function _WINCTRL_CSS_HrefSet( iPath, iKey )
{
	let wObj ;
	
	wObj = STR_WINCTRL_Val.STR_CSS_Info.Obj.getElementById( iKey ) ;
//	if( cWINCTRL_getPathExist( iPath )!=true )
//	{
//		alert( "_WINCTRL_CSS_St:: " + STR_WINCTRL_PathExist_Error + ": " + iPath ) ;
//		return ;
//	}
//	wObj.href = iPath ;
	try
	{
		wObj.href = iPath ;
	}
	catch(e)
	{
		return false ;
	}
	return true ;
}

////////////////////////////////////////
// 共通CSSの絶対パス設定
function _WINCTRL_getComPath()
{
//	let wIndex, wLastIndex, wHref ;
//	let wPath, wCurrPath ;
	let wKey, wHref, wPath ;
	
	wHref = STR_WINCTRL_Val.STR_CSS_Info.Obj.location.href ;
	////////////////////////////////////////
	// 候補のキーを取得
//	wIndex = wHref.indexOf("://") ;
//	if( wIndex!=-1 )
	wKey = 1 ;
	if( wHref.indexOf("http")==0 )
	{
		wKey = 0 ;
	}
	
	////////////////////////////////////////
	// 共通CSSのカレントパスの取得
	wPath = _WINCTRL_getCurrentPath( wHref, wKey, STR_WINCTRL_CONST.CHR_CSS_COM_PATH ) ;
	return wPath ;
}

////////////////////////////////////////
// サブコンテンツ用CSSの絶対パス設定
function _WINCTRL_getOrgPath()
{
	let wKey, wHref, wPath ;
	
	wHref = STR_WINCTRL_Val.STR_CSS_Info.Obj.location.href ;
	////////////////////////////////////////
	// 候補のキーを取得
	wKey = 1 ;
	if( wHref.indexOf("http")==0 )
	{
		wKey = 0 ;
	}
	
	////////////////////////////////////////
	// サブコンテンツ用CSSのカレントパスの取得
	wPath = _WINCTRL_getCurrentPath( wHref, wKey, STR_WINCTRL_Val.STR_CSS_Info.CHR_StylePath + STR_WINCTRL_Val.STR_CSS_Info.CHR_StyleName ) ;
	return wPath ;
}





/*
	////////////////////////////////////////
	// ::同一カレントの場合
	if( STR_WINCTRL_Val.STR_CSS_Info.FLG_ComBranch==false )
	{
		////////////////////////////////////////
		// ルートパスの取得
		wIndex = _WINCTRL_getOrgCurr_Index( wHref ) ;
		if( wIndex==-1 )
		{////定数設定ミス
			alert( "_WINCTRL_getOrgPath:: CHR_COMKEY setting miss." ) ;
			return "" ;
		}
		wLastIndex = STR_WINCTRL_Val.STR_CSS_Info.CHR_StylePath.lastIndexOf( "/" ) ;
		wCurrPath = STR_WINCTRL_Val.STR_CSS_Info.CHR_StylePath.substring( 0, wLastIndex+1 ) ;
		
		wIndex = wHref.indexOf( "/", wIndex ) ;
		wPath = wHref.substring( 0, wIndex ) + "/" + wCurrPath + STR_WINCTRL_CONST.CHR_CSS_COM_HEAD ;
		return wPath ;
	}
	
	////////////////////////////////////////
	// ::別カレントの場合
	
	////////////////////////////////////////
	// キーの選択
	if( wHref.indexOf("https://")==0 )
	{////リモート
///		wIndex = wHref.indexOf( STR_WINCTRL_CONST.CHR_COMKEY_REMOTE ) ;
		wIndex = wHref.indexOf( STR_HANDLE_CONST.CHR_COMKEY_REMOTE ) ;
		if( wIndex==-1 )
		{////定数設定ミス
			alert( "_WINCTRL_getComPath:: CHR_COMKEY setting miss.(1)" ) ;
			return "" ;
		}
///		wHref = "https://" + STR_WINCTRL_CONST.CHR_COMKEY_REMOTE + "/" ;
		wHref = "https://" + STR_HANDLE_CONST.CHR_COMKEY_REMOTE + "/" ;
	}
	else
	{
///		wIndex = wHref.indexOf( STR_WINCTRL_CONST.CHR_COMKEY_LOCAL ) ;
		wIndex = wHref.indexOf( STR_HANDLE_CONST.CHR_COMKEY_LOCAL ) ;
		if( wIndex==-1 )
		{////定数設定ミス
			alert( "_WINCTRL_getComPath:: CHR_COMKEY setting miss.(2)" ) ;
			return "" ;
		}
///		wHref = wHref.substring( 0, wIndex ) + STR_WINCTRL_CONST.CHR_COM_LOCAL + "/" ;
		wHref = wHref.substring( 0, wIndex ) + STR_HANDLE_CONST.CHR_COM_LOCAL + "/" ;
	}
	
	wIndex = wHref.indexOf( "/", wIndex ) ;
	if( wIndex==-1 )
	{////定数設定ミス
		alert( "_WINCTRL_getComPath:: CHR_COMKEY setting miss.(3)" ) ;
		return "" ;
	}
	wPath = wHref.substring( 0, wIndex ) + STR_WINCTRL_CONST.CHR_CSS_COM_PATH ;
	return wPath ;
}
*/

////////////////////////////////////////
// カレントパスの取得
function _WINCTRL_getCurrentPath( in_Href, in_Key, in_CSScurr )
{
	let wI, wIndex, wPath, wCSS_Ind ;
	
	wPath = "" ;
	for( wI=0 ; wI<STR_WINCTRL_CONST.CHR_ARG_HOST.length ; wI++ )
	{
		////////////////////////////////////////
		// カレント名の検索
		wKouho = STR_WINCTRL_CONST.CHR_ARG_HOST[wI][in_Key] ;
		wIndex = in_Href.indexOf( wKouho ) ;
		if( wIndex==-1 )
		{
			continue ;
		}
		
		////////////////////////////////////////
		// CSSの拡張インデックス名
		if( STR_WINCTRL_Val.FLG_CSS_PC==true )
		{/////PC版
			wCSS_Ind = "_wide.css" ;
		}
		else
		{/////Mobile版
			wCSS_Ind = "_mini.css" ;
		}
		
		////////////////////////////////////////
		// CSSの拡張インデックス名
		wPath = in_Href.substring( 0, wIndex ) ;
		wPath = wPath + wKouho + in_CSScurr + wCSS_Ind ;
			//妥当性チェック
		if( cWINCTRL_getPathExist( wPath )!=true )
		{/////妥当ではない
			wPath = "" ;
			continue ;
		}
		break ;
	}
	
//	alert(wPath) ;
//	alert(STR_WINCTRL_PathExist_Error) ;
	return wPath ;
}










/*function _WINCTRL_getOrgPath()
{
	let wIndex, wHref ;
	let wPath ;
	
	wHref = STR_WINCTRL_Val.STR_CSS_Info.Obj.location.href ;
	////////////////////////////////////////
	// ルートパスの取得
	wIndex = _WINCTRL_getOrgCurr_Index( wHref ) ;
	if( wIndex==-1 )
	{////定数設定ミス
		alert( "_WINCTRL_getOrgPath:: CHR_COMKEY setting miss." ) ;
		return "" ;
	}
	
	wIndex = wHref.indexOf( "/", wIndex ) ;
	wPath = wHref.substring( 0, wIndex ) + "/" + STR_WINCTRL_Val.STR_CSS_Info.CHR_StylePath ;
	return wPath ;
}*/

/*function _WINCTRL_getOrgCurr_Index( iHref )
{
	let wI, wIndex ;
	
	////////////////////////////////////////
	// ::ルート
	if( STR_WINCTRL_Val.STR_CSS_Info.CHR_CurrName=="" )
	{
		wIndex = iHref.indexOf("https://") ;
		if( wIndex==-1 )
		{////ローカルかも
///			for( wI=0 ; wI<STR_WINCTRL_CONST.CHR_ORGKEY_LOCAL.length ; wI++ )
			for( wI=0 ; wI<STR_HANDLE_CONST.CHR_ORGKEY_LOCAL.length ; wI++ )
			{
///				wIndex = iHref.indexOf(STR_WINCTRL_CONST.CHR_ORGKEY_LOCAL[wI]) ;
				wIndex = iHref.indexOf(STR_HANDLE_CONST.CHR_ORGKEY_LOCAL[wI]) ;
				if( wIndex>0 )
				{////hit
					break ;
				}
			}
			if( wIndex==-1 )
			{////定数設定ミス
				return -1 ;
			}
		}
	}
	////////////////////////////////////////
	// ::カレント
	else
	{
		wIndex = iHref.indexOf( STR_WINCTRL_Val.STR_CSS_Info.CHR_CurrName ) ;
		if( wIndex==-1 )
		{////定数設定ミス
			return -1 ;
		}
	}
	return wIndex ;
}*/



////////////////////////////////////////
// 更新通知アイコン
////////////////////////////////////////
function cUPi( iKey, iOn )
{
	if( iOn=='' )
	{
		return ;
	}
	let wObj, wOn, wFlg ;
	wObj = document.getElementById( iKey ) ;
	wOn = iOn.split("|") ;
	switch( wOn.length )
	{
	case 1 :
		_WINCTRL_UPi_Up( wObj ) ;
		_WINCTRL_UPi_vw( wObj, STR_WINCTRL_Val.CHR_UPI_v ) ;
		break ;
	case 2 :
		wFlg = _WINCTRL_UPi_pUp( wObj, wOn ) ;
		_WINCTRL_UPi_vw( wObj, wFlg ) ;
		break ;
	default :
		break ;
	}
	return ;
}

function _WINCTRL_UPi_Up(iObj)
{
	if((STR_WINCTRL_Val.CHR_UPI_v==true)||(STR_WINCTRL_Val.CHR_UPI_v==false))
	{
		return;
	}
	let wObj, wStr, wRs, wFl, wI, wPCd ;
	wObj = document.getElementById("iUpdate") ;
	if( wObj==null )
	{
		return;
	}
	wStr = wObj.innerHTML.split("\n") ;
	wFl = false;
	for( wI=0 ; wStr.length>wI ; wI++ )
	{
		wRs = wStr[wI].indexOf("：") ;
		if( wRs>-1 )
		{
			wFl = true ;
			break ;
		}
	}
	if(wFl==false)
	{
		return ;
	}
	wStr = wStr[wI].split("：") ;
	wStr = _WINCTRL_UPi_cD(wStr[1]) ;
	if( Array.isArray(wStr)==false )
	{
		return ;
	}
	wPCd = _WINCTRL_UPi_nD() ;
	wStr = _WINCTRL_UPi_Peri( wStr ) ;//rate
	wPCd = _WINCTRL_UPi_Peri( wPCd ) ;//now
	wStr = wPCd - wStr ;
	if( wStr<=STR_WINCTRL_CONST.VAL_UPI_PAST )
	{
		STR_WINCTRL_Val.CHR_UPI_v = true ;
	}
	else
	{
		STR_WINCTRL_Val.CHR_UPI_v = false ;
	}
	return ;
}

function _WINCTRL_UPi_pUp( iObj, iOn )
{
	if((iOn[0]=="")||(iOn[1]==""))
	{
		return false ;
	}
	let wObj, wStr, wPCd ;
	wStr = _WINCTRL_UPi_cD(iOn[1]) ;
	if( Array.isArray(wStr)==false )
	{
		return false ;
	}
	wPCd = _WINCTRL_UPi_nD() ;
	wStr = _WINCTRL_UPi_Peri(wStr) ;//rate
	wPCd = _WINCTRL_UPi_Peri(wPCd) ;//now
	wStr = wPCd - wStr ;
	if( wStr>STR_WINCTRL_CONST.VAL_UPI_PAST )
	{
		return false ;
	}
	return true ;
}

function _WINCTRL_UPi_Peri( iD )
{
	let wD, wI ;
	wD = iD[0] * 365 ;
	for( wI=1 ; wI<=iD[1] ; wI++ )
	{
		wD = wD + STR_WINCTRL_CONST.ARR_UPI_DATE[wI] ;
	}
	wD = wD + iD[2] ;
	return wD ;
}

function _WINCTRL_UPi_vw( iObj, iFlg )
{
	if(iFlg==false)
	{
		return ;
	}
	iObj.className = "UPi-Update" ;
	iObj.src = STR_WINCTRL_CONST.CHR_UPI_ICONPATH ;
	return ;
}

function _WINCTRL_UPi_cD( iDy )
{
	let wD, wI ;
	wD = iDy.split("/") ;
	if(wD.length!=3)
	{
		return '' ;
	}
	for( wI=0 ; wI<3 ; wI++ )	//get file update day
	{
		wD[wI] = parseInt(wD[wI]) ;
		if( (wD[wI]<1) || (wD[wI]>3000) )
		{
			return '' ;
		}
	}
	return wD ;
}

function _WINCTRL_UPi_nD()
{
	let wObj, wPCd ;
	wObj = new Date() ;
	wPCd = new Array() ;
	wPCd.push(parseInt( wObj.getFullYear())) ;
	wPCd.push(parseInt( wObj.getMonth()+1)) ;
	wPCd.push(parseInt( wObj.getDate())) ;
	return wPCd ;
}


////////////////////////////////////////
// URLパラメータ取得
//   https://xxx.xx.jp?h=1000&k=200
//   形式のURLを 連想配列で返す
function cWINCTRL_getArgs( in_Object )
{
	let wArr, wURL, wI, wLine ;
	let wArgs ;
	
	////////////////////////////////////////
	// URLパラメータ取得
	try
	{
		////////////////////////////////////////
		// URL取得
		wURL = in_Object.location.href ;
		
		wArgs = {} ;
		////////////////////////////////////////
		// パラメータ部分の分解
		wArr = wURL.split("?") ;
///		wArgs.args0 = wArr[0] ;
		wArgs["args0"] = wArr[0] ;

		if( wArr.length==2 )
		{
			wArr = wArr[1].split("&") ;
			////////////////////////////////////////
			// URL + パラメータの結合
			for( wI=0 ; wArr.length>wI ; wI++ )
			{
				wLine = wArr[wI].split("=") ;
				if( wLine.length==2 )
				{
					wArgs[wLine[0]] = wLine[1] ;
				}
			}
		}
	}
	catch(e)
	{
///		console.log( "cWINCTRL_getArgs: Exception: " + e ) ;
		//+++++++++++++++++++++++++++++++++++++++
		top.cSTRG_LOG_c( in_Class="cWINCTRL_getArgs", in_Error=true,
			" Exception=" + e +
			"" ) ;
		//+++++++++++++++++++++++++++++++++++++++
	}
	return wArgs ;
}


