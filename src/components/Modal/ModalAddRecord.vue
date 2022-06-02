<template>
  <form @submit.prevent>
    <a-modal
      v-model:visible="isVisible"
      :title="isTitle || $t($route.meta.title)"
      class="modal-add-record"
      centered
      @cancel="onCancel"
    >
      <div class="card-common">
        <slot></slot>
      </div>
      <template #footer>
        <a-button key="back" type="default" @click="onCancel">{{ $t('common.cancel') }}</a-button>
        <a-button key="submit" type="primary" @click="onSubmit">{{ $t('common.create') }}</a-button>
      </template>
    </a-modal>
  </form>
</template>

<script lang="ts">
  import { defineComponent, PropType, toRefs } from 'vue';
  import { useForm } from 'vee-validate';

  export default defineComponent({
    name: 'ModalAddRecord',

    props: {
      visible: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
      title: {
        type: String as PropType<string>,
        default: '',
      },
    },

    emits: ['update:visible', 'update'],

    setup(props, { emit }) {
      const { resetForm, handleSubmit } = useForm();
      const { visible: isVisible, title: isTitle } = toRefs(props);

      const onCancel = () => {
        resetForm();
        emit('update:visible', false);
      };

      const onSubmit = handleSubmit((evt) => {
        emit('update', evt);
      });

      return {
        onSubmit,
        isVisible,
        isTitle,
        onCancel,
      };
    },
  });
</script>

<style scoped></style>
