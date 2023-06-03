/* ********************************************
Project  : Star Region
URL      : https://mynoghra.jp/
Class    : STRG_IVENT

Update   : 2019/6/26
***********************************************
イベント設計：

/// https://strg.mynoghra.jp/wsgi/strg_run?88c022d81b7c91ad404db990a4385b39&req=114514&1,32

イベント、シナリオの定義
  ＜イベント＞
    シナリオの塊り。広義ではキャンペーン。シナリオをこなすとイベントが進む。
  ＜シナリオ＞
    イベント内の各振る舞い。行動や選択によってイベントが進んだり、シナリオの進み方が変わったりする。


自動開始イベント（緊急イベント）
メインイベント
サブイベント


******************************************** */

////////////////////////////////////////
//イベントロード
function cSTRG_IVENT_IventLoad( in_ARR_IveTag=new Array() )
{
	if( in_ARR_IveTag.length<=0 )
	{
		//+++++++++++++++++++++++++++++++++++++++
		top.cSTRG_LOG_c( in_Class="cSTRG_IVENT_IventLoad", in_Error=true,
			" No event tag specified" +
			"" ) ;
		//+++++++++++++++++++++++++++++++++++++++
		return ;
	}
	
	let wI, wIndex, wURL, wIveTag ;
	let wObj ;
	let wARR_Req ;
	
	////////////////////////////////////////
	//イベントロードのURL作成
	wIveTag = "" ;
	wIndex  = 1 ;
	for( wI=0 ; in_ARR_IveTag.length>wI ; wI++ )
	{
		wIveTag = wIveTag + in_ARR_IveTag[0] ;
		if( in_ARR_IveTag.length==wIndex )
		{
			break ;
		}
		wIveTag = wIveTag + "," ;
	}
//	wURL = DEF_STRG_IVENT_LOADBASEURL + wIveTag ;
//	
//	////////////////////////////////////////
//	//イベントロード
//	try
//	{
//		wObj = top.document.getElementById( "iIventLoad" ) ;
//		wObj.src = wURL ;
//	}
//	catch(e)
//	{
//		//+++++++++++++++++++++++++++++++++++++++
//		top.cSTRG_LOG_c( in_Class="cSTRG_IVENT_IventLoad", in_Error=true,
//			" Exception: " + e +
//			"" ) ;
//		//+++++++++++++++++++++++++++++++++++++++
//		return ;
//	}
//	
//	////////////////////////////////////////
//	//フラグをロード中にする
//	cSTR_STRG_Ivent.FLG_Load = false ;
//	cSTR_STRG_Ivent.FLG_Loaded = false ;
//	
//	////////////////////////////////////////
//	//イベントロードタイマ スタート
//	cSTRG_TIMER_Start( DEF_STRG_TIMERID_IVENTLOAD ) ;

	wARR_Req = new Array() ;
	wARR_Req.push( wIveTag ) ;
	cSTRG_ADMIN_Request( DEF_STRG_ADMINREQ_JSSENARIO, wARR_Req ) ;
	return ;
}

//function cSTRG_IVENT_IventLoad_Timeout()
//{
//	let wObj, wStatus ;
//	
//	////////////////////////////////////////
//	//イベントロード確認
//	if( cSTR_STRG_Ivent.FLG_Loaded==false )
//	{////ロード未完了
//		////////////////////////////////////////
//		//イベントロードタイマ停止か(時間切れ)
//		if( cSTRG_TIMER_getStatus( DEF_STRG_TIMERID_IVENTLOAD )==false )
//		{
//			try
//			{
//				wObj = top.document.getElementById( "iIventLoad" ) ;
//				wStatus = "cSTRG_IVENT_IventLoad_Timeout: Ivent load timeout:"
//				wStatus = wStatus + " Result=" + wObj.contentWindow.cSTR_STRG_RUN_Result.Result ;
//				wStatus = wStatus + " Reason=" + wObj.contentWindow.cSTR_STRG_RUN_Result.Reason ;
//				//+++++++++++++++++++++++++++++++++++++++
//				top.cSTRG_LOG_c( in_Class="cSTRG_IVENT_IventLoad_Timeout", in_Error=false,
//					wStatus +
//					"" ) ;
//				//+++++++++++++++++++++++++++++++++++++++
//			}
//			catch(e)
//			{
//				//+++++++++++++++++++++++++++++++++++++++
//				top.cSTRG_LOG_c( in_Class="cSTRG_IVENT_IventLoad_Timeout", in_Error=false,
//					" Ivent load is failed, and Exception: " + e +
//					"" ) ;
//				//+++++++++++++++++++++++++++++++++++++++
//			}
///			cSTR_STRG_Ivent.FLG_Loaded = true ;
//			cSTR_STRG_Ivent.FLG_Load   = true ;
//	}
//		return ;
//	}
///	////////////////////////////////////////
///	//イベントロードタイマ停止か(時間切れ)
///	if( cSTRG_TIMER_getStatus( DEF_STRG_TIMERID_IVENTLOAD )==false )
///	{
///		try
///		{
///			wObj = top.document.getElementById( "iIventLoad" ) ;
///			wStatus = "cSTRG_IVENT_IventLoad_Timeout: Ivent load timeout:"
///			wStatus = wStatus + " Result=" + wObj.contentWindow.cSTR_STRG_RUN_Result.Result ;
///			wStatus = wStatus + " Reason=" + wObj.contentWindow.cSTR_STRG_RUN_Result.Reason ;
///			//+++++++++++++++++++++++++++++++++++++++
///			top.cSTRG_LOG_c( in_Class="cSTRG_IVENT_IventLoad_Timeout", in_Error=false,
///				wStatus +
///				"" ) ;
///			//+++++++++++++++++++++++++++++++++++++++
///		}
///		catch(e)
///		{
///			//+++++++++++++++++++++++++++++++++++++++
///			top.cSTRG_LOG_c( in_Class="cSTRG_IVENT_IventLoad_Timeout", in_Error=true,
///				" Exception: " + e +
///				"" ) ;
///			//+++++++++++++++++++++++++++++++++++++++
///		}
//		cSTR_STRG_Ivent.FLG_Loaded = true ;
///		cSTR_STRG_Ivent.FLG_Load   = true ;
///		return ;
///	}
//	
//	////////////////////////////////////////
///	//イベントロード完了処理
//	
//	////////////////////////////////////////
//	//タイマ停止
//	cSTRG_TIMER_Stop( DEF_STRG_TIMERID_IVENTLOAD ) ;
//
//
//////ロードの処理とか
//	wObj = top.document.getElementById( "iIventLoad" ) ;
//	wObj.contentWindow.cSTRG_IVENTDATA_1() ;
//
//
//
//	////////////////////////////////////////
//	//完了
//	cSTR_STRG_Ivent.FLG_Load = true ;
//	return ;
//}








////////////////////////////////////////
//イベント実処理
function _STRG_Ivent_Process( in_ID, in_Index )
{
	var wSeq, wRet, wTxt, wVal ;
	
	wSeq = cSTR_STRG_Ivent[in_Index].Seq ;
	
//	wData.Kind = in_Data.Kind ;
//	wData.Texts  = in_Data.Texts ;
//	wData.CBFunc = in_Data.CBFunc ;

	////////////////////////////////////////
	//イベント種別：1：DEF_STRG_IVENTKIND_UdMsgTxt_Open
	//  下にテキストウィンドウを表示する
	if( cSTR_STRG_Ivent[in_Index].ARR_Data[wSeq].Kind==DEF_STRG_IVENTKIND_UdMsgTxt_Open )
	{
		wRet = "cSTRG_Ivent_Run(" + in_ID + ")" ;
		cSTRG_Window_UdMsgTxt( cSTR_STRG_Ivent[in_Index].ARR_Data[wSeq].Texts, wRet ) ;
	}
	////////////////////////////////////////
	//イベント種別：2：DEF_STRG_IVENTKIND_UdMsgTxt_Close
	//  下のテキストウィンドウを消す
	else if( cSTR_STRG_Ivent[in_Index].ARR_Data[wSeq].Kind==DEF_STRG_IVENTKIND_UdMsgTxt_Close )
	{
		cSTRG_Window_UdMsgTxt( "", "" ) ;
		cSTRG_Ivent_Run( in_ID ) ;//実行に戻す
	}


	////////////////////////////////////////
	//イベント種別：11：DEF_STRG_IVENTKIND_Get_Fuel
	//  燃料を配布し、下にテキストウィンドウを表示する
	else if( cSTR_STRG_Ivent[in_Index].ARR_Data[wSeq].Kind==DEF_STRG_IVENTKIND_Get_Fuel )
	{
		wVal = cSTR_STRG_Ivent[in_Index].ARR_Data[wSeq].Value ;
		cSTR_STRG_MateInfo.Fuel += wVal ;
		cSTRG_Material_View() ;
		wTxt = "燃料が " + wVal + " 増えた。[RET]<br />" ;
		wRet = "cSTRG_Ivent_Run(" + in_ID + ")" ;
		cSTRG_Window_UdMsgTxt( wTxt, wRet ) ;
	}
	////////////////////////////////////////
	//イベント種別：12：DEF_STRG_IVENTKIND_Get_Ammo
	//  弾薬を配布し、下にテキストウィンドウを表示する
	else if( cSTR_STRG_Ivent[in_Index].ARR_Data[wSeq].Kind==DEF_STRG_IVENTKIND_Get_Ammo )
	{
		wVal = cSTR_STRG_Ivent[in_Index].ARR_Data[wSeq].Value ;
		cSTR_STRG_MateInfo.Ammo += wVal ;
		cSTRG_Material_View() ;
		wTxt = "弾薬が " + wVal + " 増えた。[RET]<br />" ;
		wRet = "cSTRG_Ivent_Run(" + in_ID + ")" ;
		cSTRG_Window_UdMsgTxt( wTxt, wRet ) ;
	}
	////////////////////////////////////////
	//イベント種別：13：DEF_STRG_IVENTKIND_Get_Iron
	//  鋼材を配布し、下にテキストウィンドウを表示する
	else if( cSTR_STRG_Ivent[in_Index].ARR_Data[wSeq].Kind==DEF_STRG_IVENTKIND_Get_Iron )
	{
		wVal = cSTR_STRG_Ivent[in_Index].ARR_Data[wSeq].Value ;
		cSTR_STRG_MateInfo.Iron += wVal ;
		cSTRG_Material_View() ;
		wTxt = "鋼材が " + wVal + " 増えた。[RET]<br />" ;
		wRet = "cSTRG_Ivent_Run(" + in_ID + ")" ;
		cSTRG_Window_UdMsgTxt( wTxt, wRet ) ;
	}
	////////////////////////////////////////
	//イベント種別：14：DEF_STRG_IVENTKIND_Get_Gold
	//  資金を配布し、下にテキストウィンドウを表示する
	else if( cSTR_STRG_Ivent[in_Index].ARR_Data[wSeq].Kind==DEF_STRG_IVENTKIND_Get_Gold )
	{
		wVal = cSTR_STRG_Ivent[in_Index].ARR_Data[wSeq].Value ;
		cSTR_STRG_MateInfo.Gold += wVal ;
		cSTRG_Material_View() ;
		wTxt = "資金が " + wVal + " 増えた。[RET]<br />" ;
		wRet = "cSTRG_Ivent_Run(" + in_ID + ")" ;
		cSTRG_Window_UdMsgTxt( wTxt, wRet ) ;
	}


	else
	{/////不正なイベント種別
		alert( "cSTRG_Ivent_Run: 不正なイベント種別 ID=" + in_ID + " Kind=" + cSTR_STRG_Ivent[in_Index].ARR_Data[wSeq].Kind ) ;
		cSTRG_Ivent_Stop( in_ID ) ;	//いちお停止
	}
	return ;
}



////////////////////////////////////////
//イベント作成
////////////////////////////////////////
function cSTRG_Ivent_Create( in_ID=DEF_STRG_IVENTID_dummy, in_ARR_Data=new Array() )
{
	if(( in_ID==DEF_STRG_IVENTID_dummy )||
	   ( in_ARR_Data.length==0 ))
	{/////失敗
		alert( "cSTRG_Ivent_Create: イベント作成失敗 ID=" + in_ID + " Len=" + in_ARR_Data.length ) ;
		return false ;
	}
	
	var wI, wFlg ;
//	var wARR_Data, wData ;
	var wARR_Data ;
	
	////////////////////////////////////////
	//重複してないか
	wFlg = false ;
	for( wI=0 ; wI<cSTR_STRG_Ivent ; wI++ )
	{
		if( cSTR_STRG_Ivent[wI].ID==in_ID )
		{////イベント発見
			wFlg = true ;
			break ;
		}
	}
	if( wFlg==true )
	{/////失敗
		alert( "cSTRG_Ivent_Create: イベント重複 ID=" + in_ID ) ;
		return false ;
	}
	
	////////////////////////////////////////
	//作成（登録）
	wARR_Data = new Array() ;
//	wData     = new STR_STRG_IventData_Str() ;
	for( wI=0 ; wI<in_ARR_Data.length ; wI++ )
	{
//		wData.Kind = in_Data.Kind ;
//		wData.Texts  = in_Data.Texts ;
//		wData.CBFunc = in_Data.CBFunc ;
//		wARR_Data.push( wData ) ;
		wARR_Data.push( in_ARR_Data[wI] ) ;
	}
	
	////////////////////////////////////////
	//作成（登録）
	cSTR_STRG_Ivent.push( new STR_STRG_Ivent_Str( in_ID, wARR_Data ) ) ;
	////////////////////////////////////////
	if( cFlg_STRG_DEBUG_Ivent==true )
	{
		console.log( "Ivent Create: ID=" + in_ID +
			" Len=" + in_ARR_Data.length );
	}
	////////////////////////////////////////
	return true ;
}



////////////////////////////////////////
//イベントデータ作成
////////////////////////////////////////
function cSTRG_IVp( in_ARR_Data, in_Data )
{
	var wARR_Data, wData ;
	
	wARR_Data = in_ARR_Data ;
	////////////////////////////////////////
	//登録データ領域
	wData = new STR_STRG_IventData_Str() ;
	
	////////////////////////////////////////
	//登録データの作成
	wData.Kind = in_Data.Kind ;
	wData.Texts  = in_Data.Texts ;
	wData.Value  = in_Data.Value ;
	wData.CBFunc = in_Data.CBFunc ;
	
	////////////////////////////////////////
	//登録
	wARR_Data.push( wData ) ;
	return wARR_Data ;
}



////////////////////////////////////////
//イベント起動
////////////////////////////////////////
function cSTRG_Ivent_Start( in_ID )
{
	var wIndex ;
	
	////////////////////////////////////////
	//Index取得
	wIndex = _STRG_Ivent_getIndex( in_ID ) ;
	if( wIndex==-1 )
	{/////失敗
		alert( "cSTRG_Ivent_Start: Index取得失敗 ID=" + in_ID ) ;
		return false ;
	}
	
	////////////////////////////////////////
	//完了済みか
	if( cSTR_STRG_Ivent[wIndex].FLG_End==true )
	{/////完了している
		alert( "cSTRG_Ivent_Start: 完了済みイベント ID=" + in_ID ) ;
		return false ;
	}
	
	////////////////////////////////////////
	//イベント中表示+排他開始
	cSTRG_Window_IventDisable() ;
	
	////////////////////////////////////////
	//スタート情報のメモ
	cSTR_STRG_Ivent[wIndex].Seq = -1 ;
	cSTR_STRG_Ivent[wIndex].FLG_Run = true ;
	
	////////////////////////////////////////
	if( cFlg_STRG_DEBUG_Ivent==true )
	{
		console.log( "Ivent Start: ID=" + in_ID +
			" FLG_End=" + cSTR_STRG_Ivent[wIndex].FLG_End +
			" FLG_Run=" + cSTR_STRG_Ivent[wIndex].FLG_Run );
	}
	////////////////////////////////////////
	
	////////////////////////////////////////
	//イベント起動
	cSTRG_Ivent_Run( in_ID ) ;
	return ;
}



////////////////////////////////////////
//イベント停止
////////////////////////////////////////
function cSTRG_Ivent_Stop( in_ID )
{
	var wIndex ;
	
	////////////////////////////////////////
	//Index取得
	wIndex = _STRG_Ivent_getIndex( in_ID ) ;
	if( wIndex==-1 )
	{/////失敗
		alert( "cSTRG_Ivent_Stop: Index取得失敗 ID=" + in_ID ) ;
		return false ;
	}
	
	////////////////////////////////////////
	//ストップ情報のメモ
	cSTR_STRG_Ivent[wIndex].FLG_Run = false ;
	
	////////////////////////////////////////
	//イベント中 排他終わり
	cSTRG_Window_Disable( "OFF" ) ;
	
	////////////////////////////////////////
	if( cFlg_STRG_DEBUG_Ivent==true )
	{
		console.log( "Ivent Stop: ID=" + in_ID +
			" FLG_End=" + cSTR_STRG_Ivent[wIndex].FLG_End +
			" FLG_Run=" + cSTR_STRG_Ivent[wIndex].FLG_Run );
	}
	////////////////////////////////////////
	return ;
}



////////////////////////////////////////
//全イベント停止
////////////////////////////////////////
function cSTRG_Ivent_AllStop()
{
	var wI ;
	
	////////////////////////////////////////
	//イベント停止
	for( wI=0 ; wI<cSTR_STRG_Ivent.length ; wI++ )
	{
//		if( cSTR_STRG_Ivent[wI].ID==DEF_STRG_TIMERID_LOADING )
//		{////停止除外
//			continue ;
//		}
		cSTR_STRG_Ivent[wI].FLG_Run = false ;
	}
	////////////////////////////////////////
	if( cFlg_STRG_DEBUG_Ivent==true )
	{
		console.log( "Ivent AllStop" );
	}
	////////////////////////////////////////
	return ;
}



////////////////////////////////////////
//イベント実行
////////////////////////////////////////
function cSTRG_Ivent_Run( in_ID )
{
	var wIndex ;
	
	////////////////////////////////////////
	//Index取得
	wIndex = _STRG_Ivent_getIndex( in_ID ) ;
	if( wIndex==-1 )
	{/////失敗
		alert( "cSTRG_Ivent_Run: Index取得失敗 ID=" + in_ID ) ;
		return false ;
	}
	
	////////////////////////////////////////
	//イベント実行中か
	if( cSTR_STRG_Ivent[wIndex].FLG_Run==false )
	{/////停止中
		alert( "cSTRG_Ivent_Run: 停止中イベント ID=" + in_ID ) ;
		cSTRG_Ivent_Stop( in_ID ) ;	//いちお停止
		return false ;
	}
	
	////////////////////////////////////////
	//シーケンス進行
	cSTR_STRG_Ivent[wIndex].Seq++ ;
	
	////////////////////////////////////////
	//全イベント終わり
	if( cSTR_STRG_Ivent[wIndex].ARR_Data.length<=cSTR_STRG_Ivent[wIndex].Seq )
	{
		cSTR_STRG_Ivent[wIndex].FLG_End = true ;
		cSTRG_Ivent_Stop( in_ID ) ;
		return ;
	}
	if( cSTR_STRG_Ivent[wIndex].Seq<0 )
	{/////不正
		alert( "cSTRG_Ivent_Run: シーケンス値不正 ID=" + in_ID + " Seq=" + cSTR_STRG_Ivent[wIndex].Seq ) ;
		cSTRG_Ivent_Stop( in_ID ) ;
		return false ;
	}
	
	////////////////////////////////////////
	//イベント実処理
	_STRG_Ivent_Process( in_ID, wIndex ) ;
	
	return ;
}



////////////////////////////////////////
//イベントロード
////////////////////////////////////////
function cSTRG_Ivent_Load( in_ID, in_Seq=-1 )
{
	var wIndex ;
	
	////////////////////////////////////////
	//Index取得
	wIndex = _STRG_Ivent_getIndex( in_ID ) ;
	if( wIndex==-1 )
	{/////失敗
		alert( "cSTRG_Ivent_Load: Index取得失敗 ID=" + in_ID ) ;
		return false ;
	}
	
	////////////////////////////////////////
	//イベントをロード
	if( in_Seq==-1 )
	{/////完了済みイベント
		cSTR_STRG_Ivent[wIndex].FLG_End = true ;
	}
	else
	{/////途中イベント
		cSTR_STRG_Ivent[wIndex].Seq = in_Seq ;
	}
	
	return true ;
}



////////////////////////////////////////
//イベント完了か
////////////////////////////////////////
function cSTRG_Ivent_CheckComp( in_ID )
{
	var wIndex ;
	
	////////////////////////////////////////
	//Index取得
	wIndex = _STRG_Ivent_getIndex( in_ID ) ;
	if( wIndex==-1 )
	{/////イベント未受領
		return DEF_STRG_IVENTCHECK_NONE ;
	}
	
	////////////////////////////////////////
	//イベントをロード
	if( cSTR_STRG_Ivent[wIndex].FLG_End==true )
	{/////イベント完了
		return DEF_STRG_IVENTCHECK_COMP ;
	}
	if( cSTR_STRG_Ivent[wIndex].Seq>=0 )
	{/////イベント実行中
		return DEF_STRG_IVENTCHECK_RUN ;
	}
///	else
///	{/////イベント完了
///		return DEF_STRG_IVENTCHECK_COMP ;
///	}
	return DEF_STRG_IVENTCHECK_WAIT ;
	
///	////////////////////////////////////////
///	//イベント状態不正
///	alert( "cSTRG_Ivent_CheckComp: イベント状態不正 ID=" + in_ID + " End=" + cSTR_STRG_Ivent[wIndex].FLG_End + " Seq=" + cSTR_STRG_Ivent[wIndex].Seq ) ;
///	return DEF_STRG_IVENTCHECK_ERROR ;
}



////////////////////////////////////////
//イベントIndex取得
////////////////////////////////////////
function _STRG_Ivent_getIndex( in_ID )
{
	var wI ;
	
	for( wI=0 ; wI<cSTR_STRG_Ivent.length ; wI++ )
	{
		if( cSTR_STRG_Ivent[wI].ID==in_ID )
		{////イベント発見
			return wI ;
		}
	}
	return -1 ;	//該当なし
}



