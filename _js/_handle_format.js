//#####################################################
//# ::Project  : Galaxy Fleet
//# ::Admin    : Korei (@korei-xlix)
//# ::github   : https://github.com/korei-xlix/galaxyfleet/
//# ::Class    : ハンドラ
//#####################################################



//#####################################################
/*
function __test_Test1({
	inX = 5555,
	inY = 6666,
	inZ = 7777
})
{
	
	console.log( String(inX) ) ;	// 5555
	
	return ;
}

function __test_Test()
{
	let inX = 1 ;
	
	console.log("xxST: " + String(inX) ) ;	// 1
	
	__test_Test1({
		inY : 6666,
		inX : 5555,
		inZ : 7777
	}) ;
	
	console.log("xxEND: " + String(inX) ) ;	// 1
	
}
__test_Test();
*/
//#####################################################



//#####################################################
//# 初期ロード
//#####################################################
function __handle_PageLoad()
{
	///////////////////////////////
	// 応答形式の取得 (LogView)
	let wRes = CLS_L_getRes({ inClassName : "__handle_format", inFuncName : "__handle_PageLoad" }) ;
	
	///////////////////////////////
	// CSSロード
	CLS_WindowCtrl_PageSet({
	   inPageObj	: self.document,
	   inStylePath	: "/_css/",
	   inStyleName	: "default",
	   inMode		: "normal",
	   inStyleCommPath	: null,
	   inIconPath	: "/_icon/starregion_icon.ico"
	}) ;
	
	///////////////////////////////
	// フレームセット
	CLS_WindowCtrl_FrameSet({
		inFrameObj	: self.document,
		inID		: DEF_GLOBAL_FRAME_ID_FRAME_sample1,
		inTimerID	: DEF_GLOBAL_TIMER_ID_FRAME_sample1,
		inCallback	: __handle_FrameLoad_sample1,
///		inFilePath	: "/format_frame.html",
///		inFileID	: "/format_frame.html",
		inStylePath	: "/_css/",
		inStyleCommPath	: null
///		inLoad		: true
	}) ;
	
	CLS_WindowCtrl_FrameLocation({
		inID		: DEF_GLOBAL_FRAME_ID_FRAME_sample1,
		inFileID	: "/format_frame.html",
		inInfo		: {
						"ID"		: "BLANK",
						"PATH" 		: "/frame/_blank/_blank.htm",
						"HEIGHT"	: null,
						"WIDTH"		: 200
					  }
	}) ;
	
	///////////////////////////////
	//# 正常
	wRes['Result'] = true ;
	return ;
}



//#####################################################
//# フレーム用イベント (sample1)
//#####################################################
function __handle_FrameLoad_sample1( inArg )
{
	CLS_WindowCtrl_FrameSetPage({
		inID : inArg['FrameID']
	}) ;
	return ;
}

function __handle_FrameReceive_sample1( inObj )
{
	CLS_WindowCtrl_FrameReceive({
///		inID : DEF_GLOBAL_FRAME_ID_FRAME_sample1,
///		inID	: DEF_GLOBAL_FRAME_ID_FRAME_sample1,
///		inObj 	: inObj
		inID	: DEF_GLOBAL_FRAME_ID_FRAME_sample1
	}) ;
	return ;
}



//#####################################################
//# CSSセレクト(変更)
//#####################################################
function __handle_SelectCSS()
{
	CLS_WindowCtrl_changeCSS() ;
	return ;
}



//#####################################################
//# CSSモードセレクト
//#####################################################
function __handle_SelectCSS_Mode( inMode )
{
	CLS_WindowCtrl_changeCSSmode({
		inMode : inMode
	}) ;
	return ;
}



//#####################################################
//# ログテスト用
//#####################################################
function __handle_test_1()
{
	///////////////////////////////
	// 応答形式の取得 (LogView)
	let wRes = CLS_L_getRes({ inClassName : "__handle_format", inFuncName : "__handle_test_1" }) ;
	
	wRes['Reason']   = "error" ;
	wRes['Responce'] = "harapeko" ;
///	wRes['Result']   = true ;
	CLS_L({ inRes:wRes, inLevel: "A", inMessage: "test" }) ;
	return ;
}



//#####################################################
//# 初期ロード
//#####################################################
function __handle_Sel( inNumber )
{
	CLS_WindowCtrl_setSelVal({
		inNumber : inNumber
	}) ;
	return ;
}
//#####################################################
//# 初期ロード
//#####################################################
///function __handle_CSSsw( iFwidw )
///{
///	cWINCTRL_CSS_Sw( iFwidw ) ;
///	return ;
///}



