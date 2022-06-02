<template>
  <a-table
    id="list-table-summary1"
    :columns="columnsWorking"
    :data-source="dataSourceWorking"
    :row-key="(record) => record.id"
    :pagination="false"
    :show-sorter-tooltip="false"
    :scroll="{ x: 'max-content' }"
    size="middle"
    bordered
  />
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount, ref, computed } from 'vue';
  import { renderTimecard3 } from '@/faker/timecard';
  import { useI18n } from 'vue-i18n';
  export default defineComponent({
    name: 'TableSummaryTimeCard',

    components: {},
    setup() {
      const { t } = useI18n();

      const dataSourceWorking = ref<any[]>([]);

      const columnsWorking = computed(() => {
        return [
          {
            title: t('attendance.working'),
            dataIndex: 'work',
            align: 'center',
          },
          {
            title: t('attendance.salary_deduction'),
            dataIndex: 'discount_salary',
            align: 'center',
          },
          {
            title: t('attendance.distance'),
            dataIndex: 'distance',
            align: 'center',
          },
        ];
      });

      onBeforeMount(() => {
        const timecard3 = renderTimecard3(1);
        dataSourceWorking.value = timecard3.result.data;
      });
      return {
        dataSourceWorking,
        columnsWorking,
      };
    },
  });
</script>

<style lang="scss"></style>
