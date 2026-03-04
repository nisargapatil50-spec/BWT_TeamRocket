if(localStorage.getItem("uss_session")!=="1"){location.href="login.html"}
var api="http://127.0.0.1:5000/analyze-link";
document.getElementById("checkBtn").addEventListener("click",async function(){
  var url=document.getElementById("url").value.trim();
  if(!url)return;
  var res=await fetch(api,{method:"POST",headers:{ "Content-Type":"application/json" },body:JSON.stringify({url:url})});
  var data=await res.json();
  sessionStorage.setItem("uss_result", JSON.stringify(data));
  location.href="result.html";
});
