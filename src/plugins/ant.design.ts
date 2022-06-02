import {
  Button,
  Input,
  DatePicker,
  TimePicker,
  Checkbox,
  Pagination,
  Table,
  Tabs,
  Layout,
  Collapse,
  Modal,
  Select,
  Form,
  ConfigProvider,
  Breadcrumb,
  Popover,
  Menu,
  Tooltip,
  Col,
  Row,
  Popconfirm,
  Switch,
  Drawer,
  Spin,
} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';

const registerAntDesign = (app) => {
  app
    .use(Button)
    .use(Input)
    .use(DatePicker)
    .use(TimePicker)
    .use(Checkbox)
    .use(Pagination)
    .use(Table)
    .use(Tabs)
    .use(Layout)
    .use(Collapse)
    .use(Modal)
    .use(Form)
    .use(ConfigProvider)
    .use(Breadcrumb)
    .use(Popover)
    .use(Menu)
    .use(Select)
    .use(Tooltip)
    .use(Row)
    .use(Col)
    .use(Popconfirm)
    .use(Switch)
    .use(Drawer)
    .use(Spin);
};

export default registerAntDesign;
