<script setup>
import { ref, defineProps } from "vue";
const props = defineProps({
  meassage: String,
});
</script>
<template>
  <section class="mail-verfication">
    <div class="card">
      <div
        style="
          border-radius: 200px;
          height: 200px;
          width: 200px;
          background: #f8faf5;
          margin: 0 auto;
        "
      >
        <i class="checkmark">✓</i>
      </div>
      <h1>Success</h1>
      <p>
        Congratulations<br />
        {{ meassage }}
      </p>
      <button class="btn btn-success btn-block" data-dismiss="modal">
        Submit
      </button>
    </div>
  </section>
</template>