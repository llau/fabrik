var FbCheckBox=new Class({Extends:FbElement,initialize:function(b,a){this.plugin="fabrikcheckbox";this.parent(b,a);this._getSubElements();this.watchAdd()},watchAddToggle:function(){var h=this.getContainer();var f=h.getElement("div.addoption");var b=h.getElement(".toggle-addoption");if(this.mySlider){var g=f.clone();var e=h.getElement(".fabrikElement");f.getParent().destroy();e.adopt(g);f=h.getElement("div.addoption");f.setStyle("margin",0)}this.mySlider=new Fx.Slide(f,{duration:500});this.mySlider.hide();b.addEvent("click",function(a){a.stop();this.mySlider.toggle()}.bind(this))},watchAdd:function(){var a;if(this.options.allowadd===true&&this.options.editable!==false){var d=this.options.element;var b=this.getContainer();b.getElement("input[type=button]").addEvent("click",function(j){var c=b.getElement("input[name=addPicklistLabel]");var f=b.getElement("input[name=addPicklistValue]");var g=c.value;if(f){a=f.value}else{a=g}if(a===""||g===""){alert(Joomla.JText._("PLG_ELEMENT_CHECKBOX_ENTER_VALUE_LABEL"))}else{var h=this.subElements.getLast().findUp("li").clone();h.getElement("input").value=a;var i=h.getElement("input").id.replace(d+"_","").toInt();i++;h.getElement("input").checked="checked";h.getElement("input").id=d+"_"+i;h.getElement("label").setProperty("for",d+"_"+i);h.getElement("span").set("text",g);h.inject(this.subElements.getLast().findUp("li"),"after");this._getSubElements();j.stop();if(f){f.value=""}c.value="";this.addNewOption(a,g);this.mySlider.toggle()}}.bind(this))}},getValue:function(){if(!this.options.editable){return this.options.value}var a=[];if(!this.options.editable){return this.options.value}this._getSubElements().each(function(b){if(b.checked){a.push(b.get("value"))}});return a},addNewEvent:function(action,js){if(action==="load"){this.loadEvents.push(js);this.runLoadEvent(js)}else{this._getSubElements();this.subElements.each(function(el){el.addEvent(action,function(e){eval(js)})})}},_getSubElements:function(){if(!this.element){this.subElements=$A()}else{this.subElements=this.element.getElements("input")}return this.subElements},numChecked:function(){return this._getSubElements().filter(function(a){return a.checked}).length},update:function(b){if(typeOf(b)==="string"){b=b===""?[]:JSON.decode(b)}if(!this.options.editable){this.element.innerHTML="";if(b===""){return}var a=$H(this.options.data);b.each(function(c){this.element.innerHTML+=a.get(c)+"<br />"}.bind(this));return}this._getSubElements();this.subElements.each(function(c){var d=false;b.each(function(e){if(e===c.value){d=true}}.bind(this));c.checked=d}.bind(this))},cloned:function(){if(this.options.allowadd===true&&this.options.editable!==false){this.watchAddToggle();this.watchAdd()}}});