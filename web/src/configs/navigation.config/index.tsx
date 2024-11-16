import type { NavigationTree } from '@/@types/navigation';
import { IconHome, IconUser } from '@tabler/icons-react';

const navigationConfig: NavigationTree[] = [
  {
    key: 'mortages',
    path: '/mortages',
    title: 'Mortages',
    translateKey: '',
    icon: IconHome,
    authority: [],
    subMenu: [],
  },
  //{
  //  key: 'users',
  //  path: '/users',
  //  title: 'Users',
  //  translateKey: '',
  //  icon: IconUser,
  //  authority: [],
  //  subMenu: []
  //},
];

export default navigationConfig;
