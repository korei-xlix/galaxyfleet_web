//#####################################################
//# ::Project  : Galaxy Fleet
//# ::Admin    : Korei (@korei-xlix)
//# ::github   : https://github.com/korei-xlix/galaxyfleet/
//# ::Class    : クライアント情報
//#####################################################

/////////////////////////////
// ipinfoのアドレス
const DEF_CLIENTINFO_IPINFO = 'https://ipinfo.io?callback=__ClientInfo_callback' ;

// ipinfo取得タイマ用
const DEF_CLIENTINFO_TIMER_TIMEOUT = 5000 ;	//タイムアウト秒数(デフォルト)
const DEF_CLIENTINFO_TIMER_RETRY   = 6 ;	//リトライ回数 (5x6=30秒待ち)



/////////////////////////////
// クライアント情報
function STR_ClientInfo_Str()
{
	this.Valid = false ;
	
	this.HostName  = "" ;
	this.IPaddress = "" ;
}
var STR_ClientInfo_Val = new STR_ClientInfo_Str() ;



//#####################################################
//# ホスト名取得
//#####################################################
function CLS_ClientInfo_getHost({
	inPageObj
})
{
	///////////////////////////////
	// 応答形式の取得 (LogView)
	let wRes = top.CLS_L_getRes({ inClassName : "CLS_ClientInfo", inFuncName : "CLS_ClientInfo_getHost" }) ;
	
	let wHref, wHost, wLen, wStr ;
	
	///////////////////////////////
	// Href USLの取得
	wSubRes = CLS_Path_getPageHref({
		inPageObj : inPageObj
	}) ;
	if( wSubRes['Result']!=true )
	{
		///失敗
		wRes['Reason'] = "CLS_Path_getPageHref is failed" ;
		CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	wHref = wSubRes['Responce']
	
	///////////////////////////////
	// Host名の切り出し
	wHost = wHref.split("https://")
	if( wHost.length!=2 )
	{
		///失敗
		wRes['Reason'] = "host name is error: href=" + String(wHref) ;
		CLS_L({ inRes:wRes, inLevel: "C" }) ;
		return wRes ;
	}
	wLen = wHost[1].indexOf("/") ;
	wHost = wHost[1].substring( 0, wLen ) ;
	
	//#############################
	//# デバッグ出力
	//#############################
	if( DEF_TEST_LOG==true )
	{
		wStr = "get Host name =" + String(wHost) ;
		CLS_L({ inRes:wRes, inLevel: "SR", inMessage: wStr }) ;
	}
	
	///////////////////////////////
	// 正常
	wRes['Responce'] = wHost ;
	wRes['Result'] = true ;
	return wRes ;
}



//#####################################################
//# クライアント情報取得
//#####################################################
function CLS_ClientInfo_getIPinfo({
	inCallback
})
{
	///////////////////////////////
	// 応答形式の取得 (LogView)
	let wRes = top.CLS_L_getRes({ inClassName : "CLS_ClientInfo", inFuncName : "CLS_ClientInfo_getIPinfo" }) ;
	
///	///////////////////////////////
///	// クライアント情報の取得
///	wSubRes = __ClientInfo_getClient() ;
///	if( wSubRes['Result']!=true )
///	{
///		///失敗
///		wRes['Reason'] = "__ClientInfo_getClient is failed" ;
///		CLS_L({ inRes:wRes, inLevel: "B" }) ;
///		return wRes ;
///	}
///	
///	//#############################
///	//# デバッグ出力
///	//#############################
///	if( DEF_TEST_LOG==true )
///	{
///		wStr = "request ipinfo" ;
///		CLS_L({ inRes:wRes, inLevel: "SR", inMessage: wStr }) ;
///	}
///	
///	///////////////////////////////
///	// 正常
///	wRes['Responce'] = this.STR_ClientInfo_Val ;
///	wRes['Result'] = true ;
///	return wRes ;
///}
///
///function __ClientInfo_getClient()
///{
///	///////////////////////////////
///	// 応答形式の取得 (LogView)
///	let wRes = top.CLS_L_getRes({ inClassName : "CLS_ClientInfo", inFuncName : "__ClientInfo_getClient" }) ;
///	
	let wScript ;
	let wLen, wStr ;
	
	///////////////////////////////
	// クライアント情報クリア
	this.STR_ClientInfo_Val = new STR_ClientInfo_Str() ;
	
	///////////////////////////////
	// ホスト名の取得
	wSubRes = CLS_ClientInfo_getHost({
		inPageObj : self.document
	}) ;
	if( wSubRes['Result']!=true )
	{
		///失敗
		wRes['Reason'] = "CLS_ClientInfo_getHost is failed" ;
		CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// localhostなら処理停止
	wLen = wSubRes['Responce'].indexOf("localhost") ;
	if( wLen>=0 )
	{
		/// localhostの場合
		this.STR_ClientInfo_Val.HostName  = "localhost" ;
		this.STR_ClientInfo_Val.IPaddress = "127.0.0.1" ;
		this.STR_ClientInfo_Val.Valid = true ;
		
		///////////////////////////////
		// 正常
		wRes['Result'] = true ;
		return wRes ;
	}
	
	///////////////////////////////
	// ipinfoの取得
	try
	{
		wScript = document.createElement('script') ;
		wScript.src = DEF_CLIENTINFO_IPINFO ;
		document.body.appendChild( wScript ) ;
///		document.body.removeChild( wScript ) ;
		
		if( DEF_TEST_LOG==true )
		{
			wStr = "requested ipinfo" ;
			CLS_L({ inRes:wRes, inLevel: "SR", inMessage: wStr }) ;
		}
	}
	catch(e)
	{
		///失敗
		wRes['Reason'] = "call ipinfo is failed : " + String(e) ;
		CLS_L({ inRes:wRes, inLevel: "C" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// タイマ作成
	wSubRes = CLS_TimerCtrl_setTimer({
		inTimerID	: DEF_GLOBAL_TIMER_ID_CLIENTINFOE_get,
///		inCallback	: CLS_ClientInfo_getClientInfo,
		inCallback	: inCallback,
		inValue		: DEF_CLIENTINFO_TIMER_TIMEOUT,
		inRetry		: DEF_CLIENTINFO_TIMER_RETRY
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_TimerCtrl_setTimer is failer" ;
		CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// タイマ起動
	wSubRes = CLS_TimerCtrl_startTimer({
		inTimerID	: DEF_GLOBAL_TIMER_ID_CLIENTINFOE_get
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_TimerCtrl_startTimer is failer" ;
		CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return wRes ;
}
///////////////////////////////
// ipinfoのcallback
function __ClientInfo_callback( outData )
{
	///////////////////////////////
	// 応答形式の取得 (LogView)
	let wRes = top.CLS_L_getRes({ inClassName : "CLS_ClientInfo", inFuncName : "__ClientInfo_callback" }) ;
	
	///////////////////////////////
	// タイマ受信
	wSubRes = CLS_TimerCtrl_reciveTimer({
		inTimerID	: DEF_GLOBAL_TIMER_ID_CLIENTINFOE_get
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_TimerCtrl_reciveTimer is failer" ;
		CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	
	//#############################
	//# デバッグ出力
	//#############################
	if( DEF_TEST_LOG==true )
	{
		wStr = "call __ClientInfo_callback" ;
		CLS_L({ inRes:wRes, inLevel: "SR", inMessage: wStr }) ;
	}
	
	this.STR_ClientInfo_Val.HostName  = String(outData.hostname) ;
	this.STR_ClientInfo_Val.IPaddress = String(outData.ip) ;
	this.STR_ClientInfo_Val.Valid = true ;
	
	///////////////////////////////
	// 正常
	return ;
}



//#####################################################
//# クライアント情報取得
//#####################################################
function CLS_ClientInfo_getClientInfo()
{
	///////////////////////////////
	// 応答形式の取得 (LogView)
	let wRes = top.CLS_L_getRes({ inClassName : "CLS_ClientInfo", inFuncName : "CLS_ClientInfo_getClientInfo" }) ;
	
	///////////////////////////////
	// クライアント情報が有効か
	if( this.STR_ClientInfo_Val.Valid!=true )
	{
		//無効
		wRes['Reason'] = "STR_ClientInfo_Val is invalid" ;
		CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	
	//#############################
	//# デバッグ出力
	//#############################
	if( DEF_TEST_LOG==true )
	{
		wStr = "get ipinfo :" ;
		wStr = wStr + " Host=" + String(this.STR_ClientInfo_Val.HostName) ;
		wStr = wStr + " IP=" + String(this.STR_ClientInfo_Val.IPaddress) ;
		CLS_L({ inRes:wRes, inLevel: "SR", inMessage: wStr }) ;
	}
	
	///////////////////////////////
	// 正常
	wRes['Responce'] = this.STR_ClientInfo_Val ;
	wRes['Result'] = true ;
	return wRes ;
}

function CLS_ClientInfo_test()
{
	CLS_putCon("CLS_ClientInfo test=OK") ;
}


/*

	let wHTML_Frame, wHTML_Doc, wHTML_P ;

///	CLS_ClientInfo_sleep( 5000 );

	
	///////////////////////////////
	// ダミードキュメントの作成
	wHTML_Frame = document.getElementById("theFrame");
	wHTML_Doc   = document.implementation.createHTMLDocument("New Document");
	wHTML_P     = wHTML_Doc.createElement("p");

///	// タグの実装
///	wHTML_P.textContent = "This is a new paragraph.";
///	try
///	{
///		wHTML_Doc.body.appendChild( wHTML_P );
///	}
///	catch(e)
///	{
///		console.log(e);
///	}
///	
	wScript = wHTML_Doc.createElement('script') ;
	wScript.src = 'https://ipinfo.io?callback=callback' ;
	try
	{
//		wHTML_Doc.body.appendChild( wScript );
//		wHTML_Doc.body.removeChild( wScript );
		self.document.body.appendChild( wScript );
	}
	catch(e)
	{
		console.log(e);
	}

	console.log("OK") ;
///	console.dir( wHTML_Doc ) ;
	console.log( wHTML_Doc ) ;


//  // Copy the new HTML document into the frame
//  let destDocument = frame.contentDocument;
//  let srcNode = doc.documentElement;
//  let newNode = destDocument.importNode(srcNode, true);
//
//  destDocument.replaceChild(newNode, destDocument.documentElement);
*/

