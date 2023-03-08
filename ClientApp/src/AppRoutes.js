import { Counter } from './components/Counter';
import { FetchData } from './components/FetchData';
import Home from './components/Home';
import Outgoings from './components/Pages/Outgoings-Page';
import Profile from './components/Pages/Profile';
import Signin from './components/Pages/Signin';
import SignOut from './components/Pages/Signout';
import Signup from './components/Pages/Signup';
import UpdateProfilePage from './components/Pages/Update-Profile';
import UpdateProfile from './components/Profile/Update-Profile';

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: '/counter',
    element: <Counter />,
  },
  {
    path: '/fetch-data',
    element: <FetchData />,
  },
  {
    path: '/auth/signin',
    element: <Signin />,
  },
  {
    path: '/auth/signout',
    element: <SignOut />,
  },
  {
    path: '/auth/signup',
    element: <Signup />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/profile/update',
    element: <UpdateProfilePage />,
  },
  {
    path: '/outgoings',
    element: <Outgoings />,
  },
];

export default AppRoutes;
