import{v as u,g as x,f as j,_ as M,j as a,B as y,a1 as w,p as F,a2 as v,J as f,K as E,a as I,$ as U,u as k,X as S,a3 as N,a4 as R,a5 as O,o as b,a6 as A,U as B}from"./index-B3tnE4R3.js";import{u as D}from"./useProfile-COPRLAlD.js";import{u as L}from"./useBack-BPnmedfD.js";function $(){const[e,s]=u.useState(),{recieverId:r}=x();async function o(i){try{s(!0);const c=(await j("messages",{method:"POST",data:{recieverId:r,message:i}})).data.data.message;return s(!1),c}catch(n){M.error(n.response.data.message),s(!1)}}return{sendMessage:o,isSending:e}}const T="_sendMessageForm_13cxr_1",q={sendMessageForm:T};function V({setMessages:e}){const s=u.useRef(""),{sendMessage:r}=$(),o=new Audio("/audio/sent.mp3"),i=n=>{if(n.preventDefault(),s.current.value==="")return;const c=s.current.value;e(t=>[...t,{message:c,sent:!0}]),r(c),o.play(),s.current.value=""};return a.jsxs("form",{className:q.sendMessageForm,onSubmit:i,children:[a.jsx("input",{className:"inp inp__secondary",type:"text",ref:s}),a.jsx(y,{type:"primary",variation:"rounded",width:"fit",children:a.jsx(w,{})})]})}function G(){const{recieverId:e}=x(),{data:s,isFetchingMessages:r}=F({queryFn:async()=>{try{return(await j(`conversations/to?receiver=${e}`)).data.data.messages}catch{return[]}},queryKey:[`messages:${e}`]});return{messages:s,isFetchingMessages:r}}const K="_messageContainer_1i0as_1",z="_message_1i0as_1",J="_sent_1i0as_31",Q="_recieved_1i0as_55",X="_messageProfilePic_1i0as_69",H="_timeStamp_1i0as_83",W="_date_1i0as_99",m={messageContainer:K,message:z,sent:J,recieved:Q,messageProfilePic:X,timeStamp:H,date:W},C=u.forwardRef(function({message:e,showProfilePic:s,sender:r},o){var c;const i=e.createdAt?(c=new Date(e.createdAt))==null?void 0:c.toLocaleTimeString():"",n=!!e.sent;return a.jsxs("div",{className:m.messageContainer+" "+(n?m.sent:m.recieved),ref:o,"data-id":e._id,"data-user":e.sender,children:[s&&a.jsx("img",{className:m.messageProfilePic,src:r.profilePic,alt:"profile-user",border:"0"}),a.jsxs("p",{className:m.message,children:[e.message||"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium,magni.",a.jsx("span",{className:m.timeStamp,children:i})]})]})}),Y="_messagesContainer_ul29o_1",Z={messagesContainer:Y};function ee({setMessages:e,messages:s}){const r=u.useRef(),{socket:o}=v(),i=f(E),{messages:n,isFetchingMessages:c}=G();return u.useEffect(()=>{const t=new Audio("/audio/notif.mp3");return o.on("event:message",l=>{e(d=>[...d,l]),t.play()}),()=>o.off("event:message")},[e,o]),u.useEffect(()=>{setTimeout(()=>{var t;return(t=r.current)==null?void 0:t.scrollIntoView({behavior:"smooth"})},500)},[s]),c?"Loading":a.jsxs("div",{className:Z.messagesContainer,children:[n==null?void 0:n.map((t,l)=>{var d;return a.jsx(C,{ref:r,message:{...t,sent:t.sender._id===i},sender:t.sender,showProfilePic:((d=n[l-1])==null?void 0:d.sender._id)!==t.sender._id},Math.random())}),s.map((t,l)=>{var d;return a.jsx(C,{message:t,ref:r,sender:t.sender,showProfilePic:((d=s[l-1])==null?void 0:d.sender._id)!==t.sender._id},Math.random())})]})}const se="_pageForEachChat_8u0ft_1",ae="_header_8u0ft_11",te="_user_8u0ft_43",_={pageForEachChat:se,header:ae,user:te},ne=navigator.mediaDevices.getUserMedia||navigator.mediaDevices.webkitGetUserMedia||navigator.mediaDevices.mozGetUserMedia;function re({userId:e}){const s=I(),{setRemoteStream:r,socket:o}=v(),i=f(U),n=k(),{peer:c,peers:t}=v(),l=f(S),d=l.includes(e);console.log(l,e);const P=async()=>{if(!d)return M.error("User is offline can not call right now");try{const g=await ne({video:!0,audio:!0}),h=c.call(t[e],g);console.log("Peer Id:",t[e]),s(R(h)),n("/call"),h.on("stream",function(p){r(p)}),h.on("close",()=>{alert("Call finished"),s(O()),g.getTracks().forEach(function(p){p.stop()}),n("/")})}catch(g){console.log(g)}};return a.jsx(y,{type:"primary",variation:"square",onClick:P,disabled:i,children:a.jsx(N,{})})}function de(){const e=u.useRef(),{recieverId:s}=x(),{profile:r,isProfileLoading:o}=D(),[i,n]=u.useState([]),c=f(S)||[],t=L(),l=c.includes(s);return u.useEffect(()=>{setTimeout(()=>{var d;return(d=e.current)==null?void 0:d.scrollIntoView({behavior:"smooth"})},500)},[i]),o?a.jsx(b,{}):a.jsxs("section",{className:_.pageForEachChat,children:[a.jsxs("div",{className:_.header,children:[a.jsx(y,{type:"primary",variation:"square",onClick:t,children:a.jsx(A,{})}),a.jsx(B,{customClass:_.user,user:r,secondaryCaption:l?"Online":"Offline",children:a.jsx(re,{userId:s})})]}),a.jsx(ee,{messages:i,setMessages:n}),a.jsx(V,{setMessages:n})]})}export{de as default};