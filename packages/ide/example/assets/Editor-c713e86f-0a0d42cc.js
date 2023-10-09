import{W as z,a as R,b as Y,c as K,d as U,e as X}from"./monaco-editor-62cd2e70.js";import{I as tt,e as et,i as rt,n as nt,Z as ot,f as at,o as it,c as ut,R as ct,a0 as lt}from"./@vue-2b7f1207.js";function Z(i,u){var l=Object.keys(i);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(i);u&&(c=c.filter(function(v){return Object.getOwnPropertyDescriptor(i,v).enumerable})),l.push.apply(l,c)}return l}function st(i){for(var u=1;u<arguments.length;u++){var l=arguments[u]!=null?arguments[u]:{};u%2?Z(Object(l),!0).forEach(function(c){ft(i,c,l[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(i,Object.getOwnPropertyDescriptors(l)):Z(Object(l)).forEach(function(c){Object.defineProperty(i,c,Object.getOwnPropertyDescriptor(l,c))})}return i}function ft(i,u,l){return u=ht(u),u in i?Object.defineProperty(i,u,{value:l,enumerable:!0,configurable:!0,writable:!0}):i[u]=l,i}function ht(i){var u=pt(i,"string");return typeof u=="symbol"?u:String(u)}function pt(i,u){if(typeof i!="object"||i===null)return i;var l=i[Symbol.toPrimitive];if(l!==void 0){var c=l.call(i,u||"default");if(typeof c!="object")return c;throw new TypeError("@@toPrimitive must return a primitive value.")}return(u==="string"?String:Number)(i)}function S(){/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */S=function(){return u};var i,u={},l=Object.prototype,c=l.hasOwnProperty,v=Object.defineProperty||function(r,t,e){r[t]=e.value},h=typeof Symbol=="function"?Symbol:{},w=h.iterator||"@@iterator",s=h.asyncIterator||"@@asyncIterator",E=h.toStringTag||"@@toStringTag";function g(r,t,e){return Object.defineProperty(r,t,{value:e,enumerable:!0,configurable:!0,writable:!0}),r[t]}try{g({},"")}catch(r){g=function(e,n,a){return e[n]=a}}function T(r,t,e,n){var a=t&&t.prototype instanceof A?t:A,o=Object.create(a.prototype),f=new F(n||[]);return v(o,"_invoke",{value:J(r,e,f)}),o}function b(r,t,e){try{return{type:"normal",arg:r.call(t,e)}}catch(n){return{type:"throw",arg:n}}}u.wrap=T;var O="suspendedStart",p="suspendedYield",W="executing",d="completed",x={};function A(){}function G(){}function k(){}var D={};g(D,w,function(){return this});var V=Object.getPrototypeOf,I=V&&V(V($([])));I&&I!==l&&c.call(I,w)&&(D=I);var P=k.prototype=A.prototype=Object.create(D);function C(r){["next","throw","return"].forEach(function(t){g(r,t,function(e){return this._invoke(t,e)})})}function N(r,t){function e(a,o,f,y){var m=b(r[a],r,o);if(m.type!=="throw"){var _=m.arg,L=_.value;return L&&typeof L=="object"&&c.call(L,"__await")?t.resolve(L.__await).then(function(j){e("next",j,f,y)},function(j){e("throw",j,f,y)}):t.resolve(L).then(function(j){_.value=j,f(_)},function(j){return e("throw",j,f,y)})}y(m.arg)}var n;v(this,"_invoke",{value:function(o,f){function y(){return new t(function(m,_){e(o,f,m,_)})}return n=n?n.then(y,y):y()}})}function J(r,t,e){var n=O;return function(a,o){if(n===W)throw new Error("Generator is already running");if(n===d){if(a==="throw")throw o;return{value:i,done:!0}}for(e.method=a,e.arg=o;;){var f=e.delegate;if(f){var y=M(f,e);if(y){if(y===x)continue;return y}}if(e.method==="next")e.sent=e._sent=e.arg;else if(e.method==="throw"){if(n===O)throw n=d,e.arg;e.dispatchException(e.arg)}else e.method==="return"&&e.abrupt("return",e.arg);n=W;var m=b(r,t,e);if(m.type==="normal"){if(n=e.done?d:p,m.arg===x)continue;return{value:m.arg,done:e.done}}m.type==="throw"&&(n=d,e.method="throw",e.arg=m.arg)}}}function M(r,t){var e=t.method,n=r.iterator[e];if(n===i)return t.delegate=null,e==="throw"&&r.iterator.return&&(t.method="return",t.arg=i,M(r,t),t.method==="throw")||e!=="return"&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+e+"' method")),x;var a=b(n,r.iterator,t.arg);if(a.type==="throw")return t.method="throw",t.arg=a.arg,t.delegate=null,x;var o=a.arg;return o?o.done?(t[r.resultName]=o.value,t.next=r.nextLoc,t.method!=="return"&&(t.method="next",t.arg=i),t.delegate=null,x):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,x)}function Q(r){var t={tryLoc:r[0]};1 in r&&(t.catchLoc=r[1]),2 in r&&(t.finallyLoc=r[2],t.afterLoc=r[3]),this.tryEntries.push(t)}function B(r){var t=r.completion||{};t.type="normal",delete t.arg,r.completion=t}function F(r){this.tryEntries=[{tryLoc:"root"}],r.forEach(Q,this),this.reset(!0)}function $(r){if(r||r===""){var t=r[w];if(t)return t.call(r);if(typeof r.next=="function")return r;if(!isNaN(r.length)){var e=-1,n=function a(){for(;++e<r.length;)if(c.call(r,e))return a.value=r[e],a.done=!1,a;return a.value=i,a.done=!0,a};return n.next=n}}throw new TypeError(typeof r+" is not iterable")}return G.prototype=k,v(P,"constructor",{value:k,configurable:!0}),v(k,"constructor",{value:G,configurable:!0}),G.displayName=g(k,E,"GeneratorFunction"),u.isGeneratorFunction=function(r){var t=typeof r=="function"&&r.constructor;return!!t&&(t===G||(t.displayName||t.name)==="GeneratorFunction")},u.mark=function(r){return Object.setPrototypeOf?Object.setPrototypeOf(r,k):(r.__proto__=k,g(r,E,"GeneratorFunction")),r.prototype=Object.create(P),r},u.awrap=function(r){return{__await:r}},C(N.prototype),g(N.prototype,s,function(){return this}),u.AsyncIterator=N,u.async=function(r,t,e,n,a){a===void 0&&(a=Promise);var o=new N(T(r,t,e,n),a);return u.isGeneratorFunction(t)?o:o.next().then(function(f){return f.done?f.value:o.next()})},C(P),g(P,E,"Generator"),g(P,w,function(){return this}),g(P,"toString",function(){return"[object Generator]"}),u.keys=function(r){var t=Object(r),e=[];for(var n in t)e.push(n);return e.reverse(),function a(){for(;e.length;){var o=e.pop();if(o in t)return a.value=o,a.done=!1,a}return a.done=!0,a}},u.values=$,F.prototype={constructor:F,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=i,this.done=!1,this.delegate=null,this.method="next",this.arg=i,this.tryEntries.forEach(B),!t)for(var e in this)e.charAt(0)==="t"&&c.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=i)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if(t.type==="throw")throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(_,L){return f.type="throw",f.arg=t,e.next=_,L&&(e.method="next",e.arg=i),!!L}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],f=o.completion;if(o.tryLoc==="root")return n("end");if(o.tryLoc<=this.prev){var y=c.call(o,"catchLoc"),m=c.call(o,"finallyLoc");if(y&&m){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(y){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!m)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&c.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&(t==="break"||t==="continue")&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var f=o?o.completion:{};return f.type=t,f.arg=e,o?(this.method="next",this.next=o.finallyLoc,x):this.complete(f)},complete:function(t,e){if(t.type==="throw")throw t.arg;return t.type==="break"||t.type==="continue"?this.next=t.arg:t.type==="return"?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):t.type==="normal"&&e&&(this.next=e),x},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),B(n),x}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var a=n.completion;if(a.type==="throw"){var o=a.arg;B(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:$(t),resultName:e,nextLoc:n},this.method==="next"&&(this.arg=i),x}},u}function q(i,u,l,c,v,h,w){try{var s=i[h](w),E=s.value}catch(g){l(g);return}s.done?u(E):Promise.resolve(E).then(c,v)}function H(i){return function(){var u=this,l=arguments;return new Promise(function(c,v){var h=i.apply(u,l);function w(E){q(h,c,v,w,s,"next",E)}function s(E){q(h,c,v,w,s,"throw",E)}w(void 0)})}}var vt=tt({__name:"Editor",props:{lang:{default:"typescript"},modelValue:{default:""},options:{default:function(){return{}}},height:{default:"300px"},readonly:{type:Boolean,default:!1},dark:{type:Boolean,default:!1},border:{type:Boolean},minimap:{type:Boolean,default:!1}},emits:["change","blur"],setup:function(u,l){var c=l.expose,v=l.emit,h=u;self.MonacoEnvironment={createTrustedTypesPolicy:void 0,getWorker:function(O,p){return p==="json"&&z?new z:["css","scss","less"].includes(p)&&R?new R:["html","handlebars","razor","vue"].includes(p)&&Y?new Y:["typescript","javascript"].includes(p)&&K?new K:U?new U:Promise.resolve({})}};var w=et(),s=null,E=function(){var b=H(S().mark(function O(){var p;return S().wrap(function(d){for(;;)switch(d.prev=d.next){case 0:if(d.t0=s,!d.t0){d.next=5;break}return d.next=4,(p=s.getAction("editor.action.formatDocument"))===null||p===void 0?void 0:p.run();case 4:s.setValue(s.getValue());case 5:case"end":return d.stop()}},O)}));return function(){return b.apply(this,arguments)}}(),g=function(){var b=H(S().mark(function O(){var p;return S().wrap(function(d){for(;;)switch(d.prev=d.next){case 0:return d.next=2,E();case 2:v("blur",(p=s)===null||p===void 0?void 0:p.getValue());case 3:case"end":return d.stop()}},O)}));return function(){return b.apply(this,arguments)}}(),T=function(){s=X.create(w.value,st({value:h.modelValue,language:h.lang,readOnly:h.readonly,theme:h.dark?"vs-dark":"vs",automaticLayout:!0,minimap:{enabled:h.minimap}},h.options)),s.onDidChangeModelContent(function(O){var p;v("change",(p=s)===null||p===void 0?void 0:p.getValue(),O)}),s.onDidBlurEditorText(g)};return rt(function(){nt(T)}),ot(function(){s&&s.dispose()}),at(function(){return h.modelValue},function(b){s&&s.setValue(b)}),c({getEditor:function(){return s}}),function(b,O){return it(),ut("div",{class:ct(["vtj-code-editor",{"is-border":h.border}]),ref_key:"container",ref:w,style:lt({height:h.height})},null,6)}}});export{vt as default};
