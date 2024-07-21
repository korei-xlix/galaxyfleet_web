//#####################################################
//# ::Project  : Galaxy Fleet
//# ::Admin    : Korei (@korei-xlix)
//# ::github   : https://github.com/korei-xlix/galaxyfleet/
//# ::Class    : ロード
//#####################################################

//#####################################################
//# ロード
//#####################################################
function CLS_Load_Load({
	inEvent
})
{
	///////////////////////////////
	// 応答形式の取得
	let wRes = top.CLS_L_getRes({ inClassName : "CLS_Load", inFuncName : "CLS_Load_Load" }) ;
	
	///////////////////////////////
	// パスコード退避クリア
	VAL_SAVE_PassCode = "" ;
	
	///////////////////////////////
	// ファイル選択
	wSubRes = CLS_FileCtrl_SelectFile({
		event		: inEvent,
		inCBFunc	: __Load_Loaded
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_FileCtrl_SelectFile is failed" ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// ファイル読み込み
	wSubRes = CLS_FileCtrl_ReadFile({
		inInfo		: wSubRes['Responce']
	}) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
		wRes['Reason'] = "CLS_FileCtrl_ReadFile is failed" ;
		top.CLS_L({ inRes:wRes, inLevel: "B" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return wRes ;
}

///////////////////////////////////////////////////////
// ロード後、バージョン分岐
function __Load_Loaded( inReaded, inInfo, inFile )
{
	///////////////////////////////
	// 応答形式の取得
	let wRes = top.CLS_L_getRes({ inClassName : "CLS_Load", inFuncName : "CLS_Load_Load" }) ;
	
	let wStatus, wGetLine ;
	
	///////////////////////////////
	// リードが正常だったか
	if( inReaded==false )
	{
		//リード異常？
		wStatus = "Save file load is failed: [inFile]=" + inInfo['Name'] ;
		top.CLS_L({ inRes:wRes, inLevel: "SR", inMessage: wStatus }) ;
		wRes['Result'] = true ;
		return wRes ;
	}
	
	///////////////////////////////
	// ファイルタイプがテキストか
	if( inInfo['Type']!="text/plain" )
	{
		//テキストじゃないので終わる
		wRes['Result'] = true ;
		return wRes ;
	}
	
	///////////////////////////////
	// バージョン情報読み込み
	wSubRes = __Load_L({ inIndex : 0, inData:inFile }) ;
	if( wSubRes['Result']!=true )
	{
		//失敗
///		wRes['Reason'] = "バージョン情報に異常があるためロードできません"
		wRes['Reason'] = "Version info read is failer"
		top.CLS_L({ inRes:wRes, inLevel: "D" }) ;
		return wRes ;
	}
	wGetLine = wSubRes['Responce'] ;
	
	if(( wGetLine[0]!="::VERSION::" )||( wGetLine[1]!=":::1:::" ))
	{
		//失敗
///		wRes['Reason'] = "バージョン情報が破損しているためロードできません"
		wRes['Reason'] = "Version info is breaked"
		top.CLS_L({ inRes:wRes, inLevel: "D" }) ;
		return wRes ;
	}
	
	//#####################################################
	//# バージョンによる分岐
	//#####################################################
	
	//#####################################################
	//# v0001
	//#####################################################
	if( wGetLine[2]=="v0001" )
	{
		wSubRes = CLS_Load_v0001({ inData:inFile }) ;
	}
	//#####################################################
	//# v0001
	//#####################################################
	else
	{
		//対応バージョンなし
///		wRes['Reason'] = "古いバージョンのデータのためロードできません [Version]=" + wGetLine[2]
		wRes['Reason'] = "Unable to load due to old version data: [Version]=" + String(wGetLine[2])
		top.CLS_L({ inRes:wRes, inLevel: "D" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// 判定
	if( wSubRes['Result']!=true )
	{
		//データ異常
///		wRes['Reason'] = "データが破損しているためロードできません"
		wRes['Reason'] = "Save data is breaked"
		top.CLS_L({ inRes:wRes, inLevel: "D" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// 正常
	wRes['Result'] = true ;
	return wRes ;
}

///////////////////////////////////////////////////////
// ロード後、バージョン分岐
function __Load_L({
	inIndex = 0,
	inData
})
{
	///////////////////////////////
	// 応答形式の取得
	let wRes = top.CLS_L_getRes({ inClassName : "CLS_Load", inFuncName : "__Load_L" }) ;
	
	let wARR_Text, wHash ;
	
	///////////////////////////////
	// ハッシュとデータを分離する
	try
	{
		wARR_Text = inData[inIndex].split( DEF_SAVE_HASH_BOUNDARY ) ;
	}
	catch(e)
	{
		///////////////////////////////
		// 例外処理
///		wRes['Reason'] = "Exception(1) [inIndex]=" + String(inIndex) + " [message]=" + String( e.message )
		wRes['Reason'] = "[Exception]=" + String( e.message ) ;
		wRes['Reason'] = wRes['Reason'] + " [inIndex]=" + String( inIndex ) ;
		top.CLS_L({ inRes:wRes, inLevel: "D" }) ;
		return wRes ;
	}
	
	if( wARR_Text.length!=2 )
	{
		//長さ異常
		wRes['Reason'] = "Data is failer (Hash) [inIndex]=" + String(inIndex)
		top.CLS_L({ inRes:wRes, inLevel: "D" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	//ハッシュチェック
	wHash = MD5_hexhash( wARR_Text[0].trim() ) ;
	
	if( wARR_Text[1]!=wHash )
	{
		//ハッシュ異常
		wRes['Reason'] = "Hash value is failer [inIndex]=" + String(inIndex)
		top.CLS_L({ inRes:wRes, inLevel: "D" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// データを分離する
	try
	{
		wARR_Text = wARR_Text[0].split( DEF_SAVE_DATA_BOUNDARY ) ;
	}
	catch(e)
	{
		///////////////////////////////
		// 例外処理
///		wRes['Reason'] = "Exception(2) [inIndex]=" + String(inIndex) + " [message]=" + String( e.message )
		wRes['Reason'] = "[Exception]=" + String( e.message ) ;
		wRes['Reason'] = wRes['Reason'] + " [inIndex]=" + String( inIndex ) ;
		top.CLS_L({ inRes:wRes, inLevel: "D" }) ;
		return wRes ;
	}
	
	if( wARR_Text.length<3 )
	{
		//ハッシュ異常
		wRes['Reason'] = "Data length is failer [inIndex]=" + String(inIndex)
		top.CLS_L({ inRes:wRes, inLevel: "D" }) ;
		return wRes ;
	}
	
	///////////////////////////////
	// 正常
	wRes['Responce'] = wARR_Text ;
	wRes['Result'] = true ;
	return wRes ;
}



