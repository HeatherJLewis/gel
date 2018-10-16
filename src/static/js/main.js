function _classCallCheck(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}var Sticky=function(){function t(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};_classCallCheck(this,t),this.selector=i,this.elements=[],this.version="1.2.0",this.vp=this.getViewportSize(),this.body=document.querySelector("body"),this.options={wrap:e.wrap||!1,marginTop:e.marginTop||0,stickyFor:e.stickyFor||0,stickyClass:e.stickyClass||null,stickyContainer:e.stickyContainer||"body"},this.updateScrollTopPosition=this.updateScrollTopPosition.bind(this),this.updateScrollTopPosition(),window.addEventListener("load",this.updateScrollTopPosition),window.addEventListener("scroll",this.updateScrollTopPosition),this.run()}return t.prototype.run=function(){var t=this,i=setInterval(function(){if("complete"===document.readyState){clearInterval(i);var e=document.querySelectorAll(t.selector);t.forEach(e,function(i){return t.renderElement(i)})}},10)},t.prototype.renderElement=function(t){var i=this;t.sticky={},t.sticky.active=!1,t.sticky.marginTop=parseInt(t.getAttribute("data-margin-top"))||this.options.marginTop,t.sticky.stickyFor=parseInt(t.getAttribute("data-sticky-for"))||this.options.stickyFor,t.sticky.stickyClass=t.getAttribute("data-sticky-class")||this.options.stickyClass,t.sticky.wrap=!!t.hasAttribute("data-sticky-wrap")||this.options.wrap,t.sticky.stickyContainer=this.options.stickyContainer,t.sticky.container=this.getStickyContainer(t),t.sticky.container.rect=this.getRectangle(t.sticky.container),t.sticky.rect=this.getRectangle(t),"img"===t.tagName.toLowerCase()&&(t.onload=function(){return t.sticky.rect=i.getRectangle(t)}),t.sticky.wrap&&this.wrapElement(t),this.activate(t)},t.prototype.wrapElement=function(t){t.insertAdjacentHTML("beforebegin","<span></span>"),t.previousSibling.appendChild(t)},t.prototype.activate=function(t){t.sticky.rect.top+t.sticky.rect.height<t.sticky.container.rect.top+t.sticky.container.rect.height&&t.sticky.stickyFor<this.vp.width&&!t.sticky.active&&(t.sticky.active=!0),this.elements.indexOf(t)<0&&this.elements.push(t),t.sticky.resizeEvent||(this.initResizeEvents(t),t.sticky.resizeEvent=!0),t.sticky.scrollEvent||(this.initScrollEvents(t),t.sticky.scrollEvent=!0),this.setPosition(t)},t.prototype.initResizeEvents=function(t){var i=this;t.sticky.resizeListener=function(){return i.onResizeEvents(t)},window.addEventListener("resize",t.sticky.resizeListener)},t.prototype.destroyResizeEvents=function(t){window.removeEventListener("resize",t.sticky.resizeListener)},t.prototype.onResizeEvents=function(t){this.vp=this.getViewportSize(),t.sticky.rect=this.getRectangle(t),t.sticky.container.rect=this.getRectangle(t.sticky.container),t.sticky.rect.top+t.sticky.rect.height<t.sticky.container.rect.top+t.sticky.container.rect.height&&t.sticky.stickyFor<this.vp.width&&!t.sticky.active?t.sticky.active=!0:(t.sticky.rect.top+t.sticky.rect.height>=t.sticky.container.rect.top+t.sticky.container.rect.height||t.sticky.stickyFor>=this.vp.width&&t.sticky.active)&&(t.sticky.active=!1),this.setPosition(t)},t.prototype.initScrollEvents=function(t){var i=this;t.sticky.scrollListener=function(){return i.onScrollEvents(t)},window.addEventListener("scroll",t.sticky.scrollListener)},t.prototype.destroyScrollEvents=function(t){window.removeEventListener("scroll",t.sticky.scrollListener)},t.prototype.onScrollEvents=function(t){t.sticky.active&&this.setPosition(t)},t.prototype.setPosition=function(t){this.css(t,{position:"",width:"",top:"",left:""}),this.vp.height<t.sticky.rect.height||!t.sticky.active||(t.sticky.rect.width||(t.sticky.rect=this.getRectangle(t)),t.sticky.wrap&&this.css(t.parentNode,{display:"block",width:t.sticky.rect.width+"px",height:t.sticky.rect.height+"px"}),0===t.sticky.rect.top&&t.sticky.container===this.body?this.css(t,{position:"fixed",top:t.sticky.rect.top+"px",left:t.sticky.rect.left+"px",width:t.sticky.rect.width+"px"}):this.scrollTop>t.sticky.rect.top-t.sticky.marginTop?(this.css(t,{position:"fixed",width:t.sticky.rect.width+"px",left:t.sticky.rect.left+"px"}),this.scrollTop+t.sticky.rect.height+t.sticky.marginTop>t.sticky.container.rect.top+t.sticky.container.offsetHeight?(t.sticky.stickyClass&&t.classList.remove(t.sticky.stickyClass),this.css(t,{top:t.sticky.container.rect.top+t.sticky.container.offsetHeight-(this.scrollTop+t.sticky.rect.height)+"px"})):(t.sticky.stickyClass&&t.classList.add(t.sticky.stickyClass),this.css(t,{top:t.sticky.marginTop+"px"}))):(t.sticky.stickyClass&&t.classList.remove(t.sticky.stickyClass),this.css(t,{position:"",width:"",top:"",left:""}),t.sticky.wrap&&this.css(t.parentNode,{display:"",width:"",height:""})))},t.prototype.update=function(){var t=this;this.forEach(this.elements,function(i){i.sticky.rect=t.getRectangle(i),i.sticky.container.rect=t.getRectangle(i.sticky.container),t.activate(i),t.setPosition(i)})},t.prototype.destroy=function(){var t=this;this.forEach(this.elements,function(i){t.destroyResizeEvents(i),t.destroyScrollEvents(i),delete i.sticky})},t.prototype.getStickyContainer=function(t){for(var i=t.parentNode;!i.hasAttribute("data-sticky-container")&&!i.parentNode.querySelector(t.sticky.stickyContainer)&&i!==this.body;)i=i.parentNode;return i},t.prototype.getRectangle=function(t){this.css(t,{position:"",width:"",top:"",left:""});var i=Math.max(t.offsetWidth,t.clientWidth,t.scrollWidth),e=Math.max(t.offsetHeight,t.clientHeight,t.scrollHeight),s=0,o=0;do{s+=t.offsetTop||0,o+=t.offsetLeft||0,t=t.offsetParent}while(t);return{top:s,left:o,width:i,height:e}},t.prototype.getViewportSize=function(){return{width:Math.max(document.documentElement.clientWidth,window.innerWidth||0),height:Math.max(document.documentElement.clientHeight,window.innerHeight||0)}},t.prototype.updateScrollTopPosition=function(){this.scrollTop=(window.pageYOffset||document.scrollTop)-(document.clientTop||0)||0},t.prototype.forEach=function(t,i){for(var e=0,s=t.length;e<s;e++)i(t[e])},t.prototype.css=function(t,i){for(var e in i)i.hasOwnProperty(e)&&(t.style[e]=i[e])},t}();!function(t,i){"undefined"!=typeof exports?module.exports=i:"function"==typeof define&&define.amd?define([],i):t.Sticky=i}(this,Sticky);!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.MenuSpy=e()}(this,function(){"use strict";var t=function(t,e){for(var s in e)e.hasOwnProperty(s)&&(t[s]=e[s]);return t},e=function(t){var e=t.getBoundingClientRect();return{top:e.top+window.pageYOffset,left:e.left+window.pageXOffset}},s=function(){return window.pageYOffset||document.documentElement.scrollTop},n=function(t,e){if(t.classList)t.classList.add(e);else{var s=t.className.split(" ");-1===s.indexOf(e)&&s.push(e),t.className=s.join(" ")}},i=function(t,e){t.classList?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," ")},o=function(t,e){var s=null;return function(){var n=arguments,i=this;s||(s=setTimeout(function(){return s=0,t.apply(i,n)},e))}},l=function(e,n){var i=this;if(e){this.element="string"==typeof e?document.querySelector(e):e,this.options=t({menuItemSelector:'a[href^="#"]',activeClass:"active",threshold:15,enableLocationHash:!0,hashTimeout:600,callback:null},n),this.assignValues(),this.debouncedAssignValuesFn=o(function(){return i.assignValues()}),window.addEventListener("resize",this.debouncedAssignValuesFn),this.debouncedHashFn=o(function(){var t=i.lastInViewElm?"#"+i.lastInViewElm.id:"#";if(history.replaceState)history.replaceState(null,null,t);else{var e=s();window.location.hash=t,window.scrollTo(0,e)}},this.options.hashTimeout),this.cacheItems(),this.scrollFn()}};return l.prototype.assignValues=function(){this.currScrollTop=0,this.lastInViewElm=null,this.menuHeight=this.element.offsetHeight+this.options.threshold,this.menuItems=[].slice.call(this.element.querySelectorAll(this.options.menuItemSelector)),this.raf=null},l.prototype.cacheItems=function(){this.scrollItems=this.menuItems.map(function(t){var s=t.dataset.target?document.querySelector(t.dataset.target):document.getElementById(t.hash.slice(1));return!!s&&{elm:t,target:s,offset:Math.floor(e(s).top)}}),this.scrollItems=this.scrollItems.filter(Boolean).sort(function(t,e){return t.offset-e.offset})},l.prototype.tick=function(){var t=this.currScrollTop+this.menuHeight,e=this.scrollItems.filter(function(e){return e.offset<t});this.activateItem(e.pop())},l.prototype.activateItem=function(t){var e=this,s=this.options,o=s.activeClass,l=s.callback;if(!t)return this.scrollItems.forEach(function(t){return i(t.elm.parentNode,o)}),this.lastInViewElm=null,void(this.options.enableLocationHash&&this.debouncedHashFn());this.lastInViewElm!==t.target&&(this.lastInViewElm=t.target,this.scrollItems.forEach(function(s){i(s.elm.parentNode,o),s.target===t.target&&(n(s.elm.parentNode,o),"function"==typeof l&&l.call(e,s),e.options.enableLocationHash&&e.debouncedHashFn())}))},l.prototype.scrollFn=function(){var t=s();this.currScrollTop!==t&&(this.currScrollTop=t,this.tick()),this.raf=window.requestAnimationFrame(this.scrollFn.bind(this))},l.prototype.destroy=function(){this.raf&&window.cancelAnimationFrame(this.raf),window.removeEventListener("resize",this.debouncedAssignValuesFn)},l});