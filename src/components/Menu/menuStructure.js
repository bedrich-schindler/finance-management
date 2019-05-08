import IconAttachMoney from '@material-ui/icons/AttachMoney';
import IconDashboard from '@material-ui/icons/Dashboard';
import IconList from '@material-ui/icons/List';
import IconMoneyOff from '@material-ui/icons/MoneyOff';
import IconSettings from '@material-ui/icons/Settings';
import routes from '../../routes';

export default [
  {
    icon: IconDashboard,
    path: routes.dashboard.path,
    title: routes.dashboard.title,
  },
  { isDivider: true },
  {
    icon: IconAttachMoney,
    path: routes.revenues.path,
    title: routes.revenues.title,
  },
  {
    icon: IconMoneyOff,
    path: routes.expenses.path,
    title: routes.expenses.title,
  },
  { isDivider: true },
  {
    icon: IconList,
    path: routes.categories.path,
    title: routes.categories.title,
  },
  { isDivider: true },
  {
    icon: IconSettings,
    path: routes.settings.path,
    title: routes.settings.title,
  },
];
