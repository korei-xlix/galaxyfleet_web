























/* ********************************************
Project  : Star Region
URL      : https://mynoghra.jp/
Class    : STRG_MATERIAL

Update   : 2019/7/2
******************************************** */

////////////////////////////////////////
//定期収集開始
////////////////////////////////////////
function cSTRG_MATERIAL_Start()
{
	cSTR_STRG_MateInfo.RetryNum = 0 ;	//リトライクリア
	cSTRG_TIMER_Start( top.DEF_STRG_TIMERID_MATERIAL ) ;
	return ;
}


////////////////////////////////////////
//時間取得(**タイマで呼ぶ)
////////////////////////////////////////
function cSTRG_MATERIAL_RegularlyGet()
{
	let wInd, wRea ;
	
	wRea = -1 ;	//レア=未抽選
	////////////////////////////////////////
	//取得する資源の分類
	for( cSTR_STRG_MateInfo.RetryNum=0 ;
		 cSTR_STRG_MateInfo.RetryNum<top.DEF_STRG_MATERIAL_RETRYNUM ;
		 cSTR_STRG_MateInfo.RetryNum++ )
	{
		wInd = MATH_Random( 4 ) ;
			// 0..燃料
			// 1..希金
			// 2..鋼材
			// 3..合板
		//前回と異なる。確定。
		if( cSTR_STRG_MateInfo.RegularlyGetID!=wInd )
		{
			//レア抽選
///			wRea = MATH_Random( 20 ) ;	//5%
///			wRea = MATH_Random( 40 ) ;	//2.5%
			wRea = MATH_Random( 50 ) ;	//2.5%
				// 0  ..レア確定
				// 1  ..屑石
				// 他 ..通常
			break ;
		}
	}
	cSTR_STRG_MateInfo.RegularlyGetID = wInd ;	//前回を記憶
	
	////////////////////////////////////////
	//資源を取得する
	cSTRG_MATERIAL_Get( wInd, wRea ) ;
	
	////////////////////////////////////////
	//時間経過ボーナス ゲット
	_STRG_MATERIAL_TimeBonusGet() ;
	
	////////////////////////////////////////
	//メニュー設定の更新
	cSTRG_MATERIAL_setValid() ;
	
	////////////////////////////////////////
	//表示の更新
	cSTRG_MATERIAL_MainView() ;
	
	if( cSTR_STRG_Ivent.FLG_Invalid==false )
	{////排他されてなければメニューを更新する
		cSTRG_MENU_MainMenu_View( true ) ;
	}
	return ;
}


////////////////////////////////////////
//取得
////////////////////////////////////////
///function cSTRG_MATERIAL_Get( in_ID )
function cSTRG_MATERIAL_Get( in_ID, in_Rea )
{
	let wMate, wName ;
	
	////////////////////////////////////////
	//取得量を取得
	if((( in_ID==0 )&&( in_Rea==0 ))||( in_Rea==1 ))
	{/////核石、屑石の場合
		wMate = 1 ;
	}
	else if((( in_ID==1 )||( in_ID==3 ))&&( in_Rea==0 ))
	{/////輝石の場合
		wMate = MATH_Random( 2 ) + 1 ;
	}
	else
	{
		wMate = MATH_Random( 3 ) + 1 ;
	}
	
	////////////////////////////////////////
	//資源を取得する
	if( in_Rea==1 )
	{////屑石
		cSTR_STRG_MateInfo.Data.Scrp.Value += wMate ;
		cSTRG_LOG_Write(
			"資源獲得: " + cSTR_STRG_MateInfo.Data.Scrp.Name + " +" + wMate ,
			"Resource acquisition: " + cSTR_STRG_MateInfo.Data.Scrp.Name + " +" + wMate ) ;
		return ;
	}
	if( in_ID==0 )
	{////////燃料or核石
		if( in_Rea==0 )
		{////レア：核石
			cSTR_STRG_MateInfo.Data.CorS.Value += wMate ;
			wName = cSTR_STRG_MateInfo.Data.CorS.Name ;
		}
		else
		{////燃料
			cSTR_STRG_MateInfo.Data.Fuel.Value += wMate ;
			wName = cSTR_STRG_MateInfo.Data.Fuel.Name ;
		}
	}
	else if( in_ID==1 )
	{////////希金or輝石
		if( in_Rea==0 )
		{////レア：輝石
			cSTR_STRG_MateInfo.Data.GliS.Value += wMate ;
			wName = cSTR_STRG_MateInfo.Data.GliS.Name ;
		}
		else
		{////希金
			cSTR_STRG_MateInfo.Data.RerM.Value += wMate ;
			wName = cSTR_STRG_MateInfo.Data.RerM.Name ;
		}
	}
	else if( in_ID==2 )
	{////////鋼材or弾薬
		if( in_Rea==0 )
		{////レア：弾薬
			cSTR_STRG_MateInfo.Data.Ammo.Value += wMate ;
			wName = cSTR_STRG_MateInfo.Data.Ammo.Name ;
		}
		else
		{////鋼材
			cSTR_STRG_MateInfo.Data.Stel.Value += wMate ;
			wName = cSTR_STRG_MateInfo.Data.Stel.Name ;
		}
	}
	else
	{//////// in_ID==3
	/////////合板or輝石
		if( in_Rea==0 )
		{////レア：輝石
			cSTR_STRG_MateInfo.Data.GliS.Value += wMate ;
			wName = cSTR_STRG_MateInfo.Data.GliS.Name ;
		}
		else
		{////合板
			cSTR_STRG_MateInfo.Data.HyPl.Value += wMate ;
			wName = cSTR_STRG_MateInfo.Data.HyPl.Name ;
		}
	}
	
	////////////////////////////////////////
	//ログ
	cSTRG_LOG_Write(
		"資源獲得: " + wName + " +" + wMate ,
		"Resource acquisition: " + wName + " +" + wMate ) ;
	return ;
}


////////////////////////////////////////
//ログインボーナス設定
////////////////////////////////////////
function cSTRG_MATERIAL_LoginSet()
{
	let wLgDate, wChDate, wBonusNum ;
	let wI, wK, wInd, wGet_Mate, wMae_Mate, wARR_Bonus, wMateNum ;
	let wReset ;
	
	////////////////////////////////////////
	//フラグおとす
	cSTR_STRG_MateInfo.FLG_Bonus = false ;
	
	////////////////////////////////////////
	//あのチェック
	wReset = STORAGE_Lget( DEF_STRG_MATEINFO_RESET_RUN + cSTR_STRG_UserInfo.UserID ) ;
	if( wReset=="" )
	{/////初回
		wReset = 0 ;
	}
	else
	{/////カウントアップ
		wReset = MATH_ValParse( wReset ) ;
		wReset += 1 ;
///		cSTRG_LOG_Write(
///			"リセットマラソン検出: " + wReset + " 回目",
///			"Reset marathon detection: " + wReset + " Second time" ) ;
	}
	STORAGE_Lset( DEF_STRG_MATEINFO_RESET_RUN + cSTR_STRG_UserInfo.UserID, wReset ) ;
	cSTR_STRG_UserInfo.ResetRun = wReset ;
	if( wReset>=DEF_STRG_MATEINFO_RESET_RUN_STOP )
	{/////ボーナスを失う（案内はない）
		cSTRG_LOG_Write(
			"過剰にロードされたためボーナス規制を設定します",
			"Set bonus regulations for being overloaded" ) ;
		return ;
	}
	
	////////////////////////////////////////
	//ログインボーナス粗品
	wARR_Bonus = new Array(
		"Fuel", "Fuel", "Fuel", "Fuel", "Fuel", "Fuel", "Fuel", "Fuel", "Fuel",
		"Stel", "Stel", "Stel", "Stel", "Stel", "Stel", "Stel", "Stel", "Stel",
		"HyPl", "HyPl", "HyPl", "HyPl", "HyPl", "HyPl", "HyPl", "HyPl", "HyPl",
		"RerM", "RerM", "RerM", "RerM", "RerM", "RerM", "RerM", "RerM", "RerM",
		"HSConst", "HSConst", "Capt", "Capt", "Ammo", "Ammo",
		"GliS", "GliS", "Scrp", "CorS"
		) ;
	
	// 1/46= 2.1%
	
	////////////////////////////////////////
	//抽選回数の計算
	//  ・最終ログオフ～ログインまでの時間(分)分
	//  　抽選をまわす
	//  ・備蓄で得られる資源と少し違う
	wLgDate = new Date( cSTR_STRG_UserInfo.LgDate ) ;
	wChDate = new Date( cSTR_STRG_UserInfo.ChDate ) ;
	wBonusNum = wLgDate.getTime() - wChDate.getTime() ;
	wBonusNum = Math.floor( wBonusNum / (1000*60) ) ;
	
	////////////////////////////////////////
	//取得する資源の分類
	wMae_Mate = "" ;
	for( wI=0 ; wBonusNum>wI ; wI++ )
	{
		for( wK=0 ; top.DEF_STRG_MATERIAL_RETRYBONUS>wK ; wK++ )
		{/////前回と同じ資源ならリトライする
			wInd = MATH_Random( wARR_Bonus.length ) ;
			wGet_Mate = wARR_Bonus[wInd] ;
			
			//前回と異なる。確定。
			if( wMae_Mate!=wGet_Mate )
			{/////確定
				break ;
			}
		}
		//前回として記憶する
		wMae_Mate = wGet_Mate ;
		
		////////////////////////////////////////
		//取得量を取得
		if( wGet_Mate=="Capt" )
		{/////資金
			wMateNum = MATH_Random( 3 ) + 1 ;
			wMateNum = wMateNum * 100 ;
		}
		else if(( wGet_Mate=="CorS" )||( wGet_Mate=="Scrp" ))
		{/////核石、屑石
			wMateNum = 1 ;
		}
		else if(( wGet_Mate=="GliS" )||( wGet_Mate=="HSConst" ))
		{/////輝石、高速建造剤
			wMateNum = MATH_Random( 2 ) + 1 ;
		}
		else
		{/////燃料、合板、希金、鋼材、弾薬
			wMateNum = MATH_Random( 3 ) + 1 ;
		}
		
		////////////////////////////////////////
		//ボーナス値を設定
		cSTR_STRG_MateInfo.Data[wGet_Mate].Bonus += wMateNum ;
		
	}
	
	////////////////////////////////////////
	//ボーナスあり
	if( wMae_Mate!="" )
	{
		cSTR_STRG_MateInfo.FLG_Bonus = true ;
	}
	return ;
}


////////////////////////////////////////
//ログインボーナス ゲット
////////////////////////////////////////
function cSTRG_MATERIAL_LoginGet()
{
	////////////////////////////////////////
	//ボーナスありか
	if( cSTR_STRG_MateInfo.FLG_Bonus!=true )
	{////ボーナスなし
		return ;
	}
	
	let wStr, wStr2, wObj ;
	
	////////////////////////////////////////
	//ボーナス配布＆配布資源テキスト作成
	wStr = "" ;
	for( let wLine in cSTR_STRG_MateInfo.Data )
	{
		if( cSTR_STRG_MateInfo.Data[wLine].Bonus>0 )
		{
			wStr = wStr + "　" + cSTR_STRG_MateInfo.Data[wLine].Name + "　+" + 
					cSTR_STRG_MateInfo.Data[wLine].Bonus + "<br>" ;
			cSTR_STRG_MateInfo.Data[wLine].Value += cSTR_STRG_MateInfo.Data[wLine].Bonus ;
			
			cSTRG_LOG_Write(
				"ログインボーナス獲得: " + cSTR_STRG_MateInfo.Data[wLine].Name + " +" + cSTR_STRG_MateInfo.Data[wLine].Bonus,
				"Login bonus earned: " + cSTR_STRG_MateInfo.Data[wLine].Name + " +" + cSTR_STRG_MateInfo.Data[wLine].Bonus ) ;
			
			cSTR_STRG_MateInfo.Data[wLine].Bonus = 0 ;
		}
	}
	
	////////////////////////////////////////
	//テキスト合成
	wStr2 = cSTRG_TRANS_getString( "以下の資源を獲得しました。", "The following resources were acquired." ) + '\n' ;
	wStr2 = wStr2 + "" + cSTRG_TRANS_getString( "【最終ログオフ日時: ", "Last logoff date: " ) + cSTR_STRG_UserInfo.ChDate ;
	wStr2 = wStr2 + "】<br>" + '\n' ;
	wStr = wStr2 + wStr ;
	
	////////////////////////////////////////
	//メッセージを表示する
	try
	{
		wObj = top.document.getElementById( "iMain" ) ;
		wObj.contentWindow.cSTRG_MSGBOX_MsgSet(
			in_TextJP=wStr,
			in_TextEN=wStr,
			 ) ;
		wObj.contentWindow.cSTRG_MSGBOX_CelSet(
			in_TextJP="確認",
			in_TextEN="Confirmation",
			in_CBFunc="" ) ;
///		wObj.contentWindow.cSTRG_MSGBOX_Open(
///			in_CBFunc="" ) ;
	}
	catch(e)
	{////ありえない
		//+++++++++++++++++++++++++++++++++++++++
		top.cSTRG_LOG_c( in_Class="cSTRG_MATERIAL_LoginGet", in_Error=true,
			" Exception=" + e +
			"" ) ;
		//+++++++++++++++++++++++++++++++++++++++
	}
	
	////////////////////////////////////////
	//配布したのでフラグを落とす
	cSTR_STRG_MateInfo.FLG_Bonus = false ;
	return ;
}


////////////////////////////////////////
//錬金経過
//  ログイン時に錬金が継続しているとき、カウンタを進ませる
////////////////////////////////////////
function cSTRG_MATERIAL_AlchemyPast()
{
	let wObj, wLgDate, wChDate, wStr, wStr2 ;
	let wI, wK, wKey, wIndex, wVal, wNums, wCombo, wArKind, wName ;
	let wSecond, wWorkSecond, wZanSecond, wARR_Index ;
	
	////////////////////////////////////////
	//最終ログオフ～ログインまでの秒数を求める
	wLgDate = new Date( cSTR_STRG_UserInfo.LgDate ) ;
	wChDate = new Date( cSTR_STRG_UserInfo.ChDate ) ;
	wSecond = wLgDate.getTime() - wChDate.getTime() ;
	wSecond = Math.floor( wSecond / 1000 ) ;
	
///	wStr = "" ;
	wIndex = 1 ;
	////////////////////////////////////////
	//錬金情報を舐めて
	//  ・カウンタを経過秒数分減らす
	//  ・カウント一杯で資源を還元する
	//  ・得た資源はボーナス値にまとめる
	for( wI=0 ; 3>wI ; wI++, wIndex++ )
	{
		wKey = "Data" + wIndex ;
		////////////////////////////////////////
		//錬金中(=0未満)でなければスキップ
		if( cSTR_STRG_AlchemyInfo[wKey].Counter<0 )
		{
			continue ;
		}
		
		////////////////////////////////////////
		///残りの変換に必要な時間(秒)
		wWorkSecond = (cSTR_STRG_AlchemyInfo[wKey].SrcNums * DEF_STRG_ALCHEMING_MAXCOUNT) + cSTR_STRG_AlchemyInfo[wKey].Counter ;
		wZanSecond = wWorkSecond - wSecond ;
		
		////////////////////////////////////////
		///とっくに変換終わった
		///  ・設定数とカウンタをクリアする
		if( wZanSecond<=0 )
		{
			//配布回数を設定
			wNums = cSTR_STRG_AlchemyInfo[wKey].SrcNums + 1 ;
			
			//***錬金状態の設定
			cSTR_STRG_AlchemyInfo[wKey].SrcNums = 0 ;
			cSTR_STRG_AlchemyInfo[wKey].Counter = -1 ;
		}
		////////////////////////////////////////
		///まだ残ってる
		///  ・経過時間分、設定数とカウンタを減少させる
		else
		{
			//配布回数の設定
			wVal  = Math.floor( wZanSecond / DEF_STRG_ALCHEMING_MAXCOUNT ) ;//残り回数
			wNums = cSTR_STRG_AlchemyInfo[wKey].SrcNums - wVal ;
			
			//***錬金状態の設定
			cSTR_STRG_AlchemyInfo[wKey].SrcNums = wVal ;
			cSTR_STRG_AlchemyInfo[wKey].Counter = wZanSecond - (wVal * DEF_STRG_ALCHEMING_MAXCOUNT) ;
		}
		//+++++++++++++++++++++++++++++++++++++++
		top.cSTRG_LOG_c( in_Class="cSTRG_MATERIAL_AlchemyPast", in_Error=false,
				" wLgDate="     + wLgDate +
				" wChDate="     + wChDate +
				" wSecond="     + wSecond +
				" wZanSecond="  + wZanSecond +
				" wWorkSecond=" + wWorkSecond +
				" wNums="       + wNums +
				"" ) ;
		//+++++++++++++++++++++++++++++++++++++++
		wCombo = cSTR_STRG_AlchemyInfo[wKey].SrcKind ;
		wARR_Index = cSTRG_MATERIAL_getRenkinIndex( wIndex ) ;
		if( wARR_Index.length==0 )
		{/////ありえない
			//+++++++++++++++++++++++++++++++++++++++
			top.cSTRG_LOG_c( in_Class="cSTRG_MATERIAL_AlchemyPast", in_Error=false,
				" cSTRG_MATERIAL_getRenkinIndex is failed" +
				"" ) ;
			//+++++++++++++++++++++++++++++++++++++++
			return ;
		}
		
		////////////////////////////////////////
		///配布数分、各資源のボーナスに加算する
		for( wK=0 ; wARR_Index.length>wK ; wK++ )
		{
			wVal    = cSTR_STRG_MateInfo.Data[wCombo].ARR_Renkin[wARR_Index[wK]][1] * wNums ;
			wArKind = cSTR_STRG_MateInfo.Data[wCombo].ARR_Renkin[wARR_Index[wK]][0] ;
///			wName   = cSTR_STRG_MateInfo.Data[wArKind].Name ;	//資源名
///			cSTR_STRG_MateInfo.Data[wArKind].Value += wVal ;	//資源の追加
			cSTR_STRG_MateInfo.Data[wArKind].Bonus += wVal ;	//資源をボーナスに追加
			//+++++++++++++++++++++++++++++++++++++++
			top.cSTRG_LOG_c( in_Class="cSTRG_MATERIAL_AlchemyPast", in_Error=false,
				" Name=" + cSTR_STRG_MateInfo.Data[wArKind].Name +
				" Bonus=" + cSTR_STRG_MateInfo.Data[wArKind].Bonus +
				" Nums=" + wNums +
///				" Val="  + wVal +
				"" ) ;
			//+++++++++++++++++++++++++++++++++++++++
///			wStr = wStr + "　" + wName + "　x" + wVal + "<br>" ;
///			////////////////////////////////////////
///			//ログ
///			cSTRG_LOG_Write(
///			"錬金の経過による資源還元: " + wName + " +" + wVal ,
///			"Resource return by progress of alchemy: " + wName + " +" + wVal ) ;
		}
		
		////////////////////////////////////////
		///錬金が終わっていれば、錬金資源を消す
		if( cSTR_STRG_AlchemyInfo[wKey].Counter<0 )
		{
			cSTR_STRG_AlchemyInfo[wKey].SrcKind = "" ;
			cSTR_STRG_AlchemyInfo[wKey].DstKind = "" ;
		}
	}
	
	////////////////////////////////////////
	//まとめたボーナス値を錬金資源として配布する
	//  ログも作成する
	wStr = "" ;
	for( let wMateLine in cSTR_STRG_MateInfo.Data )
	{
		if( cSTR_STRG_MateInfo.Data[wMateLine].Bonus<=0 )
		{/////得た資源はなし
			continue ;
		}
		
		////////////////////////////////////////
		//メッセージボックス用
		wStr = wStr + "　" + cSTR_STRG_MateInfo.Data[wMateLine].Name + " +" + cSTR_STRG_MateInfo.Data[wMateLine].Bonus + "<br>" ;
		
		////////////////////////////////////////
		//ログ
		cSTRG_LOG_Write(
			"錬金の経過による資源還元: " + cSTR_STRG_MateInfo.Data[wMateLine].Name + " +" + cSTR_STRG_MateInfo.Data[wMateLine].Bonus,
			"Resource return by progress of alchemy: " + cSTR_STRG_MateInfo.Data[wMateLine].Name + " +" + cSTR_STRG_MateInfo.Data[wMateLine].Bonus ) ;
		
		cSTR_STRG_MateInfo.Data[wMateLine].Bonus = 0 ;
		////////////////////////////////////////
	}
	if( wStr=="" )
	{//////資源なし
		return ;
	}
	
	////////////////////////////////////////
	//テキスト合成
	wStr2 = cSTRG_TRANS_getString(
		"前回ログオフ前に行った錬金が経過し、以下の資源を獲得しました。",
		"The alchemy we went before the last logoff has passed and we have the following resources." ) + "<br>" + '\n' ;
///	wStr2 = wStr2 + "" + cSTRG_TRANS_getString( "【最終ログオフ日時: ", "Last logoff date: " ) + cSTR_STRG_UserInfo.ChDate ;
///	wStr2 = wStr2 + "】<br>" + '\n' ;
	wStr = wStr2 + wStr ;
	
	////////////////////////////////////////
	//メッセージを設定する
	try
	{
		wObj = top.document.getElementById( "iMain" ) ;
		wObj.contentWindow.cSTRG_MSGBOX_MsgSet(
			in_TextJP=wStr,
			in_TextEN=wStr,
			 ) ;
		wObj.contentWindow.cSTRG_MSGBOX_CelSet(
			in_TextJP="確認",
			in_TextEN="Confirmation",
			in_CBFunc="" ) ;
///		wObj.contentWindow.cSTRG_MSGBOX_Open(
///			in_CBFunc="" ) ;
	}
	catch(e)
	{////ありえない
		//+++++++++++++++++++++++++++++++++++++++
		top.cSTRG_LOG_c( in_Class="cSTRG_MATERIAL_AlchemyPast", in_Error=true,
			" Exception=" + e +
			"" ) ;
		//+++++++++++++++++++++++++++++++++++++++
	}
	return ;
}


////////////////////////////////////////
//時間経過ボーナス ゲット(**備蓄タイマ処理から1分ごと起動)
////////////////////////////////////////
function _STRG_MATERIAL_TimeBonusGet()
{
	let wLgDate, wChDate, wBonusNum ;
	let wI, wK, wInd, wGet_Mate, wMae_Mate, wARR_Bonus, wMateNum ;
	
	let wReset ;
	
	////////////////////////////////////////
	//経過時間のカウント(+1分)
	cSTR_STRG_UserInfo.LoginMinute10 += 1 ;
	cSTR_STRG_UserInfo.LoginMinute30 += 1 ;
	cSTR_STRG_UserInfo.LoginMinute60 += 1 ;
	
	////////////////////////////////////////
	//10分ごと処理
	if( cSTR_STRG_UserInfo.LoginMinute10>=10 )
	{
		cSTR_STRG_UserInfo.LoginMinute10 = 0 ;//クリア
		
		////////////////////////////////////////
		//あれを消す
		if( cSTR_STRG_UserInfo.ResetRun==0 )
		{
			STORAGE_Lremove( DEF_STRG_MATEINFO_RESET_RUN + cSTR_STRG_UserInfo.UserID ) ;
		}
		if( cSTR_STRG_UserInfo.ResetRun<DEF_STRG_MATEINFO_RESET_RUN_STOP )
		{/////制限なし
			////////////////////////////////////////
			//時間経過ボーナス配布
			cSTR_STRG_MateInfo.Data.Fuel.Value += 20 ;
			cSTR_STRG_MateInfo.Data.Stel.Value += 20 ;
			cSTR_STRG_MateInfo.Data.HyPl.Value += 20 ;
			cSTR_STRG_MateInfo.Data.RerM.Value += 20 ;
			
			cSTRG_LOG_Write(
				"時間経過ボーナス獲得: " + cSTR_STRG_MateInfo.Data.Fuel.Name + " +20",
				"Time lapse bonus earned: " + cSTR_STRG_MateInfo.Data.Fuel.Name + " +20" ) ;
			cSTRG_LOG_Write(
				"時間経過ボーナス獲得: " + cSTR_STRG_MateInfo.Data.Stel.Name + " +20",
				"Time lapse bonus earned: " + cSTR_STRG_MateInfo.Data.Stel.Name + " +20" ) ;
			cSTRG_LOG_Write(
				"時間経過ボーナス獲得: " + cSTR_STRG_MateInfo.Data.HyPl.Name + " +20",
				"Time lapse bonus earned: " + cSTR_STRG_MateInfo.Data.HyPl.Name + " +20" ) ;
			cSTRG_LOG_Write(
				"時間経過ボーナス獲得: " + cSTR_STRG_MateInfo.Data.RerM.Name + " +20",
				"Time lapse bonus earned: " + cSTR_STRG_MateInfo.Data.RerM.Name + " +20" ) ;
		}
	}
	
	////////////////////////////////////////
	//30分ごと処理
	if( cSTR_STRG_UserInfo.LoginMinute30>=30 )
	{
		cSTR_STRG_UserInfo.LoginMinute30 = 0 ;//クリア
		if( cSTR_STRG_UserInfo.ResetRun<DEF_STRG_MATEINFO_RESET_RUN_STOP )
		{/////制限中
			////////////////////////////////////////
			//時間経過ボーナス配布
			cSTR_STRG_MateInfo.Data.CorS.Value += 1 ;
			cSTR_STRG_MateInfo.Data.GliS.Value += 10 ;
			
			cSTRG_LOG_Write(
				"時間経過ボーナス獲得: " + cSTR_STRG_MateInfo.Data.CorS.Name + " +1",
				"Time lapse bonus earned: " + cSTR_STRG_MateInfo.Data.CorS.Name + " +1" ) ;
			cSTRG_LOG_Write(
				"時間経過ボーナス獲得: " + cSTR_STRG_MateInfo.Data.GliS.Name + " +10",
				"Time lapse bonus earned: " + cSTR_STRG_MateInfo.Data.GliS.Name + " +10" ) ;
		}
	}
	
	////////////////////////////////////////
	//60分ごと処理
	if( cSTR_STRG_UserInfo.LoginMinute60>=60 )
	{
		cSTR_STRG_UserInfo.LoginMinute60 = 0 ;//クリア
		
		////////////////////////////////////////
		//あれを消す
		if( cSTR_STRG_UserInfo.ResetRun>=DEF_STRG_MATEINFO_RESET_RUN_STOP )
		{/////制限中
			STORAGE_Lremove( DEF_STRG_MATEINFO_RESET_RUN + cSTR_STRG_UserInfo.UserID ) ;
			cSTR_STRG_UserInfo.ResetRun = 0 ;	//許す
			
			cSTRG_LOG_Write(
				"時間経過したためボーナス規制を解除しました",
				"The bonus regulation has been canceled because time has passed" ) ;
			return ;
		}
		
		////////////////////////////////////////
		//時間経過ボーナス配布
		cSTR_STRG_MateInfo.Data.Capt.Value += 2000 ;
		cSTR_STRG_MateInfo.Data.Scrp.Value += 1 ;
		
		cSTRG_LOG_Write(
			"時間経過ボーナス獲得: " + cSTR_STRG_MateInfo.Data.Capt.Name + " +2000",
			"Time lapse bonus earned: " + cSTR_STRG_MateInfo.Data.Capt.Name + " +2000" ) ;
		cSTRG_LOG_Write(
			"時間経過ボーナス獲得: " + cSTR_STRG_MateInfo.Data.Scrp.Name + " +1",
			"Time lapse bonus earned: " + cSTR_STRG_MateInfo.Data.Scrp.Name + " +1" ) ;
	}
	return ;
}


////////////////////////////////////////
//資材系メニューの有効設定
////////////////////////////////////////
function cSTRG_MATERIAL_setValid()
{
	let wI, wFlg, wMenu ;
	
	////////////////////////////////////////
	// 徴発、調達、建造、製造、錬金
	wMenu = new Array(
		"iBtn-Requisition", "iBtn-Procurement",
		"iBtn-Construction", "iBtn-Manufacturing", "iBtn-Alchemy" ) ;
	
	////////////////////////////////////////
	// 各設定
	for( wI=0 ; wMenu.length>wI ; wI++ )
	{
		wFlg = cSTRG_MATERIAL_checkValid( in_ID=wMenu[wI], in_FLG_Msg=false )
		cSTRG_MENU_setMainMenu( in_ID=wMenu[wI], inValid=wFlg ) ;
	}
	return ;
}


////////////////////////////////////////
//資材系メニューの有効チェック
////////////////////////////////////////
function cSTRG_MATERIAL_checkValid( in_ID="", in_FLG_Msg=true )
{
	let wFlg ;
	
	////////////////////////////////////////
	// 徴発
	//   資金の残数チェック
	if( in_ID=="iBtn-Requisition" )
	{
		if( cSTR_STRG_MateInfo.Data.Capt.Value<cSTR_STRG_MateInfo.Data.Capt.VAL_1SetNum )
		{
			if( in_FLG_Msg==true )
			{
				cSTRG_TRANS_Msg(
					"[資金]が1000以上必要です",
					"Need more than 1000 [Fund]" ) ;
			}
			return false ;
		}
	}
	////////////////////////////////////////
	// 調達
	//   資金の残数チェック
	else if( in_ID=="iBtn-Procurement" )
	{
		if( cSTR_STRG_MateInfo.Data.Capt.Value<cSTR_STRG_MateInfo.Data.Capt.VAL_1SetNum )
		{
			if( in_FLG_Msg==true )
			{
				cSTRG_TRANS_Msg(
					"[資金]が1000以上必要です",
					"Need more than 1000 [Funds]" ) ;
			}
			return false ;
		}
	}
	////////////////////////////////////////
	// 建造
	//   核石、鋼材の残数チェック
	else if( in_ID=="iBtn-Construction" )
	{
		if(( cSTR_STRG_MateInfo.Data.CorS.Value<cSTR_STRG_MateInfo.Data.CorS.VAL_1SetNum )||
		   ( cSTR_STRG_MateInfo.Data.Stel.Value<cSTR_STRG_MateInfo.Data.Stel.VAL_1SetNum ) )
		{
			if( in_FLG_Msg==true )
			{
				cSTRG_TRANS_Msg(
					"[核石]が1以上、[鋼材]が100以上必要です",
					"At least one [Core Stone] and at least 100 [Steel Material] are required" ) ;
			}
			return false ;
		}
	}
	////////////////////////////////////////
	// 製造
	//   輝石、希金、合板の残数チェック
	else if( in_ID=="iBtn-Manufacturing" )
	{
		if(( cSTR_STRG_MateInfo.Data.GliS.Value<cSTR_STRG_MateInfo.Data.GliS.VAL_1SetNum )||
		   (( cSTR_STRG_MateInfo.Data.RerM.Value<cSTR_STRG_MateInfo.Data.RerM.VAL_1SetNum ) &&
		    ( cSTR_STRG_MateInfo.Data.HyPl.Value<cSTR_STRG_MateInfo.Data.HyPl.VAL_1SetNum ) )  )
		{
			if( in_FLG_Msg==true )
			{
				cSTRG_TRANS_Msg(
					"[輝石]が1以上、[レアメタル]もしくは[ハイパープラスチック]が100以上必要です",
					"1 or more of [Glitter Stone], 100 or more of [Rare Metal] or [Hyper Plastic] is required." ) ;
			}
			return false ;
		}
	}
	////////////////////////////////////////
	// 錬金
	//   輝石、希石、合板の残数チェック
	else if( in_ID=="iBtn-Alchemy" )
	{
		////1セットの数量が1つでも超えていればメニューを開ける
		wFlg = false ;
		for( let wLine in cSTR_STRG_MateInfo.Data )
		{
			if( cSTR_STRG_MateInfo.Data[wLine].Value>=cSTR_STRG_MateInfo.Data[wLine].VAL_1SetNum )
			{////1セットある
				wFlg = true ;
			}
		}
		if( wFlg!=true )
		{////1セットが1つもない
			if( in_FLG_Msg==true )
			{
				cSTRG_TRANS_Msg(
					"錬金をするための最小限の資材が不足してます",
					"There is a shortage of minimum resources for alchemy" ) ;
			}
			return false ;
		}
	}
	else
	{//////ありえない
		//+++++++++++++++++++++++++++++++++++++++
		top.cSTRG_LOG_c( in_Class="cSTRG_MATERIAL_checkValid", in_Error=true,
			" Exception=" + e +
			"" ) ;
		//+++++++++++++++++++++++++++++++++++++++
		return false ;
	}
	
	////////////////////////////////////////
	//有効
	return true ;
}


////////////////////////////////////////
//資材表示(**メイン画面用)
////////////////////////////////////////
function cSTRG_MATERIAL_MainView()
{
	let wObj, wObjMate, wHTMLName ;
	
	////////////////////////////////////////
	//メイン画面の翻訳
	try
	{
		////////////////////////////////////////
		//ファイル名取得
		wHTMLName = cSTRG_TRANS_getHTMLName( "main" ) ;
		wHTMLName = "game/" + wHTMLName ;
		
		////////////////////////////////////////
		//トップのフレーム取得
		wObj = top.document.getElementById( "iMain" ) ;
		if( wObj.src.indexOf( wHTMLName )<0 )
		{////メイン画面ではない
			//+++++++++++++++++++++++++++++++++++++++
			top.cSTRG_LOG_c( in_Class="cSTRG_MATERIAL_MainView", in_Error=false,
				" Main frame is Not found" +
				"" ) ;
			//+++++++++++++++++++++++++++++++++++++++
			return ;
		}
		
		////////////////////////////////////////
		//資材を表示する
		for( let wLine in cSTR_STRG_MateInfo.Data )
		{
			wObjMate = wObj.contentWindow.document.getElementById( "iMain-" + wLine ) ;
			wObjMate.innerText = cSTR_STRG_MateInfo.Data[wLine].Value ;
		}
	}
	catch(e)
	{
		//+++++++++++++++++++++++++++++++++++++++
		top.cSTRG_LOG_c( in_Class="cSTRG_MATERIAL_MainView", in_Error=true,
			" Exception=" + e +
			"" ) ;
		//+++++++++++++++++++++++++++++++++++++++
	}
	return ;
}


////////////////////////////////////////
//錬金可否
////////////////////////////////////////
function cSTRG_MATERIAL_getWhetherAlchemy()
{
	let wIndex, wFlg, wKey, wMate ;
	let wI, wDstMate ;
	
	wIndex  = 0 ;
	////////////////////////////////////////
	//資源残量による可否
	for( let wLine in cSTR_STRG_MateInfo.Data )
	{
		wFlg = false ;
		////////////////////////////////////////
		//錬金可否を判定  wFlg=true =錬金可
		if( cSTR_STRG_MateInfo.Data[wLine].Value>=cSTR_STRG_MateInfo.Data[wLine].VAL_1SetNum )
		{
			wFlg = true ;
		}
		
		////////////////////////////////////////
		//錬金可否の設定
		cSTR_STRG_MateInfo.Data[wLine].FLG_Alchemy = wFlg ;
		
		wIndex += 1 ;
	}
	
	////////////////////////////////////////
///	//錬金中の資源と、隣接資源を錬金不可する
	//錬金中の資源を錬金不可する
	wIndex = 1 ;
	for( ; wIndex<=2 ; wIndex++ )
	{
		wKey  = "Data" + wIndex ;
		wMate = cSTR_STRG_AlchemyInfo[wKey].SrcKind ;
		if( wMate!="" )
		{
///			for( wI=0 ; cSTR_STRG_MateInfo.Data[wMate].ARR_Renkin.length>wI ; wI++ )
///			{
///				wDstMate = cSTR_STRG_MateInfo.Data[wMate].ARR_Renkin[wI][0] ;
///				cSTR_STRG_MateInfo.Data[wDstMate].FLG_Alchemy = false ;
///			}
///			/////錬金中の資源も不可
			/////錬金中の資源を錬金不可
			cSTR_STRG_MateInfo.Data[wMate].FLG_Alchemy = false ;
		}
	}
	return ;
}


////////////////////////////////////////
//錬金支払い  **錬金 変換開始時
////////////////////////////////////////
function cSTRG_MATERIAL_PayAlcheming( in_No )
{
	let wKey, wVal, wPayMate ;
	
	wKey = "Data" + in_No ;
	////////////////////////////////////////
	//支払う資源の計算をする
	wPayMate = cSTR_STRG_AlchemyInfo[wKey].SrcKind ;
	wVal = cSTR_STRG_MateInfo.Data[wPayMate].VAL_1SetNum * cSTR_STRG_AlchemyInfo[wKey].SrcNums ;
	
	////////////////////////////////////////
	//支払い
	cSTR_STRG_MateInfo.Data[wPayMate].Value -= wVal ;
	cSTR_STRG_AlchemyInfo[wKey].SrcNums -= 1 ;//1回目の資源は即時消費する
	
	////////////////////////////////////////
	//資源画面の更新
	cSTRG_MATERIAL_MainView() ;
	
	////////////////////////////////////////
	//ログ
	cSTRG_LOG_Write(
		"錬金開始による資源消費: " + cSTR_STRG_MateInfo.Data[wPayMate].Name + " -" + wVal ,
		"Resource consumption by alchemy start: " + cSTR_STRG_MateInfo.Data[wPayMate].Name + " -" + wVal ) ;
	return ;
}


////////////////////////////////////////
//錬金払い戻し  **錬金キャンセル時
////////////////////////////////////////
function cSTRG_MATERIAL_RefundAlcheming( in_No )
{
	let wKey, wVal, wPayMate ;
	
	wKey = "Data" + in_No ;
	////////////////////////////////////////
	//払い戻し資源の計算をする
	wPayMate = cSTR_STRG_AlchemyInfo[wKey].SrcKind ;
	wVal = cSTR_STRG_MateInfo.Data[wPayMate].VAL_1SetNum * cSTR_STRG_AlchemyInfo[wKey].SrcNums ;
	
	////////////////////////////////////////
	//支払い
	cSTR_STRG_MateInfo.Data[wPayMate].Value += wVal ;
	cSTR_STRG_AlchemyInfo[wKey].SrcNums = 0 ;//支払ったセットは失う
	
	////////////////////////////////////////
	//資源画面の更新
	cSTRG_MATERIAL_MainView() ;
	
	////////////////////////////////////////
	//ログ
	cSTRG_LOG_Write(
		"錬金中止による資源返還: " + cSTR_STRG_MateInfo.Data[wPayMate].Name + " +" + wVal ,
		"Resource return due to alchemy cancellation: " + cSTR_STRG_MateInfo.Data[wPayMate].Name + " +" + wVal ) ;
	
	return ;
}


////////////////////////////////////////
//錬金還元
////////////////////////////////////////
function cSTRG_MATERIAL_AlchemyRduction( in_No )
{
	let wKey, wVal, wPayMate ;
	let wI, wRdMate, wARR_Index ;
	
	wKey = "Data" + in_No ;
	////////////////////////////////////////
	//資源を還元していく
	wPayMate = cSTR_STRG_AlchemyInfo[wKey].SrcKind ;
	wVal = cSTR_STRG_MateInfo.Data[wPayMate].VAL_1SetNum * cSTR_STRG_AlchemyInfo[wKey].SrcNums ;
	
	wARR_Index = cSTRG_MATERIAL_getRenkinIndex( in_No ) ;
	if( wARR_Index.length==0 )
	{/////ありえない
		//+++++++++++++++++++++++++++++++++++++++
		top.cSTRG_LOG_c( in_Class="cSTRG_MATERIAL_AlchemyRduction", in_Error=false,
			" cSTRG_MATERIAL_getRenkinIndex is failed" +
			"" ) ;
		//+++++++++++++++++++++++++++++++++++++++
		return ;
	}
	for( wI=0 ; wARR_Index.length>wI ; wI++ )
	{
		wVal    = cSTR_STRG_MateInfo.Data[wPayMate].ARR_Renkin[wARR_Index[wI]][1] ;
		wRdMate = cSTR_STRG_MateInfo.Data[wPayMate].ARR_Renkin[wARR_Index[wI]][0] ;
		cSTR_STRG_MateInfo.Data[wRdMate].Value += wVal ;
		
		////////////////////////////////////////
		//ログ
		cSTRG_LOG_Write(
		"錬金による資源還元: " + cSTR_STRG_MateInfo.Data[wRdMate].Name + " +" + wVal ,
		"Resource return by alchemy: " + cSTR_STRG_MateInfo.Data[wRdMate].Name + " +" + wVal ) ;
	}
	
	////////////////////////////////////////
	//資源画面の更新
	cSTRG_MATERIAL_MainView() ;
	
	////////////////////////////////////////
	//残り資源を減らす
	if( cSTR_STRG_AlchemyInfo[wKey].SrcNums>=0 )
	{////まだ変換するので、次のセット分を減らす
		cSTR_STRG_AlchemyInfo[wKey].SrcNums -= 1 ;
	}
	/////0の場合はこの周で変換終わり
	return ;
}


////////////////////////////////////////
//錬金 変換先Index取得
//  前提：変換元・変換先の設定
////////////////////////////////////////
function cSTRG_MATERIAL_getRenkinIndex( in_No )
{
	let wI, wKey, wCombo, wDstCombo ;
	let wARR_Index ;
	
	wARR_Index = new Array() ;
	wKey = "Data" + in_No ;
	////////////////////////////////////////
	//変換元・変換先
	wCombo = cSTR_STRG_AlchemyInfo[wKey].SrcKind ;
	wDstCombo = cSTR_STRG_AlchemyInfo[wKey].DstKind ;
	
	if(( wCombo=="" )||( wDstCombo=="") )
	{//////変換元か変換先が未設定
		//+++++++++++++++++++++++++++++++++++++++
		top.cSTRG_LOG_c( in_Class="cSTRG_MATERIAL_getRenkinIndex", in_Error=true,
			" No=" + in_No + 
			" SrcKind=" + cSTR_STRG_AlchemyInfo[wKey].SrcKind +
			" DstKind=" + cSTR_STRG_AlchemyInfo[wKey].DstKind +
			" Unset SrcKind or DstKind" +
			"" ) ;
		//+++++++++++++++++++++++++++++++++++++++
		return wARR_Index ;
	}
	
	////////////////////////////////////////
	//選択式の資源の場合 =Indexは必ず1つ
	if( cSTR_STRG_MateInfo.Data[wCombo].FLG_RenChoi==true )
	{
		for( wI=0 ; cSTR_STRG_MateInfo.Data[wCombo].ARR_Renkin.length>wI ; wI++ )
		{
			if( cSTR_STRG_MateInfo.Data[wCombo].ARR_Renkin[wI][0]==wDstCombo )
			{
				wARR_Index.push( wI ) ;
				break ;
			}
		}
	}
	////////////////////////////////////////
	//固定の場合
	else
	{
		for( wI=0 ; cSTR_STRG_MateInfo.Data[wCombo].ARR_Renkin.length>wI ; wI++ )
		{
			wARR_Index.push( wI ) ;
		}
	}
	if( wARR_Index.length==0 )
	{
		//+++++++++++++++++++++++++++++++++++++++
		top.cSTRG_LOG_c( in_Class="cSTRG_MATERIAL_getRenkinIndex", in_Error=true,
			" No=" + in_No + 
			" SrcKind=" + cSTR_STRG_AlchemyInfo[wKey].SrcKind +
			" DstKind=" + cSTR_STRG_AlchemyInfo[wKey].DstKind +
			" Failed get index" +
			"" ) ;
		//+++++++++++++++++++++++++++++++++++++++
		return wARR_Index ;
	}
	return wARR_Index ;
}


