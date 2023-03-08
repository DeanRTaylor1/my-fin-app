import { useContext, useState } from 'react';
import DoRequest from '../../hooks/do-request';
import Formerrors from './Form-Errors';
import Input from './Input';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook, BsGithub } from 'react-icons/bs';
import { NavLink, useNavigate } from 'react-router-dom';
import { currentUserContext } from '../../hooks/UserContext';
import FormLogo from '../Form-Logo';

const LoginForm = () => {
  const { currentUser, setCurrentUser } = useContext(currentUserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setUserAndNavigate = (data) => {
    setCurrentUser(data);
    navigate('/');
  };

  const { doRequest, errors } = DoRequest({
    url: `/api/Auth/login`,
    method: 'post',
    body: { email, password },
    onSuccess: setUserAndNavigate,
  });

  const getEmail = (e) => {
    setEmail(e.currentTarget.value);
  };

  const getPassword = (e) => {
    setPassword(e.currentTarget.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    doRequest();
  };

  const oAuthLogin = async (strategy) => {
    let timer = null;
    const oAuthLoginURL = `/api/login/${strategy}`;
    const newWindow = window.open(
      oAuthLoginURL,
      '_blank',
      'width=500, height=600'
    );
    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          if (timer) {
            clearInterval(timer);
          }
          navigate.push('/');
        }
      }, 500);
    }
  };
  return (
    <div className='w-full h-full flex mt-14 items-start justify-center z-10'>
      <form
        onSubmit={formSubmitHandler}
        className='h-fit w-96 flex flex-col shadow-2xl bg-white  rounded-md px-8 py-4 text-xl font-bold'
      >
        <div className='py-4 h-20 flex justify-between'>
          Sign in: <Formerrors errors={errors} />
        </div>

        <div className='flex flex-col gap-8'>
          <Input
            name={'Email Address:'}
            label={'emailaddress'}
            type={'email'}
            placeholder={'Email address'}
            getInputs={getEmail}
            value={email}
          />
          <Input
            name={'Password:'}
            label={'password'}
            type={'password'}
            placeholder={'Password'}
            getInputs={getPassword}
            value={password}
          />
          <button onClick={formSubmitHandler} className='signInButton'>
            Sign In
          </button>
          <div className='w-full flex justify-center items-center font-light text-xs'>
            Or get started with:
          </div>
          <div className='flex justify-center items-center w-full pb-4 gap-4'>
            <FcGoogle
              size={35}
              className='hover:cursor-pointer hover:opacity-75'
              onClick={() => oAuthLogin('google')}
            />
            <BsFacebook
              size={30}
              className='hover:cursor-pointer hover:opacity-75'
              onClick={() => oAuthLogin('facebook')}
            />
            <BsGithub
              size={30}
              className='hover:cursor-pointer hover:opacity-75'
              onClick={() => oAuthLogin('github')}
            />
          </div>
        </div>
        <div className='flex font-light text-xs py-3 gap-2'>
          Don&apos;t use social media?
          <NavLink
            className='navLink font-bold text-xs text-blue-300'
            to={'/auth/signup'}
          >
            Sign Up
          </NavLink>
        </div>
      </form>
    </div>
  );
};
//test

export default LoginForm;
