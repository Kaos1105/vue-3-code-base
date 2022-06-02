<template>
  <div class="basic-setting">
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
  import { computed, defineComponent, onBeforeMount, onMounted, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { find, findIndex, assign } from 'lodash-es';
  import { useRouter, useRoute } from 'vue-router';
  import { basicSettingTabEnum } from '@/enums/basicSettingTabEnum';
  import { useCommonStore } from '@/store/common';

  import TableJobCategory from './components/TableJobCategory.vue';
  import TableCalendar from './components/TableCalendar.vue';

  export default defineComponent({
    name: 'BasicSetting',

    components: {
      TableJobCategory,
      TableCalendar,
    },

    setup() {
      const { t } = useI18n();
      const router = useRouter();
      const route = useRoute();
      const commonStore = useCommonStore();
      const activeKey = ref();

      onBeforeMount(() => {
        activeTab();
      });

      const tabPanel = computed(() => {
        return [
          {
            key: 1,
            tab: t('setting.employment_classification_setting'),
            component: 'TableJobCategory',
          },
          {
            key: 2,
            tab: t('setting.calendar'),
            component: 'TableCalendar',
          },
        ];
      });

      const activeTab = () => {
        if (route?.query?.tab) {
          const tab = find(
            basicSettingTabEnum,
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
          handleRoute(findIndex(basicSettingTabEnum, { key: activeKey.value }));
        }, 200);
      };

      const handleRoute = (index = 0) => {
        router.replace({
          query: assign({ ...route.query }, { tab: basicSettingTabEnum[index].value }),
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
