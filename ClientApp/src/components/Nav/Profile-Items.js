import { Fragment, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { currentUserContext } from '../../hooks/UserContext';
import uniqid from 'uniqid';

const ProfileItems = ({ mobileNavHandler, mobileProfileHandler }) => {
  const { currentUser } = useContext(currentUserContext);

  const Items = [
    currentUser && { label: 'My Profile', href: '/profile' },
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
            className='navLink'
            style={{ textDecoration: 'none' }}
            to={href}
          >
            {' '}
            {label}
          </NavLink>
        </li>
      );
    });

  return <Fragment> {Items} </Fragment>;
};

export default ProfileItems;
