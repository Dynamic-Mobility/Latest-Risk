(this["webpackJsonprisk-solve"]=this["webpackJsonprisk-solve"]||[]).push([[20],{2091:function(e,a,t){"use strict";t.r(a);var l=t(33),n=t(0),i=t.n(n),o=t(174),r=t(93),c=t(517),m=t(171),d=t(140),s=t(90),u=t(80),p=t(25),g=t(298),w=t(423),h=t(91),E=t(836),b=t(382),F=t(1787),C=t(1702),f=t(21),S=t(139),v=t.n(S),y=t(145),O=t(216),x=t.n(O),j=t(744),D=t(2040),k=t(92),H=["complianceDetails","openDrawer","onCloseDrawer","isLegalCompliance"],N=Object(w.a)((function(e){var a,t;return{root:{display:"flex"},headerRoot:(a={position:"relative",margin:"-30px -15px 0 -15px",paddingRight:15,paddingLeft:15,paddingTop:30,paddingBottom:20},Object(p.a)(a,e.breakpoints.up("sm"),{paddingTop:20}),Object(p.a)(a,e.breakpoints.up("md"),{marginLeft:-50,marginRight:-50,paddingLeft:50,paddingRight:50}),Object(p.a)(a,e.breakpoints.up("lg"),{marginLeft:-65,marginRight:-65,paddingLeft:65,paddingRight:65}),Object(p.a)(a,e.breakpoints.up("xl"),{marginLeft:-88,marginRight:-88,paddingLeft:88,paddingRight:88}),a),headerBgImg:(t={position:"absolute",left:0,top:0,width:"100%",height:"100%",minHeight:"auto",zIndex:0},Object(p.a)(t,e.breakpoints.up("sm"),{minHeight:"auto"}),Object(p.a)(t,"&:before",{content:'""',position:"absolute",left:0,top:0,width:"100%",height:"100%",backgroundColor:Object(h.a)(e.palette.primary.main,.5)}),Object(p.a)(t,"& img",{width:"100%",height:"100%"}),t),headerContent:{position:"relative",zIndex:3},titleRoot:{color:e.palette.common.white},actionSidebar:{display:"flex",flexDirection:"column",alignItems:"center",padding:"24px 5px",width:65,borderRight:"1px solid ".concat(e.palette.divider)},contentArea:Object(p.a)({width:300},e.breakpoints.up("sm"),{width:557}),scrollbarRoot:{height:"100vh",padding:10},iconBtn:{position:"relative",color:Object(h.a)(e.palette.common.white,.7),"&:hover, &:focus, &.active":{color:Object(h.a)(e.palette.common.white,1),backgroundColor:Object(h.a)(e.palette.primary.main,.08)}},counterRoot:{color:e.palette.common.white,border:"solid 1px ".concat(e.palette.common.white),backgroundColor:e.palette.warning.main,width:20},iconView:{backgroundColor:Object(h.a)(j.a[500],.1),color:j.a[500],padding:8,borderRadius:4,"& .MuiSvgIcon-root":{display:"block"},"&.web":{backgroundColor:Object(h.a)(e.palette.warning.main,.1),color:e.palette.warning.main},"&.phone":{backgroundColor:Object(h.a)(e.palette.success.main,.15),color:e.palette.success.dark}},wordAddress:{wordBreak:"break-all",cursor:"pointer"}}})),L=Object(C.a)()((function(e){var a=e.complianceDetails,t=e.openDrawer,o=e.onCloseDrawer,r=e.isLegalCompliance,m=Object(u.a)(e,H),d=Object(n.useState)("right"),s=Object(l.a)(d,1)[0],p=N(),w=Object(k.b)(a.active);return i.a.createElement(g.a,Object.assign({open:t,variant:"temporary",anchor:s,onClose:o},m),i.a.createElement("div",{className:Object(f.a)(p.root)},i.a.createElement(c.a,{className:p.contentArea},i.a.createElement(v.a,{className:p.scrollbarRoot},i.a.createElement(c.a,{className:p.headerRoot},i.a.createElement(c.a,{className:p.headerBgImg},i.a.createElement(y.a,{src:"/images/profile-bg-img.png"})),i.a.createElement(c.a,{className:p.headerContent},i.a.createElement(c.a,{display:"flex",alignItems:"center"},i.a.createElement(E.a,{className:p.iconBtn,onClick:o},i.a.createElement(x.a,null)),i.a.createElement(b.a,{variant:"h5",style:{color:"white"}},a.title),i.a.createElement(c.a,{flex:"1 0 auto"}),i.a.createElement(F.a,{size:"small",variant:"default",label:w.label,style:{color:"white",backgroundColor:w.color}})))),i.a.createElement(c.a,null,i.a.createElement(D.Preview,{complianceDetails:a,isView:!0,isLegalCompliance:r}))))))})),R=t(60),P=t(1790),W=t(95),I=t.n(W),T=t(1648),A=t(1744),B=t(1698),z=t(1710),M=t(1745),V=t(1746),G=t(1758),_=t(1759),U=t(1779),J=t(1651),q=t(850),K=t(199),Q=t(31),X=t(365),Y=i.a.forwardRef((function(e,a){return i.a.createElement(T.a,Object.assign({direction:"up",ref:a},e))}));var Z=function(e){return i.a.createElement(c.a,{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"},i.a.createElement(y.a,{src:"/images/ic_download.ico",style:{width:"100px"}}),i.a.createElement("p",{style:{marginTop:"10px"}},i.a.createElement("b",null,"Download the excel file below!")),i.a.createElement(J.a,{style:{marginTop:"20px"},variant:"outlined",color:"primary"},"Download Here"))},$=function(e){var a=e.setFile;return i.a.createElement(c.a,{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"},i.a.createElement(c.a,{width:"50%",mt:2},i.a.createElement(q.a,{useChipsForPreview:!0,showPreviewsInDropzone:!1,showPreviews:!0,filesLimit:1,onChange:function(e){return function(e){1===e.length?a(e[0]):a("")}(e)},acceptedFiles:[".csv",".xlsx",".xls"]})))},ee=function(e){var a=e.complianceList;return i.a.createElement(i.a.Fragment,null,i.a.createElement(K.DataGrid,{id:"uploadedCompliance",columnAutoWidth:!0,dataSource:a,showColumnLines:!0,showRowLines:!0,showBorders:!0,repaintChangesOnly:!0,allowColumnResizing:!0,rowAlternationEnabled:!0},i.a.createElement(Q.FilterRow,{visible:!0}),i.a.createElement(Q.FilterPanel,{visible:!0}),i.a.createElement(Q.SearchPanel,{visible:!0}),i.a.createElement(Q.Editing,{mode:"cell",allowUpdating:!0,allowDeleting:!0,allowAdding:!0}),i.a.createElement(Q.HeaderFilter,{visible:!0,allowSearch:!0}),i.a.createElement(Q.Column,{dataField:"id",key:"id",visible:!1}),i.a.createElement(Q.Column,{caption:"#",width:50,allowFiltering:!1,cellRender:function(e){return e.rowIndex+1}}),i.a.createElement(Q.Column,{dataField:"complianceTitle",minWidth:100,caption:"Title",allowHeaderFiltering:!0,allowSearch:!0,allowFiltering:!1}),i.a.createElement(Q.Column,{dataField:"complianceDesc",minWidth:100,caption:"Description",encodeHtml:!1,allowHeaderFiltering:!0,allowSearch:!0,allowFiltering:!1}),i.a.createElement(Q.Column,{dataField:"authority",minWidth:100,caption:"Authority",allowHeaderFiltering:!0,allowSearch:!0,allowFiltering:!1}),i.a.createElement(Q.Column,{dataField:"subsidiary",minWidth:100,caption:"Subsidiary",allowHeaderFiltering:!0,allowSearch:!0,allowFiltering:!1},i.a.createElement(Q.Lookup,{dataSource:X.d,displayExpr:"subsidiaryName",valueExpr:"subsidiaryName"})),i.a.createElement(Q.Column,{dataField:"department",minWidth:100,caption:"Department",allowHeaderFiltering:!0,allowSearch:!0,allowFiltering:!1},i.a.createElement(Q.Lookup,{dataSource:X.a,displayExpr:"deptName",valueExpr:"deptName"})),i.a.createElement(Q.Column,{dataField:"section",minWidth:100,caption:"Section",allowHeaderFiltering:!0,allowSearch:!0,allowFiltering:!1},i.a.createElement(Q.Lookup,{dataSource:X.b,displayExpr:"sectionName",valueExpr:"sectionName"})),i.a.createElement(Q.Column,{dataField:"subSection",minWidth:100,caption:"Sub-Section",allowHeaderFiltering:!0,allowSearch:!0,allowFiltering:!1},i.a.createElement(Q.Lookup,{dataSource:X.c,displayExpr:"subSectionName",valueExpr:"subSectionName"})),i.a.createElement(Q.Column,{dataField:"penalty",minWidth:100,caption:"Penalty",allowHeaderFiltering:!0,allowSearch:!0,allowFiltering:!1}),i.a.createElement(Q.Column,{dataField:"primaryOwner",minWidth:100,caption:"Primary Owner"}),i.a.createElement(Q.Column,{dataField:"secondaryOwner",minWidth:100,caption:"Secondary Owner",allowHeaderFiltering:!0,allowSearch:!0,allowFiltering:!1}),i.a.createElement(Q.Column,{dataField:"escalationPerson",minWidth:100,caption:"Escalation Person",allowHeaderFiltering:!0,allowSearch:!0,allowFiltering:!1}),i.a.createElement(Q.Column,{dataField:"priority",minWidth:100,caption:"Priority",allowHeaderFiltering:!0,allowSearch:!0,allowFiltering:!1}),i.a.createElement(Q.Column,{dataField:"frequency",minWidth:100,caption:"Frequency",allowHeaderFiltering:!0,allowSearch:!0,allowFiltering:!1}),i.a.createElement(Q.Column,{dataField:"submissionDeadline",minWidth:100,caption:"Submission Deadline",allowHeaderFiltering:!0,allowSearch:!0,allowFiltering:!1}),i.a.createElement(Q.Column,{dataField:"complianceType",minWidth:100,caption:"Compliance Type",allowHeaderFiltering:!0,allowSearch:!0,allowFiltering:!1}),i.a.createElement(Q.Column,{dataField:"sourceDoc",minWidth:100,caption:"Source Document",allowHeaderFiltering:!0,allowSearch:!0,allowFiltering:!1}),i.a.createElement(Q.Scrolling,{rowRenderingMode:"virtual"}),i.a.createElement(Q.Paging,{defaultPageSize:20}),i.a.createElement(Q.Pager,{visible:!0,displayMode:!0,showPageSizeSelector:!1,showInfo:!0,showNavigationButtons:!0})))},ae=function(e){var a=e.openDialog,t=e.onCloseDialog,l=e.setActiveStep,n=e.activeStep,o=e.file,r=e.setFile,m=e.complianceList,d=e.breadCrumbsTitle,s=I()((function(e){return{backButton:{marginRight:e.spacing(2)},instructions:{marginTop:e.spacing(2),marginBottom:e.spacing(2)},dialogRoot:{position:"relative"},dialogHeader:{backgroundColor:e.palette.primary.main,position:"relative"},dialogTitleRoot:{"& .MuiTypography-h6":{fontSize:16,color:e.palette.common.white}},scrollbar:{height:function(e){return"calc(100vh - ".concat(e.height,"px)")}}}}))(),u=["Download Template","Upload File","Validation & Confirmation"];return i.a.createElement(A.a,{open:a,onClose:t,scroll:"paper",fullScreen:!0,TransitionComponent:Y,className:s.dialogRoot},i.a.createElement(B.a,{className:s.dialogHeader},i.a.createElement(z.a,null,i.a.createElement(E.a,{edge:"start",color:"inherit",onClick:t,"aria-label":"close"},i.a.createElement(x.a,null)),i.a.createElement(M.a,{className:s.dialogTitleRoot},d," Bulk Import"))),i.a.createElement(v.a,{className:s.scrollbar},i.a.createElement(V.a,{style:{marginTop:10}},i.a.createElement(c.a,{sx:{width:"100%"}},i.a.createElement(c.a,null,i.a.createElement(G.a,{activeStep:n,alternativeLabel:!0},u.map((function(e){return i.a.createElement(_.a,{key:e},i.a.createElement(U.a,null,e))}))),i.a.createElement(c.a,null,n===u.length?i.a.createElement(c.a,{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"},i.a.createElement(y.a,{src:"/images/ic_ok.svg",style:{width:"100px"}}),i.a.createElement("p",{style:{marginTop:10}},i.a.createElement("b",null,"New Records created successfully!")),i.a.createElement(c.a,{mt:10},i.a.createElement(J.a,{onClick:t,variant:"outlined",color:"primary"},"Finish"))):i.a.createElement(i.a.Fragment,null,i.a.createElement(c.a,null,0===n&&i.a.createElement(i.a.Fragment,null,i.a.createElement(Z,null)),1===n&&i.a.createElement(i.a.Fragment,null,i.a.createElement($,{file:o,setFile:r})),2===n&&i.a.createElement(i.a.Fragment,null,i.a.createElement(ee,{complianceList:m}))),i.a.createElement(c.a,{mt:20,display:"flex"},i.a.createElement(J.a,{disabled:0===n,onClick:function(){l((function(e){return e-1}))},className:s.backButton},"Back"),i.a.createElement(c.a,{flex:"1 0 auto"}),i.a.createElement(J.a,{variant:"contained",color:"primary",onClick:function(){l((function(e){return e+1}))}},n===u.length-1?"Finish":"Next")))))))))},te=t(114),le=t(1756),ne=t(215),ie=t(1739),oe=t(1740),re=t(1741),ce=t(1742),me=t(1743),de=t(200),se=function(e){var a=Object(ne.a)(),t=e.breadCrumbsTitle,l=e.complianceList,n=e.setOpenDialog,o=e.onViewCompliance,r=e.onUpdateCompliance,c=e.onDeleteCompliance,m=function(e){return function(e){var a=[{action:"view",label:"View",icon:i.a.createElement(ie.a,null)},{action:"edit",label:"Edit",icon:i.a.createElement(oe.a,null)}];return a.push({action:"delete",label:"Delete",icon:i.a.createElement(re.a,null)}),a}()};return i.a.createElement(i.a.Fragment,null,i.a.createElement(K.DataGrid,{id:"legal-compliance",columnAutoWidth:!0,dataSource:l,showColumnLines:!0,showRowLines:!0,showBorders:!0,allowColumnResizing:!0,rowAlternationEnabled:!0},i.a.createElement(Q.FilterRow,{visible:!0}),i.a.createElement(Q.StateStoring,{enabled:!1,type:"localStorage",storageKey:"legal-compliance"}),i.a.createElement(Q.FilterPanel,{visible:!0}),i.a.createElement(Q.SearchPanel,{visible:!0}),i.a.createElement(Q.ColumnChooser,{enabled:!0,mode:"select"}),i.a.createElement(Q.HeaderFilter,{visible:!0,allowSearch:!0}),i.a.createElement(Q.Column,{caption:"Action",width:120,alignment:"center",allowFiltering:!1,cellRender:function(e){var a=e.data;return e.rowIndex,i.a.createElement(de.a,{items:m(),onItemClick:function(e){return function(e,a){"view"===e.action?o(a):"edit"===e.action?r(a):"delete"===e.action&&c(a)}(e,a)},TriggerComponent:i.a.createElement(ce.a,null)})}}),i.a.createElement(Q.Column,{dataField:"title",width:150,caption:"Case Title",allowHeaderFiltering:!0,allowSearch:!0,cellRender:function(e){var a=e.data,t=e.displayValue;return i.a.createElement("a",{href:"#",onClick:function(e){e.preventDefault(),o(a)}},t)},allowFiltering:!1}),i.a.createElement(Q.Column,{dataField:"details",width:200,encodeHtml:!1,caption:"Case Details",allowHeaderFiltering:!0,allowSearch:!0,allowFiltering:!1}),i.a.createElement(Q.Column,{dataField:"caseType",width:120,caption:"Case Type",allowHeaderFiltering:!0,allowSearch:!0,allowFiltering:!1}),i.a.createElement(Q.Column,{dataField:"active",minWidth:100,caption:"Case Status",allowHeaderFiltering:!0,allowSearch:!0,allowFiltering:!1,allowHiding:!0,cellRender:function(e){var a=e.displayValue,t=Object(k.b)(a);return i.a.createElement(F.a,{style:{color:t.color,borderColor:t.color},size:"small",variant:"outlined",label:t.label})}}),i.a.createElement(Q.Column,{dataField:"judgement",width:200,caption:"Judgement",allowHeaderFiltering:!0,allowSearch:!0,allowFiltering:!1}),i.a.createElement(Q.Column,{dataField:"companyName",minWidth:100,caption:"Company",allowHeaderFiltering:!0,allowSearch:!0,allowFiltering:!1}),i.a.createElement(Q.Column,{dataField:"departmentsName",minWidth:100,caption:"Department",allowHeaderFiltering:!0,allowSearch:!0,allowFiltering:!1}),i.a.createElement(Q.Column,{dataField:"sectionsName",minWidth:100,caption:"Section",allowHeaderFiltering:!0,allowSearch:!0,allowFiltering:!1}),i.a.createElement(Q.Column,{dataField:"subSectionsName",minWidth:100,caption:"Sub-Section",allowHeaderFiltering:!0,allowSearch:!0,allowFiltering:!1}),i.a.createElement(Q.Column,{dataField:"totalFees",minWidth:100,caption:"Total Fines & Fees",allowHeaderFiltering:!0,allowSearch:!0,allowFiltering:!1}),i.a.createElement(Q.Column,{dataField:"dateofNextHearing",minWidth:100,caption:"Date of Next Hearing",allowHeaderFiltering:!0,allowSearch:!0,allowFiltering:!1}),i.a.createElement(Q.Column,{dataField:"managementComments",minWidth:100,caption:"Management Comments",allowHeaderFiltering:!0,allowSearch:!0,allowFiltering:!1}),i.a.createElement(Q.Column,{dataField:"caseFileAttachment",minWidth:100,caption:"Case File Attachment",allowHeaderFiltering:!0,allowSearch:!0,allowFiltering:!1}),i.a.createElement(Q.Scrolling,{rowRenderingMode:"virtual"}),i.a.createElement(Q.Paging,{defaultPageSize:20}),i.a.createElement(Q.Pager,{visible:!0,allowedPageSizes:["all",10,20,50,100],displayMode:!0,showPageSizeSelector:!1,showInfo:!0,showNavigationButtons:!0}),i.a.createElement(Q.Toolbar,null,i.a.createElement(Q.Item,{location:"before"},i.a.createElement(te.a,{to:"legal-compliance/create"},i.a.createElement(J.a,{variant:"contained",size:"small",className:a.btn,color:"primary",style:{marginBottom:"10px"}},i.a.createElement(me.a,null)," Create ",t))),i.a.createElement(Q.Item,{location:"before"},i.a.createElement(J.a,{variant:"contained",size:"small",className:a.btn,onClick:function(e){return n(!0)},color:"primary",style:{marginBottom:"10px"}},i.a.createElement(le.a,null)," Import ",t)),i.a.createElement(Q.Item,{location:"after",name:"columnChooserButton"}),i.a.createElement(Q.Item,{location:"after",name:"searchPanel"}))))},ue=[{label:r.a.DASHBOARD,link:"/"},{label:r.a.LEGAL_COMPLIANCE.name,active:!1}];a.default=function(){var e=Object(n.useState)(0),a=Object(l.a)(e,2),t=a[0],u=a[1],p=Object(n.useState)(""),g=Object(l.a)(p,2),w=g[0],h=g[1],E=Object(R.d)(),b=Object(R.e)((function(e){return e.compliance})).legalComplianceData,F=Object(n.useState)(!1),C=Object(l.a)(F,2),f=C[0],S=C[1],v=Object(n.useState)(!1),y=Object(l.a)(v,2),O=y[0],x=y[1],j=Object(n.useState)({}),D=Object(l.a)(j,2),k=D[0],H=D[1],N=Object(d.a)(),W=Object(s.g)();return Object(n.useEffect)((function(){E(Object(P.i)())}),[]),i.a.createElement(i.a.Fragment,null,i.a.createElement(o.a,{heading:r.a.LEGAL_COMPLIANCE.name,breadcrumbs:ue},i.a.createElement(c.a,{className:N.inBuildAppCard},i.a.createElement(c.a,{padding:5},i.a.createElement(se,{breadCrumbsTitle:r.a.LEGAL_COMPLIANCE.name,complianceList:b,classes:N,setOpenDialog:S,onViewCompliance:function(e){H(e),x(!0)},onUpdateCompliance:function(e){W.push({pathname:"legal-compliance/update",state:e})},onDeleteCompliance:function(e){}})))),i.a.createElement(ae,{breadCrumbsTitle:r.a.LEGAL_COMPLIANCE.name,openDialog:f,onCloseDialog:function(){S(!1),u(0)},activeStep:t,setActiveStep:u,file:w,setFile:h}),i.a.createElement(L,{complianceDetails:k,openDrawer:O,onCloseDrawer:function(){x(!1)}}),i.a.createElement(m.NotificationContainer,null))}}}]);
//# sourceMappingURL=20.b140a4bf.chunk.js.map