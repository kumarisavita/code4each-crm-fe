
<template>
      <section  class="login-section">
      <img class="wave" src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/wave.png" >
      <div class="login-wrapper" >
        <div class="container">
          <div class="img">
            <img src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/bg.svg">
          </div>
          <div class="login-content">
            <form @submit.prevent="login">
              <img src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg">
              <h2 class="title">Welcome</h2>
                  <!-- Display loginError message if it's not empty -->
                <div v-if="loginError" class="error-message">{{ loginError }}</div>
                    <div class="input-div one">
                       <div class="i">
                          <i class="fa fa-user"></i>
                       </div>
                       <div class="div">
                          <h5>Username</h5>
                          <input type="text" v-model="email" class="input">
                       </div>
                    </div>
                    <div class="input-div pass">
                       <div class="i"> 
                          <i class="fa fa-lock"></i>
                       </div>
                       <div class="div">
                          <h5>Password</h5>
                          <input type="password" v-model="password" class="input">
                       </div>
                    </div>
                    <a href="#">Forgot Password?</a>
                    <!-- <a type="submit" class="btn-link">Login</a> -->
                    <button type="submit" class="btn-link" >Login</button> 
                  </form>
              </div>
          </div>
      </div>
  </section>

</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios'; // Import axios or your API client
import { useRouter } from 'vue-router';
const loginSuccess = ref(false);
const loginError = ref(''); // Initialize loginError as an empty string
const router = useRouter();

const email = ref('');
const password = ref('');

const login = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login', {
      email: email.value,
      password: password.value,
    });
    if (response.status === 200 && response.data.success) {
      // Successful login
      loginSuccess.value = true;
      router.push('/dashboard');
    } else {
      // Unsuccessful login
      loginError.value = 'Invalid credentials'; // Set an error message
    }

    // Handle successful login
  } catch (error) {
    // console.log(error.response.data.errors);
    loginError.value = error.response.data.errors;
    // Handle login error
  }
};
</script>


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