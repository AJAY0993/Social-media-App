import{p as e,q as t,j as o,o as k,t as i}from"./index-7HsAbwMd.js";import{D as m,P as n}from"./Post-BnwOflpT.js";import"./index-CJLWIgaU.js";function u(){const{data:s,isLoading:r}=e({queryFn:t,queryKey:["bookmarks"]});return{bookmarks:s,isFetchingBookmarks:r}}function x(){const{bookmarks:s,isFetchingBookmarks:r}=u();return r?o.jsx(k,{}):o.jsx(m,{children:o.jsx(i,{items:s,render:a=>o.jsx(n,{post:a},a._id),title:"Bookmarks",failureMessage:"No bookmarks"})})}export{x as default};