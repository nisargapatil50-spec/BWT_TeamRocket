if(localStorage.getItem("uss_session")!=="1"){location.href="login.html"}
var api="http://127.0.0.1:5000/analyze-message";
document.getElementById("verifyBtn").addEventListener("click",async function(){
  var msg=document.getElementById("msg").value.trim();
  if(!msg)return;
  var res=await fetch(api,{method:"POST",headers:{ "Content-Type":"application/json" },body:JSON.stringify({message:msg})});
  var data=await res.json();
  sessionStorage.setItem("uss_result", JSON.stringify(data));
  location.href="result.html";
});
