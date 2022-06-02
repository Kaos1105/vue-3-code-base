<template>
  <div class="monthly">
    <search-monthly-report @form="onSearch" ref="searchRef" />

    <div class="monthly__options" ref="yearlyRef">
      <div class="monthly__buttons">
        <a-button
          type="link"
          class="btn-excel fs-12"
          @click="exportXLS('.list-table table', `monthly_report_${queries.division}`)"
        >
          {{ $t('common.export_excel') }}
          <template #icon>
            <file-excel-outlined :style="{ fontSize: '24px', color: '#064780' }" />
          </template>
        </a-button>
      </div>
    </div>

    <div class="monthly__table">
      <a-table
        id="list-table"
        :columns="columns"
        :data-source="dataSource"
        :row-key="(record) => record.id"
        :pagination="false"
        :show-sorter-tooltip="false"
        :scroll="{
          x: 'max-content',
          y: windowHeight - heightYearly.height - heightSearch - 148,
        }"
        bordered
        size="middle"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'service'">
            <table>
              <tbody>
                <tr>
                  <td class="orange text-center">
                    {{ formatTitle }}
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

          <template v-if="column.key === 'limit'">
            <table>
              <tr>
                <td colspan="3" class="mediumaquamarine"></td>
              </tr>
              <tr>
                <td colspan="3" class="mediumaquamarine"></td>
              </tr>
            </table>
          </template>

          <template v-if="column.key === 'month'">
            <table class="text-center">
              <tbody>
                <tr>
                  <td
                    class="mediumaquamarine"
                    :style="{ textAlign: 'center', color: column.sunday ? '#f5222d' : 'inherit' }"
                    >{{ column.month }}</td
                  >
                </tr>
                <tr class="mediumaquamarine text-center">
                  <td>{{ `(${column.day})` }}</td>
                </tr>
              </tbody>
            </table>
          </template>
        </template>
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.key === 'service'">
            <table>
              <tbody>
                <tr><td></td></tr>
                <tr>
                  <td style="text-align: center; vertical-align: middle">{{ text }}</td>
                </tr>
                <tr>
                  <td style="text-align: center; vertical-align: middle">{{
                    record.staff_code
                  }}</td>
                </tr>
                <tr><td></td></tr>
              </tbody>
            </table>
          </template>

          <template v-if="column.key === 'limit'">
            <table border="1" class="table__report">
              <tbody>
                <tr>
                  <td style="text-align: center; vertical-align: middle">{{
                    $t('attendance.restrain_time')
                  }}</td>
                  <td style="text-align: center; vertical-align: middle">{{
                    record.restrain_time
                  }}</td>
                  <td>
                    <table border="1" class="table__report">
                      <tbody>
                        <tr>
                          <td class="text-center">
                            {{ $t('attendance.start_time') }}
                          </td>
                        </tr>
                        <tr>
                          <td class="text-center">
                            {{ $t('attendance.end_time') }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center; vertical-align: middle">
                    {{ $t('attendance.overtime_hours') }}
                  </td>
                  <td style="text-align: center; vertical-align: middle">
                    {{ record.overtime_hours }}
                  </td>
                  <td>
                    <table border="1" class="table__report">
                      <tbody>
                        <tr>
                          <td class="text-center">{{ $t('attendance.restrain_time') }}</td>
                        </tr>
                        <tr>
                          <td class="text-center">{{ $t('attendance.overtime_hours') }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>

          <template v-if="column.key === 'month'">
            <template v-if="text">
              <table border="1" class="table__report">
                <tbody>
                  <tr>
                    <td class="text-center" style="height: 23px">{{ text[0] }}</td>
                  </tr>
                  <tr>
                    <td class="text-center" style="height: 23px">{{ text[1] }}</td>
                  </tr>
                  <tr>
                    <td class="text-center" style="height: 23px">{{ text[2] }}</td>
                  </tr>
                  <tr>
                    <td class="text-center" style="height: 23px">{{ text[3] }}</td>
                  </tr>
                </tbody>
              </table>
            </template>
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
                  <td style="text-align: center" class="orange">
                    {{ formatTitle }}
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center" class="orange">
                    {{ queries.division }}
                  </td>
                </tr>
              </tbody>
            </table>
          </template>

          <template v-if="column.key === 'limit'">
            <table class="border">
              <tr>
                <td colspan="3" class="mediumaquamarine"></td>
              </tr>
              <tr>
                <td colspan="3" class="mediumaquamarine"></td>
              </tr>
            </table>
          </template>

          <template v-if="column.key === 'month'">
            <table class="border" style="text-align: center">
              <tbody>
                <tr>
                  <td
                    class="mediumaquamarine"
                    :style="{ textAlign: 'center', color: column.sunday ? '#f5222d' : 'inherit' }"
                    >{{ column.month }}</td
                  >
                </tr>
                <tr class="mediumaquamarine" style="text-align: center">
                  <td>{{ `(${column.day})` }}</td>
                </tr>
              </tbody>
            </table>
          </template>
        </template>
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.key === 'service'">
            <table class="border">
              <tbody>
                <tr><td></td></tr>
                <tr>
                  <td style="text-align: center; vertical-align: middle">{{ text }}</td>
                </tr>
                <tr>
                  <td style="text-align: center; vertical-align: middle">{{
                    record.staff_code
                  }}</td>
                </tr>
                <tr><td></td></tr>
              </tbody>
            </table>
          </template>

          <template v-if="column.key === 'limit'">
            <table class="border">
              <tbody>
                <tr>
                  <td class="border" style="text-align: center; vertical-align: middle">{{
                    $t('attendance.restrain_time')
                  }}</td>
                  <td class="border" style="text-align: center; vertical-align: middle">{{
                    record.restrain_time
                  }}</td>
                  <td class="inner__table">
                    <table class="border">
                      <tbody>
                        <tr>
                          <td class="border" style="text-align: center">
                            {{ $t('attendance.start_time') }}
                          </td>
                        </tr>
                        <tr>
                          <td class="border" style="text-align: center">
                            {{ $t('attendance.end_time') }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td class="border" style="text-align: center; vertical-align: middle">
                    {{ $t('attendance.overtime_hours') }}
                  </td>
                  <td class="border" style="text-align: center; vertical-align: middle">
                    {{ record.overtime_hours }}
                  </td>
                  <td class="inner__table">
                    <table class="border">
                      <tbody>
                        <tr>
                          <td class="border" style="text-align: center">{{
                            $t('attendance.restrain_time')
                          }}</td>
                        </tr>
                        <tr>
                          <td class="border" style="text-align: center">{{
                            $t('attendance.overtime_hours')
                          }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>

          <template v-if="column.key === 'month'">
            <template v-if="text">
              <table>
                <tbody>
                  <tr>
                    <td class="border" style="text-align: center">{{ text[0] }}</td>
                  </tr>
                  <tr>
                    <td class="border" style="text-align: center">{{ text[1] }}</td>
                  </tr>
                  <tr>
                    <td class="border" style="text-align: center">{{ text[2] }}</td>
                  </tr>
                  <tr>
                    <td class="border" style="text-align: center">{{ text[3] }}</td>
                  </tr>
                </tbody>
              </table>
            </template>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onBeforeMount, reactive, ref } from 'vue';
  import { divisionEnum } from '@/enums/divisionEnum';
  import { findIndex, indexOf, pickBy, reduce } from 'lodash-es';
  import { LOCALE } from '@/enums/localeEnum';
  import { useLocalStorage } from '@/hooks/useLocalStorage';
  import { renderMonthly } from '@/faker/monthlyReport';
  import { FileExcelOutlined } from '@ant-design/icons-vue';
  import { useExportReport } from '@/hooks/useExportReport';
  import { dayInWeekEnEnum, dayInWeekJaEnum } from '@/enums/dayInWeekEnum';
  import SearchMonthlyReport from './components/SearchMonthlyReport.vue';
  import dayjs, { Dayjs } from 'dayjs';
  import { LocalStorageEnum } from '@/enums/localStorageEnum';
  import { useElementSize, useResizeObserver, useWindowSize } from '@vueuse/core';
  import { useI18n } from 'vue-i18n';

  interface QueryForm {
    month: string | Dayjs;
    division: string | number;
    staff: string | number;
  }

  export default defineComponent({
    name: 'MonthlyReport',

    components: {
      SearchMonthlyReport,
      FileExcelOutlined,
    },

    setup() {
      const formatTitle = ref<string>('');
      const queries = ref<QueryForm>({ month: '', division: '', staff: '' });
      const dataSource = ref<any[]>([]);
      const yearlyRef = ref<null>(null);
      const searchRef = ref<null>(null);
      const windowHeight = ref<number>(0);
      const heightSearch = ref<number>(0);

      const { item } = useLocalStorage(LocalStorageEnum.LANGUAGE);
      const { exportXLS } = useExportReport();
      const { height } = useWindowSize();
      windowHeight.value = height.value;
      const heightYearly = reactive(useElementSize(yearlyRef));
      const { locale } = useI18n();

      const columns = computed(() => {
        const arr: any = [
          {
            dataIndex: 'service',
            key: 'service',
            fixed: 'left',
            align: 'center',
            width: 150,
          },
          {
            key: 'limit',
            fixed: 'left',
            width: locale.value === 'ja' ? 170 : 250,
          },
        ];

        if (queries.value.month) {
          let monthFrom;
          let monthTo;
          let yearFrom;
          let yearTo;
          let date;

          monthFrom = dayjs(queries.value.month).format('MM');
          yearFrom = dayjs(queries.value.month).format('YYYY');
          date = dayjs(queries.value.month).add(1, 'months');
          monthTo = date.format('MM');
          yearTo = date.format('YYYY');

          if (monthFrom && yearFrom && monthTo && yearTo) {
            const locale = item.value || LOCALE.JA;
            let startDate = `${yearFrom}-${monthFrom}-15`;
            const endDate = `${yearTo}-${monthTo}-14`;

            while (dayjs(startDate) <= dayjs(endDate)) {
              startDate = dayjs(startDate).add(1, 'days').format('YYYY-MM-DD');
              const m = dayjs(startDate);
              let i = +m.format('d');

              arr.push({
                dataIndex: m.format('MM-DD'),
                key: 'month',
                align: 'center',
                sunday: m.isoWeekday() === 7,
                month: m.format(locale === 'ja' ? 'MM月DD日' : 'MMM Do'),
                day: locale === 'ja' ? dayInWeekJaEnum[i] : dayInWeekEnEnum[i],
                width: 80,
              });
            }
          }
        }
        return [...arr];
      });

      useResizeObserver(searchRef, (entries) => {
        const entry = entries[0];
        const { height } = entry.contentRect;
        heightSearch.value = height;
      });

      onBeforeMount(() => {
        const { result } = renderMonthly(20);
        dataSource.value = result.data;
        dataSource.value = reduce(
          dataSource.value,
          (res: any, item: any, index) => {
            const resp = pickBy(item.time_list, (_value, key) => indexOf(key, '/'));
            delete item.time_list;
            item = { ...item, ...resp };
            res[index] = item;
            return res;
          },
          [],
        );
      });

      const handleTitleColumn = (evt) => {
        const locale = item.value || LOCALE.JA;

        queries.value = { ...evt };

        formatTitle.value = dayjs(queries.value.month).format(
          locale === 'ja' ? 'YYYY年MM月' : 'YYYY/MM',
        );

        const index = findIndex(divisionEnum, (item: any) => item.value === queries.value.division);
        if (index !== -1) queries.value.division = divisionEnum[index].label;
      };

      const onSearch = (evt) => {
        handleTitleColumn(evt);
      };

      return {
        columns,
        queries,
        formatTitle,
        dataSource,
        yearlyRef,
        searchRef,
        windowHeight,
        heightSearch,
        heightYearly,
        exportXLS,
        onSearch,
      };
    },
  });
</script>

<style lang="scss">
  @import '@/styles/shared/mixins';
  @import '@/styles/shared/variables';

  .monthly {
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
        .ant-table-thead > tr > th {
          &:first-child {
            background-color: rgb(255, 165, 0);
          }
          &:nth-child(n + 2) {
            background-color: rgb(102, 221, 170);
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
          &:nth-child(2) {
            padding: 5px;
            vertical-align: middle;
          }
          &:nth-child(n + 3) {
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
