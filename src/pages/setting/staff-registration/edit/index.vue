<template>
  <div class="edit-staff">
    <main-staff-registration />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import Form from '../components/Form.vue';

  export default defineComponent({
    name: 'EditStaffRegistration',

    components: {
      MainStaffRegistration: Form,
    },
  });
</script>

<style scoped></style>
