var xe=Object.defineProperty,Ae=Object.defineProperties;var Ce=Object.getOwnPropertyDescriptors;var V=Object.getOwnPropertySymbols;var ne=Object.prototype.hasOwnProperty,re=Object.prototype.propertyIsEnumerable;var te=(e,t,n)=>t in e?xe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,D=(e,t)=>{for(var n in t||(t={}))ne.call(t,n)&&te(e,n,t[n]);if(V)for(var n of V(t))re.call(t,n)&&te(e,n,t[n]);return e},W=(e,t)=>Ae(e,Ce(t));var R=(e,t)=>{var n={};for(var r in e)ne.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&V)for(var r of V(e))t.indexOf(r)<0&&re.call(e,r)&&(n[r]=e[r]);return n};var oe=(e,t,n)=>new Promise((r,o)=>{var s=a=>{try{u(n.next(a))}catch(l){o(l)}},i=a=>{try{u(n.throw(a))}catch(l){o(l)}},u=a=>a.done?r(a.value):Promise.resolve(a.value).then(s,i);u((n=n.apply(e,t)).next())});import{s as he,w as ye,j,u as ge,k as be,l as we,r as b,m as I,g as U,p as G,n as K,q as Te,t as $e,v as Oe,x as Ie,y as M}from"./@vue-b0dacfac.js";var Me=Object.defineProperty,De=Object.defineProperties,Fe=Object.getOwnPropertyDescriptors,se=Object.getOwnPropertySymbols,Ne=Object.prototype.hasOwnProperty,Le=Object.prototype.propertyIsEnumerable,ae=(e,t,n)=>t in e?Me(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,We=(e,t)=>{for(var n in t||(t={}))Ne.call(t,n)&&ae(e,n,t[n]);if(se)for(var n of se(t))Le.call(t,n)&&ae(e,n,t[n]);return e},Re=(e,t)=>De(e,Fe(t));function Ct(e,t){var n;const r=he();return ye(()=>{r.value=e()},Re(We({},t),{flush:(n=t==null?void 0:t.flush)!=null?n:"sync"})),j(r)}var ue;const Y=typeof window!="undefined",ke=e=>typeof e=="string",X=()=>{},je=Y&&((ue=window==null?void 0:window.navigator)==null?void 0:ue.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function k(e){return typeof e=="function"?e():ge(e)}function ze(e,t){function n(...r){return new Promise((o,s)=>{Promise.resolve(e(()=>t.apply(this,r),{fn:t,thisArg:this,args:r})).then(o).catch(s)})}return n}function Be(e,t={}){let n,r,o=X;const s=u=>{clearTimeout(u),o(),o=X};return u=>{const a=k(e),l=k(t.maxWait);return n&&s(n),a<=0||l!==void 0&&l<=0?(r&&(s(r),r=null),Promise.resolve(u())):new Promise((c,d)=>{o=t.rejectOnCancel?d:c,l&&!r&&(r=setTimeout(()=>{n&&s(n),r=null,c(u())},l)),n=setTimeout(()=>{r&&s(r),r=null,c(u())},a)})}}function Ve(e){return e}function Z(e){return be()?(we(e),!0):!1}function He(e,t=200,n={}){return ze(Be(t,n),e)}function Tt(e,t=200,n={}){const r=b(e.value),o=He(()=>{r.value=e.value},t,n);return I(e,()=>o()),r}function Qe(e,t=!0){U()?G(e):t?e():K(e)}function $t(e,t,n={}){const{immediate:r=!0}=n,o=b(!1);let s=null;function i(){s&&(clearTimeout(s),s=null)}function u(){o.value=!1,i()}function a(...l){i(),o.value=!0,s=setTimeout(()=>{o.value=!1,s=null,e(...l)},k(t))}return r&&(o.value=!0,Y&&a()),Z(u),{isPending:j(o),start:a,stop:u}}function N(e){var t;const n=k(e);return(t=n==null?void 0:n.$el)!=null?t:n}const J=Y?window:void 0,Xe=Y?window.document:void 0;function L(...e){let t,n,r,o;if(ke(e[0])||Array.isArray(e[0])?([n,r,o]=e,t=J):[t,n,r,o]=e,!t)return X;Array.isArray(n)||(n=[n]),Array.isArray(r)||(r=[r]);const s=[],i=()=>{s.forEach(c=>c()),s.length=0},u=(c,d,f,p)=>(c.addEventListener(d,f,p),()=>c.removeEventListener(d,f,p)),a=I(()=>[N(t),k(o)],([c,d])=>{i(),c&&s.push(...n.flatMap(f=>r.map(p=>u(c,f,p,d))))},{immediate:!0,flush:"post"}),l=()=>{a(),i()};return Z(l),l}let ie=!1;function It(e,t,n={}){const{window:r=J,ignore:o=[],capture:s=!0,detectIframe:i=!1}=n;if(!r)return;je&&!ie&&(ie=!0,Array.from(r.document.body.children).forEach(f=>f.addEventListener("click",X)));let u=!0;const a=f=>o.some(p=>{if(typeof p=="string")return Array.from(r.document.querySelectorAll(p)).some(m=>m===f.target||f.composedPath().includes(m));{const m=N(p);return m&&(f.target===m||f.composedPath().includes(m))}}),c=[L(r,"click",f=>{const p=N(e);if(!(!p||p===f.target||f.composedPath().includes(p))){if(f.detail===0&&(u=!a(f)),!u){u=!0;return}t(f)}},{passive:!0,capture:s}),L(r,"pointerdown",f=>{const p=N(e);p&&(u=!f.composedPath().includes(p)&&!a(f))},{passive:!0}),i&&L(r,"blur",f=>{var p;const m=N(e);((p=r.document.activeElement)==null?void 0:p.tagName)==="IFRAME"&&!(m!=null&&m.contains(r.document.activeElement))&&t(f)})].filter(Boolean);return()=>c.forEach(f=>f())}function Ye(e,t=!1){const n=b(),r=()=>n.value=!!e();return r(),Qe(r,t),n}const le=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},ce="__vueuse_ssr_handlers__";le[ce]=le[ce]||{};function Mt({document:e=Xe}={}){if(!e)return b("visible");const t=b(e.visibilityState);return L(e,"visibilitychange",()=>{t.value=e.visibilityState}),t}var fe=Object.getOwnPropertySymbols,Je=Object.prototype.hasOwnProperty,qe=Object.prototype.propertyIsEnumerable,Ue=(e,t)=>{var n={};for(var r in e)Je.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&fe)for(var r of fe(e))t.indexOf(r)<0&&qe.call(e,r)&&(n[r]=e[r]);return n};function Dt(e,t,n={}){const r=n,{window:o=J}=r,s=Ue(r,["window"]);let i;const u=Ye(()=>o&&"ResizeObserver"in o),a=()=>{i&&(i.disconnect(),i=void 0)},l=I(()=>N(e),d=>{a(),u.value&&o&&d&&(i=new ResizeObserver(t),i.observe(d,s))},{immediate:!0,flush:"post"}),c=()=>{a(),l()};return Z(c),{isSupported:u,stop:c}}var de;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})(de||(de={}));var Ge=Object.defineProperty,pe=Object.getOwnPropertySymbols,Ke=Object.prototype.hasOwnProperty,Ze=Object.prototype.propertyIsEnumerable,ve=(e,t,n)=>t in e?Ge(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,et=(e,t)=>{for(var n in t||(t={}))Ke.call(t,n)&&ve(e,n,t[n]);if(pe)for(var n of pe(t))Ze.call(t,n)&&ve(e,n,t[n]);return e};const tt={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};et({linear:Ve},tt);function Ft({window:e=J}={}){if(!e)return b(!1);const t=b(e.document.hasFocus());return L(e,"blur",()=>{t.value=!1}),L(e,"focus",()=>{t.value=!0}),t}function z(e){return be()?(we(e),!0):!1}function A(e){return typeof e=="function"?e():ge(e)}const B=typeof window!="undefined"&&typeof document!="undefined",nt=Object.prototype.toString,rt=e=>nt.call(e)==="[object Object]",_e=()=>{};function ot(e,t){function n(...r){return new Promise((o,s)=>{Promise.resolve(e(()=>t.apply(this,r),{fn:t,thisArg:this,args:r})).then(o).catch(s)})}return n}const Se=e=>e();function st(e=Se){const t=b(!0);function n(){t.value=!1}function r(){t.value=!0}const o=(...s)=>{t.value&&e(...s)};return{isActive:j(t),pause:n,resume:r,eventFilter:o}}function Ee(...e){if(e.length!==1)return Ie(...e);const t=e[0];return typeof t=="function"?j(Oe(()=>({get:t,set:_e}))):b(t)}function at(e,t,n={}){const s=n,{eventFilter:r=Se}=s,o=R(s,["eventFilter"]);return I(e,ot(r,t),o)}function ut(e,t,n={}){const c=n,{eventFilter:r}=c,o=R(c,["eventFilter"]),{eventFilter:s,pause:i,resume:u,isActive:a}=st(r);return{stop:at(e,t,W(D({},o),{eventFilter:s})),pause:i,resume:u,isActive:a}}function it(e,t={}){if(!Te(e))return $e(e);const n=Array.isArray(e.value)?Array.from({length:e.value.length}):{};for(const r in e.value)n[r]=Oe(()=>({get(){return e.value[r]},set(o){var s;if((s=A(t.replaceRef))!=null?s:!0)if(Array.isArray(e.value)){const u=[...e.value];u[r]=o,e.value=u}else{const u=W(D({},e.value),{[r]:o});Object.setPrototypeOf(u,Object.getPrototypeOf(e.value)),e.value=u}else e.value[r]=o}}));return n}function lt(e,t=!0){U()?G(e):t?e():K(e)}function ct(e,t,n={}){const{immediate:r=!0}=n,o=b(!1);let s=null;function i(){s&&(clearTimeout(s),s=null)}function u(){o.value=!1,i()}function a(...l){i(),o.value=!0,s=setTimeout(()=>{o.value=!1,s=null,e(...l)},A(t))}return r&&(o.value=!0,B&&a()),z(u),{isPending:j(o),start:a,stop:u}}function F(e){var t;const n=A(e);return(t=n==null?void 0:n.$el)!=null?t:n}const $=B?window:void 0,ft=B?window.document:void 0,dt=B?window.navigator:void 0;function T(...e){let t,n,r,o;if(typeof e[0]=="string"||Array.isArray(e[0])?([n,r,o]=e,t=$):[t,n,r,o]=e,!t)return _e;Array.isArray(n)||(n=[n]),Array.isArray(r)||(r=[r]);const s=[],i=()=>{s.forEach(c=>c()),s.length=0},u=(c,d,f,p)=>(c.addEventListener(d,f,p),()=>c.removeEventListener(d,f,p)),a=I(()=>[F(t),A(o)],([c,d])=>{if(i(),!c)return;const f=rt(d)?D({},d):d;s.push(...n.flatMap(p=>r.map(m=>u(c,p,m,f))))},{immediate:!0,flush:"post"}),l=()=>{a(),i()};return z(l),l}function pt(){const e=b(!1);return U()&&G(()=>{e.value=!0}),e}function q(e){const t=pt();return M(()=>(t.value,!!e()))}function vt(e,t={}){const{window:n=$}=t,r=q(()=>n&&"matchMedia"in n&&typeof n.matchMedia=="function");let o;const s=b(!1),i=l=>{s.value=l.matches},u=()=>{o&&("removeEventListener"in o?o.removeEventListener("change",i):o.removeListener(i))},a=ye(()=>{r.value&&(u(),o=n.matchMedia(A(e)),"addEventListener"in o?o.addEventListener("change",i):o.addListener(i),s.value=o.matches)});return z(()=>{a(),u(),o=void 0}),s}function Nt(e={}){const{navigator:t=dt,read:n=!1,source:r,copiedDuring:o=1500,legacy:s=!1}=e,i=q(()=>t&&"clipboard"in t),u=M(()=>i.value||s),a=b(""),l=b(!1),c=ct(()=>l.value=!1,o);function d(){i.value?t.clipboard.readText().then(g=>{a.value=g}):a.value=m()}u.value&&n&&T(["copy","cut"],d);function f(){return oe(this,arguments,function*(g=A(r)){u.value&&g!=null&&(i.value?yield t.clipboard.writeText(g):p(g),a.value=g,l.value=!0,c.start())})}function p(g){const w=document.createElement("textarea");w.value=g!=null?g:"",w.style.position="absolute",w.style.opacity="0",document.body.appendChild(w),w.select(),document.execCommand("copy"),w.remove()}function m(){var g,w,O;return(O=(w=(g=document==null?void 0:document.getSelection)==null?void 0:g.call(document))==null?void 0:w.toString())!=null?O:""}return{isSupported:u,text:a,copied:l,copy:f}}const H=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},Q="__vueuse_ssr_handlers__",mt=ht();function ht(){return Q in H||(H[Q]=H[Q]||{}),H[Q]}function Pe(e,t){return mt[e]||t}function yt(e){return e==null?"any":e instanceof Set?"set":e instanceof Map?"map":e instanceof Date?"date":typeof e=="boolean"?"boolean":typeof e=="string"?"string":typeof e=="object"?"object":Number.isNaN(e)?"any":"number"}const gt={boolean:{read:e=>e==="true",write:e=>String(e)},object:{read:e=>JSON.parse(e),write:e=>JSON.stringify(e)},number:{read:e=>Number.parseFloat(e),write:e=>String(e)},any:{read:e=>e,write:e=>String(e)},string:{read:e=>e,write:e=>String(e)},map:{read:e=>new Map(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e.entries()))},set:{read:e=>new Set(JSON.parse(e)),write:e=>JSON.stringify(Array.from(e))},date:{read:e=>new Date(e),write:e=>e.toISOString()}},me="vueuse-storage";function bt(e,t,n,r={}){var o;const{flush:s="pre",deep:i=!0,listenToStorageChanges:u=!0,writeDefaults:a=!0,mergeDefaults:l=!1,shallow:c,window:d=$,eventFilter:f,onError:p=v=>{console.error(v)}}=r,m=(c?he:b)(t);if(!n)try{n=Pe("getDefaultStorage",()=>{var v;return(v=$)==null?void 0:v.localStorage})()}catch(v){p(v)}if(!n)return m;const g=A(t),w=yt(g),O=(o=r.serializer)!=null?o:gt[w],{pause:C,resume:x}=ut(m,()=>_(m.value),{flush:s,deep:i,eventFilter:f});return d&&u&&(T(d,"storage",y),T(d,me,E)),y(),m;function _(v){try{if(v==null)n.removeItem(e);else{const S=O.write(v),P=n.getItem(e);P!==S&&(n.setItem(e,S),d&&d.dispatchEvent(new CustomEvent(me,{detail:{key:e,oldValue:P,newValue:S,storageArea:n}})))}}catch(S){p(S)}}function h(v){const S=v?v.newValue:n.getItem(e);if(S==null)return a&&g!==null&&n.setItem(e,O.write(g)),g;if(!v&&l){const P=O.read(S);return typeof l=="function"?l(P,g):w==="object"&&!Array.isArray(P)?D(D({},g),P):P}else return typeof S!="string"?S:O.read(S)}function E(v){y(v.detail)}function y(v){if(!(v&&v.storageArea!==n)){if(v&&v.key==null){m.value=g;return}if(!(v&&v.key!==e)){C();try{(v==null?void 0:v.newValue)!==O.write(m.value)&&(m.value=h(v))}catch(S){p(S)}finally{v?K(x):x()}}}}}function wt(e){return vt("(prefers-color-scheme: dark)",e)}function Ot(e={}){const{selector:t="html",attribute:n="class",initialValue:r="auto",window:o=$,storage:s,storageKey:i="vueuse-color-scheme",listenToStorageChanges:u=!0,storageRef:a,emitAuto:l,disableTransition:c=!0}=e,d=D({auto:"",light:"light",dark:"dark"},e.modes||{}),f=wt({window:o}),p=M(()=>f.value?"dark":"light"),m=a||(i==null?Ee(r):bt(i,r,s,{window:o,listenToStorageChanges:u})),g=M(()=>m.value==="auto"?p.value:m.value),w=Pe("updateHTMLAttrs",(_,h,E)=>{const y=typeof _=="string"?o==null?void 0:o.document.querySelector(_):F(_);if(!y)return;let v;if(c){v=o.document.createElement("style");const S="*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";v.appendChild(document.createTextNode(S)),o.document.head.appendChild(v)}if(h==="class"){const S=E.split(/\s/g);Object.values(d).flatMap(P=>(P||"").split(/\s/g)).filter(Boolean).forEach(P=>{S.includes(P)?y.classList.add(P):y.classList.remove(P)})}else y.setAttribute(h,E);c&&(o.getComputedStyle(v).opacity,document.head.removeChild(v))});function O(_){var h;w(t,n,(h=d[_])!=null?h:_)}function C(_){e.onChanged?e.onChanged(_,O):O(_)}I(g,C,{flush:"post",immediate:!0}),lt(()=>C(g.value));const x=M({get(){return l?m.value:g.value},set(_){m.value=_}});try{return Object.assign(x,{store:m,system:p,state:g})}catch(_){return x}}function _t(e,t,n={}){const c=n,{window:r=$}=c,o=R(c,["window"]);let s;const i=q(()=>r&&"MutationObserver"in r),u=()=>{s&&(s.disconnect(),s=void 0)},a=I(()=>F(e),d=>{u(),i.value&&r&&d&&(s=new MutationObserver(t),s.observe(d,o))},{immediate:!0}),l=()=>{u(),a()};return z(l),{isSupported:i,stop:l}}function Lt(e={}){const{valueDark:t="dark",valueLight:n=""}=e,r=Ot(W(D({},e),{onChanged:(s,i)=>{var u;e.onChanged?(u=e.onChanged)==null||u.call(e,s==="dark",i,s):i(s)},modes:{dark:t,light:n}}));return M({get(){return r.value==="dark"},set(s){const i=s?"dark":"light";r.system.value===i?r.value="auto":r.value=i}})}function Wt(e,t={}){var n,r;const{pointerTypes:o,preventDefault:s,stopPropagation:i,exact:u,onMove:a,onEnd:l,onStart:c,initialValue:d,axis:f="both",draggingElement:p=$,containerElement:m,handle:g=e}=t,w=b((n=A(d))!=null?n:{x:0,y:0}),O=b(),C=y=>o?o.includes(y.pointerType):!0,x=y=>{A(s)&&y.preventDefault(),A(i)&&y.stopPropagation()},_=y=>{var v;if(!C(y)||A(u)&&y.target!==A(e))return;const P=((v=A(m))!=null?v:A(e)).getBoundingClientRect(),ee={x:y.clientX-P.left,y:y.clientY-P.top};(c==null?void 0:c(ee,y))!==!1&&(O.value=ee,x(y))},h=y=>{if(!C(y)||!O.value)return;let{x:v,y:S}=w.value;(f==="x"||f==="both")&&(v=y.clientX-O.value.x),(f==="y"||f==="both")&&(S=y.clientY-O.value.y),w.value={x:v,y:S},a==null||a(w.value,y),x(y)},E=y=>{C(y)&&O.value&&(O.value=void 0,l==null||l(w.value,y),x(y))};if(B){const y={capture:(r=t.capture)!=null?r:!0};T(g,"pointerdown",_,y),T(p,"pointermove",h,y),T(p,"pointerup",E,y)}return W(D({},it(w)),{position:w,isDragging:M(()=>!!O.value),style:M(()=>`left:${w.value.x}px;top:${w.value.y}px;`)})}function St(e,t,n={}){const d=n,{window:r=$}=d,o=R(d,["window"]);let s;const i=q(()=>r&&"ResizeObserver"in r),u=()=>{s&&(s.disconnect(),s=void 0)},a=M(()=>Array.isArray(e)?e.map(f=>F(f)):[F(e)]),l=I(a,f=>{if(u(),i.value&&r){s=new ResizeObserver(t);for(const p of f)p&&s.observe(p,o)}},{immediate:!0,flush:"post",deep:!0}),c=()=>{u(),l()};return z(c),{isSupported:i,stop:c}}function Rt(e,t={width:0,height:0},n={}){const{window:r=$,box:o="content-box"}=n,s=M(()=>{var a,l;return(l=(a=F(e))==null?void 0:a.namespaceURI)==null?void 0:l.includes("svg")}),i=b(t.width),u=b(t.height);return St(e,([a])=>{const l=o==="border-box"?a.borderBoxSize:o==="content-box"?a.contentBoxSize:a.devicePixelContentBoxSize;if(r&&s.value){const c=F(e);if(c){const d=r.getComputedStyle(c);i.value=Number.parseFloat(d.width),u.value=Number.parseFloat(d.height)}}else if(l){const c=Array.isArray(l)?l:[l];i.value=c.reduce((d,{inlineSize:f})=>d+f,0),u.value=c.reduce((d,{blockSize:f})=>d+f,0)}else i.value=a.contentRect.width,u.value=a.contentRect.height},n),I(()=>F(e),a=>{i.value=a?t.width:0,u.value=a?t.height:0}),{width:i,height:u}}const Et={page:e=>[e.pageX,e.pageY],client:e=>[e.clientX,e.clientY],screen:e=>[e.screenX,e.screenY],movement:e=>e instanceof Touch?null:[e.movementX,e.movementY]};function Pt(e={}){const{type:t="page",touch:n=!0,resetOnTouchEnds:r=!1,initialValue:o={x:0,y:0},window:s=$,target:i=s,scroll:u=!0,eventFilter:a}=e;let l=null;const c=b(o.x),d=b(o.y),f=b(null),p=typeof t=="function"?t:Et[t],m=h=>{const E=p(h);l=h,E&&([c.value,d.value]=E,f.value="mouse")},g=h=>{if(h.touches.length>0){const E=p(h.touches[0]);E&&([c.value,d.value]=E,f.value="touch")}},w=()=>{if(!l||!s)return;const h=p(l);l instanceof MouseEvent&&h&&(c.value=h[0]+s.scrollX,d.value=h[1]+s.scrollY)},O=()=>{c.value=o.x,d.value=o.y},C=a?h=>a(()=>m(h),{}):h=>m(h),x=a?h=>a(()=>g(h),{}):h=>g(h),_=a?()=>a(()=>w(),{}):()=>w();if(i){const h={passive:!0};T(i,["mousemove","dragover"],C,h),n&&t!=="movement"&&(T(i,["touchstart","touchmove"],x,h),r&&T(i,"touchend",O,h)),u&&t==="page"&&T(s,"scroll",_,{passive:!0})}return{x:c,y:d,sourceType:f}}function kt(e,t={}){const{handleOutside:n=!0,window:r=$}=t,{x:o,y:s,sourceType:i}=Pt(t),u=b(e!=null?e:r==null?void 0:r.document.body),a=b(0),l=b(0),c=b(0),d=b(0),f=b(0),p=b(0),m=b(!0);let g=()=>{};return r&&(g=I([u,o,s],()=>{const w=F(u);if(!w)return;const{left:O,top:C,width:x,height:_}=w.getBoundingClientRect();c.value=O+r.pageXOffset,d.value=C+r.pageYOffset,f.value=_,p.value=x;const h=o.value-c.value,E=s.value-d.value;m.value=x===0||_===0||h<0||E<0||h>x||E>_,(n||!m.value)&&(a.value=h,l.value=E)},{immediate:!0}),T(document,"mouseleave",()=>{m.value=!0})),{x:o,y:s,sourceType:i,elementX:a,elementY:l,elementPositionX:c,elementPositionY:d,elementHeight:f,elementWidth:p,isOutside:m,stop:g}}function jt(e=null,t={}){var n,r;const{document:o=ft}=t,s=Ee((n=e!=null?e:o==null?void 0:o.title)!=null?n:null),i=e&&typeof e=="function";function u(a){if(!("titleTemplate"in t))return a;const l=t.titleTemplate||"%s";return typeof l=="function"?l(a):A(l).replace(/%s/g,a)}return I(s,(a,l)=>{a!==l&&o&&(o.title=u(typeof a=="string"?a:""))},{immediate:!0}),t.observe&&!t.titleTemplate&&o&&!i&&_t((r=o.head)==null?void 0:r.querySelector("title"),()=>{o&&o.title!==s.value&&(s.value=u(o.title))},{childList:!0}),s}export{Dt as a,N as b,$t as c,je as d,Mt as e,Ft as f,Ct as g,Rt as h,Y as i,T as j,kt as k,Lt as l,Wt as m,jt as n,It as o,St as p,Nt as q,Tt as r,Z as t,L as u};