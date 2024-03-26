import{b as h,a as x,c as j,l as u,_ as p,d as y,j as s,E as d,L as f,f as b,s as w,r as v}from"./index-BOkKEmcp.js";import{i as g}from"./isValidEmail-D0JiuvvC.js";import{u as P}from"./useBack-Cpm9vfjg.js";import{s as N}from"./authApi-BVE4Vr-5.js";const k="_signup__container_15jyc_13",S="_img__container_15jyc_29",U="_post__bg_15jyc_43",E="_signup__heading_15jyc_61",L="_signup__text_15jyc_73",q="_login__form_15jyc_85",C="_link_15jyc_95",n={"btn--back":"_btn--back_15jyc_1",signup__container:k,img__container:S,post__bg:U,signup__heading:E,signup__text:L,login__form:q,link:C};function D(){const i=h(),l=x(),{mutate:r,isPending:a}=j({mutationFn:e=>N(e),onSuccess:e=>{l(u(e)),p.success("Lets Go yeah"),i.invalidateQueries({queryKey:[`user:${e._id}`]})},onError:e=>{p.error(e.message)}});return{signUp:r,isSignIngUp:a}}function V(){const{register:i,formState:l,handleSubmit:r,getValues:a}=y(),{errors:e}=l,{signUp:m,isSignIngUp:t}=D(),c=P();return s.jsx("section",{children:s.jsx("div",{className:"container",children:s.jsxs("div",{children:[s.jsxs("button",{className:"btn btn__primary btn--square "+n["btn--back"],onClick:c,children:[" ",s.jsx("img",{src:"/images/icons/back.png"})]}),s.jsxs("div",{className:n.signup__container,children:[s.jsxs("div",{className:n.img__container,children:[s.jsx("img",{src:"images/post-portrait.png",alt:"phone"}),s.jsx("img",{src:"images/post-portrait-2.png",alt:"phone",className:n.post__bg})]}),s.jsxs("div",{children:[s.jsx("h1",{className:n.signup__heading,children:"Let's connect"}),s.jsx("p",{className:n.signup__text,children:"Create your account"}),s.jsxs("form",{className:"login__form",onSubmit:r(m),children:[s.jsxs("div",{children:[s.jsx("input",{type:"text",className:"inp inp__secondary",placeholder:"Enter your username",...i("username",{required:"Please provide your username",minLength:{value:3,message:"Username must be 3 characters long"},maxLength:{value:20,message:"Username should not be longer than 20 characters"}})}),(e==null?void 0:e.username)&&s.jsx(d,{message:e.username.message})]}),s.jsxs("div",{children:[s.jsx("input",{type:"email",className:"inp inp__secondary",placeholder:"Enter your email",...i("email",{required:"Please provide your email",validate:o=>g(o)||"Please provide a valid email"})}),(e==null?void 0:e.email)&&s.jsx(d,{message:e.email.message})]}),s.jsxs("div",{children:[s.jsx("input",{type:"password",className:"inp inp__secondary",placeholder:"Enter your password",...i("password",{required:"Please provide your password",minLength:{value:8,message:"Password must be 8 characters long"},maxLength:{value:20,message:"Password should not be longer than 20 characters"}})}),(e==null?void 0:e.password)&&s.jsx(d,{message:e.password.message})]}),s.jsxs("div",{children:[s.jsx("input",{type:"password",className:"inp inp__secondary",placeholder:"Confirm your password",...i("confirmPassword",{required:"Please confirm your password",validate:o=>o===a("password")||"Passwords do not match"})}),(e==null?void 0:e.confirmPassword)&&s.jsx(d,{message:e.confirmPassword.message})]}),s.jsx("button",{className:"btn btn__primary",disabled:t,children:t?"Signing up":"Sign up"})]}),s.jsxs("div",{children:[s.jsx("span",{className:n.line,children:"---------------"}),s.jsx("span",{children:"or with"}),s.jsx("span",{className:n.line,children:"---------------"}),s.jsxs("p",{className:n.signup__text,children:["Already have an account?"," ",s.jsx(f,{className:n.link,to:"/login",children:"Sign in"})]})]})]})]})]})})})}async function $({request:i,params:l}){const r=await i.formData(),a={},e=r.get("username"),m=r.get("email"),t=r.get("password"),c=r.get("confirm-password");if(console.log(c,t),e.length<3&&(a.username="username must be longer than 2 chracters"),g(m)||(a.email="Please provide a valid email"),t.length<8&&(a.password="Password must be 8 characters long"),t!==c&&(a.confirmPassword="Passwords do not match"),a.username||a.email||a.password||a.confirmPassword)return a;try{const _=(await b("users/signUp",{data:{username:e,email:m,password:t,confirmPassword:c},method:"POST"})).data.data.user;return w.dispatch(u(_)),v("/home")}catch(o){return alert(o.response.data.message),null}}export{$ as action,V as default};
