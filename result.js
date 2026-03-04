if(localStorage.getItem("uss_session")!=="1"){location.href="login.html"}
var dataStr=sessionStorage.getItem("uss_result")||"{}";
try{var data=JSON.parse(dataStr)}catch(e){data={}}
var score=Number(data.fraud_score||0);
document.getElementById("score").textContent=isNaN(score)?"-":String(score);
document.getElementById("decision").textContent=data.decision||"-";
document.getElementById("time").textContent=(data.processing_time_ms||"-")+" ms";
var pill=document.getElementById("classText");
var bar=document.getElementById("meterBar");
pill.textContent=data.classification||"-";
pill.classList.remove("safe","warn","danger");
if(score<=30){pill.classList.add("safe"); bar.style.background="var(--safe)";}
else if(score<=65){pill.classList.add("warn"); bar.style.background="var(--warn)";}
else{pill.classList.add("danger"); bar.style.background="var(--danger)";}
bar.style.width=(Math.max(0, Math.min(100, score)))+"%";
var ul=document.getElementById("reasons");
(data.reasons||[]).forEach(function(r){var li=document.createElement("li"); li.textContent=r; ul.appendChild(li);});
