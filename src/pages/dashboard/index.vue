<template>
  <section class="dashboard">
    <div class="dashboard__main text-center"> Dash board </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Index',

    setup() {
      return {};
    },
  });
</script>

<style lang="scss" scoped>
  @import '@/styles/shared/mixins';
  .dashboard {
    margin: 15px;
    &__main {
      vertical-align: middle;
      min-width: 515px;
      .t-image-b {
        display: inline-flex;
        margin: 100px 0 0;
        padding-left: 0;
        border: 1px solid #d9d9d9;
        li {
          font-weight: bold;
          min-width: 169px;
          list-style: none;
          cursor: pointer;
          padding: 15px;
          border-right: 1px solid #d9d9d9;
          &:hover {
            background-color: #d9d9d9;
          }
          &:last-child {
            border-right: none;
          }
          span {
            display: block;
          }
        }
      }
    }
  }
</style>
