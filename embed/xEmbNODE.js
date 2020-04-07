//                                                        
var Embed=(function(){
  'use strict';
  //                                                        
  var _privateProperty = 'Hello World';                     //accessible by your functions but not in the global context
  function _privateMethod() {console.log(_privateProperty);}//  var privateMethod = function () {};  
  var publicProperty = 'I am a public property';
  function publicMethod() { _privateMethod();}              // I can call `privateMethod()` you know...
  //                                                        
  
  function _parentNode(_idnode){ //get parentNode
    var x = _Node(_idnode);
    if (x) {return x;} //parent there x
    else {return document.body;};
  }
  function _Node(_idnode){return document.getElementById(_idnode);}

  function _new_HTML(_idPARENT, Attribute_html) {/* Plugin HTML elements */ /* create embed div. */
    var NewDIV = document.createElement('div'); 
    NewDIV.textContent = "NewDIV.textContent";
    NewDIV.setAttribute('w3_include_html', Attribute_html);
    _parentNode(_idPARENT).appendChild(NewDIV);
    _includeHTML();
  };
  function _includeHTML() { /* embed HTML elements from a page*/
    var zTag, i, eleman, file, xhttp;  
    zTag = document.getElementsByTagName("*");
    for (i = 0; i < zTag.length; i++) {							/*loop through a collection of all HTML elements:*/
      eleman = zTag[i];    
      file = eleman.getAttribute("w3_include_html");	/*search for elements with a certain atrribute:*/
      if (file) { xhttp = new XMLHttpRequest();       /*make an HTTP request using the attribute value as the file name:*/
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {eleman.innerHTML = this.responseText;}
            if (this.status == 404) {eleman.innerHTML = "Page not found.";}
            //eleman.removeAttribute("w3_include_html");			/*remove the attribute, and call this function once more:*/
            //_includeHTML();
          }
        }      
        xhttp.open("GET", file, true);
        xhttp.send();      
        return;/*exit the function:*/
      }
    }
  };
  function _new_DIV(_idPARENT,_idnode) {var NewDIV = document.createElement('div');							//create _new_DIV
    NewDIV.id = _idnode;
    NewDIV.textContent = "div.text@"+_idnode;
    _parentNode(_idPARENT).appendChild(NewDIV);
  }
  function _new_PARAGRAPH(_idPARENT,_idnode,_newTEXT) {var para = document.createElement("P");	//create _new_PARAGRAPH    
    var t = document.createTextNode(_newTEXT+"@PARAGRAPH("+_idnode+')@'+_idPARENT);
    para.appendChild(t);
    para.id = _idnode;
    _parentNode(_idPARENT).appendChild(para);
  }
  function _new_SPAN(_idPARENT,_idnode) {var span = document.createElement('span');							//create _new_SPAN    
    span.textContent = "span.text@"+_idnode;
    span.id = _idnode;
    _parentNode(_idPARENT).appendChild(span)
  }
  function _new_UL(_idPARENT,_idnode) {var _UL = document.createElement('UL');          				//create _new_UL    
    _UL.id = _idnode;
    _parentNode(_idPARENT).appendChild(_UL);
  }
  function _new_LI(_idPARENT,_idnode,_text,_order) {var newItem = document.createElement("LI");	//create _new_LI    
    var textnode = document.createTextNode(_text);
    newItem.appendChild(textnode);
		var _UL = _parentNode(_idPARENT);
		if (_order) {_UL.insertBefore(newItem, _UL.childNodes[0]);}
		else {_UL.appendChild(newItem);}
  }
  function _new_BUTTON(_idPARENT,_idnode) {var btn = document.createElement("BUTTON");					//create _new_BUTTON
    var t = document.createTextNode(_idnode+"@"+_idPARENT);
    btn.appendChild(t);
    btn.setAttribute("id", _idnode);
    _parentNode(_idPARENT).appendChild(btn);						//document.body.appendChild(btn);	
  }
  function _new_IMAGE(_idPARENT,_idnode) {var img = document.createElement("img");							//create _new_IMAGE
    img.id = _idnode;
    _parentNode(_idPARENT).appendChild(img);
  }
  function _new_MEDIA(_idPARENT,_idnode) {var swf = document.createElement("EMBED");						//create _new_MEDIA
    swf.setAttribute("id", _idnode);
    _parentNode(_idPARENT).appendChild(x);
  }
	function _new_SCRIPT(_idnode,_Specify){var script = document.createElement("script");									//create _new_SCRIPT
    script.id = _idnode;
		script.type = "text/javascript";
		script.src = _Specify; 
		document.getElementsByTagName("head")[0].appendChild(script);
		//return false;
	}
  function _Resize(_idnode,_height,_width) { var x = document.getElementById(_idnode);x.height = _height; x.width = _width;}
  function _Attribute(_idnode,_idnew,_Specify) {document.getElementById(_idnode).setAttribute(_idnew, _Specify);}
  function _Remove(_idnode) {document.getElementById(_idnode).remove();}

  return {// declare public variables and/or functions
    HTML:  	_new_HTML,
    SCRIPT: _new_SCRIPT,
    DIV:    _new_DIV,
    PARA:   _new_PARAGRAPH,
    SPAN:   _new_SPAN,
    UL:     _new_UL,
    LI:     _new_LI,
    BUTTON: _new_BUTTON,
    IMAGE:  _new_IMAGE,
    SIZE:		_Resize,
    ATTR:  	_Attribute,
    NODE:  	_Node,
    REMOVE:	_Remove,
    publicMethod: publicMethod,
    publicProperty: publicProperty
    //
  };
}()) 

function method() {
  Embed.HTML(_idPARENT, Attribute_html);
  Embed.SCRIPT(_idnode,_Specify);
  Embed.DIV(_idPARENT,_idnode);
  Embed.PARA(_idPARENT,_idnode,_newTEXT);
  Embed.SPAN(_idPARENT,_idnode);
  Embed.UL(_idPARENT,_idnode);
  Embed.LI(_idPARENT,_idnode,_text,_order);
  Embed.BUTTON(_idPARENT,_idnode);
  Embed.IMAGE(_idPARENT,_idnode);
  Embed.SIZE(_idnode,_height,_width);
  Embed.ATTR(_idnode,_idnew,_Specify);
	Embed.NODE(_idnode);
	Embed.REMOVE(_idnode);
	
  Embed.publicMethod();                 // outputs 'Hello World'   
  console.log(Embed.publicProperty);    // outputs 'I am a public property'
  console.log(Embed._privateProperty);    // is undefined protected by the module closure
  Embed._privateMethod();                 // is TypeError protected by the module closure
	//parent_div.insertBefore(para,child_para);
	//parent_div.removeChild(child); //not on ie
	//parent_div.replaceChild(para, child_para);
	
	/* the module pattern would look something like this:
	
	/* The easiest way to find an HTML element in the DOM, is by using the element id.
	/* var myElement = document.getElementById("intro"); 
	/* var y = myElement.getElementsByTagName("p"); 
	/* var x = document.getElementsByClassName("intro"); var x = document.querySelectorAll("p.intro"); 
	/* document.getElementById("demo").innerHTML = 'The 2nd dom (index 1) with class="intro": ' + x[1].innerHTML;  */
}






