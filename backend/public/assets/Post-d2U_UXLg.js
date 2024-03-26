import{G as F,o as _,j as s,p as N,b as h,c as x,q as A,_ as l,d as E,I as H,h as Q,t as K,a as j,v as z,w as U,x as O,y as W,z as G,A as p,D as V,H as k,J as b,K as J,P as X,M as Y,N as Z,U as ee,O as se,Q as te,R as oe,n as ne,F as B,S as re}from"./index-BOkKEmcp.js";import{R as ie,a as ce,b as ae,c as le}from"./index-DhFxwQym.js";function me(e){return F({tag:"svg",attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"},child:[]}]})(e)}const de="_toggle_huma3_1",ue="_list_huma3_9",_e="_item_huma3_21",C={toggle:de,list:ue,item:_e},v=_.createContext();function a({children:e}){const[t,o]=_.useState(""),n=()=>o(""),r=o;return s.jsx(v.Provider,{value:{close:n,open:r,openId:t},children:e})}function xe({id:e}){const{close:t,open:o,openId:n}=_.useContext(v),r=()=>{if(n===e)return t();o(e)};return s.jsx("button",{className:C.toggle,onClick:r,children:s.jsx(me,{})})}function ke({children:e,id:t,left:o,right:n,top:r,bottom:c}){const m={top:r,right:n,left:o,bottom:c},{openId:d}=_.useContext(v);return d!==t?null:s.jsx("ul",{className:`${C.list} flex col absolute sm`,style:m,children:e})}function he({children:e,onClick:t}){return s.jsx("li",{className:`${C.item} flex px-1`,onClick:t,children:e})}a.Toggle=xe;a.List=ke;a.Item=he;function ge(e){return F({tag:"svg",attr:{version:"1",viewBox:"0 0 48 48",enableBackground:"new 0 0 48 48"},child:[{tag:"path",attr:{fill:"#F44336",d:"M34,9c-4.2,0-7.9,2.1-10,5.4C21.9,11.1,18.2,9,14,9C7.4,9,2,14.4,2,21c0,11.9,22,24,22,24s22-12,22-24 C46,14.4,40.6,9,34,9z"},child:[]}]})(e)}const fe="_post_1svcf_1",pe="_user_1svcf_17",je="_post__container_1svcf_39",Ce="_postImg_1svcf_51",ve="_controller_1svcf_67",ye="_postText_1svcf_103",i={post:fe,user:pe,post__container:je,postImg:Ce,controller:ve,postText:ye},Pe="_comment_1ld4h_1",Se="_commentHeader_1ld4h_27",Be="_username_1ld4h_39",Fe="_timeSpan_1ld4h_51",Ne="_commentBody_1ld4h_63",u={comment:Pe,commentHeader:Se,username:Be,timeSpan:Fe,commentBody:Ne};function be({comment:e}){return s.jsx(s.Fragment,{children:s.jsxs("div",{className:`${u.comment} flex g-1`,children:[s.jsx("img",{src:e.creator.profilePic,alt:"profilePic"})," ",s.jsxs("div",{className:"flex col",children:[s.jsxs("div",{className:`${u.commentHeader} flex  g-1 `,children:[s.jsx("span",{className:u.username,children:e.creator.username}),s.jsx("span",{className:u.timeSpan,children:N(e.createdAt)})]}),s.jsx("p",{className:u.commentBody,children:e.comment})]})]})})}function Ie(){const e=h(),{mutate:t,isPending:o}=x({mutationFn:A,onSuccess:n=>{l.success("Comment craeted successfully"),e.invalidateQueries({queryKey:[`comments:${n.post}`]})},onError:n=>{l.error(n.message)}});return{createComment:t,isCreating:o}}const $e="_form_1fjsd_1",Me="_input_1fjsd_15",Le="_buttonWrapper_1fjsd_51",f={form:$e,input:Me,buttonWrapper:Le};function Te({postId:e,close:t}){const{createComment:o,isCreating:n}=Ie(),{handleSubmit:r,register:c,getValues:m}=E(),d=g=>{o({...g,postId:e},{onSuccess:t})};return s.jsx("div",{children:s.jsxs("form",{onSubmit:r(d),className:`${f.form}  flex row p1`,children:[s.jsx("input",{className:`${f.input}`,placeholder:"Add comment",...c("comment",{required:"Comment must not be empty"})}),s.jsx("div",{className:f.buttonWrapper,children:s.jsx("button",{disabled:n||m("comment")==="",children:s.jsx(H,{})})})]})})}function we(e){const{data:t,isLoading:o}=Q({queryFn:()=>K(e),queryKey:[`comments:${e}`]});return{comments:t,isLoading:o}}function qe(){const e=h(),t=j(),{mutate:o,isPending:n}=x({mutationFn:z,onSuccess:r=>{l.success("Successfully added to bookmarks"),e.invalidateQueries({queryKey:["bookmarks"]}),t(U(r))},onError:r=>{l.error(r.message)}});return{addToBookmarks:o,isAdding:n}}function De(){const e=h(),t=j(),{mutate:o,isPending:n}=x({mutationFn:O,onSuccess:r=>{l.success("Successfully removed from bookmarks"),e.invalidateQueries({queryKey:["bookmarks"]}),t(W(r))},onError:r=>{l.error(r.message)}});return{removeFromBookmarks:o,isRemoving:n}}function Re(){const e=j(),{mutate:t,isPending:o}=x({mutationFn:G,onSuccess:n=>{p.success(`${n.liked?"Post liked":"Post removed from liked"} successfully `),e(V(n.likedPosts))}});return{like:t,isLiking:o}}function Ae(){const e=k(b),t=h(),{mutate:o,isPending:n,error:r}=x({mutationFn:J,onSuccess:()=>{p.success("Post deleted successfully changes will reflected on next reload or refresh"),t.invalidateQueries({queryKey:[`user:${e}`]})},onError:c=>{p.error(c.message)}});return{deletePost:o,isDeleting:n,error:r}}Ee.propTypes={post:X.object};function Ee({post:e}){const[t,o]=_.useState(!1),n=k(Y),r=k(Z),c=k(b),{addToBookmarks:m,isAdding:d}=qe(),{removeFromBookmarks:g,isRemoving:I}=De(),{like:y,isLiking:$}=Re(),{comments:M,isLoading:L}=we(e._id),{deletePost:T}=Ae(),w={...e.originalCreator,_id:e.user},q=()=>{if(I||d)return s.jsx(B,{});if(n.includes(e._id))return s.jsx(ae,{onClick:()=>g(e._id)});if(!n.includes(e._id))return s.jsx(le,{onClick:()=>m(e._id)})},D=()=>$?s.jsx(B,{className:i.like}):r.includes(e._id)?s.jsx(ge,{onClick:()=>y(e._id)}):s.jsx(re,{onClick:()=>y(e._id)}),R=()=>T(e._id),P=()=>o(!1);return s.jsx("div",{children:s.jsxs("article",{className:i.post,children:[s.jsx("div",{className:i.user__wrapper,children:s.jsx(ee,{user:w,secondaryCaption:N(e.createdAt),showBtn:!1,customClass:i.user,children:s.jsxs("div",{className:"relative",children:[s.jsx(a.Toggle,{id:e._id}),s.jsxs(a.List,{id:e._id,top:"1.5rem",right:".8rem",children:[e.user===c&&s.jsxs(a.Item,{onClick:R,children:[s.jsx(ie,{}),s.jsx("span",{children:"Delete"})]}),s.jsxs(a.Item,{children:[s.jsx(ce,{}),s.jsx("span",{children:"Share"})]})]})]})})}),s.jsxs("div",{className:i.post__container,children:[e.imageUrl&&s.jsx("img",{className:i.postImg,src:e.imageUrl}),s.jsxs("div",{className:i.postText,children:[s.jsx("h4",{children:e.caption}),s.jsx("p",{children:e.content})]}),s.jsxs("div",{className:i.controller,children:[D(),s.jsx(se,{}),s.jsx(te,{onClick:()=>o(!0)}),q(),t&&s.jsx(oe,{onClose:P,children:L?"Loading...":s.jsxs("div",{className:"px-1",children:[s.jsx(Te,{postId:e._id,close:P}),s.jsx(ne,{items:M,render:S=>s.jsx(be,{comment:S},S._id),title:"Comments",failureMessage:"No comments yet"})]})})]})]})]})})}export{a as D,Ee as P};
