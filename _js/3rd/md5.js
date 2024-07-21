//#####################################################
//# ::Project  : (3rd Party)
//# ::Admin    : onicos.co.jp  (closed)
//# ::github   : http://www.onicos.com/  (closed)
//# ::Class    : MD5クラス (3rd Party製)
//#####################################################
//# md5.js - MD5 Message-Digest
//#   Copyright (C) 1999,2002 Masanao Izumo <iz@onicos.co.jp>
//#   Version: 2.0.0
//#   LastModified: May 13 2002
//#
//# This program is free software.  You can redistribute it and/or modify
//# it without any warranty.  This library calculates the MD5 based on RFC1321.
//# See RFC1321 for more information and algorism.
//#
//# Interface:
//#   md5_128bits = MD5_hash(data);
//#   md5_hexstr  = MD5_hexhash(data);
//#
//# ChangeLog
//#   2002/05/13: Version 2.0.0 released
//#               NOTICE: API is changed.
//#   2002/04/15: Bug fix about MD5 length.
//#
//# URL : http://www.onicos.com/staff/iz/amuse/javascript/expert/
//#       this site is closed.
//#
//#####################################################

//#####################################################
class CLS_MD5 {
//#####################################################

//#####################################################
//# コンストラクタ
//#####################################################
	constructor()
	{
		/////////////////////////////
		// MD5パターン
		
		this.MD5_HASH_PATTERN = "0123456789abcdef" ;
		
		this.MD5_T = new Array(
			0x00000000, 0xd76aa478, 0xe8c7b756, 0x242070db,
			0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613,
			0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1,
			0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e,
			0x49b40821, 0xf61e2562, 0xc040b340, 0x265e5a51,
			0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681,
			0xe7d3fbc8, 0x21e1cde6, 0xc33707d6, 0xf4d50d87,
			0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9,
			0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122,
			0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60,
			0xbebfbc70, 0x289b7ec6, 0xeaa127fa, 0xd4ef3085,
			0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8,
			0xc4ac5665, 0xf4292244, 0x432aff97, 0xab9423a7,
			0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d,
			0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314,
			0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb,
			0xeb86d391);
		
		this.MD5_round1 = new Array(
			new Array( 0, 7, 1), new Array( 1,12, 2),
			new Array( 2,17, 3), new Array( 3,22, 4),
			new Array( 4, 7, 5), new Array( 5,12, 6),
			new Array( 6,17, 7), new Array( 7,22, 8),
			new Array( 8, 7, 9), new Array( 9,12,10),
			new Array(10,17,11), new Array(11,22,12),
			new Array(12, 7,13), new Array(13,12,14),
			new Array(14,17,15), new Array(15,22,16));
		
		this.MD5_round2 = new Array(
			new Array( 1, 5,17), new Array( 6, 9,18),
			new Array(11,14,19), new Array( 0,20,20),
			new Array( 5, 5,21), new Array(10, 9,22),
			new Array(15,14,23), new Array( 4,20,24),
			new Array( 9, 5,25), new Array(14, 9,26),
			new Array( 3,14,27), new Array( 8,20,28),
			new Array(13, 5,29), new Array( 2, 9,30),
			new Array( 7,14,31), new Array(12,20,32));
		
		this.MD5_round3 = new Array(
			new Array( 5, 4,33), new Array( 8,11,34),
			new Array(11,16,35), new Array(14,23,36),
			new Array( 1, 4,37), new Array( 4,11,38),
			new Array( 7,16,39), new Array(10,23,40),
			new Array(13, 4,41), new Array( 0,11,42),
			new Array( 3,16,43), new Array( 6,23,44),
			new Array( 9, 4,45), new Array(12,11,46),
			new Array(15,16,47), new Array( 2,23,48));
		
		this.MD5_round4 = new Array(
			new Array( 0, 6,49), new Array( 7,10,50),
			new Array(14,15,51), new Array( 5,21,52),
			new Array(12, 6,53), new Array( 3,10,54),
			new Array(10,15,55), new Array( 1,21,56),
			new Array( 8, 6,57), new Array(15,10,58),
			new Array( 6,15,59), new Array(13,21,60),
			new Array( 4, 6,61), new Array(11,10,62),
			new Array( 2,15,63), new Array( 9,21,64));
		
		this.MD5_round = new Array(
			new Array(this.__MD5_F, this.MD5_round1),
			new Array(this.__MD5_G, this.MD5_round2),
			new Array(this.__MD5_H, this.MD5_round3),
			new Array(this.__MD5_I, this.MD5_round4));
		
		return ;
	}



///////////////////////////////////////////////////////
//  MD5処理 関数群
///////////////////////////////////////////////////////
	__MD5_F(x, y, z)
	{
		return (x & y) | (~x & z) ;
	}

	__MD5_G(x, y, z)
	{
		return (x & z) | (y & ~z) ;
	}

	__MD5_H(x, y, z)
	{
		return x ^ y ^ z ;
	}

	__MD5_I(x, y, z)
	{
		return y ^ (x | ~z) ;
	}

	__MD5_pack( inN32 )
	{
		return String.fromCharCode(inN32 & 0xff) +
			String.fromCharCode((inN32 >>> 8) & 0xff) +
			String.fromCharCode((inN32 >>> 16) & 0xff) +
			String.fromCharCode((inN32 >>> 24) & 0xff) ;
	}
	
//	*** Unuse Function ***
//	function __MD5_unpack( inS4 )
//	{
//		return  inS4.charCodeAt(0)     |
//			(inS4.charCodeAt(1) <<  8) |
//			(inS4.charCodeAt(2) << 16) |
//			(inS4.charCodeAt(3) << 24) ;
//	}
	
	__MD5_number( wN )
	{
		while( wN<0 )
		{
			wN += 4294967296 ;
		}
		while( wN>4294967295 )
		{
			wN -= 4294967296 ;
		}
		return wN ;
	}
	
	__MD5_apply_round( inX, outS, inF, inABCD, inR )
	{
		let wA, wB, wC, wD ;
		let wKK, wSS, wII ;
		let wT, wU ;
		
		wA	= inABCD[0] ;
		wB	= inABCD[1] ;
		wC	= inABCD[2] ;
		wD	= inABCD[3] ;
		
		wKK	= inR[0] ;
		wSS	= inR[1] ;
		wII	= inR[2] ;
		wU	= inF( outS[wB], outS[wC], outS[wD]) ;
		
		wT	= outS[wA] + wU + inX[wKK] + this.MD5_T[wII] ;
		wT	= this.__MD5_number(wT) ;
		
		wT	= ((wT<<wSS) | (wT>>>(32-wSS))) ;
		wT	+= outS[wB] ;
		outS[wA] = this.__MD5_number(wT) ;
		return ;
	}
	
	__MD5_hash( inPass )
	{
		let wData, wState ;
		let wLen, wIndex, wPadLen, wABCD, wTmp ;
		let wI, wX, wS, wF, wR, wJ, wK ;
		
		wData	= inPass ;
		wState	= new Array( 0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476 ) ;
		wLen	= wData.length;
		wIndex	= wLen & 0x3f;
		wPadLen	= (wIndex < 56) ? (56 - wIndex) : (120 - wIndex) ;
		if( wPadLen>0 )
		{
			wData += "\x80";
			for( wI=0 ; wI<(wPadLen-1) ; wI++ )
			{
				wData += "\x00";
			}
		}
		wData	+= this.__MD5_pack( wLen * 8 ) ;
		wData	+= this.__MD5_pack( 0 ) ;
		wLen	+= wPadLen + 8 ;
		wABCD	= new Array(0, 1, 2, 3) ;
		wX		= new Array(16) ;
		wS		= new Array(4) ;
		for( wK=0 ; wK<wLen ; wK+=64 )
		{
			for( wI=0, wJ=wK ; wI<16 ; wI++, wJ+=4 )
			{
				wX[wI] = wData.charCodeAt(wJ) |
					(wData.charCodeAt(wJ + 1) <<  8) |
					(wData.charCodeAt(wJ + 2) << 16) |
					(wData.charCodeAt(wJ + 3) << 24) ;
			}
			for( wI=0 ; wI<4 ; wI++ )
			{
				wS[wI] = wState[wI] ;
			}
			for( wI=0 ; wI<4 ; wI++ )
			{
				wF = this.MD5_round[wI][0] ;
				wR = this.MD5_round[wI][1] ;
				for( wJ=0 ; wJ<16 ; wJ++ )
				{
					this.__MD5_apply_round( wX, wS, wF, wABCD, wR[wJ] ) ;
					wTmp	 = wABCD[0] ;
					wABCD[0] = wABCD[3] ;
					wABCD[3] = wABCD[2] ;
					wABCD[2] = wABCD[1] ;
					wABCD[1] = wTmp ;
				}
			}
			for( wI=0 ; wI<4 ; wI++ )
			{
				wState[wI] += wS[wI] ;
				wState[wI] = this.__MD5_number(wState[wI]) ;
			}
		}
		return this.__MD5_pack(wState[0]) +
			this.__MD5_pack(wState[1]) +
			this.__MD5_pack(wState[2]) +
			this.__MD5_pack(wState[3]) ;
	}



//#####################################################
//# MD5処理 実行本体
//#####################################################
	MD5_hexhash({
		inPass
	})
	{
		let wI, wChar ;
		let wOut, wBit128 ;
		
		wBit128	= this.__MD5_hash( inPass ) ;
		wOut	= "" ;
		for( wI=0 ; wI<16 ; wI++ )
		{
			wChar = wBit128.charCodeAt( wI ) ;
			wOut += this.MD5_HASH_PATTERN.charAt( (wChar>>4) & 0xf ) ;
			wOut += this.MD5_HASH_PATTERN.charAt( wChar & 0xf ) ;
    	}
	    return wOut ;
	}



//#####################################################
}

