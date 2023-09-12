<script setup>
import { ref } from 'vue';
import Signup from '../signup/signup.vue';

const showModal = ref(false);
const props = defineProps({
  buttonClass: String,
  paragraph: Boolean,
});
</script>
<template>
<a href="#" class="btn" :class="buttonClass"  @click="showModal=true" data-toggle="modal" datatarget="#exampleModal" > <i class="la la-apple me-2 ic-2x d-inline-block"></i>
  <div class="d-inline-block" :class="paragraph ? 'text-center' : ''"> <small class="d-block">7 DAY FREE TRIAL</small>
      <p v-if="paragraph" >Take your agency online with us</p>
  </div>
</a>
  <Signup v-if="showModal" @hide-modal="showModal=false"/>
</template>
