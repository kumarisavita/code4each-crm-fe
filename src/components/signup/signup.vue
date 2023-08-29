<script setup lang="ts">
import { reactive, onBeforeMount, computed} from 'vue';
import SignupModalVue from './elements/SignupModal.vue';
import api from '@/service/api';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import WordpressService from '@/service/WordpressService';

const emits = defineEmits();
const { handleSubmit } = useForm({
  validationSchema: yup.object({
    company_name: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().required().email(),
    phone: yup.string().required().matches(/^\d+$/, 'Must be a number').max(10).min(10),
    password: yup.string().required().min(6),
  }),
});

const registerUser = handleSubmit(async (values) => {
  try {
    const response = await WordpressService.registerUser(values)
    if (response.status === 200 && response.data.success) {
      hideModal();
    }
  } catch (error) {
    console.error(error);
  }
});


const localState = reactive({
  showModal: false
});

onBeforeMount(() => {
  localState.showModal = true
});

const hideModal = () => {
  localState.showModal=false
  emits('hide-modal');

}; 
</script>
<template>
<SignupModalVue :showModal="localState.showModal"
@hide-modal="hideModal" @submit="registerUser" />
</template>