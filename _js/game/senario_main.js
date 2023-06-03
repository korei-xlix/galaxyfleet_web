/* /////////////////////////////////////////////////////
::ProjectName= common script  
::github= https://github.com/lucida3rd/starregion_doc  
::Admin= Lucida（twitter: @lucida3rd）  
::Twitter URL= https://twitter.com/lucida3rd  
::Homepage=  https://lucida3web.wixsite.com/prof  
::Message= https://marshmallow-qa.com/lucida3poi  
::Class= CLS_Senario
  
::Update= 2021/7/18  
///////////////////////////////////////////////////// */

/////////////////////////////////////////////////////
// コマンドの種類
/////////////////////////////////////////////////////
//   メッセージ（テキスト）
//   メッセージ（選択肢）
// 
// 
// 
// 
// 
// 
/////////////////////////////////////////////////////









/////////////////////////////////////////////////////
// 
/////////////////////////////////////////////////////
function CLS_Senario_Run( inID )
{
	let wID ;
	
	/////////////////////////////
	// 応答形式の取得
	//   Result : false, Class : null, Func : null, Reason : null, Responce : null, Status : null
	let wRes = CLS_Log_getRes( inClassName="Senario", inFuncName="Run" ) ;
	




	/////////////////////////////
	// 翻訳モードの表示
	if( this.STR_STRG_UserInfo_Val.FLG_JP==true )
	{
		wID = "rTransJP" ;
	}
	else
	{
		wID = "rTransEN" ;
	}
	
	wSubRes = CLS_PageObj_setChecked( this.STR_WindowCtrl_Val.PageObj, wID, true ) ;
	if( wSubRes.Result!=true )
	{
		///失敗
		wRes.Reason = "setChecked is invalid: id=" + wID ;
		CLS_Log( wRes, "A" ) ;
		CLS_LogView( wRes ) ;
		return wRes ;
	}




	
	/////////////////////////////
	// 正常
	wRes.Result = true ;
	return wRes ;
}



