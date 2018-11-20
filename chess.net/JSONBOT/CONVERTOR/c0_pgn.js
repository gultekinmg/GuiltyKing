//	It takes all the screen and there is BACK option for viewer.
//	User forms and convinient interfaces are under construction (maybe long)...
var PGN_text='';					// The game data will be here....
function c0_ReplaceAll(Source,stringToFind,stringToReplace){
  var temp = Source;
    var index = temp.indexOf(stringToFind);
        while(index != -1){
            temp = temp.replace(stringToFind,stringToReplace);
            index = temp.indexOf(stringToFind);
        }
        return temp;
}//--- as always javascript has some differences...
function c0_getqs( Q_qs, Q_parm ){
	var Q_ret="";
	var Q_at = Q_qs.indexOf(Q_parm);
	if(Q_at>=0) Q_ret=Q_qs.substr(Q_at + Q_parm.length);
	Q_at = Q_ret.indexOf("&");
	if(Q_at>=0) Q_ret=Q_ret.substr(0,Q_at);
	return Q_ret;
}//--- query string reader function...
var c0_screensizeH=document.body.clientHeight;var c0_screensizeW=document.body.clientWidth;
var c0_PG_1='';var c0_PG_2='';var c0_PG_3='';var c0_PG_4='';
var c0_PGN_header=[];
var c0_PG_viewer=false;var c0_headsize=0;var c0_pgnsize=0;
var c0_PGN_short=false;var c0_PG_sh='';
var c0_poss_anot=[];var c0_poss_an_cnt=0;
var c0_variants=[];var c0_var_cnt=0;var c0_var_info=[];
var c0_errflag=false;
var c0_PG_point='';var c0_annot_point='';var c0_PG_playing=false;var c0_PG_onemove=false;var c0_PG_willbemove=false;
var c0_start_FEN='';
var c0_NAGs=  '[0] null annotation [1] good move ("!") [2] poor move ("?") [3] very good move ("!!") [4] very poor move ("??") ' +
'[5] speculative move ("!?") [6] questionable move ("?!") [7] forced move (all others lose quickly) [8] singular move (no reasonable alternatives) ' +
'[9] worst move [10]  drawish position [11] equal chances, quiet position (=) [12] equal chances, active position (ECO ->/<-) ' +
'[13] unclear position (emerging &) [14] White has a slight advantage (+=) [15] Black has a slight advantage (=+) ' +
'[16] White has a moderate advantage (+/-) [17] Black has a moderate advantage (-/+) [18]  White has a decisive advantage (+-) ' +
'[19] Black has a decisive advantage (-+) [20] White has a crushing advantage (Black should resign) (+--) ' +
'[21] Black has a crushing advantage (White should resign) (--+) [22] White is in zugzwang (zz) [23] Black is in zugzwang (zz) ' +
'[24] White has a slight space advantage [25]  Black has a slight space advantage [26]  White has a moderate space advantage (O) ' +
'[27] Black has a moderate space advantage (O) [28] White has a decisive space advantage [29] Black has a decisive space advantage ' +
'[30] White has a slight time (development) advantage [31] Black has a slight time (development) advantage ' +
'[32] White has a moderate time (development) advantage (@) [33] Black has a moderate time (development) advantage (@) ' +
'[34] White has a decisive time (development) advantage [35] Black has a decisive time (development) advantage ' +
'[36] White has the initiative (^) [37]  Black has the initiative (^) [38] White has a lasting initiative ' +
'[39] Black has a lasting initiative [40] White has the attack (->) ';

c0_NAGs+='[41] Black has the attack (->) [42] White has insufficient compensation for material deficit [43] Black has insufficient compensation for material deficit ' +
'[44] White has sufficient compensation for material deficit (=/&) [45] Black has sufficient compensation for material deficit (=/&) ' +
'[46] White has more than adequate compensation for material deficit [47] Black has more than adequate compensation for material deficit ' +
'[48] White has a slight center control advantage [49] Black has a slight center control advantage [50] White has a moderate center control advantage (#) ' +
'[51] Black has a moderate center control advantage (#) [52] White has a decisive center control advantage ' +
'[53] Black has a decisive center control advantage [54] White has a slight kingside control advantage [55] Black has a slight kingside control advantage ' +
'[56] White has a moderate kingside control advantage (>>) [57] Black has a moderate kingside control advantage (>>) ' +
'[58] White has a decisive kingside control advantage [59] Black has a decisive kingside control advantage [60] White has a slight queenside control advantage ' +
'[61] Black has a slight queenside control advantage [62] White has a moderate queenside control advantage (<<) ' +
'[63] Black has a moderate queenside control advantage (<<)  [64] White has a decisive queenside control advantage ' +
'[65] Black has a decisive queenside control advantage [66] White has a vulnerable first rank [67] Black has a vulnerable first rank ' +
'[68] White has a well protected first rank [69] Black has a well protected first rank [70] White has a poorly protected king ' +
'[71] Black has a poorly protected king [72] White has a well protected king [73] Black has a well protected king [74] White has a poorly placed king '  +
'[75] Black has a poorly placed king [76] White has a well placed king [77] Black has a well placed king [78] White has a very weak pawn structure ' +
'[79] Black has a very weak pawn structure [80] White has a moderately weak pawn structure (DR:x a5) ' +
'[81] Black has a moderately weak pawn structure (DR:x a5) [82] White has a moderately strong pawn structure ' +
'[83] Black has a moderately strong pawn structure [84] White has a very strong pawn structure [85] Black has a very strong pawn structure ';

c0_NAGs+= '[86] White has poor knight placement [87] Black has poor knight placement [88] White has good knight placement ' +
'[89] Black has good knight placement [90] White has poor bishop placement [91] Black has poor bishop placement ' +
'[92] White has good bishop placement (diagonal) [93] Black has good bishop placement [94] White has poor rook placement ' +
'[95] Black has poor rook placement [96] White has good rook placement (rank <=> file ||) [97] Black has good rook placement ' +
'[98] White has poor queen placement [99] Black has poor queen placement [100] White has good queen placement ' +
'[101] Black has good queen placement [102] White has poor piece coordination [103] Black has poor piece coordination ' +
'[104] White has good piece coordination [105] Black has good piece coordination [106] White has played the opening very poorly ' +
'[107] Black has played the opening very poorly [108] White has played the opening poorly [109] Black has played the opening poorly ' +
'[110] White has played the opening well [111] Black has played the opening well [112] White has played the opening very well ' +
'[113] Black has played the opening very well [114] White has played the middlegame very poorly [115] Black has played the middlegame very poorly ' +
'[116] White has played the middlegame poorly [117] Black has played the middlegame poorly [118] White has played the middlegame well ' +
'[119] Black has played the middlegame well [120] White has played the middlegame very well [121] Black has played the middlegame very well ' +
'[122] White has played the ending very poorly [123] Black has played the ending very poorly [124] White has played the ending poorly ' +
'[125] Black has played the ending poorly [126] White has played the ending well [127] Black has played the ending well ' +
'[128] White has played the ending very well [129] Black has played the ending very well [130] White has slight counterplay '  +
'[131] Black has slight counterplay [132] White has moderate counterplay (->/<-) [133] Black has moderate counterplay ' +
'[134] White has decisive counterplay [135] Black has decisive counterplay [136] White has moderate time control pressure ' +
'[137] Black has moderate time control pressure [138] White has severe time control pressure [139] Black has severe time control pressure ';

c0_NAGs+='[140] With the idea [141] Aimed against [142] Better move [143] Worse move [144] Equivalent move [145] Editors Remark ("RR") ' +
'[146] Novelty ("N") [147] Weak point [148] Endgame [149] Line [150] Diagonal [151] White has a pair of Bishops [152] Black has a pair of Bishops ' +
'[153] Bishops of opposite color [154] Bishops of same color [190] Etc. [191] Doubled pawns [192] Isolated pawn [193] Connected pawns ' +
'[194] Hanging pawns [195] Backwards pawn [201] Diagram ("D", "#") [xyz]';

var c0_dh=0;
var c0_contr=0;

//------------------------------ just to start PGN viewer
function c0_PG_start(){ setTimeout('c0_PG_waitloop()',200)
c0_initall();
c0_at_left=30;
if(c0_screensizeW<=1024) c0_at_left+=10;
else if(c0_screensizeW>1024 && c0_screensizeW<=1152)  c0_at_left+=30;
else if(c0_screensizeW>1152)  c0_at_left+=120;
if(c0_topview) c0_at_top=30;
c0_relative_size_procents=0;
c0_side=1;
c0_DV_list="[div-disp1]{div-disp1};[div-head]{div-head};[TBH]{div-head};[div-pgn]{div-pgn};[TBP]{div-pgn};[Contr]{div-contr}";
c0_draw_empty_board();
if(c0_screensizeH>400 && c0_screensizeW>400 &&
	(typeof(PGN_2D)=="undefined" || typeof(PGN_2D)=="null" || PGN_2D!="no") ) c0_draw_2D_board();
c0_set_start_position("");
c0_become_from_engine="Q";
c0_moved_callback='';
c0_waitmove=false;
c0_PG_viewer=true;
}
//------------------------------ waiting for data
function c0_PG_waitloop(){
	var DIV0=document.getElementById('div-back');
	var DIV1=document.getElementById('div-head');
	var DIV2=document.getElementById('div-pgn');
	var DIV3=document.getElementById('div-contr');
	if( PGN_text.length==0 || DIV0==null || DIV1==null || DIV2==null || DIV3==null ) setTimeout('c0_PG_waitloop()',1000)
	else  setTimeout('c0_PG_positpgn()',1000);
}

//------------------------------ reposition on screen
function c0_PG_positpgn(){
var c0_pD = document.getElementById('c0_diagram');
//c0_pD.style.top = 0+"px"; c0_pD.style.left = 0+"px";

var DIV0=document.getElementById('div-back');
DIV0.style.top = parseInt( c0_pD.style.top ) +"px";
DIV0.style.left = parseInt(c0_pD.style.width ) +"px";

var DIV1=document.getElementById('div-head');
DIV1.style.zIndex = 150;
DIV1.innerHTML=c0_PG_gettable(1);
if(c0_dh>0 || c0_screensizeW<c0_screensizeH) {
	DIV1.style.top = 0+"px";
	DIV1.style.left = (c0_screensizeW-186)+"px";
}
else{
	DIV1.style.top = parseInt( c0_pD.style.height ) +"px";
	DIV1.style.left = parseInt(c0_pD.style.left ) +"px";
}
var DIV2=document.getElementById('div-pgn');
DIV2.style.top = 0+"px";
DIV2.style.left = (c0_screensizeW-162)+"px";
DIV2.style.zIndex = 151;
DIV2.innerHTML=c0_PG_gettable(2);
if(c0_dh>0 || c0_screensizeW<c0_screensizeH){
	DIV2.style.top = c0_at_top + (332*(c0_relative_size_procents/100)*(c0_topview?1.8:1)) +50 +"px";
	DIV2.style.left = 4 +"px";
}
else{
	DIV2.style.top = 0+"px";
	DIV2.style.left = (c0_screensizeW-186)+"px";
}
c0_draw_contr();
c0_PG_playmode(1);
}


function c0_draw_contr(){
	if(c0_topview && c0_contr==0) c0_contr=1;
	else if(!c0_topview && c0_contr==1) c0_contr=0;
	var DIV3=document.getElementById('div-contr');
	DIV3.style.zIndex = 150;
	var DIV17butt="";
	var DIV17=document.getElementById('P17');
	if(DIV17!=null) DIV17butt=DIV17.innerHTML;
	var htms='<TABLE id="Contr" style="cursor:move"><TR>';
	htms+='<TD id="Contr"><IMG id="a_rw3" src="./img/a_rw3.gif" title="to the beginning" style="cursor:pointer" onclick=c0_PG_speed(-1,5000); onmousedown="c0_preventaction(event)"></TD>';
	htms+='<TD id="Contr"><IMG id="a_rw2" src="./img/a_rw2.gif" title="back 5 moves" style="cursor:pointer" onclick=c0_PG_speed(-1,10); onmousedown="c0_preventaction(event)"></TD>';
	if(c0_contr!=0) htms+='</TR><TR>';
	htms+='<TD id="Contr"><IMG id="a_rw1" src="./img/a_rw1.gif" title="back" style="cursor:pointer" onclick=c0_PG_speed(-1,1); onmousedown="c0_preventaction(event)"></TD>';
	htms+='<TD id="Contr"><DIV id="P17"></DIV></TD>';
	if(c0_contr!=0) htms+='</TR><TR>';
	htms+='<TD id="Contr"><IMG id="a_fw1" src="./img/a_fw1.gif" title="forward" style="cursor:pointer" onclick=c0_PG_speed(+1,1); onmousedown="c0_preventaction(event)"></TD>';
	htms+='<TD id="Contr"><IMG id="a_fw2" src="./img/a_fw2.gif" title="forward 5 moves" style="cursor:pointer" onclick=c0_PG_speed(+1,10); onmousedown="c0_preventaction(event)"></TD>';
	if(c0_contr!=0) htms+='</TR><TR>';
	htms+='<TD id="Contr"><IMG id="a_fw3" src="./img/a_fw3.gif" title="to the end" style="cursor:pointer" onclick=c0_PG_speed(+1,5000); onmousedown="c0_preventaction(event)"></TD>';
	htms+='<TD id="Contr"><IMG id="a_swap" src="./img/a_swap.gif" title="swap sides" style="cursor:pointer" onclick="c0_PG_swap()"; onmousedown="c0_preventaction(event)"></TD>';
	htms+='</TR></TABLE>';
	DIV3.innerHTML=htms;

	if(c0_contr==0){
		if( c0_screensizeH<400 ) DIV3.style.top = (c0_screensizeH-60)+"px";
		else DIV3.style.top = c0_at_top + (332*(c0_relative_size_procents/100)) +20 +"px";
		DIV3.style.left = (c0_screensizeW-520)+"px";
		}
	else{
		DIV3.style.top = c0_at_top + (332*(c0_relative_size_procents/100)) +80 +"px";
		DIV3.style.left = (c0_screensizeW-140)+"px";
		if(DIV17butt.length>0) setTimeout("setDIV17('" + DIV17butt + "')",500);
		}

}

function setDIV17(DIV17butt){
	var DIV17=document.getElementById('P17');
	if(DIV17!=null) DIV17.innerHTML=DIV17butt;
}

function c0_PG_playmode( ch ){	// preloading button...
	pic1= new Image(1,1);
	pic1.src="./img/a_play.gif"; 
	pic2= new Image(1,1);
	pic2.src="./img/a_pause.gif"; 
	var DIV0=document.getElementById('P17');
	if(ch==0){
		DIV0.innerHTML= '<IMG id="a_play" src="./img/a_play.gif" title="play mode" style="cursor:pointer" onclick="c0_PG_playmode(1);" onmousedown="c0_preventaction(event)">';
		c0_PG_playing=false;
	}
	if(ch==1 && !c0_moving && !c0_PG_willbemove){
		DIV0.innerHTML= '<IMG id="a_pause" src="./img/a_pause.gif" title="pause" style="cursor:pointer" onclick="c0_PG_playmode(0);" onmousedown="c0_preventaction(event)">';
		c0_PG_playing=true;
		c0_PG_justplaymove();
	}
}

//------------------------------ make a move

function c0_PG_justplaymove(){
c0_PG_willbemove=false;

if(!c0_PG_playing && !c0_PG_onemove) return;

var col="b";
var gaj=0;
var i=0;

if(c0_annot_point.length>0) { c0_PG_point=c0_annot_point; c0_annot_point=''; c0_PG_pointto( c0_PG_point ); setTimeout('c0_PG_playmode(1);',1000); }

for(;c0_PG_point.length>0;)
{
i+=4;
if(c0_PG_1.substr(i,1)=="[")  i+=3;
if(col=="w") col="b";
else { col="w"; gaj++; }
if( c0_PG_point==parseInt(gaj)+col ) break;
}

if(i>=c0_PG_1.length) c0_PG_playmode(0);
else
 {
 var prom=false;
 var playstate=c0_PG_playing;
 c0_become="Q";
 if(c0_PG_1.substr(i+4,1)=="[") { c0_become=c0_PG_1.substr(i+5,1); if(c0_become!="0") prom=true; }
 c0_become_from_engine=c0_become;

 if(col=="w") col="b";
 else { col="w"; gaj++; }
 c0_PG_point=parseInt(gaj)+col;

 if(prom) { c0_PG_pointto( c0_PG_point ); if(playstate) setTimeout('c0_PG_playmode(1);',1000); }
 else 
 {
 if(c0_fischer) c0_fischer_cstl_move(c0_PG_1.substr(i,4),true);
 else c0_moveto(c0_convH888(c0_PG_1.substr(i,2)),c0_convH888(c0_PG_1.substr(i+2,2)), true);
 c0_sidemoves=-c0_sidemoves;
 c0_moved_callback='c0_PG_justplaymoved';
 }
 c0_become_from_engine="";
 c0_become="";

 }
}

function c0_PG_justplaymoved()
{
if((c0_topview && c0_contr==0) || (!c0_topview && c0_contr==1)) c0_draw_contr();

c0_PG_pointcolor( c0_PG_point );
c0_moved_callback='';
if(c0_PG_playing && !c0_PG_onemove) { c0_PG_willbemove=true; setTimeout('c0_PG_justplaymove()',1000 * 1); }
if(c0_PG_onemove) c0_PG_onemove=false;
}

//------------------------------ Analyse PGN as text
function c0_PG_gettable( ch ) {
var rc='';

var Event_Name='';
var Event_Site='';
var Event_Date='';
var Round='';
var White='';
var Black='';
var Result='';
var ECO='';
var WhiteElo='';
var BlackElo='';
var Game_Date='';
var Source_Date='';

var AddInfo='';

var htms='';

c0_PGN_header=[];

PGN_text= c0_ReplaceAll( PGN_text,'  ', ' ' );
PGN_text= c0_ReplaceAll( PGN_text, '–', '-');

for(var str2=PGN_text;;) {
 var at2=str2.indexOf('[');
 if(at2<0) break; 
 var at2_1=str2.indexOf('(');
 var at2_2=str2.indexOf('{');
 if((at2_1>=0 && at2_1<at2) || (at2_2>=0 && at2_2<at2)) break; 
 var buf2= str2.substr(at2+1);
 buf2= buf2.substr(0, buf2.indexOf(']') );
 str2= str2.substr(at2+buf2.length+2);

 c0_PGN_header.push(buf2);
 buf2= c0_ReplUrl(buf2); 
 buf2= c0_ReplaceAll( buf2,'"','' );
 buf2= c0_ReplaceAll( buf2, "'" ,'' );

 var buf3=buf2.toUpperCase();

 var at9 = buf3.indexOf('SETUP ');
 if(at9>=0 && at9<3) { if( ch==2 ) { c0_fischer=(buf2.substr(at9+6,1)=="1") } }

 var at3 = buf3.indexOf('FEN ');
 if(at3>=0 && at3<3)
 { if( ch==2 && c0_start_FEN.length==0 ) { c0_start_FEN=buf2.substr(at3+4); c0_set_start_position(""); } }
 else {
 var at3 = buf3.indexOf('EVENT ');
 if(at3>=0) Event_Name=buf2.substr(at3+6);
 else {
 at3 = buf3.indexOf('SITE ');
 if(at3>=0) Event_Site=buf2.substr(at3+5);
 else {
 at3 = buf3.indexOf('DATE ');
 if(at3>=0 && at3<3) Game_Date=buf2.substr(at3+5);
 else {
 at3 = buf3.indexOf('ROUND ');
 if(at3>=0) Round=buf2.substr(at3+6);
 else {
 at3 = buf3.indexOf('WHITE ');
 if(at3>=0) White=buf2.substr(at3+6);
 else {
 at3 = buf3.indexOf('BLACK ');
 if(at3>=0) Black=buf2.substr(at3+6);
 else {
 at3 = buf3.indexOf('ECO ');
 if(at3>=0) ECO=buf2.substr(at3+4);
 else {
 at3 = buf3.indexOf('WHITEELO ');
 if(at3>=0) WhiteElo=buf2.substr(at3+9);
 else {
 at3 = buf3.indexOf('BLACKELO ');
 if(at3>=0) BlackElo=buf2.substr(at3+9);
 else {
 at3 = buf3.indexOf('EVENTDATE ');
 if(at3>=0) Event_Date=buf2.substr(at3+10);
 else {
 at3 = buf3.indexOf('SOURCEDATE ');
 if(at3>=0) Source_Date=buf2.substr(at3+11);
 else {
 at3 = buf3.indexOf('RESULT ');
 if(at3>=0) Result=buf2.substr(at3+7);
 else {
 AddInfo+=((AddInfo.length>0) ? '<BR>' : '' ) + buf2;
  }}}}}}}}}}}}}
 }

if(ch==1)
{
if((c0_relative_size_procents<90 && c0_headsize==0) || c0_headsize==10)
 {
 htms='<TABLE id="TBH" width="80" border="0"   bgcolor="#CCCC99" style="cursor:move;border:1px solid #666633" onmouseover="c0_over_head(1,99);">';
 if(Round.length>0) htms+='<TR><TD id="TBH"><font size="3">Round: ' + Round + '</font></TD>';
 else  htms+='<TR><TD id="TBH"><font size="3">more</font></TD>';
 htms+='<TD id="TBH"><font size="3">»</font></TD></TR>';
 htms+='</TABLE>';
 }
else
 {
 htms='<TABLE id="TBH" width="160" border="0" bgcolor="#CCCC99" ';
 if(c0_headsize==1) htms+=' onmouseout="setTimeout(' + "'" + 'c0_over_head(0,c0_headsize);' + "'" + ',2000);" ';
 htms+=' style="cursor:move;border:1px solid #666633" >';
 if(Event_Name.length>0) htms+='<TR><TD id="TBH"><font size="3">Event: ' + Event_Name + '</font></TD></TR> ';
 if(Event_Date.length>0) htms+='<TR><TD id="TBH"><font size="3">Event date: ' + Event_Date + '</font></TD></TR>';
 if(Event_Site.length>0) htms+='<TR><TD id="TBH"><font size="3">Site: ' + Event_Site + '</font></TD></TR>';
 if(Game_Date.length>0) htms+='<TR><TD id="TBH"><font size="3">Date: ' + Game_Date + '</font></TD></TR>';
 if(Round.length>0) htms+='<TR><TD id="TBH"><font size="3">Round: ' + Round + '</font></TD></TR>';
 if(ECO.length>0) htms+='<TR><TD id="TBH"><font size="3">ECO: ' +
	'<a title="Quick link more about..." target="blank" href="http://www.chessgames.com/perl/chessopening?eco=' + ECO + '">' + ECO + '</a>' +'</font></TD></TR>';
 if(Source_Date.length>0 && Event_Date.length==0 && Game_Date.length==0)
		 htms+='<TR><TD id="TBH"><font size="3">Source Date: ' + Source_Date + '</font></TD></TR>';
 if(AddInfo.length>0) htms+='<TR><TD id="TBH"><font size="3">' + AddInfo + '</font></TD></TR>';
 htms+='<TR><TD id="TBH" align="center" onmouseover="c0_over_head(10,99);"><font size="3">⌂</font></TD></TR>';
 htms+='</TABLE>';
 }
 rc=htms;
}

if(ch==2 || ch==8)
{
 str2= c0_ReplUrl(str2);
 if(ch==2)
 {
 c0_errflag=c0_PG_parseString(str2);
 if(c0_fischer && c0_fischer_cst.length>0) c0_fischer_adjustmoved();
 }
 var at3 = str2.indexOf('*');
 if(at3>=0) Result="not finished";
 var at3 = str2.indexOf('1/2');
 if(at3>=0)  Result="1/2-1/2";
 var at3 = str2.indexOf('1-0');
 if(at3>=0)  Result="1:0";
 var at3 = str2.indexOf('1:0');
 if(at3>=0) Result="1:0";
 var at3 = str2.indexOf('0-1');
 if(at3>=0) Result="0:1"
 var at3 = str2.indexOf('0:1');
 if(at3>=0) Result="0:1";


 if((c0_relative_size_procents<40 && c0_pgnsize==0) || c0_pgnsize==10)
 {
 htms='<DIV id="TBP2"  style="cursor:move;border:1px solid #666633;width:100;height:100;overflow-y:scroll;overflow-x:scroll;">';
 htms+='<TABLE id="TBP" width="100" height="100" bgcolor="#FFFFCC" style="cursor:move; border:0px solid #666633">';
 htms+='<TR>';
 htms+='<TD id="TBH" onmouseover="c0_over_pgn(1,99);"><font size="3">»</font></TD></TR>';
 htms+='<TR><TD id="TBP"><font size="3"><b>' + White + (WhiteElo.length>0 ? '(Elo '+WhiteElo+')' : '' ) +  ' - </b></font>';
 htms+='<font size="3"><b>  (' + Result  +  ') -  </b></font>';
 htms+='<font size="3"><b>' + Black + (BlackElo.length>0 ? '(Elo '+BlackElo+')' : '' ) +  '</b></font>';
 htms+='<br>';
 str2=c0_PG_3;
 htms+='<font size="3">' + str2 +  '</font>';
 htms+='</TD>';
 htms+='</TR></TABLE>';
 htms+='</DIV>';
 rc=htms;
 }
 else
 {

 if(c0_dh>0 || c0_screensizeW<c0_screensizeH)
 {
 var wH= c0_dh>0 ? c0_dh : parseInt( c0_screensizeH - 20 - ( c0_at_top + (332*(c0_relative_size_procents/100)*(c0_topview?1.8:1)) +50 ) );
 var wW= parseInt(c0_screensizeW-22);

 htms='<DIV id="TBP2"  style="cursor:move;border:1px solid #666633;width:' + wW.toString() + ';height:' + wH.toString() + '">';
 htms+='<TABLE id="TBP" width="' + wW.toString() + '" height="' + wH.toString() + '" bgcolor="#FFFFCC" ';
 //if(c0_pgnsize==1) htms+=' onmouseout="setTimeout(' + "'" + 'c0_over_pgn(0,c0_pgnsize);' + "'" + ',4000);" ';
 htms+=' style="cursor:move; border:0px solid #666633">';
 htms+='<TR>';
 htms+='<TD id="TBP"><font size="3"><b>' + White + (WhiteElo.length>0 ? '(Elo '+WhiteElo+')' : '' ) +  ' - </b></font>';
 htms+='<font size="3"><b>  (' + Result  +  ') -  </b></font>';
 htms+='<font size="3"><b>' + Black + (BlackElo.length>0 ? '(Elo '+BlackElo+')' : '' ) +  '</b></font>';
 htms+='</TD>';
 htms+='<TD id="TZH" width="10" align="center" onmouseover="c0_over_pgn(10,99);"><font size="3">⌂</font></TD>';
 htms+='</TR>';
 str2=c0_PG_3;
 htms+='<TR><TD id="TBP"><font size="3">' + str2 +  '</font>';
 htms+='</TD>';
 htms+='</TR></TABLE>';
 htms+='</DIV>';

 rc=htms;
 }
 else
 {
 htms='<TABLE id="TBP" width="180" bgcolor="#FFFFCC" ';
 //if(c0_pgnsize==1) htms+=' onmouseout="setTimeout(' + "'" + 'c0_over_pgn(0,c0_pgnsize);' + "'" + ',4000);" ';
 htms+=' style="cursor:move;border:1px solid #666633">';
 htms+='<TR><TD id="TBP"><font size="3">' + White + (WhiteElo.length>0 ? '<br>(Elo '+WhiteElo+')' : '' ) +  '</font></TD>';
 htms+='<TD id="TBP"><font size="3">' + Black + (BlackElo.length>0 ? '<br>(Elo '+BlackElo+')' : '' ) +  '</font></TD></TR>';
 htms+='</TABLE>';
 htms+='<TABLE id="TBP" width="180" bgcolor="#FFFFCC" style="cursor:move;border:1px solid #666633">';
 htms+='<TR><TD id="TBP" align="center"><font size="3">' + Result  +  '</font></TD>';
 htms+='<TD id="TZH" align="center" onmouseover="c0_over_pgn(10,99);"><font size="3">⌂</font></TD></TR>';
 htms+='</TABLE>';

 str2=c0_PG_3;
 htms+='<DIV id="TBP2"  style="cursor:move;border:1px solid #666633;overflow-y:scroll;width:178;height:' + (c0_relative_size_procents<90 ? '80' : (c0_relative_size_procents<110 ? '200' : '340' ) ) + '" >';
 htms+='<TABLE id="TBP"  width="100%" bgcolor="#FFFFCC" style="border:1px solid #666633">';
 htms+='<TR><TD id="TBP"><font size="3">' + str2 +  '</font></TD>';
 htms+='</TABLE></DIV>';
 htms+='';
 rc=htms;
 }

 }

 if(c0_PG_viewer) document.title = White + '-' + Black + ' (' + Result + ')';

}
 return rc;
}

//------------------------------ Mouse over small header windows
function c0_over_head( c0_s7, c0_s8 )
{
if(c0_s7!=c0_s8)
	{
	c0_headsize= c0_s7;
	var DIV1=document.getElementById('div-head');
	DIV1.innerHTML=c0_PG_gettable(1);
	}
}

//------------------------------ Mouse over pgn windows
function c0_over_pgn( c0_s7, c0_s8 )
{
if(c0_s7!=c0_s8)
	{
	c0_pgnsize= c0_s7;
	var DIV1=document.getElementById('div-pgn');
	DIV1.innerHTML=c0_PG_gettable(8);
	if(c0_s7==10)
		{
	        if(c0_screensizeW>c0_screensizeH)
			{
			DIV1.style.top = 0+"px";
			DIV1.style.left = (c0_screensizeW-102)+"px";
			}
	        else
			{
			DIV1.style.top = (c0_screensizeH-102)+"px"
			DIV1.style.left = 0+"px";
			}
		}
	if(c0_s7==0 || c0_s7==1)
		{
		DIV1.style.top = 0+"px";
		DIV1.style.left = (c0_screensizeW-162)+"px";

		if(c0_dh>0 || c0_screensizeW<c0_screensizeH)
			{
			DIV1.style.top = c0_at_top + (332*(c0_relative_size_procents/100)*(c0_topview?1.8:1)) +50 +"px";
			DIV1.style.left = 4 +"px";
			}
		else
			{
			DIV1.style.top = 0+"px";
			DIV1.style.left = (c0_screensizeW-186)+"px";
			}
		}
	}
}


//------------------------------ PGN parser on chess moves
function c0_ReplUrl(str)		// Replaces urls to links...
{
var str2=str;
for(;;)
{
 var urls='';
 var at=str2.indexOf("http://");
 if(at>=0)  var urls="HTTP://" + str2.substr(at+7);
 else
   {
   at=str2.indexOf("https://");
   if(at>=0) urls="HTTPS://" + str2.substr(at+8);
   }
  if(urls.length>0)
   {
   at2=urls.indexOf(" ");
   if(at2>=0) urls=urls.substr(0,at2);

   str2=str2.substr(0,at) + '<a href="' +urls + '" target="blank" >link»</a>' + str2.substr(at +urls.length);
   }
  else break;
}

str2= c0_ReplaceAll( str2, 'HTTP://', 'http://' );
str2= c0_ReplaceAll( str2, 'HTTPS://', 'https://' );

return(str2);
}


//------------------------------ PGN parser on chess moves

function c0_get_moves_from_PGN(c0_PGN_str)		// Parses PGN moves from string variableown string for chess moves...
{
PGN_text= c0_PGN_str;

c0_PG_gettable(2);

//if(c0_errflag) alert("There was an error in PGN parsing!");

return c0_PG_1;
}


//------------------------------ PGN parser on chess moves

function c0_PG_parseString(str)		// Parses own string for chess moves...
{
var f_error=false;
var gaj=1;
var move='';
var color7="w";
var resultl="[1:0][1-0][1 : 0][1 - 0][0:1][0-1][0 : 1][0 - 1][1/2][1 / 2] [0.5:0.5][1/2:1/2][1/2-1/2][1/2 - 1/2][1/2 : 1/2][*]";
var point='';
var comment='';

c0_PG_1='';
c0_PG_2='';
c0_PG_3='';
c0_PG_4='';
c0_PG_point='';

c0_PG_sh='';

c0_poss_anot=[];
c0_poss_an_cnt=0;

c0_variants=[];
c0_var_cnt=0;
c0_var_info=[];

var c0_1save_position=c0_position;
var c0_1save_sidemoves=c0_sidemoves;
var c0_1save_wKingmoved=c0_wKingmoved;
var c0_1save_bKingmoved=c0_bKingmoved;
var c0_1save_wLRockmoved=c0_wLRockmoved;
var c0_1save_wRRockmoved=c0_wRRockmoved;
var c0_1save_bLRockmoved=c0_bLRockmoved;
var c0_1save_bRRockmoved=c0_bRRockmoved;
var c0_1save_w00=c0_w00;
var c0_1save_b00=c0_b00;
var c0_1save_become=c0_become;
var c0_1save_become_from_engine=c0_become_from_engine;
var c0_1save_lastmovepawn= c0_lastmovepawn;
var c0_1save_moveslist= c0_moveslist;

if( c0_start_FEN.length>0 ) {  str= ( "{[FEN " + c0_start_FEN + "]} " ) + str; if(c0_sidemoves<0) color7="b";  }
else
{
c0_position = "wpa2,wpb2,wpc2,wpd2,wpe2,wpf2,wpg2,wph2," +
"wRa1,wNb1,wBc1,wQd1,wKe1,wBf1,wNg1,wRh1," +
"bpa7,bpb7,bpc7,bpd7,bpe7,bpf7,bpg7,bph7," +
"bRa8,bNb8,bBc8,bQd8,bKe8,bBf8,bNg8,bRh8,";

c0_moveslist = "";

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
c0_become_from_engine="";

var st_gaj=1;
var st_atq=str.indexOf('.')-1;
if(st_atq>=0)
 {
  for(var st_s=''; st_atq>=0; st_atq--)
	{
	 var st_c=str.substr(st_atq,1);
	 var c_v='0123456789';
	 if( c_v.indexOf(st_c) < 0 ) break;
	 st_s=st_c+st_s;		
	}
 if(st_s.length>0) st_gaj=parseInt(st_s);
 }

for(var i=str.length;i>0;i--) if( str.substr(i-1)!=" " ) break;
str=str.substr(0,i);

var atwas=-1;
var atcnt=0;

for(var i=0;i<str.length;i++)
 {
 var gS1 = parseInt(gaj);
 var gS1L = gS1.length;

 if( atwas<i ) { atwas=i; atcnt=0; }
 else if( atwas<=i ) atcnt++;
   // Error corrections...
 if( atcnt==8 || atcnt==12 )
  {
   for( var j=i; j>i-50 && j>gS1L; j--)
    {
        // maybe some points missing
     if( str.substr(j-gS1L,gS1L)==gS1 )
	  { str=str.substr(0,j)+"."+str.substr(j); atwas++; i=j; break; }
    }
  }
 else if( atcnt>10 )
  {
   var gCd = str.charCodeAt(i);		// try skip character
   if( gCd<48 || (gCd>90 && gCd<97) || gCd>122 )
	str=str.substr(0,i)+"."+str.substr(0,i+1);
  }

 if( atcnt>20 ) { if(c0_PG_viewer) alert("Sorry, can't parse this PGN! Errors inside."); f_error=true; break;  }

 var c=str.charAt(i);
 for(;c==" " && (i+1)<str.length && str.charAt(i+1)==" "; ) { i++; c=str.charAt(i); }
 if( c==" " && (i+1)<str.length && ("{([$").indexOf( str.charAt(i+1) )>=0) { i++; c=str.charAt(i); }

 comment='';

 if(c=="$")
	{
	 var Nag= str.substr(i,3);
	 for( var k=0; k<Nag.length; k++)
		{
		var c=Nag.substr(k,1);
		var c_v='0123456789';
		if( c_v.indexOf(c) < 0 ) { Nag=Nag.substr(0,k); break; }
		}
	 if(Nag.length>0)
		{
		var Nag_txt='';
		var Nag_at2 = c0_NAGs.indexOf("["+Nag+"]");
		if(Nag_at2>=0)
			{
			 Nag_txt = c0_NAGs.substr(Nag_at2+Nag.length+3);
			 Nag_txt = Nag_txt.substr(0, Nag_txt.indexOf("[")-1);
			}
		else Nag_txt = "Nag:" + Nag;
		str=substr(0,i) +  '{'+ "[" + Nag_txt + "]" +'}' + str.substr(i+Nag.length+1);
		}
	  c=str.substr(i,1);
	  }

 if(c=='{' || c=='(')
  {
   var cc=1;
   var c1= ((c=='{')? '}' : ')' );
   comment=c;
   for(i++;i<str.length && cc>0;i++)
	{
	var c2=str.substr(i,1);
	comment+=c2;
	if(c2==c) cc++;
	if(c2==c1) cc--;
	if(i+1==str.length && cc>0) comment+=c1;
	}
  if(comment.length>0)
	{
	for(;;)
	  {	
	   var Nag_at=comment.indexOf("$");
	   if( Nag_at<0) break;
	   var Nag= comment.substr(Nag_at+1,3);
	   for( var k=0; k<Nag.length; k++)
		{
		var c=Nag.substr(k,1);
		var c_v='0123456789';
		if( c_v.indexOf(c) < 0 ) { Nag=Nag.substr(0,k); break; }
		}
	  if(Nag.length>0)
		{
		var Nag_txt='';
		var Nag_at2 = c0_NAGs.indexOf("["+Nag+"]");
		if(Nag_at2>=0)
			{
			 Nag_txt = c0_NAGs.substr(Nag_at2+Nag.length+3);
			 Nag_txt = Nag_txt.substr(0, Nag_txt.indexOf("[")-1);
			}
		else Nag_txt = "Nag:" + Nag;

		comment=comment.substr(0,Nag_at) + "[" + Nag_txt + "]" + comment.substr(Nag_at +Nag.length+1);
		}
	 else break;
	  }
	c0_poss_anot[c0_poss_an_cnt]='[annot_nr]'+ c0_poss_an_cnt.toString()+ '[/annot_nr]' +
					'[annot_src_pgn]'+c0_PG_2+'[/annot_src_pgn]'+ 
					'[annot_curmove]'+(st_gaj-1+gaj).toString()+'[/annot_curmove]'+
					'[annot_curcolor]'+color7+'[/annot_curcolor]'+
					'[annot_moveslist]'+c0_PG_1+'[/annot_moveslist]'+ 
					'[annot_comment]'+comment+'[/annot_comment]'+
					'[annot_point]'+parseInt(c0_PG_2.length)+'[/annot_point]';
	c0_PG_2+= comment + " ";
	c0_PG_3+=' <DIV id="C0_annot_' + c0_poss_an_cnt.toString() + '" style="display: inline; color:green"><DIV style="display: inline; width:3"></DIV> <DIV title="comment" style="display: inline;color:green">' + comment +'</DIV> <DIV style="display: inline; width:3"></DIV></DIV>';
        c0_poss_an_cnt++;

	}
  if( color7=="b" )
	{
	for( var j=i; j<i+15; j++)
		{
		var pj1=str.substr(j,1);
		if( ("{([$").indexOf(pj1)>=0 ) break;
		if( str.substr(j,2)==".." ) { i=j+1; break; }
		}
	}
  i--;
  }

 else if( c=="."  || (c==" " && color7=="b"  ))
     {
     move='';
     for(;i<str.length && (str.substr(i,1)==" " || str.substr(i,1)==".");i++);
     c=str.substr(i,1);
     for(;i<str.length;i++)
	{
	c=str.substr(i,1);
	if( c==" "  ) break;
	move+=c;
	}
     if(move.length>0 && move.indexOf('Z0')<0)
	{
	if(resultl.indexOf(move)>=0 )
		{
		c0_PG_2+="  " +move;
		c0_PG_3+="  " +move;
		break;
		}
	else
	 {
	var move2=c0_from_Crafty_standard(move,color7);
	if(move2.length==0) { if(c0_PG_viewer) alert("Can't parse this PGN! move:"+gaj.toString()+"."+color7+" "+ move); f_error=true; break;  }

	var from_horiz4=(move2.substr(0,1)).charCodeAt(0) - 96;
	var from_vert4=parseInt(move2.substr(1,1));
	var to_horiz4=(move2.substr(2,1)).charCodeAt(0) - 96;
	var to_vert4=parseInt(move2.substr(3,1));

	var from_move = from_vert4.toString()+from_horiz4.toString();
	var to_move = to_vert4.toString()+to_horiz4.toString();

	if(move2.substr(4,1)=="[") c0_become_from_engine=move2.substr(5,1);
	else c0_become_from_engine="Q";

	if(c0_PGN_short) c0_PG_sh+=c0_shortCode(1,move2);

	if(c0_fischer) c0_fischer_cstl_move(move2,false);
	else c0_moveto(from_move, to_move, false);
	c0_sidemoves=-c0_sidemoves;

	c0_PG_1+=move2;

	c0_become_from_engine="";
	c0_become="";
	
	point=parseInt(gaj)+color7;

	if( color7=="w" )
		{
		c0_PG_2+=parseInt(st_gaj-1+gaj)+". " +move;
		c0_PG_3+=parseInt(st_gaj-1+gaj)+". " +'<DIV title="go here" style="cursor:pointer;display: inline;" id="DV' + point + '" onmousedown=c0_PG_pointto("' + point + '");>' + move +'</DIV>';
		color7="b"; i--;
		}
	else
		{
		c0_PG_2+=" " +move+" ";
		c0_PG_3+='<DIV style="display: inline; width:3"></DIV> <DIV title="go here" style="cursor:pointer;display: inline;" id="DV' + point + '" onmousedown=c0_PG_pointto("' + point + '");>' + move +'</DIV> <DIV style="display: inline; width:3"> </DIV>';
		color7="w"; 
		gaj++;
		}
	 c0_PG_4+="{"+point+"}["+parseInt(c0_PG_2.length)+"]";

	if( color7=="w" && str.length-i<10)
		        {
		        var reminder = str.substr(i+1);
		        for(;reminder.length>0 && reminder.substr(0,1)==" ";) reminder=reminder.substr(1);
		        if(reminder.length>0 && resultl.indexOf(reminder)>=0 )
			{
			c0_PG_2+="  " +reminder;
			c0_PG_3+="  " +reminder;
			break;
			}
		         }

	 }
	}
     }
 else
    {
     if(str.length-i<10)
        {
        var reminder = str.substr(i);
        for(;reminder.length>0 && reminder.substr(0,1)==" ";) reminder=reminder.substr(1);
        if(reminder.length>0 && resultl.indexOf(reminder)>=0 )
		{
		c0_PG_2+="  " +reminder;
		c0_PG_3+="  " +reminder;
		break;
		}
        }
    }
 }

				// possible annotations...
if(c0_poss_an_cnt>0 && (!f_error))
	{
	 for(var c0_poss_i=0; c0_poss_i<c0_poss_an_cnt; c0_poss_i++)
		{
		c0_position=c0_1save_position;
		c0_sidemoves=c0_1save_sidemoves;
		c0_wKingmoved=c0_1save_wKingmoved;
		c0_bKingmoved=c0_1save_bKingmoved;
		c0_wLRockmoved=c0_1save_wLRockmoved;
		c0_wRRockmoved=c0_1save_wRRockmoved;
		c0_bLRockmoved=c0_1save_bLRockmoved;
		c0_bRRockmoved=c0_1save_bRRockmoved;
		c0_w00=c0_1save_w00;
		c0_b00=c0_1save_b00;
		c0_become=c0_1save_become;
		c0_become_from_engine=c0_1save_become_from_engine;
		c0_lastmovepawn=c0_1save_lastmovepawn;
		c0_moveslist=c0_1save_moveslist;

		var c0_a_PG_1='';
		var c0_a_PG_2='';
		var c0_a_PG_3='';
		var c0_a_PG_4='';

		gaj=st_gaj;
		color7="w";

		if( c0_start_FEN.length>0 ) {  if(c0_sidemoves<0) color7="b";  }
		else
		{
		c0_position = "wpa2,wpb2,wpc2,wpd2,wpe2,wpf2,wpg2,wph2," +
		"wRa1,wNb1,wBc1,wQd1,wKe1,wBf1,wNg1,wRh1," +
		"bpa7,bpb7,bpc7,bpd7,bpe7,bpf7,bpg7,bph7," +
		"bRa8,bNb8,bBc8,bQd8,bKe8,bBf8,bNg8,bRh8,";

		c0_moveslist = "";

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

		var a_nr=c0_get_tag(c0_poss_anot[c0_poss_i],'annot_nr');
		var a_str=c0_get_tag(c0_poss_anot[c0_poss_i],'annot_comment');
		var a_qq1=a_str.substr(0,1);
		var a_qq2=a_str.substr(a_str.length-1,1);
		a_str=a_str.substr(1,a_str.length-2);

		var a_st_gaj=c0_get_tag(c0_poss_anot[c0_poss_i],'annot_curmove');
		var a_st_color=c0_get_tag(c0_poss_anot[c0_poss_i],'annot_curcolor');
		var a_moveslist=c0_get_tag(c0_poss_anot[c0_poss_i],'annot_moveslist');
		var a_point=parseInt( c0_get_tag(c0_poss_anot[c0_poss_i],'annot_point') );

		var a_st_atq=a_str.indexOf('.')-1;
		if(a_st_atq>=0)
		 {
		  for(var a_st_s=''; a_st_atq>=0; a_st_atq--)
			{
			 var a_st_c=a_str.substr(a_st_atq,1);
			 var c_v='0123456789';
			 if( c_v.indexOf(a_st_c) < 0 ) break;
			 a_st_s=a_st_c+a_st_s;		
			}
		 if(a_st_s.length>0 && parseInt(a_st_s)>0)
			 {
			 c0_a_PG_2=a_str.substr(0,a_st_atq+1);
			 c0_a_PG_3=a_str.substr(0,a_st_atq+1);

			 a_st_gaj=parseInt(a_st_s); a_str=a_str.substr(a_st_atq+1);
			 a_st_color="w";
			 }
		 }

		for( var j=0; j<15; j++)
		{
		var pj1=a_str.substr(j,1);
		if( ("{([$").indexOf(pj1)>=0 ) break;
		if( a_str.substr(j,3)=="..." )
			 {
			 c0_a_PG_2+=a_str.substr(0,j+3);
			 c0_a_PG_3+=a_str.substr(0,j+3);
			 a_str=a_str.substr(j+3); a_st_color="b";
			 if(a_str.substr(0,1)!=" ") a_str=" " + a_str;
			 break;
			 }
		else if( a_str.substr(j,2)==".." )
			 {
			 c0_a_PG_2+=a_str.substr(0,j+2);
			 c0_a_PG_3+=a_str.substr(0,j+2);
			 a_str=a_str.substr(j+2); a_st_color="b";
			 if(a_str.substr(0,1)!=" ") a_str=" " + a_str;
			 break;
			 }
 
		}

		for(var i=0;a_moveslist.length>i;)
		{
		if( parseInt(gaj)+color7==parseInt(a_st_gaj)+a_st_color ) break;

		var move2=a_moveslist.substr(i,4);

		var from_horiz4=(move2.substr(0,1)).charCodeAt(0) - 96;
		var from_vert4=parseInt(move2.substr(1,1));
		var to_horiz4=(move2.substr(2,1)).charCodeAt(0) - 96;
		var to_vert4=parseInt(move2.substr(3,1));

		var from_move = from_vert4.toString()+from_horiz4.toString();
		var to_move = to_vert4.toString()+to_horiz4.toString();

		if(move2.substr(4,1)=="[") c0_become_from_engine=move2.substr(5,1);
		else c0_become_from_engine="Q";

		if(c0_fischer) c0_fischer_cstl_move(move2,false);
 		else c0_moveto(from_move, to_move, false);
		c0_sidemoves=-c0_sidemoves;

		i+=4;
		if(a_moveslist.substr(i,1)=="[") i+=3;
		if(color7=="w") color7="b";
		else { color7="w"; gaj++; }
		}
		c0_moveslist=a_moveslist.substr(0,i);
		c0_a_PG_1=c0_moveslist;
		var c0_a_PG_0=c0_moveslist;

		var str=a_str;
		for(var i=str.length;i>0;i--) if( str.substr(i-1)!=" " ) break;
		str=str.substr(0,i);

		atwas=-1;
		atcnt=0;
		var f2_error=false;

		for(var i=0;i<str.length;i++)
		 {
		 if( atwas<i ) { atwas=i; atcnt=0; }
		 else if( atwas>=i ) atcnt++;
		 if( atcnt>50 ) { f2_error=true; break;  }

		 var c=str.substr(i,1);
		 for(;c==" " && (i+1)<str.length && str.substr(i+1,1)==" "; ) { i++; c=str.substr(i,1); }
		 if( c==" " && (i+1)<str.length && ("{([$").indexOf( str.substr(i+1,1) )>=0) { i++; c=str.substr(i,1); }

		 comment='';

		 if(c=='{' || c=='(')
		  {
		   var cc=1;
		   var c1= ((c=='{')? '}' : ')' );
		   comment=c;
		   for(i++;i<str.length && cc>0;i++)
			{
			var c2=str.substr(i,1);
			comment+=c2;
			if(c2==c) cc++;
			if(c2==c1) cc--;
			if(i+1==str.length && cc>0) comment+=c1;
			}
		  if(comment.length>0)
			{
			c0_a_PG_2+= comment + " ";
			c0_a_PG_3+='<DIV style="display: inline; width:3"></DIV> <DIV title="comment" style="display: inline;color:green">' + comment +'</DIV> <DIV style="display: inline; width:3"></DIV></DIV>';
			}

		  if( color7=="b" )
			{
			for( var j=i; j<i+15; j++)
				{
				var pj1=str.substr(j,1);
				if( ("{([$").indexOf(pj1)>=0 ) break;
				if( str.substr(j,3)=="..." )
					 {
					 c0_a_PG_2+=str.substr(0,j+3)	
					 c0_a_PG_3+=str.substr(0,j+3)	
					 i=j+3;
					 break;
					 }
				else if( str.substr(j,2)==".." )
					 {
					 c0_a_PG_2+=str.substr(0,j+2)	
					 c0_a_PG_3+=str.substr(0,j+2)	
					 i=j+3;
					 break;
					 }
				}
			}
		  i--;
		  }

		 else if( c=="."  || (c==" " && color7=="b"  ) )	
		     {
		     var i2=i;
		     move='';
		     for(;i<str.length && (str.substr(i,1)==" " || str.substr(i,1)==".");i++);
		     c=str.substr(i,1);
		     for(;i<str.length;i++)
			{
			c=str.substr(i,1);
			if( c==" "  ) break;
			move+=c;
			}

		     if(move.length>0 && move.indexOf('Z0')<0)
			{
			if(resultl.indexOf(move)>=0 )
				{
				c0_a_PG_2+="  " +move;
				c0_a_PG_3+="  " +move;
				break;
				}
			else
			{
			var move2=c0_from_Crafty_standard(move,color7);

			if(move2.length==0)
				 {
				 c0_a_PG_2+=' '+move+' ';
				 c0_a_PG_3+=' '+move+' ';
				 i=i2+move.length;
				 }
			else
			{
			var from_horiz4=(move2.substr(0,1)).charCodeAt(0) - 96;
			var from_vert4=parseInt(move2.substr(1,1));
			var to_horiz4=(move2.substr(2,1)).charCodeAt(0) - 96;
			var to_vert4=parseInt(move2.substr(3,1));

			var from_move = from_vert4.toString()+from_horiz4.toString();
			var to_move = to_vert4.toString()+to_horiz4.toString();

			if(move2.substr(4,1)=="[") c0_become_from_engine=move2.substr(5,1);
			else c0_become_from_engine="Q";

			if(c0_fischer) c0_fischer_cstl_move(move2,false);
			else c0_moveto(from_move, to_move, false);
			c0_sidemoves=-c0_sidemoves;

			c0_a_PG_1+=move2;

			c0_become_from_engine="";
			c0_become="";
	
			point=parseInt(c0_a_PG_1.length);

			if( color7=="w" )
				{
				c0_a_PG_2+=parseInt(gaj)+". " +move;
				c0_a_PG_3+=parseInt(gaj)+". " + '<DIV title="go here" style="cursor:pointer;display:inline;color:#990066" id="a_DV_' + a_nr + '_' + point + '" onmousedown=c0_a_PG_pointto("' + a_nr + '","' + point + '");>' + move +'</DIV>';
				color7="b"; i--;
				}
			else
				{
				c0_a_PG_2+=" " +move+" ";
				c0_a_PG_3+='<DIV style="display: inline; width:3"></DIV> <DIV title="go here" style="cursor:pointer;display:inline;color:#990066" id="a_DV_' + a_nr + '_' + point + '" onmousedown=c0_a_PG_pointto("' + a_nr + '","' + point + '");>' + move +'</DIV> <DIV style="display: inline; width:3"> </DIV>';
				color7="w"; 
				gaj++;
				}
			c0_a_PG_4+="{"+point+"}["+(parseInt(a_point) + c0_a_PG_2.length).toString() +"]";

			if( color7=="w" && str.length-i<10 )
				        {
				        var reminder = str.substr(i+1);
				        for(;reminder.length>0 && reminder.substr(0,1)==" ";) reminder=reminder.substr(1);
				        if(reminder.length>0 && resultl.indexOf(reminder)>=0 )
					{
					c0_a_PG_2+="  " +reminder;
					c0_a_PG_3+="  " +reminder;
					break;
					}
				        }
			}
			}
			}
     		 }
		 else
		   {
		     var c_v2='0123456789 ';
		     if(color7=="w" && c_v2.indexOf(str.substr(i,1)) < 0)
		        {
		        var reminder = str.substr(i);
		        if(reminder.length>0 )
				{
				c0_a_PG_2+="  " +reminder;
				c0_a_PG_3+="  " +reminder;
				break;
				}
			}
		     if(str.length-i<10)
		        {
		        var reminder = str.substr(i);
		        for(;reminder.length>0 && reminder.substr(0,1)==" ";) reminder=reminder.substr(1);
		        if(reminder.length>0 && resultl.indexOf(reminder)>=0 )
				{
				c0_a_PG_2+="  " +reminder;
				c0_a_PG_3+="  " +reminder;
				break;
				}
			}

		   }
		 }
		if((c0_a_PG_1.length > a_moveslist.length) ||
				 (c0_a_PG_1!=a_moveslist.substr(0,c0_a_PG_1.length)))
			{
			c0_a_PG_2=a_qq1+c0_a_PG_2+a_qq2;
			c0_a_PG_3=a_qq1+c0_a_PG_3+a_qq2;
			c0_variants[c0_var_cnt]=c0_a_PG_1;
			c0_var_info[c0_var_cnt]='[annot_nr]'+ a_nr.toString()+ '[/annot_nr]' +
					'[PG0]'+c0_a_PG_0+'[/PG0]'+ 
					'[PG1]'+c0_a_PG_1+'[/PG1]'+ 
					'[PG2]'+c0_a_PG_2+'[/PG2]'+ 
					'[PG3]'+c0_a_PG_3+'[/PG3]'+ 
					'[PG4]'+c0_a_PG_1+'[/PG4]'
			c0_var_cnt++;
			}
		}
	}


if(c0_PG_viewer && c0_var_cnt>0) setTimeout('c0_var_set_annot()',1000)

c0_position=c0_1save_position;
c0_sidemoves=c0_1save_sidemoves;
c0_wKingmoved=c0_1save_wKingmoved;
c0_bKingmoved=c0_1save_bKingmoved;
c0_wLRockmoved=c0_1save_wLRockmoved;
c0_wRRockmoved=c0_1save_wRRockmoved;
c0_bLRockmoved=c0_1save_bLRockmoved;
c0_bRRockmoved=c0_1save_bRRockmoved;
c0_w00=c0_1save_w00;
c0_b00=c0_1save_b00;
c0_become=c0_1save_become;
c0_become_from_engine=c0_1save_become_from_engine;
c0_lastmovepawn=c0_1save_lastmovepawn;
c0_moveslist=c0_1save_moveslist;

return f_error;
}

//------------------------------ just get tag string

function c0_get_tag( str, tag )
{
 var ret='';
 var ctg1='['+tag+']';
 var ctg2='[/'+tag+']';
 var at1=str.indexOf(ctg1);
 if(at1>=0)
	{
	str=str.substr(at1+ctg1.length);
	at1=str.indexOf(ctg2);
	if(at1>=0) ret=str.substr(0, at1);
	}
 return ret;
}

//------------------------------ sets up annotations

function c0_var_set_annot()
{
for( var i=0; i<c0_var_cnt; i++ )
	{
	var a_nr=c0_get_tag(c0_var_info[i],'annot_nr');
	var a_PG1=c0_get_tag(c0_var_info[i],'PG1');
	var a_PG2=c0_get_tag(c0_var_info[i],'PG2');
	var a_PG3=c0_get_tag(c0_var_info[i],'PG3');
	var a_PG4=c0_get_tag(c0_var_info[i],'PG4');

	
	var DIV0=document.getElementById('C0_annot_' + a_nr);
	DIV0.innerHTML='<i>'+a_PG3+'</i>';
	}
}

//------------------------------ color for moves

function c0_PG_pointcolor( at1 )
{
var col="w";
var gaj=1;
var i=0;
for(;at1.length>0;)
{
var DIVc=document.getElementById( "DV"+parseInt(gaj)+col );
DIVc.style.backgroundColor="#FFDDCC";
i+=4;
if(c0_PG_1.substr(i,1)=="[") i+=3;
if( at1==parseInt(gaj)+col ) break;
if(col=="w") col="b";
else { col="w"; gaj++; }
}

var top8=0;
if(at1.length>0) 
{
var at7= c0_PG_4.indexOf("{"+at1+"}");
if(at7>=0)
	{
	top8=(document.getElementById('TBP2').scrollHeight * (parseInt(c0_PG_4.substr(at7+at1.length+3)) / c0_PG_2.length) );
	}
else
	{
	top8=(document.getElementById('TBP2').scrollHeight * (i/c0_PG_1.length));
	}
}
top8-=((c0_relative_size_procents<80 ? 30 : (c0_relative_size_procents<100 ? 80 : 150)));
if(top8<0) top8=0;

if(c0_dh>0 || c0_screensizeW<c0_screensizeH) { top8=0; }	// Then adjusted by publisher...
else document.getElementById('TBP2').scrollTop = top8;

if(at1.length>0)
{
if(col=="w") col="b";
else { col="w"; gaj++; }
}

for(;;)
{
if(i>=c0_PG_1.length) break;
var DIVc=document.getElementById( "DV"+parseInt(gaj)+col );
DIVc.style.backgroundColor="#FFFFCC";
i+=4;
if(c0_PG_1.substr(i,1)=="[") i+=3;
if(col=="w") col="b";
else { col="w"; gaj++; }
}

}

//------------------------------ mouse preset

function c0_PG_pointto( at1 )
{
if(c0_PG_playing) c0_PG_playmode(0);

if(c0_moving) return;

var col="w";
var gaj=1;
var i=0;
for(;;)
{
i+=4;
if(c0_PG_1.substr(i,1)=="[") i+=3;
if( at1==parseInt(gaj)+col ) break;
if(col=="w") col="b";
else { col="w"; gaj++; }
}

var c0_pD = document.getElementById('c0_diagram');
var c0_pDtop=c0_pD.style.top;
var c0_pDleft=c0_pD.style.left;

if(c0_screensizeH>400 && c0_screensizeW>400 &&
	(typeof(PGN_2D)=="undefined" || typeof(PGN_2D)=="null" || PGN_2D!="no") ) c0_draw_2D_board();

c0_pD.style.top=parseInt(c0_pDtop)+"px";
c0_pD.style.left=parseInt(c0_pDleft)+"px";

c0_set_start_position( c0_PG_1.substr(0,i) );
c0_PG_point= at1;
c0_PG_pointcolor( c0_PG_point );
}

//------------------------------ mouse preset comment

function c0_a_PG_pointto( a_nr, at1 )
{
if(c0_PG_playing) c0_PG_playmode(0);

if(c0_moving) return;

for( var i=0; i<c0_var_cnt; i++ ) if(a_nr==c0_get_tag(c0_var_info[i],'annot_nr')) break;
var a_PG1=c0_get_tag(c0_var_info[i],'PG1');
var a_PG2=c0_get_tag(c0_var_info[i],'PG2');
var a_PG3=c0_get_tag(c0_var_info[i],'PG3');
var a_PG4=c0_get_tag(c0_var_info[i],'PG4');

var c0_pD = document.getElementById('c0_diagram');
var c0_pDtop=c0_pD.style.top;
var c0_pDleft=c0_pD.style.left;

if(c0_screensizeH>400 && c0_screensizeW>400 &&
	(typeof(PGN_2D)=="undefined" || typeof(PGN_2D)=="null" || PGN_2D!="no") ) c0_draw_2D_board();

c0_pD.style.top=parseInt(c0_pDtop)+"px";
c0_pD.style.left=parseInt(c0_pDleft)+"px";

c0_set_start_position( a_PG1.substr(0,at1) );

var DIVc=document.getElementById( "a_DV_"+a_nr + "_" + at1.toString() );
DIVc.style.backgroundColor="#FFFFCC";
if(DIVc.innerHTML.indexOf("<u>")<0) DIVc.innerHTML='<u>'+DIVc.innerHTML+'</u>';

c0_annot_point=c0_PG_point;
}

//------------------------------ swap button
function c0_PG_swap()
{
if(c0_moving) return;

if(c0_annot_point.length>0) { c0_PG_point=c0_annot_point; c0_annot_point=''; c0_PG_pointto( c0_PG_point ); }

var col="b";
var gaj=0;
var i=0;
for(;c0_PG_point.length>0;)
{
i+=4;
if(c0_PG_1.substr(i,1)=="[") i+=3;
if(col=="w") col="b";
else { col="w"; gaj++; }
if( c0_PG_point==parseInt(gaj)+col ) break;
}

c0_side=-c0_side;

var c0_pD = document.getElementById('c0_diagram');
var c0_pDtop=c0_pD.style.top;
var c0_pDleft=c0_pD.style.left;

if(c0_screensizeH>400 && c0_screensizeW>400 &&
	(typeof(PGN_2D)=="undefined" || typeof(PGN_2D)=="null" || PGN_2D!="no") ) c0_draw_2D_board();

c0_pD.style.top=parseInt(c0_pDtop)+"px";
c0_pD.style.left=parseInt(c0_pDleft)+"px";

c0_set_start_position( c0_PG_1.substr(0,i) );
}

function c0_PG_speed(virz,ch)
{
if(c0_PG_playing) c0_PG_playmode(0);

if(c0_moving) return;

if(c0_annot_point.length>0) { c0_PG_point=c0_annot_point; c0_annot_point=''; c0_PG_pointto( c0_PG_point ); }

if(virz==1 && ch==1) { c0_PG_onemove=true; c0_PG_justplaymove(); return; }

var col="b";
var gaj=0;
var i=0;

for(;c0_PG_point.length>0;)
{
i+=4;
if(c0_PG_1.substr(i,1)=="[")  i+=3;
if(col=="w") col="b";
else { col="w"; gaj++; }
if( c0_PG_point==parseInt(gaj)+col ) break;
}

for(;;ch--)
{
if(virz>0 && i>=c0_PG_1.length) { i=c0_PG_1.length; break; }
if(virz<0 && gaj<=0) { c0_PG_point=''; i=0; break; }
if(ch==0) break;



if(virz>0)
	{
	i+=4;
	if(c0_PG_1.substr(i,1)=="[") i+=3;
	if(col=="w") col="b";
	else { col="w"; gaj++; }
	}
else
	{
	if(c0_PG_1.substr(i-1,1)=="]") i-=3;
	i-=4;
	if(col=="w") { col="b"; gaj--; }
	else col="w";
	}
c0_PG_point=parseInt(gaj)+col;
}

var c0_pD = document.getElementById('c0_diagram');
var c0_pDtop=c0_pD.style.top;
var c0_pDleft=c0_pD.style.left;

if(c0_screensizeH>400 && c0_screensizeW>400 &&
	(typeof(PGN_2D)=="undefined" || typeof(PGN_2D)=="null" || PGN_2D!="no") ) c0_draw_2D_board();

c0_pD.style.top=parseInt(c0_pDtop)+"px";
c0_pD.style.left=parseInt(c0_pDleft)+"px";

c0_set_start_position( c0_PG_1.substr(0,i) );

c0_PG_pointcolor( c0_PG_point );
}


//-------------------------------------------------
// Crafty notation (quite a standard)
//-------------------------------------------------
function c0_from_Crafty_standard(c0_move,c0_color47)
{
c0_move=c0_ReplaceAll( c0_move, "ep", "" );

var c0_becomes7="";
var c0_ret7=c0_fischer_cst_fCr(c0_move);
if(c0_ret7.length>0) return c0_ret7;
else if(c0_move.substr(0,5)=="O-O-O" || c0_move.substr(0,5)=="0-0-0")
	{
	if(c0_color47=="w")
		{ 
		  if(c0_position.indexOf("wKc1")<0 && c0_can_be_moved( "15","13",false) ) c0_ret7="e1c1[0]";
	 	}
	else
		{
		  if(c0_position.indexOf("bKc8")<0 && c0_can_be_moved( "85","83",false) ) c0_ret7="e8c8[0]";
	 	}
	}
else if(c0_move.substr(0,3)=="O-O" || c0_move.substr(0,3)=="0-0")
	{
	if(c0_color47=="w")
		{ 
		  if(c0_position.indexOf("wKg1")<0 && c0_can_be_moved( "15","17",false) ) c0_ret7="e1g1[0]";
		}
	else
		{
		  if(c0_position.indexOf("bKg8")<0 && c0_can_be_moved( "85","87",false) ) c0_ret7="e8g8[0]";
		}
	}
else if( ("{ab}{ba}{bc}{cb}{cd}{dc}{de}{ed}{ef}{fe}{fg}{gf}{gh}{hg}").indexOf(c0_move.substr(0,2))>=0 )
  {
       var c0_Z81horiz=c0_move.charCodeAt(0) - 96;
       var c0_Z82horiz=c0_move.charCodeAt(1) - 96;

       for(var c0_i8=0;c0_position.length>c0_i8; c0_i8+=5)
	{
	var c0_Z8color=c0_position.substr(c0_i8,1);
	var c0_Z8figure=c0_position.substr(c0_i8+1,1);
	var c0_Z8horiz=(c0_position.substr(c0_i8+2,1)).charCodeAt(0) - 96;
	var c0_Z8vert=parseInt(c0_position.substr(c0_i8+3,1));
	var c0_Z82vert=c0_Z8vert+(c0_color47=="w" ? 1 : -1 );
	var c0_Z8from_at72 = c0_Z8vert.toString() + c0_Z8horiz.toString();
	var c0_Z8to_at72 = c0_Z82vert.toString() + c0_Z82horiz.toString();

	if(c0_Z8color==c0_color47 && c0_Z8figure=="p" && c0_Z81horiz==c0_Z8horiz )
		{
		if( c0_can_be_moved( c0_Z8from_at72, c0_Z8to_at72,false) )
			{
			c0_ret7=c0_convE777(c0_Z8from_at72)+c0_convE777(c0_Z8to_at72);
			break;
			}
		}
	}

       c0_becomes7=promoIf(c0_move);
       c0_ret7+=c0_becomes7;
   }
else
 {
 var c0_cp7=c0_move.length;

 var c0_figure7=c0_move.substr(0,1);
 if(c0_figure7=="N" || c0_figure7=="B" || c0_figure7=="R" || c0_figure7=="Q" || c0_figure7=="K") c0_move = c0_move.substr(1);
 else c0_figure7="p";

 c0_becomes7=promoIf(c0_move);
 if(c0_becomes7.length>0)
	{
	var c0_sh7=c0_move.indexOf("=");
	if(c0_sh7<0) c0_sh7=c0_move.lastIndexOf( c0_becomes7.substr(1,1).toLowerCase() );
        if(c0_sh7>0) c0_move = c0_move.substr(0, c0_sh7);
	}
 c0_move=c0_ReplaceAll( c0_move, "+", "" );
 c0_move=c0_ReplaceAll( c0_move, "-", "" );
 c0_move=c0_ReplaceAll( c0_move, "x", "" );
 c0_move=c0_ReplaceAll( c0_move, "X", "" );
 c0_move=c0_ReplaceAll( c0_move, "#", "" );
 c0_move=c0_ReplaceAll( c0_move, "!", "" );
 c0_move=c0_ReplaceAll( c0_move, "?", "" );

 var c0_cp7=c0_move.length;
 c0_cp7--;	
 var c0_to_at7 = c0_move.substr(c0_cp7-1,2);
 var c0_vert72=parseInt(c0_move.substr(c0_cp7--,1));
 var c0_horiz72=(c0_move.substr(c0_cp7--,1)).charCodeAt(0) - 96;
 var c0_to_at72 = c0_vert72.toString() + c0_horiz72.toString();

 if(c0_cp7>=0)
  {
  var c0_vert71=parseInt(c0_move.substr(c0_cp7,1));
  if(isNaN(c0_vert71) || c0_vert71<1 || c0_vert71>8) c0_vert71=0; else c0_cp7--;
  }
  else c0_vert71=0;

 if(c0_cp7>=0)
  {
  var c0_horiz71=(c0_move.substr(c0_cp7--,1)).charCodeAt(0) - 96;
  if(c0_horiz71<1 || c0_horiz71>8) c0_horiz71=0;
  }
  else c0_horiz71=0;

 for(var c0_i4=0;c0_position.length>c0_i4; c0_i4+=5)
	{
	var c0_Z4color=c0_position.substr(c0_i4,1);
	var c0_Z4figure=c0_position.substr(c0_i4+1,1);
	var c0_Z4horiz=(c0_position.substr(c0_i4+2,1)).charCodeAt(0) - 96;
	var c0_Z4vert=parseInt(c0_position.substr(c0_i4+3,1));
	var c0_Z4from_at72 = c0_Z4vert.toString() + c0_Z4horiz.toString();
	var c0_Z4from_at7 = c0_position.substr(c0_i4+2,2);

	
	if(c0_Z4color==c0_color47 && c0_figure7==c0_Z4figure)
		{
		 if((c0_vert71==0 || c0_vert71==c0_Z4vert) &&
			(c0_horiz71==0 || c0_horiz71==c0_Z4horiz) )
				{
				if( c0_can_be_moved( c0_Z4from_at72,c0_to_at72,false))
					{
					c0_ret7=c0_Z4from_at7+c0_to_at7+c0_becomes7;
					break;
					}
				}
		}
	}
 }
return c0_ret7;
}

function promoIf(c0_move)
{
var c0_becomes7="";
var c0_sh7=c0_move.indexOf("=");

if(c0_sh7>0) c0_sh7++;
else
{
if(c0_sh7<0) c0_sh7=c0_move.lastIndexOf("n");
if(c0_sh7<0) c0_sh7=c0_move.lastIndexOf("r");
if(c0_sh7<0) c0_sh7=c0_move.lastIndexOf("q");
// ignore b, causes too much problems, should be =b

if(c0_sh7>0)
 {
  if( ("18ABCDEFGH").indexOf((c0_move.substr(c0_sh7-1,1)).toUpperCase() )<0 ) c0_sh7=-1;
 }
else c0_sh7=-1;
}

if(c0_sh7>=0)
	{
	c0_becomes7="["+(c0_move.substr(c0_sh7,1)).toUpperCase()+"]";
        if( ("[Q][R][B][N]").indexOf(c0_becomes7)<0 ) c0_becomes7="";
	}
return c0_becomes7;
}





//============================ ADDITIONAL UPPER LEVEL FUNCTIONS...

//----------------------------------
// Gets  FEN for position
//----------------------------------
function c0_get_FEN()
{
var c0_vert7=8;
var c0_horz7=1;
var c0_fs1="";
var c0_em7=0;

for( var c0_vert7=8; c0_vert7>=1;  )
 {
 for( var c0_horz7=1; c0_horz7<=8; c0_horz7++ )
	{
	var c0_pos7 = String.fromCharCode(96+c0_horz7)+c0_vert7.toString();
	var c0_at7=c0_position.indexOf( c0_pos7 );
	if( c0_at7>=0 )
		{
		if( c0_em7>0 ) { c0_fs1+=c0_em7.toString(); c0_em7=0; }
		var c0_ch7=c0_position.substr( c0_at7-1, 1 );
		var c0_color7=c0_position.substr( c0_at7-2, 1 );
		if( c0_color7=="w" ) c0_fs1+=c0_ch7.toUpperCase();
		else c0_fs1+=c0_ch7.toLowerCase();
		}
	else c0_em7++;
	}
 if( c0_em7>0 ) { c0_fs1+=c0_em7.toString(); c0_em7=0; }
 c0_vert7--;
 if(c0_vert7<1) break;
 c0_fs1+="/";
 }

c0_fs1+=" " + (( c0_sidemoves>0)? "w" : "b" ) + " ";

if(  (c0_w00 || c0_wKingmoved || (c0_wLRockmoved && c0_wRRockmoved))  && 
     (c0_b00 || c0_bKingmoved || (c0_bLRockmoved && c0_bRRockmoved)) ) c0_fs1+="- ";
else
 {
  if( !(c0_w00 || c0_wKingmoved) && !c0_wLRockmoved ) c0_fs1+="Q";
  if( !(c0_w00 || c0_wKingmoved) && !c0_wRRockmoved ) c0_fs1+="K";
  if( !(c0_b00 || c0_bKingmoved) && !c0_bLRockmoved ) c0_fs1+="q";
  if( !(c0_b00 || c0_bKingmoved) && !c0_bRRockmoved ) c0_fs1+="k";
  c0_fs1+=" ";
 }

 var c0_enpass7="-";

 if(c0_lastmovepawn>0)
	{
	var c0_lmove7=c0_moveslist.substr( c0_moveslist.length-4, 4 );
	var c0_vert7 = c0_lmove7.charCodeAt(1)

	if( c0_lmove7.substr(0,1)==c0_lmove7.substr(2,1) &&
		(c0_lmove7.charCodeAt(0)-96==c0_lastmovepawn) &&
		 (( c0_lmove7.substr(1,1)=="7" && c0_lmove7.substr(3,1)=="5" ) ||
		  ( c0_lmove7.substr(1,1)=="2" && c0_lmove7.substr(3,1)=="4" )) )
	{
	 var c0_at7=c0_position.indexOf( c0_lmove7.substr(2,2) );
	 if( c0_at7>=0 && c0_position.substr( c0_at7-1,1 )=="p" )
		{
		c0_enpass7=c0_lmove7.substr(0,1);
		if( c0_lmove7.substr(1,1)=="7" ) c0_enpass7+="6"; else c0_enpass7+="3";
		}
	}
	}
c0_fs1+=c0_enpass7 + " ";

c0_fs1+="0 ";		// position repeating moves....

var c0_mcount7=1;
for( var c0_i7=0; c0_i7<c0_moveslist.length;  )
	{
	c0_i7+=4;
	if(c0_moveslist.substr(c0_i7,1)=="[") c0_i7+=3;
	c0_mcount7+=0.5;
	}
c0_fs1+=(parseInt( c0_mcount7.toString() )).toString() + " ";

return c0_fs1;
}

//----------------------------------
// Sets position using FEN
//----------------------------------
function c0_set_FEN( c0_fen_str )
{
var c0_vert7=8;
var c0_horz7=1;

var c0_fs1="";
var c0_fs2="";

for(var c0_i7=0; c0_i7<c0_fen_str.length; c0_i7++)
{
var c0_ch7=c0_fen_str.substr(c0_i7,1);
if( c0_ch7==" " ) break;
var c0_pusto=parseInt(c0_ch7);
if(c0_pusto>=1 && c0_pusto<=8)  { for(var c0_j7=1; c0_j7<=c0_pusto; c0_j7++) c0_fs1+="."; }
else c0_fs1+=c0_ch7;
}
c0_fs1+= (" " + c0_fen_str.substr(c0_i7));

for(var c0_i7=0; c0_i7<c0_fs1.length; c0_i7++)
{
var c0_ch7=c0_fs1.substr(c0_i7,1);
if( c0_ch7==" " ) break;

var c0_pos7 = String.fromCharCode(96+c0_horz7)+c0_vert7.toString();
var c0_color7=" ";
if(c0_ch7=="p" || c0_ch7=="n" || c0_ch7=="b" || c0_ch7=="r" || c0_ch7=="q" || c0_ch7=="k" ) c0_color7="b";
if(c0_ch7=="P" || c0_ch7=="N" || c0_ch7=="B" || c0_ch7=="R" || c0_ch7=="Q" || c0_ch7=="K" ) c0_color7="w";
if(c0_color7!=" ")
	 {
	 if( c0_ch7=="P" ||  c0_ch7=="p" ) c0_ch7="p";
	 else c0_ch7=c0_ch7.toUpperCase();

	 c0_fs2+=(c0_color7 + c0_ch7 + c0_pos7 + ";");
	 }
if(c0_ch7=="/") { if(c0_horz7>1) {c0_vert7--; c0_horz7=1;} }
else { c0_horz7++; if(c0_horz7>8) { c0_horz7=1; c0_vert7--; } }

if(c0_vert7<1) break;
}

for(; c0_i7<c0_fs1.length; c0_i7++) if( c0_fs1.substr(c0_i7,1)==" " ) break;
for(; c0_i7<c0_fs1.length; c0_i7++) if( c0_fs1.substr(c0_i7,1)!=" " ) break;

// which moves
var c0_side7move=1;
if(c0_i7<c0_fs1.length && c0_fs1.substr(c0_i7,1)=="b") c0_side7move=-1;

for(; c0_i7<c0_fs1.length; c0_i7++) if( c0_fs1.substr(c0_i7,1)==" " ) break;
for(; c0_i7<c0_fs1.length; c0_i7++) if( c0_fs1.substr(c0_i7,1)!=" " ) break;

// castlings

var c0_wK7=false; var c0_wRL7=false; var c0_wRR7=false; var c0_wcastl7=false;
var c0_bK7=false; var c0_bRL7=false; var c0_bRR7=false; var c0_bcastl7=false;

var c0_q7="-";
if(c0_i7<c0_fs1.length)
{
 c0_q7=c0_fs1.substr(c0_i7);
 var c0_at7=c0_q7.indexOf(" ");
 if( c0_at7>=0 ) c0_q7=c0_q7.substr(0,c0_at7);
}
if( c0_q7.indexOf("K")<0 ) c0_wRR7=true;
if( c0_q7.indexOf("Q")<0 ) c0_wRL7=true;

if( c0_q7.indexOf("k")<0 ) c0_bRR7=true;
if( c0_q7.indexOf("q")<0 ) c0_bRL7=true;

if( c0_q7.indexOf("-")>=0 ) { c0_wK7=true;  c0_bK7=true; }

c0_fisch_castl_save(c0_q7,c0_fs2);

for(; c0_i7<c0_fs1.length; c0_i7++) if( c0_fs1.substr(c0_i7,1)==" " ) break;
for(; c0_i7<c0_fs1.length; c0_i7++) if( c0_fs1.substr(c0_i7,1)!=" " ) break;

// en passant

c0_q7="-";
if(c0_i7<c0_fs1.length) c0_q7=c0_fs1.substr(c0_i7,1);

var c0_enpass7=0;
if( c0_q7.indexOf("-")<0 ) c0_enpass7=c0_q7.charCodeAt(0)-96;

for(; c0_i7<c0_fs1.length; c0_i7++) if( c0_fs1.substr(c0_i7,1)==" " ) break;
for(; c0_i7<c0_fs1.length; c0_i7++) if( c0_fs1.substr(c0_i7,1)!=" " ) break;

// remaining information is omitted

c0_set_board_situation( c0_fs2, c0_wK7, c0_wRL7, c0_wRR7, c0_wcastl7, c0_bK7, c0_bRL7, c0_bRR7, c0_bcastl7, c0_enpass7, c0_moveslist, c0_side7move );

}

//----------------------------------
// PGN parser on chess moves
//----------------------------------
function c0_get_from_PGN(c0_PGN_str) { // To get moveslist and header from PGN string...
	var save_PGN_text=PGN_text; 
	PGN_text= c0_PGN_str; 
	c0_PG_gettable(2); 
	PGN_text=save_PGN_text; 
	return c0_PG_1;
}

//----------------------------------
// PGN parser on chess moves
//----------------------------------
function c0_put_to_PGN(c0_moves_str)		// To write moveslist to PGN string...
{

if( c0_moves_str.length==0 ) c0_moves_str=c0_moveslist;

c0_errflag=false;
var c0_1save_position=c0_position;
var c0_1save_sidemoves=c0_sidemoves;
var c0_1save_wKingmoved=c0_wKingmoved;
var c0_1save_bKingmoved=c0_bKingmoved;
var c0_1save_wLRockmoved=c0_wLRockmoved;
var c0_1save_wRRockmoved=c0_wRRockmoved;
var c0_1save_bLRockmoved=c0_bLRockmoved;
var c0_1save_bRRockmoved=c0_bRRockmoved;
var c0_1save_w00=c0_w00;
var c0_1save_b00=c0_b00;
var c0_1save_become=c0_become;
var c0_1save_become_from_engine=c0_become_from_engine;
var c0_1save_lastmovepawn= c0_lastmovepawn;
var c0_1save_moveslist= c0_moveslist;

if( c0_start_FEN.length>0 ) { c0_set_FEN( c0_start_FEN ); c0_fischer_adjustmoved(); }
else
{
c0_position = "wpa2,wpb2,wpc2,wpd2,wpe2,wpf2,wpg2,wph2," +
"wRa1,wNb1,wBc1,wQd1,wKe1,wBf1,wNg1,wRh1," +
"bpa7,bpb7,bpc7,bpd7,bpe7,bpf7,bpg7,bph7," +
"bRa8,bNb8,bBc8,bQd8,bKe8,bBf8,bNg8,bRh8,";

c0_moveslist = "";

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
c0_become_from_engine="";

var c0_PGN_ret='';

var Result='';

var CR=( String.fromCharCode(13) +  String.fromCharCode(10) );
for(var c0_i7=0; c0_i7<c0_PGN_header.length; c0_i7++)
	{
	var c0_q9=c0_PGN_header[c0_i7].toUpperCase();
	var c0_at_q8=c0_q9.indexOf( "FEN " )
	if(c0_at_q8<0 && c0_fischer) c0_at_q8=c0_q9.indexOf( "SETUP " )
	if( c0_at_q8<0 || c0_at_q8>3 )
	{
	c0_PGN_ret += ( '[' + c0_PGN_header[c0_i7] + ']' + CR );
	var c0_at_q9=c0_q9.indexOf( "RESULT " );
	if( c0_at_q9>=0 )
		{
		Result=c0_PGN_header[c0_i7].substr( c0_at_q9 + 7 );
		Result=c0_ReplaceAll( Result, '"', '' );
		Result=c0_ReplaceAll( Result, "'", '' );
		Result=c0_ReplaceAll( Result, ' ', '' );
 		}
	}
	}
if( c0_start_FEN.length>0 )
	{
	if(c0_fischer) c0_PGN_ret += '[SetUp "1"]' + CR;
	c0_PGN_ret += '[FEN "' + c0_start_FEN + '"]' + CR;
	}
if( c0_PGN_ret.length>0 ) c0_PGN_ret += CR;

var c07_gaj=0;
var c07_col="b";

for( var c0_i7=0; c0_i7< c0_moves_str.length; )
 {
if(c07_col=="w") c07_col="b";
else { c07_col="w"; c07_gaj++; }


 var c0_move8=c0_moves_str.substr( c0_i7, 4 );
 c0_i7+=4;
 if( c0_i7< c0_moves_str.length && c0_moves_str.substr( c0_i7, 1 )=="[" )
	{
	c0_move8+=c0_moves_str.substr( c0_i7, 3 );
	c0_i7+=3;
	}

 var c0_move9=c0_to_Crafty_standard( c0_move8, c07_col );
 if( c0_move9.length>0 )
	{
	 if( c07_col=="w" ) c0_PGN_ret+=c07_gaj.toString() + ". ";
	c0_PGN_ret+=c0_move9 + " ";
	}
else { c0_errflag=true; break; }
}

if(!c0_errflag) c0_PGN_ret+=" " +Result;

c0_position=c0_1save_position;
c0_sidemoves=c0_1save_sidemoves;
c0_wKingmoved=c0_1save_wKingmoved;
c0_bKingmoved=c0_1save_bKingmoved;
c0_wLRockmoved=c0_1save_wLRockmoved;
c0_wRRockmoved=c0_1save_wRRockmoved;
c0_bLRockmoved=c0_1save_bLRockmoved;
c0_bRRockmoved=c0_1save_bRRockmoved;
c0_w00=c0_1save_w00;
c0_b00=c0_1save_b00;
c0_become=c0_1save_become;
c0_become_from_engine=c0_1save_become_from_engine;
c0_lastmovepawn=c0_1save_lastmovepawn;
c0_moveslist=c0_1save_moveslist;

//if(c0_errflag) alert("Can't parse " + c07_gaj.toString() + c07_col + ":" + c0_move8);

if( c0_start_FEN.length>0 )
	{
	c0_set_board_situation( c0_position, c0_wKingmoved, c0_wLRockmoved, c0_wRRockmoved, c0_w00, c0_bKingmoved, c0_bLRockmoved, c0_bRRockmoved, c0_b00, c0_lastmovepawn, c0_moveslist, c0_sidemoves );
	}

return c0_PGN_ret;
}

//-------------------------------------------------
// Crafty notation (quite a standard)
//-------------------------------------------------
function c0_to_Crafty_standard(c0_move,c0_color47)
{
 var c0_ret9=c0_fischer_cst_tCr(c0_move);
 if(c0_ret9.length>0)
	{
	c0_fischer_cstl_move(c0_move,false)
	c0_sidemoves=-c0_sidemoves;
	return c0_ret9;
	}

 c0_pos9=c0_position;
 var c0_at9=c0_position.indexOf( c0_move.substr(0,2) );
 var c0_at7=c0_position.indexOf( c0_move.substr(2,2) );
 c0_become_from_engine='';
 if( c0_move.length>4 ) c0_become_from_engine=c0_move.substr(5,1);

 if(c0_at9>=0 )
  {
  var c0_9figure=c0_position.substr( c0_at9-1,1 );
  var c0_9color=c0_position.substr( c0_at9-2,1 );
  if( c0_9color==c0_color47 )
   {
    var c0_Z4horiz=(c0_move.substr(0,1)).charCodeAt(0) - 96;
    var c0_Z4vert=parseInt(c0_move.substr(1,1));
    var c0_Z4from_at72 = c0_Z4vert.toString() + c0_Z4horiz.toString();
    var c0_Z5horiz=(c0_move.substr(2,1)).charCodeAt(0) - 96;
    var c0_Z5vert=parseInt(c0_move.substr(3,1));
    var c0_Z5to_at72 = c0_Z5vert.toString() + c0_Z5horiz.toString();

    if( c0_become_from_engine.length==0 && c0_9figure=="p" && (c0_Z5vert==8 || c0_Z5vert==1) ) c0_become_from_engine='Q';

    if( c0_can_be_moved( c0_Z4from_at72,c0_Z5to_at72,false ) )
      {
        if( c0_9figure!="p" )
	{
	var c0_figc9=0;
	for(var c0_i4=0;c0_position.length>c0_i4; c0_i4+=5)
	{
	var c0_Q4color=c0_position.substr(c0_i4,1);
	var c0_Q4figure=c0_position.substr(c0_i4+1,1);
	if(c0_Q4color==c0_color47 && c0_9figure==c0_Q4figure) c0_figc9++;
	}

	for(var c0_i4=0;c0_position.length>c0_i4; c0_i4+=5)
	{
	var c0_Q4color=c0_position.substr(c0_i4,1);
	var c0_Q4figure=c0_position.substr(c0_i4+1,1);
	var c0_Q4horiz=(c0_position.substr(c0_i4+2,1)).charCodeAt(0) - 96;
	var c0_Q4vert=parseInt(c0_position.substr(c0_i4+3,1));
	var c0_Q4from_at72 = c0_Q4vert.toString() + c0_Q4horiz.toString();
	var c0_Q4from_at7 = c0_position.substr(c0_i4+2,2);

	if(c0_Q4color==c0_color47 && c0_9figure==c0_Q4figure && c0_Q4from_at7 !=c0_move.substr(0,2) )
		{
		if( c0_can_be_moved( c0_Q4from_at72, c0_Z5to_at72,false))
			{
			if( c0_figc9 < 3 && c0_Z4horiz!=c0_Q4horiz )
				{
				c0_ret9 += c0_move.substr(0,1);
				}
			else
				{
				c0_ret9 += c0_move.substr(0,2) + "-" ;
				}
			break;
			}
		}
	}
	}
	c0_moveto( c0_Z4from_at72,c0_Z5to_at72,false );
	c0_sidemoves=-c0_sidemoves;
	
	if( c0_9figure=="K" && c0_9color=="w" && c0_move.substr(0,4) == "e1g1" ) c0_ret9="O-O";
	else if( c0_9figure=="K" && c0_9color=="b" && c0_move.substr(0,4) == "e8g8" ) c0_ret9="O-O";
	else if( c0_9figure=="K" && c0_9color=="w" && c0_move.substr(0,4) == "e1c1" ) c0_ret9="O-O-O";
	else if( c0_9figure=="K" && c0_9color=="b" && c0_move.substr(0,4) == "e8c8" ) c0_ret9="O-O-O";
		else
		{
	  	c0_ret9 = (c0_9figure=="p" ? '' : c0_9figure) + c0_ret9; 

		if( c0_pos9.length > c0_position.length )
			{
			 if( c0_ret9.substr( c0_ret9.length-1,1)=='-' ) c0_ret9=c0_ret9.substr(0,c0_ret9.length-1);
			 c0_ret9 += 'x';
			}

		if( c0_ret9.substr(0,1)=="x" ) c0_ret9= c0_move.substr(0,1) + c0_ret9;

		c0_ret9 +=c0_move.substr(2,2); 
		if( c0_become_from_engine.length>0 ) c0_ret9+= '=' + c0_become_from_engine;
		if( c0_is_mate_to_king( (c0_color47=="w" ? "b" : "w" ), true ) ) c0_ret9+= '#';
		else if( c0_is_check_to_king( (c0_color47=="w" ? "b" : "w" ) ) ) c0_ret9+= '+';
		}
       }
   }
  }
return c0_ret9;
}

//-------------------------------------------------
// Fischerrandom support functions...
//-------------------------------------------------

//------- Get castling settings into variable...
function c0_fisch_castl_save(c0_fen_c,c0_fen_pos)
{
c0_fischer_cst="";
var atW=c0_fen_pos.indexOf("wK");
var atB=c0_fen_pos.indexOf("bK");
if(atW>=0 && atB>=0)
	{
	c0_fischer_cst+=("{wK}"+c0_fen_pos.substr(atW,5)+"{bK}"+c0_fen_pos.substr(atB,5));

	for(var c0_q8=1; c0_q8<=16; c0_q8++)
		{
		var c0_ch=String.fromCharCode(c0_q8<9 ? 96+c0_q8 : 64+c0_q8-8);
		var c0_cl=(c0_q8<9 ? "b" : "w");
		var c0_vt=(c0_q8<9 ? "8" : "1");
		var c0_hz=String.fromCharCode(96+c0_q8-(c0_q8<9?0:8));
		var c0_rook=c0_cl+"R"+c0_hz+c0_vt+";";
		if(c0_fen_c.indexOf(c0_ch)>=0 && c0_fen_pos.indexOf(c0_rook)>=0)
		 {
		 if(c0_q8<9)
		  {
		  if(c0_fen_pos.substr(atB+2,1)>c0_hz) c0_fischer_cst+="{bLR}";
		  else c0_fischer_cst+="{bRR}";
		  }
		  else
		  {
		  if(c0_fen_pos.substr(atW+2,1)>c0_hz) c0_fischer_cst+="{wLR}";
		  else c0_fischer_cst+="{wRR}";
		  }
		 c0_fischer_cst+=c0_rook;
		 }
		}
	for(var c0_q8=0; c0_q8<c0_fen_pos.length; c0_q8+=5)
		{
		var c0_pc=c0_fen_pos.substr(c0_q8+1,1);
		if(c0_pc=="R")
		{
		var c0_cl=c0_fen_pos.substr(c0_q8,1);
		var c0_hz=c0_fen_pos.substr(c0_q8+2,1);
		var c0_rook=c0_fen_pos.substr(c0_q8,5);

		if(c0_cl=="w")
		{
		if(c0_fischer_cst.indexOf("{wLR}")<0 && c0_fen_c.indexOf("Q")>=0 &&
			c0_fen_pos.substr(atW+2,1)>c0_hz) c0_fischer_cst+="{wLR}"+c0_rook;
		else if(c0_fischer_cst.indexOf("{wRR}")<0 && c0_fen_c.indexOf("K")>=0 &&
			c0_fen_pos.substr(atW+2,1)<c0_hz) c0_fischer_cst+="{wRR}"+c0_rook;
		}
		else
		{
		if(c0_fischer_cst.indexOf("{bLR}")<0 && c0_fen_c.indexOf("q")>=0 &&
			c0_fen_pos.substr(atB+2,1)>c0_hz) c0_fischer_cst+="{bLR}"+c0_rook;
		else if(c0_fischer_cst.indexOf("{bRR}")<0 && c0_fen_c.indexOf("k")>=0 &&
			c0_fen_pos.substr(atB+2,1)<c0_hz) c0_fischer_cst+="{bRR}"+c0_rook;
		}
		}
		}
	}
}

//------- Adjust main variables after position is set...
function c0_fischer_adjustmoved()
{
if(c0_fischer_cst.indexOf("{bLR}")>=0 && c0_fischer_cst.indexOf("{bK}")>=0)
	{ c0_bKingmoved = false; c0_bLRockmoved = false; c0_b00 = false; }
if(c0_fischer_cst.indexOf("{bRR}")>=0 && c0_fischer_cst.indexOf("{bK}")>=0)
	{ c0_bKingmoved = false; c0_bRRockmoved = false; c0_b00 = false; }
if(c0_fischer_cst.indexOf("{wLR}")>=0 && c0_fischer_cst.indexOf("{wK}")>=0)
	{ c0_wKingmoved = false; c0_wLRockmoved = false; c0_w00 = false; }
if(c0_fischer_cst.indexOf("{wRR}")>=0 && c0_fischer_cst.indexOf("{wK}")>=0)
	{ c0_wKingmoved = false; c0_wRRockmoved = false; c0_w00 = false; }
}

//------- Does fischer movings for castling...
function c0_fischer_cstl_move(c0_moving,c0_draw)
{
var c0_king="";
var c0_rook="";
var c0_king2="";
var c0_rook2="";

if(c0_moving.substr(0,4)=="00**")
	{
	if(c0_sidemoves>0)
		{
		c0_king=c0_fischer_cst.substr( c0_fischer_cst.indexOf("{wK}")+4,4 );
		c0_rook=c0_fischer_cst.substr( c0_fischer_cst.indexOf("{wRR}")+5,4 );
		c0_king2="wKg1"; c0_rook2="wRf1";
		c0_wKingmoved=true;c0_wLRockmoved=true;c0_wRRockmoved=true;c0_w00=true;
		}
	else
		{
		c0_king=c0_fischer_cst.substr( c0_fischer_cst.indexOf("{bK}")+4,4 );
		c0_rook=c0_fischer_cst.substr( c0_fischer_cst.indexOf("{bRR}")+5,4 );	
		c0_king2="bKg8"; c0_rook2="bRf8";
		c0_bKingmoved=true;c0_bLRockmoved=true;c0_bRRockmoved=true;c0_b00=true;
		}
	}
else if(c0_moving.substr(0,4)=="000*")
	{
	if(c0_sidemoves>0)
		{
		c0_king=c0_fischer_cst.substr( c0_fischer_cst.indexOf("{wK}")+4,4 );
		c0_rook=c0_fischer_cst.substr( c0_fischer_cst.indexOf("{wLR}")+5,4 );
		c0_king2="wKc1"; c0_rook2="wRd1";
		c0_wKingmoved=true;c0_wLRockmoved=true;c0_wRRockmoved=true;c0_w00=true;
		}
	else
		{
		c0_king=c0_fischer_cst.substr( c0_fischer_cst.indexOf("{bK}")+4,4 );
		c0_rook=c0_fischer_cst.substr( c0_fischer_cst.indexOf("{bLR}")+5,4 );
		c0_king2="bKc8"; c0_rook2="bRd8";
		c0_bKingmoved=true;c0_bLRockmoved=true;c0_bRRockmoved=true;c0_b00=true;
		}
	}
else
	{
	var c0_from_at=c0_moving.substr(0,2);
	var c0_to_at=c0_moving.substr(2,2);
	c0_moveto(c0_convH888(c0_from_at), c0_convH888(c0_to_at), c0_draw);
	}

if(c0_king.length>0 && c0_rook.length>0)
	{
	if(c0_draw)
		{
		c0_clear_at(c0_king.substr(2,2));
		c0_clear_at(c0_rook.substr(2,2));
		c0_add_piece(c0_king2.substr(0,2)+c0_rook2.substr(2,2));
		c0_moveto(c0_convH888(c0_rook2.substr(2,2)), c0_convH888(c0_king2.substr(2,2)), c0_draw);
		c0_add_piece(c0_rook2);
		}
	else
		{
		if(!(c0_king==c0_king2)) c0_position=c0_ReplaceAll(c0_position,c0_king,c0_king2);
		if(!(c0_rook==c0_rook2)) c0_position=c0_ReplaceAll(c0_position,c0_rook,c0_rook2);
		}
	}
}

//------- Saves fischer movings for castling from Crafty standard...
function c0_fischer_cst_fCr(c0_move)
{
var c0_ret8="";
if(c0_fischer)
{
if(c0_move.substr(0,5)=="O-O-O" || c0_move.substr(0,5)=="0-0-0") c0_ret8="000*";
else if(c0_move.substr(0,3)=="O-O" || c0_move.substr(0,3)=="0-0") c0_ret8="00**";
}
return c0_ret8;
}

//------- Saves to Crafty standard...
function c0_fischer_cst_tCr(c0_move){
var c0_ret8="";
if(c0_fischer){
if(c0_move.substr(0,4)=="000*") c0_ret8="0-0-0";
else if(c0_move.substr(0,4)=="00**") c0_ret8="0-0";
}
return c0_ret8;
}

//--------------------------------------------------------------
// Short notation encoding (internal for this libraries only)
//--------------------------------------------------------------

//------- Short notation move->code or code->move...
function c0_shortCode(ch7,P1){
 var cDret='';
 var cDp0="abcdefghijklmnopqrstuvxyz0123456789ABCDEFGHIJKLMNOPQRSTUVXYZ";
 var cf1s=c0_f_evals1;
 var cf2s=c0_f_evals2;
 c0_f_evals1=null;
 c0_f_evals2=null;
 var cDp=c0_get_next_moves();
 c0_f_evals1=cf1s;
 c0_f_evals2=cf2s;
 var cDp1='';
 for(var c77=0;c77<cDp.length;c77+=5){
  var c7move=cDp.substr(c77,4);
  if( ( c0_position.charAt( c0_position.indexOf(c7move.substr(0,2))-1 )=="p" ) &&
	 (("18").indexOf( c7move.charAt(3) )>=0) )
		{
		cDp1+=c7move+"[Q]"+';'+c7move+"[R]"+';'+c7move+"[B]"+';'+c7move+"[N]"+';';
		}
  else cDp1+=c7move+'   ;';
  if(cDp.charAt(c77+4)=="[") c77+=3;
 }

 if(ch7==1)
	{
	var cDcmp=P1;
	if((cDcmp.length>4) && (cDcmp.substr(4,3)=="[0]")) cDcmp=cDcmp.substr(0,4);
	cDret=cDp0.charAt(cDp1.indexOf(cDcmp)/8);
	}
 else if(ch7==-1)
	{
	var cDmove=cDp1.substr( (cDp0.indexOf(P1))*8,7);
	c0_become_from_engine=cDmove.charAt(5);
	if(c0_become_from_engine==' ') c0_become_from_engine='Q';
	c0_become=c0_become_from_engine;
	if( ("Q ").indexOf( cDmove.charAt(5) )>=0 ) cDmove=cDmove.substr(0,4);
	cDret=cDmove;
	}
 return cDret;
}

//------- Converts short notation to moveslist...
function c0_short2list()
{
c0_errflag=false;
var c0_1save_position=c0_position;
var c0_1save_sidemoves=c0_sidemoves;
var c0_1save_wKingmoved=c0_wKingmoved;
var c0_1save_bKingmoved=c0_bKingmoved;
var c0_1save_wLRockmoved=c0_wLRockmoved;
var c0_1save_wRRockmoved=c0_wRRockmoved;
var c0_1save_bLRockmoved=c0_bLRockmoved;
var c0_1save_bRRockmoved=c0_bRRockmoved;
var c0_1save_w00=c0_w00;
var c0_1save_b00=c0_b00;
var c0_1save_become=c0_become;
var c0_1save_become_from_engine=c0_become_from_engine;
var c0_1save_lastmovepawn= c0_lastmovepawn;
var c0_1save_moveslist= c0_moveslist;

c0_moveslist = "";		// will contain moves on return...

if( c0_start_FEN.length>0 ) { c0_set_FEN( c0_start_FEN ); c0_fischer_adjustmoved(); }
else
{
c0_position = "wpa2,wpb2,wpc2,wpd2,wpe2,wpf2,wpg2,wph2," +
"wRa1,wNb1,wBc1,wQd1,wKe1,wBf1,wNg1,wRh1," +
"bpa7,bpb7,bpc7,bpd7,bpe7,bpf7,bpg7,bph7," +
"bRa8,bNb8,bBc8,bQd8,bKe8,bBf8,bNg8,bRh8,";

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
c0_become_from_engine="";

for( var c0_i7=0; c0_i7< c0_PG_sh.length; c0_i7++){
 var c0_move8=c0_shortCode(-1,c0_PG_sh.charAt(c0_i7));
 if(c0_move8.length<4) { c0_errflag=true; break; }
 if(c0_fischer) c0_fischer_cstl_move(c0_move8.substr(0,4),true);
 else c0_moveto(c0_convH888(c0_move8.substr(0,2)),c0_convH888(c0_move8.substr(2,2)), true);
 c0_sidemoves=-c0_sidemoves;
}

c0_position=c0_1save_position;
c0_sidemoves=c0_1save_sidemoves;
c0_wKingmoved=c0_1save_wKingmoved;
c0_bKingmoved=c0_1save_bKingmoved;
c0_wLRockmoved=c0_1save_wLRockmoved;
c0_wRRockmoved=c0_1save_wRRockmoved;
c0_bLRockmoved=c0_1save_bLRockmoved;
c0_bRRockmoved=c0_1save_bRRockmoved;
c0_w00=c0_1save_w00;
c0_b00=c0_1save_b00;
c0_become=c0_1save_become;
c0_become_from_engine=c0_1save_become_from_engine;
c0_lastmovepawn=c0_1save_lastmovepawn;
//c0_moveslist=c0_1save_moveslist;
//if(c0_errflag) alert("Can't parse encoded chess game ");

if( c0_start_FEN.length>0 ){
	c0_set_board_situation( c0_position, c0_wKingmoved, c0_wLRockmoved, c0_wRRockmoved, c0_w00, c0_bKingmoved, c0_bLRockmoved, c0_bRRockmoved, c0_b00, c0_lastmovepawn, c0_moveslist, c0_sidemoves );
	}
}
