<template>
  <div class="yearly">
    <search-yearly-report @form="onSearch" ref="searchRef" />

    <div class="yearly__options" ref="monthlyRef">
      <div class="yearly__buttons">
        <a-button
          type="link"
          class="btn-excel fs-12"
          @click="exportXLS('.list-table table', `yearly_report_${queries.division}`)"
        >
          {{ $t('common.export_excel') }}
          <template #icon>
            <file-excel-outlined :style="{ fontSize: '24px', color: '#064780' }" />
          </template>
        </a-button>
      </div>
    </div>

    <div class="yearly__table">
      <a-table
        id="list-table"
        :columns="columns"
        :data-source="dataSource"
        :row-key="(record) => record.id"
        :pagination="false"
        :show-sorter-tooltip="false"
        :scroll="{
          x: 'max-content',
          y: windowHeight - heightMonthly.height - heightSearch - 191,
        }"
        bordered
        size="middle"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'service'">
            <table class="border">
              <tbody>
                <tr>
                  <td class="orange text-center">
                    {{ queries.year }}
                  </td>
                </tr>
                <tr>
                  <td class="orange text-center">
                    {{ queries.division }}
                  </td>
                </tr>
              </tbody>
            </table>
          </template>

          <template v-if="column.key === 'staff_code'">
            <table class="border">
              <tr>
                <td class="mediumaquamarine" style="text-align: center">{{
                  $t('attendance.staff_name')
                }}</td>
              </tr>
            </table>
          </template>

          <template v-if="column.key === 'general_total'">
            <table class="border">
              <tbody>
                <tr><td colspan="2" class="mediumaquamarine"></td></tr>
                <tr><td colspan="2" class="mediumaquamarine"></td></tr>
              </tbody>
            </table>
          </template>

          <template v-if="column.key === 'time'">
            <table class="border">
              <tr><td class="mediumaquamarine"></td></tr>
            </table>
          </template>

          <template v-if="column.key === 'total_average'">
            <table>
              <tr>
                <td class="mediumaquamarine" style="text-align: center">{{
                  $t('attendance.total')
                }}</td>
              </tr>
            </table>
          </template>

          <template v-if="column.key === 'month_average'">
            <table>
              <tr>
                <td class="mediumaquamarine" style="text-align: center">{{
                  $t('attendance.month_average')
                }}</td>
              </tr>
            </table>
          </template>

          <template v-if="column.key === 'general_average'">
            <table class="border">
              <tbody>
                <tr
                  ><td class="mediumaquamarine" style="text-align: center">{{
                    $t('attendance.constrained_average')
                  }}</td></tr
                >
                <tr
                  ><td class="mediumaquamarine" style="text-align: center">{{
                    $t('attendance.overtime_average')
                  }}</td></tr
                >
              </tbody>
            </table>
          </template>

          <template v-if="column.key === 'average'">
            <table class="border">
              <tbody>
                <tr
                  ><td class="mediumaquamarine" style="text-align: center">{{
                    $t('attendance.average')
                  }}</td></tr
                >
              </tbody>
            </table>
          </template>

          <template v-if="column.key === 'hours_average'">
            <table class="border" style="text-align: center">
              <tbody>
                <tr
                  ><td class="mediumaquamarine" style="text-align: center">{{
                    dataColumn[column.key_constrained][column.index]
                  }}</td></tr
                >
                <tr
                  ><td class="mediumaquamarine" style="text-align: center">{{
                    dataColumn[column.key_overtime][column.index]
                  }}</td></tr
                >
              </tbody>
            </table>
          </template>

          <template v-if="column.key === 'hours'">
            <table class="border">
              <tr
                ><td class="mediumaquamarine" style="text-align: center">{{ column.month }}</td></tr
              >
            </table>
          </template>
        </template>

        <template #bodyCell="{ column, record, text }">
          <template v-if="column.key === 'staff_code'">
            <table>
              <tbody>
                <tr
                  ><td style="text-align: center; vertical-align: center">{{
                    record.service
                  }}</td></tr
                >
                <tr
                  ><td style="text-align: center; vertical-align: center">{{
                    `<${record.staff_code}>`
                  }}</td></tr
                >
              </tbody>
            </table>
          </template>

          <template v-if="column.key === 'time'">
            <table border="1" class="table__report">
              <tbody>
                <tr
                  ><td class="text-center">{{ $t('attendance.restrain_time') }}</td></tr
                >
                <tr
                  ><td class="text-center">{{ $t('attendance.overtime_hours') }}</td></tr
                >
                <tr
                  ><td class="text-center">{{ $t('attendance.commuting_days') }}</td></tr
                >
              </tbody>
            </table>
          </template>

          <template v-if="column.key === 'total_average'">
            <table v-if="text" border="1" class="table__report">
              <tbody>
                <tr
                  ><td class="text-center" style="height: 23px">{{ text[0] }}</td></tr
                >
                <tr
                  ><td class="text-center" style="height: 23px">{{ text[1] }}</td></tr
                >
                <tr
                  ><td class="text-center" style="height: 23px">{{ text[2] }}</td></tr
                >
              </tbody>
            </table>
          </template>

          <template v-if="column.key === 'average'">
            <table v-if="text" border="1" class="table__report">
              <tbody>
                <tr
                  ><td class="text-center" style="height: 23px">{{ text[0] }}</td></tr
                >
                <tr
                  ><td class="text-center" style="height: 23px">{{ text[1] }}</td></tr
                >
                <tr
                  ><td class="text-center" style="height: 23px">{{ text[2] }}</td></tr
                >
              </tbody>
            </table>
          </template>

          <template v-if="column.key === 'hours'">
            <table v-if="text" border="1" class="table__report">
              <tbody>
                <tr
                  ><td class="text-center" style="height: 23px">{{ text[0] }}</td></tr
                >
                <tr
                  ><td class="text-center" style="height: 23px">{{ text[1] }}</td></tr
                >
                <tr
                  ><td class="text-center" style="height: 23px">{{ text[2] }}</td></tr
                >
              </tbody>
            </table>
          </template>
        </template>
      </a-table>

      <a-table
        id="list-table"
        class="list-table"
        style="display: none"
        :columns="columns"
        :data-source="dataSource"
        :row-key="(record) => record.id"
        :pagination="false"
        :show-sorter-tooltip="false"
        :scroll="{ x: 'max-content' }"
        bordered
        size="middle"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'service'">
            <table class="border">
              <tbody>
                <tr>
                  <td class="orange" style="text-align: center">
                    {{ queries.year }}
                  </td>
                </tr>
                <tr>
                  <td class="orange" style="text-align: center">
                    {{ queries.division }}
                  </td>
                </tr>
              </tbody>
            </table>
          </template>

          <template v-if="column.key === 'staff_code'">
            <table class="border">
              <tr>
                <td class="mediumaquamarine" style="text-align: center">{{
                  $t('attendance.staff_name')
                }}</td>
              </tr>
            </table>
          </template>

          <template v-if="column.key === 'general_total'">
            <table class="border">
              <tbody>
                <tr><td colspan="2" class="mediumaquamarine"></td></tr>
                <tr><td colspan="2" class="mediumaquamarine"></td></tr>
              </tbody>
            </table>
          </template>

          <template v-if="column.key === 'time'">
            <table class="border">
              <tr><td class="mediumaquamarine"></td></tr>
            </table>
          </template>

          <template v-if="column.key === 'total_average'">
            <table>
              <tr>
                <td class="mediumaquamarine" style="text-align: center">{{
                  $t('attendance.total')
                }}</td>
              </tr>
            </table>
          </template>

          <template v-if="column.key === 'month_average'">
            <table>
              <tr>
                <td class="mediumaquamarine" style="text-align: center">{{
                  $t('attendance.month_average')
                }}</td>
              </tr>
            </table>
          </template>

          <template v-if="column.key === 'general_average'">
            <table class="border">
              <tbody>
                <tr
                  ><td class="mediumaquamarine" style="text-align: center">{{
                    $t('attendance.constrained_average')
                  }}</td></tr
                >
                <tr
                  ><td class="mediumaquamarine" style="text-align: center">{{
                    $t('attendance.overtime_average')
                  }}</td></tr
                >
              </tbody>
            </table>
          </template>

          <template v-if="column.key === 'average'">
            <table class="border">
              <tbody>
                <tr
                  ><td class="mediumaquamarine" style="text-align: center">{{
                    $t('attendance.average')
                  }}</td></tr
                >
              </tbody>
            </table>
          </template>

          <template v-if="column.key === 'hours_average'">
            <table class="border" style="text-align: center">
              <tbody>
                <tr
                  ><td class="mediumaquamarine" style="text-align: center">{{
                    dataColumn[column.key_constrained][column.index]
                  }}</td></tr
                >
                <tr
                  ><td class="mediumaquamarine" style="text-align: center">{{
                    dataColumn[column.key_overtime][column.index]
                  }}</td></tr
                >
              </tbody>
            </table>
          </template>

          <template v-if="column.key === 'hours'">
            <table class="border">
              <tr
                ><td class="mediumaquamarine" style="text-align: center">{{ column.month }}</td></tr
              >
            </table>
          </template>
        </template>

        <template #bodyCell="{ column, record, text }">
          <template v-if="column.key === 'staff_code'">
            <table class="border">
              <tbody>
                <tr
                  ><td style="text-align: center; vertical-align: center">{{
                    record.service
                  }}</td></tr
                >
                <tr
                  ><td style="text-align: center; vertical-align: center">{{
                    `<${record.staff_code}>`
                  }}</td></tr
                >
                <tr><td></td></tr>
              </tbody>
            </table>
          </template>
          <template v-if="column.key === 'time'">
            <table class="border">
              <tbody>
                <tr
                  ><td class="border" style="text-align: center">{{
                    $t('attendance.restrain_time')
                  }}</td></tr
                >
                <tr
                  ><td class="border" style="text-align: center">{{
                    $t('attendance.overtime_hours')
                  }}</td></tr
                >
                <tr
                  ><td class="border" style="text-align: center">{{
                    $t('attendance.commuting_days')
                  }}</td></tr
                >
              </tbody>
            </table>
          </template>
          <template v-if="column.key === 'total_average'">
            <table v-if="text">
              <tbody>
                <tr
                  ><td class="border" style="text-align: center">{{ text[0] }}</td></tr
                >
                <tr
                  ><td class="border" style="text-align: center">{{ text[1] }}</td></tr
                >
                <tr
                  ><td class="border" style="text-align: center">{{ text[2] }}</td></tr
                >
              </tbody>
            </table>
          </template>
          <template v-if="column.key === 'average'">
            <table v-if="text">
              <tbody>
                <tr
                  ><td class="border" style="text-align: center">{{ text[0] }}</td></tr
                >
                <tr
                  ><td class="border" style="text-align: center">{{ text[1] }}</td></tr
                >
                <tr
                  ><td class="border" style="text-align: center">{{ text[2] }}</td></tr
                >
              </tbody>
            </table>
          </template>
          <template v-if="column.key === 'hours'">
            <table v-if="text">
              <tbody>
                <tr
                  ><td class="border" style="text-align: center">{{ text[0] }}</td></tr
                >
                <tr
                  ><td class="border" style="text-align: center">{{ text[1] }}</td></tr
                >
                <tr
                  ><td class="border" style="text-align: center">{{ text[2] }}</td></tr
                >
              </tbody>
            </table>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, ref } from 'vue';
  import { divisionEnum } from '@/enums/divisionEnum';
  import SearchYearlyReport from './components/SearchYearlyReport.vue';
  import { each, findIndex, isEmpty, keys, reduce, pickBy } from 'lodash-es';
  import { Dayjs } from 'dayjs';
  import { renderYearly, renderHeaderYearly } from '@/faker/yearlyReport';
  import { FileExcelOutlined } from '@ant-design/icons-vue';
  import { useExportReport } from '@/hooks/useExportReport';
  import { monthInYearlyEnum } from '@/enums/monthInYearlyEnum';
  import { useLocalStorage } from '@/hooks/useLocalStorage';
  import { LOCALE } from '@/enums/localeEnum';
  import { LocalStorageEnum } from '@/enums/localStorageEnum';
  import { useElementSize, useResizeObserver, useWindowSize } from '@vueuse/core';
  import { useI18n } from 'vue-i18n';

  interface QueryForm {
    year: string | Dayjs;
    division: string | number;
    staff: string | number;
  }

  const NUMBER_MONTH_IN_YEAR = 12;

  export default defineComponent({
    name: 'YearlyReport',

    components: {
      SearchYearlyReport,
      FileExcelOutlined,
    },

    setup() {
      const queries = ref<QueryForm>({ year: '', division: '', staff: '' });
      const dataSource = ref<any[]>([]);
      const dataColumn = ref<any>({});
      const monthlyRef = ref<null>(null);
      const searchRef = ref<null>(null);
      const windowHeight = ref<number>(0);
      const heightSearch = ref<number>(0);

      const { exportXLS } = useExportReport();
      const { item } = useLocalStorage(LocalStorageEnum.LANGUAGE);
      const { height } = useWindowSize();
      windowHeight.value = height.value;
      const heightMonthly = reactive(useElementSize(monthlyRef));
      const { locale } = useI18n();

      const fixedColumn = computed(() => {
        return [
          {
            dataIndex: 'service',
            key: 'service',
            children: [
              {
                key: 'staff_code',
                fixed: 'left',
                width: 160,
              },
            ],
          },
          {
            key: 'general_total',
            children: [
              {
                key: 'time',
                fixed: 'left',
                width: locale.value === 'ja' ? 70 : 120,
              },
              {
                dataIndex: 'total',
                key: 'total_average',
                fixed: 'left',
                width: 70,
              },
            ],
          },
          {
            key: 'general_average',
            align: 'center',
            children: [
              {
                dataIndex: 'average',
                key: 'average',
                width: locale.value === 'ja' ? 70 : 90,
              },
            ],
          },
        ];
      });
      const columns: any = computed(() => []);

      useResizeObserver(searchRef, (entries) => {
        const entry = entries[0];
        const { height } = entry.contentRect;
        heightSearch.value = height;
      });

      const renderData = () => {
        const { result } = renderYearly(20);
        const data = renderHeaderYearly();
        setAverageRecord(data);
        dataColumn.value = data;
        dataSource.value = result.data;
        dataSource.value = reduce(
          dataSource.value,
          (res: any, item: any, index) => {
            const resp = pickBy(item.time_list, (_value) => _value);
            delete item.time_list;
            item = { ...item, ...resp };
            res[index] = item;
            return res;
          },
          [],
        );
      };

      const setAverageRecord = (data) => {
        each(fixedColumn.value, (item: any) => {
          return columns.value.push(item);
        });

        if (!isEmpty(data)) {
          const [constrainedAverage, overtimeAverage] = keys(data);
          const locale = item.value || LOCALE.JA;

          for (let i = 0; i < NUMBER_MONTH_IN_YEAR; i++) {
            let month = i;
            month += 4;
            month = month % 12;
            if (month === 0) month = 12;

            const renderMonth = locale === 'ja' ? month + '月' : monthInYearlyEnum[i];

            columns.value.push({
              key: 'hours_average',
              index: i,
              key_constrained: constrainedAverage,
              key_overtime: overtimeAverage,
              align: 'center',
              children: [
                {
                  key: 'hours',
                  dataIndex: i,
                  month: renderMonth,
                  width: 70,
                },
              ],
            });
          }
        }
      };

      const handleTitleColumn = (evt: QueryForm) => {
        queries.value = { ...evt };

        const index = findIndex(divisionEnum, (item: any) => item.value === queries.value.division);
        if (index !== -1) queries.value.division = divisionEnum[index].label;
      };

      const onSearch = (evt) => {
        handleTitleColumn(evt);
        renderData();
      };

      return {
        columns,
        queries,
        dataSource,
        dataColumn,
        monthlyRef,
        searchRef,
        windowHeight,
        heightSearch,
        heightMonthly,
        exportXLS,
        onSearch,
      };
    },
  });
</script>

<style lang="scss">
  @import '@/styles/shared/mixins';
  @import '@/styles/shared/variables';

  .yearly {
    .ant-table-column-sorters {
      display: flex !important;
      align-items: center !important;

      .ant-table-column-sorter {
        margin-bottom: 4px;
      }
    }

    &__options {
      @include flexbox(flex-end, flex-end);
      flex-direction: column;
      margin: 15px 15px 15px 0;
    }

    &__buttons {
      display: flex;
      align-content: center;

      .ant-btn-icon-only {
        display: inherit;
      }
    }

    &__table {
      #list-table {
        .ant-table-thead {
          > tr:first-child {
            > th:first-child {
              background-color: rgb(255, 165, 0);
            }
            th {
              background-color: rgb(102, 221, 170);
            }
          }

          tr:nth-child(n + 2) {
            th {
              background-color: rgb(102, 221, 170);
              text-align: center;
            }
          }

          .title__service {
            > span {
              display: block;
            }
          }
        }

        .ant-table-tbody {
          tr > td:first-child {
            vertical-align: middle;
          }
        }

        .ant-table-tbody > tr > td {
          &:nth-child(n + 1) {
            padding: 5px;
            vertical-align: inherit !important;
            line-height: 1.65em;
            table {
              text-align: center;
            }
          }
        }

        .table__report {
          border-collapse: collapse;
        }
      }
    }
  }
</style>
