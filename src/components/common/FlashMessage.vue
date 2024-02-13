<template>
  <div v-if="isAnimating" :class="['flash animate--drop-in-fade-out']">
    <div class="flash__icon">
      <i class="icon fa fa-check-circle-o"></i>
    </div>
    <p class="flash__body">{{ store.flashMeassgeValue }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch, toRef } from "vue";
import { useStore } from "@/stores/store";

const isAnimating = ref(true);
const store = useStore();
const props = defineProps({
  visible: Boolean,
});

const handlePageClick = () => {
  setTimeout(() => {
    store.updateFlashMeassge(false); // Corrected typo
  }, 5000);
};

onMounted(() => {
  isAnimating.value = true;
  handlePageClick();
});

watch(
  () => props.visible,
  (newValue, oldValue) => {
    isAnimating.value = true;
  }
);
</script>

<style>
/* Your CSS styles here */
</style>
