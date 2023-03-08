import { useState } from 'react';

import DoRequest from '../../hooks/do-request';
import TagsDropdown from '../Design/tags-dropdown';
import Formerrors from '../Form/Form-Errors';
import Input from '../Form/Input';

const AddItemForm = ({ currentUser, activateModalHandler, getUserRecords }) => {
  //TODO Create Reducer function to handle all the state changes

  const [itemName, setItemName] = useState('');
  const [tag, setTag] = useState('housing');
  const [cost, setCost] = useState('');
  const [currency, setCurrency] = useState('usd');

  const { doRequest, errors } = DoRequest({
    url: `/api/Finance/outgoings`,
    method: 'post',
    body: { email: currentUser.email, item: itemName, tag, cost, currency },
    onSuccess: () => {
      getUserRecords(currentUser.email);
      clearInputs();
    },
  });

  const getItemName = (e) => {
    setItemName(e.currentTarget.value);
  };
  const getTag = (e) => {
    //console.log(tag, e.currentTarget.value);
    setTag(e.currentTarget.value);
  };
  const getCost = (e) => {
    setCost(e.currentTarget.value);
  };
  const getCurrency = (e) => {
    //console.log(e.target.value);
    setCurrency(e.target.value);
  };

  const clearInputs = () => {
    setItemName('');
    setTag('');
    setCost('');
    setCurrency('usd');
    activateModalHandler();
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    doRequest();
  };

  return (
    <div className='z-50 w-screen h-screen fixed -top-36 left-0 bg-transparent flex flex-col items-center justify-center '>
      <div className='h-96 w-72  rounded-md shadow-2xl flex flex-col'>
        <form
          onSubmit={formSubmitHandler}
          className='h-fit w-72 flex flex-col shadow-2xl bg-white  rounded-md px-8 py-4 text-xl font-bold'
        >
          <div className='py-4 h-20 flex justify-between'>
            Add Item <Formerrors errors={errors} />
          </div>
          <div className='flex flex-col gap-8'>
            <Input
              name={'Name:'}
              label={'itemName'}
              type={'text'}
              placeholder={'Item name'}
              getInputs={getItemName}
              value={itemName}
            />
            <TagsDropdown tag={tag} getTag={getTag} />
            <Input
              name={'Cost:'}
              label={'itemCost'}
              type={'text'}
              placeholder={'Item Cost'}
              getInputs={getCost}
              value={cost}
            />
            <div className='flex flex-col gap-2 text-sm'>
              <label htmlFor='currency'>Currency:</label>
              <select
                value={currency}
                onChange={(e) => getCurrency(e)}
                className='input hover:cursor-pointer'
              >
                <option value='usd'>USD</option>
                <option value='gbp'>GBP</option>
                <option value='vnd'>VND</option>
              </select>
            </div>
            <div className='flex gap-2'>
              <button
                className='signInButton w-[calc(50%)] bg-red-400 hover:bg-red-500 focus:bg-red-500'
                onClick={activateModalHandler}
              >
                Cancel
              </button>
              <button className='signInButton w-[calc(50%)]'>Add</button>
            </div>{' '}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemForm;
