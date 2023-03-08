import { useEffect, useState, useReducer } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import profileReducer from '../../Utils/update-profile-reducer';
import DoRequest from '../../hooks/do-request';
import { toNormalCase } from '../../Utils';
import Formerrors from '../Form/Form-Errors';
import LoadingCircle from '../Loading/loading-circle';

//type userStateData = Omit<userProfileData, 'id' | 'createdAt'>

const initialState = {
  monthlySalary: 0,
  currency: 'vnd',
  phone: '',
  savingsTarget: 0,
  savingsRate: 50,
  currentSavings: 0,
};

const UpdateProfile = ({ currentUser }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const [sliderColor, setSliderColor] = useState('accent-yellow-400  ');

  let { doRequest, errors: apiRequestErrors } = DoRequest({
    url: `/api/Finance/update`,
    method: 'post',
    body: {
      ...state,
      email: currentUser.email,
      username: currentUser.userName,
    },
    onSuccess: () => navigate('/profile'),
  });

  const initData = (data) => {
    for (let dataItem of data) {
      //console.log(dataItem.tag)
      //console.log(!!(initialState as any)[dataItem.tag as string])
      if (initialState.hasOwnProperty(dataItem.tag)) {
        //console.log('dataItem: ' + dataItem.tag);
        dispatch({
          type: 'UPDATE',
          value: dataItem.value,
          key: dataItem.tag,
        });
      }
    }
  };

  const getUserData = async (email) => {
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
    initData(results);
  };

  useEffect(() => {
    getUserData(currentUser.email);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 750);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {}, []);

  const onSubmit = () => {
    /* console.log({
      monthlySalary: state.monthlySalary,
      currency: state.currency,
      phone: state.phone,
      savingsTarget: state.savingsTarget,
    }); */
    //console.log(state.currentSavings);
    doRequest();
  };

  const checkSliderColor = (savingsRate) => {
    if (savingsRate < 50) {
      setSliderColor('accent-emerald-400');
    } else if (savingsRate < 70) {
      setSliderColor('accent-yellow-400');
    } else {
      setSliderColor('accent-red-400');
    }
  };
  const handleSliderChange = (value) => {
    //console.log(value);
    checkSliderColor(value);
    dispatch({ type: 'UPDATE', value: value.toString(), key: 'savingsRate' });
  };
  return (
    <div className='max-w-[calc(900px)] w-[90vw] h-[calc(85vh)] flex mt-14 items-start justify-center z-10'>
      {isLoading && <LoadingCircle />}
      {!isLoading && (
        <div className='h-fit w-[95%] flex flex-col gap-4  bg-white  rounded-md px-8 py-4 text-xl font-bold'>
          <div className='py-4 h-20 flex justify-between font-extrabold'>
            {currentUser.userName} <Formerrors errors={apiRequestErrors} />
          </div>
          <div className='flex flex-col gap-2 text-sm'>
            <label htmlFor='monthlySalary'>Monthly Salary:</label>
            <input
              value={state.monthlySalary}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE',
                  value: e.target.value,
                  key: 'monthlySalary',
                })
              }
              placeholder='monthly income/salary'
              className='input'
            />
          </div>
          <div className='flex flex-col gap-2 text-sm'>
            <label htmlFor='currency'>Currency:</label>
            <select
              value={state.currency}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE',
                  value: e.target.value,
                  key: 'currency',
                })
              }
              className='input hover:cursor-pointer'
            >
              <option value='usd'>USD</option>
              <option value='gbp'>GBP</option>
              <option value='vnd'>VND</option>
            </select>
          </div>
          <div className='flex flex-col gap-2 text-sm'>
            <label htmlFor='phoneNumber'>Phone Number:</label>
            <input
              value={state.phone}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE',
                  value: e.target.value,
                  key: 'phone',
                })
              }
              placeholder='Phone Number'
              className='input'
            />
          </div>
          <div className='flex flex-col gap-2 text-sm'>
            <label htmlFor='savingsTarget'>Savings Target</label>
            <input
              value={state.savingsTarget}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE',
                  value: e.target.value,
                  key: 'savingsTarget',
                })
              }
              placeholder='Savings Target'
              className='input'
            />
          </div>
          <div className='flex flex-col gap-2 text-sm'>
            <label htmlFor='currentSavings'>Current Savings</label>
            <input
              value={state.currentSavings}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE',
                  value: e.target.value,
                  key: 'currentSavings',
                })
              }
              placeholder='Current Savings'
              className='input'
            />
          </div>

          <div className='p-2 border-b border-dashed border-slate-200 flex flex-col gap-2'>
            <span>{`Savings rate: ${state.savingsRate}%`}</span>
            <input
              className={sliderColor}
              type={'range'}
              min={'30'}
              max={'90'}
              step={'10'}
              onChange={(e) => handleSliderChange(+e.target.value)}
              value={state.savingsRate}
            />
          </div>
          <button className='signInButton' onClick={onSubmit}>
            Submit
          </button>
          <button
            className='signInButton bg-red-600 hover:bg-red-800 focus:bg-red-800'
            onClick={() => navigate('/profile')}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;
