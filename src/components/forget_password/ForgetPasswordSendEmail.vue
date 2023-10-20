<script setup>
import LoginInputDiv from "@/components/login/elements/LoginInputDiv.vue";
import { ref } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import Swal from "sweetalert2";

const email = ref("");

const emits = defineEmits();
const showLogin = () => {
  emits("show-login");
};

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup.string().required().email(),
  }),
});

const sendMailToVerifyEmail = handleSubmit(async (values) => {
  try {
    Swal.fire(
      "Done!",
      "Please check your inbox and verify your email!",
      "success"
    );
  } catch (error) {}
});
</script>
<template>
  <form @submit.prevent="sendMailToVerifyEmail">
    <img
      src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg"
    />
    <h2 class="title">Welcome</h2>
    <LoginInputDiv
      class="one"
      iconClass="fa-user"
      fieldLabel="Email"
      fieldName="email"
    />
    <a href="#" @click="showLogin">Login</a>
    <button type="submit" class="btn-link">Send Mail</button>
  </form>
</template>