/* ********************************************
Project  : Star Region
URL      : https://mynoghra.jp/
Class    : STRG_ALCHEMING

Update   : 2019/6/24
******************************************** */

////////////////////////////////////////
// 錬金ページ初期化
////////////////////////////////////////
function cSTRG_ALCHEMING_Init()
{
	let wObj ;
	
	////////////////////////////////////////
	//画面オブジェクト取得
	wObj = top.document.getElementById( "iMain" ) ;
	wObj = wObj.contentWindow.document.getElementById( "iDisp" ) ;
	
	////////////////////////////////////////
	//錬金変換元＆変換先コンボボックス作成
	cSTRG_ALCHEMING_createAlchemySrc_ComboBox( 1 ) ;
	cSTRG_ALCHEMING_createAlchemySrc_ComboBox( 2 ) ;
	cSTRG_ALCHEMING_createAlchemySrc_ComboBox( 3 ) ;
	return ;
}


////////////////////////////////////////
// 錬金情報クリア
//   閉じる時、錬金中じゃない錬金情報をクリアする
////////////////////////////////////////
function cSTRG_ALCHEMING_Clear()
{
	let wI, wKey ;
	
	for( wI=1 ; 3>=wI ; wI++ )
	{
		wKey = "Data" + wI ;
		if( cSTR_STRG_AlchemyInfo[wKey].Counter>=0 )
		{/////カウンタ動作中は除外
			if(( cSTR_STRG_AlchemyInfo[wKey].SrcKind=="" )||
			   ( cSTR_STRG_AlchemyInfo[wKey].DstKind=="" ))
			{//////不正にカウント動作していた
				//+++++++++++++++++++++++++++++++++++++++
				top.cSTRG_LOG_c( in_Class="cSTRG_ALCHEMING_Clear",
					" No=" + wI +
					" Counter=" + cSTR_STRG_AlchemyInfo[wKey].Counter +
					" SrcKind=" + cSTR_STRG_AlchemyInfo[wKey].SrcKind +
					" DstKind=" + cSTR_STRG_AlchemyInfo[wKey].DstKind +
					"" ) ;
				//+++++++++++++++++++++++++++++++++++++++
				cSTR_STRG_AlchemyInfo[wKey].Counter = -1 ;	//強制停止
				cSTR_STRG_AlchemyInfo[wKey].SrcKind = "" ;
				cSTR_STRG_AlchemyInfo[wKey].DstKind = "" ;
			////////////////////////////////////////
			}
			continue ;
		}
		cSTR_STRG_AlchemyInfo[wKey].SrcKind = "" ;
		cSTR_STRG_AlchemyInfo[wKey].PerNum  = 0 ;
		cSTR_STRG_AlchemyInfo[wKey].SrcNums = 0 ;
		cSTR_STRG_AlchemyInfo[wKey].Counter = -1 ;
		cSTR_STRG_AlchemyInfo[wKey].DstKind = "" ;
	}
	return ;
}


////////////////////////////////////////
// 錬金変換元コンボボックス作成
////////////////////////////////////////
function cSTRG_ALCHEMING_createAlchemySrc_ComboBox( in_No=1 )
{
	let wStr, wKey, wObj, wSubObj, wVal ;
	let wI, wCombo, wFlg ;
	
	wKey = "Data" + in_No ;
	////////////////////////////////////////
	//錬金可否の取得
	cSTRG_MATERIAL_getWhetherAlchemy() ;
	
	////////////////////////////////////////
	// selectヘッダ
	wStr = "<select id=\"iCombo-Alchemy_Src" + in_No + "\" onchange=\"_hdl_AlchemySrcCombo_Change(" + in_No + ")\">" ;
	
	////////////////////////////////////////
	//オプション部分
	
	////////////////////////////////////////
	//屑石専用装置
	if( in_No==3 )
	{
		////////////////////////////////////////
		//錬金不可 =屑石なし
		if( cSTR_STRG_MateInfo.Data["Scrp"].FLG_Alchemy!=true )
		{
			wStr = wStr + "<option value=\"\" selected>－－－</option>" + '\n' ;
			
			////////////////////////////////////////
			//錬金設定
			cSTR_STRG_AlchemyInfo[wKey].SrcKind = "" ;
			cSTR_STRG_AlchemyInfo[wKey].PerNum  = 0 ;
			cSTR_STRG_AlchemyInfo[wKey].SrcNums = 0 ;
///			cSTR_STRG_AlchemyInfo[wKey].Counter = -1 ;
		}
		////////////////////////////////////////
		//錬金可能
		else
		{
			wStr = wStr + "<option value=\"Scrp\" selected>" + cSTR_STRG_MateInfo.Data["Scrp"].Name + "</option>" + '\n' ;
			
			////////////////////////////////////////
			//錬金中ではない
			if( cSTR_STRG_AlchemyInfo[wKey].Counter==-1 )
			{//////屑石の選択は確定している
				////////////////////////////////////////
				// **錬金設定
				wVal = Math.floor( cSTR_STRG_MateInfo.Data["Scrp"].Value / cSTR_STRG_MateInfo.Data["Scrp"].VAL_1SetNum ) ;
				cSTR_STRG_AlchemyInfo[wKey].SrcKind = "Scrp" ;
				cSTR_STRG_AlchemyInfo[wKey].PerNum  = wVal ;
				cSTR_STRG_AlchemyInfo[wKey].SrcNums = 0 ;
///				cSTR_STRG_AlchemyInfo[wKey].Counter = -1 ;
			}
			////////////////////////////////////////
			//錬金中



		}
		////////////////////////////////////////
		//後の計算用
		wCombo = cSTR_STRG_AlchemyInfo[wKey].SrcKind ;
		
	}
	////////////////////////////////////////
	//装置１・２
	else
	{
		wCombo = cSTR_STRG_AlchemyInfo[wKey].SrcKind ;
		////////////////////////////////////////
		//錬金中ではない  =未選択 or 選択中
		if( cSTR_STRG_AlchemyInfo[wKey].Counter==-1 )
		{
			wStr = wStr + "<option value=\"\" selected>－－－</option>" + '\n' ;
			////////////////////////////////////////
			//錬金可能な項目をOptionに設定していく
			for( let wLine in cSTR_STRG_MateInfo.Data )
			{
				if((( wLine!=wCombo )&&( cSTR_STRG_MateInfo.Data[wLine].FLG_Alchemy!=true ))||
				   ( wLine=="Scrp" ) )
				{/////変換元以外 かつ 錬金不可 or 屑石
					continue ;
				}
				
				wStr = wStr + "<option value=\"" + wLine ;
				if( wCombo==wLine )
				{/////錬金中の資源を選択する
					wStr = wStr + "\" selected>" ;
				}
				else
				{
					wStr = wStr + "\">" ;
				}
				wStr = wStr + cSTR_STRG_MateInfo.Data[wLine].Name + "</option>" + '\n' ;
			}
			////////////////////////////////////////
			//未選択
			if( wCombo=="" )
			{
				cSTR_STRG_AlchemyInfo[wKey].SrcKind = "" ;
				cSTR_STRG_AlchemyInfo[wKey].PerNum  = 0 ;
				cSTR_STRG_AlchemyInfo[wKey].SrcNums = 0 ;
///				cSTR_STRG_AlchemyInfo[wKey].DstKind = "" ;
			}
			////////////////////////////////////////
			//選択中
			else
			{
				wVal = Math.floor( cSTR_STRG_MateInfo.Data[wCombo].Value / cSTR_STRG_MateInfo.Data[wCombo].VAL_1SetNum ) ;
				cSTR_STRG_AlchemyInfo[wKey].SrcKind = wCombo ;
				cSTR_STRG_AlchemyInfo[wKey].PerNum  = wVal ;
///				cSTR_STRG_AlchemyInfo[wKey].SrcNums = 0 ;
				if( cSTR_STRG_MateInfo.Data[wCombo].FLG_RenChoi==true )
				{/////選択式で錬金変換資源に含まれてなければ、選ばせるために一度クリアする
					wFlg = false ;
					for( wI=0 ; cSTR_STRG_MateInfo.Data[wCombo].ARR_Renkin.length>wI ; wI++ )
					{
						if( cSTR_STRG_MateInfo.Data[wCombo].ARR_Renkin[wI][0]==cSTR_STRG_AlchemyInfo[wKey].DstKind )
						{
							wFlg = true ;
							break ;
						}
					}
					if( wFlg!=true )
					{////錬金変換先にあるものが設定されてないのでクリア
						cSTR_STRG_AlchemyInfo[wKey].DstKind = "" ;
					}
				}
			}
		}
		////////////////////////////////////////
		//錬金中
		else if( cSTR_STRG_AlchemyInfo[wKey].Counter>=0 )
		{
			if( wCombo=="" )
			{//////ありえない
				//+++++++++++++++++++++++++++++++++++++++
				top.cSTRG_LOG_c( in_Class="cSTRG_ALCHEMING_createAlchemySrc_ComboBox", in_Error=true,
					" SrcKind is null" +
					"" ) ;
				//+++++++++++++++++++++++++++++++++++++++
				return ;
			}
			wStr = wStr + "<option value=\"" + wCombo + "\" selected>" + cSTR_STRG_MateInfo.Data[wCombo].Name + "</option>" + '\n' ;
		}
	}
	////////////////////////////////////////
	//select フッタ
	wStr = wStr + "</select>" + '\n' ;
	
	////////////////////////////////////////
	//ページに設定する
	try
	{
		////////////////////////////////////////
		//画面オブジェクト取得
		wObj = top.document.getElementById( "iMain" ) ;
		wObj = wObj.contentWindow.document.getElementById( "iDisp" ) ;
		wSubObj = wObj.contentWindow.document.getElementById( "iSet-Alchemy_Src" + in_No ) ;
		wSubObj.innerHTML = wStr ;
		
		////////////////////////////////////////
		//1セット数量の設定
		if( wCombo=="" )
		{
			wSubObj = wObj.contentWindow.document.getElementById( "iAlchemy-Kazu" + in_No ) ;
			wSubObj.value = 0 ;
///			wSubObj = wObj.contentWindow.document.getElementById( "iAlchemy-Sets" + in_No ) ;
///			wSubObj.value = 0 ;
		}
		else
		{
			wSubObj = wObj.contentWindow.document.getElementById( "iAlchemy-Kazu" + in_No ) ;
			wSubObj.value = cSTR_STRG_MateInfo.Data[wCombo].VAL_1SetNum ;
///			wSubObj = wObj.contentWindow.document.getElementById( "iAlchemy-Sets" + in_No ) ;
///			wSubObj.value = cSTR_STRG_AlchemyInfo[wKey].SrcNums ;
		}
		
		////////////////////////////////////////
		//アイコン設定
		wSubObj = wObj.contentWindow.document.getElementById( "iIcon-Alchemy_Src" + in_No ) ;
		if( wCombo!="" )
		{/////変換元 資源設定あり
			wSubObj.innerHTML = "<img class=\"Icon\" src=\"" + cSTR_STRG_MateInfo.Data[wCombo].IconPath + "\">" ;
		}
		else
		{/////未確定
			wSubObj.innerHTML = "　" ;
		}
	}
	catch(e)
	{
		//+++++++++++++++++++++++++++++++++++++++
		top.cSTRG_LOG_c( in_Class="cSTRG_ALCHEMING_createAlchemySrc_ComboBox", in_Error=true,
			" Exception=" + e +
			"" ) ;
		//+++++++++++++++++++++++++++++++++++++++
		return ;
	}
	
	////////////////////////////////////////
	//変換先ComboBoxも設定する
	_STRG_ALCHEMING_createAlchemyDst_ComboBox( in_No ) ;
	
	////////////////////////////////////////
	//変換ボタン有効
	_STRG_ALCHEMING_Valid_Start( in_No ) ;
	
	////////////////////////////////////////
	//受け取りボタン有効
//	cSTRG_ALCHEMING_Valid_Get( in_No ) ;
	return ;
}


////////////////////////////////////////
// 錬金変換先コンボボックス作成
////////////////////////////////////////
function _STRG_ALCHEMING_createAlchemyDst_ComboBox( in_No=1 )
{
	let wStr, wKey, wObj, wSubObj ;
///	let wI, wDstMate, wCombo, wDstCombo, wVal ;
	let wI, wDstMate, wDstName, wCombo, wVal ;
	let wARR_Index, wImgStr ;
	
	wKey = "Data" + in_No ;
///	////////////////////////////////////////
///	//錬金中の場合選択元で処理させる
///	if( cSTR_STRG_AlchemyInfo[wKey].Counter>=0 )
///	{
///		return ;
///	}
	
	////////////////////////////////////////
	//select
	wStr = "<select id=\"iCombo-Alchemy_Dst" + in_No + "\" onchange=\"_hdl_AlchemyDstCombo_Change(" + in_No + ")\">" ;
	
	wCombo = cSTR_STRG_AlchemyInfo[wKey].SrcKind ;
///	wDstCombo = cSTR_STRG_AlchemyInfo[wKey].DstKind ;
	////////////////////////////////////////
	//オプション部分
	
	////////////////////////////////////////
	//変換元未設定
	if( wCombo=="" )
	{
		wStr = wStr + "<option value=\"\" selected>－－－</option>" + '\n' ;
		cSTR_STRG_AlchemyInfo[wKey].DstKind = "" ;
	}
	////////////////////////////////////////
	//錬金中
///	else if( cSTR_STRG_AlchemyInfo[wKey].Counter>=0 )
///	{
///		////////////////////////////////////////
///		//選択式の資源
///		if( cSTR_STRG_MateInfo.Data[wCombo].FLG_RenChoi==true )
///		{
///			wVal = "" ;
///			for( wI=0 ; cSTR_STRG_MateInfo.Data[wCombo].ARR_Renkin.length>wI ; wI++ )
///			{
///				if( cSTR_STRG_MateInfo.Data[wCombo].ARR_Renkin[wI][0]==wDstCombo )
///				{
///					wVal = cSTR_STRG_MateInfo.Data[wCombo].Name ;
///					break ;
///				}
///			}
///			if( wVal=="" )
///			{/////ありえない
///				console.log( "_STRG_ALCHEMING_createAlchemyDst_ComboBox: ARR_Renkin is not found: " + wDstCombo ) ;
///				return ;
///			}
///			wStr = wStr + "<option value=\"" + wDstCombo + "\" selected>" + wVal + "</option>" + '\n' ;
///		}
///		////////////////////////////////////////
///		//固定の資源
///		else
///		{
///			wVal = cSTR_STRG_MateInfo.Data[wDstCombo].Name ;
///			wStr = wStr + "<option value=\"" + wDstCombo + "\" selected>" + wVal + "</option>" + '\n' ;
///		}
///	}
	////////////////////////////////////////
	//変換元 選択あり
	else
	{
		////////////////////////////////////////
		//変換先 選択式 =ユーザに選択させる
		if( cSTR_STRG_MateInfo.Data[wCombo].FLG_RenChoi==true )
		{
			////////////////////////////////////////
			//変換先 未選択
			if( cSTR_STRG_AlchemyInfo[wKey].DstKind=="" )
			{
				wStr = wStr + "<option value=\"\" selected>－－－</option>" + '\n' ;
				for( wI=0 ; cSTR_STRG_MateInfo.Data[wCombo].ARR_Renkin.length>wI ; wI++ )
				{
					wDstMate = cSTR_STRG_MateInfo.Data[wCombo].ARR_Renkin[wI][0] ;
					wStr = wStr + "<option value=\"" + wDstMate + "\">";
					wStr = wStr + cSTR_STRG_MateInfo.Data[wDstMate].Name + "</option>" + '\n' ;
				}
///				wDstMate = "" ;
			}
			else
			////////////////////////////////////////
			//変換先 決定済
			{
				wStr = wStr + "<option value=\"\">－－－</option>" + '\n' ;
				for( wI=0 ; cSTR_STRG_MateInfo.Data[wCombo].ARR_Renkin.length>wI ; wI++ )
				{
					wDstMate = cSTR_STRG_MateInfo.Data[wCombo].ARR_Renkin[wI][0] ;
					wStr = wStr + "<option value=\"" + wDstMate ;
					if( cSTR_STRG_AlchemyInfo[wKey].DstKind==wDstMate )
					{
						wStr = wStr + "\" selected>" ;
					}
					else
					{
						wStr = wStr + "\">" ;
					}
					wStr = wStr + cSTR_STRG_MateInfo.Data[wDstMate].Name + "</option>" + '\n' ;
				}
///				wDstMate = cSTR_STRG_AlchemyInfo[wKey].DstKind ;
			}
		}
		////////////////////////////////////////
		//変換先 固定or複数バラバラ
		//  **変換設定確定**
		else
		{
			////////////////////////////////////////
			//変換先 固定
			if( cSTR_STRG_MateInfo.Data[wCombo].ARR_Renkin.length==1 )
			{/////変換先名だけ取る
				wDstMate = cSTR_STRG_MateInfo.Data[wCombo].ARR_Renkin[0][0] ;
				wStr = wStr + "<option value=\"" + wDstMate + "\" selected>" ;
				wStr = wStr + cSTR_STRG_MateInfo.Data[wDstMate].Name + "</option>" + '\n' ;
			}
			////////////////////////////////////////
			//変換先 複数バラバラ  =+でくっつける
			else
			{
				wDstName = "" ;
				wDstMate = "" ;
				for( wI=0 ; cSTR_STRG_MateInfo.Data[wCombo].ARR_Renkin.length>wI ; )
				{
					wVal = cSTR_STRG_MateInfo.Data[wCombo].ARR_Renkin[wI][0] ;
					wDstMate = wDstMate + wVal ;
					wDstName = wDstName + cSTR_STRG_MateInfo.Data[wVal].Name ;
					wI++ ;
					if( cSTR_STRG_MateInfo.Data[wCombo].ARR_Renkin.length>wI )
					{
						wDstMate = wDstMate + "+" ;
						wDstName = wDstName + "+" ;
					}
				}
				wStr = wStr + "<option value=\"" + wDstMate + "\" selected>" + wDstName + "</option>" + '\n' ;
			}
			////////////////////////////////////////
			//変換先の設定
			cSTR_STRG_AlchemyInfo[wKey].DstKind = wDstMate ;
		}
	}
	////////////////////////////////////////
	//select フッタ
	wStr = wStr + "</select>" + '\n' ;
	
	////////////////////////////////////////
	//ページに設定する
	try
	{
		////////////////////////////////////////
		//画面オブジェクト取得
		wObj = top.document.getElementById( "iMain" ) ;
		wObj = wObj.contentWindow.document.getElementById( "iDisp" ) ;
		wSubObj = wObj.contentWindow.document.getElementById( "iSet-Alchemy_Dst" + in_No ) ;
		wSubObj.innerHTML = wStr ;
		
		////////////////////////////////////////
		//アイコン設定・１セット変換数設定
		wSubObj = wObj.contentWindow.document.getElementById( "iIcon-Alchemy_Dst" + in_No ) ;
///		if(( cSTR_STRG_AlchemyInfo[wKey].SrcKind!="" )&&( cSTR_STRG_AlchemyInfo[wKey].DstKind!="" ))
///		if(( wCombo!="" )&&( wDstCombo!="" ))
		if(( wCombo!="" )&&( cSTR_STRG_AlchemyInfo[wKey].DstKind!="" ))
		{/////変換先 資源設定あり
///			if( cSTR_STRG_MateInfo.Data[wCombo].FLG_RenChoi==true )
///			{/////選択式の場合、１つ表示
///				wVal = cSTR_STRG_AlchemyInfo[wKey].DstKind ;
///				wSubObj.innerHTML = "<img class=\"Icon\" src=\"" + cSTR_STRG_MateInfo.Data[wVal].IconPath + "\">" ;
///			}
///			else
///			{/////非選択式の場合、複数の場合があるかも
///				wStr = "" ;
///				for( wI=0 ; cSTR_STRG_MateInfo.Data[wCombo].ARR_Renkin.length>wI ; wI++ )
///				{
///					wVal = cSTR_STRG_MateInfo.Data[wCombo].ARR_Renkin[wI][0] ;
///					wStr = wStr + "<img class=\"Icon\" src=\"" + cSTR_STRG_MateInfo.Data[wVal].IconPath + "\">" ;
///				}
///				wSubObj.innerHTML = wStr ;
///			}
///			////////////////////////////////////////
///			//１セット変換数の設定
///			wSubObj = wObj.contentWindow.document.getElementById( "iAlchemy-Nums" + in_No ) ;
///			wSubObj.value = cSTR_STRG_MateInfo.Data[wCombo].ARR_Renkin[0][1] ;
			wARR_Index = cSTRG_MATERIAL_getRenkinIndex( in_No ) ;
			if( wARR_Index.length==0 )
			{/////ありえない
				return ;
			}
			wImgStr = "" ;
			wStr    = "" ;
			for( wI=0 ; wARR_Index.length>wI ; )
			{/////複数資源あれば / で表示する
				////アイコン
				wVal = cSTR_STRG_MateInfo.Data[wCombo].ARR_Renkin[wARR_Index[wI]][0] ;
				wImgStr = wImgStr + "<img class=\"Icon\" src=\"" + cSTR_STRG_MateInfo.Data[wVal].IconPath + "\">" ;
				
				////１セット変換数
				wStr = wStr + cSTR_STRG_MateInfo.Data[wCombo].ARR_Renkin[wARR_Index[wI]][1] ;
				wI++ ;
				if( wARR_Index.length>wI )
				{
					wStr = wStr + "/" ;
				}
			}
			////アイコンの設定
			wSubObj.innerHTML = wImgStr ;
			////１セット変換数の設定
			wSubObj = wObj.contentWindow.document.getElementById( "iAlchemy-Nums" + in_No ) ;
			wSubObj.value = wStr ;
			////////////////////////////////////////
		}
		else
		{/////未確定
			wSubObj.innerHTML = "　" ;
			
			////////////////////////////////////////
			//１セット変換数の設定
			wSubObj = wObj.contentWindow.document.getElementById( "iAlchemy-Nums" + in_No ) ;
			wSubObj.value = 0 ;
			
		}
	}
	catch(e)
	{
		//+++++++++++++++++++++++++++++++++++++++
		top.cSTRG_LOG_c( in_Class="_STRG_ALCHEMING_createAlchemyDst_ComboBox", in_Error=true,
			" Exception=" + e +
			"" ) ;
		//+++++++++++++++++++++++++++++++++++++++
	}
	return ;
}


////////////////////////////////////////
// 変換ボタン有効
////////////////////////////////////////
function _STRG_ALCHEMING_Valid_Start( in_No=1 )
{
	let wKey, wObj, wSubObj ;
	let wI, wCombo, wDstCombo, wIndex, wVal, wStr ;
	let wARR_Index, wSrcNums ;
	
	try
	{
		wKey = "Data" + in_No ;
		////////////////////////////////////////
		//フレームの取得
		wObj = top.document.getElementById( "iMain" ) ;
		wObj = wObj.contentWindow.document.getElementById( "iDisp" ) ;
		
		////////////////////////////////////////
		//錬金変換元・先の取得
		wCombo = cSTR_STRG_AlchemyInfo[wKey].SrcKind ;
		wDstCombo = cSTR_STRG_AlchemyInfo[wKey].DstKind ;
		
		////////////////////////////////////////
		//有効化
		
		////////////////////////////////////////
		//錬金変換元＆先が未選択
		if(( wDstCombo=="" )||( cSTR_STRG_AlchemyInfo[wKey].SrcKind=="" ))
		{
			wSubObj = wObj.contentWindow.document.getElementById( "iBtn-Alchemy_Up" + in_No ) ;
			wSubObj.className = "SpinBtn Btn-Disabled" ;
			wSubObj.disabled  = true ;
			wSubObj = wObj.contentWindow.document.getElementById( "iBtn-Alchemy_Dw" + in_No ) ;
			wSubObj.className = "SpinBtn Btn-Disabled" ;
			wSubObj.disabled  = true ;
			wSubObj = wObj.contentWindow.document.getElementById( "iBtn-Alchemy_Start" + in_No ) ;
			wSubObj.className = "Btn Btn-Disabled" ;
			wSubObj.disabled  = true ;
			
			wSubObj = wObj.contentWindow.document.getElementById( "iIcon-Alchemy_Hen" + in_No ) ;
			wSubObj.innerHTML = "　" ;
		}
		////////////////////////////////////////
		//変換中
		else if( cSTR_STRG_AlchemyInfo[wKey].Counter>=0 )
		{
			wSubObj = wObj.contentWindow.document.getElementById( "iBtn-Alchemy_Up" + in_No ) ;
			wSubObj.className = "SpinBtn Btn-Disabled" ;
			wSubObj.disabled  = true ;
			wSubObj = wObj.contentWindow.document.getElementById( "iBtn-Alchemy_Dw" + in_No ) ;
			wSubObj.className = "SpinBtn Btn-Disabled" ;
			wSubObj.disabled  = true ;
			
			wSubObj = wObj.contentWindow.document.getElementById( "iBtn-Alchemy_Start" + in_No ) ;
			if( cSTR_STRG_AlchemyInfo[wKey].SrcNums>0 )
			{/////変換中・変換残量あり =キャンセル可
				wSubObj.className = "Btn Btn-Forced" ;
				wSubObj.value     = "変換中" ;
				wSubObj.disabled  = false ;
			}
			else
			{/////変換中・残りセットなし =キャンセル不可
				wSubObj.className = "Btn Btn-Disabled" ;
				wSubObj.value     = "変換中" ;
				wSubObj.disabled  = true ;
			}
			
			////コンボボックスも無効化
			wSubObj = wObj.contentWindow.document.getElementById( "iCombo-Alchemy_Src" + in_No ) ;
			wSubObj.disabled  = true ;
			wSubObj = wObj.contentWindow.document.getElementById( "iCombo-Alchemy_Dst" + in_No ) ;
			wSubObj.disabled  = true ;
			
			////////////////////////////////////////
			//真ん中の矢印  インデックスを逆転する
			wSubObj = wObj.contentWindow.document.getElementById( "iIcon-Alchemy_Hen" + in_No ) ;
			wIndex = cSTR_STRG_AlchemyInfo[wKey].IconIndex ;
			if( wIndex!=1 )
			{///// 初回=0 or 2
				cSTR_STRG_AlchemyInfo[wKey].IconIndex = 1 ;
			}
			else
			{///// 1
				cSTR_STRG_AlchemyInfo[wKey].IconIndex = 2 ;
			}
			wSubObj.innerHTML = "<img class=\"Icon\" src=\"" + cSTR_STRG_AlchemyInfo.ARR_Icon[wIndex] + "\">" ;
			
		}
		////////////////////////////////////////
		//変換前
		else
		{
			wSubObj = wObj.contentWindow.document.getElementById( "iBtn-Alchemy_Up" + in_No ) ;
			if(( cSTR_STRG_AlchemyInfo[wKey].PerNum>0 ) &&
			   ( cSTR_STRG_AlchemyInfo[wKey].PerNum>cSTR_STRG_AlchemyInfo[wKey].SrcNums ) )
			{/////セット上限が1以上かつ、設定が上限を超えないなら有効にする
				wSubObj.className = "SpinBtn Btn-Def" ;
				wSubObj.disabled  = false ;
			}
			else
			{/////セット不可であれば無効にする
				wSubObj.className = "SpinBtn Btn-Disabled" ;
				wSubObj.disabled  = true ;
			}
			
			wSubObj = wObj.contentWindow.document.getElementById( "iBtn-Alchemy_Dw" + in_No ) ;
			if( cSTR_STRG_AlchemyInfo[wKey].SrcNums>0 )
			{/////設定が1以上なら有効
				wSubObj.className = "SpinBtn Btn-Def" ;
				wSubObj.disabled  = false ;
			}
			else
			{
				wSubObj.className = "SpinBtn Btn-Disabled" ;
				wSubObj.disabled  = true ;
			}
			
			wSubObj = wObj.contentWindow.document.getElementById( "iBtn-Alchemy_Start" + in_No ) ;
			wSubObj.value     = "変換開始" ;
			if( cSTR_STRG_AlchemyInfo[wKey].SrcNums>0 )
			{/////設定が1以上なら有効
				wSubObj.className = "Btn Btn-Def" ;
				wSubObj.disabled  = false ;
			}
			else
			{
				wSubObj.className = "Btn Btn-Disabled" ;
				wSubObj.disabled  = true ;
			}
			
			////コンボボックス有効化
			wSubObj = wObj.contentWindow.document.getElementById( "iCombo-Alchemy_Src" + in_No ) ;
			wSubObj.disabled  = false ;
			wSubObj = wObj.contentWindow.document.getElementById( "iCombo-Alchemy_Dst" + in_No ) ;
			wSubObj.disabled  = false ;
			
			////////////////////////////////////////
			//真ん中の矢印
			cSTR_STRG_AlchemyInfo[wKey].IconIndex = 0 ;	//変換中→待機に戻った時用
			wSubObj = wObj.contentWindow.document.getElementById( "iIcon-Alchemy_Hen" + in_No ) ;
			wIndex = cSTR_STRG_AlchemyInfo[wKey].IconIndex ;
			wSubObj.innerHTML = "<img class=\"Icon\" src=\"" + cSTR_STRG_AlchemyInfo.ARR_Icon[wIndex] + "\">" ;
		}
		
		////////////////////////////////////////
		//セット設定数の設定
		wSubObj = wObj.contentWindow.document.getElementById( "iAlchemy-Sets" + in_No ) ;
		wSubObj.value = cSTR_STRG_AlchemyInfo[wKey].SrcNums ;
		
		////////////////////////////////////////
		//消費資源数の表示
///		wSubObj = wObj.contentWindow.document.getElementById( "iAlchemy-Kazu" + in_No ) ;
///		wVal = MATH_ValParse( wSubObj.value ) ;
		if( wCombo!="" )
		{/////変換元 =設定済
			wVal = cSTR_STRG_MateInfo.Data[wCombo].VAL_1SetNum ;
			if( cSTR_STRG_AlchemyInfo[wKey].Counter>=0 )
			{/////変換中の場合、変換中の素材分もカウントする
				wVal = wVal * ( cSTR_STRG_AlchemyInfo[wKey].SrcNums + 1 ) ;
			}
			else
			{
				wVal = wVal * cSTR_STRG_AlchemyInfo[wKey].SrcNums ;
			}
		}
		else
		{//////変換元 =未設定
			wVal = 0 ;
		}
		wSubObj = wObj.contentWindow.document.getElementById( "iAlchemy-Total" + in_No ) ;
		wSubObj.value = wVal ;
		
		////////////////////////////////////////
		//合計変換予定数
///		wSubObj = wObj.contentWindow.document.getElementById( "iAlchemy-Nums" + in_No ) ;
///		wVal = MATH_ValParse( wSubObj.value ) ;
		wStr = "" ;
		if( wDstCombo!="" )
		{/////変換先 =設定済
			wARR_Index = cSTRG_MATERIAL_getRenkinIndex( in_No ) ;
			if( wARR_Index.length==0 )
			{/////ありえない
				return ;
			}
			////変換セット数
			if( cSTR_STRG_AlchemyInfo[wKey].Counter>=0 )
			{/////変換中の場合、変換中の素材分もカウントする
				wSrcNums = cSTR_STRG_AlchemyInfo[wKey].SrcNums + 1 ;
			}
			else
			{
				wSrcNums = cSTR_STRG_AlchemyInfo[wKey].SrcNums ;
			}
			/////各変換ごとに変換後数を表示する
			for( wI=0 ; wARR_Index.length>wI ; )
			{
				wVal = cSTR_STRG_MateInfo.Data[wCombo].ARR_Renkin[wARR_Index[wI]][1] ;
				wVal = wVal * wSrcNums ;
				wStr = wStr + wVal ;
				wI++ ;
				if( wARR_Index.length>wI )
				{
					wStr = wStr + "/" ;
				}
			}
		}
		else
		{//////変換先 =未設定
			wStr = 0 ;
		}
		wSubObj = wObj.contentWindow.document.getElementById( "iAlchemy-Keis" + in_No ) ;
		wSubObj.value = wStr ;
		////////////////////////////////////////
	}
	catch(e)
	{
		//+++++++++++++++++++++++++++++++++++++++
		top.cSTRG_LOG_c( in_Class="_STRG_ALCHEMING_Valid_Start", in_Error=true,
			" Exception=" + e +
			"" ) ;
		//+++++++++++++++++++++++++++++++++++++++
	}
	return ;
}


////////////////////////////////////////
// 変換開始ボタンクリック (キャンセルも)
////////////////////////////////////////
function cSTRG_ALCHEMING_StartButton_Click( in_No )
{
	let wKey ;
	
	wKey = "Data" + in_No ;
	////////////////////////////////////////
	//錬金中の場合 キャンセル処理
	if( cSTR_STRG_AlchemyInfo[wKey].Counter>=0 )
	{
		if( cSTRG_TRANS_Confirm(
			"錬金を中止します。よろしいですか？",
			"Cancel Alchemy Is it OK?"
				)!=true )
		{/////いいえ
			return ;
		}
		////////////////////////////////////////
		// 素材を払い戻しする
		cSTRG_MATERIAL_RefundAlcheming( in_No ) ;
		return ;
	}
	
	////////////////////////////////////////
	//錬金開始の確認
	if( cSTRG_TRANS_Confirm(
		"錬金を開始します。よろしいですか？",
		"Start alchemy. Is it OK?"
			)!=true )
	{/////いいえ
		return ;
	}
	
	////////////////////////////////////////
	// 1回目の素材を減らす
	cSTRG_MATERIAL_PayAlcheming( in_No ) ;
	
	////////////////////////////////////////
	//タイマをスタートする
	cSTR_STRG_AlchemyInfo[wKey].Counter = DEF_STRG_ALCHEMING_MAXCOUNT ;
	return ;
}


////////////////////////////////////////
// 定期処理 **1秒周期タイマから呼ばれる
////////////////////////////////////////
function cSTRG_ALCHEMING_Circle()
{
	let wI, wKey ;
	
	////////////////////////////////////////
	//錬金装置ごとの処理
	for( wI=1 ; 3>=wI ; wI++ )
	{
		wKey = "Data" + wI ;
		if( cSTR_STRG_AlchemyInfo[wKey].Counter<0 )
		{/////タイマが停止していたら処理しない
			continue ;
		}
		
 		////////////////////////////////////////
		//カウントダウン
		cSTR_STRG_AlchemyInfo[wKey].Counter -= 1 ;
		if( cSTR_STRG_AlchemyInfo[wKey].Counter==0 )
		{///// 0カウント =処理実行
	 		////////////////////////////////////////
			// 還元
			cSTRG_MATERIAL_AlchemyRduction( wI ) ;
	 		////////////////////////////////////////
			// 素材残数チェック
			if( cSTR_STRG_AlchemyInfo[wKey].SrcNums<0 )
			{/////全変換完了 = タイマ停止
				cSTR_STRG_AlchemyInfo[wKey].Counter = -1 ;
				cSTR_STRG_AlchemyInfo[wKey].SrcNums = 0 ;
			}
			else
			{/////次の周の変換開始
				cSTR_STRG_AlchemyInfo[wKey].Counter = DEF_STRG_ALCHEMING_MAXCOUNT ;
			}
		}
		
 		////////////////////////////////////////
		//錬金画面を閉じている
		if( cSTR_STRG_AlchemyInfo.FLG_Open==false )
		{
			continue ;
		}
		
 		////////////////////////////////////////
		//以後、錬金画面の表示
		
 		////////////////////////////////////////
		// 変換ボタン有効
		_STRG_ALCHEMING_Valid_Start( wI ) ;
		
	}
	return ;
}


////////////////////////////////////////
// 錬金変換元コンボボックス変更
////////////////////////////////////////
function cSTRG_ALCHEMING_changeAlchemySrc_ComboBox( in_No=1 )
{
	if( in_No==3 )
	{/////屑石専用装置は変更できない
		return ;
	}
	
	let wKey, wRevNo, wObj, wSubObj ;
	
	wKey = "Data" + in_No ;
	//////対向のキー設定
	if( in_No==1 )
	{
		wRevNo = 2 ;
	}
	else
	{
		wRevNo = 1 ;
	}
	
	////////////////////////////////////////
	//錬金変換元の取得
	try
	{
		wObj = top.document.getElementById( "iMain" ) ;
		wObj = wObj.contentWindow.document.getElementById( "iDisp" ) ;
		wSubObj = wObj.contentWindow.document.getElementById( "iCombo-Alchemy_Src" + in_No ) ;
		
		cSTR_STRG_AlchemyInfo[wKey].SrcKind = wSubObj.value ;
	}
	catch(e)
	{
		//+++++++++++++++++++++++++++++++++++++++
		top.cSTRG_LOG_c( in_Class="cSTRG_ALCHEMING_changeAlchemySrc_ComboBox", in_Error=true,
			" Exception=" + e +
			"" ) ;
		//+++++++++++++++++++++++++++++++++++++++
		return ;
	}
	
	////////////////////////////////////////
	//コンボボックスを作成する
	cSTRG_ALCHEMING_createAlchemySrc_ComboBox( in_No ) ;
	
	////////////////////////////////////////
	//対抗のコンボボックスを作成する
	cSTRG_ALCHEMING_createAlchemySrc_ComboBox( wRevNo ) ;
	return ;
}


////////////////////////////////////////
// 錬金変換先コンボボックス変更
////////////////////////////////////////
function cSTRG_ALCHEMING_changeAlchemyDst_ComboBox( in_No=1 )
{
	let wKey, wObj, wSubObj ;
	let wI, wCombo, wDstCombo, wARR_Index, wStr ;
	
	wKey = "Data" + in_No ;
	////////////////////////////////////////
	//錬金変換先の取得
	try
	{
		wObj = top.document.getElementById( "iMain" ) ;
		wObj = wObj.contentWindow.document.getElementById( "iDisp" ) ;
		wSubObj = wObj.contentWindow.document.getElementById( "iCombo-Alchemy_Dst" + in_No ) ;
		
		cSTR_STRG_AlchemyInfo[wKey].DstKind = wSubObj.value ;
		
		////////////////////////////////////////
		//アイコン設定
		wSubObj = wObj.contentWindow.document.getElementById( "iIcon-Alchemy_Dst" + in_No ) ;
		if(( cSTR_STRG_AlchemyInfo[wKey].SrcKind!="" )&&( cSTR_STRG_AlchemyInfo[wKey].DstKind!="" ))
		{/////変換先 資源設定あり
			wDstCombo = cSTR_STRG_AlchemyInfo[wKey].DstKind ;
			wSubObj.innerHTML = "<img class=\"Icon\" src=\"" + cSTR_STRG_MateInfo.Data[wDstCombo].IconPath + "\">" ;
			
			////////////////////////////////////////
			//１セット変換数の設定
			wCombo = cSTR_STRG_AlchemyInfo[wKey].SrcKind ;
///			wIndex = -1 ;
///			for( wI=0 ; cSTR_STRG_MateInfo.Data[wCombo].ARR_Renkin.length>wI ; wI++ )
///			{
///				if( cSTR_STRG_MateInfo.Data[wCombo].ARR_Renkin[wI][0]==cSTR_STRG_AlchemyInfo[wKey].DstKind )
///				{
///					wIndex = wI ;
///					break ;
///				}
///			}
///			if( wIndex==-1 )
///			{/////ありえない
///				console.log( "cSTRG_ALCHEMING_changeAlchemyDst_ComboBox: ARR_Renkin is not found: DstKind=" + cSTR_STRG_AlchemyInfo[wKey].DstKind ) ;
///				return ;
///			}
			wARR_Index = cSTRG_MATERIAL_getRenkinIndex( in_No ) ;
			if( wARR_Index.length==0 )
			{/////ありえない
				//+++++++++++++++++++++++++++++++++++++++
				top.cSTRG_LOG_c( in_Class="cSTRG_ALCHEMING_changeAlchemyDst_ComboBox", in_Error=false,
					" cSTRG_MATERIAL_getRenkinIndex is failed" +
					"" ) ;
				//+++++++++++++++++++++++++++++++++++++++
				return ;
			}
			wStr = "" ;
			for( wI=0 ; wARR_Index.length>wI ; )
			{/////複数資源あれば / で表示する
				wStr = wStr + cSTR_STRG_MateInfo.Data[wCombo].ARR_Renkin[wARR_Index[wI]][1] ;
				wI++ ;
				if( wARR_Index.length>wI )
				{
					wStr = wStr + "/" ;
				}
			}
			wSubObj = wObj.contentWindow.document.getElementById( "iAlchemy-Nums" + in_No ) ;
			wSubObj.value = wStr ;
			////////////////////////////////////////
		}
		else
		{/////未確定
			wSubObj.innerHTML = "　" ;
			
			////////////////////////////////////////
			//１セット変換数の設定
			wSubObj = wObj.contentWindow.document.getElementById( "iAlchemy-Nums" + in_No ) ;
			wSubObj.value = 0 ;
			
		}
	}
	catch(e)
	{
		//+++++++++++++++++++++++++++++++++++++++
		top.cSTRG_LOG_c( in_Class="cSTRG_ALCHEMING_changeAlchemyDst_ComboBox", in_Error=true,
			" Exception=" + e +
			"" ) ;
		//+++++++++++++++++++++++++++++++++++++++
		return ;
	}
	
	////////////////////////////////////////
	//変換ボタン有効
	_STRG_ALCHEMING_Valid_Start( in_No ) ;
	return ;
}


////////////////////////////////////////
// 上・下 スピンボタンクリック
////////////////////////////////////////
function cSTRG_ALCHEMING_UpDownButton_Click( in_No, in_UpDw )
{
	let wKey, wObj, wSubObj, wVal ;
	let wI, wCombo, wIndex ;
	
	wKey = "Data" + in_No ;
	////////////////////////////////////////
	//上ボタン
	if( in_UpDw=="up" )
	{
		cSTR_STRG_AlchemyInfo[wKey].SrcNums += 1 ;
	}
	else
	{
		cSTR_STRG_AlchemyInfo[wKey].SrcNums -= 1 ;
	}
	
	////////////////////////////////////////
	//変換ボタン有効
	_STRG_ALCHEMING_Valid_Start( in_No ) ;
	return ;
}


