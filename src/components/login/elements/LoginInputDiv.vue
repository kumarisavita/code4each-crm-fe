<script setup >
import { defineProps, ref } from 'vue';
import { useField } from 'vee-validate';


const isFocused = ref(false)

const props = defineProps({
  iconClass: String,
  fieldLabel: String,
  fieldName: String,
  type: String,
});
const { value, errorMessage } = useField(() => props.fieldName);
</script>
<template>
     <div class="input-div" :class="[isFocused ? 'focus' : '']">
            <div class="i">
                <i class="fa " :class="iconClass"></i>
            </div>
            <div class="div">
                <h5>{{ fieldLabel }}</h5>
                <input :type="type || 'text'"  v-model="value" class="input" @focus="isFocused = true">
                <div class="text-danger input-error" >{{ errorMessage }}</div>
            </div>
     </div>
</template>
<style>
.input-error{
    display: flex;
    margin: 30px auto;
    align-items: center;
    justify-content: flex-start;
    padding: 0px 10px;
    text-align: start;
    word-break: break-word;
}
</style>