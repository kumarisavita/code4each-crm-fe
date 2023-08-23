
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
                <!-- <div v-if="loginError" class="error-message">{{ loginError }}</div> -->
                <div v-if="loginError.length > 0" >
                <ul>
                  <li v-for="error in loginError" :key="error" class="text-danger">{{ error }}</li>
                </ul>
              </div>
                    <div class="input-div one">
                       <div class="i">
                          <i class="fa fa-user"></i>
                       </div>
                       <div class="div">
                          <!-- <h5>Username</h5> -->
                          <input type="text" placeholder="Username" v-model="email" class="input">
                       </div>
                    </div>
                    <div class="input-div pass">
                       <div class="i"> 
                          <i class="fa fa-lock"></i>
                       </div>
                       <div class="div">
                          <!-- <h5>Password</h5> -->
                          <input type="password" v-model="password" placeholder="Password" class="input">
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
import api from '../../service/api';
import { useRouter } from 'vue-router';

// Define your reactive variables
const loginSuccess = ref(false);
const loginError = ref('');
const router = useRouter();

const email = ref('');
const password = ref('');

// Define your login function
const login = async () => {
  try {
    const response = await api.post('/login', {
      email: email.value,
      password: password.value,
    });

    if (response.status === 200 && response.data.success) {
      // console.log(response);
      // Successful login
      const token = response.data.token;
      localStorage.setItem('access_token', token);
      loginSuccess.value = true;
      router.push('/dashboard');
    } else {
      console.log(response);
      // Unsuccessful login
      loginError.value = 'Invalid credentials'; // Set an error message
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      // Store the error messages in the loginError ref
      loginError.value = Object.values(error.response.data.errors).flat();
    } else {
      console.error(error);
    }
  }
};


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