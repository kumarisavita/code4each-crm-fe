<script setup>
import { reactive, onBeforeMount} from 'vue';
import SignupModalVue from './elements/SignupModal.vue';
import api from '@/service/api';
import { useForm } from 'vee-validate';
import * as yup from 'yup';


const { handleSubmit } = useForm({
  validationSchema: yup.object({
    company_name: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().required().email(),
    phone: yup.string().required().matches(/^\d+$/, 'Must be a number').max(10).min(10),
    password: yup.string().required().min(6),
  }),
});

const submitForm = handleSubmit(values => {
  api.post('/register', values)
    .then(response => {
      if (response.status === 200 && response.data.success) {
        closeModal();
        // Reset form fields
      }
    })
    .catch(error => {
      console.error(error);
    });
});


const localState = reactive({
  showModal: false
});

onBeforeMount(() => {
  localState.showModal = true
});

const closeModal = () => {
  showModal.value = false;
};
</script>
<template>
<SignupModalVue :showModal="localState.showModal"
@hide-modal="localState.showModal=false" @submit="submitForm" />
</template>