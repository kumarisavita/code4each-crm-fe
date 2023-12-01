<script setup>
import { defineEmits } from "vue";
import Modal from "@/components/common/Modal.vue";
import VeeInput from "@/components/common/VeeInput.vue";
import { GoogleSigninButton } from "vue-google-signin-button";

const props = defineProps({
  showModal: Boolean,
});
const emits = defineEmits();

const closeModal = () => {
  emits("hide-modal");
};

const callback = (response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log("Handle the response", response);
  const email = response.getBasicProfile().getEmail();

  // Now you can use 'email' as needed
  console.log("Email:", email);
};
const onErrorcallback = (eeee) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log("Handle the eeee", eeee);
};
// const { googleConfig, onSuccess, onError } = useGoogleSigninButton({
//   clientId:
//     "467874272347-f241lioo004ksju0qudsroorkb5lf6au.apps.googleusercontent.com",
// });
</script>
<template>
  <Modal
    :show-modal="props.showModal"
    @update:show-modal="props.showModal = $event"
    modal-id="exampleModal"
    :show-footer="false"
  >
    <template #header>
      <h4 class="modal-title text-center" id="exampleModalLabel">
        Start Your 7 Day Free Trial Today!
      </h4>
      <button
        type="button"
        class="close"
        @click="closeModal"
        data-dismiss="modal"
      >
        <span aria-hidden="true">×</span>
      </button>
    </template>
    <form @submit.prevent="submitForm" slot="body">
      <div class="form-group">
        <VeeInput
          name="company_name"
          placeholder="Company Name.."
          class="form-control input"
        />
        <VeeInput name="name" placeholder="Name.." class="form-control input" />
        <VeeInput
          name="email"
          type="email"
          placeholder="Email Address.."
          class="form-control input"
        />
        <VeeInput
          name="phone"
          placeholder="Phone Number..."
          class="form-control input"
        />
        <VeeInput
          name="password"
          type="password"
          placeholder="Password.."
          class="form-control input"
        />
        <button type="submit" class="btn btn-success">Submit</button>
        <button type="button" class="btn btn-success" @click="emits('google')">
          SignUp With Google
        </button>

        <GoogleLogin :callback="callback" />

        <google-signin-button
          :config="googleConfig"
          @success="callback"
          @error="onErrorcallback"
        ></google-signin-button>
      </div>
    </form>
    <template #footer>
      <button
        type="button"
        class="btn btn-success text-center"
        @click="closeModal"
      >
        Custom Close
      </button>
    </template>
  </Modal>
</template>