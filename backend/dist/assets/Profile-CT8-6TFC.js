import{J as d,K as j,b as R,c as I,a7 as E,H as v,a8 as $,d as k,j as s,E as F,B as x,u as L,a as B,a9 as q,aa as K,ab as O,v as N,o as Q,ac as P,t as y,U as M,ad as D,ae as H,af as J}from"./index-B3tnE4R3.js";import{d as T}from"./index-xIwA6VFm.js";import{v as b}from"./validators-DuhDfRqZ.js";import{u as V}from"./useProfile-COPRLAlD.js";import"./isValidEmail-D0JiuvvC.js";const Y="_form_1ifdc_1",z="_formRow_1ifdc_9",m={form:Y,formRow:z};function A(){const n=d(j),a=R(),{mutate:e,isPending:r}=I({mutationFn:o=>E(o),onSuccess:()=>{v.success("Profile updated successfully"),a.invalidateQueries({queryKey:[`user:${n}`]})},onError:o=>{v.error(o.message)}});return{updateProfile:e,isUpdating:r}}function G({close:n}){const a=d($),{updateProfile:e,isUpdating:r}=A(),{register:o,handleSubmit:l,formState:p,reset:h}=k({defaultValues:{email:a.email,username:a.username,bio:a.bio||"",profilePic:a.profilePic}}),{errors:i}=p,u=f=>{e(f,{onSuccess:n})};return s.jsxs("div",{children:[s.jsx("div",{className:m.profilePic,children:s.jsx("img",{})}),s.jsxs("form",{className:m.form,onSubmit:l(u),encType:"multipart/form-data",children:[s.jsxs("div",{className:m.formRow,children:[s.jsx("label",{htmlFor:"username",children:"Username:"}),s.jsx("input",{className:"inp",id:"username",...o("username",b.username)}),(i==null?void 0:i.username)&&s.jsx(F,{message:i.username.message})]}),s.jsxs("div",{className:m.formRow,children:[s.jsx("label",{htmlFor:"email",children:"Email:"}),s.jsx("input",{className:"inp",...o("email",b.email)}),(i==null?void 0:i.email)&&s.jsx(F,{message:i.email.message})]}),s.jsxs("div",{className:m.formRow,children:[s.jsx("label",{children:"Bio"}),s.jsx("textarea",{className:"textarea",...o("bio")})]}),s.jsxs("div",{className:m.formRow,children:[s.jsx("label",{children:"Profile Pic"}),s.jsx("input",{className:"",type:"file",...o("profilePic")})]}),s.jsx(x,{type:"primary",disable:r,children:"Save"})]})]})}const W="_box_mewsi_1",X="_profile_mewsi_19",Z="_avatar_mewsi_27",ss="_btnContainer_mewsi_47",es="_profile__stats_mewsi_75",c={box:W,profile:X,avatar:Z,btnContainer:ss,profile__stats:es};function cs(){var _;const n=L(),a=B(),{profile:e,isProfileLoading:r,error:o}=V(),{follow:l,isFollowing:p}=q(),{unFollow:h,isUnFollowing:i}=K(),u=d(j),f=d(O),C=((_=e==null?void 0:e.posts)==null?void 0:_.length)||0,[S,g]=N.useState(!1),U=t=>t===u?s.jsxs(s.Fragment,{children:[s.jsxs(x,{type:"primary",variation:"rounded",width:"normal",onClick:()=>g(!0),children:[s.jsx(D,{})," Edit"]}),S&&s.jsx(P,{onClose:()=>g(!1),children:s.jsx(G,{close:()=>g(!1)})})]}):s.jsxs(s.Fragment,{children:[s.jsx(x,{type:"secondary",variation:"rounded",width:"normal",onClick:()=>n(`/messages/${t}`),children:u===e._id?s.jsxs(s.Fragment,{children:[s.jsx(T,{})," Message"]}):"Message"}),s.jsx(x,{type:"primary",variation:"rounded",width:"normal",disabled:p||i,onClick:()=>f.includes(t)?h(t,a(H(t))):l(t,a(J(t))),children:f.includes(t)?"Unfollow":"Follow"})]});return r?s.jsx(Q,{}):o?s.jsx("h3",{children:o.message}):s.jsx("section",{className:c.profile,children:s.jsxs("div",{className:c.profile__container,children:[s.jsxs("figure",{className:c.box+" flex col a-center ",children:[s.jsx("img",{className:c.avatar,src:e.profilePic,alt:""}),s.jsxs("figcaption",{children:[s.jsx("h3",{children:e.username}),s.jsx("p",{children:e.bio})]})]}),s.jsx("div",{className:c.btnContainer,children:U(e._id)}),s.jsxs("div",{className:c.profile__stats+" flex j-center",children:[s.jsx(os,{profile:e}),s.jsx(as,{profile:e}),s.jsx(w,{value:C,name:"Posts"})]}),s.jsx("div",{className:"flex col"})]})})}function w({value:n,name:a,modalComponent:e}){const[r,o]=N.useState(!1);return s.jsxs("div",{className:c.box,onClickCapture:()=>o(!0),children:[s.jsx("h3",{children:n}),s.jsx("span",{children:a}),r&&s.jsx(P,{onClose:()=>o(!1),children:e})]})}function os({profile:n}){const a=n.followers,e=a.length,o=d(j)===n._id?"No one follows you":`No one follows ${n.username}`;return s.jsx(w,{value:e,name:"Followers",modalComponent:s.jsx(y,{items:a||[],render:l=>s.jsx(M,{user:{...l,_id:l.followerId}},l._id),title:"Followers",failureMessage:o})})}function as({profile:n}){const a=n.following,e=a.length,o=d(j)===n._id?"You are not following anyone":`${n.username} is not following anyone`;return s.jsx(w,{value:e,name:"Following",modalComponent:s.jsx(y,{items:a||[],render:l=>s.jsx(M,{user:{...l,_id:l.followingId}},l._id),title:"Followers",failureMessage:o})})}export{cs as default};
