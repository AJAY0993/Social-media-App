import{G as p,v as _,j as s,p as E,w as A,b as h,a as C,c as x,x as z,_ as l,y as K,z as Q,A as U,D as O,H as j,I as H,J as g,K as S,M as V,N as T,O as G,d as J,P as W,R as X,S as Y,U as Z,T as ee,V as se,F as P,W as te}from"./index-B3tnE4R3.js";import{R as ne,a as oe,b as re,c as ce}from"./index-xIwA6VFm.js";function ie(e){return p({tag:"svg",attr:{viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{d:"M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"},child:[]}]})(e)}const ae="_toggle_huma3_1",me="_list_huma3_9",le="_item_huma3_21",v={toggle:ae,list:me,item:le},y=_.createContext();function a({children:e}){const[n,o]=_.useState(""),t=()=>o(""),r=o;return s.jsx(y.Provider,{value:{close:t,open:r,openId:n},children:e})}function de({id:e}){const{close:n,open:o,openId:t}=_.useContext(y),r=()=>{if(t===e)return n();o(e)};return s.jsx("button",{className:v.toggle,onClick:r,children:s.jsx(ie,{})})}function ue({children:e,id:n,left:o,right:t,top:r,bottom:c}){const d={top:r,right:t,left:o,bottom:c},{openId:u}=_.useContext(y);return u!==n?null:s.jsx("ul",{className:`${v.list} flex col absolute sm`,style:d,children:e})}function _e({children:e,onClick:n}){return s.jsx("li",{className:`${v.item} flex px-1`,onClick:n,children:e})}a.Toggle=de;a.List=ue;a.Item=_e;function xe(e){return p({tag:"svg",attr:{version:"1",viewBox:"0 0 48 48",enableBackground:"new 0 0 48 48"},child:[{tag:"path",attr:{fill:"#F44336",d:"M34,9c-4.2,0-7.9,2.1-10,5.4C21.9,11.1,18.2,9,14,9C7.4,9,2,14.4,2,21c0,11.9,22,24,22,24s22-12,22-24 C46,14.4,40.6,9,34,9z"},child:[]}]})(e)}const ge="_post_15qw1_1",he="_user_15qw1_17",ke="_post__container_15qw1_39",fe="_postImg_15qw1_51",je="_controller_15qw1_67",pe="_postText_15qw1_115",i={post:ge,user:he,post__container:ke,postImg:fe,controller:je,postText:pe};function Ce(e){const{data:n,isLoading:o}=E({queryFn:()=>A(e),queryKey:[`comments:${e}`]});return{comments:n,isLoading:o}}function ve(){const e=h(),n=C(),{mutate:o,isPending:t}=x({mutationFn:z,onSuccess:r=>{l.success("Successfully added to bookmarks"),e.invalidateQueries({queryKey:["bookmarks"]}),n(K(r))},onError:r=>{l.error(r.message)}});return{addToBookmarks:o,isAdding:t}}function ye(){const e=h(),n=C(),{mutate:o,isPending:t}=x({mutationFn:Q,onSuccess:r=>{l.success("Successfully removed from bookmarks"),e.invalidateQueries({queryKey:["bookmarks"]}),n(U(r))},onError:r=>{l.error(r.message)}});return{removeFromBookmarks:o,isRemoving:t}}function Be(){const e=C(),{mutate:n,isPending:o}=x({mutationFn:O,onSuccess:t=>{j.success(`${t.liked?"Post liked":"Post removed from liked"} successfully `),e(H(t.likedPosts))}});return{like:n,isLiking:o}}function Ne(){const e=g(S),n=h(),{mutate:o,isPending:t,error:r}=x({mutationFn:V,onSuccess:()=>{j.success("Post deleted successfully"),n.invalidateQueries({queryKey:[`user:${e}`]})},onError:c=>{j.error(c.message)}});return{deletePost:o,isDeleting:t,error:r}}const Pe="_commentContainer_1lh61_1",Ie="_commentImage_1lh61_19",Se="_commentText_1lh61_31",Te="_commentName_1lh61_49",Fe="_commentTime_1lh61_63",we="_commentBody_1lh61_77",m={commentContainer:Pe,commentImage:Ie,commentText:Se,commentName:Te,commentTime:Fe,commentBody:we};function qe({comment:e}){return s.jsx(s.Fragment,{children:s.jsxs("li",{className:`${m.commentContainer}`,children:[s.jsx("img",{className:m.commentImage,src:e.creator.profilePic,alt:"profilePic"}),s.jsxs("div",{className:m.commentText+" flex col",children:[s.jsxs("div",{className:" flex a-center  g-1 ",children:[s.jsx("span",{className:m.commentName,children:e.creator.username}),s.jsx("span",{className:m.commentTime,children:T(e.createdAt)})]}),s.jsx("p",{className:m.commentBody,children:e.comment})]})]})})}function be(){const e=h(),{mutate:n,isPending:o}=x({mutationFn:G,onSuccess:t=>{l.success("Comment craeted successfully"),e.invalidateQueries({queryKey:[`comments:${t.post}`]})},onError:t=>{l.error(t.message)}});return{createComment:n,isCreating:o}}function $e(e){return p({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M48 448l416-192L48 64v149.333L346 256 48 298.667z"},child:[]}]})(e)}const Le="_form_18fwa_1",Me="_input_18fwa_11",De="_sendButton_18fwa_43",f={form:Le,input:Me,sendButton:De};function Re({postId:e,close:n}){const{createComment:o,isCreating:t}=be(),{handleSubmit:r,register:c,getValues:d}=J(),u=k=>{o(k,{onSuccess:n})};return s.jsx("form",{className:f.form,onSubmit:r(u),children:s.jsxs("div",{className:"relative",children:[s.jsx("input",{className:`${f.input}`,placeholder:"Add comment",...c("comment",{required:"Comment must not be empty"})}),s.jsx("input",{type:"hidden",value:e,...c("postId")}),s.jsx("button",{className:f.sendButton,disabled:t||d("comment")==="",children:s.jsx($e,{})})]})})}const I={};function Ee({comments:e,postId:n,isLoading:o}){return o?"loading comments":s.jsxs("div",{className:I.commentsContainer,children:[s.jsx(Re,{postId:n}),s.jsx("ul",{className:I.commentsList,children:e.map(t=>s.jsx(qe,{comment:t},t._id))})]})}Ae.propTypes={post:W.object};function Ae({post:e}){const[n,o]=_.useState(!1),t=g(X),r=g(Y),c=g(S),{addToBookmarks:d,isAdding:u}=ve(),{removeFromBookmarks:k,isRemoving:F}=ye(),{like:B,isLiking:w}=Be(),{comments:q,isLoading:b}=Ce(e._id),{deletePost:$}=Ne(),L={...e.originalCreator,_id:e.user},M=()=>{if(F||u)return s.jsx(P,{});if(t.includes(e._id))return s.jsx(re,{onClick:()=>k(e._id)});if(!t.includes(e._id))return s.jsx(ce,{onClick:()=>d(e._id)})},D=()=>w?s.jsx(P,{className:i.like}):r.includes(e._id)?s.jsx(xe,{onClick:()=>B(e._id)}):s.jsx(te,{onClick:()=>B(e._id)}),R=()=>$(e._id,{onSuccess:()=>{document.querySelector('[data-id="'+e._id+'"]').remove()}});return s.jsx("div",{"data-id":e._id,children:s.jsxs("article",{className:i.post,children:[s.jsx("div",{className:i.user__wrapper,children:s.jsx(Z,{user:L,secondaryCaption:T(e.createdAt),showBtn:!1,customClass:i.user,children:s.jsxs("div",{className:"relative",children:[s.jsx(a.Toggle,{id:e._id}),s.jsxs(a.List,{id:e._id,top:"1.5rem",right:".8rem",children:[e.user===c&&s.jsxs(a.Item,{onClick:R,children:[s.jsx(ne,{}),s.jsx("span",{children:"Delete"})]}),s.jsxs(a.Item,{children:[s.jsx(oe,{}),s.jsx("span",{children:"Share"})]})]})]})})}),s.jsxs("div",{className:i.post__container,children:[e.imageUrl&&s.jsx("img",{className:i.postImg,src:e.imageUrl}),s.jsxs("div",{className:i.postText,children:[s.jsx("h4",{children:e.caption}),s.jsx("p",{children:e.content})]}),s.jsxs("div",{className:i.controller,children:[D(),s.jsx(ee,{}),s.jsx(se,{onClick:()=>o(N=>!N)}),M()]}),n&&s.jsx(Ee,{comments:q,postId:e._id,isLoading:b})]})]})})}export{a as D,Ae as P};
