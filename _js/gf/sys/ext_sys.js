//#####################################################
//# ::Project  : Galaxy Fleet
//# ::Admin    : Korei (@korei-xlix)
//# ::github   : https://github.com/korei-xlix/website/
//# ::Class    : Sys :: 拡張システム情報
//#####################################################
//# 関数群     :
//#
//# 拡張システム設定
//#		CLS_GF_ExtSys.sSet
//#			in:		inUserID		//ユーザID（いるんかな？）
//#
//#####################################################

//#####################################################
class CLS_GF_ExtSys {
//#####################################################

//#####################################################
//# 拡張システム設定
//#####################################################
	static sSet()
	{
		//###########################
		//# 応答形式の取得
		//#   "Result" : false, "Class" : "(none)", "Func" : "(none)", "Result" : false, "Reason" : "(none)", "Responce" : "(none)"
		let wRes = CLS_OSIF.sGet_Resp({ inClass:"CLS_GF_ExtSys", inFunc:"sSet" }) ;
		
		/////////////////////////////
		// 拡張システム情報 追加設定
		top.gSTR_SystemInfo.gfAdmin			= top.DEF_GF_SYS_AUTHOR ;
		top.gSTR_SystemInfo.gfgithub		= top.DEF_GF_SYS_GITHUB ;
		top.gSTR_SystemInfo.gfSiteURL		= top.DEF_GF_SYS_SITEURL ;
		top.gSTR_SystemInfo.gfVersion		= top.DEF_GF_SYS_VERSION ;
		top.gSTR_SystemInfo.gfLoadVersion	= top.DEF_GF_SYS_LOAD_VERSION ;
		top.gSTR_SystemInfo.gfSaveVersion	= top.DEF_GF_SYS_SAVE_VERSION ;
		
		top.gSTR_SystemInfo.gfStatus		= top.DEF_GF_SYS_STAT_STOP ;
		
		/////////////////////////////
		// コンソール表示
		let wMessage = "Insert Ext System information is complete" ;
		CLS_L.sL({ inRes:wRes, inLevel:"SC", inMessage:wMessage }) ;
		
		/////////////////////////////
		// 正常終了
		wRes['Result'] = true ;
		return wRes ;
	}



//#####################################################
//# スタートボタン制御
//#####################################################
	static sStartButtonCtrl({
		inPageObj = self.document
	})
	{
		//###########################
		//# 応答形式の取得
		//#   "Result" : false, "Class" : "(none)", "Func" : "(none)", "Result" : false, "Reason" : "(none)", "Responce" : "(none)"
		let wRes = CLS_OSIF.sGet_Resp({ inClass:"CLS_GF_ExtSys", inFunc:"sStartButtonCtrl" }) ;
		
		let wSubRes, wMessage ;
		
		/////////////////////////////
		// メンテ表示なら、終わる
		if( top.DEF_GFUNYO_MENTE==true )
		{
			if( top.DEF_INDEX_TEST==true )
			{
				//### コンソール表示
				wMessage = "Start button is On Mente" ;
				CLS_L.sL({ inRes:wRes, inLevel:"SC", inMessage:wMessage }) ;
			}
			
			/////////////////////////////
			// 正常終了
			wRes['Result'] = true ;
			return wRes ;
		}
		
		/////////////////////////////
		// スタートボタン表示
		wSubRes = CLS_PageObj.sSetDisplay({
			inPageObj	: inPageObj,
			inKey		: top.DEF_GF_IDX_INDEX_START,
			inCode		: true
		}) ;
		if( wSubRes['Result']!=true )
		{///失敗
			wRes['Reason'] = "CLS_PageObj.sSetDisplay is failed(2)" ;
			CLS_L.sL({ inRes:wRes, inLevel:"B", inLine:__LINE__ }) ;
			return wRes ;
		}
		
		/////////////////////////////
		// メンテボタン非表示
		wSubRes = CLS_PageObj.sSetDisplay({
			inPageObj	: inPageObj,
			inKey		: top.DEF_GF_IDX_INDEX_MENTE,
			inCode		: false
		}) ;
		if( wSubRes['Result']!=true )
		{///失敗
			wRes['Reason'] = "CLS_PageObj.sSetDisplay is failed(3)" ;
			CLS_L.sL({ inRes:wRes, inLevel:"B", inLine:__LINE__ }) ;
			return wRes ;
		}
		
		if( top.DEF_INDEX_TEST==true )
		{
			//### コンソール表示
			wMessage = "Start button is On Start" ;
			CLS_L.sL({ inRes:wRes, inLevel:"SC", inMessage:wMessage }) ;
		}
		
		/////////////////////////////
		// 正常終了
		wRes['Result'] = true ;
		return wRes ;
	}



//#####################################################
//# システム状態変更
//#####################################################
	static sChg({
		inStatus	=top.DEF_GF_SYS_STAT_STOP
	})
	{
		//###########################
		//# 応答形式の取得
		//#   "Result" : false, "Class" : "(none)", "Func" : "(none)", "Result" : false, "Reason" : "(none)", "Responce" : "(none)"
		let wRes = CLS_OSIF.sGet_Resp({ inClass:"CLS_GF_ExtSys", inFunc:"sSet" }) ;
		
		let wSubRes, wPrevStatus, wMessage ;
		
		/////////////////////////////
		// 入力チェック
		wSubRes = CLS_OSIF.sGetInObject({
			inObject	: top.DEF_GF_ARR_SYS_STAT,
			inKey		: inStatus
		}) ;
		if( wSubRes!=true )
		{
			wRes['Reason'] = "No Status num: inStatus=" + String(inStatus) ;
			CLS_L.sL({ inRes:wRes, inLevel:"A", inLine:__LINE__ }) ;
			return wRes ;
		}
		if( top.gSTR_SystemInfo.gfStatus==inStatus )
		{///設定重複
			wRes['Reason'] = "Extention System Status is dual setting: now Status=" + String(inStatus) ;
			CLS_L.sL({ inRes:wRes, inLevel:"D", inLine:__LINE__ }) ;
			
			wRes['Result'] = true ;
			return wRes ;
		}
		
		/////////////////////////////
		// 時間の設定
		
		//### 初期化→運用
		if(( top.gSTR_SystemInfo.gfStatus==top.DEF_GF_SYS_STAT_INIT ) &&
		   ( inStatus==top.DEF_GF_SYS_STAT_RUN ))
		{
			top.gSTR_Time.SysComp  = top.gSTR_Time.TimeDate ;
			top.gSTR_Time.SysStart = top.gSTR_Time.TimeDate ;
		}
		//### 初期化→初期化完了
		else if(( top.gSTR_SystemInfo.gfStatus==top.DEF_GF_SYS_STAT_INIT ) &&
		        ( inStatus==top.DEF_GF_SYS_STAT_STBY ))
		{
			top.gSTR_Time.SysComp  = top.gSTR_Time.TimeDate ;
		}
		//### 運用→停止
		else if(( top.gSTR_SystemInfo.gfStatus==top.DEF_GF_SYS_STAT_RUN ) &&
		        ( inStatus==top.DEF_GF_SYS_STAT_STOP ))
		{
			top.gSTR_Time.SysStop  = top.gSTR_Time.TimeDate ;
		}
		//### 停止→運用
		else if(( top.gSTR_SystemInfo.gfStatus==top.DEF_GF_SYS_STAT_STOP ) &&
		        ( inStatus==top.DEF_GF_SYS_STAT_RUN ))
		{
			top.gSTR_Time.SysStart  = top.gSTR_Time.TimeDate ;
		}
		
		/////////////////////////////
		// 状態変更
		wPrevStatus = top.gSTR_SystemInfo.gfStatus ;
		top.gSTR_SystemInfo.gfStatus = inStatus ;
		
		//### コンソール表示
		if((( wPrevStatus==top.DEF_GF_SYS_STAT_RUN ) && ( top.gSTR_SystemInfo.gfStatus==top.DEF_GF_SYS_STAT_ROCK )) ||
		   (( wPrevStatus==top.DEF_GF_SYS_STAT_ROCK ) && ( top.gSTR_SystemInfo.gfStatus==top.DEF_GF_SYS_STAT_RUN )))
		{/// 操作排他：ON←→OFF
			if( top.DEF_INDEX_TEST==true )
			{
				if( top.gSTR_SystemInfo.gfStatus==top.DEF_GF_SYS_STAT_ROCK )
				{
					CLS_OSIF.sConsInfo({ inText:"User control: Rock ON" }) ;
				}
				else if( top.gSTR_SystemInfo.gfStatus==top.DEF_GF_SYS_STAT_RUN )
				{
					CLS_OSIF.sConsInfo({ inText:"User control: Rock OFF" }) ;
				}
			}
		}
		else
		{
			wMessage = "Change Extention System Status" ;
			wMessage = wMessage + '\n' + "  Pre Stat=" + String(wPrevStatus) ;
			wMessage = wMessage + '\n' + "  New Stat=" + String(top.gSTR_SystemInfo.gfStatus) ;
			CLS_L.sL({ inRes:wRes, inLevel:"SC", inMessage:wMessage }) ;
		}
		
		/////////////////////////////
		// 正常終了
		wRes['Result'] = true ;
		return wRes ;
	}



//#####################################################
//# システム状態取得
//#####################################################
	static sGet()
	{
		return top.gSTR_SystemInfo.gfStatus ;
	}



//#####################################################
//# 排他状態取得
//#####################################################
	static sGetRock()
	{
		let wRock = false ;
		if( top.gSTR_SystemInfo.gfStatus==top.DEF_GF_SYS_STAT_ROCK )
		{
			wRock = true ;
		}
		return wRock ;
	}



//#####################################################
}

