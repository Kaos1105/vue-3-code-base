<template>
  <div class="staff-registration">
    <main-staff-registration />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import Form from './components/Form.vue';

  export default defineComponent({
    name: 'MainStaff',

    components: {
      MainStaffRegistration: Form,
    },
  });
</script>

<style scoped></style>
