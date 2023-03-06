import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <div className='h-fit w-full flex flex-row justify-between p-4 md:px-36 md:max-w-[1200px] items-center'>
      <ul className='flex flex-col gap-4 font-extralight text-sm text-gray-500 h-full text-left justify-end '>
        <li className=''>Copyright MyFin 2022 ©</li>
      </ul>
      <ul className='flex flex-col gap-4 font-extralight text-sm text-gray-500 w-fit text-right '>
        <li className='hover:cursor-pointer hover:underline underline-offset-4 hover:opacity-75'>
          <NavLink to={'/about'}>About us</NavLink>
        </li>

        <li className='hover:cursor-pointer hover:underline underline-offset-4 hover:opacity-75'>
          <NavLink to={'/guide'}>Guide</NavLink>
        </li>

        <li className='hover:cursor-pointer hover:underline underline-offset-4 hover:opacity-75'>
          <NavLink to={'/privacy'}>Privacy Policy</NavLink>
        </li>
      </ul>
    </div>
  );
}
