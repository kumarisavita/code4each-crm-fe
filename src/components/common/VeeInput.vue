<script setup>
import { defineProps } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps({
  name: String,
  type: String,
  placeholder: String,
  class:String,
  label:String,
  textarea:Boolean,
  hiddenValue:String,
});

const { value, errorMessage } = useField(() => props.name);
const hiddenValue = props.hiddenValue;

if (hiddenValue !== undefined) {
    value.value = hiddenValue;
  }
</script>


<template>
    <label v-if="label" for="" class="form-label">{{ label }}</label>
    <textarea v-if="textarea" v-model="value"  class="form-control" :placeholder="placeholder" rows="3"></textarea>
    <input v-else v-model="value"  :type="type || 'text'" :placeholder="placeholder" :class="class"/>
     <div class="text-danger" >{{ errorMessage }}</div>
  </template>
