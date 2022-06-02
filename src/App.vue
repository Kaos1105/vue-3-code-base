<template>
  <router-view />
  <!-- dynamic title browser -->
  <teleport to="head">
    <title>{{ title }}</title>
  </teleport>
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount, watch, ref } from 'vue';
  import { useConfigValidate } from '@/hooks/useConfigValidate';
  import { useLanguageStore } from '@/store/language';
  import { useLocalStorage } from '@/hooks/useLocalStorage';
  import { useI18n } from 'vue-i18n';
  import { LOCALE } from '@/enums/localeEnum';
  import { useRoute } from 'vue-router';
  import { LocalStorageEnum } from '@/enums/localStorageEnum';

  export default defineComponent({
    name: 'App',

    setup() {
      const store = useLanguageStore();
      const { locale, t } = useI18n();
      const { item } = useLocalStorage(LocalStorageEnum.LANGUAGE);
      const route = useRoute();

      const title = ref<string>('');

      watch(
        () => route.meta,
        async (meta) => {
          setMetaTitle(meta);
        },
      );

      onBeforeMount(() => {
        locale.value = item.value || LOCALE.JA;
        if (!item.value) store.setLanguage(LOCALE.JA);
        setMetaTitle(route.meta);
        useConfigValidate().configureMessage();
      });

      const setMetaTitle = (meta) => {
        document.title = `${t(meta.title as string)} | ${import.meta.env.VITE_APP_TITLE}`;
      };

      return {
        title,
      };
    },
  });
</script>
