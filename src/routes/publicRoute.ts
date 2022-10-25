import { Home } from 'views/Home';
import { Marketplace } from 'views/Marketplace';
import { ProfileScreen } from 'views/Profile';

const publicRoute = {
  home: {
    path: '/dashboard',
    name: 'Dashboard',
    component: Home,
  },
  marketplace: {
    path: '/market',
    name: 'Marketplace',
    component: Marketplace,
  },

  profile: {
    path: '/profile/*',
    url: '/profile',
    name: 'Profile',
    component: ProfileScreen,
    requiredLogin: true,
  },
};

export default publicRoute;
