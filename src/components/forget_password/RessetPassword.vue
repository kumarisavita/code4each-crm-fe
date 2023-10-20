<template>
  <section class="login-section" id="loginPage">
    <div class="d-flex align-items-center justify-content-end">
      <router-link to="/" class="backBtn">Back</router-link>
    </div>
    <img
      class="wave"
      src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/wave.png"
    />
    <div class="login-wrapper">
      <div class="container">
        <div class="img">
          <img
            src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/bg.svg"
          />
        </div>
        <div class="login-content">
          <div>
            <form @submit.prevent="resetPassword">
              <img
                src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg"
              />
              <h2 class="title">Welcome</h2>

              <!--**************** Display loginError message if it's not empty ********-->
              <div
                v-if="errorMesssage"
                class="error-message text-danger text-center"
              >
                {{ errorMesssage }}
              </div>
              <div class="alert-danger">
                <div v-if="bakendError.length > 0">
                  <ul>
                    <li
                      v-for="error in bakendError"
                      :key="error"
                      class="text-danger"
                    >
                      {{ error }}
                    </li>
                  </ul>
                </div>
              </div>
              <LoginInputDiv
                class="on"
                iconClass="fa-lock"
                fieldLabel="Password"
                fieldName="password"
                type="password"
              />
              <LoginInputDiv
                class="pass"
                iconClass="fa-lock"
                fieldLabel="Confirm"
                fieldName="confirm_password"
                type="password"
              />
              <button type="submit" class="btn-link">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import WordpressService from "@/service/WordpressService";
import { useForm } from "vee-validate";
import * as yup from "yup";
import LoginInputDiv from "@/components/login/elements/LoginInputDiv.vue";
import ForgetPasswordSendEmail from "@/components/forget_password/ForgetPasswordSendEmail.vue";

const loginSuccess = ref(false);
const showForgetForm = ref(false);

const bakendError = ref("");
const errorMesssage = ref("");
const router = useRouter();

const email = ref("");
const password = ref("");
const { handleSubmit } = useForm({
  validationSchema: yup.object({
    password: yup.string().required().min(6),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  }),
});

const resetPassword = handleSubmit(async (values) => {
  try {
    console.log("hhhhhhhhhhhhhhh");
    // const response = await WordpressService.loginUser(values);
    // if (response.status === 200 && response.data.success) {
    //   const token = response.data.token;
    //   localStorage.setItem("access_token", token);
    //   const fetchDashboardData = await WordpressService.fetchDashboardData();
    //   if (
    //     fetchDashboardData.status === 200 &&
    //     fetchDashboardData.data.success
    //   ) {
    //     loginSuccess.value = true;
    //     router.push("/dashboard");
    //   } else {
    //     loginSuccess.value = false;
    //     router.push("/login");
    //   }
    // } else {
    //   errorMesssage.value = response.data.message; // Set an error message
    // }
  } catch (error) {
    // if (error.response && error.response.data && error.response.data.errors) {
    //   bakendError.value = Object.values(error.response.data.errors).flat();
    // } else {
    //   console.error(error);
    //   errorMesssage.value = error?.response?.data?.message; // Set an error message
    // }
  }
});
</script>
<style >
@import "../../assets/login.css";
</style>