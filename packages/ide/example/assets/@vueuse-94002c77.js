var ze=Object.defineProperty,Ve=Object.defineProperties;var He=Object.getOwnPropertyDescriptors;var H=Object.getOwnPropertySymbols;var pe=Object.prototype.hasOwnProperty,ve=Object.prototype.propertyIsEnumerable;var de=(e,t,n)=>t in e?ze(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,D=(e,t)=>{for(var n in t||(t={}))pe.call(t,n)&&de(e,n,t[n]);if(H)for(var n of H(t))ve.call(t,n)&&de(e,n,t[n]);return e},k=(e,t)=>Ve(e,He(t));var B=(e,t)=>{var n={};for(var r in e)pe.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&H)for(var r of H(e))t.indexOf(r)<0&&ve.call(e,r)&&(n[r]=e[r]);return n};var me=(e,t,n)=>new Promise((r,o)=>{var s=a=>{try{i(n.next(a))}catch(c){o(c)}},u=a=>{try{i(n.throw(a))}catch(c){o(c)}},i=a=>a.done?r(a.value):Promise.resolve(a.value).then(s,u);i((n=n.apply(e,t)).next())});import{s as re,w as oe,j as F,u as se,k as ae,l as ie,r as y,g as q,m as J,n as G,p as A,q as Xe,t as Ye,v as We,x as Ue,y as N}from"./@vue-5541be01.js";var qe=Object.defineProperty,Je=Object.defineProperties,Ge=Object.getOwnPropertyDescriptors,ye=Object.getOwnPropertySymbols,Ke=Object.prototype.hasOwnProperty,Ze=Object.prototype.propertyIsEnumerable,he=(e,t,n)=>t in e?qe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,et=(e,t)=>{for(var n in t||(t={}))Ke.call(t,n)&&he(e,n,t[n]);if(ye)for(var n of ye(t))Ze.call(t,n)&&he(e,n,t[n]);return e},tt=(e,t)=>Je(e,Ge(t));function pn(e,t){var n;const r=re();return oe(()=>{r.value=e()},tt(et({},t),{flush:(n=t==null?void 0:t.flush)!=null?n:"sync"})),F(r)}var ge;const K=typeof window!="undefined",nt=e=>typeof e=="string",Re=()=>{},rt=K&&((ge=window==null?void 0:window.navigator)==null?void 0:ge.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function ue(e){return typeof e=="function"?e():se(e)}function ot(e){return e}function le(e){return ae()?(ie(e),!0):!1}function st(e,t=!0){q()?J(e):t?e():G(e)}function vn(e,t,n={}){const{immediate:r=!0}=n,o=y(!1);let s=null;function u(){s&&(clearTimeout(s),s=null)}function i(){o.value=!1,u()}function a(...c){u(),o.value=!0,s=setTimeout(()=>{o.value=!1,s=null,e(...c)},ue(t))}return r&&(o.value=!0,K&&a()),le(i),{isPending:F(o),start:a,stop:i}}function L(e){var t;const n=ue(e);return(t=n==null?void 0:n.$el)!=null?t:n}const Z=K?window:void 0,at=K?window.document:void 0;function R(...e){let t,n,r,o;if(nt(e[0])||Array.isArray(e[0])?([n,r,o]=e,t=Z):[t,n,r,o]=e,!t)return Re;Array.isArray(n)||(n=[n]),Array.isArray(r)||(r=[r]);const s=[],u=()=>{s.forEach(f=>f()),s.length=0},i=(f,p,l,d)=>(f.addEventListener(p,l,d),()=>f.removeEventListener(p,l,d)),a=A(()=>[L(t),ue(o)],([f,p])=>{u(),f&&s.push(...n.flatMap(l=>r.map(d=>i(f,l,d,p))))},{immediate:!0,flush:"post"}),c=()=>{a(),u()};return le(c),c}let Oe=!1;function mn(e,t,n={}){const{window:r=Z,ignore:o=[],capture:s=!0,detectIframe:u=!1}=n;if(!r)return;rt&&!Oe&&(Oe=!0,Array.from(r.document.body.children).forEach(l=>l.addEventListener("click",Re)));let i=!0;const a=l=>o.some(d=>{if(typeof d=="string")return Array.from(r.document.querySelectorAll(d)).some(v=>v===l.target||l.composedPath().includes(v));{const v=L(d);return v&&(l.target===v||l.composedPath().includes(v))}}),f=[R(r,"click",l=>{const d=L(e);if(!(!d||d===l.target||l.composedPath().includes(d))){if(l.detail===0&&(i=!a(l)),!i){i=!0;return}t(l)}},{passive:!0,capture:s}),R(r,"pointerdown",l=>{const d=L(e);d&&(i=!l.composedPath().includes(d)&&!a(l))},{passive:!0}),u&&R(r,"blur",l=>{var d;const v=L(e);((d=r.document.activeElement)==null?void 0:d.tagName)==="IFRAME"&&!(v!=null&&v.contains(r.document.activeElement))&&t(l)})].filter(Boolean);return()=>f.forEach(l=>l())}function it(e,t=!1){const n=y(),r=()=>n.value=!!e();return r(),st(r,t),n}const be=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},we="__vueuse_ssr_handlers__";be[we]=be[we]||{};function yn({document:e=at}={}){if(!e)return y("visible");const t=y(e.visibilityState);return R(e,"visibilitychange",()=>{t.value=e.visibilityState}),t}var _e=Object.getOwnPropertySymbols,ut=Object.prototype.hasOwnProperty,lt=Object.prototype.propertyIsEnumerable,ct=(e,t)=>{var n={};for(var r in e)ut.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&_e)for(var r of _e(e))t.indexOf(r)<0&&lt.call(e,r)&&(n[r]=e[r]);return n};function hn(e,t,n={}){const r=n,{window:o=Z}=r,s=ct(r,["window"]);let u;const i=it(()=>o&&"ResizeObserver"in o),a=()=>{u&&(u.disconnect(),u=void 0)},c=A(()=>L(e),p=>{a(),i.value&&o&&p&&(u=new ResizeObserver(t),u.observe(p,s))},{immediate:!0,flush:"post"}),f=()=>{a(),c()};return le(f),{isSupported:i,stop:f}}var $e;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})($e||($e={}));var ft=Object.defineProperty,Pe=Object.getOwnPropertySymbols,dt=Object.prototype.hasOwnProperty,pt=Object.prototype.propertyIsEnumerable,Se=(e,t,n)=>t in e?ft(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,vt=(e,t)=>{for(var n in t||(t={}))dt.call(t,n)&&Se(e,n,t[n]);if(Pe)for(var n of Pe(t))pt.call(t,n)&&Se(e,n,t[n]);return e};const mt={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};vt({linear:ot},mt);function gn({window:e=Z}={}){if(!e)return y(!1);const t=y(e.document.hasFocus());return R(e,"blur",()=>{t.value=!1}),R(e,"focus",()=>{t.value=!0}),t}function z(e){return ae()?(ie(e),!0):!1}function I(e){return typeof e=="function"?e():se(e)}const V=typeof window!="undefined"&&typeof document!="undefined",yt=Object.prototype.toString,ht=e=>yt.call(e)==="[object Object]",je=()=>{};function gt(e,t){function n(...r){return new Promise((o,s)=>{Promise.resolve(e(()=>t.apply(this,r),{fn:t,thisArg:this,args:r})).then(o).catch(s)})}return n}const ke=e=>e();function Ot(e=ke){const t=y(!0);function n(){t.value=!1}function r(){t.value=!0}const o=(...s)=>{t.value&&e(...s)};return{isActive:F(t),pause:n,resume:r,eventFilter:o}}function Be(...e){if(e.length!==1)return Ue(...e);const t=e[0];return typeof t=="function"?F(We(()=>({get:t,set:je}))):y(t)}function bt(e,t,n={}){const s=n,{eventFilter:r=ke}=s,o=B(s,["eventFilter"]);return A(e,gt(r,t),o)}function wt(e,t,n={}){const f=n,{eventFilter:r}=f,o=B(f,["eventFilter"]),{eventFilter:s,pause:u,resume:i,isActive:a}=Ot(r);return{stop:bt(e,t,k(D({},o),{eventFilter:s})),pause:u,resume:i,isActive:a}}function _t(e,t={}){if(!Xe(e))return Ye(e);const n=Array.isArray(e.value)?Array.from({length:e.value.length}):{};for(const r in e.value)n[r]=We(()=>({get(){return e.value[r]},set(o){var s;if((s=I(t.replaceRef))!=null?s:!0)if(Array.isArray(e.value)){const i=[...e.value];i[r]=o,e.value=i}else{const i=k(D({},e.value),{[r]:o});Object.setPrototypeOf(i,Object.getPrototypeOf(e.value)),e.value=i}else e.value[r]=o}}));return n}function $t(e,t=!0){q()?J(e):t?e():G(e)}function Pt(e,t,n={}){const{immediate:r=!0}=n,o=y(!1);let s=null;function u(){s&&(clearTimeout(s),s=null)}function i(){o.value=!1,u()}function a(...c){u(),o.value=!0,s=setTimeout(()=>{o.value=!1,s=null,e(...c)},I(t))}return r&&(o.value=!0,V&&a()),z(i),{isPending:F(o),start:a,stop:i}}function M(e){var t;const n=I(e);return(t=n==null?void 0:n.$el)!=null?t:n}const C=V?window:void 0,St=V?window.document:void 0,Et=V?window.navigator:void 0;function T(...e){let t,n,r,o;if(typeof e[0]=="string"||Array.isArray(e[0])?([n,r,o]=e,t=C):[t,n,r,o]=e,!t)return je;Array.isArray(n)||(n=[n]),Array.isArray(r)||(r=[r]);const s=[],u=()=>{s.forEach(f=>f()),s.length=0},i=(f,p,l,d)=>(f.addEventListener(p,l,d),()=>f.removeEventListener(p,l,d)),a=A(()=>[M(t),I(o)],([f,p])=>{if(u(),!f)return;const l=ht(p)?D({},p):p;s.push(...n.flatMap(d=>r.map(v=>i(f,d,v,l))))},{immediate:!0,flush:"post"}),c=()=>{a(),u()};return z(c),c}function It(){const e=y(!1);return q()&&J(()=>{e.value=!0}),e}function ee(e){const t=It();return N(()=>(t.value,!!e()))}function At(e,t={}){const{window:n=C}=t,r=ee(()=>n&&"matchMedia"in n&&typeof n.matchMedia=="function");let o;const s=y(!1),u=c=>{s.value=c.matches},i=()=>{o&&("removeEventListener"in o?o.removeEventListener("change",u):o.removeListener(u))},a=oe(()=>{r.value&&(i(),o=n.matchMedia(I(e)),"addEventListener"in o?o.addEventListener("change",u):o.addListener(u),s.value=o.matches)});return z(()=>{a(),i(),o=void 0}),s}function On(e={}){const{navigator:t=Et,read:n=!1,source:r,copiedDuring:o=1500,legacy:s=!1}=e,u=ee(()=>t&&"clipboard"in t),i=N(()=>u.value||s),a=y(""),c=y(!1),f=Pt(()=>c.value=!1,o);function p(){u.value?t.clipboard.readText().then(O=>{a.value=O}):a.value=v()}i.value&&n&&T(["copy","cut"],p);function l(){return me(this,arguments,function*(O=I(r)){i.value&&O!=null&&(u.value?yield t.clipboard.writeText(O):d(O),a.value=O,c.value=!0,f.start())})}function d(O){const b=document.createElement("textarea");b.value=O!=null?O:"",b.style.position="absolute",b.style.opacity="0",document.body.appendChild(b),b.select(),document.execCommand("copy"),b.remove()}function v(){var O,b,w;return(w=(b=(O=document==null?void 0:document.getSelection)==null?void 0:O.call(document))==null?void 0:b.toString())!=null?w:""}return{isSupported:i,text:a,copied:c,copy:l}}const X=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},Y="__vueuse_ssr_handlers__",xt=Tt();function Tt(){return Y in X||(X[Y]=X[Y]||{}),X[Y]}function Qe(e,t){return xt[e]||t}function Ct(e){return e==null?"any":e instanceof Set?"set":e instanceof Map?"map":e instanceof Date?"date":typeof e=="boolean"?"boolean":typeof e=="string"?"string":typeof e=="object"?"object":Number.isNaN(e)?"any":"number"}const Nt={boolean:{read:e=>e==="true",write:e=>String(e)},object:{read:e=>JSON.parse(e),write:e=>JSON.stringify(e)},number:{read:e=>Number.parseFloat(e),write:e=>String(e)},any:{read:e=>e,write:e=>String(e)},string:{read:e=>e,write:e=>String(e)},map:{read:e=>new Map(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e.entries()))},set:{read:e=>new Set(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e))},date:{read:e=>new Date(e),write:e=>e.toISOString()}},Ee="vueuse-storage";function Dt(e,t,n,r={}){var o;const{flush:s="pre",deep:u=!0,listenToStorageChanges:i=!0,writeDefaults:a=!0,mergeDefaults:c=!1,shallow:f,window:p=C,eventFilter:l,onError:d=m=>{console.error(m)}}=r,v=(f?re:y)(t);if(!n)try{n=Qe("getDefaultStorage",()=>{var m;return(m=C)==null?void 0:m.localStorage})()}catch(m){d(m)}if(!n)return v;const O=I(t),b=Ct(O),w=(o=r.serializer)!=null?o:Nt[b],{pause:x,resume:E}=wt(v,()=>_(v.value),{flush:s,deep:u,eventFilter:l});return p&&i&&(T(p,"storage",g),T(p,Ee,P)),g(),v;function _(m){try{if(m==null)n.removeItem(e);else{const $=w.write(m),S=n.getItem(e);S!==$&&(n.setItem(e,$),p&&p.dispatchEvent(new CustomEvent(Ee,{detail:{key:e,oldValue:S,newValue:$,storageArea:n}})))}}catch($){d($)}}function h(m){const $=m?m.newValue:n.getItem(e);if($==null)return a&&O!==null&&n.setItem(e,w.write(O)),O;if(!m&&c){const S=w.read($);return typeof c=="function"?c(S,O):b==="object"&&!Array.isArray(S)?D(D({},O),S):S}else return typeof $!="string"?$:w.read($)}function P(m){g(m.detail)}function g(m){if(!(m&&m.storageArea!==n)){if(m&&m.key==null){v.value=O;return}if(!(m&&m.key!==e)){x();try{(m==null?void 0:m.newValue)!==w.write(v.value)&&(v.value=h(m))}catch($){d($)}finally{m?G(E):E()}}}}}function Mt(e){return At("(prefers-color-scheme: dark)",e)}function Ft(e={}){const{selector:t="html",attribute:n="class",initialValue:r="auto",window:o=C,storage:s,storageKey:u="vueuse-color-scheme",listenToStorageChanges:i=!0,storageRef:a,emitAuto:c,disableTransition:f=!0}=e,p=D({auto:"",light:"light",dark:"dark"},e.modes||{}),l=Mt({window:o}),d=N(()=>l.value?"dark":"light"),v=a||(u==null?Be(r):Dt(u,r,s,{window:o,listenToStorageChanges:i})),O=N(()=>v.value==="auto"?d.value:v.value),b=Qe("updateHTMLAttrs",(_,h,P)=>{const g=typeof _=="string"?o==null?void 0:o.document.querySelector(_):M(_);if(!g)return;let m;if(f){m=o.document.createElement("style");const $="*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";m.appendChild(document.createTextNode($)),o.document.head.appendChild(m)}if(h==="class"){const $=P.split(/\s/g);Object.values(p).flatMap(S=>(S||"").split(/\s/g)).filter(Boolean).forEach(S=>{$.includes(S)?g.classList.add(S):g.classList.remove(S)})}else g.setAttribute(h,P);f&&(o.getComputedStyle(m).opacity,document.head.removeChild(m))});function w(_){var h;b(t,n,(h=p[_])!=null?h:_)}function x(_){e.onChanged?e.onChanged(_,w):w(_)}A(O,x,{flush:"post",immediate:!0}),$t(()=>x(O.value));const E=N({get(){return c?v.value:O.value},set(_){v.value=_}});try{return Object.assign(E,{store:v,system:d,state:O})}catch(_){return E}}function Lt(e,t,n={}){const f=n,{window:r=C}=f,o=B(f,["window"]);let s;const u=ee(()=>r&&"MutationObserver"in r),i=()=>{s&&(s.disconnect(),s=void 0)},a=A(()=>M(e),p=>{i(),u.value&&r&&p&&(s=new MutationObserver(t),s.observe(p,o))},{immediate:!0}),c=()=>{i(),a()};return z(c),{isSupported:u,stop:c}}function bn(e={}){const{valueDark:t="dark",valueLight:n=""}=e,r=Ft(k(D({},e),{onChanged:(s,u)=>{var i;e.onChanged?(i=e.onChanged)==null||i.call(e,s==="dark",u,s):u(s)},modes:{dark:t,light:n}}));return N({get(){return r.value==="dark"},set(s){const u=s?"dark":"light";r.system.value===u?r.value="auto":r.value=u}})}function wn(e,t={}){var n,r;const{pointerTypes:o,preventDefault:s,stopPropagation:u,exact:i,onMove:a,onEnd:c,onStart:f,initialValue:p,axis:l="both",draggingElement:d=C,containerElement:v,handle:O=e}=t,b=y((n=I(p))!=null?n:{x:0,y:0}),w=y(),x=g=>o?o.includes(g.pointerType):!0,E=g=>{I(s)&&g.preventDefault(),I(u)&&g.stopPropagation()},_=g=>{var m;if(!x(g)||I(i)&&g.target!==I(e))return;const S=((m=I(v))!=null?m:I(e)).getBoundingClientRect(),fe={x:g.clientX-S.left,y:g.clientY-S.top};(f==null?void 0:f(fe,g))!==!1&&(w.value=fe,E(g))},h=g=>{if(!x(g)||!w.value)return;let{x:m,y:$}=b.value;(l==="x"||l==="both")&&(m=g.clientX-w.value.x),(l==="y"||l==="both")&&($=g.clientY-w.value.y),b.value={x:m,y:$},a==null||a(b.value,g),E(g)},P=g=>{x(g)&&w.value&&(w.value=void 0,c==null||c(b.value,g),E(g))};if(V){const g={capture:(r=t.capture)!=null?r:!0};T(O,"pointerdown",_,g),T(d,"pointermove",h,g),T(d,"pointerup",P,g)}return k(D({},_t(b)),{position:b,isDragging:N(()=>!!w.value),style:N(()=>`left:${b.value.x}px;top:${b.value.y}px;`)})}function Wt(e,t,n={}){const p=n,{window:r=C}=p,o=B(p,["window"]);let s;const u=ee(()=>r&&"ResizeObserver"in r),i=()=>{s&&(s.disconnect(),s=void 0)},a=N(()=>Array.isArray(e)?e.map(l=>M(l)):[M(e)]),c=A(a,l=>{if(i(),u.value&&r){s=new ResizeObserver(t);for(const d of l)d&&s.observe(d,o)}},{immediate:!0,flush:"post",deep:!0}),f=()=>{i(),c()};return z(f),{isSupported:u,stop:f}}function _n(e,t={width:0,height:0},n={}){const{window:r=C,box:o="content-box"}=n,s=N(()=>{var a,c;return(c=(a=M(e))==null?void 0:a.namespaceURI)==null?void 0:c.includes("svg")}),u=y(t.width),i=y(t.height);return Wt(e,([a])=>{const c=o==="border-box"?a.borderBoxSize:o==="content-box"?a.contentBoxSize:a.devicePixelContentBoxSize;if(r&&s.value){const f=M(e);if(f){const p=r.getComputedStyle(f);u.value=Number.parseFloat(p.width),i.value=Number.parseFloat(p.height)}}else if(c){const f=Array.isArray(c)?c:[c];u.value=f.reduce((p,{inlineSize:l})=>p+l,0),i.value=f.reduce((p,{blockSize:l})=>p+l,0)}else u.value=a.contentRect.width,i.value=a.contentRect.height},n),A(()=>M(e),a=>{u.value=a?t.width:0,i.value=a?t.height:0}),{width:u,height:i}}const Rt={page:e=>[e.pageX,e.pageY],client:e=>[e.clientX,e.clientY],screen:e=>[e.screenX,e.screenY],movement:e=>e instanceof Touch?null:[e.movementX,e.movementY]};function jt(e={}){const{type:t="page",touch:n=!0,resetOnTouchEnds:r=!1,initialValue:o={x:0,y:0},window:s=C,target:u=s,scroll:i=!0,eventFilter:a}=e;let c=null;const f=y(o.x),p=y(o.y),l=y(null),d=typeof t=="function"?t:Rt[t],v=h=>{const P=d(h);c=h,P&&([f.value,p.value]=P,l.value="mouse")},O=h=>{if(h.touches.length>0){const P=d(h.touches[0]);P&&([f.value,p.value]=P,l.value="touch")}},b=()=>{if(!c||!s)return;const h=d(c);c instanceof MouseEvent&&h&&(f.value=h[0]+s.scrollX,p.value=h[1]+s.scrollY)},w=()=>{f.value=o.x,p.value=o.y},x=a?h=>a(()=>v(h),{}):h=>v(h),E=a?h=>a(()=>O(h),{}):h=>O(h),_=a?()=>a(()=>b(),{}):()=>b();if(u){const h={passive:!0};T(u,["mousemove","dragover"],x,h),n&&t!=="movement"&&(T(u,["touchstart","touchmove"],E,h),r&&T(u,"touchend",w,h)),i&&t==="page"&&T(s,"scroll",_,{passive:!0})}return{x:f,y:p,sourceType:l}}function $n(e,t={}){const{handleOutside:n=!0,window:r=C}=t,{x:o,y:s,sourceType:u}=jt(t),i=y(e!=null?e:r==null?void 0:r.document.body),a=y(0),c=y(0),f=y(0),p=y(0),l=y(0),d=y(0),v=y(!0);let O=()=>{};return r&&(O=A([i,o,s],()=>{const b=M(i);if(!b)return;const{left:w,top:x,width:E,height:_}=b.getBoundingClientRect();f.value=w+r.pageXOffset,p.value=x+r.pageYOffset,l.value=_,d.value=E;const h=o.value-f.value,P=s.value-p.value;v.value=E===0||_===0||h<0||P<0||h>E||P>_,(n||!v.value)&&(a.value=h,c.value=P)},{immediate:!0}),T(document,"mouseleave",()=>{v.value=!0})),{x:o,y:s,sourceType:u,elementX:a,elementY:c,elementPositionX:f,elementPositionY:p,elementHeight:l,elementWidth:d,isOutside:v,stop:O}}function Pn(e=null,t={}){var n,r;const{document:o=St}=t,s=Be((n=e!=null?e:o==null?void 0:o.title)!=null?n:null),u=e&&typeof e=="function";function i(a){if(!("titleTemplate"in t))return a;const c=t.titleTemplate||"%s";return typeof c=="function"?c(a):I(c).replace(/%s/g,a)}return A(s,(a,c)=>{a!==c&&o&&(o.title=i(typeof a=="string"?a:""))},{immediate:!0}),t.observe&&!t.titleTemplate&&o&&!u&&Lt((r=o.head)==null?void 0:r.querySelector("title"),()=>{o&&o.title!==s.value&&(s.value=i(o.title))},{childList:!0}),s}var kt=Object.defineProperty,Bt=Object.defineProperties,Qt=Object.getOwnPropertyDescriptors,Ie=Object.getOwnPropertySymbols,zt=Object.prototype.hasOwnProperty,Vt=Object.prototype.propertyIsEnumerable,Ae=(e,t,n)=>t in e?kt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Ht=(e,t)=>{for(var n in t||(t={}))zt.call(t,n)&&Ae(e,n,t[n]);if(Ie)for(var n of Ie(t))Vt.call(t,n)&&Ae(e,n,t[n]);return e},Xt=(e,t)=>Bt(e,Qt(t));function Sn(e,t){var n;const r=re();return oe(()=>{r.value=e()},Xt(Ht({},t),{flush:(n=t==null?void 0:t.flush)!=null?n:"sync"})),F(r)}var xe;const te=typeof window!="undefined",Yt=e=>typeof e=="string",U=()=>{},Ut=te&&((xe=window==null?void 0:window.navigator)==null?void 0:xe.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function Q(e){return typeof e=="function"?e():se(e)}function qt(e,t){function n(...r){return new Promise((o,s)=>{Promise.resolve(e(()=>t.apply(this,r),{fn:t,thisArg:this,args:r})).then(o).catch(s)})}return n}function Jt(e,t={}){let n,r,o=U;const s=i=>{clearTimeout(i),o(),o=U};return i=>{const a=Q(e),c=Q(t.maxWait);return n&&s(n),a<=0||c!==void 0&&c<=0?(r&&(s(r),r=null),Promise.resolve(i())):new Promise((f,p)=>{o=t.rejectOnCancel?p:f,c&&!r&&(r=setTimeout(()=>{n&&s(n),r=null,f(i())},c)),n=setTimeout(()=>{r&&s(r),r=null,f(i())},a)})}}function Gt(e){return e}function ce(e){return ae()?(ie(e),!0):!1}function Kt(e,t=200,n={}){return qt(Jt(t,n),e)}function En(e,t=200,n={}){const r=y(e.value),o=Kt(()=>{r.value=e.value},t,n);return A(e,()=>o()),r}function Zt(e,t=!0){q()?J(e):t?e():G(e)}function In(e,t,n={}){const{immediate:r=!0}=n,o=y(!1);let s=null;function u(){s&&(clearTimeout(s),s=null)}function i(){o.value=!1,u()}function a(...c){u(),o.value=!0,s=setTimeout(()=>{o.value=!1,s=null,e(...c)},Q(t))}return r&&(o.value=!0,te&&a()),ce(i),{isPending:F(o),start:a,stop:i}}function W(e){var t;const n=Q(e);return(t=n==null?void 0:n.$el)!=null?t:n}const ne=te?window:void 0,en=te?window.document:void 0;function j(...e){let t,n,r,o;if(Yt(e[0])||Array.isArray(e[0])?([n,r,o]=e,t=ne):[t,n,r,o]=e,!t)return U;Array.isArray(n)||(n=[n]),Array.isArray(r)||(r=[r]);const s=[],u=()=>{s.forEach(f=>f()),s.length=0},i=(f,p,l,d)=>(f.addEventListener(p,l,d),()=>f.removeEventListener(p,l,d)),a=A(()=>[W(t),Q(o)],([f,p])=>{u(),f&&s.push(...n.flatMap(l=>r.map(d=>i(f,l,d,p))))},{immediate:!0,flush:"post"}),c=()=>{a(),u()};return ce(c),c}let Te=!1;function An(e,t,n={}){const{window:r=ne,ignore:o=[],capture:s=!0,detectIframe:u=!1}=n;if(!r)return;Ut&&!Te&&(Te=!0,Array.from(r.document.body.children).forEach(l=>l.addEventListener("click",U)));let i=!0;const a=l=>o.some(d=>{if(typeof d=="string")return Array.from(r.document.querySelectorAll(d)).some(v=>v===l.target||l.composedPath().includes(v));{const v=W(d);return v&&(l.target===v||l.composedPath().includes(v))}}),f=[j(r,"click",l=>{const d=W(e);if(!(!d||d===l.target||l.composedPath().includes(d))){if(l.detail===0&&(i=!a(l)),!i){i=!0;return}t(l)}},{passive:!0,capture:s}),j(r,"pointerdown",l=>{const d=W(e);d&&(i=!l.composedPath().includes(d)&&!a(l))},{passive:!0}),u&&j(r,"blur",l=>{var d;const v=W(e);((d=r.document.activeElement)==null?void 0:d.tagName)==="IFRAME"&&!(v!=null&&v.contains(r.document.activeElement))&&t(l)})].filter(Boolean);return()=>f.forEach(l=>l())}function tn(e,t=!1){const n=y(),r=()=>n.value=!!e();return r(),Zt(r,t),n}const Ce=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},Ne="__vueuse_ssr_handlers__";Ce[Ne]=Ce[Ne]||{};function xn({document:e=en}={}){if(!e)return y("visible");const t=y(e.visibilityState);return j(e,"visibilitychange",()=>{t.value=e.visibilityState}),t}var De=Object.getOwnPropertySymbols,nn=Object.prototype.hasOwnProperty,rn=Object.prototype.propertyIsEnumerable,on=(e,t)=>{var n={};for(var r in e)nn.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&De)for(var r of De(e))t.indexOf(r)<0&&rn.call(e,r)&&(n[r]=e[r]);return n};function Tn(e,t,n={}){const r=n,{window:o=ne}=r,s=on(r,["window"]);let u;const i=tn(()=>o&&"ResizeObserver"in o),a=()=>{u&&(u.disconnect(),u=void 0)},c=A(()=>W(e),p=>{a(),i.value&&o&&p&&(u=new ResizeObserver(t),u.observe(p,s))},{immediate:!0,flush:"post"}),f=()=>{a(),c()};return ce(f),{isSupported:i,stop:f}}var Me;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})(Me||(Me={}));var sn=Object.defineProperty,Fe=Object.getOwnPropertySymbols,an=Object.prototype.hasOwnProperty,un=Object.prototype.propertyIsEnumerable,Le=(e,t,n)=>t in e?sn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ln=(e,t)=>{for(var n in t||(t={}))an.call(t,n)&&Le(e,n,t[n]);if(Fe)for(var n of Fe(t))un.call(t,n)&&Le(e,n,t[n]);return e};const cn={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};ln({linear:Gt},cn);function Cn({window:e=ne}={}){if(!e)return y(!1);const t=y(e.document.hasFocus());return j(e,"blur",()=>{t.value=!1}),j(e,"focus",()=>{t.value=!0}),t}export{wn as A,Pn as B,Wt as C,On as D,hn as a,L as b,vn as c,yn as d,gn as e,pn as f,te as g,ce as h,K as i,j,Tn as k,W as l,An as m,In as n,mn as o,Ut as p,xn as q,En as r,Cn as s,le as t,R as u,Sn as v,_n as w,T as x,$n as y,bn as z};
