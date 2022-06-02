import { withInstall } from '@/utils';

import appHeader from './src/AppHeader.vue';
import appSidebar from './src/AppSidebar.vue';

export const AppHeader = withInstall(appHeader);
export const AppSidebar = withInstall(appSidebar);
