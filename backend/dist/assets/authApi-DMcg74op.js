import{f as a}from"./index-B3tnE4R3.js";async function n({email:r,password:s}){try{return(await a("users/login",{method:"POST",data:{email:r,password:s}})).data.data.user}catch(e){throw new Error(e.response.data.message)}}async function c(r){try{return(await a("users/signUp",{data:r,method:"POST"})).data.data.user}catch(s){throw new Error(s.response.data.message)}}const d=async r=>{try{return(await a("/users/forgotPassword",{method:"POST",data:{email:r}})).data.message}catch(s){throw new Error(s.response.data.message)}},w=async r=>{try{return(await a(`users/resetPassword/${r.resetPasswordToken}`,{method:"POST",data:{password:r.password,confirmPassword:r.confirmPassword}})).data.data.user}catch(s){throw new Error(s.response.data.message)}};export{d as f,n as l,w as r,c as s};