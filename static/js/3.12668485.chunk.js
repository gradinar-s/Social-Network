(this["webpackJsonpreact-kabzda-1"]=this["webpackJsonpreact-kabzda-1"]||[]).push([[3],{293:function(e,s,a){e.exports={dialogs:"Dialogs_dialogs__2pSFg",dialogItem:"Dialogs_dialogItem__1vw3e",senderDialog:"Dialogs_senderDialog__1EV5Z",active:"Dialogs_active__1YbVO",messageItem:"Dialogs_messageItem__1Izmh",item:"Dialogs_item__26I8G",messageWrapper:"Dialogs_messageWrapper__3Dems",messageBody:"Dialogs_messageBody__2N5er",message:"Dialogs_message__3RK_h"}},294:function(e,s,a){e.exports={item:"MessageAddress_item__1geFh",avatar:"MessageAddress_avatar__3Jevx",info:"MessageAddress_info__3QOnt",name:"MessageAddress_name__hZmfh",status:"MessageAddress_status__9CcW7"}},295:function(e,s,a){e.exports={form:"SendMessageForm_form__b6kH0",buttonSend:"SendMessageForm_buttonSend__lK0TB"}},296:function(e,s,a){"use strict";a.r(s);a(1);var t=a(0),n=a(293),i=a.n(n),c=a(294),d=a.n(c),r=function(e){return Object(t.jsxs)("div",{className:d.a.item,children:[Object(t.jsx)("div",{className:d.a.avatar,children:Object(t.jsx)("img",{src:e.avatar,alt:""})}),Object(t.jsxs)("div",{className:d.a.info,children:[Object(t.jsx)("div",{className:d.a.name,children:"Name Surname"}),Object(t.jsx)("div",{className:d.a.status,children:"Online/Offline"})]})]})},o=a(295),m=a.n(o),g=a(133),l=a(134),_=a(43),j=a(24),b=Object(_.b)(m.a.buttonSend,"Send"),u=Object(l.a)({form:"message"})((function(e){return Object(t.jsx)("form",{className:m.a.form,onSubmit:e.handleSubmit,children:Object(t.jsx)(g.a,{component:b,name:"textMessage",validate:[j.c]})})})),O=a(10),f=Object(O.b)((function(e){return{dialogsPage:e.dialogsPage,newMessageText:e.dialogsPage.newMessageText}}),(function(e){return{}}))(u),x=a(12),h=function(e){var s="/dialogs/"+e.id;return Object(t.jsx)(x.b,{to:s,className:i.a.senderDialog,children:e.name})},v=function(e){return Object(t.jsx)("div",{className:i.a.item,children:Object(t.jsx)("span",{className:i.a.message,children:e.message})})},p=function(e){var s=e.dialogsPage,a=s.dialogsData.map((function(e){return Object(t.jsx)(h,{id:e.id,name:e.name},e.id)})),n=s.messagesData.map((function(e){return Object(t.jsx)(v,{id:e.id,message:e.message},e.id)}));return Object(t.jsxs)("div",{className:i.a.dialogs,children:[Object(t.jsx)("div",{className:i.a.dialogItem,children:a}),Object(t.jsxs)("div",{className:i.a.messageItem,children:[Object(t.jsx)(r,{}),Object(t.jsx)("div",{className:i.a.messageWrapper,children:Object(t.jsx)("div",{className:i.a.messageBody,children:n})}),Object(t.jsx)(f,{onSubmit:function(s){console.log(s.textMessage),e.addMessage(s.textMessage)}})]})]})},N=a(131),D=a(7),M=a(132);s.default=Object(D.d)(Object(O.b)((function(e){return{dialogsPage:e.dialogsPage}}),(function(e){return{addMessage:function(s){e(Object(M.a)(s))}}})),N.a)(p)}}]);
//# sourceMappingURL=3.12668485.chunk.js.map