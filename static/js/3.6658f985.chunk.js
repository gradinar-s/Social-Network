(this["webpackJsonpreact-kabzda-1"]=this["webpackJsonpreact-kabzda-1"]||[]).push([[3],{292:function(e,s,a){e.exports={dialogs:"Dialogs_dialogs__2pSFg",dialogItem:"Dialogs_dialogItem__1vw3e",senderDialog:"Dialogs_senderDialog__1EV5Z",active:"Dialogs_active__1YbVO",messageItem:"Dialogs_messageItem__1Izmh",item:"Dialogs_item__26I8G",messageWrapper:"Dialogs_messageWrapper__3Dems",messageBody:"Dialogs_messageBody__2N5er",message:"Dialogs_message__3RK_h"}},293:function(e,s,a){e.exports={item:"MessageAddress_item__1geFh",avatar:"MessageAddress_avatar__3Jevx",info:"MessageAddress_info__3QOnt",name:"MessageAddress_name__hZmfh",status:"MessageAddress_status__9CcW7"}},294:function(e,s,a){e.exports={form:"SendMessageForm_form__b6kH0",buttonSend:"SendMessageForm_buttonSend__lK0TB"}},295:function(e,s,a){"use strict";a.r(s);a(1);var t=a(0),n=a(292),i=a.n(n),c=a(293),r=a.n(c),d=function(e){return Object(t.jsxs)("div",{className:r.a.item,children:[Object(t.jsx)("div",{className:r.a.avatar,children:Object(t.jsx)("img",{src:e.avatar,alt:""})}),Object(t.jsxs)("div",{className:r.a.info,children:[Object(t.jsx)("div",{className:r.a.name,children:"Name Surname"}),Object(t.jsx)("div",{className:r.a.status,children:"Online/Offline"})]})]})},o=a(294),m=a.n(o),g=a(132),l=a(133),j=a(43),u=a(24),_=Object(j.b)(m.a.buttonSend,"Send"),b=Object(l.a)({form:"message"})((function(e){return Object(t.jsx)("form",{className:m.a.form,onSubmit:e.handleSubmit,children:Object(t.jsx)(g.a,{component:_,name:"textMessage",validate:[u.c]})})})),O=a(10),f=Object(O.b)((function(e){return{dialogsPage:e.dialogsPage,newMessageText:e.dialogsPage.newMessageText}}),(function(e){return{}}))(b),x=a(12),h=function(e){var s="/dialogs/"+e.id;return Object(t.jsx)(x.b,{to:s,className:i.a.senderDialog,children:e.name})},v=function(e){return Object(t.jsx)("div",{className:i.a.item,children:Object(t.jsx)("span",{className:i.a.message,children:e.message})})},p=function(e){var s=e.dialogsPage,a=s.dialogsData.map((function(e){return Object(t.jsx)(h,{id:e.id,name:e.name},e.id)})),n=s.messagesData.map((function(e){return Object(t.jsx)(v,{id:e.id,message:e.message},e.id)}));return Object(t.jsxs)("div",{className:i.a.dialogs,children:[Object(t.jsx)("div",{className:i.a.dialogItem,children:a}),Object(t.jsxs)("div",{className:i.a.messageItem,children:[Object(t.jsx)(d,{}),Object(t.jsx)("div",{className:i.a.messageWrapper,children:Object(t.jsx)("div",{className:i.a.messageBody,children:n})}),Object(t.jsx)(f,{onSubmit:function(s){console.log(s.textMessage),e.addMessage(s.textMessage)}})]})]})},N=a(3),D=a(11),M=function(e){return{isAuth:e.auth.isAuth}},S=a(7),A=a(131);s.default=Object(S.d)(Object(O.b)((function(e){return{dialogsPage:e.dialogsPage}}),(function(e){return{addMessage:function(s){e(Object(A.a)(s))}}})),(function(e){return Object(O.b)(M)((function(s){return s.isAuth?Object(t.jsx)(e,Object(N.a)({},s)):Object(t.jsx)(D.a,{to:"/login"})}))}))(p)}}]);
//# sourceMappingURL=3.6658f985.chunk.js.map