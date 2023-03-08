import { Fragment, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { currentUserContext } from '../../hooks/UserContext';

const AuthItems = ({ mobileNavHandler }) => {
  const { currentUser } = useContext(currentUserContext);

  const Items = [
    !currentUser && { label: 'Sign in', href: '/auth/signin' },
    currentUser && { label: 'Sign out', href: '/auth/signout' },
  ]
    .filter(Boolean)
    .map(({ label, href }) => {
      return (
        <NavLink className='hover:text-white' to={href}>
          <div
            onClick={(e) => mobileNavHandler(e, 'button')}
            className='navButton'
            key={href}
          >
            {label}
          </div>
        </NavLink>
      );
    });

  return <Fragment> {Items} </Fragment>;
};

export default AuthItems;
