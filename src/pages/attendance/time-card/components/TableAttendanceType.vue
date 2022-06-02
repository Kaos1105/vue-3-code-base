<template>
  <a-table
    id="list-table-summary2"
    :columns="columnsAttendanceType"
    :data-source="dataSourceAttendanceType"
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
  import { renderTimecard4 } from '@/faker/timecard';
  import { useI18n } from 'vue-i18n';

  export default defineComponent({
    name: 'TableSummaryTimeCard',

    components: {},
    setup() {
      const { t } = useI18n();

      const dataSourceAttendanceType = ref<any[]>([]);

      const columnsAttendanceType = computed(() => {
        return [
          {
            title: t('attendance.shift_a'),
            dataIndex: 'shift_a',
            align: 'center',
          },
          {
            title: t('attendance.shift_b'),
            dataIndex: 'shift_b',
            align: 'center',
          },
        ];
      });

      onBeforeMount(() => {
        const timecard4 = renderTimecard4(1);
        dataSourceAttendanceType.value = timecard4.result.data;
      });
      return {
        dataSourceAttendanceType,
        columnsAttendanceType,
      };
    },
  });
</script>

<style lang="scss"></style>
