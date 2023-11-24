<script setup>
import { ref, reactive, defineProps, watch, computed, defineEmits } from "vue";
const emits = defineEmits();

const confirmDelete = () => {
  emits("confirm");
};
</script>
<template>
  <div id="MyModal" class="modal fade">
    <div class="modal-dialog modal-confirm">
      <div class="modal-content">
        <div class="modal-header flex-column">
          <div class="icon-box">
            <i class="fa fa-times"></i>
          </div>
          <h4 class="modal-title w-100">Are you sure?</h4>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-hidden="true"
          >
            &times;
          </button>
        </div>
        <div class="modal-body">
          <p>Do you really want to delete these records?</p>
          <!-- <p>This process cannot be undo.</p> -->
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Cancel
          </button>
          <button type="button" class="btn btn-danger" @click="confirmDelete">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
