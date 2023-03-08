import axios from 'axios';
import { currentUserContext } from '../../hooks/UserContext';
import { Fragment, useEffect, useState, useContext } from 'react';
import LoadingCircle from '../Loading/loading-circle';
import OutgoingsBody from '../outgoings/Outgoings-Body';
import { useNavigate } from 'react-router-dom';
function Outgoings() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
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
          <LoadingCircle />{' '}
        </div>
      )}
      {!isLoading && <OutgoingsBody />}
    </Fragment>
  );
}

export default Outgoings;
