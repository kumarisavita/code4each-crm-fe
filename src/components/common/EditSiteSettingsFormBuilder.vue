<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <div v-for="(field, index) in siteSettingsFormFieldsCopy" :key="index">
        <VeeInput
          :name="field.field_name"
          :placeholder="field.field_name"
          class="form-control input mb-3"
          :label="capitalizeAndReplaceChar(field.field_name, '-')"
          :type="field.field_type"
          :textarea="field.field_type === 'textarea'"
          :hiddenValue="field.value != null ? field.value : field.default_value"
        />
      </div>
      <div class="inline-buttons">
        <button
          type="submit"
          :disabled="isButtonDisabled"
          class="btn btn-success mt-4 me-2"
        >
          Submit
        </button>
        <button
          type="button"
          @click="changeHiddenValuesForAllFields"
          class="btn btn-success mt-4"
        >
          {{ resetToggle ? "Set Default Values" : "Undo Values" }}
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";
import VeeInput from "@/components/common/VeeInput.vue";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { capitalizeAndReplaceChar } from "@/util/helper";
const isButtonDisabled = ref(false);
const resetToggle = ref(true);

const emits = defineEmits();
const props = defineProps({
  siteSettingsFormFields: Object,
});

const { handleSubmit } = useForm({
  validationSchema: yup.object({}),
});

const submitForm = handleSubmit(async (values) => {
  isButtonDisabled.value = true;
  try {
    emits("submit-custom-fields", values);
  } catch (error) {}
});

const siteSettingsFormFieldsCopy = ref(props.siteSettingsFormFields);

const changeHiddenValuesForAllFields = () => {
  siteSettingsFormFieldsCopy.value = JSON.parse(
    JSON.stringify(props.siteSettingsFormFields)
  );

  siteSettingsFormFieldsCopy.value.forEach((field) => {
    let value = field.default_value;
    if (resetToggle.value === false) {
      value = field.value != null ? field.value : field.default_value;
    }
    field.value = value;
  });
  resetToggle.value = !resetToggle.value;
};

watch(
  () => props.siteSettingsFormFields,
  (newProp, oldProp) => {
    siteSettingsFormFieldsCopy.value = props.siteSettingsFormFields;
  }
);
</script>
<style scoped>
.inline-buttons button {
  display: inline;
}

.inline-buttons {
  text-align: center;
}
</style>
