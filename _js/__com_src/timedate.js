/* ********************************************
Project  : Common Script
URL      : https://mynoghra.jp/
Class    : TIMEDATE
Update   : 2019/8/22
***********************************************
Function :
	TIMEDATE_get()
	TIMEDATE_getRFC822()
	TIMEDATE_chgChrMonth( in_Month )
	TIMEDATE_chgChrWeek( in_Week )
	TIMEDATE_chkUruu( in_Year )
	TIMEDATE_getArray( in_TimeDate )
******************************************** */

////////////////////////////////////////
// クラス定数
////////////////////////////////////////
function STR_TIMEDATE_ConstVal_Str()
{
	this.FLG_DEBUG = false ;
	
	this.ARR_MONTH = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "nov", "Dec" ] ;
	this.ARR_WEEK  = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ] ;
	
							//     1月  2月  3月  4月  5月  6月  7月  8月  9月 10月 11月  12月
	this.ARR_MONTH_DAY = new Array( 0,  31,  28,  31,  30,  31,  30,  31,  31,  30,  31,  30,   31 ) ;
}
const STR_TIMEDATE_CONST = new STR_TIMEDATE_ConstVal_Str() ;



////////////////////////////////////////
// PCから時間を取り出し
//   "yyyy/mm/dd hh:mm:dd" 形式で文字列として返す
////////////////////////////////////////
function TIMEDATE_get()
{
	let wOBJ_TimeDate, wARR_TimeDate, wChr_TimeDate, wI ; 
	
	wChr_TimeDate = "" ;
	wARR_TimeDate = new Array() ;
	wOBJ_TimeDate = new Date() ;
	
	//日時の取得
	wARR_TimeDate.push( wOBJ_TimeDate.getFullYear() ) ;
	wARR_TimeDate.push( wOBJ_TimeDate.getMonth() + 1 ) ;
	wARR_TimeDate.push( wOBJ_TimeDate.getDate() ) ;
	wARR_TimeDate.push( wOBJ_TimeDate.getHours() ) ;
	wARR_TimeDate.push( wOBJ_TimeDate.getMinutes() ) ;
	wARR_TimeDate.push( wOBJ_TimeDate.getSeconds() ) ;
	
	//ゼロ補完
	for( wI=0 ; wI<6 ; wI++ )
	{
		wARR_TimeDate[wI] = _TIMEDATE_ValParse( wARR_TimeDate[wI] ) ;
		wARR_TimeDate[wI] = _TIMEDATE_ZeroPadding( wARR_TimeDate[wI] ) ;
	}
	
	//  / , : の挿入しながら文字列化
	wChr_TimeDate  = wChr_TimeDate + wARR_TimeDate[0] + "/" ;
	wChr_TimeDate  = wChr_TimeDate + wARR_TimeDate[1] + "/" ;
	wChr_TimeDate  = wChr_TimeDate + wARR_TimeDate[2] + " " ;
	wChr_TimeDate  = wChr_TimeDate + wARR_TimeDate[3] + ":" ;
	wChr_TimeDate  = wChr_TimeDate + wARR_TimeDate[4] + ":" ;
	wChr_TimeDate  = wChr_TimeDate + wARR_TimeDate[5] ;
	
	return wChr_TimeDate ;
}


////////////////////////////////////////
// 現在時刻をRFC822形式で返す
////////////////////////////////////////
function TIMEDATE_getRFC822()
{
	let wTimeDate, wChr_RFC822time ;
	let wChrMonth, wChrWeek ;
	
	////////////////////////////////////////
	// 時刻を取り出す
	////////////////////////////////////////
	if( arguments.length > 0 )
	{
		// 引数でnew Date形式のデータを入れられたら
		wTimeDate = arguments[0] ;
	}
	else
	{
		// 引数がなければ現在のPC時刻
		wTimeDate = new Date() ;
	}
	
	wChr_RFC822time = "" ;
	////////////////////////////////////////
	// 曜日と月の文字を取得
	wChrWeek  = TIMEDATE_chgChrWeek( wTimeDate.getDay() ) ;
	wChrMonth = TIMEDATE_chgChrMonth( wTimeDate.getMonth() ) ;
	if((wChrWeek=="")||(wChrMonth==""))
	{
		return wChr_RFC822time ;
	}
	
	////////////////////////////////////////
	// 時刻を取り出す
		// 曜日
	wChr_RFC822time = wChr_RFC822time + wChrWeek ;
	wChr_RFC822time = wChr_RFC822time + ", " ;
		// 日
	wChr_RFC822time = wChr_RFC822time + _TIMEDATE_ZeroPadding( wTimeDate.getDate() ) ;
	wChr_RFC822time = wChr_RFC822time + " " ;
		// 月
	wChr_RFC822time = wChr_RFC822time + wChrMonth ;
	wChr_RFC822time = wChr_RFC822time + " " ;
		// 年
	wChr_RFC822time = wChr_RFC822time + wTimeDate.getFullYear() ;
	wChr_RFC822time = wChr_RFC822time + " " ;
		// 時
	wChr_RFC822time = wChr_RFC822time + _TIMEDATE_ZeroPadding( wTimeDate.getHours() ) ;
	wChr_RFC822time = wChr_RFC822time + ":" ;
		// 分
	wChr_RFC822time = wChr_RFC822time + _TIMEDATE_ZeroPadding( wTimeDate.getMinutes() ) ;
	wChr_RFC822time = wChr_RFC822time + ":" ;
		// 秒
	wChr_RFC822time = wChr_RFC822time + _TIMEDATE_ZeroPadding( wTimeDate.getSeconds() ) ;
	wChr_RFC822time = wChr_RFC822time + " " ;
		// 東京標準時補正
	wChr_RFC822time = wChr_RFC822time + "+0900" ;
	
	return wChr_RFC822time ;
}



////////////////////////////////////////
// 月名に変換
////////////////////////////////////////
function TIMEDATE_chgChrMonth( in_Month )
{
	if((in_Month<0)||(in_Month>=STR_TIMEDATE_CONST.ARR_MONTH.length))
	{
		return "" ;
	}
	return STR_TIMEDATE_CONST.ARR_MONTH[in_Month] ;
}



////////////////////////////////////////
// 曜日名に変換
////////////////////////////////////////
function TIMEDATE_chgChrWeek( in_Week )
{
	if((in_Week<0)||(in_Week>=STR_TIMEDATE_CONST.ARR_WEEK.length))
	{
		return "" ;
	}
	return STR_TIMEDATE_CONST.ARR_WEEK[in_Week] ;
}



////////////////////////////////////////
// うるう年かチェック　※西暦100年未満は false とする
//   4で割り切れる＝うるう年
//    ただし100で割り切れる＝うるう年ではない
//      ただし400で割り切れる＝うるう年
////////////////////////////////////////
function TIMEDATE_chkUruu( in_Year )
{
	let wYear, wValue ;
	
	wYear = in_Year ;
	wYear = _TIMEDATE_ValParse( wYear ) ;
	if( wYear<100 )
	{
		return wFLG_Uruu ;
	}
	
	wValue = ( wYear % 4 ) ;
	if( wValue==0 )
	{
		wValue = ( wYear % 100 ) ;
		if( wValue==0 )
		{
			wValue = ( wYear % 400 ) ;
			if( wValue==0 )
			{
				return true ;
			}
			return false ;
		}
		return true ;
	}
	return false ;
}



////////////////////////////////////////
// 「yyyy/mm/dd,hh:mm:ss」形式で入力された日時のチェックと
// ０埋め補完をおこない、配列にバラして返す。
// 出力：
//  arr[0] = true/false 結果
//  arr[1～6] = yyyy mm dd hh mm ss
////////////////////////////////////////
function TIMEDATE_getArray( in_TimeDate )
{
	let wARR_TimeDate, wTimeDate, wTime, wDate ;
	let wValue, wFLG_Uruu ;
	
	wARR_TimeDate = new Array( false, "", "", "", "", "", "" ) ;
	////////////////////////////////////////
	// 入力情報の取り出し
	////////////////////////////////////////
	wTimeDate = in_TimeDate.split(",") ;
	if( wTimeDate.length!=2 )
	{
		// プログラム側のエラー
		if( STR_TIMEDATE_CONST.FLG_DEBUG==true )
		{
			alert( "TIMEDATE_getArray: 入力の文字列の要素が足りません" ) ;
		}
		return wARR_TimeDate ;
	}
	wDate = wTimeDate[0].split("/") ;
	if( wDate.length!=3 )
	{
		// プログラム側のエラー
		if( STR_TIMEDATE_CONST.FLG_DEBUG==true )
		{
			alert( "TIMEDATE_getArray: 入力の文字列の日付側の要素が足りません" ) ;
		}
		return wARR_TimeDate ;
	}
	wTime = wTimeDate[1].split(":") ;
	if( wTime.length!=3 )
	{
		// プログラム側のエラー
		if( STR_TIMEDATE_CONST.FLG_DEBUG==true )
		{
			alert( "TIMEDATE_getArray: 入力の文字列の時刻側の要素が足りません" ) ;
		}
		return wARR_TimeDate ;
	}
	
	////////////////////////////////////////
	// 日付
	//   月・日の桁はhtml側で入力制限をかける必要がある
	////////////////////////////////////////
	// 西暦
	if( wDate[0].length!=4 )
	{
		alert( "yyyyが４桁の西暦ではありません" ) ;
		return wARR_TimeDate ;
	}
	wValue = _TIMEDATE_ValParse( wDate[0] ) ;
	wARR_TimeDate[1] = wValue ;
	wFLG_Uruu = TIMEDATE_chkUruu( wValue ) ;
	
	// 月
	wValue = _TIMEDATE_ValParse( wDate[1] ) ;
	if(( wValue<1 )||( wValue>12 ))
	{
		alert( "mmが1～12の月ではありません" ) ;
		return wARR_TimeDate ;
	}
	wValue = _TIMEDATE_ZeroPadding( wValue ) ;
	wARR_TimeDate[2] = wValue ;
	
	// 日
	wValue = _TIMEDATE_ValParse( wDate[2] ) ;
	if(( wValue<1 )||( wValue>31 ))
	{
		alert( "ddが1～31の日ではありません" ) ;
		return wARR_TimeDate ;
	}
	if( wValue>STR_TIMEDATE_CONST.ARR_MONTH_DAY[wARR_TimeDate[2]] )
	{
		alert( wARR_TimeDate[2] + "月の最終日は" + STR_TIMEDATE_CONST.ARR_MONTH_DAY[wARR_TimeDate[2]] + "日です" ) ;
		return wARR_TimeDate ;
	}
	if(( wFLG_Uruu==true )&&
	   ( wARR_TimeDate[2]==2 )&&
	   ( wValue>29 ))
	{
		alert( "2月(今年は閏年)の最終日は29日です" ) ;
		return wARR_TimeDate ;
	}
	wValue = _TIMEDATE_ZeroPadding( wValue ) ;
	wARR_TimeDate[3] = wValue ;
	
	// 時
	wValue = _TIMEDATE_ValParse( wTime[0] ) ;
	if(( wValue<0 )||( wValue>23 ))
	{
		alert( "hhが0～23の時ではありません" ) ;
		return wARR_TimeDate ;
	}
	wValue = _TIMEDATE_ZeroPadding( wValue ) ;
	wARR_TimeDate[4] = wValue ;
	
	// 分
	wValue = _TIMEDATE_ValParse( wTime[1] ) ;
	if(( wValue<0 )||( wValue>59 ))
	{
		alert( "mmが0～59の分ではありません" ) ;
		return wARR_TimeDate ;
	}
	wValue = _TIMEDATE_ZeroPadding( wValue ) ;
	wARR_TimeDate[5] = wValue ;
	
	// 秒
	wValue = _TIMEDATE_ValParse( wTime[2] ) ;
	if(( wValue<0 )||( wValue>59 ))
	{
		alert( "ssが0～59の秒ではありません" ) ;
		return wARR_TimeDate ;
	}
	wValue = _TIMEDATE_ZeroPadding( wValue ) ;
	wARR_TimeDate[6] = wValue ;
	
	////OK
	wARR_TimeDate[0] = true ;
	
	return wARR_TimeDate ;
}



////////////////////////////////////////
// 1桁なら先頭０埋め
// ※このクラス専用※
////////////////////////////////////////
function _TIMEDATE_ZeroPadding( in_Val )
{
	let wValue ;
	wValue = in_Val ;
	if( wValue<10 )
	{
		wValue = "0" + wValue ;
	}
	return wValue ;
}

////////////////////////////////////////
// 整数変換
// ※このクラス専用※
////////////////////////////////////////
function _TIMEDATE_ValParse( in_Value )
{
	let wValue ;
	wValue = parseInt( in_Value ) ;
	if( isNaN(wValue)==true )
	{
		wValue = 0 ;
	}
	return wValue ;
}
