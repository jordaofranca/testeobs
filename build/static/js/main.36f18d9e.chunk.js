(this["webpackJsonpobs-control-pwa"]=this["webpackJsonpobs-control-pwa"]||[]).push([[0],{119:function(e,n,t){},154:function(e,n){},161:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(11),o=t.n(c),i=(t(119),t(15)),s=t(82),l=t.n(s),d=t(2),u=Object(a.createContext)(),j=new l.a,b=function(e){var n=e.children,t=Object(a.useState)(null),r=Object(i.a)(t,2),c=r[0],o=r[1],s=Object(a.useState)(!1),l=Object(i.a)(s,2),b=l[0],h=l[1];return Object(a.useEffect)((function(){return j.on("ConnectionClosed",(function(e){console.log("disconnected"),h(!1),o(null)})),j.on("error",(function(e){console.error("socket error:",e),"NOT_CONNECTED"===e.code&&(h(!1),o(null))})),function(){j.disconnect()}}),[]),Object(d.jsx)(u.Provider,{value:{obsSocket:c,connected:b,init:function(e){var n=e.url,t=e.password;return new Promise((function(e,a){var r=parseInt(n.split(":")[1]),c={address:n,password:t,secure:443===r};console.log("options: ",c),j.connect(c).then((function(){console.log("connected: ",c),o(j),h(!0),e(n)})).catch((function(e){console.log(e),a(e)}))}))},disconnect:function(){return j.disconnect()}},children:n})},h=t(163),p=t(212),m=t(47),x=t(205),f=t(5),O=t(232),g=t(234),v=t(85),w=t.n(v),y=t(86),S=t.n(y),C=t(211),k=t(233),N=Object(x.a)((function(e){return{root:{height:"calc(100% -"+2*e.spacing(3)+")",maxHeight:500,minHeight:400,width:"100%",margin:e.spacing(2),display:"flex",flexDirection:"column",alignItems:"center"},margin:{height:e.spacing(3)}}})),_=Object(f.a)({root:{color:"#52af77",height:8,margin:"32px 0",boxSizing:"border-box"},thumb:{height:24,width:56,borderRadius:6,backgroundColor:"#currentColor",border:"2px solid currentColor",transform:"translateX(calc(-50% + 8px))","&:focus, &:hover, &$active":{boxShadow:"inherit"}},active:{},valueLabel:{left:"calc(50% - 14px)"},track:{height:8,width:4,border:"solid #666",borderRadius:4,boxSizing:"border-box"},rail:{height:8,width:4,borderRadius:4,border:"solid #999",boxSizing:"border-box"}})(O.a);function I(e){var n,t=e.src,r=Object(a.useState)(t.volume),c=Object(i.a)(r,2),o=c[0],s=c[1],l=Object(a.useState)(t.muted),j=Object(i.a)(l,2),b=j[0],h=j[1],p=N(),m=Object(a.useContext)(u).obsSocket;return Object(a.useEffect)((function(){return m.on("SourceVolumeChanged",(function(e){e.sourceName===t.name&&s(e.volume)})),m.on("SourceMuteStateChanged",(function(e){e.sourceName===t.name&&h(e.muted)})),{}}),[m,t.name]),Object(d.jsxs)("div",{className:p.root,children:[Object(d.jsx)(k.a,{title:t.name,"aria-label":t.name,children:Object(d.jsx)(g.a,{label:t.name.slice(0,14),color:"primary"})}),Object(d.jsx)(_,{min:-100,max:0,step:.01,orientation:"vertical",valueLabelDisplay:"auto","aria-label":"pretto slider",defaultValue:t.value,value:(n=o,Math.round(20*Math.log10(n)*100)/100),onChange:function(e,n){return function(e){m.send("SetVolume",{source:t.name,volume:e,useDecibel:!0})}(n)}}),Object(d.jsx)(C.a,{color:b?"secondary":void 0,"aria-label":"edit",style:{flexShrink:0},onClick:function(){navigator.vibrate(50),m.send("ToggleMute",{source:t.name})},children:b?Object(d.jsx)(w.a,{}):Object(d.jsx)(S.a,{})})]})}var W=function(){var e=Object(a.useContext)(u).obsSocket,n=Object(a.useState)([]),t=Object(i.a)(n,2),r=t[0],c=t[1];return Object(a.useEffect)((function(){e.send("GetSourcesList").then((function(n){var t=n.sources.filter((function(e){return"wasapi_input_capture"===e.typeId||"wasapi_output_capture"===e.typeId||"soundtrack_global_source"===e.typeId||"ffmpeg_source"===e.typeId||"dshow_input"===e.typeId}));Promise.all(t.map((function(n){return e.send("GetVolume",{source:n.name})}))).then((function(e){c(e)}))}))}),[e]),Object(d.jsxs)("div",{style:{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"flex-start"},children:[Object(d.jsx)(m.a,{component:"h2",variant:"h5",style:{marginBottom:20},children:"Audio Sources"}),Object(d.jsx)(p.a,{container:!0,spacing:2,children:r.map((function(e){return Object(d.jsx)(p.a,{item:!0,xs:6,sm:3,md:2,children:Object(d.jsx)(h.a,{style:{display:"flex",flexWrap:"wrap",height:"100%"},children:Object(d.jsx)(I,{src:e,onChange:function(e){return console.log(e)}})})},e.name)}))})]})},B=t(213),D=Object(f.a)((function(e){return{root:{minHeight:100,width:"100%"}}}))(B.a),P=Object(x.a)((function(e){return{root:{flexGrow:1}}}));function L(){var e=P(),n=Object(a.useContext)(u).obsSocket,t=Object(a.useState)(null),r=Object(i.a)(t,2),c=r[0],o=r[1],s=Object(a.useState)([]),l=Object(i.a)(s,2),j=l[0],b=l[1];Object(a.useEffect)((function(){n.send("GetSceneList").then((function(e){console.log(e);var n=e.currentScene,t=e.scenes;o(n),b(t)})),n.on("SwitchScenes",(function(e){e.sceneName!==e&&o(e.sceneName)}))}),[]);return Object(d.jsx)("div",{className:e.root,children:Object(d.jsx)(p.a,{container:!0,spacing:2,children:j.map((function(t,a){return Object(d.jsx)(p.a,{item:!0,xs:6,sm:3,md:2,children:Object(d.jsx)(D,{variant:"contained",color:c===t.name?"secondary":"primary",className:e.margin,onClick:function(){return e=t.name,console.log(e),void n.send("SetCurrentScene",{"scene-name":e}).then((function(n){o(e)}));var e},children:t.name})},a)}))})})}var T=t(231),E=t(222),A=t(227),R=t(223),F=t(229),G=t(90),H=t.n(G),z=t(221),V=t(224),q=new(t(87).a)("connections"),M=t(215),U=t(214),J=t(216),X=t(217),$=t(89),Y=t.n($),K=t(218),Q=t(219),Z=t(220),ee=t(88),ne=t.n(ee),te=Object(x.a)((function(e){return{root:{width:"100%",maxWidth:360,backgroundColor:e.palette.background.paper},nested:{paddingLeft:e.spacing(4)}}}));function ae(e){var n=e.conns,t=e.onDelete,r=Object(a.useContext)(u).init,c=te();return Object(d.jsx)(U.a,{component:"nav","aria-labelledby":"nested-list-subheader",subheader:Object(d.jsx)(M.a,{component:"div",id:"nested-list-subheader",children:"Saved connections"}),className:c.root,children:n.map((function(e){var n=e.url,a=e.name,c=e.password,o=e._id,i=e._rev;return Object(d.jsxs)(J.a,{button:!0,onClick:function(){return r({url:n,password:c})},children:[Object(d.jsx)(X.a,{children:Object(d.jsx)(ne.a,{})}),Object(d.jsx)(K.a,{primary:a,econdary:n}),Object(d.jsx)(Q.a,{children:Object(d.jsx)(Z.a,{edge:"end","aria-label":"delete",onClick:function(){return t({_id:o,_rev:i})},children:Object(d.jsx)(Y.a,{})})})]},i)}))})}var re=Object(x.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)},divider:{width:"100%",marginBottom:20}}}));function ce(){var e=Object(a.useContext)(u).init,n=Object(a.useState)(null),t=Object(i.a)(n,2),r=t[0],c=t[1],o=Object(a.useState)(!1),s=Object(i.a)(o,2),l=s[0],j=s[1],b=re();return Object(a.useEffect)((function(){new Promise((function(e,n){q.allDocs({include_docs:!0,descending:!0},(function(t,a){if(t)n(t);else{var r=a.rows;e(Array.isArray(r)&&r.length>0?r.map((function(e){var n=e.doc,t=n._id,a=n._rev,r=atob(e.doc.hash).split("-"),c=Object(i.a)(r,2);return{url:c[0],password:c[1],name:e.doc.name,_id:t,_rev:a}})):[])}}))})).then((function(e){c(e)})).catch((function(e){console.error(e)}))}),[]),Object(d.jsxs)(z.a,{component:"main",maxWidth:"xs",children:[Object(d.jsx)(E.a,{}),Object(d.jsxs)("div",{className:b.paper,children:[Object(d.jsx)(T.a,{className:b.avatar,children:Object(d.jsx)(H.a,{})}),Object(d.jsx)(m.a,{component:"h1",variant:"h5",children:"Connect"}),Object(d.jsxs)("form",{className:b.form,noValidate:!0,onSubmit:function(n){n.preventDefault();var t=n.target,a=t.url,r=t.password,c=t.name;e({url:a.value,password:r.value}).then((function(e){l&&function(e){var n=e.url,t=e.password,a={_id:n,name:e.name,hash:btoa(n+"-"+t)};q.put(a,(function(e,n){e?console.log(e):console.log(n)}))}({url:a.value,password:r.value,name:c.value})})).catch((function(e){return console.log(e)}))},children:[Object(d.jsx)(A.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"url",label:"url Address",name:"url",autoComplete:"url",autoFocus:!0}),Object(d.jsx)(A.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password"}),Object(d.jsx)(R.a,{control:Object(d.jsx)(F.a,{checked:l,onChange:function(e){j(e.target.checked)}}),label:"Add to Saved"}),l&&Object(d.jsx)(A.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"name",label:"Connection name",id:"name"}),Object(d.jsx)(B.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:b.submit,children:"Sign In"})]}),r&&r.length>0&&Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(V.a,{className:b.divider}),Object(d.jsx)(ae,{conns:r,onDelete:function(e){var n,t;n=e,t=function(e,n){e?console.error(e):c(r.filter((function(e){return e._id===n.id&&e._rev===n.rev})))},q.remove(n,t)}})]})]})]})}var oe=t(57),ie=t(4),se=t(230),le=t(225),de=t(226),ue=t(97),je=t.n(ue),be=t(98),he=t.n(be),pe=t(91),me=t.n(pe),xe=t(92),fe=t.n(xe),Oe=t(93),ge=t.n(Oe),ve=t(94),we=t.n(ve),ye=t(95),Se=t.n(ye),Ce=t(60),ke=t.n(Ce),Ne=t(96),_e=t.n(Ne),Ie=Object(x.a)((function(e){return{toolbarIcon:Object(oe.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},e.mixins.toolbar)}})),We=Object(d.jsxs)("div",{children:[Object(d.jsxs)(J.a,{button:!0,children:[Object(d.jsx)(X.a,{children:Object(d.jsx)(me.a,{})}),Object(d.jsx)(K.a,{primary:"Dashboard"})]}),Object(d.jsxs)(J.a,{button:!0,children:[Object(d.jsx)(X.a,{children:Object(d.jsx)(fe.a,{})}),Object(d.jsx)(K.a,{primary:"Orders"})]}),Object(d.jsxs)(J.a,{button:!0,children:[Object(d.jsx)(X.a,{children:Object(d.jsx)(ge.a,{})}),Object(d.jsx)(K.a,{primary:"Customers"})]}),Object(d.jsxs)(J.a,{button:!0,children:[Object(d.jsx)(X.a,{children:Object(d.jsx)(we.a,{})}),Object(d.jsx)(K.a,{primary:"Reports"})]}),Object(d.jsxs)(J.a,{button:!0,children:[Object(d.jsx)(X.a,{children:Object(d.jsx)(Se.a,{})}),Object(d.jsx)(K.a,{primary:"Integrations"})]})]}),Be=Object(d.jsxs)("div",{children:[Object(d.jsx)(M.a,{inset:!0,children:"Saved reports"}),Object(d.jsxs)(J.a,{button:!0,children:[Object(d.jsx)(X.a,{children:Object(d.jsx)(ke.a,{})}),Object(d.jsx)(K.a,{primary:"Current month"})]}),Object(d.jsxs)(J.a,{button:!0,children:[Object(d.jsx)(X.a,{children:Object(d.jsx)(ke.a,{})}),Object(d.jsx)(K.a,{primary:"Last quarter"})]}),Object(d.jsxs)(J.a,{button:!0,children:[Object(d.jsx)(X.a,{children:Object(d.jsx)(ke.a,{})}),Object(d.jsx)(K.a,{primary:"Year-end sale"})]})]}),De=function(e){var n=e.closeDrawer,t=Ie();return Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{className:t.toolbarIcon,children:Object(d.jsx)(Z.a,{onClick:n,children:Object(d.jsx)(_e.a,{})})}),Object(d.jsx)(V.a,{}),Object(d.jsx)(U.a,{children:We}),Object(d.jsx)(V.a,{}),Object(d.jsx)(U.a,{children:Be}),")"]})},Pe=Object(x.a)((function(e){return{root:{display:"flex",height:"100vh"},toolbar:{paddingRight:24},toolbarIcon:Object(oe.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},e.mixins.toolbar),appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{marginLeft:240,width:"calc(100% - ".concat(240,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:36},menuButtonHidden:{display:"none"},title:{flexGrow:1},drawerPaper:{position:"relative",whiteSpace:"nowrap",width:240,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},drawerPaperClose:{overflowX:"hidden",transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),width:0},appBarSpacer:e.mixins.toolbar,content:{flexGrow:1,overflow:"auto",marginTop:64,padding:20,minWidth:"100%"},container:{paddingTop:e.spacing(4),paddingBottom:e.spacing(4)},paper:{padding:e.spacing(2),display:"flex",overflow:"auto",flexDirection:"column"},fixedHeight:{height:240}}}));function Le(e){var n=e.children,t=Object(a.useContext)(u).disconnect,c=Pe(),o=r.a.useState(!1),s=Object(i.a)(o,2),l=s[0],j=s[1];return Object(d.jsxs)("div",{className:c.root,children:[Object(d.jsx)(E.a,{}),Object(d.jsx)(le.a,{position:"absolute",className:Object(ie.a)(c.appBar,l&&c.appBarShift),children:Object(d.jsxs)(de.a,{className:c.toolbar,children:[Object(d.jsx)(Z.a,{edge:"start",color:"inherit","aria-label":"open drawer",onClick:function(){j(!0)},className:Object(ie.a)(c.menuButton,l&&c.menuButtonHidden),children:Object(d.jsx)(je.a,{})}),Object(d.jsx)(m.a,{component:"h1",variant:"h6",color:"inherit",noWrap:!0,className:c.title,children:"Dashboard"}),Object(d.jsx)(Z.a,{color:"inherit",onClick:function(){t()},children:Object(d.jsx)(he.a,{})})]})}),Object(d.jsx)(se.a,{variant:"permanent",classes:{paper:Object(ie.a)(c.drawerPaper,!l&&c.drawerPaperClose)},open:l,children:Object(d.jsx)(De,{closeDrawer:function(){j(!1)}})}),Object(d.jsx)("main",{className:c.content,children:n})]})}var Te=function(){var e=Object(a.useContext)(u),n=e.connected,t=e.disconnect;return n?Object(d.jsxs)(Le,{disconnect:t,children:[Object(d.jsx)(L,{}),Object(d.jsx)(V.a,{style:{margin:"20px 0"}}),Object(d.jsx)(W,{})]}):Object(d.jsx)(ce,{})},Ee=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,235)).then((function(n){var t=n.getCLS,a=n.getFID,r=n.getFCP,c=n.getLCP,o=n.getTTFB;t(e),a(e),r(e),c(e),o(e)}))},Ae=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Re(e,n){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}o.a.render(Object(d.jsx)(b,{children:Object(d.jsx)(Te,{})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var n="".concat("","/service-worker.js");Ae?(!function(e,n){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(t){var a=t.headers.get("content-type");404===t.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):Re(e,n)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(n,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):Re(n,e)}))}}(),Ee()}},[[161,1,2]]]);
//# sourceMappingURL=main.36f18d9e.chunk.js.map