<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <div v-for="(field, index) in props.siteSettingsFormFields" :key="index">
        <VeeInput
          :name="field.field_name"
          :placeholder="field.field_name"
          class="form-control input mb-3"
          :label="field.field_name"
          :type="field.field_type"
          :textarea="field.field_type === 'textarea'"
          :hiddenValue="field.value ? field.value : field.default_value"
        />
      </div>
      <button type="submit" class="btn btn-success mt-4">Submit</button>
    </div>
  </form>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import VeeInput from "@/components/common/VeeInput.vue";
import * as yup from "yup";
import { useForm } from "vee-validate";

const emits = defineEmits();
const props = defineProps({
  siteSettingsFormFields: Object,
});

const { handleSubmit } = useForm({
  validationSchema: yup.object({}),
});

const submitForm = handleSubmit(async (values) => {
  try {
    emits("submit-custom-fields", values);
  } catch (error) {}
});
</script>
