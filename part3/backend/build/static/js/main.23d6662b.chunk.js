(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(e,n,t){e.exports=t(50)},50:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(18),u=t.n(o),l=t(19),c=t(3),i=t(4),m=t.n(i),d="/api/people",f=function(e){return m.a.post(d,e).then(function(e){return e.data})},s=function(){return m.a.get(d).then(function(e){return e.data})},p=function(e,n){return m.a.put("".concat(d,"/").concat(e),n).then(function(e){return e.data})},b=function(e){return m.a.delete("".concat(d,"/").concat(e)).then(function(e){return e.data})},g=function(e){var n=e.addPerson,t=e.newName,a=e.newNumber,o=e.handleNewName,u=e.handleNewNumber;return r.a.createElement("form",{onSubmit:n},r.a.createElement("h2",null,"add new"),r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:o})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:a,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},h=function(e){var n=e.filter,t=e.handleFilter;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:n,onChange:t})))},y=function(e){var n=e.people,t=e.filter,a=e.handleRemove;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",null,"Numbers"),r.a.createElement("ul",{style:{listStyleType:"none"}},t?n.filter(function(e){return e.name.toLowerCase().includes(t.toLowerCase())}).map(function(e){return r.a.createElement("li",{key:e.id},e.name," ",e.number)}):n.map(function(e){return r.a.createElement("li",{key:e.id},e.name," ",e.number," ",r.a.createElement("button",{onClick:function(){return a(e.id)}},"delete"))})))},E=function(e){var n=e.message,t=e.type;return n?"notification"===t?r.a.createElement("div",{style:{color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}},n):"error"===t?r.a.createElement("div",{style:{color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}},n):void 0:null},v=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),i=Object(c.a)(u,2),m=i[0],d=i[1],v=Object(a.useState)(""),w=Object(c.a)(v,2),N=w[0],j=w[1],O=Object(a.useState)(""),S=Object(c.a)(O,2),k=S[0],C=S[1],R=Object(a.useState)({}),T=Object(c.a)(R,2),F=T[0],B=T[1];Object(a.useEffect)(function(){s().then(function(e){return o(e)})},[]);return r.a.createElement("div",null,r.a.createElement(E,{message:F.message,type:F.type}),r.a.createElement(h,{handleFilter:function(e){C(e.target.value)},filter:k}),r.a.createElement(g,{addPerson:function(e){e.preventDefault();var n=t.find(function(e){return e.name===m});if(n){if(console.log(n),window.confirm("".concat(m," is already in the phonebook. Replace the old number with a new one?"))){var a=Object(l.a)({},n,{number:N});p(n.id,a)}B({message:"".concat(t.find(function(e){return e.name===m}).name,"'s number changed"),type:"notification"}),setTimeout(function(){B({message:null,type:null})},5e3)}else f({name:m,number:N}).then(function(e){B({message:"Added ".concat(m),type:"notification"}),setTimeout(function(){B({message:null,type:null})},5e3)}).catch(function(e){B({message:e.res.data.error,type:"error"}),setTimeout(function(){B({message:null,type:null})},5e3)})},handleNewName:function(e){d(e.target.value)},handleNewNumber:function(e){j(e.target.value)},newName:m,newNumber:N}),r.a.createElement(y,{people:t,filter:k,handleRemove:function(e){window.confirm("Delete ".concat(t.find(function(n){return n.id===e}).name,"?"))&&b(e).then(o(t.filter(function(n){return n.id!==e}))).catch(function(n){B({message:"".concat(t.find(function(n){return n.id===e}).name," has already been deleted from server"),type:"error"}),setTimeout(function(){B({message:null,type:null})},5e3)}),B({message:"Deleted ".concat(t.find(function(n){return n.id===e}).name),type:"notification"}),setTimeout(function(){B({message:null,type:null})},5e3)}}))};u.a.createRoot(document.getElementById("root")).render(r.a.createElement(v,null))}},[[20,2,1]]]);
//# sourceMappingURL=main.23d6662b.chunk.js.map