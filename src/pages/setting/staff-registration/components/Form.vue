<template>
  <section class="staff__form">
    <form @submit.prevent="onSubmit">
      <form-staff class="u-mb-24" @form="dataFormStaff = { ...$event }" />
      <form-fixed-shift
        v-if="$route.name === 'staff-edit'"
        @form="dataFormFixedShift = { ...$event }"
      />
      <!-- Action Section Submit & Cancel -->
      <div class="card-footer text-right" style="margin-top: 20px">
        <a-button key="submit" type="primary" html-type="submit" style="width: 105px">
          {{ $t('common.update') }}
        </a-button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useForm } from 'vee-validate';

  import FormStaff from './FormStaff.vue';
  import FormFixedShift from './FormFixedShift.vue';

  import dayjs from 'dayjs';

  export default defineComponent({
    name: 'FormMainStaffRegistration',

    components: {
      FormStaff,
      FormFixedShift,
    },

    setup() {
      const { handleSubmit } = useForm();
      const dataFormStaff = ref({});
      const dataFormFixedShift = ref({});

      const onSubmit = handleSubmit(() => {
        const data = {
          ...dataFormStaff.value,
          ...dataFormFixedShift.value,
        };
        console.log(data);
        // @ts-expect-error
        delete data?.password_confirm;
        // @ts-expect-error
        data.date_hire = dayjs(data?.date_hire).format('YYYY-MM-DD');
      });

      return {
        dataFormStaff,
        dataFormFixedShift,
        onSubmit,
      };
    },
  });
</script>

<style lang="scss">
  @import '@/styles/shared/mixins';
  @import '@/styles/shared/variables';

  .staff__form {
    margin: 20px;

    .staff__registration {
      border: 1px solid #bfbfbf;
      border-radius: 3px;
      padding: 15px 10px 10px;
      background: $color-grey-100;

      .parent__title {
        text-align: left;
        margin-top: -28px;
        color: $color-grey-15;
        font-weight: 700;
        font-size: 16px;
        span {
          background-color: #f0f2f5;
        }
      }

      .card-common {
        padding: 10px;

        .table__row {
          > div:not(.form-group):first-child {
            padding-right: 15px;
            @media screen and (max-width: 991px) {
              padding-right: 0;
            }
          }
        }
      }

      .ant-collapse-icon-position-right > .ant-collapse-item > .ant-collapse-header {
        padding: 5px 15px;
      }

      .ant-collapse-content > .ant-collapse-content-box {
        padding: 0;
      }

      .ant-collapse-item:last-child > .ant-collapse-content {
        .ant-collapse-content-box {
          height: 197px;
          overflow-y: scroll;
        }
      }

      .group__name {
        width: 100%;
        tr {
          td {
            overflow: hidden;
            border-bottom: 1px Solid #cfcfcf;
            border-right: 1px Solid #cfcfcf;
            border-top-width: 0;
            border-left-width: 0;
            padding: 5px 10px 5px;
            &:first-child {
              border-left-width: 0;
            }
            &:last-child {
              vertical-align: middle;
              text-align: center;
            }
          }
          &:last-child {
            td {
              border-bottom: none;
            }
          }
        }
      }
    }
  }
</style>
