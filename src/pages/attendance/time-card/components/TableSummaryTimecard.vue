<template>
  <a-table
    id="list-table-summary0"
    :columns="columnsSummary"
    :data-source="dataInitSummary"
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
  import { renderTimecard2 } from '@/faker/timecard';
  import { useI18n } from 'vue-i18n';
  import { includes } from 'lodash-es';

  export default defineComponent({
    name: 'TableSummaryTimeCard',

    components: {},
    setup() {
      const { t } = useI18n();

      const dataSourceSummary = ref<any[]>([]);

      const dataInitSummary = computed(() => {
        return [
          {
            id: 1,
            name: t('attendance.day_number'),
          },
          {
            id: 2,
            name: t('attendance.work_dayoff'),
          },
          {
            id: 3,
            name: t('attendance.sunday'),
          },
          {
            id: 4,
            name: t('attendance.day_offset'),
          },
          {
            id: 5,
            name: t('attendance.day_exchange'),
          },
          {
            id: 6,
            name: t('attendance.specify'),
          },
          {
            id: 7,
            name: t('attendance.dayoff_salary'),
          },
          {
            id: 8,
            name: t('attendance.special_holiday'),
          },
          {
            id: 9,
            name: t('attendance.mourning_dayoff'),
          },
          {
            id: 10,
            name: t('attendance.no_tropble'),
          },
          {
            id: 11,
            name: t('attendance.honeymoon_dayoff'),
          },
          {
            id: 12,
            name: t('attendance.leave_work'),
          },
          {
            id: 13,
            name: t('attendance.other_dayoff'),
          },
        ];
      });

      const columnsSummary = computed(() => {
        return [
          {
            title: '#',
            dataIndex: 'name',
          },
          {
            title: '#',
            align: 'right',
            customRender: ({ index }) => {
              let child: any;
              switch (index) {
                case 0:
                  child = dataSourceSummary.value[0].day_number;
                  break;
                case 1:
                  child = dataSourceSummary.value[0].work_dayoff;
                  break;
                case 2:
                  child = dataSourceSummary.value[0].sunday;
                  break;
                case 3:
                  child = dataSourceSummary.value[0].day_offset;
                  break;
                case 4:
                  child = dataSourceSummary.value[0].day_exchange;
                  break;
                case 5:
                  child = dataSourceSummary.value[0].specify;
                  break;
                case 6:
                  child = dataSourceSummary.value[0].dayoff_salary;
                  break;
                case 7:
                  child = dataSourceSummary.value[0].special_holiday;
                  break;
                case 8:
                  child = dataSourceSummary.value[0].mourning_dayoff;
                  break;
                case 9:
                  child = dataSourceSummary.value[0].no_tropble;
                  break;
                case 10:
                  child = dataSourceSummary.value[0].honeymoon_dayoff;
                  break;
                case 11:
                  child = dataSourceSummary.value[0].leave_work;
                  break;
                case 12:
                  child = dataSourceSummary.value[0].other_dayoff;
                  break;
              }
              return child;
            },
          },
          {
            title: t('attendance.basic_rest'),
            align: 'center',
            customCell: (_record, rowIndex) => {
              if (rowIndex === 2) {
                return {
                  colSpan: 2,
                };
              }
              if (rowIndex > 3) {
                return {
                  colSpan: 0,
                  rowSpan: 0,
                };
              }
            },
            customRender: ({ index }) => {
              let child: any;
              switch (index) {
                case 0:
                  child = dataSourceSummary.value[0].rest;
                  break;
                case 1:
                  child = dataSourceSummary.value[0].rest;
                  break;
                case 2:
                  child = dataSourceSummary.value[0].time_work_total;
                  break;
                case 3:
                  child = `${t('attendance.limit')}:`;
                  break;
              }
              return child;
            },
          },
          {
            title: t('attendance.time_to_work'),
            align: 'center',
            customCell: (_record, rowIndex) => {
              switch (rowIndex) {
                case 2:
                  return {
                    colSpan: 0,
                  };
                case 3:
                  return {
                    colSpan: 2,
                  };
              }
              if (rowIndex > 3) {
                return {
                  colSpan: 0,
                  rowSpan: 0,
                };
              }
            },
            customRender: ({ index }) => {
              let child: any;
              switch (index) {
                case 0:
                  child = dataSourceSummary.value[0].time_work;
                  break;
                case 1:
                  child = dataSourceSummary.value[0].time_work;
                  break;
                case 3:
                  child = dataSourceSummary.value[0].limit;
                  break;
              }
              return child;
            },
          },
          {
            title: t('attendance.overtime'),
            align: 'center',
            customCell: (_record, rowIndex) => {
              switch (rowIndex) {
                case 1:
                  return {
                    colSpan: 6,
                  };
                case 2:
                  return {
                    colSpan: 7,
                  };
                case 3:
                  return {
                    colSpan: 0,
                  };
              }
              if (rowIndex > 3) {
                return {
                  colSpan: 0,
                  rowSpan: 0,
                };
              }
            },
            customRender: ({ index }) => {
              let child: any;
              switch (index) {
                case 0:
                  child = dataSourceSummary.value[0].overtime_basic;
                  break;
                case 1:
                  child = dataSourceSummary.value[0].total_overtime;
                  break;
                case 2:
                  child = t('attendance.average_working_time');
                  break;
              }
              return child;
            },
          },
          {
            title: t('attendance.overtime_night'),
            align: 'center',
            customCell: (_record, rowIndex) => {
              if (includes([1, 2], rowIndex)) {
                return {
                  colSpan: 0,
                };
              }
              if (rowIndex > 3) {
                return {
                  colSpan: 0,
                  rowSpan: 0,
                };
              }
            },
            customRender: ({ index }) => {
              if (index === 0) {
                return dataSourceSummary.value[0].overtime_night;
              }
              if (index === 3) {
                return t('attendance.time_limit');
              }
            },
          },
          {
            title: t('attendance.work_night'),
            align: 'center',
            customCell: (_record, rowIndex) => {
              switch (rowIndex) {
                case 1:
                case 2:
                  return {
                    colSpan: 0,
                  };
                case 3:
                  return {
                    colSpan: 2,
                  };
              }
              if (rowIndex > 3) {
                return {
                  colSpan: 0,
                  rowSpan: 0,
                };
              }
            },
            customRender: ({ index }) => {
              if (index === 0) {
                return dataSourceSummary.value[0].work_night;
              }
              if (index === 3) {
                return dataSourceSummary.value[0].time_limit;
              }
            },
          },
          {
            title: t('attendance.overtime_holiday'),
            align: 'center',
            customCell: (_record, rowIndex) => {
              if (includes([1, 2, 3], rowIndex)) {
                return {
                  colSpan: 0,
                };
              }
              if (rowIndex > 3) {
                return {
                  colSpan: 0,
                  rowSpan: 0,
                };
              }
            },
            customRender: ({ index }) => {
              if (index === 0) {
                return dataSourceSummary.value[0].overtime_holiday;
              }
            },
          },
          {
            title: t('attendance.overtime_holiday_night'),
            align: 'center',
            customCell: (_record, rowIndex) => {
              if (includes([1, 2], rowIndex)) {
                return {
                  colSpan: 0,
                };
              }
              if (rowIndex > 3) {
                return {
                  colSpan: 0,
                  rowSpan: 0,
                };
              }
            },
            customRender: ({ index }) => {
              if (index === 0) {
                return dataSourceSummary.value[0].overtime_holiday_night;
              }
              if (index === 3) {
                return `${t('attendance.maximum_time_limit')}:`;
              }
            },
          },
          {
            title: t('attendance.overtime_dayoff_night'),
            align: 'center',
            customCell: (_record, rowIndex) => {
              if (includes([1, 2], rowIndex)) {
                return {
                  colSpan: 0,
                };
              }

              if (rowIndex === 3) {
                return {
                  colSpan: 2,
                };
              }

              if (rowIndex > 3) {
                return {
                  colSpan: 0,
                  rowSpan: 0,
                };
              }
            },
            customRender: ({ index }) => {
              if (index === 0) {
                return dataSourceSummary.value[0].overtime_dayoff_night;
              }
              if (index === 3) {
                return dataSourceSummary.value[0].maximum_time_limit;
              }
            },
          },
          {
            title: '',
            align: 'center',
            customCell: (_record, rowIndex) => {
              if (includes([2, 3], rowIndex)) {
                return {
                  colSpan: 0,
                };
              }
              if (rowIndex > 3) {
                return {
                  colSpan: 0,
                  rowSpan: 0,
                };
              }
            },
            customRender: ({ index }) => {
              if (index === 1) {
                return t('attendance.night_shift_work');
              }
            },
          },
        ];
      });

      onBeforeMount(() => {
        const timecard2 = renderTimecard2(1);
        dataSourceSummary.value = timecard2.result.data;
      });
      return {
        dataInitSummary,
        dataSourceSummary,
        columnsSummary,
      };
    },
  });
</script>

<style lang="scss">
  tr:nth-child(5).disable-hover {
    td:nth-child(4) {
      background: none !important;
    }
    td:nth-child(5) {
      background: none !important;
    }
  }
</style>
