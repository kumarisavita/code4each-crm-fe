<script setup>
import { useField } from 'vee-validate';
import { onBeforeMount } from "vue";

const props = defineProps({
  inputClass: String,
  ariaLabel: String,
  options: Array,
  defaultText: String,
  defaultValue: String,
  name: String,
  label:String,
});
const { value, errorMessage } = useField(props.name);

onBeforeMount(() => {
 value.value = ''
});
</script>
<template>
<label v-if="label"  for="" class="form-label">{{ label }}</label>
  <select v-model="value" :class="inputClass" :aria-label="ariaLabel">
    <option :value="defaultValue" selected>{{ defaultText }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
  </select>
     <div class="text-danger" >{{ errorMessage }}</div>

</template>