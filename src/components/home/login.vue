<template>
      <section  class="login-section">
      <img class="wave" src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/wave.png" >
      <div class="login-wrapper" >
        <div class="container">
          <div class="img">
            <img src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/bg.svg">
          </div>
          <div class="login-content">
            <form>
              <img src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg">
              <h2 class="title">Welcome</h2>
                    <div class="input-div one">
                       <div class="i">
                          <i class="fa fa-user"></i>
                       </div>
                       <div class="div">
                          <h5>Username</h5>
                          <input type="text" class="input">
                       </div>
                    </div>
                    <div class="input-div pass">
                       <div class="i"> 
                          <i class="fa fa-lock"></i>
                       </div>
                       <div class="div">
                          <h5>Password</h5>
                          <input type="password" class="input">
                       </div>
                    </div>
                    <a href="#">Forgot Password?</a>
                    <a href="hostingdashboard/index.html" type="submit" class="btn-link">Login</a>
                  </form>
              </div>
          </div>
      </div>
  </section>

</template>


<script>
const inputs = document.querySelectorAll(".input");
  function addcl(){
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
  }

  function remcl(){
    let parent = this.parentNode.parentNode;
    if(this.value == ""){
      parent.classList.remove("focus");
    }
  }


  inputs.forEach(input => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
  });

</script>

<style scoped>
@import '../../assets/login.css';

</style>