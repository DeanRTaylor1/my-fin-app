import { XMarkIcon } from '@heroicons/react/24/solid';
import Logo from '..//Logo';
import { useEffect, useState } from 'react';
import AuthItems from './Auth-Items';
import ProfileItems from './Profile-Items';

const Mobilenav = ({
  authItems,
  navItems,
  scale,
  profileItems,
  mobileNavHandler,
  mobileProfileHandler,
}) => {
  const [mobileStyle, setMobileStyle] = useState(`mobileNav ${scale}`);

  useEffect(() => {
    setMobileStyle(`mobileNav ${scale}`);
  }, [scale]);

  return (
    <div className={mobileStyle}>
      <div className='flex justify-between items-center h-18'>
        <Logo
          color={'text-blue-400'}
          mobileNavHandler={mobileNavHandler}
          mobileProfileHandler={mobileProfileHandler}
        />
        <XMarkIcon
          className='h-6 w-6 hover:cursor-pointer'
          onClick={mobileNavHandler}
        />
      </div>
      <div className='flex flex-col h-h90 justify-between'>
        <div>
          <ul className='xl:hidden flex flex-col gap-2 py-4'>{navItems}</ul>

          <ul className='xl:hidden flex flex-col gap-2 py-4 border-t border-gray-200 border-dashed'>
            <ProfileItems
              mobileNavHandler={mobileNavHandler}
              mobileProfileHandler={mobileProfileHandler}
            />
          </ul>
        </div>
        <ul className='xl:hidden flex justify-center border-t border-gray-200 border-dashed p-4 items-center'>
          <AuthItems mobileNavHandler={mobileNavHandler} />
        </ul>
      </div>
    </div>
  );
};

export default Mobilenav;
