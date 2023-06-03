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
	this.VAL_CSS_PC_WIDTH = 415 ;
//	this.CHR_ORGKEY_LOCAL = new Array( "starregion" ) ;
//	
//	this.CHR_COMKEY_REMOTE = "localhost" ;
//	this.CHR_COMKEY_LOCAL  = "HomePage" ;
//	this.CHR_COM_LOCAL     = "HomePage_index" ;
	this.CHR_CSS_COM_HEAD  = "common" ;
	this.CHR_CSS_COM_PATH  = "/_res/css/" + this.CHR_CSS_COM_HEAD ;
	
	this.ARR_UPI_DATE     = new Array(0,31,28,31,30,31,30,31,31,30,31,30,31) ;
//	this.CHR_UPI_ICONPATH = "https://mynoghra.jp/_res/icon/icon_up.gif";
	this.CHR_UPI_ICONPATH = "https://" + STR_HANDLE_CONST.CHR_COMKEY_REMOTE + "/_res/icon/icon_up.gif";
	this.VAL_UPI_PAST     = 3 ;
	
}
const STR_WINCTRL_CONST = new STR_WINCTRL_ConstVal_Str() ;



////////////////////////////////////////
// クラス変数
////////////////////////////////////////
function STR_WINCTRL_CSSinfo_Str()
{
	this.FLG_Init = false ;
	
	this.FLG_ComBranch = true ;
	this.Obj           = "" ;
	this.CHR_CurrName  = "" ;
	this.CHR_ComPath   = "" ;
	this.CHR_OrgPath   = "" ;
	this.CHR_StylePath = "" ;
}

function STR_WINCTRL_Val_Str()
{
	this.FLG_CSS_PC = true ;
	
	this.CHR_UPI_v  = -1 ;
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
////////////////////////////////////////
function cWINCTRL_CSS_Set( iObj, iCurrName, iSstylePath, iComBranch=true, iPConly=false )
{
	STR_WINCTRL_Val.STR_CSS_Info.Obj = iObj ;
	STR_WINCTRL_Val.STR_CSS_Info.CHR_CurrName  = iCurrName ;
	STR_WINCTRL_Val.STR_CSS_Info.CHR_StylePath = iSstylePath ;
	STR_WINCTRL_Val.STR_CSS_Info.FLG_ComBranch = iComBranch ;
	
	STR_WINCTRL_Val.STR_CSS_Info.CHR_ComPath = _WINCTRL_getComPath() ;
	STR_WINCTRL_Val.STR_CSS_Info.CHR_OrgPath = _WINCTRL_getOrgPath() ;
	
	if((cWINCTRL_getWindowWidth(STR_WINCTRL_Val.STR_CSS_Info.Obj)>=STR_WINCTRL_CONST.VAL_CSS_PC_WIDTH)||(iPConly==true))
	{
		STR_WINCTRL_Val.FLG_CSS_PC = true ;
		
		alert("OK");
		
		_WINCTRL_CSS_Sel( true ) ;
	}
	else
	{
		STR_WINCTRL_Val.FLG_CSS_PC = false ;
		_WINCTRL_CSS_Sel( false ) ;
	}
	STR_WINCTRL_Val.STR_CSS_Info.FLG_Init = true ;
	return;
}

function cWINCTRL_CSS_Sw( iFwide )
{
	if( STR_WINCTRL_Val.STR_CSS_Info.FLG_Init!=true )
	{
		return;
	}
	_WINCTRL_CSS_Sel( iFwide );
	return;
}

function _WINCTRL_CSS_Sel( iFwide )
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
}

function _WINCTRL_CSS_St( iPath, iKey )
{
	let wObj ;
	

	alert(iPath + ":" +iKey);

	wObj = STR_WINCTRL_Val.STR_CSS_Info.Obj.getElementById( iKey ) ;
	wObj.href = iPath ;
	return ;
}

function _WINCTRL_getComPath()
{
	let wIndex, wLastIndex, wHref ;
	let wPath, wCurrPath ;
	
	wHref = STR_WINCTRL_Val.STR_CSS_Info.Obj.location.href ;
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

function _WINCTRL_getOrgPath()
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
}

function _WINCTRL_getOrgCurr_Index( iHref )
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
}



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


