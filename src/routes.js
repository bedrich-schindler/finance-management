const getComponent = (
  folderName,
  componentName,
) => require(`./pages/${folderName}`)[`${componentName}Page`]; // eslint-disable-line

export default {
  categories: {
    component: () => getComponent('category', 'Categories'),
    path: '/categories',
    title: 'Categories',
  },
  dashboard: {
    component: () => getComponent('dashboard', 'Dashboard'),
    path: '/',
    title: 'Dashboard',
  },
  expenses: {
    component: () => getComponent('expense', 'Expenses'),
    path: '/expenses',
    title: 'Expenses',
  },
  login: {
    component: () => getComponent('login', 'Login'),
    isAnonymous: true,
    path: '/login',
    title: 'Login',
  },
  registration: {
    component: () => getComponent('registration', 'Registration'),
    isAnonymous: true,
    path: '/registration',
    title: 'Registration',
  },
  revenues: {
    component: () => getComponent('revenue', 'Revenues'),
    path: '/revenues',
    title: 'Revenues',
  },
  settings: {
    component: () => getComponent('settings', 'Settings'),
    path: '/settings',
    title: 'Settings',
  },
};
