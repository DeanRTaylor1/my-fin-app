import { Bars3Icon, UserCircleIcon } from '@heroicons/react/24/solid';
import Logo from '../Logo';

import uniqid from 'uniqid';
import { useContext, useState } from 'react';
//import ProfileMenu from './profile/profile-menu';
import { NavLink } from 'react-router-dom';

import Mobilenav from './Mobile-Nav';
import { currentUserContext } from '../../hooks/UserContext';

const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  console.log(currentUser);
  const [scale, setScale] = useState('scale-0');
  const [profileScale, setProfileScale] = useState('-right-96');
  const authItems = [
    !currentUser && { label: 'Sign in', href: '/auth/signin' },
    currentUser && { label: 'Sign out', href: '/auth/signout' },
  ]
    .filter(Boolean)
    .map(({ label, href }) => {
      return (
        <div
          onClick={(e) => mobileNavHandler(e, 'button')}
          className='navButton'
          key={href}
        >
          <NavLink className='hover:text-white' to={href}>
            {label}
          </NavLink>
        </div>
      );
    });

  const navItems = [
    currentUser && { label: 'Dashboard', href: '/dashboard' },
    true && { label: 'Stocks', href: '/stocks' },
    true && { label: 'News', href: '/news' },
    true && { label: 'Guide', href: '/guide' },
    true && { label: 'About', href: '/about' },
  ]
    .filter(Boolean)
    .map(({ label, href }) => {
      return (
        <li
          className='navItem'
          key={href}
          onClick={(e) => mobileNavHandler(e, 'button')}
        >
          <NavLink className='navLink' to={href}>
            {label}
          </NavLink>
        </li>
      );
    });

  const profileItems = [
    currentUser && { label: 'My Profile', href: '/user/profile' },
    currentUser && { label: 'Regular Outgoings', href: '/outgoings' },
    currentUser && { label: 'Daily expenses', href: '/expenses' },
  ]
    .filter(Boolean)
    .map(({ label, href }) => {
      return (
        <li
          className='navItem'
          key={href}
          onClick={(e) => {
            mobileNavHandler(e, 'button');
            mobileProfileHandler(e, 'button');
          }}
        >
          <NavLink
            key={uniqid()}
            className='nav-link'
            style={{ textDecoration: 'none' }}
            to={href}
          >
            {' '}
            {label}
          </NavLink>
        </li>
      );
    });

  const mobileProfileHandler = (event, source) => {
    //this condition closes the navbar if the users clicks one of the buttons/NavLinks
    //console.log(source);
    if (source === 'button') {
      return setProfileScale('-right-96 ');
    }
    profileScale === 'right-0'
      ? setProfileScale('-right-96')
      : setProfileScale('right-0');
  };

  const mobileNavHandler = (event, source) => {
    //this condition closes the navbar if the users clicks one of the buttons/NavLinks
    //console.log(source);
    if (source === 'button') {
      return setScale('scale-0');
    }
    scale === 'scale-0' ? setScale('scale-100') : setScale('scale-0');
  };

  return (
    <div className='navbar max-w-[1200px]'>
      <Logo
        mobileNavHandler={mobileNavHandler}
        mobileProfileHandler={mobileProfileHandler}
      />
      <ul className='hidden xl:flex justify-around items-center  w-[calc(750px)] pr-12 '>
        {navItems}
      </ul>
      {/*<ul className='hidden md:flex  gap-2'>{authItems}</ul>*/}
      {currentUser && (
        <UserCircleIcon
          className='h-12 w-10 hidden xl:flex hover:cursor-pointer'
          onClick={mobileProfileHandler}
        />
      )}
      {/*currentUser && (
                <ProfileMenu
                    authItems={authItems}
                    mobileProfileHandler={mobileProfileHandler}
                    profileScale={profileScale}
                    profileItems={profileItems}
                    mobileNavHandler={mobileNavHandler}
                />
            )*/}
      {!currentUser && (
        <ul className='xl:flex hidden justify-center border-t border-gray-200 border-dashed p-4 items-center'>
          {authItems}
        </ul>
      )}
      <Bars3Icon
        className='h-8 w-6 xl:hidden hover:cursor-pointer'
        onClick={mobileNavHandler}
      />
      <Mobilenav
        authItems={authItems}
        navItems={navItems}
        profileItems={profileItems}
        scale={scale}
        mobileNavHandler={mobileNavHandler}
        mobileProfileHandler={mobileProfileHandler}
      />
    </div>
  );
};

export default Navbar;
