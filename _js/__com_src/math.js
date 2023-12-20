/* ********************************************
Project  : Common Script
URL      : https://mynoghra.jp/
Class    : MATH
Update   : 2019/1/24
***********************************************
Function :
	MATH_Random( in_MAX_Val )
	MATH_Par( in_ALL, in_Val, in_Keta )
	MATH_Age( in_Date )
	MATH_ValParse( in_Value )
	MATH_ZeroPadding( in_Keta, in_Val )

******************************************** */

////////////////////////////////////////
// 乱数生成
////////////////////////////////////////
function MATH_Random( in_MAX_Val )
{
	if( in_MAX_Val<0 )
	{
		return -1 ;
	}
	let wRan ;
	wRan = eval( Math.random() * in_MAX_Val ) ;
	wRan = Math.floor( wRan ) ;
	return wRan ;
}



////////////////////////////////////////
// 割合生成
////////////////////////////////////////
function MATH_Par( in_ALL, in_Val, in_Keta )
{
	let wVal, wPar ;
	
	//割合の計算
	wVal = in_Val / in_ALL ;
	wVal = wVal * 100 ;
	
	//桁あわせ
	wPar = wVal.toFixed( in_Keta ) ;
	return wPar ;
}



////////////////////////////////////////
// 誕生日から現在の年齢を求める
////////////////////////////////////////
function MATH_Age( in_Date )
{
	let wNDate, wNw_Year, wNw_Mon, wNw_Day ;
	let wBDate, wBt_Year, wBt_Mon, wBt_Day ;
	let wAge, wI ;
	
	wBDate = in_Date ;
	wAge   = 0 ;
	////////////////////////////////////////
	// 現在の年月日を求める
	wNDate   = new Date() ;
	wNw_Year = wNDate.getYear() ;
	wNw_Mon  = wNDate.getMonth() + 1 ;
	wNw_Day  = wNDate.getDate() ;
	
	////////////////////////////////////////
	// 誕生日の年月日をInteger型に変換する
		// 年
	wBt_Year = parseInt( wBDate.substring( 0, 4 ) ) ;
	
		// 月
	if( wBDate.substring( 5, 6 )=="0" )
	{
		wI = 6 ;
	}
	else
	{
		wI = 5 ;
	}
	wBt_Mon = parseInt( wBDate.substring( wI, 7 ) ) ;
	
		// 日
	if( wBDate.substring( 8, 9 )=="0" )
	{
		wI = 9 ;
	}
	else
	{
		wI = 8 ;
	}
	wBt_Day = parseInt( wBDate.substring( wI,10 ) ) ;
	
	////////////////////////////////////////
	// 年齢を求める
	if( wNw_Year<1900 )	// 年の補正
	{
		wNw_Year = wNw_Year + 1900 ;
	}
	
	if( wNw_Mon<wBt_Mon )
	{
		wAge = wNw_Year - wBt_Year - 1 ;
	}
	else if( wNw_Mon>wBt_Mon )
	{
		wAge = wNw_Year - wBt_Year ;
	}
	else if( wNw_Mon==wBt_Mon )
	{
		if( wNw_Day<wBt_Day )
		{
			wAge = wNw_Year - wBt_Year - 1 ;
		}
		else
		{
			wAge = wNw_Year - wBt_Year ;
		}
	}
	return wAge ;
}



////////////////////////////////////////
// 整数変換
////////////////////////////////////////
function MATH_ValParse( in_Value )
{
	let wValue ;
	wValue = parseInt( in_Value ) ;
	if( isNaN(wValue)==true )
	{
		wValue = 0 ;
	}
	return wValue ;
}



////////////////////////////////////////
// 1桁なら先頭０埋め
////////////////////////////////////////
function MATH_ZeroPadding( in_Keta, in_Val )
{
	let wChr_Val, wVal_Kake ;
	
	//埋める0を設定
	wChr_Val = "0".repeat( in_Keta ) ;
	
	//0と結合
	wChr_Val = wChr_Val + in_Val ;
	
	//負の値にする
	wVal_Kake = in_Keta * -1 ;
	
	//後ろから削り出して桁合わせ
	wChr_Val = wChr_Val.slice( wVal_Kake ) ;
	return wChr_Val ;
}

