/* ********************************************
Project  : Common Script
URL      : https://mynoghra.jp/
Class    : KEYBOAD
Update   : 2019/1/24
***********************************************
Function :
	KEYBOARD_Value()
	KEYBOARD_test( event )

******************************************** */

// 特殊キーコード
// 27 Esc 
// 13 Enter
// 16 Shift
// 17 Ctrl
// 18 Alt
//  8 BackSpace 
//  9 Tab 
// 32 Space 
// 45 Insert 
// 46 Delete 
// 35 End 
// 36 Home 
// 33 PageUp 
// 34 PageDown 
// 38 ↑ 
// 40 ↓ 
// 37 ← 
// 39 → 

////////////////////////////////////////
// クラス変数
////////////////////////////////////////
function STR_KEYBOAD_Val_Str()
{
	this.FLG_Valid = false ;
}
let STR_KEYBOAD_Val = new STR_KEYBOAD_Val_Str() ;



////////////////////////////////////////
// チェック
// ※自動※
////////////////////////////////////////
function _KEYBOARD_Check( in_Eve )
{
	if(!in_Eve)
	{
		return ;
	}
	STR_KEYBOAD_Val.FLG_Valid = true ;
	return ;
}
_KEYBOARD_Check( event ) ;



////////////////////////////////////////
// キーテスト用
////////////////////////////////////////
//	window.document.onkeydown = C_KEYBOARD_test ;
function KEYBOARD_test( event )
{
	if(!event)
	{
		alert( "非対応ブラウザ" ) ;
		return false ;
	}
	alert(event.which) ;
	return true ;
}



////////////////////////////////////////
// 数字入力の取得
////////////////////////////////////////
function KEYBOARD_Value()
{
	if( STR_KEYBOAD_Val.FLG_Valid!=true )
	{
		//非対応ブラウザ
		return -1 ;
	}
	
	let wKey ;
	wKey = event.which ;
	//キー48:0 ～ 57:9 まで有効
	if(( wKey<=57 )&&( wKey>=48 ))
	{
		wKey = parseInt( wKey ) ;
		wKey = wKey - 48 ;
		return wKey ;
	}
	//Enter か ESC, Delete ならそのまま
	else if(( wKey==13 )||( wKey==27 )||( wKey==46 ))
	{
		return wKey ;
	}
	return -1 ;
}



