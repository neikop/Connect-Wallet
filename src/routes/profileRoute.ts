import { Information, Inventory } from 'views/Profile/screens';

const profileRoute = {
  profile: {
    path: '/',
    url: '/profile',
    name: 'Profile',
    component: Information,
  },
  inventory: {
    path: '/inventory',
    url: '/profile/inventory',
    name: 'Inventory',
    component: Inventory,
  },
};

export default profileRoute;
