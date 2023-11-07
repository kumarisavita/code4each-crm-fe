<script setup>
import { ref, onMounted } from "vue";
import EmailFailiureTempelate from "@/components/email_verify/EmailFailiureTempelate.vue";
import EmailSuccessTempelate from "@/components/email_verify/EmailSuccessTempelate.vue";
import WordpressService from "@/service/WordpressService";
import { useRoute, useRouter } from "vue-router";

const verified = ref(false);
const loading = ref(true);
const route = useRoute();
onMounted(async () => {
  await verifyEmail();
});

const verifyEmail = async () => {
  try {
    const response = await WordpressService.VerifyEmail.verifyEmail(
      {
        expires: route.query.expires,
        hash: route.query.hash,
        signature: route.query.signature,
      },
      route.query.id
    );
    if (response.status === 200 && response.data.success) {
      verified.value = true;
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
  loading.value = false;
};
</script>
<template>
  <div v-if="loading">
    <div class="spinner-container">
      <div class="spinner-border text-warning" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
  <div v-else>
    <EmailSuccessTempelate v-if="verified" />
    <EmailFailiureTempelate v-else />
  </div>
</template>
<style>
@import "@/assets/email.css";
</style>