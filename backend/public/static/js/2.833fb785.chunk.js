(this["webpackJsonprisk-solve"]=this["webpackJsonprisk-solve"]||[]).push([[2],{1790:function(e,t,a){"use strict";a.d(t,"i",(function(){return m})),a.d(t,"b",(function(){return d})),a.d(t,"l",(function(){return p})),a.d(t,"h",(function(){return f})),a.d(t,"a",(function(){return E})),a.d(t,"k",(function(){return b})),a.d(t,"j",(function(){return O})),a.d(t,"g",(function(){return v})),a.d(t,"f",(function(){return j})),a.d(t,"c",(function(){return h})),a.d(t,"m",(function(){return S})),a.d(t,"d",(function(){return y})),a.d(t,"e",(function(){return C}));var n=a(18),c=a(51),l=a.n(c),r=a(81),i=a(38),u=a(55),s=a(43),o=a(86),m=function(){return function(){var e=Object(r.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=Object(o.a)(t),e.next=3,a.get("".concat(s.b.FETCH_LEGAL)).then((function(e){e.status===s.c.STATUS_OK&&t({type:i.a.LEGAL.GET_ALL,payload:e.data})})).catch((function(e){}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},d=function(e,t){return function(){var a=Object(r.a)(l.a.mark((function a(n){var c;return l.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c=Object(o.a)(n),a.next=3,c.post("".concat(s.b.CREATE_LEGAL),e).then((function(a){var c;a.status===s.c.STATUS_OK&&(n(Object(u.c)("Legal Compliance Created Successfully!")),e.id=null===(c=a.data)||void 0===c?void 0:c.id,n({type:i.a.LEGAL.ADD_ONE,payload:e}),t());console.log(a)})).catch((function(e){var t;void 0!==e.response.status?e.response.status===s.c.BAD_REQUEST&&n(Object(u.a)(null===(t=e.response.data.errors)||void 0===t?void 0:t.Name[0])):n(Object(u.a)(e.message))}));case 3:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()},p=function(e,t){return function(){var a=Object(r.a)(l.a.mark((function a(n){var c;return l.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c=Object(o.a)(n),a.next=3,c.post("".concat(s.b.UPDATE_LEGAL),e).then((function(a){a.status===s.c.STATUS_OK&&(n(Object(u.c)("Compliance Updated Successfully!")),n({type:i.a.LEGAL.UPDATE_ONE,payload:e}),t())})).catch((function(e){var t,a;void 0!==(null===(t=e.response)||void 0===t?void 0:t.status)?e.response.status===s.c.BAD_REQUEST&&n(Object(u.a)(null===(a=e.response.data.errors)||void 0===a?void 0:a.Name[0])):n(Object(u.a)(e.message))}));case 3:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()},f=function(){return function(){var e=Object(r.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=Object(o.a)(t),e.next=3,a.get("".concat(s.b.FETCH_ENTERPRISE)).then((function(e){e.status===s.c.STATUS_OK&&t({type:i.a.ENTERPRISE.GET_ALL,payload:e.data})})).catch((function(e){}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},E=function(e,t){return function(){var a=Object(r.a)(l.a.mark((function a(n){var c;return l.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c=Object(o.a)(n),a.next=3,c.post("".concat(s.b.CREATE_ENTERPRISE),e).then((function(a){var c;a.status===s.c.STATUS_OK&&(n(Object(u.c)("Enterprise Compliance Created Successfully!")),e.id=null===(c=a.data)||void 0===c?void 0:c.id,n({type:i.a.ENTERPRISE.ADD_ONE,payload:e}),t())})).catch((function(e){var t;void 0!==e.response.status?e.response.status===s.c.BAD_REQUEST&&n(Object(u.a)(null===(t=e.response.data.errors)||void 0===t?void 0:t.Name[0])):n(Object(u.a)(e.message))}));case 3:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()},b=function(e,t){return function(){var a=Object(r.a)(l.a.mark((function a(n){var c;return l.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c=Object(o.a)(n),a.next=3,c.post("".concat(s.b.UPDATE_ENTERPRISE),e).then((function(a){a.status===s.c.STATUS_OK&&(n(Object(u.c)("Compliance Updated Successfully!")),n({type:i.a.ENTERPRISE.UPDATE_ONE,payload:e}),t())})).catch((function(e){var t,a;void 0!==(null===(t=e.response)||void 0===t?void 0:t.status)?e.response.status===s.c.BAD_REQUEST&&n(Object(u.a)(null===(a=e.response.data.errors)||void 0===a?void 0:a.Name[0])):n(Object(u.a)(e.message))}));case 3:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()},O=function(){return function(){var e=Object(r.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=Object(o.a)(t),e.next=3,a.get("".concat(s.b.FETCH_STATUTORY)).then((function(e){e.status===s.c.STATUS_OK&&t({type:i.a.STATUTORY.GET_ALL,payload:e.data})})).catch((function(e){}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},v=function(){return function(){var e=Object(r.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=Object(o.a)(t),e.next=3,a.get("".concat(s.b.FETCH_COMPLIANCES)).then((function(e){var a=e.data,c=[];a.length>0&&a.map((function(e){return c.push(Object(n.a)({},e.compliance))})),e.status===s.c.STATUS_OK&&t({type:i.a.STATUTORY.GET_COMPLIANCES,payload:c})})).catch((function(e){}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},j=function(){return function(){var e=Object(r.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=Object(o.a)(t),e.next=3,a.get("".concat(s.b.FETCH_APPROVALS)).then((function(e){var a=e.data,c=[];a.length>0&&a.map((function(e){return c.push(Object(n.a)({},e.compliance))})),e.status===s.c.STATUS_OK&&t({type:i.a.STATUTORY.GET_APPROVALS,payload:c})}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},h=function(e,t){return function(){var a=Object(r.a)(l.a.mark((function a(n){var c;return l.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c=Object(o.a)(n),a.next=3,c.post("".concat(s.b.CREATE_STATUTORY),e).then((function(a){var c;a.status===s.c.STATUS_OK&&(n(Object(u.c)("Statutory Compliance Created Successfully!")),e.id=null===(c=a.data)||void 0===c?void 0:c.id,n({type:i.a.STATUTORY.ADD_ONE,payload:e}),t())})).catch((function(e){var t;void 0!==e.response.status?e.response.status===s.c.BAD_REQUEST&&n(Object(u.a)(null===(t=e.response.data.errors)||void 0===t?void 0:t.Name[0])):n(Object(u.a)(e.message))}));case 3:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()},S=function(e,t){return function(){var a=Object(r.a)(l.a.mark((function a(n){var c;return l.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c=Object(o.a)(n),a.next=3,c.post("".concat(s.b.UPDATE_STATUTORY),e).then((function(a){a.status===s.c.STATUS_OK&&(n(Object(u.c)("Compliance Updated Successfully!")),n({type:i.a.STATUTORY.UPDATE_ONE,payload:e}),t())})).catch((function(e){var t,a;void 0!==(null===(t=e.response)||void 0===t?void 0:t.status)?e.response.status===s.c.BAD_REQUEST&&n(Object(u.a)(null===(a=e.response.data.errors)||void 0===a?void 0:a.Name[0])):n(Object(u.a)(e.message))}));case 3:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()},y=function(e){return function(){var t=Object(r.a)(l.a.mark((function t(a){var n;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=Object(o.a)(a),t.next=3,n.post("".concat(s.b.APPROVE_COMPLIANCE),e).then((function(e){var t;e.data.success?a(Object(u.c)("Compliance Approved Successfully!")):a(Object(u.a)(null!==(t=e.data.message)&&void 0!==t?t:"Ann error occured try again later!"))})).catch((function(e){console.log(e)}));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},C=function(e){return function(){var t=Object(r.a)(l.a.mark((function t(a){var n;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=Object(o.a)(a),t.next=3,n.post("".concat(s.b.COMPLY_COMPLIANCE),e).then((function(e){var t;e.data.success?a(Object(u.c)("Complied Successfully!")):a(Object(u.a)(null!==(t=e.data.message)&&void 0!==t?t:"Ann error occured try again later!"))})).catch((function(e){console.log(e)}));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}},1803:function(e,t,a){"use strict"},2040:function(e,t,a){"use strict";a.r(t),a.d(t,"Preview",(function(){return le}));var n=a(41),c=a(18),l=a(33),r=a(0),i=a.n(r),u=a(174),s=a(93),o=a(517),m=a(836),d=a(382),p=a(1651),f=a(1657),E=a(1656),b=a(1767),O=a(837),v=a(1768),j=a(1769),h=a(1770),S=a(1771),y=a(1772),C=a(1773),N=a(171),g=a(140),A=a(1763),T=a(21),I=a(139),x=a.n(I),_=a(1764),L=a(1765),w=a(1644),k=a(1738),D=a(202),U=a(1643),P=a(169),R=a(162),F=a(285),H=(a(1803),a(1775)),M=a(134),G=a.n(M),B=(a(365),a(90)),Y=a(114),W=a(60),K=a(1790),z=(a(476),a(1783)),Q=a(243),V=a(258),J=a(461),q=a(299),X=a(145),Z=a(613),$=[{label:s.a.DASHBOARD,link:"/"}],ee=function(e){var t=Object(g.a)(),a=e.handleOnSave,n=e.showForm,c=e.handleOnCancel,l=e.isEditable,r=e.setIsEditable;return i.a.createElement(o.a,{className:t.inBuildAppHeader},i.a.createElement(o.a,{className:t.inBuildAppHeaderSidebar},i.a.createElement(m.a,{style:{color:"white"},onClick:function(e){history.back()}},i.a.createElement(A.a,null)),i.a.createElement(d.a,{className:t.inBuildAppHeaderTitle,component:"div",variant:"h1"},"Compliance")),i.a.createElement(o.a,{className:t.inBuildAppHeaderContent},n&&i.a.createElement(o.a,{ml:"auto",display:"flex",alignItems:"center"},l?i.a.createElement(i.a.Fragment,null,i.a.createElement(o.a,{ml:1},i.a.createElement(p.a,{variant:"contained",style:{backgroundColor:"green",color:"white"},size:"small",onClick:a},"Save"))):i.a.createElement(i.a.Fragment,null,i.a.createElement(o.a,{ml:1},i.a.createElement(p.a,{variant:"contained",style:{backgroundColor:"green",color:"white"},size:"small",onClick:function(){return r(!0)}},"Edit"))),i.a.createElement(o.a,{ml:1},i.a.createElement(p.a,{variant:"contained",style:{backgroundColor:"darkred",color:"white"},size:"small",onClick:c},"Close")))))},te=["1. Compliance Details","2. Finish"],ae=function(e){var t=Object(g.a)(),a=e.activeStep,n=e.handleNext,c=e.handlePrev,l=e.setActiveStep;return i.a.createElement(o.a,{className:t.inBuildAppSidebar},i.a.createElement(x.a,{className:t.perfectScrollbarContactSidebar},i.a.createElement(o.a,{display:"flex",justifyItems:"center",justifyContent:"center",mt:2},i.a.createElement(m.a,{color:"primary",onClick:c,disabled:0===a},i.a.createElement(_.a,null)),i.a.createElement(o.a,{m:1}),i.a.createElement(m.a,{color:"primary",onClick:n,disabled:a===te.length-1},i.a.createElement(L.a,null))),i.a.createElement(o.a,{mt:5},i.a.createElement(U.a,{component:"nav",className:t.appNav},i.a.createElement(D.a,{data:te,renderRow:function(e,n){return i.a.createElement(ne,{key:n,index:n,activeStep:a,item:e,classes:t,setActiveStep:l})}})))))},ne=function(e){var t=e.index,a=e.item,n=e.classes,c=e.activeStep,l=e.setActiveStep,u=Object(r.useRef)(null);return i.a.createElement(i.a.Fragment,null,i.a.createElement(w.a,{ref:u,button:!0,title:a,onClick:function(e){return l(t)},className:Object(T.a)(n.appNavItem,n.appTaskNavItem,{active:t===c,completed:c>t})},i.a.createElement(k.a,{primary:a,className:"Cmt-nav-text"})))},ce=function(e){var t,a,n,u,s=Object(W.d)(),m=Object(W.e)((function(e){return e.subsidiaries})),d=m.subsidiaries,v=m.currentSubsidiary,j=Object(W.e)((function(e){return e.departments})).departments,h=Object(W.e)((function(e){return e.sections})).sections,S=Object(W.e)((function(e){return e.subSections})).subSections,y=Object(W.e)((function(e){return e.utils})),C=y.currencies,N=y.caseTypes,g=e.classes,A=e.activeStep,T=e.handleNext,I=e.handleOnSave,_=(e.handleReset,e.isUpdate,e.handlePrev),L=e.complianceDetails,w=e.setComplianceDetails,k=Object(r.useState)(new Date),D=Object(l.a)(k,2),U=D[0],M=D[1],B=Object(r.useState)(["KES","USD","EUR"]),Y=Object(l.a)(B,2),K=(Y[0],Y[1],{id:"",name:""});return Object(r.useEffect)((function(){w(Object(c.a)(Object(c.a)({},L),{},{dateofNextHearing:G()(U).format("YYYY-MM-DD")}))}),[U]),Object(r.useEffect)((function(){!function(e,t){var a=""!==e?parseFloat(e):0,n=""!==t?parseFloat(t):0;w(Object(c.a)(Object(c.a)({},L),{},{totalFees:a+n}))}(L.fees,L.fine)}),[L.fees,L.fine]),Object(r.useEffect)((function(){w(Object(c.a)(Object(c.a)({},L),{},{companyId:v,departmentsId:null,departmentsName:"",sectionsId:null,sectionsName:"",subSectionsId:null,subSectionsName:""}))}),[v]),Object(r.useEffect)((function(){s(Object(Q.c)()),s(Object(V.c)()),s(Object(q.c)()),s(Object(J.c)()),s(Object(Z.b)()),s(Object(Z.d)())}),[]),i.a.createElement(i.a.Fragment,null,i.a.createElement(o.a,{className:g.inBuildAppMainContent,minHeight:400},i.a.createElement(x.a,{className:g.perfectScrollbarContactCon},i.a.createElement(o.a,{p:5,display:"flex"},0===A&&i.a.createElement(o.a,{width:"100%"},i.a.createElement(P.a,null,i.a.createElement(f.a,{item:!0,md:12,xs:12},i.a.createElement(R.a,{fullWidth:!0,required:!0,variant:"outlined",label:"Case Title",value:L.title,onChange:function(e){return w(Object(c.a)(Object(c.a)({},L),{},{title:e.target.value}))}})),i.a.createElement(f.a,{item:!0,md:12,xs:12},i.a.createElement(R.a,{fullWidth:!0,multiline:!0,minRows:4,variant:"outlined",label:"Case Details",value:L.details,onChange:function(e){return w(Object(c.a)(Object(c.a)({},L),{},{details:e.target.value}))}})),i.a.createElement(f.a,{item:!0,md:12,xs:12},i.a.createElement(F.a,{fullWidth:!0,required:!0,data:N,label:"Case Type",valueKey:"name",variant:"outlined",labelKey:"name",value:L.caseType,onChange:function(e){return w(Object(c.a)(Object(c.a)({},L),{},{caseType:e.target.value}))}})),i.a.createElement(f.a,{item:!0,md:12,xs:12},i.a.createElement(R.a,{fullWidth:!0,variant:"outlined",label:"Judgement",multiline:!0,minRows:5,value:L.judgement,onChange:function(e){return w(Object(c.a)(Object(c.a)({},L),{},{judgement:e.target.value}))}})),i.a.createElement(f.a,{item:!0,md:12,xs:12},i.a.createElement(z.a,{fullWidth:!0,options:d,value:null!==(t=null===d||void 0===d?void 0:d.find((function(e){return e.id===L.companyId})))&&void 0!==t?t:K,getOptionLabel:function(e){return e.name},onChange:function(e,t){w(null!==t?Object(c.a)(Object(c.a)({},L),{},{companyId:t.id,companyName:t.name,departmentsId:null,departmentsName:"",sectionsId:null,sectionsName:"",subSectionsId:null,subSectionsName:""}):Object(c.a)(Object(c.a)({},L),{},{companyId:null,companyName:"",departmentsId:null,departmentsName:"",sectionsId:null,sectionsName:"",subSectionsId:null,subSectionsName:""}))},renderOption:function(e,t){t.selected;return i.a.createElement("span",{key:e.id},e.name)},renderInput:function(e){return i.a.createElement(E.a,Object.assign({required:!0,fullWidth:!0},e,{size:"small",variant:"outlined",label:"Subsidiary"}))}})),i.a.createElement(f.a,{item:!0,md:12,xs:12},i.a.createElement(z.a,{fullWidth:!0,options:j.filter((function(e){return e.companyId==L.companyId})),value:null!==(a=j.find((function(e){return e.id===L.departmentsId})))&&void 0!==a?a:K,getOptionLabel:function(e){return e.name},onChange:function(e,t){w(null!==t?Object(c.a)(Object(c.a)({},L),{},{departmentsId:t.id,departmentsName:t.name,sectionsId:null,sectionsName:"",subSectionsId:null,subSectionsName:""}):Object(c.a)(Object(c.a)({},L),{},{departmentsId:null,departmentsName:"",sectionsId:null,sectionsName:"",subSectionsId:null,subSectionsName:""}))},renderOption:function(e,t){t.selected;return i.a.createElement("span",{key:e.id},e.name)},renderInput:function(e){return i.a.createElement(E.a,Object.assign({helperText:null===L.companyId?"Select Subsidiary":"",fullWidth:!0},e,{size:"small",variant:"outlined",label:"Department"}))}})),i.a.createElement(f.a,{item:!0,md:12,xs:12},i.a.createElement(z.a,{fullWidth:!0,options:h.filter((function(e){return e.departmentsId==L.departmentsId})),value:null!==(n=h.find((function(e){return e.id===L.sectionsId})))&&void 0!==n?n:K,getOptionLabel:function(e){return e.name},onChange:function(e,t){w(null!==t?Object(c.a)(Object(c.a)({},L),{},{sectionsId:t.id,sectionsName:t.name,subSectionsId:null,subSectionsName:""}):Object(c.a)(Object(c.a)({},L),{},{sectionsId:null,sectionsName:"",subSectionsId:null,subSectionsName:""}))},renderOption:function(e,t){t.selected;return i.a.createElement("span",{key:e.id},e.name)},renderInput:function(e){return i.a.createElement(E.a,Object.assign({helperText:null===L.departmentsId?"Select Department":"",fullWidth:!0},e,{size:"small",variant:"outlined",label:"Section"}))}})),i.a.createElement(f.a,{item:!0,md:12,xs:12},i.a.createElement(z.a,{fullWidth:!0,options:S.filter((function(e){return e.sectionsId==L.sectionsId})),value:null!==(u=S.find((function(e){return e.id===L.sectionsId})))&&void 0!==u?u:K,getOptionLabel:function(e){return e.name},onChange:function(e,t){w(null!==t?Object(c.a)(Object(c.a)({},L),{},{subSectionsId:t.id,subSectionsName:t.name}):Object(c.a)(Object(c.a)({},L),{},{subSectionsId:null,subSectionsName:""}))},renderOption:function(e,t){t.selected;return i.a.createElement("span",{key:e.id},e.name)},renderInput:function(e){return i.a.createElement(E.a,Object.assign({helperText:null===L.sectionsId?"Select Section":"",fullWidth:!0},e,{size:"small",variant:"outlined",label:"Sub-Section"}))}})),i.a.createElement(f.a,{item:!0,md:12,xs:12},i.a.createElement(E.a,{fullWidth:!0,label:"Fees",type:"number",variant:"outlined",value:L.fees,onChange:function(e){w(Object(c.a)(Object(c.a)({},L),{},{fees:e.target.value}))},InputProps:{startAdornment:i.a.createElement(b.a,{position:"start"},i.a.createElement(E.a,{select:!0,style:{width:"90px"},label:"",value:L.penaltyCurrency,onChange:function(e){return w(Object(c.a)(Object(c.a)({},L),{},{penaltyCurrency:e.target.value}))},InputProps:{disableUnderline:!0}},C.map((function(e){return i.a.createElement(O.a,{key:e.id,value:e.name},e.name)}))))}})),i.a.createElement(f.a,{item:!0,md:12,xs:12},i.a.createElement(E.a,{fullWidth:!0,label:"Fines",type:"number",variant:"outlined",value:L.fine,onChange:function(e){w(Object(c.a)(Object(c.a)({},L),{},{fine:e.target.value}))},InputProps:{startAdornment:i.a.createElement(b.a,{position:"start"},i.a.createElement(E.a,{select:!0,style:{width:"90px"},label:"",value:L.penaltyCurrency,onChange:function(e){return w(Object(c.a)(Object(c.a)({},L),{},{penaltyCurrency:e.target.value}))},InputProps:{disableUnderline:!0}},C.map((function(e){return i.a.createElement(O.a,{key:e,value:e.name},e.name)}))))}})),i.a.createElement(f.a,{item:!0,md:12,xs:12},i.a.createElement(E.a,{fullWidth:!0,label:"Total Fees & Fines",type:"number",variant:"outlined",value:L.totalFees,onChange:function(e){w(Object(c.a)(Object(c.a)({},L),{},{totalFees:e.target.value}))},disabled:!0,InputProps:{startAdornment:i.a.createElement(b.a,{position:"start"},i.a.createElement(E.a,{select:!0,disabled:!0,style:{width:"90px"},label:"",value:L.penaltyCurrency,onChange:function(e){return w(Object(c.a)(Object(c.a)({},L),{},{penaltyCurrency:e.target.value}))},InputProps:{disableUnderline:!0}},C.map((function(e){return i.a.createElement(O.a,{key:e,value:e.name},e.name)}))))}})),i.a.createElement(f.a,{item:!0,md:12,xs:12},i.a.createElement(H.a,{autoOk:!0,fullWidth:!0,clearable:!0,inputVariant:"outlined",label:"Date of Next Hearing",onChange:function(e){M(e)},value:""!==L.dateofNextHearing?L.dateofNextHearing:U,format:"DD-MM-yyyy",animateYearScrolling:!0})),i.a.createElement(f.a,{item:!0,md:12,xs:12},i.a.createElement(R.a,{fullWidth:!0,variant:"outlined",label:"Management Comments",multiline:!0,minRows:5,value:L.managementComments,onChange:function(e){return w(Object(c.a)(Object(c.a)({},L),{},{managementComments:e.target.value}))}})))),1===A&&i.a.createElement(o.a,{width:"100%"},i.a.createElement(le,{complianceDetails:L}))),i.a.createElement(o.a,{display:"flex",m:3,pb:3},A===te.length-1&&i.a.createElement(p.a,{onClick:_,variant:"contained",color:"primary",size:"small"},"Prev"),i.a.createElement(o.a,{flex:"1 0 auto"}),A!==te.length-1&&i.a.createElement(p.a,{onClick:T,variant:"contained",color:"primary",size:"small"},"Continue"),A===te.length-1&&i.a.createElement(p.a,{onClick:I,variant:"contained",color:"primary",size:"small"},"Save")))))},le=function(e){var t,a=e.complianceDetails,n=e.isView,c=Object(g.a)();return i.a.createElement(v.a,{className:c.inBuildAppCard},i.a.createElement(j.a,{size:"small","aria-label":"a dense table"},!n&&i.a.createElement(h.a,{className:c.tableHeader},i.a.createElement(S.a,null,i.a.createElement(y.a,{className:c.tableHeaderCell},"Field Name"),i.a.createElement(y.a,{className:c.tableHeaderCell},"Input Value"))),i.a.createElement(C.a,null,i.a.createElement(S.a,null,i.a.createElement(y.a,null,i.a.createElement("b",null,"Case Title")),i.a.createElement(y.a,null,""!==a.title?a.title:"Not Set")),i.a.createElement(S.a,null,i.a.createElement(y.a,null,i.a.createElement("b",null,"Case Details")),i.a.createElement(y.a,null,""!==a.details?(t=a.details,i.a.createElement("div",{dangerouslySetInnerHTML:{__html:t}})):"Not Set")),i.a.createElement(S.a,null,i.a.createElement(y.a,null,i.a.createElement("b",null,"Case Type")),i.a.createElement(y.a,null,""!==a.caseType?a.caseType:"Not Set")),i.a.createElement(S.a,null,i.a.createElement(y.a,null,i.a.createElement("b",null,"Judgement")),i.a.createElement(y.a,null,""!==a.judgement?a.judgement:"Not Set")),i.a.createElement(S.a,null,i.a.createElement(y.a,null,i.a.createElement("b",null,"Company")),i.a.createElement(y.a,null,""!==a.companyName?a.companyName:"Not Set")),i.a.createElement(S.a,null,i.a.createElement(y.a,null,i.a.createElement("b",null,"Department")),i.a.createElement(y.a,null,""!==a.departmentsName?a.departmentsName:"Not Set")),i.a.createElement(S.a,null,i.a.createElement(y.a,null,i.a.createElement("b",null,"Section")),i.a.createElement(y.a,null,""!==a.sectionsName?a.sectionsName:"Not Set")),i.a.createElement(S.a,null,i.a.createElement(y.a,null,i.a.createElement("b",null,"Sub Section")),i.a.createElement(y.a,null,""!==a.subSectionsName?a.subSectionsName:"Not Set")),i.a.createElement(S.a,null,i.a.createElement(y.a,null,i.a.createElement("b",null,"Fees in ",a.penaltyCurrency)),i.a.createElement(y.a,null,""!==a.fees?a.fees:"Not Set")),i.a.createElement(S.a,null,i.a.createElement(y.a,null,i.a.createElement("b",null,"Fines in ",a.penaltyCurrency)),i.a.createElement(y.a,null,""!==a.fine?a.fine:"Not Set")),i.a.createElement(S.a,null,i.a.createElement(y.a,null,i.a.createElement("b",null,"Total Fees & Fines in ",a.penaltyCurrency)),i.a.createElement(y.a,null,""!==a.totalFees?a.totalFees:"Not Set")),i.a.createElement(S.a,null,i.a.createElement(y.a,null,i.a.createElement("b",null,"Date of Next Hearing")),i.a.createElement(y.a,null,""!==a.dateofNextHearing?a.dateofNextHearing:"Not Set")),i.a.createElement(S.a,null,i.a.createElement(y.a,null,i.a.createElement("b",null,"Management Comments")),i.a.createElement(y.a,null,""!==a.managementComments?a.managementComments:"Not Set")),i.a.createElement(S.a,null,i.a.createElement(y.a,null,i.a.createElement("b",null,"Case File Attachment")),i.a.createElement(y.a,null,""!==a.caseFileAttachment?a.caseFileAttachment:"Not Uploaded")))))},re=function(e){var t=e.classes,a=e.handleReset,n=e.isUpdate;return i.a.createElement(o.a,{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"},i.a.createElement(X.a,{src:"/images/ic_ok.svg",style:{width:"50px"}}),i.a.createElement("p",{className:t.instructions,style:{marginTop:"10px"}},i.a.createElement("b",null,"Compliance was ",n?"updated":"created"," successfully!")),i.a.createElement(o.a,{mt:10},i.a.createElement(Y.a,{to:"/compliance/legal-compliance"},i.a.createElement(p.a,{color:"primary",variant:"contained"},"Back to Compliance Dashboard")),!n&&i.a.createElement(p.a,{onClick:a,className:t.button},"Create New Compliance")))};t.default=function(){var e=Object(g.a)(),t=Object(W.d)(),a=Object(r.useState)(0),m=Object(l.a)(a,2),d=m[0],p=m[1],f={title:"",details:"",judgement:"",companyId:"",departmentsId:null,departmentsName:null,sectionsId:null,sectionsName:null,subSectionsId:null,subSectionsName:null,fine:0,fees:0,totalFees:0,penaltyCurrency:"KES",managementComments:"",active:!0,dateofNextHearing:G()(new Date).format("YYYY-MM-DD"),caseType:"",caseFileAttachment:""},E=Object(r.useState)(f),b=Object(l.a)(E,2),O=b[0],v=b[1],j=Object(r.useState)($),h=Object(l.a)(j,2),S=h[0],y=h[1],C=Object(r.useState)(!1),A=Object(l.a)(C,2),I=A[0],x=A[1],_=Object(B.h)(),L=function(){p(d+1)},w=function(){p(d-1)},k=function(){v(f),x(!1),p(0)};return Object(r.useEffect)((function(){void 0!==_.state?(y([].concat(Object(n.a)(S),[{label:s.a.LEGAL_COMPLIANCE.name,link:"/compliance/".concat(s.a.LEGAL_COMPLIANCE.url)},{label:s.a.UPDATE_LEGAL_COMPLIANCE,isActive:!0}])),v(_.state),x(!0)):(y([].concat(Object(n.a)(S),[{label:s.a.LEGAL_COMPLIANCE.name,link:"/compliance/".concat(s.a.LEGAL_COMPLIANCE.url)},{label:s.a.CREATE_LEGAL_COMPLIANCE,isActive:!0}])),v(f),x(!1))}),[_]),i.a.createElement(i.a.Fragment,null,i.a.createElement(u.a,{heading:I?s.a.UPDATE_LEGAL_COMPLIANCE:s.a.CREATE_LEGAL_COMPLIANCE,breadcrumbs:S},i.a.createElement(o.a,{className:e.inBuildAppCard},i.a.createElement(ee,null),d===te.length?i.a.createElement(o.a,{className:Object(T.a)(e.inBuildAppContainer),minHeight:400},i.a.createElement(o.a,{width:"100%",m:5},i.a.createElement(re,{classes:e,handleReset:k,isUpdate:I}))):i.a.createElement(o.a,{className:Object(T.a)(e.inBuildAppContainer)},i.a.createElement(ae,{activeStep:d,handleNext:L,handlePrev:w,setActiveStep:p}),i.a.createElement(ce,{classes:e,isUpdate:I,activeStep:d,handleNext:L,handlePrev:w,handleReset:k,complianceDetails:O,setComplianceDetails:v,handleOnSave:function(e){e.preventDefault();var a=Object(c.a)(Object(c.a)({},O),{},{fees:parseFloat(O.fees),fine:parseFloat(O.fine)});t(I?Object(K.l)(a,(function(){return L()})):Object(K.b)(a,(function(){return L()})))}})))),i.a.createElement(N.NotificationContainer,null))}}}]);
//# sourceMappingURL=2.833fb785.chunk.js.map