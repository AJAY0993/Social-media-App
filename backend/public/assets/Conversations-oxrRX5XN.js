import{f as m,p as C,u as y,a as h,N as i,Z as _,O as f,$ as v,j as n,o as x,U as j,B as U,a0 as M}from"./index-DVVaJp0R.js";const N=async()=>(await m("conversations/my")).data.data.conversations;function O(){const{data:e,isLoading:a}=C({queryFn:N,queryKey:["conversations"]});return{conversations:e,isFetcgingConversations:a}}const F="_user_1o6ho_1",r={user:F};function q(){const e=y(),a=h(),c=i(_),d=i(f),o=i(v),{conversations:t,isFetcgingConversations:u}=O(),l=t==null?void 0:t.map(s=>s.participants[0]._id===d?s.participants[1]:s.participants[0]),p=s=>c.includes(s)?"Online":"Offline",g=s=>{e(s),a(M(s))};return u?n.jsx(x,{}):n.jsx("section",{className:r.messages,children:n.jsx("div",{className:"messages__container",children:l.map(s=>n.jsx(j,{user:s,secondaryCaption:p(s._id),customClass:r.user,children:n.jsxs(U,{type:"primary",variation:"rounded",width:"fit",onClick:()=>g(s._id),children:["Message",o[s._id]>0&&n.jsx("span",{children:o[s._id]})]})},s._id))})})}export{q as default};
