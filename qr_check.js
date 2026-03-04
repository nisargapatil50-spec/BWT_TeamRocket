if(localStorage.getItem("uss_session")!=="1"){location.href="login.html"}
var api="http://127.0.0.1:5000/analyze-qr";
var fileInput=document.getElementById("file");
var qrText=document.getElementById("qrText");
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
document.getElementById("analyzeQrBtn").addEventListener("click",async function(){
  var text=qrText.value.trim();
  if(!text){return}
  var res=await fetch(api,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({qr_data:text})});
  var data=await res.json();
  sessionStorage.setItem("uss_result", JSON.stringify(data));
  location.href="result.html";
});
fileInput.addEventListener("change",function(){
  var f=fileInput.files&&fileInput.files[0];
  if(!f)return;
  var img=new Image();
  var fr=new FileReader();
  fr.onload=function(){img.src=fr.result};
  fr.readAsDataURL(f);
  img.onload=function(){
    canvas.width=img.naturalWidth; canvas.height=img.naturalHeight;
    ctx.drawImage(img,0,0);
    try{
      var data=ctx.getImageData(0,0,canvas.width,canvas.height);
      var code=jsQR(data.data, canvas.width, canvas.height);
      if(code&&code.data){qrText.value=code.data}
    }catch(e){}
  };
});
