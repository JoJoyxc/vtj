var b=Object.defineProperty;var m=Object.getOwnPropertySymbols;var w=Object.prototype.hasOwnProperty,V=Object.prototype.propertyIsEnumerable;var y=(r,t,a)=>t in r?b(r,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[t]=a,g=(r,t)=>{for(var a in t||(t={}))w.call(t,a)&&y(r,a,t[a]);if(m)for(var a of m(t))V.call(t,a)&&y(r,a,t[a]);return r};var c=(r,t,a)=>new Promise((o,l)=>{var u=n=>{try{i(a.next(n))}catch(d){l(d)}},e=n=>{try{i(a.throw(n))}catch(d){l(d)}},i=n=>n.done?o(n.value):Promise.resolve(n.value).then(u,e);i((a=a.apply(r,t)).next())});import{W as f,a as h,b as k,c as W,d as v,e as B}from"./monaco-editor-c02ad91d.js";import{d as x,r as E,p as C,n as T,a3 as $,m as j,o as z,b as D,Z as M,a4 as _}from"./@vue-b0dacfac.js";const L=x({__name:"Editor",props:{lang:{default:"typescript"},modelValue:{default:""},options:{default:()=>({})},height:{default:"300px"},readonly:{type:Boolean,default:!1},dark:{type:Boolean,default:!1},border:{type:Boolean},minimap:{type:Boolean,default:!1}},emits:["change","blur"],setup(r,{expose:t,emit:a}){const o=r;self.MonacoEnvironment={createTrustedTypesPolicy:void 0,getWorker(s,p){return p==="json"&&f?new f:["css","scss","less"].includes(p)&&h?new h:["html","handlebars","razor","vue"].includes(p)&&k?new k:["typescript","javascript"].includes(p)&&W?new W:v?new v:Promise.resolve({})}};const l=a,u=E();let e=null;const i=()=>c(this,null,function*(){var s;e&&(yield(s=e.getAction("editor.action.formatDocument"))==null?void 0:s.run(),e.setValue(e.getValue()))}),n=()=>c(this,null,function*(){yield i(),l("blur",e==null?void 0:e.getValue())}),d=()=>{e=B.create(u.value,g({value:o.modelValue,language:o.lang,readOnly:o.readonly,theme:o.dark?"vs-dark":"vs",automaticLayout:!0,minimap:{enabled:o.minimap}},o.options)),e.onDidChangeModelContent(s=>{l("change",e==null?void 0:e.getValue(),s)}),e.onDidBlurEditorText(n)};return C(()=>{T(d)}),$(()=>{e&&e.dispose()}),j(()=>o.modelValue,s=>{e&&e.setValue(s)}),t({getEditor:()=>e}),(s,p)=>(z(),D("div",{class:M(["vtj-code-editor",{"is-border":o.border}]),ref_key:"container",ref:u,style:_({height:o.height})},null,6))}});export{L as default};