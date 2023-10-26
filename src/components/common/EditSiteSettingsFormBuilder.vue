<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <div v-for="(field, index) in props.siteSettingsFormFields" :key="index">
        <!-- <label :for="field.name">{{ field.name }}</label>
      <div v-if="field.input_type === 'textarea'">
        <textarea v-model="field.value" :name="field.name"></textarea>
      </div>
      <div v-else-if="field.input_type === 'input'">
        <input v-model="field.value" :name="field.name" />
      </div>
      <div v-else-if="field.input_type === 'file'">
        <input
          type="file"
          :name="field.name"
          @change="handleFileChange(index)"
        />
        <span>{{ field.value }}</span>
      </div>
    </div>
    <button type="submit">Submit</button> -->

        <VeeInput
          :name="field.name"
          :placeholder="field.label"
          class="form-control input mb-3"
          :label="field.label"
          :type="field.input_type"
          :textarea="field.input_type === 'textarea'"
          :hiddenValue="field.value"
        />
      </div>
      <button type="submit" class="btn btn-success mt-4">Submit</button>
    </div>
  </form>
</template>

<script setup>
import { ref, defineProps } from "vue";
import VeeInput from "@/components/common/VeeInput.vue";
import * as yup from "yup";
import { useForm } from "vee-validate";

const props = defineProps({
  siteSettingsFormFields: Object,
});

const handleFileChange = (index) => {
  const fileInput = refs.fileInput[index];
  formFields.value[index].value = fileInput.files[0].name;
};

// const submitForm = () => {
//   // Handle form submission here
//   // You can access the form data in formFields.value
// };

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    //   address: yup.string().required(),
    //   category_id: yup.string().required("category field is required"),
    //   agency_id: yup.string().required(),
    //   business_name: yup.string().required("Business Name field is required"),
  }),
});

const submitForm = handleSubmit(async (values) => {
  console.log(values, "vvvvvvvvvvvvv");
  try {
    const formData = new FormData(
      Object.entries(values).map(([key, value]) => [key, value])
    );

    console.log(formData, "vvvvvvvvvvvvv");

    // formData.append("agency_id", values.agency_id);
    // formData.append("category_id", values.category_id);
    // formData.append("address", values.address);
    // formData.append("description", values.description);
    // const customHeaders = {
    //   "Content-Type": "multipart/form-data",
    // };
    // const response = await WordpressService.agencyDetails(
    //   formData,
    //   customHeaders
    // );
    // if (response.status === 200 && response.data.success) {
    //   message.value = response?.data?.message;
    //   startCountdown();
    //   clearFormValues(values);
    //   EventBus.emit("fetchDashboardData");
    // }
  } catch (error) {}
});
</script>
