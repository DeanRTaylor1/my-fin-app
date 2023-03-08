import { Fragment, useContext, useEffect, useState } from 'react';

import LoadingCircle from '../Loading/loading-circle';
import { useNavigate } from 'react-router-dom';

import { currentUserContext } from '../../hooks/UserContext';
import ProfilePage from '../Profile/Profile-Page';
export default function Profile() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(currentUserContext);

  const checkUser = () => {
    if (!currentUser) {
      navigate('/auth/signin');
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(!currentUser);
    const timer = setTimeout(() => {
      checkUser();
    }, 300);
    return () => clearTimeout(timer);
  }, [currentUser]);
  return (
    <Fragment>
      {isLoading && (
        <div className='h-full w-full flex justify-center items-center'>
          {' '}
          <LoadingCircle />{' '}
        </div>
      )}
      {!isLoading && <ProfilePage currentUser={currentUser} />}
    </Fragment>
  );
}
