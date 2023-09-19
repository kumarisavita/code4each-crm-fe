<script setup>
import { ref, computed, defineEmits, onMounted } from "vue";
import SelectBox from "@/components/common/SelectBox.vue";
import Modal from "@/components/common/Modal.vue";
import VeeInput from "@/components/common/VeeInput.vue";
import WordpressService from '@/service/WordpressService';
import { useForm } from "vee-validate";
import * as yup from "yup";

const loading = ref('');
const errorMessage = ref('');
const message = ref('');
const countdown = ref(5);
const files = ref([]);

const props = defineProps({
  showModal: true,
  dashboardData: Object,
  categories: Array
});

const emits = defineEmits();

const closeModal = () => {
  emits("hide-modal");
};

const categoryOptions = computed(() =>
  props.categories.map(category => ({
    label: category.name,
    value: category.id
  }))
);

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    address: yup.string().required(),
    category_id: yup.string().required("category field is required"),
    agency_id: yup.string().required(),
    business_name: yup.string().required('Business Name field is required'),
  }),
});

const submitAgencyDetail = handleSubmit(async (values) => {
  try {
    loading.value = true;
    const formData = new FormData();
    formData.append('logo', values.logo);
    formData.append('business_name', values.business_name);
    formData.append('agency_id', values.agency_id);
    formData.append('category_id', values.category_id);
    formData.append('address', values.address);
    formData.append('description', values.description);
    const customHeaders = {
      'Content-Type': 'multipart/form-data',
    };
    const response = await WordpressService.agencyDetails(formData, customHeaders);
    if (response.status === 200 && response.data.success) {
      message.value = response?.data?.message;
      startCountdown();
      clearFormValues(values);
      window.location.reload();
      // console.log(values)
      loading.value = false;
    }
  } catch (error) {
    loading.value = false;
    errorMessage.value = error.response?.data?.message;
    console.error(error);
  }
});

const clearFormValues = (values) => {
  values.category_id = '';
  values.description = '';
  values.address = '';
};

const startCountdown = () => {
  const timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(timer);
      closeModal();
      message.value = '';
    }
  }, 1000);
};

</script>
<template>
  <Modal :show-modal="props.showModal" @update:show-modal="props.showModal = $event" modal-id="agencyModal"
    :show-footer="false">
    <template #header>
      <h4 class="modal-title text-center" id="agencyModalLabel">Agency Details</h4>
      <button type="button" class="close" @click="closeModal" data-dismiss="modal">
        <span aria-hidden="true">×</span>
      </button>
    </template>
    <form @submit.prevent="submitAgencyDetail" enctype="multipart/form-data" slot="body">
      <div v-if="errorMessage" class="error-message text-danger text-center">{{ errorMessage }}</div>
      <div v-if="message" class="error-message text-success text-center">{{ message }}</div>
      <div class="form-group">
        <SelectBox name="category_id" inputClass="form-select" ariaLabel="Select an option" :options="categoryOptions"
          defaultText="Open this select menu" defaultValue="" label="Website Category">
        </SelectBox>
        <VeeInput name="business_name" placeholder="Business Name" class="form-control input"
          :hiddenValue="dashboardData?.user?.agency?.name" label="Business Name" />
        <VeeInput name="address" placeholder="Address" class="form-control input" label="Address" />
        <VeeInput name="logo" placeholder="Website Logo" class="form-control input" label="Website Logo" type="file" />
        <VeeInput name="description" :textarea="true" placeholder="Description..(optional)" class="form-control input"
          label="Description" />
        <VeeInput name="agency_id" type="hidden" :hiddenValue="dashboardData.user.agency_id" />
        <button type="submit" class="btn btn-success mt-4">Submit</button>
      </div>
    </form>
    <template #footer>
      <button type="button" class="btn btn-success text-center" @click="closeModal">
        Custom Close
      </button>
    </template>
  </Modal>
</template>
