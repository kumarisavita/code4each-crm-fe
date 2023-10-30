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
          :hiddenValue="field.default_value"
        />
        <!-- 
        {{ field.default_value }}
        <FormElement
          :name="field.field_name"
          :label="field.field_name"
          inputType="textarea"
          :value="field.default_value"
          :placeholder="field.field_name"
        /> -->
      </div>
      <button type="submit" class="btn btn-success mt-4">Submit</button>
    </div>
  </form>
</template>

<script setup>
import { ref, defineProps } from "vue";
import VeeInput from "@/components/common/VeeInput.vue";
import FormElement from "@/components/common/FormElement.vue";
import * as yup from "yup";
import { useForm } from "vee-validate";

const props = defineProps({
  siteSettingsFormFields: Object,
});

const { handleSubmit } = useForm({
  validationSchema: yup.object({}),
});

const submitForm = handleSubmit(async (values) => {
  console.log(values, "vvvvvvvvvvvvv");
  try {
    const formData = new FormData(
      Object.entries(values).map(([key, value]) => [key, value])
    );
    // emits("submit-custom-fields", formData);
    console.log(formData, "vvvvvvvvvvvvv");
  } catch (error) {}
});
</script>
