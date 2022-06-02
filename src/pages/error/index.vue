<template>
  <section class="page-404">
    <div class="page-404__content">
      <img :src="background" alt="Error page" />
      <h1 class="page-404__content--title">{{ $t('error.page_not_found') }}</h1>
      <h2 class="page-404__content--description">{{ $t('error.content') }}</h2>
      <router-link to="/">
        <a-button type="primary" size="large">{{ $t('error.btn_page') }}</a-button>
      </router-link>

      <drawer-language class="drawer__lang" />
    </div>
  </section>
</template>

<script>
  import { defineComponent } from 'vue';

  import background from '@/assets/404.png';
  import { DrawerLanguage } from '@/components/Shared';

  export default defineComponent({
    name: 'ErrorPage',

    components: {
      DrawerLanguage,
    },

    setup() {
      return {
        background,
      };
    },
  });
</script>

<style lang="scss">
  @import '@/styles/shared/variables';
  @import '@/styles/shared/mixins';

  .page-404 {
    @include flexbox(center, flex-start);
    background-color: $color-grey-96;
    height: 100vh;

    &__content {
      @include flexbox(center, center);
      flex-direction: column;
      background-color: $color-grey-100;
      width: 100%;
      height: 100%;

      &--title {
        font-size: 20px;
        font-weight: 700;
        line-height: 28px;
        color: $color-grey-15;
        margin-top: 32px;
      }

      &--description {
        font-size: 20px;
        font-weight: 400;
        line-height: 28px;
        color: $color-grey-15;
        margin-bottom: 32px;
      }
    }

    .drawer__lang {
      position: absolute;
      top: 12px;
      right: 20px;
    }
  }
</style>
