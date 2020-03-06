/*! For license information please see main.js.LICENSE.txt */
module.exports=function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s="YMrE")}({"7W2i":function(t,e,r){var n=r("SksO");t.exports=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&n(t,e)}},DzBc:function(t,e){t.exports=require("alo")},J4zp:function(t,e,r){var n=r("wTVA"),o=r("m0LI"),i=r("wkBT");t.exports=function(t,e){return n(t)||o(t,e)||i()}},Nsbk:function(t,e){function r(e){return t.exports=r=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},r(e)}t.exports=r},PJYZ:function(t,e){t.exports=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}},SksO:function(t,e){function r(e,n){return t.exports=r=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},r(e,n)}t.exports=r},W8MJ:function(t,e){function r(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}t.exports=function(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}},YMrE:function(t,e,r){"use strict";r.r(e);var n=r("J4zp"),o=r.n(n),i=r("lwsE"),u=r.n(i),s=r("W8MJ"),c=r.n(s),a=r("a1gu"),p=r.n(a),f=r("Nsbk"),l=r.n(f),b=r("PJYZ"),v=r.n(b),y=r("7W2i"),h=r.n(y),d=r("lSNA"),O=r.n(d),m=r("DzBc"),w=r("cDcd");function g(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}var j=function(t){var e=t.view,r=t.createState;return function(t){return Object(w.createElement)(S,function(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?g(Object(r),!0).forEach((function(e){O()(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):g(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}({},t,{view:e,createState:r}))}},S=function(t){function e(){var t,r;u()(this,e);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return r=p()(this,(t=l()(e)).call.apply(t,[this].concat(o))),O()(v()(r),"rendering",!1),O()(v()(r),"updating",!1),O()(v()(r),"computation",void 0),O()(v()(r),"renderedVnode",void 0),O()(v()(r),"id",void 0),O()(v()(r),"computing",!1),O()(v()(r),"observers",[]),O()(v()(r),"observeFunctions",[]),O()(v()(r),"$state",void 0),O()(v()(r),"$props",Object(m.observable)({view:null,createState:null})),O()(v()(r),"knownKeys",{view:!0,createState:!0}),O()(v()(r),"$computed",void 0),O()(v()(r),"viewObserver",(function(t){return r.computing?(r.$props.view&&(r.view=r.$props.view),r.renderedVnode=r.view(r.$props,r.$state,t),r.updating=!0,r.rendering||r.forceUpdate(),r.renderedVnode):r.renderedVnode})),r}return h()(e,t),c()(e,[{key:"observe",value:function(t){this.observeFunctions.push(t)}},{key:"startObservers",value:function(){var t=!0,e=!1,r=void 0;try{for(var n,o=this.observeFunctions[Symbol.iterator]();!(t=(n=o.next()).done);t=!0){var i=n.value;this.observers.push(Object(m.observe)(i))}}catch(t){e=!0,r=t}finally{try{t||null==o.return||o.return()}finally{if(e)throw r}}}},{key:"stopObservers",value:function(){for(var t=0,e=Object.values(this.observers);t<e.length;t++){(0,e[t])()}this.observers=[]}},{key:"startComputation",value:function(){this.computing=!0;var t=Object(m.computation)(this.createComputation()),e=o()(t,2),r=e[0],n=e[1];this.$computed=r,this.computation=n}},{key:"stopComputation",value:function(){this.computing=!1,this.computation(),this.computation=null}},{key:"createComputation",value:function(){return{viewObserver:this.viewObserver}}},{key:"UNSAFE_componentWillMount",value:function(){this.mapPropsToOps(),null!=this.props.createState&&(this.createState=this.props.createState),this.$state=Object(m.observable)(this.createState()),this.observeFunctions&&(this.startObservers(),this.stopObservers()),this.startComputation(),this.stopComputation()}},{key:"mapPropsToOps",value:function(){var t=Object.keys(this.props);Object(m.batchStart)();for(var e=0,r=t;e<r.length;e++){var n=r[e],o=this.props[n];null==this.knownKeys[n]?(this.knownKeys[n]=!0,Object(m.setProp)(this.$props,n,o)):this.$props[n]=o}Object(m.batchEnd)()}},{key:"createState",value:function(){return this.state||{}}},{key:"componentDidMount",value:function(){this.startObservers(),this.startComputation()}},{key:"componentWillUnmount",value:function(){this.stopComputation(),this.stopObservers()}},{key:"view",value:function(t,e,r){}},{key:"render",value:function(){return this.rendering=!0,this.updating||this.mapPropsToOps(),this.updating=!1,this.rendering=!1,this.renderedVnode}}]),e}(w.Component);r.d(e,"observerHOC",(function(){return j})),r.d(e,"Observer",(function(){return S}))},a1gu:function(t,e,r){var n=r("cDf5"),o=r("PJYZ");t.exports=function(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?o(t):e}},cDcd:function(t,e){t.exports=require("react")},cDf5:function(t,e){function r(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=r=function(t){return typeof t}:t.exports=r=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(e)}t.exports=r},lSNA:function(t,e){t.exports=function(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}},lwsE:function(t,e){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},m0LI:function(t,e){t.exports=function(t,e){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)){var r=[],n=!0,o=!1,i=void 0;try{for(var u,s=t[Symbol.iterator]();!(n=(u=s.next()).done)&&(r.push(u.value),!e||r.length!==e);n=!0);}catch(t){o=!0,i=t}finally{try{n||null==s.return||s.return()}finally{if(o)throw i}}return r}}},wTVA:function(t,e){t.exports=function(t){if(Array.isArray(t))return t}},wkBT:function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}}});
//# sourceMappingURL=main.js.map