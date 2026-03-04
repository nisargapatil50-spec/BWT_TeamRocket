function getUser(){try{return JSON.parse(localStorage.getItem("uss_user")||"null")}catch(e){return null}}
function setUser(u){localStorage.setItem("uss_user", JSON.stringify(u))}
function setSession(x){localStorage.setItem("uss_session", x?"1":"")}
function hasSession(){return localStorage.getItem("uss_session")==="1"}
(function(){
  var signupBtn=document.getElementById("signupBtn");
  if(signupBtn){
    signupBtn.addEventListener("click",function(){
      var name=document.getElementById("name").value.trim();
      var email=document.getElementById("email").value.trim();
      var password=document.getElementById("password").value.trim();
      if(!name||!email||!password)return;
      setUser({name:name,email:email,password:password});
      location.href="login.html";
    });
  }
  var loginBtn=document.getElementById("loginBtn");
  if(loginBtn){
    loginBtn.addEventListener("click",function(){
      var email=document.getElementById("email").value.trim();
      var password=document.getElementById("password").value.trim();
      var u=getUser();
      if(u&&u.email===email&&u.password===password){
        setSession(true);
        location.href="dashboard.html";
      }
    });
  }
})(); 
