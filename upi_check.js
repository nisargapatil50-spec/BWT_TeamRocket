if(localStorage.getItem("uss_session")!=="1"){location.href="login.html"}
var api="http://127.0.0.1:5000/analyze-upi";
document.getElementById("analyzeBtn").addEventListener("click",async function(){
  var upi=document.getElementById("upiId").value.trim();
  if(!upi)return;
  var res=await fetch(api,{method:"POST",headers:{ "Content-Type":"application/json" },body:JSON.stringify({upi_id:upi})});
  var data=await res.json();
  sessionStorage.setItem("uss_result", JSON.stringify(data));
  location.href="result.html";
});
