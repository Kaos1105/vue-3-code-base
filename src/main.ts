import { createApp } from 'vue';

import App from '@/App.vue';
import router from '@/router';
import i18n from '@/locale';
import pinia from '@/plugins/pinia';

import registerAntDesign from '@/plugins/ant.design';
import registerVee from '@/plugins/validation';
import '@/plugins/dayjs';

const app = createApp(App);
// Register plugins
registerAntDesign(app);
registerVee(app);

import './styles/main.scss';

app.use(i18n).use(pinia).use(router);

router.isReady().then(() => {
  app.mount('#app');
});
