import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import LoadingCircle from '../Loading/loading-circle';
import DeleteUserModal from './Delete-User-Modal';
import { numberWithCommas, toNormalCase } from '../../Utils';
import { NavLink, useNavigate } from 'react-router-dom';
import { currentUserContext } from '../../hooks/UserContext';

//type userStateData = Omit<userProfileData, 'id' | 'createdAt'>

const ProfilePage = () => {
  const { currentUser } = useContext(currentUserContext);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  //redirect if no current user and populate user data from api
  const [userData, setUserData] = useState(null);
  const [confirmDeleteModalActive, setConfirmDeleteModalActive] =
    useState(false);

  const doRequest = async (email) => {
    try {
      await axios.delete(`/api/users`, {
        headers: { email },
        withCredentials: true,
      });
      navigate('/');
    } catch (err) {
      console.log(err);
      navigate(0);
    }
  };

  const getUserData = async (email) => {
    try {
      let response = await axios.post(
        `/api/Finance`,
        { email },
        { withCredentials: true }
      );
      let results = [];
      let responseData = response.data;
      for (let key in responseData) {
        //console.log(key, responseData[key]);
        let temp = {
          name: toNormalCase(key),
          value: responseData[key],
          tag: key,
        };
        results.push(temp);
      }
      // console.log(results)
      setUserData(results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(currentUser.email);
    getUserData(currentUser.email);

    let loadingTimer = setTimeout(() => setIsLoading(false), 750);

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  return (
    <div className=' max-w-[calc(900px)] w-[90vw] h-[calc(85vh)] flex mt-14 items-start justify-center z-10'>
      <div
        className={`h-fit w-[95%] flex flex-col gap-4 min-h-fit bg-white  rounded-md px-8 py-4 text-xl font-bold ${
          confirmDeleteModalActive ? 'filter blur-md' : ''
        }`}
      >
        <div className='py-4 h-20 flex justify-between underline underline-offset-4 font-extrabold '>
          {currentUser.username}
        </div>
        {isLoading && (
          <div className='h-36 w-full flex justify-center items-center'>
            <LoadingCircle />{' '}
          </div>
        )}

        {!isLoading &&
          userData &&
          userData
            .filter(
              (item) =>
                item.name !== 'Created At' &&
                item.name !== 'Updated At' &&
                item.name !== 'Username' &&
                item.name !== 'Savings Rate'
            )
            .map((item, index) => {
              return (
                <div
                  key={index}
                  className='p-2 border-b border-dashed border-slate-200 flex flex-col gap-2'
                >
                  {item.name}:{' '}
                  <div className='font-extralight text-lg'>
                    {isNaN(+item.value) || item.name === 'Phone'
                      ? item.value
                      : numberWithCommas(+item.value)}{' '}
                  </div>
                </div>
              );
            })}
        {!isLoading &&
          userData &&
          userData
            .filter((item) => item.name === 'Savings Rate')
            .map((item, index) => {
              return (
                <div
                  key={index}
                  className='p-2 border-b border-dashed border-slate-200 flex flex-col gap-2'
                >
                  {item.name}:{' '}
                  <div className='font-extralight text-lg'>
                    {`${item.value}%`}
                  </div>
                </div>
              );
            })}

        {!isLoading && (
          <NavLink className={'navLink'} to='/user/profile/update'>
            {' '}
            <button className='signInButton'>Update Details</button>{' '}
          </NavLink>
        )}
        {!isLoading && (
          <button
            className='signInButton bg-red-600 hover:bg-red-800 focus:bg-red-800'
            onClick={(e) => {
              e.preventDefault();
              setConfirmDeleteModalActive(true);
            }}
          >
            Delete Account
          </button>
        )}
      </div>
      {confirmDeleteModalActive && (
        <DeleteUserModal
          currentUser={currentUser}
          setConfirmDeleteModalActive={setConfirmDeleteModalActive}
          doRequest={doRequest}
        />
      )}
    </div>
  );
};

export default ProfilePage;
