// DHTML chess module for web-pages
// Board, moves, mouse, visual part
// no clock, no chess engine
// Author: mail: grozny0   at  gmail.com

var c0_relative_size_procents=100;
var c0_at_left=20;
var c0_at_top=130;
var c0_zoom=true;

var c0_topview=(readCookie("TpVw0_")=="TOP");
var c0_board_letters=true;

var c0_art=false;
var c0_position="";
var c0_side=1;
var c0_sidemoves=1;
var c0_moving=false;
var c0_waitmove=false;

var c0_drag_div="";
var c0_arrow_at="";

var c0_ram_Lxy=Array( 31,332,   56,271,   77,216,  96,171,  112,129,  127,93, 140,60, 152,33, 161,6 )
var c0_ram_Rxy=Array(729,328, 700,266, 676,214, 655,168, 637,128,  620,91, 606,60, 593,32, 581,6 )

var c0_rat_Lxy=Array( 38,625,   42,546,   46,466,  51,391,   54,317,  58,245,  62,164, 67,108, 70,42 )
var c0_rat_Rxy=Array(671,623, 664,544, 660,465, 653,389, 647,316,  643,244, 639,175, 633,107, 630,44 )

var c0_div_list="";

var c0_wKingmoved = false;
var c0_bKingmoved = false;
var c0_wLRockmoved = false;
var c0_wRRockmoved = false;
var c0_bLRockmoved = false;
var c0_bRRockmoved = false;
var c0_w00 = false;
var c0_b00 = false;

var c0_lastmovepawn = 0;

var c0_become="";
var c0_become_from_engine="";			// just engine

var c0_moveslist = "";

var c0_moved_callback="";			// on piece moved event...
var c0_2D_move=false;
var c0_2D_prex=0;
var c0_2D_prey=0;

var c0_DV_list="";		// DIVs to move... syntax: "[ElementTargetId1]{DivToMoveId1};[ElementTargetId2]{DivToMoveId2}...
var c0_DV_move=false;
var c0_DV_prex=0;
var c0_DV_prey=0;
var c0_DV_k="";

var c0_screensizeH=document.body.clientHeight;
var c0_screensizeW=document.body.clientWidth;

var c0_onkeypress = document.onkeypress;
var c0_onmousedown = document.onmousedown;
var c0_onmousemove = document.onmousemove;

var c0_f_evals1=null;
var c0_f_evals2=null; 
var c0_foundmove='';

var c0_start_FEN='';
var c0_fischer=false;
var c0_fischer_cst='';

var c0_board_lett2=0;
var c0_ZmAdj="";

var c0_anim1Tim=0;
var c0_anim1Lng=0;
var c0_anim1All=0;
var c0_anim1Tck=0;

var c0_anim2Tim=0;
var c0_anim2Lng=0;
var c0_anim2All=0;
var c0_anim2Tck=0;

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// initial settings...
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
function c0_initall()
{
document.writeln('<DIV id="c0_board" style="position:absolute;top:'+c0_at_top+'px;left:'+c0_at_left+'px"></DIV>')
document.writeln('<DIV id="c0_brd_lett" style="position:absolute;top:'+c0_at_top+'px;left:'+c0_at_left+'px"></DIV>')
document.writeln('<DIV id="c0_arrow" style="position:absolute;top:'+c0_at_top+'px;left:'+c0_at_left+'px"></DIV>')
document.writeln('<DIV id="c0_diagram" style="width:0;height:0;position:absolute;top:'+c0_at_top+'px;left:'+c0_at_left+'px"></DIV>')
document.writeln('<DIV id="c0_zoomz" style="width:0;height:0;position:absolute;top:'+c0_at_top+'px;left:'+c0_at_left+'px"></DIV>')

for(var c0_i=0; c0_i<100; c0_i++)
{
document.writeln('<DIV id="c0_divs_'+c0_i+'" style="position:absolute;top:'+c0_at_top+'px;left:'+c0_at_left+'px"></DIV>')
}

document.onkeypress = doEvKeyCapture;
document.onmousedown = doEvMouseCapture;
document.onmousemove = doEvMouseMove;
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// draws an empty 3D board...
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
function c0_draw_empty_board()
{

if(c0_ZmAdj.indexOf("3D")<0)
 {
 c0_relative_size_procents=c0_adjZooms(0, c0_relative_size_procents);
 c0_at_left=c0_adjZooms(1, c0_at_left);
 c0_at_top=c0_adjZooms(2, c0_at_top);
 c0_ZmAdj+="3D";
 }

if(c0_relative_size_procents==0)
	{
	var relproc1=((c0_screensizeW-c0_at_left)* (125/(1024-20)));
	var relproc2=((c0_screensizeH-c0_at_top)* (125/(610-120)));
	c0_relative_size_procents= ((relproc1<relproc2)? relproc1 : relproc2 );
	if(c0_relative_size_procents<=0) c0_relative_size_procents=120;
	c0_at_left*=c0_relative_size_procents/120;
	c0_at_top*=c0_relative_size_procents/120;
	}
var c0_board_image_src = c0_art ? "arts/board2_2.png": "img/oie_board.png";
var c0_p = document.getElementById('c0_board');

clsDIV(c0_p);

c0_p.style.top = (c0_topview?c0_at_top-(10*c0_relative_size_procents/100) : c0_at_top)+"px";
c0_p.style.left = c0_at_left+"px";
c0_p.style.zIndex = 5;

if(c0_topview)
{
c0_board_image_src="img/t_board.png";
c0_p.innerHTML= '<IMG id="c0_board_img" src="http://chessforeva.appspot.com/' + c0_board_image_src +
 '" WIDTH="'+ (589*1.2*c0_relative_size_procents/100)+'" HEIGHT="' + (541*1.2*c0_relative_size_procents/100) +
 '" onclick="c0_void()" onmousedown="c0_preventaction(event)">';
}
else
{
c0_p.innerHTML= '<IMG id="c0_board_img" src="http://chessforeva.appspot.com/' + c0_board_image_src +
 '" WIDTH="'+ 758*(c0_relative_size_procents/100)+'" HEIGHT="' + (364*c0_relative_size_procents/100) +
 '" onclick="c0_void()" onmousedown="c0_preventaction(event)">';
}


c0_draw_board_letters();

c0_zooming(0);
}

//-- nothing event
function c0_void() { }


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// draws board letters...
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
function c0_draw_board_letters()
{

if(c0_board_letters && (!c0_art) && (c0_board_lett2!=c0_side))
	{
	var c0_p = document.getElementById('c0_brd_lett');
	clsDIV(c0_p);
	var c0_board_image_src = "";
	if(c0_topview)
		{
		c0_board_image_src = (c0_side>0 ? "img/t_letters.png" : "img/t_letters2.png" );
		c0_p.innerHTML= '<IMG id="c0_brd_lett_img" src="http://chessforeva.appspot.com/' + c0_board_image_src +
		 '" WIDTH="'+ (589*1.2*c0_relative_size_procents/100)+'" HEIGHT="' + (541*1.2*c0_relative_size_procents/100) +
		 '" onmousedown="c0_preventaction(event)">';
		}
	else
		{
		c0_board_image_src = (c0_side>0 ? "img/oie_letters.png" : "img/oie_letters2.png" );
		c0_p.innerHTML= '<IMG id="c0_brd_lett_img" src="http://chessforeva.appspot.com/' + c0_board_image_src +
		 '" WIDTH="'+ 758*(c0_relative_size_procents/100)+'" HEIGHT="' + (364*c0_relative_size_procents/100) +
		 '" onmousedown="c0_preventaction(event)">';
		}
	c0_p.style.top = (c0_topview?c0_at_top-(10*c0_relative_size_procents/100) : c0_at_top)+"px";
	c0_p.style.left = c0_at_left+"px";
	c0_p.style.zIndex = 6;

	c0_board_lett2=c0_side;
	}
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// zooming control...
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
function c0_zooming(parm)
{
if(parm==0 && c0_zoom)
	{

	var c0_p3 = document.getElementById('c0_zoomz');
	clsDIV(c0_p3);
	c0_p3.style.top = c0_at_top + ((c0_topview?592:332)*(c0_relative_size_procents/100)) +"px";
	c0_p3.style.left = c0_at_left + 10 + "px";
	c0_p3.style.zIndex = 145;

	var htms= '<TABLE><TR><TD><IMG id="c0_zoomimg_plus" title="zoom IN" style="cursor:pointer" src="http://chessforeva.appspot.com/img/b_plus1.gif" WIDTH="28" HEIGHT="28"  onmousedown="c0_preventaction(event)"></TD>' ;
	htms+='<TD><IMG id="c0_zoomimg_minus" title="zoom out" style="cursor:pointer" src="http://chessforeva.appspot.com/img/b_minus1.gif" WIDTH="28" HEIGHT="28"  onmousedown="c0_preventaction(event)"></TD>' ;
	if(!c0_art)
	{
	htms+='<TD><IMG id="c0_zoomimg_topview" title="top/side view" style="cursor:pointer" src="http://chessforeva.appspot.com/img/b_topview.gif" WIDTH="28" HEIGHT="28"  onmousedown="c0_preventaction(event)"></TD></TR></TABLE>' ;
	}
	c0_p3.innerHTML=htms;
	}
if(!c0_moving && (parm==+1 || parm==-1))
	{
	var preprocents=c0_relative_size_procents;
	if(parm==-1 && c0_relative_size_procents>20)
		{ if(c0_relative_size_procents>50) c0_relative_size_procents-=20; else c0_relative_size_procents-=10; }
	if(parm==+1 && c0_relative_size_procents<300)
		{ if(c0_relative_size_procents<50) c0_relative_size_procents+=10; else c0_relative_size_procents+=20; }
	if(preprocents!=c0_relative_size_procents)
		{
		c0_at_left*=c0_relative_size_procents/preprocents;
		c0_at_top*=c0_relative_size_procents/preprocents*(c0_topview?0.8:1);
		}
	
	var v_c0_moveslist=c0_moveslist;
	var v_c0_moved_callback=c0_moved_callback;
	var v_c0_waitmove=c0_waitmove;
	var v_c0_become_from_engine=c0_become_from_engine;

	c0_moved_callback="";

	var c0_pD = document.getElementById('c0_diagram');
	var c0_2Dboard=((c0_pD.style.zIndex==150) ? true: false );
	if(c0_2Dboard)
		{
		var c0_pDtop=c0_pD.style.top;
		var c0_pDleft=c0_pD.style.left;
		c0_draw_2D_board();
		}

	c0_board_lett2=0;
	c0_draw_empty_board();

	c0_set_board_situation( c0_position, c0_wKingmoved, c0_wLRockmoved, c0_wRRockmoved, c0_w00, c0_bKingmoved, c0_bLRockmoved, c0_bRRockmoved, c0_b00, c0_lastmovepawn, c0_moveslist, c0_sidemoves );

	if(c0_2Dboard)
		{
		c0_pD.style.top=parseInt(c0_pDtop)+"px";
		c0_pD.style.left=parseInt(c0_pDleft)+"px";
		}

	c0_moveslist=v_c0_moveslist;
	c0_moved_callback=v_c0_moved_callback;
	c0_waitmove=v_c0_waitmove;
	c0_become_from_engine=v_c0_become_from_engine;
	c0_drag_div="";
	c0_SvZm3D();
	}
}
// adjust zooming from cookies
function c0_adjZooms(c0_n5, c0_d5)
{
 var c0_z5 = readCookie("Zoom"+c0_n5.toString()+"_");
 return (c0_z5.length>0 ? parseInt(c0_z5) : c0_d5);
}

// saves zoom for 3D window
function c0_SvZm3D()
{
 createCookie("Zoom0_", c0_relative_size_procents.toString(),3650);
 createCookie("Zoom1_", c0_at_left.toString(),3650);
 createCookie("Zoom2_", c0_at_top.toString(),3650);
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// to change view side/top...
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
function c0_ch_topview()
{
c0_topview=!c0_topview;

if(c0_topview)
	{
	c0_at_top*=1/5;
	c0_at_left*=3;
	c0_relative_size_procents*=5/6;
	}
else
	{
	c0_at_top*=5;
	c0_at_left*=1/3;
	c0_relative_size_procents*=6/5;
	}


createCookie("TpVw0_", (c0_topview?"TOP":"SIDE"),3650);
c0_SvZm3D();

var v_c0_moveslist=c0_moveslist;
var v_c0_moved_callback=c0_moved_callback;
var v_c0_waitmove=c0_waitmove;
var v_c0_become_from_engine=c0_become_from_engine;

c0_moved_callback="";

var c0_pD = document.getElementById('c0_diagram');
var c0_2Dboard=((c0_pD.style.zIndex==150) ? true: false );
if(c0_2Dboard)
	{
	var c0_pDtop=c0_pD.style.top;
	var c0_pDleft=c0_pD.style.left;
	c0_draw_2D_board();
	}

c0_board_lett2=0;
c0_draw_empty_board();

c0_set_board_situation( c0_position, c0_wKingmoved, c0_wLRockmoved, c0_wRRockmoved, c0_w00, c0_bKingmoved, c0_bLRockmoved, c0_bRRockmoved, c0_b00, c0_lastmovepawn, c0_moveslist, c0_sidemoves );

if(c0_2Dboard)
	{
	c0_pD.style.top=parseInt(c0_pDtop)+"px";
	c0_pD.style.left=parseInt(c0_pDleft)+"px";
	}

c0_moveslist=v_c0_moveslist;
c0_moved_callback=v_c0_moved_callback;
c0_waitmove=v_c0_waitmove;
c0_become_from_engine=v_c0_become_from_engine;
c0_drag_div="";

}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// draws an empty 2D board...
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
function c0_draw_2D_board()
{

var c0_pozX=0;
var c0_pozY=0;

if(c0_ZmAdj.indexOf("2D")<0)
 {
 c0_pozX=c0_adjZooms(3, c0_pozX);
 c0_pozY=c0_adjZooms(4, c0_pozY);
 c0_ZmAdj+="2D";
 }


var c0_lielums=Math.abs(c0_relative_size_procents/5);
if(c0_relative_size_procents<90) c0_lielums*=1.2;
if(c0_relative_size_procents<60) c0_lielums*=1.2;


var c0_pD = document.getElementById('c0_diagram');
var c0_s="";
c0_s+='<img src="http://chessforeva.appspot.com/d_img/d0.jpg"  height="2" width="2"  onmousedown="c0_preventaction(event)">';
for(var c0_j=1;c0_j<=8;c0_j++) c0_s+='<img src="http://chessforeva.appspot.com/d_img/dh.jpg"  height="2" width="' + c0_lielums.toString() + '"  onmousedown="c0_preventaction(event)">';
c0_s+='<img src="http://chessforeva.appspot.com/d_img/d0.jpg"  height="2" width="2"  onmousedown="c0_preventaction(event)">';
c0_s+='<BR>';

for(var c0_i=(c0_side>0)?1:8;c0_i>=1 && c0_i<=8;c0_i+=c0_side)
  {
  c0_s+='<img src="http://chessforeva.appspot.com/d_img/dv.jpg"  width="2" height="' + c0_lielums.toString() + '"  onmousedown="c0_preventaction(event)">';

  for(var c0_j=(c0_side>0)?1:8;c0_j>=1 && c0_j<=8;c0_j+=c0_side)
	{
	var c0_horiz=c0_j;
	var c0_vert=(9-c0_i);
	c0_s+='<img id="lauk' + c0_conv52(c0_vert,c0_horiz) +
		 '" src="http://chessforeva.appspot.com/d_img/' + c0_backgr(c0_vert,c0_horiz) +'.jpg"' +
		' style="cursor:move" width="' + c0_lielums.toString() + '" height="' + c0_lielums.toString() + '"  onmousedown="c0_preventaction(event)">';
	}
  c0_s+='<img src="http://chessforeva.appspot.com/d_img/dv.jpg"  width="2" height="' + c0_lielums.toString() + '"  onmousedown="c0_preventaction(event)">';

  //if(c0_i==8) c0_s+='<img src="http://chessforeva.appspot.com/d_img/baltie.gif" width="' + c0_lielums.toString() + '" height="' + c0_lielums.toString() + '"  onmousedown="c0_preventaction(event)">';
  //if(c0_i==1) c0_s+='<img src="http://chessforeva.appspot.com/d_img/melnie.gif" width="' + c0_lielums.toString() + '" height="' + c0_lielums.toString() + '"  onmousedown="c0_preventaction(event)">';
  c0_s+='<BR>';
  }
c0_s+='<img src="http://chessforeva.appspot.com/d_img/d0.jpg"  height="2" width="2"  onmousedown="c0_preventaction(event)">';
for(var c0_j=1;c0_j<=8;c0_j++) c0_s+='<img src="http://chessforeva.appspot.com/d_img/dh.jpg"  height="2" width="' + c0_lielums.toString() + '"  onmousedown="c0_preventaction(event)">';
c0_s+='<img src="http://chessforeva.appspot.com/d_img/d0.jpg"  height="2" width="2"  onmousedown="c0_preventaction(event)">';
c0_s+='<BR>';

c0_pD.innerHTML= c0_s;
c0_pD.style.top = c0_pozY+"px";
c0_pD.style.left = c0_pozX+"px";
c0_pD.style.width= ((8*c0_lielums)+6)+"px";
c0_pD.style.height = ((8*c0_lielums)+6)+"px";
c0_pD.style.zIndex = 150;
}

function c0_backgr(c0_vertikali,c0_horizontali)
{
 var c0_background;
 if(((c0_horizontali+c0_vertikali)%2)==0) c0_background="b"; else c0_background="w";
 return c0_background;
}

function c0_f_Lxy( c0_at9 )
{
return (c0_topview? c0_rat_Lxy[c0_at9] : c0_ram_Lxy[c0_at9]);
}
function c0_f_Rxy( c0_at9 )
{
return (c0_topview? c0_rat_Rxy[c0_at9] : c0_ram_Rxy[c0_at9]);
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// set up starting position...
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
function c0_set_start_position( c0_mlist )
{
c0_clear_divs();

var c0_pD = document.getElementById('c0_diagram');
var c0_2Dboard=((c0_pD.style.zIndex==150) ? true: false );
if(c0_2Dboard)
	{
	var c0_pDtop=c0_pD.style.top;
	var c0_pDleft=c0_pD.style.left;
	c0_draw_2D_board();
	}

if( c0_start_FEN.length>0 )
	{
	c0_set_FEN( c0_start_FEN );
	if(c0_fischer) c0_fischer_adjustmoved();
	}
else
{
c0_position="";

if(c0_mlist.length==0)
	{
	c0_add_piece("wpa2"); c0_add_piece("wpb2"); c0_add_piece("wpc2"); c0_add_piece("wpd2");
	c0_add_piece("wpe2"); c0_add_piece("wpf2"); c0_add_piece("wpg2"); c0_add_piece("wph2");
	c0_add_piece("wRa1"); c0_add_piece("wNb1"); c0_add_piece("wBc1"); c0_add_piece("wQd1");
	c0_add_piece("wKe1"); c0_add_piece("wBf1"); c0_add_piece("wNg1"); c0_add_piece("wRh1");
	c0_add_piece("bpa7"); c0_add_piece("bpb7"); c0_add_piece("bpc7"); c0_add_piece("bpd7");
	c0_add_piece("bpe7"); c0_add_piece("bpf7"); c0_add_piece("bpg7"); c0_add_piece("bph7");
	c0_add_piece("bRa8"); c0_add_piece("bNb8"); c0_add_piece("bBc8"); c0_add_piece("bQd8");
	c0_add_piece("bKe8"); c0_add_piece("bBf8"); c0_add_piece("bNg8"); c0_add_piece("bRh8");
	}
else
	{
	c0_position = "wpa2;wpb2;wpc2;wpd2;wpe2;wpf2;wpg2;wph2;" +
		"wRa1;wNb1;wBc1;wQd1;wKe1;wBf1;wNg1;wRh1;" +
		"bpa7;bpb7;bpc7;bpd7;bpe7;bpf7;bpg7;bph7;" +
		"bRa8;bNb8;bBc8;bQd8;bKe8;bBf8;bNg8;bRh8;";
	}

c0_wKingmoved = false;
c0_bKingmoved = false;
c0_wLRockmoved = false;
c0_wRRockmoved = false;
c0_bLRockmoved = false;
c0_bRRockmoved = false;
c0_w00 = false;
c0_b00 = false;

c0_lastmovepawn = 0;
c0_sidemoves=1;
}

c0_become="";
c0_become_from_engine="";			// just engine

c0_moveslist = "";

c0_moving=false;

if(c0_mlist.length>0)
	{
	for(var c0_z=0;c0_z<c0_mlist.length;c0_z+=4)
		{
		var c0_from_at=c0_mlist.substr(c0_z,2);
		var c0_to_at=c0_mlist.substr(c0_z+2,2);
		if(c0_z+4<c0_mlist.length && c0_mlist.substr(c0_z+4,1)=="[")
			{
			c0_become_from_engine=c0_mlist.substr(c0_z+5,1);
			c0_z+=3;
			}
		else c0_become_from_engine="";

		if(c0_fischer) c0_fischer_cstl_move(c0_from_at+c0_to_at,false);		
		else c0_moveto(c0_convH888(c0_from_at), c0_convH888(c0_to_at), false);
		c0_sidemoves=-c0_sidemoves;
		}
	if( c0_start_FEN.length>0 )
		{
		if(c0_2Dboard) c0_draw_2D_board();
		c0_set_board_situation( c0_position, c0_wKingmoved, c0_wLRockmoved, c0_wRRockmoved, c0_w00, c0_bKingmoved, c0_bLRockmoved, c0_bRRockmoved, c0_b00, c0_lastmovepawn, c0_moveslist, c0_sidemoves );
		}
	else
		{
		var c0_pos2=c0_position;
		c0_position='';
		for(var c0_q=0;c0_q<c0_pos2.length;c0_q+=5) c0_add_piece(c0_pos2.substr(c0_q,4));
		}
	}

if(c0_2Dboard)
	{
	c0_pD.style.top=parseInt(c0_pDtop)+"px";
	c0_pD.style.left=parseInt(c0_pDleft)+"px";
	}

c0_moveslist = c0_mlist;
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Set board situation...
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
function c0_set_board_situation( c0_figlist, c0_wK, c0_wLR, c0_wRR, c0_w_00, c0_bK, c0_bLR, c0_bRR, c0_b_00, c0_elpas, c0_ml, c0_s )
{
c0_moving=false;

c0_clear_divs();

c0_position="";
for( var i=0; i<c0_figlist.length; )
	{
	c0_add_piece( c0_figlist.substr(i,4) );
	i+=4; if( i<c0_figlist.length && c0_figlist.substr(i,1)==";" ) i++;
	}

c0_wKingmoved = c0_wK;
c0_bKingmoved = c0_bK;
c0_wLRockmoved = c0_wLR;
c0_wRRockmoved = c0_wRR;
c0_bLRockmoved = c0_bLR;
c0_bRRockmoved = c0_bRR;
c0_w00 = c0_w_00;
c0_b00 = c0_b_00;

c0_lastmovepawn = c0_elpas;

c0_become="";
c0_become_from_engine="";			// just engine

c0_moveslist = c0_ml;
c0_sidemoves=c0_s;
}



//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// get free DIV number...
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
function c0_get_free_DIV()
{
var c0_ret=0;
for(var c0_i=0; c0_i<100; c0_i++)
{
var c0_p = document.getElementById('c0_divs_'+c0_i);
if( c0_p.innerHTML.length==0 ) { c0_ret=c0_i; break; }
}
return c0_ret;
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// clear all divs...
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
function c0_clear_divs()
{
for(var c0_i=0; c0_i<100; c0_i++)
{
var c0_p = document.getElementById('c0_divs_'+c0_i);
if( c0_p.innerHTML.length>0 )
 { clsDIV(c0_p); c0_p.innerHTML= ""; c0_p.style.top = "0px"; c0_p.style.left = "0px"; c0_p.style.zIndex=0; }
}
c0_div_list="";
c0_draw_board_letters();
}



//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// relative 3D visual size to vertical position...
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
function c0_3D_size( c0_vert )
{
return (c0_topview? 1 - ((c0_vert-1) * 0.01) : 1 - ((c0_vert-1) * 0.04) );
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// relative piece size...
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
function c0_piece_relative_size( c0_1_figure )
{
var c0_rel_size=100;
switch(c0_1_figure)
{
case "p":	c0_rel_size=50; break;
case "N":	c0_rel_size=50; break;
case "B":	c0_rel_size=50; break;
case "R":	c0_rel_size=58; break;
case "Q":	c0_rel_size=48; break;
case "K":	c0_rel_size=48; break;
}

if(c0_topview) c0_rel_size*=1.1;
return c0_rel_size;
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// piece width... +-
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
function c0_piece_delta_width( c0_1_figure, c0_rel )
{
var c0_delta_width=0;
switch(c0_1_figure)
{
case "p":	c0_abs_width=(c0_topview?89:97)*(c0_rel?1.2:1); break;
case "N":	c0_abs_width=(c0_topview?153:137)*(c0_rel?1.2:1); break;
case "B":	c0_abs_width=(c0_topview?131:132)*(c0_rel?1.1:1); break;
case "R":	c0_abs_width=(c0_topview?121:125)*(c0_rel?1.4:1); break;
case "Q":	c0_abs_width=(c0_topview?156:158)*(c0_rel?1.2:1); break;
case "K":	c0_abs_width=(c0_topview?155:157)*(c0_rel?1.2:1); break;
}
return  c0_abs_width;
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// piece heigth... +-
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
function c0_piece_delta_height( c0_1_figure, c0_rel )
{
var c0_delta_height=0;
switch(c0_1_figure)
{
case "p":	c0_delta_height=(c0_topview?122:181)*(c0_rel?2.1:1); break;
case "N":	c0_delta_height=(c0_topview?194:276)*(c0_rel?2.2:1); break;
case "B":	c0_delta_height=(c0_topview?199:313)*(c0_rel?2.15:1); break;
case "R":	c0_delta_height=(c0_topview?184:225)*(c0_rel?2.48:1); break;
case "Q":	c0_delta_height=(c0_topview?265:358)*(c0_rel?2.1:1); break;
case "K":	c0_delta_height=(c0_topview?268:400)*(c0_rel?2.1:1); break;
}
return  c0_delta_height;
}


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// arrow width... +-
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
function c0_arrow_delta_width(c0_rel )
{
return 270*(c0_rel?0.4:1.2);
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// arrow heigth... +-
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
function c0_arrow_delta_height( c0_rel )
{
return 464*(c0_rel?0.07:0.35)*(c0_topview?1.5:1);
}


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// add a piece at position...
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
function c0_add_piece( c0_pstring )
{
var c0_1_at=c0_pstring.substr(2,2);
var c0_1_figure=c0_pstring.substr(1,1);
var c0_1_color=c0_pstring.substr(0,1);

if(c0_position.indexOf(c0_1_at)>=0) return;

c0_position+=c0_pstring+";";
var c0_piece_image_src = c0_1_color;
switch(c0_1_figure)
{
case "p":	c0_piece_image_src += "pawn.png"; break;
case "N":
	c0_piece_image_src += "knight";
	if((c0_side>0 && c0_1_color=="w") || (c0_side<0 && c0_1_color=="b")) c0_piece_image_src+="1";
	else if((c0_side<0 && c0_1_color=="w") || (c0_side>0 && c0_1_color=="b")) c0_piece_image_src+="2";
	else c0_piece_image_src+="2";
	c0_piece_image_src +=".png";
	break;
case "B":	c0_piece_image_src += "bishop.png"; break;
case "R":	c0_piece_image_src += "rook.png"; break;
case "Q":	c0_piece_image_src += "queen.png"; break;
case "K":	c0_piece_image_src += "king.png"; break;
}

if(c0_topview) c0_piece_image_src="img/t_"+c0_piece_image_src;
else
{
if(c0_art) c0_piece_image_src="arts/a_"+c0_piece_image_src; else c0_piece_image_src="img/oie_"+c0_piece_image_src;
}

var c0_v = parseInt( c0_1_at.substr(1,1) ); if(c0_side<0) c0_v=9-c0_v;
var c0_x1 = (c0_f_Lxy( (c0_v-1) * 2) + c0_f_Lxy( (c0_v) * 2 )) / 2 ;
var c0_y1 = (c0_f_Lxy( ((c0_v-1) * 2)+1) + c0_f_Lxy( ((c0_v) * 2)+1)) / 2 ;
var c0_x2 = (c0_f_Rxy( (c0_v-1) * 2) + c0_f_Rxy( (c0_v) * 2 )) / 2 ;
var c0_y2 = (c0_f_Rxy( ((c0_v-1) * 2)+1) + c0_f_Rxy( ((c0_v) * 2)+1)) / 2 ;

var c0_h = c0_1_at.charCodeAt(0) - 96; if(c0_side<0) c0_h=9-c0_h;
var c0_x = c0_x1 + ((c0_x2 - c0_x1)/8*(c0_h-0.5));
var c0_y = c0_y1 + ((c0_y2 - c0_y1)/8*(c0_h-0.5));

c0_x -= c0_3D_size(c0_v)*c0_piece_delta_width( c0_1_figure, true )*0.2;
c0_y -= c0_3D_size(c0_v)*c0_piece_delta_height( c0_1_figure, true )*0.2;

c0_x *=c0_relative_size_procents/100;
c0_y *=c0_relative_size_procents/100;

c0_x += c0_at_left;
c0_y += c0_at_top;

var c0_rel_piece_size = c0_piece_relative_size( c0_1_figure )/100 * c0_3D_size( c0_v ) * c0_relative_size_procents/100;

var c0_DIVnumber=c0_get_free_DIV();
var c0_p = document.getElementById('c0_divs_'+c0_DIVnumber);
clsDIV(c0_p);

c0_p.style.top = c0_y+"px";
c0_p.style.left = c0_x+"px";
c0_p.style.zIndex = 100 - (c0_v*5);

c0_p.innerHTML= '<IMG id="c0_piece_' + c0_1_at + '_img" src="http://chessforeva.appspot.com/' + c0_piece_image_src + '"' +
	 'WIDTH="' + c0_piece_delta_width( c0_1_figure, false ) * c0_rel_piece_size + '"' +
	 'HEIGHT="' + c0_piece_delta_height( c0_1_figure, false ) *  c0_rel_piece_size + '" onmousedown="c0_preventaction(event)">';

c0_div_list += "{" + c0_1_at + "-" + c0_DIVnumber + "}";

var c0_pD = document.getElementById('c0_diagram');
if(c0_pD!=null && c0_pD.innerHTML.length>0)
	{
	var c0_vert=parseInt( c0_1_at.substr(1,1) );
	var c0_horiz=c0_1_at.charCodeAt(0) - 96;
	document.getElementById("lauk"+c0_conv52(c0_vert,c0_horiz)).src=
		"http://chessforeva.appspot.com/d_img/" +c0_1_color+c0_1_figure+c0_backgr(c0_vert,c0_horiz) +'.jpg';
	}

}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// remove a piece from position...
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
function c0_clear_at( c0_1_at )
{
var c0_a=c0_position.indexOf(c0_1_at);
if(c0_a>=0) c0_position=c0_position.substr(0,c0_a-2) + c0_position.substr(c0_a+3);

c0_a=c0_div_list.indexOf("{"+c0_1_at);
if(c0_a>=0)
	{
	var c0_DIVnumber=c0_div_list.substr(c0_a+4,2);
	if( c0_DIVnumber.substr(1,1)=="}" ) c0_DIVnumber = c0_DIVnumber.substr(0,1);
	c0_div_list = c0_div_list.substr(0,c0_a)+c0_div_list.substr(c0_a+5+c0_DIVnumber.length);
	var c0_p = document.getElementById('c0_divs_'+c0_DIVnumber);
	clsDIV(c0_p);
	c0_p.innerHTML= ""; c0_p.style.top = "0px"; c0_p.style.left = "0px"; c0_p.style.zIndex=0;
	}

var c0_pD = document.getElementById('c0_diagram');
if(c0_pD!=null && c0_pD.innerHTML.length>0)
	{
	var c0_vert=parseInt( c0_1_at.substr(1,1) );
	var c0_horiz=c0_1_at.charCodeAt(0) - 96;
	document.getElementById("lauk"+c0_conv52(c0_vert,c0_horiz)).src=
		"http://chessforeva.appspot.com/d_img/" +c0_backgr(c0_vert,c0_horiz) +'.jpg';
	}

}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// move visualy a piece...
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
function c0_just_move_piece( c0_2_from, c0_2_to )
{
c0_clear_at( c0_2_to );
var c0_a=c0_position.indexOf(c0_2_from);
if(c0_a>=0)
	{
	var c0_2_figure = c0_position.substr(c0_a-1,1);
	var c0_2_color = c0_position.substr(c0_a-2,1);
	c0_position=c0_position.replace( c0_2_from, c0_2_to );
	c0_a=c0_div_list.indexOf("{"+c0_2_from);
	if(c0_a>=0)
		{
		var c0_DIVnumber=c0_div_list.substr(c0_a+4,2);
		if( c0_DIVnumber.substr(1,1)=="}" ) c0_DIVnumber = c0_DIVnumber.substr(0,1);
		var c0_p = document.getElementById('c0_divs_'+c0_DIVnumber);
		if(c0_p!=null)
			{
			var c0_jump = (c0_2_figure=="N" || (c0_2_figure=="K" && Math.abs(c0_2_from.charCodeAt(0)-c0_2_to.charCodeAt(0) )>1 ))
			c0_p.innerHTML = c0_p.innerHTML.replace( c0_2_from, c0_2_to );
			 setTimeout('c0_movepiece("c0_divs_' + c0_DIVnumber + '","' + 
			c0_2_from + '","' + c0_2_to +'","' + c0_2_figure +
			 '",50,' + (c0_jump?'true':'false') + ')',10);
			}
		c0_moving=true;
		}
	}
}

function c0_movepiece( c0_divID, c0_2_from, c0_2_to, c0_1_figure, c0_repeats, c0_jump )		// moves a piece on timeout...
{
var c0_p = document.getElementById(c0_divID);

var c0_v = parseInt( c0_2_to.substr(1,1) ); if(c0_side<0) c0_v=9-c0_v;
var c0_x1 = (c0_f_Lxy( (c0_v-1) * 2) + c0_f_Lxy( (c0_v) * 2)) / 2 ;
var c0_y1 = (c0_f_Lxy( ((c0_v-1) * 2)+1) + c0_f_Lxy( ((c0_v) * 2)+1)) / 2 ;
var c0_x2 = (c0_f_Rxy( (c0_v-1) * 2) + c0_f_Rxy( (c0_v) * 2)) / 2 ;
var c0_y2 = (c0_f_Rxy( ((c0_v-1) * 2)+1) + c0_f_Rxy( ((c0_v) * 2)+1)) / 2 ;

var c0_h = c0_2_to.charCodeAt(0) - 96; if(c0_side<0) c0_h=9-c0_h;
var c0_x = c0_x1 + ((c0_x2 - c0_x1)/8*(c0_h-0.5));
var c0_y = c0_y1 + ((c0_y2 - c0_y1)/8*(c0_h-0.5));

if(( c0_v==1 || c0_v==8) && c0_1_figure=="p" ) c0_1_figure = c0_become;

c0_x -= c0_3D_size(c0_v)*c0_piece_delta_width( c0_1_figure, true )*0.2;
c0_y -= c0_3D_size(c0_v)*c0_piece_delta_height( c0_1_figure, true )*0.2;

c0_x *=c0_relative_size_procents/100;
c0_y *=c0_relative_size_procents/100;

c0_x += c0_at_left;
c0_y += c0_at_top;

var c0_ctck = (new Date()).getTime();
var c0_drep = 0;

if(c0_repeats==50) { c0_anim1Tim = c0_ctck; c0_anim1Lng = 0; c0_repeats--; }
else
 {
 if(c0_anim1All>0)
  {
   c0_drep = (c0_anim1All/c0_anim1Tck)/12;
   c0_repeats -= c0_drep;
  }
 else c0_repeats = 50 - ((c0_ctck-c0_anim1Tim)/12);
 }
c0_anim1Lng++;

if(c0_repeats<=c0_drep)
 {
 c0_anim1All += (c0_ctck - c0_anim1Tim);
 c0_anim1Tck += c0_anim1Lng;
 c0_anim1Lng = 0
 c0_repeats=0;
 }
else
 {
  var c0_dx = (c0_x - parseInt(c0_p.style.left)) / c0_repeats;
  var c0_dy = (c0_y - parseInt(c0_p.style.top)) / c0_repeats;
  if( c0_1_figure=="N") c0_dy = c0_dy - ((c0_repeats-10)*0.15);
  else if( c0_jump ) c0_dy = c0_dy - ((70-c0_repeats)*0.02)
  c0_x = parseFloat(c0_p.style.left) + c0_dx;
  c0_y = parseFloat(c0_p.style.top) + c0_dy;
 }

c0_p.style.left = c0_x+"px";
c0_p.style.top = c0_y+"px";

var c0_rel_piece_size = c0_piece_relative_size( c0_1_figure )/100 * c0_3D_size( c0_v ) * c0_relative_size_procents/100;

var c0_p2 = document.getElementById('c0_piece_' + c0_2_to + '_img');
clsDIV(c0_p2);

var c0_piece_image_src = c0_p2.src;

if( c0_piece_image_src.indexOf("pawn")>=0 && c0_1_figure!="p" )
{
 if( c0_1_figure=="N" )
	{
	var c0_replto= "knight";
	if((c0_side<0 && c0_v==1) || (c0_side>0 && c0_v==8)) c0_replto+="1";
	else if((c0_side>0 && c0_v==1) || (c0_side<0 && c0_v==8)) c0_replto+="2";
	else c0_replto+="2";
	c0_piece_image_src=c0_piece_image_src.replace("pawn",c0_replto);
	}
 if( c0_1_figure=="B" ) c0_piece_image_src=c0_piece_image_src.replace("pawn","bishop");
 if( c0_1_figure=="R" ) c0_piece_image_src=c0_piece_image_src.replace("pawn","rook");
 if( c0_1_figure=="Q" ) c0_piece_image_src=c0_piece_image_src.replace("pawn","queen");
}

c0_p.innerHTML= '<IMG id="c0_piece_' + c0_2_to + '_img" src="' + c0_piece_image_src + '"' +
	 'WIDTH="' + c0_piece_delta_width( c0_1_figure, false ) * c0_rel_piece_size + '"' +
	 'HEIGHT="' + c0_piece_delta_height( c0_1_figure, false ) *  c0_rel_piece_size + '"  onmousedown="c0_preventaction(event)">';
	
if( c0_repeats>0 && ( !c0_jump || c0_1_figure=="N")) c0_p.style.zIndex = c0_zOrder( c0_1_figure, c0_y );
else c0_p.style.zIndex = 100 - (c0_v*5);
	
if( c0_repeats>0 ) { setTimeout('c0_movepiece("' + c0_divID + '","' + c0_2_from + '","' + c0_2_to +'","' + c0_1_figure + '",' + c0_repeats +
				 ',' + (c0_jump?'true':'false') + ')',10);  c0_moving=true; }
else
 { 
 var c0_DIVnumber=c0_divID.substr(8);
 var c0_p9=c0_div_list.indexOf("-"+c0_DIVnumber+"}");
 c0_div_list = c0_div_list.substr(0,c0_p9-2) + c0_2_to + c0_div_list.substr(c0_p9);
 c0_moving=false;
// c0_moveslist += c0_2_from + c0_2_to + ( ( (c0_become.length==0) || (c0_become=="Q") || (c0_become=="0") ) ? "": "["+c0_become+"]" );
 if(c0_moved_callback.length>0) this[c0_moved_callback]();
 if(c0_html5_mess) c0_ms_Answer();
 }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// get Zorder while moving a piece...
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
function c0_zOrder( c0_1_figure, c0_cury )
{
var c0_h=5;
var c0_v=1; if(c0_side<0) c0_v=9-c0_v;

for( ; c0_v>=1 && c0_v<=8; c0_v+=c0_side)
{
var c0_y1 = (c0_f_Lxy( ((c0_v-1) * 2)+1) + c0_f_Lxy( ((c0_v) * 2)+1)) / 2 ;
var c0_y2 = (c0_f_Rxy( ((c0_v-1) * 2)+1) + c0_f_Rxy( ((c0_v) * 2)+1)) / 2 ;

var c0_y = c0_y1 + ((c0_y2 - c0_y1)/8*(c0_h-0.5));

c0_y -= c0_3D_size(c0_v)*c0_piece_delta_height( c0_1_figure, true )*0.2;

c0_y *=c0_relative_size_procents/100;
c0_y += c0_at_top;

if((c0_side>0 &&c0_y<c0_cury) || (c0_side<0 &&c0_y>c0_cury)) break;
}

return (100 - (c0_v*5));
}

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
// which square was pressed...
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
function c0_which_at(c0_curx,c0_cury)
{
var c0_which_ret = "";
var c0_y= ((c0_cury - c0_at_top) / c0_relative_size_procents) * 100;
var c0_x= ((c0_curx - c0_at_left) / c0_relative_size_procents) * 100;

for(var c0_v=1; c0_v<=8; c0_v++)
{
var c0_y11 = c0_f_Rxy( ((c0_v-1) * 2)+1)
var c0_y12 = c0_f_Rxy( ((c0_v) * 2)+1) ;
if( c0_y11>= c0_y && c0_y12<= c0_y) break;
}

if(c0_v<=8)
	{
	var c0_x11 = c0_f_Lxy( ((c0_v-1) * 2))
	var c0_x12 = c0_f_Rxy( ((c0_v-1) * 2)) ;

	for(var c0_h=1; c0_h<=8; c0_h++)
	{
	var c0_x21 = c0_x11 + ((c0_h-1)* ((c0_x12-c0_x11)/8));
	var c0_x22 = c0_x11 + ((c0_h)* ((c0_x12-c0_x11)/8));
	if( c0_x21<= c0_x && c0_x22>= c0_x) break;
	}
	if(c0_h<=8)
		{
		if(c0_side<0) { c0_v=9-c0_v; c0_h=9-c0_h; }
		c0_which_ret = String.fromCharCode(c0_h + 96) + c0_v.toString();
		}
	
}
return c0_which_ret;
}

//--------------------------------------------------------------------------------------------------------------------------
// mouse & keyboard events capturing...
//--------------------------------------------------------------------------------------------------------------------------
function doEvKeyCapture(c0_event)
{
if (!(c0_onkeypress==null)) eval(c0_onkeypress(c0_event));
}

function doEvMouseCapture(c0_event)
 {
var c0_posx = 0;
var c0_posy = 0;
if (!c0_event) var c0_event = window.event;
if (c0_event.pageX || c0_event.pageY) { c0_posx = c0_event.pageX; c0_posy = c0_event.pageY; }
else if (c0_event.clientX || c0_event.clientY) 
	{
	c0_posx = c0_event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	c0_posy = c0_event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
var c0_targ;
if (c0_event.target) c0_targ = c0_event.target; else if (c0_event.srcElement) c0_targ = c0_event.srcElement;
if (c0_targ.nodeType == 3) // defeat Safari bug
c0_targ = c0_targ.parentNode;

doEvMouseAt( c0_posx, c0_posy );

if(c0_2D_move) c0_2D_move=false;
else if(c0_DV_move) c0_DV_move=false;
else
{
if(c0_targ.id.substr(0,11)=="c0_zoomimg_")
	{
	if(!c0_moving)
		{
		if(c0_targ.id=="c0_zoomimg_plus") c0_zooming(+1);
		if(c0_targ.id=="c0_zoomimg_minus") c0_zooming(-1);
		if(c0_targ.id=="c0_zoomimg_topview") c0_ch_topview();
		}
	}
else if(c0_targ.id.substr(0,4)=="lauk")
	{
	var c0_pD = document.getElementById('c0_diagram');
	if(c0_pD!=null && c0_pD.innerHTML.length>0)
		{
		c0_2D_prey=c0_posy; c0_2D_prex=c0_posx; c0_2D_move=true;
		}
	}
else if(c0_DV_list.length>0 && dragDIVs(1,c0_targ.id))
	{
	c0_DV_k=dragDIVs(2,c0_targ.id);
	var c0_pD = document.getElementById(c0_DV_k);
	if(c0_pD!=null && c0_pD.innerHTML.length>0)
		{
		c0_DV_prey=c0_posy; c0_DV_prex=c0_posx; c0_DV_move=true;
		}
	}
else
if(!c0_moving && c0_waitmove)
 {
	if(c0_drag_div.length>0)
	 {
	 if(c0_arrow_at.length>0)
		{
		var c0_q = document.getElementById('c0_arrow');
		c0_q.style.visibility = "hidden"; c0_q.style.top = "0px"; c0_q.style.left = "0px"; c0_q.style.zIndex=0;

		var c0_DIVnumber=c0_drag_div.substr(8);
		var c0_p9=c0_div_list.indexOf("-"+c0_DIVnumber+"}");
		var c0_2_from=c0_div_list.substr(c0_p9-2,2);
		c0_moveto( c0_convH888(c0_2_from), c0_convH888(c0_arrow_at), true);
		c0_sidemoves=-c0_sidemoves;
		c0_arrow_at="";
		}
	 c0_drag_div=""
	 }

	{
	var c0_at_press=c0_which_at(c0_posx,c0_posy);
	if(c0_at_press.length>0 && c0_anim2Lng==0 )
		{
		var c0_a=c0_position.indexOf(c0_at_press);
		if(c0_a>=0)
			{
			var c0_1_color = c0_position.substr(c0_a-2,1);
			if( (c0_1_color=="w" && c0_sidemoves>0) || (c0_1_color=="b" && c0_sidemoves<0) )
				{
				var c0_b=c0_div_list.indexOf("{"+c0_at_press);
				if(c0_b>=0)
					{
					var c0_DIVnumber=c0_div_list.substr(c0_b+4,2);
					if( c0_DIVnumber.substr(1,1)=="}" ) c0_DIVnumber = c0_DIVnumber.substr(0,1);
					c0_drag_div = 'c0_divs_'+c0_DIVnumber;
					setTimeout('c0_gotA("c0_divs_' + c0_DIVnumber + '",13,0)',10);
					}
				}
			}
		}
	 }
 }
}
if (!(c0_onmousedown==null)) eval(c0_onmousedown(c0_event));
}

function c0_gotA( c0_divID, c0_repeats, c0_initY )		// piece got a ...
{
var c0_p = document.getElementById(c0_divID);

var c0_iY = ( (c0_repeats==13) ? parseFloat(c0_p.style.top) : c0_initY );

var c0_y = parseFloat(c0_p.style.top) - (c0_repeats-7);
c0_p.style.top = c0_y+"px";

var c0_ctck = (new Date()).getTime();
var c0_drep = 0;

if(c0_repeats==13) { c0_anim2Tim = c0_ctck; c0_anim2Lng = 0; c0_repeats--; }
else
 {
 if(c0_anim2All>0)
  {
   c0_drep = (c0_anim2All/c0_anim2Tck)/12;
   c0_repeats -= c0_drep;
  }
 else c0_repeats = 13 - ((c0_ctck-c0_anim2Tim)/12);
 }
c0_anim2Lng++;

if(c0_repeats<=c0_drep)
 {
 c0_anim2All += (c0_ctck - c0_anim2Tim);
 c0_anim2Tck += c0_anim2Lng;
 c0_anim2Lng = 0;
 c0_repeats=0;
 c0_p.style.top = c0_initY+"px";
 }
else
 {
 setTimeout('c0_gotA("' + c0_divID + '",' + c0_repeats + ',' + c0_iY + ')',10);
 }
} 


function doEvMouseMove(c0_event)		// mouse movement...
 {
var c0_posx = 0;
var c0_posy = 0;
if (!c0_event) var c0_event = window.event;
if (c0_event.pageX || c0_event.pageY) { c0_posx = c0_event.pageX; c0_posy = c0_event.pageY; }
else if (c0_event.clientX || c0_event.clientY) 
	{
	c0_posx = c0_event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	c0_posy = c0_event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
doEvMouseAt( c0_posx, c0_posy );

if (!(c0_onmousemove==null)) eval(c0_onmousemove(c0_event));
}


// to get touch working as move and click
function doEvMouseAt( c0_posx, c0_posy )
{

if(c0_2D_move)
	{
	var c0_pD = document.getElementById('c0_diagram');
	if(c0_pD!=null && c0_pD.innerHTML.length>0)
		{
		
c0_pD.style.top = parseInt(c0_pD.style.top) + (c0_posy-c0_2D_prey) + "px";
		
c0_pD.style.left = parseInt(c0_pD.style.left) + (c0_posx-c0_2D_prex) + "px";
		if( parseInt(c0_pD.style.left) + parseInt(c0_pD.style.width) > c0_screensizeW )
			{
			c0_pD.style.left = (c0_screensizeW - parseInt(c0_pD.style.width)) + "px";
			}
		if( parseInt(c0_pD.style.left)<0) c0_pD.style.left = 0+"px";

		if( parseInt(c0_pD.style.top) + parseInt(c0_pD.style.height) > c0_screensizeH )
			{
			c0_pD.style.top = (c0_screensizeH - parseInt(c0_pD.style.height)) + "px";
			}
		if( parseInt(c0_pD.style.top)<0) c0_pD.style.top = 0+"px";

		c0_2D_prey=c0_posy; c0_2D_prex=c0_posx;
		createCookie("Zoom3_", c0_posx.toString(),3650);
		createCookie("Zoom4_", c0_posy.toString(),3650);
		}
	}

if(c0_DV_move)
	{
	var c0_pD = document.getElementById(c0_DV_k);
	if(c0_pD!=null && c0_pD.innerHTML.length>0)
		{
		
c0_pD.style.top = parseInt(c0_pD.style.top) + (c0_posy-c0_DV_prey) + "px";
		
c0_pD.style.left = parseInt(c0_pD.style.left) + (c0_posx-c0_DV_prex) + "px";
		if( parseInt(c0_pD.style.left) + parseInt(c0_pD.style.width) > c0_screensizeW )
			{
			c0_pD.style.left = (c0_screensizeW - parseInt(c0_pD.style.width)) + "px";
			}
		if( parseInt(c0_pD.style.left)<0) c0_pD.style.left = 0+"px";

		if( parseInt(c0_pD.style.top) + parseInt(c0_pD.style.height) > c0_screensizeH )
			{
			c0_pD.style.top = (c0_screensizeH - parseInt(c0_pD.style.height)) + "px";
			}
		if( parseInt(c0_pD.style.top)<0) c0_pD.style.top = 0+"px";
		c0_DV_prey=c0_posy; c0_DV_prex=c0_posx;
		}
	}

if(c0_drag_div.length>0)
	{
	var c0_at_move=c0_which_at(c0_posx,c0_posy);
	if(c0_at_move.length>0)
		{
		var c0_DIVnumber=c0_drag_div.substr(8);
		var c0_p9=c0_div_list.indexOf("-"+c0_DIVnumber+"}");
		var c0_2_from=c0_div_list.substr(c0_p9-2,2);
		if( c0_can_be_moved( c0_convH888(c0_2_from), c0_convH888(c0_at_move), false) )
			{
			var c0_piece_image_src = (c0_art)?"arts/a_arrow.png":"img/oie_arrow_white.png";

			var c0_v = parseInt( c0_at_move.substr(1,1) ); if(c0_side<0) c0_v=9-c0_v;
			var c0_x1 = (c0_f_Lxy( (c0_v-1) * 2) + c0_f_Lxy( (c0_v) * 2)) / 2 ;
			var c0_y1 = (c0_f_Lxy( ((c0_v-1) * 2)+1) + c0_f_Lxy( ((c0_v) * 2)+1)) / 2 ;
			var c0_x2 = (c0_f_Rxy( (c0_v-1) * 2) + c0_f_Rxy( (c0_v) * 2)) / 2 ;
			var c0_y2 = (c0_f_Rxy( ((c0_v-1) * 2)+1) + c0_f_Rxy( ((c0_v) * 2)+1)) / 2 ;

			var c0_h = c0_at_move.charCodeAt(0) - 96; if(c0_side<0) c0_h=9-c0_h;
			var c0_x = c0_x1 + ((c0_x2 - c0_x1)/8*(c0_h-0.5));
			var c0_y = c0_y1 + ((c0_y2 - c0_y1)/8*(c0_h-0.5));

			c0_x -= c0_3D_size(c0_v)*c0_arrow_delta_width( true )*0.2;
			c0_y -= c0_3D_size(c0_v)*c0_arrow_delta_height( true )*0.2;

			c0_x *=c0_relative_size_procents/100;
			c0_y *=c0_relative_size_procents/100;

			c0_x += c0_at_left;
			c0_y += c0_at_top;

			var c0_rel_piece_size = 0.3 * c0_3D_size( c0_v ) * c0_relative_size_procents/100;

			var c0_q = document.getElementById('c0_arrow');

			var c0_warw = parseInt( c0_arrow_delta_width( false ) * c0_rel_piece_size );
			var c0_harw = parseInt( c0_arrow_delta_height( false ) *  c0_rel_piece_size );

			c0_q.style.top = c0_y+"px";
			c0_q.style.left = c0_x+"px";
			c0_q.style.zIndex = 100;
			if(c0_q.innerHTML.indexOf("c0_arrow_img")>0)
			 {
			 var c0_q2 = document.getElementById('c0_arrow_img');
			 c0_q2.style.width=c0_warw.toString()+"px";
			 c0_q2.style.height=c0_harw.toString()+"px";
			 }
			else
			 {
			 c0_q.innerHTML= '<IMG id="c0_arrow_img" src="http://chessforeva.appspot.com/' + c0_piece_image_src + '"' +
			 'WIDTH="' + c0_warw.toString() + '"' +
			 'HEIGHT="' + c0_harw.toString() + '" onclick="c0_void()" onmousedown="c0_preventaction(event)">';
			 }
			c0_q.style.visibility = "visible";
			c0_arrow_at=c0_at_move;
			}
		else
			{
			var c0_q = document.getElementById('c0_arrow');
			c0_q.style.visibility = "hidden"; c0_q.style.top = "0px"; c0_q.style.left = "0px"; c0_q.style.zIndex=0;
			c0_arrow_at="";
			}
		}

	}

}


function dragDIVs(c0_ch, c0_targ_id)
{
var c0_ret=true;
if(c0_ch==1) c0_ret= (( c0_DV_list.indexOf("["+c0_targ_id+"]")>=0 )? true : false );
else if(c0_ch==2)
	{
	var c0_s=c0_DV_list.substr( c0_DV_list.indexOf("["+c0_targ_id+"]") );
	c0_s=c0_s.substr( c0_s.indexOf("{")+1 );
	c0_s=c0_s.substr( 0, c0_s.indexOf("}") );
	c0_ret=c0_s;
	}
return c0_ret;
}

// just mouse action cancelled on images...
function c0_preventaction( c0_event )
{
if(c0_event.preventDefault) c0_event.preventDefault();
else c0_event.returnvalue = false;
return false;
}

//############################################################
// CHESS related part for chess play
//############################################################
//-------------------------------------------------
function c0_convE2(c0_vertikali,c0_horizontali)
{
return String.fromCharCode(96+c0_horizontali)+c0_vertikali.toString();
}

//-------------------------------------------------
function c0_convE777(c0_verthoriz)
{
return String.fromCharCode(96+parseInt(c0_verthoriz.substr(1,1)))+c0_verthoriz.substr(0,1);
}

//-------------------------------------------------
function c0_conv52(c0_vertikali,c0_horizontali)
{
return c0_vertikali.toString()+c0_horizontali.toString();
}

//-------------------------------------------------
function c0_convH888(c0_at8)
{
var c0_8horiz=c0_at8.charCodeAt(0) - 96;
var c0_8vert=parseInt(c0_at8.substr(1,1));
return c0_8vert.toString() + c0_8horiz.toString();
}

//-------------------------------------------------
function c0_move_to(c0_Zstr1,c0_Zstr2 )
{
c0_moveto( c0_convH888(c0_Zstr1), c0_convH888(c0_Zstr2), true );
}


//-------------------------------------------------
function c0_moveto(c0_from_at, c0_to_at, c0_draw)
{
 var c0_vert = parseInt(c0_from_at.substr(0,1));
 var c0_horiz= parseInt(c0_from_at.substr(1,1));
 var c0_vert2 = parseInt(c0_to_at.substr(0,1));
 var c0_horiz2= parseInt(c0_to_at.substr(1,1));

 var c0_p=c0_position.indexOf( c0_convE2(c0_vert,c0_horiz) );
 var c0_color=c0_position.substr(c0_p-2,1);
 var c0_figure=c0_position.substr(c0_p-1,1);

 c0_lastmovepawn = 0; 

 if(c0_draw)
	{
	var save_c0_position=c0_position;
	c0_just_move_piece( c0_convE2(c0_vert, c0_horiz), c0_convE2(c0_vert2, c0_horiz2) );
	c0_position=save_c0_position;

	var c0_pD = document.getElementById('c0_diagram');
	if(c0_pD!=null && c0_pD.innerHTML.length>0)
		{
		document.getElementById("lauk"+c0_conv52(c0_vert,c0_horiz)).src=
			"http://chessforeva.appspot.com/d_img/" +c0_backgr(c0_vert,c0_horiz) +'.jpg';
		}

	}

 var c0_p2=c0_position.indexOf( c0_convE2(c0_vert2,c0_horiz2) );
 if(c0_p2>=0)
  {
   c0_position = c0_position.substr(0,c0_p2-2) + c0_position.substr(c0_p2+3);
   
   if(!c0_wLRockmoved && c0_convE2(c0_vert2,c0_horiz2)=="a1") c0_wLRockmoved=true;
   if(!c0_wRRockmoved && c0_convE2(c0_vert2,c0_horiz2)=="h1") c0_wRRockmoved=true;
   if(!c0_bLRockmoved && c0_convE2(c0_vert2,c0_horiz2)=="a8") c0_bLRockmoved=true;
   if(!c0_bRRockmoved && c0_convE2(c0_vert2,c0_horiz2)=="h8") c0_bRRockmoved=true;
 
  }
 else
  {		
   if(c0_figure=="R")
    {
     if(c0_color=="w")
	{
	 if(c0_convE2(c0_vert,c0_horiz)=="a1") c0_wLRockmoved=true;
	 if(c0_convE2(c0_vert,c0_horiz)=="h1") c0_wRRockmoved=true;
	}
     else
	{
	 if(c0_convE2(c0_vert,c0_horiz)=="a8") c0_bLRockmoved=true;
	 if(c0_convE2(c0_vert,c0_horiz)=="h8") c0_bRRockmoved=true;
	}
    }
   
	
   if(c0_figure=="K")
    {
    if(!c0_wKingmoved && c0_color=="w")
	{
	if(c0_convE2(c0_vert,c0_horiz)=="e1" && c0_convE2(c0_vert2,c0_horiz2)=="g1")	// 0-0
		{
		if(c0_draw)
		{
		var save_c0_position=c0_position;
		c0_just_move_piece("h1","f1");
		c0_position=save_c0_position;

		var c0_pD = document.getElementById('c0_diagram');
		if(c0_pD!=null && c0_pD.innerHTML.length>0)
			{
			document.getElementById("lauk"+c0_conv52(1,6)).src="http://chessforeva.appspot.com/d_img/"+"wR"+c0_backgr(1,6) +'.jpg';
			document.getElementById("lauk"+c0_conv52(1,8)).src="http://chessforeva.appspot.com/d_img/"+c0_backgr(1,8) +'.jpg';
			}
		}
		c0_position = c0_position.replace( "h1", "f1" );		// Rf1
		c0_w00 = true;
		c0_become="0";
		}
	if(c0_convE2(c0_vert,c0_horiz)=="e1" && c0_convE2(c0_vert2,c0_horiz2)=="c1")	// 0-0-0
		{
		if(c0_draw)
		{
		var save_c0_position=c0_position;
		c0_just_move_piece("a1","d1");
		c0_position=save_c0_position;

		var c0_pD = document.getElementById('c0_diagram');
		if(c0_pD!=null && c0_pD.innerHTML.length>0)
			{
			document.getElementById("lauk"+c0_conv52(1,4)).src="http://chessforeva.appspot.com/d_img/"+"wR"+c0_backgr(1,4) +'.jpg';
			document.getElementById("lauk"+c0_conv52(1,1)).src="http://chessforeva.appspot.com/d_img/"+c0_backgr(1,1) +'.jpg';
			}
		}
		c0_position = c0_position.replace( "a1", "d1" );		// Rd1
		c0_w00 = true;
		c0_become="0";
		}
	c0_wKingmoved=true;
	}
    if(!c0_bKingmoved && c0_color=="b")
	{
	if(c0_convE2(c0_vert,c0_horiz)=="e8" && c0_convE2(c0_vert2,c0_horiz2)=="g8")	// 0-0
		{
		if(c0_draw)
		{
		var save_c0_position=c0_position;
		c0_just_move_piece("h8","f8");
		c0_position=save_c0_position;

		var c0_pD = document.getElementById('c0_diagram');
		if(c0_pD!=null && c0_pD.innerHTML.length>0)
			{
			document.getElementById("lauk"+c0_conv52(8,6)).src="http://chessforeva.appspot.com/d_img/"+"bR"+c0_backgr(8,6) +'.jpg';
			document.getElementById("lauk"+c0_conv52(8,8)).src="http://chessforeva.appspot.com/d_img/"+c0_backgr(8,8) +'.jpg';
			}
		}
		c0_position = c0_position.replace( "h8", "f8" );		// Rf8
		c0_b00 = true;
		c0_become="0";
		}
	if(c0_convE2(c0_vert,c0_horiz)=="e8" && c0_convE2(c0_vert2,c0_horiz2)=="c8")	// 0-0-0
		{
		if(c0_draw)
		{
		var save_c0_position=c0_position;
		c0_just_move_piece("a8","d8");
		c0_position=save_c0_position;

		var c0_pD = document.getElementById('c0_diagram');
		if(c0_pD!=null && c0_pD.innerHTML.length>0)
			{
			document.getElementById("lauk"+c0_conv52(8,4)).src="http://chessforeva.appspot.com/d_img/"+"bR"+c0_backgr(8,4) +'.jpg';
			document.getElementById("lauk"+c0_conv52(8,1)).src="http://chessforeva.appspot.com/d_img/"+c0_backgr(8,1) +'.jpg';
			}
		}
		c0_position = c0_position.replace( "a8", "d8" );		// Rd8
		c0_b00 = true;
		c0_become="0";
		}
	c0_bKingmoved=true;
	}
    }	
  }

 if(c0_figure=="p")		// pawn
	{
	 if(c0_vert2==8 || c0_vert2==1)
		{
		if(c0_become_from_engine.length>0)
		 {
		  c0_figure= c0_become_from_engine;
		 }
		else
		 {
		 if(c0_draw)
			{
			 if(confirm("Promote a QUEEN?"))
				{
				c0_figure = "Q";
				}
			 else if(window.confirm("Then a ROOK?"))
				{
				c0_figure = "R";
				}
			 else if(window.confirm("Maybe a BISHOP?"))
				{
				c0_figure = "B";
				}
			 else if(window.confirm("Really a KNIGHT????"))
				{
				c0_figure = "N";
				}
			 else
				{
				alert("I know, You need a new QUEEN.")
				c0_figure = "Q"
				}
			 }	
			else c0_figure="Q";
		  }
		if(c0_draw)
			{
			c0_become=c0_figure;

			var save_c0_position=c0_position;
			//c0_clear_at( c0_convE2(c0_vert,c0_horiz) );
			//c0_add_piece(  c0_color + c0_become + c0_convE2(c0_vert2,c0_horiz2) )
			c0_position=save_c0_position;
			}

		c0_position = c0_position.replace( "p"+c0_convE2(c0_vert,c0_horiz), c0_figure+c0_convE2(c0_vert,c0_horiz) );
		}
	 if(c0_p2<0 && c0_horiz!=c0_horiz2)
		{
		if(c0_draw)
			{
			var save_c0_position=c0_position;
			c0_clear_at( c0_convE2(c0_vert,c0_horiz2) );
			c0_position=save_c0_position;
			}
		var c0_p3=c0_position.indexOf( c0_convE2(c0_vert,c0_horiz2) );
		c0_position = c0_position.substr(0,c0_p3-2) + c0_position.substr(c0_p3+3);
		}
	 if((c0_vert==2 && c0_vert2==4) || (c0_vert==7 && c0_vert2==5)) c0_lastmovepawn = c0_horiz;
	}

 c0_position = c0_position.replace( c0_convE2(c0_vert,c0_horiz), c0_convE2(c0_vert2,c0_horiz2) );

 if(c0_draw)
  {
  var c0_pD = document.getElementById('c0_diagram');
  if(c0_pD!=null && c0_pD.innerHTML.length>0)
	{
	document.getElementById("lauk"+c0_conv52(c0_vert2,c0_horiz2)).src=
		"http://chessforeva.appspot.com/d_img/" +c0_color+c0_figure+c0_backgr(c0_vert2,c0_horiz2) +'.jpg';
	}

  c0_moveslist += c0_convE2(c0_vert,c0_horiz) + c0_convE2(c0_vert2,c0_horiz2) +
		 ( ( (c0_become.length==0) || (c0_become=="Q") || (c0_become=="0") ) ? "": "["+c0_become+"]" );

  }

}

//-------------------------------------------------
function c0_D_last_move_was()
{
var c0_ret='';
if( c0_moveslist.length>0 )
 {
 if (c0_moveslist.substr( c0_moveslist.length-1, 1 )=="]" ) c0_ret= c0_moveslist.substr( c0_moveslist.length-7, 7 );
 else c0_ret= c0_moveslist.substr( c0_moveslist.length-4, 4 );
 }
return c0_ret;
}

//-------------------------------------------------
function c0_take_back()
{
var c0_movespre='';
if( c0_moveslist.length>0 )
 {
 if (c0_moveslist.substr( c0_moveslist.length-1, 1 )=="]" ) c0_movespre= c0_moveslist.substr( 0, c0_moveslist.length-7 );
 else c0_movespre= c0_moveslist.substr( 0, c0_moveslist.length-4 );
 }

c0_draw_empty_board();
c0_set_start_position( c0_movespre );
}


//-------------------------------------------------
function c0_D_is_empty(c0_Zstr)
{
var c0_Zs2=c0_convH888(c0_Zstr);
return c0_is_empty( parseInt(c0_Zs2.substr(0,1)), parseInt(c0_Zs2.substr(1,1)));
}

//-------------------------------------------------
function c0_is_empty(c0_Zvert,c0_Zhoriz)
{
 var c0_good = true;
 if(c0_Zvert<1 || c0_Zvert>8 || c0_Zhoriz<1 || c0_Zhoriz>8) c0_good=false;
 else
  {
   var c0_pz2=c0_position.indexOf( c0_convE2(c0_Zvert,c0_Zhoriz) );
   if(c0_pz2>=0) c0_good=false;
  }
 return c0_good;
}


//-------------------------------------------------
function c0_D_what_at(c0_Zstr1)
{
 var c0_ret='';
 var c0_pz2=c0_position.indexOf( c0_Zstr1 );
 if(c0_pz2>=0) c0_ret=c0_position.substr(c0_pz2-2,2);
 return c0_ret;
}


//-------------------------------------------------
function c0_D_is_enemy(c0_Zstr,c0_mycolor)
{
var c0_Zs2=c0_convH888(c0_Zstr);
return c0_is_enemy( parseInt(c0_Zs2.substr(0,1)), parseInt(c0_Zs2.substr(1,1)), c0_mycolor);
}


//-------------------------------------------------
function c0_is_enemy(c0_Zvert,c0_Zhoriz,c0_mycolor)
{
 var c0_is_there =false;
 if(c0_Zvert>=1 && c0_Zvert<=8 && c0_Zhoriz>=1 && c0_Zhoriz<=8)
  {
   var c0_pz2=c0_position.indexOf( c0_convE2(c0_Zvert,c0_Zhoriz) );

   if(c0_pz2>=0 && c0_position.substr(c0_pz2-2,1)!=c0_mycolor) c0_is_there=true;
  }
 return c0_is_there;
}


//-------------------------------------------------
function c0_D_is_emptyline(c0_Zstr1,c0_Zstr2 )
{
var c0_Zs1=c0_convH888(c0_Zstr1);
var c0_Zs2=c0_convH888(c0_Zstr2);
return c0_is_emptyline( parseInt(c0_Zs1.substr(0,1)), parseInt(c0_Zs1.substr(1,1)) , parseInt(c0_Zs2.substr(0,1)), parseInt(c0_Zs2.substr(1,1)));
}

//-------------------------------------------------
function c0_is_emptyline(c0_Zvert,c0_Zhoriz,c0_Zvert2,c0_Zhoriz2)
{
 var c0_good = true;
 var c0_DZvert=c0_Zvert2-c0_Zvert; if(c0_DZvert<0) c0_DZvert=-1; else if(c0_DZvert>0) c0_DZvert=1;
 var c0_DZhoriz=c0_Zhoriz2-c0_Zhoriz; if(c0_DZhoriz<0) c0_DZhoriz=-1; else if(c0_DZhoriz>0) c0_DZhoriz=1;
 var c0_PZvert=c0_Zvert+c0_DZvert;
 var c0_PZhoriz=c0_Zhoriz+c0_DZhoriz;
 for(;c0_PZvert!=c0_Zvert2 || c0_PZhoriz!=c0_Zhoriz2;)
	{
	if( !c0_is_empty( c0_PZvert, c0_PZhoriz ) )
		{
		 c0_good=false;
		 break;
		}		
	c0_PZvert+=c0_DZvert;
	c0_PZhoriz+=c0_DZhoriz;
	}
 return c0_good;
}


//-------------------------------------------------
function c0_D_is_check_to_king(c0_ZKcolor)
{
return c0_is_check_to_king(c0_ZKcolor);
}

//-------------------------------------------------
function c0_is_check_to_king(c0_ZKcolor)
{
 var c0_is_check=false;
 var c0_Zp=c0_position.indexOf(c0_ZKcolor+"K");
 var c0_ZKhoriz=(c0_position.substr(c0_Zp+2,1)).charCodeAt(0) - 96;
 var c0_ZKvert=parseInt(c0_position.substr(c0_Zp+3,1));
 var c0_ZK_at = c0_ZKvert.toString() + c0_ZKhoriz.toString();

 for(var c0_i=0;c0_position.length>c0_i; c0_i+=5)
	{
	var c0_Zcolor=c0_position.substr(c0_i,1);
	var c0_Zfigure=c0_position.substr(c0_i+1,1);
	
	if(c0_Zcolor!=c0_ZKcolor)
		{
		 var c0_Zhoriz=(c0_position.substr(c0_i+2,1)).charCodeAt(0) - 96;
		 var c0_Zvert=parseInt(c0_position.substr(c0_i+3,1));
		 var c0_Z_at = c0_Zvert.toString() + c0_Zhoriz.toString();

		 if(c0_can_be_moved( c0_Z_at, c0_ZK_at, true))
			{
			 c0_is_check=true;
			 break;
			}
		}
	}
 return c0_is_check;
}


//-------------------------------------------------
function c0_is_attacked_king_before_move(c0_Qfrom_at, c0_Qto_at, c0_Qcolor)
{
  c0_is_attack=false;

  var c0_save_position=c0_position;
  var c0_save_sidemoves=c0_sidemoves;
  var c0_save_wKingmoved=c0_wKingmoved;
  var c0_save_bKingmoved=c0_bKingmoved;
  var c0_save_wLRockmoved=c0_wLRockmoved;
  var c0_save_wRRockmoved=c0_wRRockmoved;
  var c0_save_bLRockmoved=c0_bLRockmoved;
  var c0_save_bRRockmoved=c0_bRRockmoved;
  var c0_save_w00=c0_w00;
  var c0_save_b00=c0_b00;
  var c0_save_become=c0_become;

  var c0_save_lastmovepawn=c0_lastmovepawn;

  c0_moveto(c0_Qfrom_at, c0_Qto_at, false)
  c0_sidemoves=-c0_sidemoves;

  if( c0_is_check_to_king(c0_Qcolor) )
	{
	c0_is_attack=true;
	}

  c0_position=c0_save_position;
  c0_sidemoves=c0_save_sidemoves;
  c0_wKingmoved=c0_save_wKingmoved;
  c0_bKingmoved=c0_save_bKingmoved;
  c0_wLRockmoved=c0_save_wLRockmoved;
  c0_wRRockmoved=c0_save_wRRockmoved;
  c0_bLRockmoved=c0_save_bLRockmoved;
  c0_bRRockmoved=c0_save_bRRockmoved;
  c0_lastmovepawn=c0_save_lastmovepawn;
  c0_w00=c0_save_w00;
  c0_b00=c0_save_b00;
  c0_become=c0_save_become;

  return c0_is_attack;
}


//-------------------------------------------------
function c0_D_is_mate_to_king(c0_ZKcolor)
{
return c0_is_mate_to_king(c0_ZKcolor, false);
}

//-------------------------------------------------
function c0_is_mate_to_king(c0_ZKcolor, c0_just_mate)
{
 var c0_is_mate=false;

 if( c0_just_mate || c0_is_check_to_king(c0_ZKcolor) )
  {
   for(var c0_i=0, c0_is_mate=true;c0_is_mate && c0_position.length>c0_i; c0_i+=5)
	{
	var c0_Zcolor=c0_position.substr(c0_i,1);
	if(c0_Zcolor==c0_ZKcolor)
		{
		 var c0_Zhoriz=(c0_position.substr(c0_i+2,1)).charCodeAt(0) - 96;
		 var c0_Zvert=parseInt(c0_position.substr(c0_i+3,1));
		 var c0_Z_at = c0_Zvert.toString() + c0_Zhoriz.toString();
		 for(var c0_vi=1;c0_is_mate && c0_vi<=8;c0_vi++)
		  for(var c0_vj=1;c0_is_mate && c0_vj<=8;c0_vj++)
			{
			var c0_Z_to_at=c0_vi.toString()+c0_vj.toString();
			if(c0_can_be_moved( c0_Z_at, c0_Z_to_at, false))
				{
				 c0_is_mate=false;
				 break;
				}
			}
		}
	}

  } 
 return c0_is_mate;
}

//-------------------------------------------------
function c0_D_is_stalemate_to_king(c0_ZWcolor)
{ return c0_D_is_pate_to_king(c0_ZWcolor); }

//-------------------------------------------------
function c0_D_is_pate_to_king(c0_ZWcolor)
{ return c0_is_pate_to_king(c0_ZWcolor) && !c0_is_mate_to_king(c0_ZWcolor, false); }

//-------------------------------------------------
function c0_is_pate_to_king(c0_ZWcolor)
{
 var c0_is_pate=true;

 for(var c0_j=0;c0_is_pate && c0_position.length>c0_j; c0_j+=5)
	{
	var c0_Wcolor=c0_position.substr(c0_j,1);
	if(c0_Wcolor==c0_ZWcolor)
		{
		 var c0_Whoriz=(c0_position.substr(c0_j+2,1)).charCodeAt(0) - 96;
		 var c0_Wvert=parseInt(c0_position.substr(c0_j+3,1));
		 var c0_W_at = c0_Wvert.toString() + c0_Whoriz.toString();
		 for(var c0_wi=1;c0_is_pate && c0_wi<=8;c0_wi++)
		  for(var c0_wj=1;c0_is_pate && c0_wj<=8;c0_wj++)
			{
			var c0_W_to_at=c0_wi.toString()+c0_wj.toString();
			if(c0_can_be_moved( c0_W_at, c0_W_to_at, false))
				{
				 c0_is_pate=false;
				 break;
				}
			}
		}
	}

 return c0_is_pate;
}


//-------------------------------------------------
function c0_D_can_be_moved(c0_Zstr1, c0_Zstr2)
{
return c0_can_be_moved( c0_convH888(c0_Zstr1), c0_convH888(c0_Zstr2), false);
}


//-------------------------------------------------
function c0_can_be_moved(c0_from_at, c0_to_at, c0_just_move_or_eat)
{
 var c0_can = false;
 var c0_vert = parseInt(c0_from_at.substr(0,1));		
 var c0_horiz= parseInt(c0_from_at.substr(1,1));
 var c0_vert2 = parseInt(c0_to_at.substr(0,1));
 var c0_horiz2= parseInt(c0_to_at.substr(1,1));

 var c0_p=c0_position.indexOf( c0_convE2(c0_vert,c0_horiz) );
 var c0_color=c0_position.substr(c0_p-2,1);
 var c0_figure=c0_position.substr(c0_p-1,1);

 if(c0_is_empty(c0_vert2,c0_horiz2) || c0_is_enemy(c0_vert2,c0_horiz2,c0_color))
 {
 var c0_Dvert=c0_vert2-c0_vert; if(c0_Dvert<0) c0_Dvert=-c0_Dvert;
 var c0_Dhoriz=c0_horiz2-c0_horiz; if(c0_Dhoriz<0) c0_Dhoriz=-c0_Dhoriz;

 if(c0_figure=="p")
	{
	var c0_virziens;
	if( c0_color=="w" ) c0_virziens=1; else c0_virziens=-1;
	if(c0_horiz2==c0_horiz)
	 {
	  if( (c0_vert2==c0_vert+c0_virziens && c0_is_empty(c0_vert2,c0_horiz2)) ||
	   (c0_color=="w" && c0_vert2==4 && c0_vert==2 && c0_is_empty(3,c0_horiz2) && c0_is_empty(4,c0_horiz2)) ||
	   (c0_color=="b" && c0_vert2==5 && c0_vert==7 && c0_is_empty(5,c0_horiz2) && c0_is_empty(6,c0_horiz2)) )
		c0_can = true;
	 }
	else
	 {
	  if( (c0_horiz2==c0_horiz+1 || c0_horiz2==c0_horiz-1) && c0_vert2==c0_vert+c0_virziens)
	    if(c0_is_enemy(c0_vert2,c0_horiz2,c0_color) ||
		 (c0_lastmovepawn==c0_horiz2 && 
			((c0_color=="w" && c0_vert2==6) || (c0_color=="b" && c0_vert2==3)) ) ) c0_can=true;
	 }
	}
 if(c0_figure=="N")
	{
	if( c0_Dvert+c0_Dhoriz==3 && c0_Dvert!=0 && c0_Dhoriz!=0 ) c0_can=true;
	}
 if(c0_figure=="B")
	{
	if( (c0_Dvert>0 && c0_Dvert==c0_Dhoriz) && c0_is_emptyline(c0_vert,c0_horiz,c0_vert2,c0_horiz2)) c0_can=true;			
	}
 if(c0_figure=="R")
	{
	if( ((c0_Dvert==0||c0_Dhoriz==0) && c0_Dvert!=c0_Dhoriz) && c0_is_emptyline(c0_vert,c0_horiz,c0_vert2,c0_horiz2)) c0_can=true;	
	}
 if(c0_figure=="Q")
	{
	if( (c0_Dvert==0||c0_Dhoriz==0||c0_Dvert==c0_Dhoriz) && c0_is_emptyline(c0_vert,c0_horiz,c0_vert2,c0_horiz2)) c0_can=true;	
	}
 if(c0_figure=="K")
	{
	if((c0_Dvert==0 && c0_Dhoriz==1)||(c0_Dhoriz==0 && c0_Dvert==1)||(c0_Dhoriz==1 && c0_Dvert==1)) c0_can=true;
	else 
	 if (!c0_just_move_or_eat && !c0_is_check_to_king(c0_color) && (!c0_fischer))
		{
		if(c0_color=="w")
		 {
		  if(!c0_wKingmoved && c0_vert==1 && c0_horiz==5 && c0_vert2==1)
			{
			if( (c0_horiz2==7 && !c0_wRRockmoved &&
				c0_is_empty(1,6) && c0_is_empty(1,7) &&
				!c0_is_attacked_king_before_move("15", "16", c0_color) &&
				!c0_is_attacked_king_before_move("15", "17", c0_color)) ||
			    (c0_horiz2==3 && !c0_wLRockmoved &&
				c0_is_empty(1,2) && c0_is_empty(1,3) && c0_is_empty(1,4) &&
				!c0_is_attacked_king_before_move("15", "14", c0_color) &&
				!c0_is_attacked_king_before_move("15", "13", c0_color)) ) c0_can=true;
			}
		 }
		else
		 {
		  if(!c0_bKingmoved && c0_vert==8 && c0_horiz==5 && c0_vert2==8)
			{
			if( (c0_horiz2==7 && !c0_bRRockmoved &&
				c0_is_empty(8,6) && c0_is_empty(8,7) &&
				!c0_is_attacked_king_before_move("85", "86", c0_color) &&
				!c0_is_attacked_king_before_move("85", "87", c0_color)) ||
			    (c0_horiz2==3 && !c0_bLRockmoved &&
				c0_is_empty(8,2) && c0_is_empty(8,3) && c0_is_empty(8,4) &&
				!c0_is_attacked_king_before_move("85", "84", c0_color) &&
				!c0_is_attacked_king_before_move("85", "83", c0_color)) ) c0_can=true;
			}
		 }
		}
	}
 if(!c0_just_move_or_eat && c0_can)
 {
  c0_can = !c0_is_attacked_king_before_move(c0_from_at, c0_to_at, c0_color);
 }
 }
 return c0_can;
}

//---------------------------------------
//  Function to get next possible moves
//---------------------------------------
function c0_get_next_moves()
{
 var c0_Dposs="";
 for(var c0_Da=0;c0_position.length>c0_Da; c0_Da+=5)
	{
	var c0_Dcolor=c0_position.substr(c0_Da,1);
	if((c0_sidemoves>0 && c0_Dcolor=="w")||(c0_sidemoves<0 && c0_Dcolor=="b"))
		{
		var c0_Dfigure=c0_position.substr(c0_Da+1,1);
		var c0_Dhoriz=(c0_position.substr(c0_Da+2,1)).charCodeAt(0) - 96;
		var c0_Dvert=parseInt(c0_position.substr(c0_Da+3,1));
		var c0_Dfrom_move=c0_Dvert.toString()+c0_Dhoriz.toString();

		if(c0_Dfigure=="p")
			{
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,+c0_sidemoves,0,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,+(2*c0_sidemoves),0,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,+c0_sidemoves,+1,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,+c0_sidemoves,-1,1);
			}
		if(c0_Dfigure=="N")
			{
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,+2,+1,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,+2,-1,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,+1,+2,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,+1,-2,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,-1,+2,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,-1,-2,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,-2,+1,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,-2,-1,1);
			}
		if(c0_Dfigure=="B" || c0_Dfigure=="Q")
			{
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,+1,+1,8);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,+1,-1,8);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,-1,+1,8);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,-1,-1,8);
			}
		if(c0_Dfigure=="R" || c0_Dfigure=="Q")
			{
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,+1,0,8);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,-1,0,8);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,0,+1,8);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,0,-1,8);
			}
		if(c0_Dfigure=="K")
			{
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,+1,+1,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,+1,0,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,+1,-1,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,0,+1,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,0,-1,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,-1,+1,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,-1,0,1);
			 c0_Dposs+=c0_DCN(c0_Dfrom_move,-1,-1,1);	
			 if((c0_Dcolor=="w" && c0_Dfrom_move=="15") || (c0_Dcolor=="b" && c0_Dfrom_move=="85"))
				{
				 c0_Dposs+=c0_DCN(c0_Dfrom_move,0,-2,1);	
				 c0_Dposs+=c0_DCN(c0_Dfrom_move,0,+2,1);	
				}
			}
		}
	}
 return c0_Dposs;
}


//---------------------------------------
//
function c0_DCN(c0_D7from_at, c0_Dvert_TX, c0_Dhoriz_TX, c0_Dcntx)
{
 var c0_D7poss="";
 var c0_c7K='';

 var saveD1sidemoves=c0_sidemoves;
 var saveD1wKingmoved=c0_wKingmoved;
 var saveD1bKingmoved=c0_bKingmoved;
 var saveD1wLRockmoved=c0_wLRockmoved;
 var saveD1wRRockmoved=c0_wRRockmoved;
 var saveD1bLRockmoved=c0_bLRockmoved;
 var saveD1bRRockmoved=c0_bRRockmoved;
 var saveD1w00=c0_w00;
 var saveD1b00=c0_b00;
 var saveD1lastmovepawn=c0_lastmovepawn;
 var saveD1position=c0_position;		
 var saveD1sidemoves=c0_sidemoves;		
 var saveD1become=c0_become;

 var c0_D7vert=parseInt(c0_D7from_at.substr(0,1));
 var c0_D7horiz=parseInt(c0_D7from_at.substr(1,1));

 for(var c0_Dj=0; c0_Dj<c0_Dcntx; c0_Dj++)
  {
   c0_D7vert+=c0_Dvert_TX;
   c0_D7horiz+=c0_Dhoriz_TX;
   if(c0_D7vert>=1 && c0_D7vert<=8 && c0_D7horiz>=1 && c0_D7horiz<=8)
    {
	var c0_D7to_at=c0_D7vert.toString()+c0_D7horiz.toString();

	if( c0_can_be_moved( c0_D7from_at, c0_D7to_at, false ) )
		{

		c0_foundmove = c0_convE777( c0_D7from_at ) + c0_convE777( c0_D7to_at );

		if(!(c0_f_evals1==null)) c0_c7K=eval(c0_f_evals1);
		else c0_c7K=true;
		if( c0_c7K )
			{
			if(!(c0_f_evals2==null))
				{
				c0_moveto( c0_D7from_at, c0_D7to_at, false)
				c0_sidemoves=-c0_sidemoves;
				c0_c7K = eval(c0_f_evals2);
				}
			}
		if( c0_c7K )
			{
			c0_D7poss+=c0_foundmove + ",";
			}
		}

	c0_sidemoves=saveD1sidemoves;
	c0_wKingmoved=saveD1wKingmoved;
	c0_bKingmoved=saveD1bKingmoved;
	c0_wLRockmoved=saveD1wLRockmoved;
	c0_wRRockmoved=saveD1wRRockmoved;
	c0_bLRockmoved=saveD1bLRockmoved;
	c0_bRRockmoved=saveD1bRRockmoved;
	c0_w00=saveD1w00;
	c0_b00=saveD1b00;

	c0_lastmovepawn=saveD1lastmovepawn;
	c0_position=saveD1position;		
	c0_sidemoves=saveD1sidemoves;		
	c0_become=saveD1become;
   }
  }
 return c0_D7poss;
}


// Now goes HTML5 connectivity feature for javascript -
// imitates chess player from other iframe (internal)

var c0_ms_urls = document.location.href;
var c0_html5_mess= ((c0_ms_urls.substr(0,30)=="http://chessforeva.appspot.com") ||
		(c0_ms_urls.substr(0,17)=="http://www.ltn.lv") ||
		(c0_ms_urls.substr(0,23)=="http://ezis.appspot.com"));

var c0_ms_Name = "";
var c0_ms_BackDomain="*";

var c0_ms_timer = setTimeout('c0_ms_timertick()',5000);

// Each sec. timer
function c0_ms_timertick()
{
if(c0_html5_mess)
 {
 c0_ms_Answer();
 c0_ms_timer = setTimeout('c0_ms_timertick()',3000);
 }
}

if (navigator.appName.indexOf ("Microsoft") !=-1)
 { window.attachEvent("onmessage", function(e) { c0_ms_Calls(e.origin,e.data) }); }
else
 { window.addEventListener("message", function(e) { c0_ms_Calls(e.origin,e.data) }, false); }

// Receives requests from other iframes
function c0_ms_Calls(domain,strparm)
{

if((domain!=null) && (domain.substr(0,4)=="http")) c0_ms_BackDomain = domain;

if(strparm.substr(0,9)=="c0_chess:")
 {
 var c0_ms_p = strparm.substr(9);
  // if this request is for us (or all of us)...
 if( (c0_ms_p.substr(0,4)=="ALL:") || (c0_ms_Name.length==0) || (c0_ms_p.substr(0,c0_ms_Name.length)==c0_ms_Name) )
  {
   c0_ms_p = c0_ms_p.substr(c0_ms_p.indexOf(":")+1);

   if(c0_ms_p.substr(0,5)=="name=") c0_ms_Name = c0_ms_p.substr(5);
   if(c0_ms_p.substr(0,9)=="nocastles")
     {
     c0_w00 = true;
     c0_b00 = true;
     }
   if(c0_ms_p.substr(0,5)=="move=")
     {
      if(c0_waitmove && c0_can_be_moved( c0_convH888(c0_ms_p.substr(5,2)), c0_convH888(c0_ms_p.substr(7,2)), false) )
       {
        c0_become_from_engine=( c0_ms_p.length>9 ? c0_ms_p.charAt(9).toUpperCase() : "Q" );
        if( ("QRBN").indexOf(c0_become_from_engine)<0 ) c0_become_from_engine="Q";
        c0_become = c0_become_from_engine;

        c0_moveto( c0_convH888(c0_ms_p.substr(5,2)), c0_convH888(c0_ms_p.substr(7,2)), true);
	c0_sidemoves=-c0_sidemoves;
       }
     }
   if(c0_ms_p.substr(0,9)=="setmoves=")
     {
     c0_set_start_position(c0_ms_p.substr(9));
     if(c0_moved_callback.length>0) this[c0_moved_callback]();
     }

  }
 }
}

// Sends result back other iframe
function c0_ms_Answer()
{
if( (c0_ms_Name.length>0) && (c0_ms_BackDomain.length>0) )
 {
  var c0_ms_a = "<URL>"+c0_ms_urls+"</URL><DOMAIN>"+c0_ms_BackDomain+"</DOMAIN><NAME>"+c0_ms_Name+"</NAME>";
  c0_ms_a += "<POSITION>"+c0_position+"</POSITION><MOVESLIST>"+c0_moveslist+"</MOVESLIST>";
  c0_ms_a += "<SIDE>" + (c0_side>0 ? "WHITE" : "BLACK") + "</SIDE>";
  c0_ms_a += "<SIDEMOVES>" + (c0_sidemoves>0 ? "WHITE" : "BLACK") + "</SIDEMOVES>";

  if (navigator.appName.indexOf ("Microsoft") !=-1) c0_ms_BackDomain="*";
  window.parent.postMessage( "from_c0_chess:" + c0_ms_a, c0_ms_BackDomain );
 }
}


// Added a cookie-thing

function GetCookieUrl()
{
var c0_u9 = document.location.href;
var c0_a9 = c0_u9.indexOf("?");
c0_u9 = (c0_a9<0 ? c0_u9 : c0_u9.substr(0,c0_a9) ).toLowerCase();
c0_u9 = c0_u9.replace("https://",""); c0_u9 = c0_u9.replace("http://","");
return c0_u9;
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+GetCookieUrl() + "="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name+GetCookieUrl() + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return "";
}

function eraseCookie(name) {
	createCookie(name+GetCookieUrl(),"",-1);
}

// clear DIV container
function clsDIV(n)
{
if(n!=null)
 {
 n.innerHtml = '';
 while (n.hasChildNodes()) n.removeChild(n.firstChild);
 }
}

function clsDIVn(name) { var node = document.getElementById(name); clsDIV(node); }

