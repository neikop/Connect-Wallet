import { Home } from 'views/Home';
import { Marketplace } from 'views/Marketplace';
import { ProfileScreen } from 'views/Profile';

const publicRoute = {
  home: {
    path: '/',
    name: 'Home',
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
    component: ProfileScreen,
    requiredLogin: true,
  },
};

export default publicRoute;
