import { Counter } from './components/Counter';
import { FetchData } from './components/FetchData';
import Home from './components/Home';
import Profile from './components/Pages/Profile';
import Signin from './components/Pages/Signin';
import SignOut from './components/Pages/Signout';
import Signup from './components/Pages/Signup';

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
];

export default AppRoutes;
