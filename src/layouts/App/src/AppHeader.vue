<template>
  <a-layout-header class="header" mode="horizontal">
    <div class="header__content">
      <div class="header__content--left">
        <breadcrumb />
      </div>
      <div class="header__content--right">
        <a-button v-if="$route.meta?.hasSearch" class="btn__search" @click="openSearch">
          <search-outlined />
        </a-button>

        <profile />

        <drawer-language />
      </div>
    </div>
  </a-layout-header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import Breadcrumb from '@/components/Breadcrumb/Breadcrumb.vue';
  import { Profile } from '@/components/Profile';
  import { DrawerLanguage } from '@/components/Shared';
  import { SearchOutlined } from '@ant-design/icons-vue';
  import { useCommonStore } from '@/store/common';

  export default defineComponent({
    name: 'AppHeader',

    components: {
      Breadcrumb,
      Profile,
      DrawerLanguage,
      SearchOutlined,
    },

    setup() {
      const commonStore = useCommonStore();

      const openSearch = () => {
        commonStore.open = !commonStore.open.length ? [1] : [];
      };

      return {
        openSearch,
      };
    },
  });
</script>

<style lang="scss">
  @import '@/styles/shared/variables';
  @import '@/styles/shared/mixins';

  .header {
    position: fixed;
    left: 232px;
    right: 0;
    top: 0;
    z-index: 200;
    background-color: $color-grey-100;
    box-shadow: 0 1px 0 #f0f0f0;
    height: 56px;
    line-height: 28px;
    padding: 0 20px;
    transition: transform 0.3s ease-in-out, left 0.3s ease-in-out;

    &__content {
      @include flexbox(center, center);
      padding: 12px 0;

      &--left {
        flex-grow: 1;
      }

      &--right {
        @include flexbox(center, center);

        .dxe-base {
          height: 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          .user-name {
            font-size: 13px;
            line-height: 0;
          }

          .email {
            font-size: 12px;
            line-height: 0;
          }
        }

        .btn__search {
          @include flexbox(center, center);
          height: 32px;
          width: 32px;
          border-radius: 50%;
          padding: 0;

          &:not(:last-child) {
            margin-right: 16px;
          }
        }
      }
    }

    .header__search.is-badge {
      &:after {
        position: absolute;
        top: 0;
        right: -30%;
        height: 16px;
        width: 16px;
        background-color: $color-additional-red-6;
        content: ' ';
        border-radius: 50%;
      }
    }
  }
</style>
