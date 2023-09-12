<script setup>
import { ref } from 'vue';
import Modal from './CommonComponents/Modal.vue';

const modalVisible = ref(false);
</script>

<style>
.app {
  text-align: center;
  padding: 20px;
  margin-top: 50px;
}
</style>

<template>
    <div class="app">
      <h1>Vue Modal Example</h1>
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">Open Modal</button>
      <Modal :show="modalVisible" @close="modalVisible = false" />
    </div>
  </template>
  
