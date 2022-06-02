<template>
  <div>
    <align-right-outlined :style="{ fontSize: '20px' }" @click="showDrawer" />

    <a-drawer
      :title="$t('common.language')"
      width="365"
      placement="right"
      class="drawer__language"
      v-model:visible="visible"
    >
      <p>{{ $t('common.plz_select_language') }}</p>
      <ul class="u-mb-0">
        <li
          v-for="(item, i) in options"
          :key="i"
          @click="handleChange(item.locale)"
          :class="{ active: locale === item.locale }"
          >{{ item.value }}</li
        >
      </ul>
    </a-drawer>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { AlignRightOutlined } from '@ant-design/icons-vue';
  import { useLanguageStore } from '@/store/language';
  import { useI18n } from 'vue-i18n';

  export default defineComponent({
    name: 'DrawerLanguage',

    components: {
      AlignRightOutlined,
    },

    setup() {
      const store = useLanguageStore();
      const { locale } = useI18n();

      const visible = ref<boolean>(false);
      const options = ref([
        { locale: 'ja', value: '日本語 (Japanese)' },
        { locale: 'en', value: 'English' },
      ]);

      const showDrawer = () => {
        visible.value = true;
      };

      const handleChange = (value: string) => {
        location.reload();
        store.setLanguage(value);
      };

      return {
        visible,
        options,
        locale,
        handleChange,
        showDrawer,
      };
    },
  });
</script>

<style lang="scss">
  .drawer__language {
    .ant-drawer-wrapper-body {
      .ant-drawer-body {
        > p {
          color: #999999;
          font-size: 12px;
        }
      }
    }
    ul {
      list-style-type: none;
      padding-left: 0;
      li {
        cursor: pointer;
        padding: 5px;
        width: fit-content;
        &:hover,
        &.active {
          text-decoration: underline;
          color: #0d45b7;
        }
      }
    }
  }
</style>
