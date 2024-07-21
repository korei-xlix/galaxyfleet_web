//#####################################################
//# ::Project  : Galaxy Fleet
//# ::Admin    : Korei (@korei-xlix)
//# ::github   : https://github.com/korei-xlix/galaxyfleet/
//# ::Class    : ハンドラ - ニューゲーム
//#####################################################

//#####################################################
//# [SELECT FILE]ボタン
//#####################################################
function __handle_NewGame_SelectFile( inEvent )
{
	CLS_GF_CreateUser.sSelectSaveData({ inEvent:inEvent  }) ;
	return ;
}



//#####################################################
//# 規約リンククリック
//#####################################################
function __handle_NewGame_AgreeLinkClick( inID )
{
	CLS_GF_Confirm.sAgreeLinkCheck({ inID:inID }) ;
	return ;
}



//#####################################################
//# 規約チェックボックス クリック
//#####################################################
function __handle_NewGame_AgreeClick()
{
	CLS_GF_Confirm.sAgreeCheck() ;
	return ;
}



///////////////////////////////////////////////////////
//  *** テストボタン ***
///////////////////////////////////////////////////////

///			<p>
///				<input type="button" id="gf_iFileDialog_t1" class="gf_FileButton com_BTNCOL_Def" onclick="__handle_NewGame_Test1()" value="テスト1"><!-- ファイル作成 -->
///			</p>
///			<p>
///				<label for="gf_iFileDialog_t2" class="gf_FileButton com_BTNCOL_Def">
///				テスト2
///				<input type="file" id="gf_iFileDialog_t2" onchange="__handle_NewGame_Test2(event)"><!-- ファイルinput設定 -->
///				</label>
///			</p>
///			<p>
///				<label for="gf_iFileDialog_t3" class="gf_FileButton com_BTNCOL_Def">
///				テスト3
///				<input type="file" id="gf_iFileDialog_t3" onchange="__handle_NewGame_Test3(event)"><!-- ファイル選択＆読み出し -->
///				</label>
///			</p>
///			<p>
///				<input type="button" id="gf_iFileDialog_t4" class="gf_FileButton com_BTNCOL_Def" onclick="__handle_NewGame_Test4()" value="テスト4"><!-- ファイル出力 -->
///			</p>

//### Test1
function __handle_NewGame_Test1()
{
	let wSubRes, wSTR_Info ;
	
	/////////////////////////////
	// 子フレームオブジェクト取得
	wSubRes = CLS_FrameCld.sGetObjyect() ;
	if( wSubRes['Result']!=true )
	{///失敗
		return ;
	}
	let wOBJ_Op  = wSubRes['Responce']['OBJ_Op'] ;
	let wOBJ_Win = wSubRes['Responce']['OBJ_Win'] ;
	let wPageObj = wSubRes['Responce']['PageObj'] ;
	
	wSTR_Info = {} ;
	
	/////////////////////////////
	// ファイル作成
	wSubRes = wOBJ_Win.gCLS_FileCtrl.sCreateFile({
		inFileName	: wOBJ_Op.DEF_GF_SAVEDATA_FILE,
		outSTR_Info	: wSTR_Info
	}) ;
	
//**********************************
	wOBJ_Win.gCLS_OSIF.sConsLog({ inText : "*** Debug ***" }) ;
	wOBJ_Win.gCLS_OSIF.sViewObj({ inObj  : wSTR_Info }) ;
//**********************************
	return ;
}


//### Test2
function __handle_NewGame_Test2()
{
	let wSubRes ;
	
	/////////////////////////////
	// 子フレームオブジェクト取得
	wSubRes = CLS_FrameCld.sGetObjyect() ;
	if( wSubRes['Result']!=true )
	{///失敗
		return ;
	}
	let wOBJ_Op  = wSubRes['Responce']['OBJ_Op'] ;
	let wOBJ_Win = wSubRes['Responce']['OBJ_Win'] ;
	let wPageObj = wSubRes['Responce']['PageObj'] ;
	
	/////////////////////////////
	// ファイルinput設定
	wSubRes = wOBJ_Win.gCLS_FileCtrl.sInputFile({
		inPageObj	: self.document,
		inID		: "gf_iFileDialog_t2",
		inFileName	: wOBJ_Op.DEF_GF_SAVEDATA_FILE
	}) ;
	
//**********************************
	wOBJ_Win.gCLS_OSIF.sConsLog({ inText : "*** Debug ***" }) ;
	wOBJ_Win.gCLS_OSIF.sViewObj({ inObj  : wSubRes['Responce'] }) ;
//**********************************
	return ;
}


//### Test3
function __handle_NewGame_Test3( inEvent )
{
	let wSubRes, wSTR_Info ;
	
	/////////////////////////////
	// 子フレームオブジェクト取得
	wSubRes = CLS_FrameCld.sGetObjyect() ;
	if( wSubRes['Result']!=true )
	{///失敗
		return ;
	}
	let wOBJ_Op  = wSubRes['Responce']['OBJ_Op'] ;
	let wOBJ_Win = wSubRes['Responce']['OBJ_Win'] ;
	let wPageObj = wSubRes['Responce']['PageObj'] ;
	
	wSTR_Info = {} ;
	
	/////////////////////////////
	// ファイル選択
	wSubRes = wOBJ_Win.gCLS_FileCtrl.sSelectFile({
		inEvent		: inEvent,
		outSTR_Info	: wSTR_Info
	}) ;
	
	/////////////////////////////
	// ファイル読み出し
	wSubRes = wOBJ_Win.gCLS_FileCtrl.sRead({
		inOBJ_File	: wSTR_Info,
		inOption	: {
			"Space"	: false,
			"Trim"	: true,
			"Line"	: true
		},
		inEncoding	: wOBJ_Op.DEF_GVAL_MOJICODE
	}) ;
	return ;
}

function __handle_NewGame_Test3_Comp()
{
	wOBJ_Win.gCLS_OSIF.sConsLog({ inText : "*** File Load Complete ***" }) ;
	return ;
}



//### Test4
function __handle_NewGame_Test4()
{
	let wSubRes ;
	
	/////////////////////////////
	// 子フレームオブジェクト取得
	wSubRes = CLS_FrameCld.sGetObjyect() ;
	if( wSubRes['Result']!=true )
	{///失敗
		return ;
	}
	let wOBJ_Op  = wSubRes['Responce']['OBJ_Op'] ;
	let wOBJ_Win = wSubRes['Responce']['OBJ_Win'] ;
	let wPageObj = wSubRes['Responce']['PageObj'] ;
	
	/////////////////////////////
	// テキスト出力
	wSubRes = wOBJ_Win.gCLS_FileCtrl.sWrite({
		inPath	: "test4.txt",
		inText	: "test4 test",
		inAuto	: true
	}) ;
	
	return ;
}



