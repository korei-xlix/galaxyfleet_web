/* ********************************************
Project  : Common Script
URL      : https://mynoghra.jp/
Class    : IMAGELOAD
Update   : 2019/1/24
***********************************************
Function :
	IMAGELOAD_setAnc( in_srcID, in_dstID, in_Target, in_ImgURL )

******************************************** */

////////////////////////////////////////
// アンカーを設定
////////////////////////////////////////
function IMAGELOAD_setAnc( in_srcID, in_dstID, in_Target, in_ImgURL )
{
	let wSrcObj, wDstObj, wURL ;
	
	//objectの取得
	wSrcObj = document.getElementById( in_srcID ) ;
	wDstObj = document.getElementById( in_dstID ) ;
	if((wSrcObj==null)||(wDstObj==null))
	{
		return false ;
	}
	
	//target割当
	if( in_Target!="" )
	{
		wSrcObj.setAttribute( "target", in_Target ) ;
		wDstObj.setAttribute( "target", in_Target ) ;
	}
	
	//urlアンカーをコピー
	wUrl = wSrcObj.getAttribute( "href" ) ;
	wDstObj.setAttribute( "href", wUrl ) ;
	
	//画像ロード
	if( in_ImgURL!="" )
	{
		_IMAGELOAD_Load( in_dstID+"-Img", in_ImgURL ) ;
	}
	return true ;
}



////////////////////////////////////////
// 画像ロード
////////////////////////////////////////
function _IMAGELOAD_Load( in_ID, in_ImgURL )
{
	let wObj ;
	
	wObj = document.getElementById( in_ID ) ;
	if( wObj==null )
	{
		return false ;
	}
	wObj.src = in_ImgURL ;
	return true ;
}

