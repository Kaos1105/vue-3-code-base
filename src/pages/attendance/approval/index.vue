<template>
  <div class="approval">
    <a-tabs type="card" :activeKey="activeKey" @change="changeTab">
      <a-tab-pane v-for="t in tabPanel" :key="t.key" :tab="t.tab">
        <keep-alive>
          <component :is="t.component" />
        </keep-alive>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onBeforeMount, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import TableWaitingRequest from './components/TableWaitingRequest.vue';
  import TableApproveRequest from './components/TableApproveRequest.vue';
  import TableRejectRequest from './components/TableRejectRequest.vue';
  import { find, findIndex, assign } from 'lodash-es';
  import { useRouter, useRoute } from 'vue-router';
  import { attendanceApproveTabEnum } from '@/enums/attendanceApproveTabEnum';
  import { useCommonStore } from '@/store/common';

  export default defineComponent({
    name: 'Approval',

    components: {
      TableApproveRequest,
      TableWaitingRequest,
      TableRejectRequest,
    },

    setup() {
      const { t } = useI18n();
      const router = useRouter();
      const route = useRoute();
      const commonStore = useCommonStore();
      const activeKey = ref<any>();

      onBeforeMount(() => {
        activeTab();
      });

      const tabPanel = computed(() => {
        return [
          {
            key: 1,
            tab: t('attendance.waiting'),
            component: 'TableWaitingRequest',
          },
          {
            key: 2,
            tab: t('attendance.applied'),
            component: 'TableApproveRequest',
          },
          {
            key: 3,
            tab: t('attendance.rejected'),
            component: 'TableRejectRequest',
          },
        ];
      });

      const activeTab = () => {
        if (route?.query?.tab) {
          const tab = find(
            attendanceApproveTabEnum,
            (item: { key: number; value: string }) => item.value === route.query.tab,
          );
          activeKey.value = tab?.key;
        } else {
          handleRoute();
          activeKey.value = 1;
        }
      };

      const changeTab = (evt) => {
        commonStore.open = [];
        setTimeout(() => {
          activeKey.value = evt;
          handleRoute(findIndex(attendanceApproveTabEnum, { key: activeKey.value }));
        }, 200);
      };

      const handleRoute = (index = 0) => {
        router.replace({
          query: assign({ ...route.query }, { tab: attendanceApproveTabEnum[index].value }),
        });
      };

      return {
        activeKey,
        tabPanel,
        changeTab,
      };
    },
  });
</script>

<style scoped></style>
