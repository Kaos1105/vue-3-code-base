import { withInstall } from '@/utils';

import sidebarArrowDown from './src/SidebarArrowDown.vue';
import sidebarClose from './src/SidebarClose.vue';
import sidebarDashboard from './src/SidebarDashboard.vue';
import sidebarAttendance from './src/SidebarAttendance.vue';
import sidebarSetting from './src/SidebarSetting.vue';

export const SidebarArrowDown = withInstall(sidebarArrowDown);
export const SidebarClose = withInstall(sidebarClose);
export const SidebarDashboard = withInstall(sidebarDashboard);
export const SidebarAttendance = withInstall(sidebarAttendance);
export const SidebarSetting = withInstall(sidebarSetting);
