<template>
  <section class="user-setting">
    <form @submit.prevent="onSubmit" class="user-setting__form">
      <template v-for="component in components" :key="component">
        <component :is="component" class="mb-20" />
      </template>
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
  import { computed, defineComponent, reactive } from 'vue';

  import FormBasicSetting from './components/FormBasicSetting.vue';
  import FormLateOrLeaveSetting from './components/FormLateOrLeaveSetting.vue';
  import FormTimeRoundSetting from './components/FormTimeRoundSetting.vue';
  import FormGoingOutSetting from './components/FormGoingOutSetting.vue';
  import FormTotalTimeSetting from './components/FormTotalTimeSetting.vue';
  import FormAddressSetting from './components/FormAddressSetting.vue';

  import { useForm } from 'vee-validate';

  export default defineComponent({
    name: 'Setting',

    components: {
      FormBasicSetting,
      FormTimeRoundSetting,
      FormLateOrLeaveSetting,
      FormGoingOutSetting,
      FormTotalTimeSetting,
      FormAddressSetting,
    },

    setup() {
      const { handleSubmit } = useForm();
      let formSetting = reactive<any>({});

      const components = computed(() => {
        return [
          'FormBasicSetting',
          'FormTimeRoundSetting',
          'FormLateOrLeaveSetting',
          'FormGoingOutSetting',
          'FormTotalTimeSetting',
          'FormAddressSetting',
        ];
      });

      const onGetFormBasicSetting = (data) => {
        formSetting = data;
      };

      const onSubmit = handleSubmit(() => {
        console.log(formSetting);
      });

      return {
        components,
        onSubmit,
        formSetting,
        onGetFormBasicSetting,
      };
    },
  });
</script>

<style lang="scss">
  @import '@/styles/shared/variables';
  @import '@/styles/shared/mixins';

  .mb-20 {
    margin-bottom: 20px;
  }

  .user-setting {
    padding: 20px;

    &__form {
      .table-form {
        color: $color-grey-15;
        border: 1px solid $color-grey-75;
        width: 100%;
        border-bottom: 0;

        thead {
          background-color: $color-grey-92;
          color: $color-grey-15;
          font-weight: 700;
          font-size: 16px;

          th:first-child {
            padding-left: 15px;
            width: 20%;
            white-space: nowrap;
            min-width: 169px;
            text-align: left;
          }

          th {
            border-bottom: 1px solid $color-grey-75;
            padding: 12px;
          }
        }

        table.table-body {
          width: 100%;
          background-color: $color-grey-100;

          tbody {
            border-bottom: 1px solid $color-grey-75;
            .table__row {
              padding: 15px 15px 0;
              > div {
                padding-left: 10px;
                padding-right: 10px;
                &:first-child {
                  padding-left: 0;
                }
                &:last-child {
                  padding-right: 0;
                }
                @media screen and (max-width: 991px) {
                  padding: 0;
                }
              }
            }
            tr {
              display: flex;

              > div {
                width: 100%;
              }

              &:last-child {
                padding-bottom: 15px;
              }

              > td:first-child {
                font-size: 12px;
                font-weight: 700;
                word-break: break-all;
                width: 45%;
                min-width: 150px;
                &.required:after {
                  content: '*';
                  margin-left: 0.25rem;
                  color: #cd201f;
                }
              }

              > td:last-child {
                width: 100%;
              }
            }
          }

          .project-oder {
            td {
              border: 0;
              width: auto;
              background-color: transparent;
              min-width: auto;
              color: $color-grey-15;
              font-weight: 400;

              &:first-child {
                padding-left: 0;
              }
            }
          }
        }

        &__collapse {
          .ant-collapse-header {
            display: none;
          }

          .ant-collapse-content-box {
            padding: 0 !important;
          }

          .ant-collapse-item {
            border-bottom: 0;
          }
        }

        &__buttons {
          text-align: right;
        }

        &__arrow-icon {
          color: $color-grey-55;
          transition: transform 0.2s;

          &.isCollapse {
            transform: rotate(-180deg);
            transition: transform 0.2s;
          }
        }
      }
    }
  }
</style>
