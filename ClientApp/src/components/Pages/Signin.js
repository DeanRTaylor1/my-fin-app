import { Fragment, useContext, useEffect, useState } from 'react';
import LoginForm from '../Form/LoginForm';
import LoadingCircle from '../Loading/loading-circle';
import { useNavigate } from 'react-router-dom';
import Stripes from '../Design/Stripes';
import { currentUserContext } from '../../hooks/UserContext';

const Signin = () => {
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    console.log(currentUser === 'undefined');
    if (currentUser) {
      navigate('/');
    }
    if (!currentUser) {
      setIsLoading(false);
    }
  }, []);

  return (
    <Fragment>
      {!isLoading && <LoginForm />}
      {!isLoading && <Stripes />}
      {isLoading && (
        <div className='h-full w-full flex justify-center items-center'>
          <LoadingCircle />
        </div>
      )}
    </Fragment>
  );
};

export default Signin;
