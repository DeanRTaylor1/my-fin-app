/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DoRequest from '../../hooks/do-request';
import { currentUserContext } from '../../hooks/UserContext';
import LoadingCircle from '../Loading/loading-circle';
const SignOut = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(currentUserContext);
  const logoutAndNavigate = (data) => {
    setCurrentUser(null);
    navigate('/');
  };
  const { doRequest } = DoRequest({
    url: `/api/Auth/logout`,
    method: 'post',
    body: {},
    onSuccess: logoutAndNavigate,
  });

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <div className='h-full w-full flex justify-center items-center'>
      <LoadingCircle />
    </div>
  );
};

export default SignOut;
