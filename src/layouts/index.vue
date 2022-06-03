<template>
  <a-layout class="main">
    <app-sidebar @on-collapse-side-bar="onCollapseSideBar($event)" />

    <a-layout class="main__content">
      <app-header :class="isCollapse ? 'is-collapse' : ''">
        <slot name="header"></slot>
      </app-header>

      <a-layout-content class="main-layout">
        <a-config-provider :locale="locales[locale]">
          <router-view />
        </a-config-provider>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { AppSidebar, AppHeader } from '@/layouts/App';
  import localeEn from 'ant-design-vue/es/locale/en_US';
  import localeJa from 'ant-design-vue/es/locale/ja_JP';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    name: 'IndexLayout',

    components: { AppSidebar, AppHeader },

    setup() {
      const { locale } = useI18n();
      const route = useRoute();

      const visible = ref(true);
      const locales = ref({ en: localeEn, ja: localeJa });
      const isCollapse = ref<boolean>();

      locales.value.ja.Calendar['lang']['now'] = '現在';

      locales.value = {
        en: {
          ...locales.value.en,
          Empty: { description: 'There is no data to display' },
        },
        ja: {
          ...locales.value.ja,
          Empty: { description: '表示するデータがありません' },
        },
      };

      const onCollapseSideBar = (isCollapseEmit: boolean) => {
        isCollapse.value = isCollapseEmit;
      };

      watch(route, (_) => {});

      return {
        visible,
        locale,
        locales,
        isCollapse,
        localeJa,
        onCollapseSideBar,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .header.is-collapse {
    left: 66px;
    transition: transform 0.3s ease-in-out, left 0.3s ease-in-out;
  }

  .main {
    height: 100vh;
  }
</style>
