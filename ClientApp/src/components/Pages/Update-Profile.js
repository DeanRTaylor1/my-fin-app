import { Fragment, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { currentUserContext } from '../../hooks/UserContext';
import LoadingCircle from '../Loading/loading-circle';
import UpdateProfile from '../Profile/Update-Profile';

export default function UpdateProfilePage() {
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
      {!isLoading && <UpdateProfile currentUser={currentUser} />}
    </Fragment>
  );
}
