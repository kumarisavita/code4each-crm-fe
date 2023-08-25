<script setup>
import { ref } from 'vue';
import Signup from '../signup/signup.vue';

const showModal = ref(false);
const props = defineProps({
  ButtonClass: String,
});
</script>
<template>
<a href="#" class="btn btn-sm" :class="ButtonClass" @click="showModal=true" > <i class="la la-apple me-2 ic-2x d-inline-block"></i>
    <div class="d-inline-block text-center"> <small class="d-block">7 DAY FREE TRIAL</small>
        <p>Take your agency online with us</p>
    </div>
</a>
  <Signup v-if="showModal"/>
</template>
