<template>
  <section class="dashboard">
    <div class="dashboard__main text-center">
      <ul class="t-image-b">
        <li @click="$router.push({ name: 'work-data', query: { mode: 'daily' } })">
          <span class="u-mb-4">{{ $t('dashboard.daily_data') }}</span>
          <img :src="dailyLogo" :alt="$t('dashboard.daily_data')" />
        </li>
        <li @click="$router.push({ name: 'work-data', query: { mode: 'monthly' } })">
          <span class="u-mb-4">{{ $t('dashboard.monthly_data') }}</span>
          <img :src="monthlyLogo" :alt="$t('dashboard.monthly_data')" />
        </li>
        <li @click="$router.push({ name: 'staff-list' })">
          <span class="u-mb-4">{{ $t('dashboard.search_staff_list') }}</span>
          <img :src="staffListLogo" :alt="$t('dashboard.search_staff_list')" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import dailyLogo from '@/assets/images/calendar-daily.png';
  import monthlyLogo from '@/assets/images/october.png';
  import staffListLogo from '@/assets/images/job.png';

  export default defineComponent({
    name: 'Index',

    setup() {
      return {
        dailyLogo,
        monthlyLogo,
        staffListLogo,
      };
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
