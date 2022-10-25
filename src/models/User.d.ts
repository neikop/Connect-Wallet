type ProfileType = {
  isLoggedIn: boolean;
  accessToken?: string;
  address?: Address;
  username?: string;
};

type UserType = {
  id: string;
  address: string;
  username: string;
};
