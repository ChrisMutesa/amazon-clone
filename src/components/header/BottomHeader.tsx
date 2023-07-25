import { LuMenu } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { StateProps } from '../../../type';
import { useSession, signIn, signOut } from 'next-auth/react';
import { removeUser } from '@/store/nextSlice';

function BottomHeader() {
  const { userInfo } = useSelector((state: StateProps) => state.next);

  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(removeUser());
    signOut();
  };

  return (
    <div className="w-full h-10 bg-amazon_light text-sm text-white px-4 flex items-center">
      <p className="flex items-center gap-1 h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        <LuMenu
          className="text-xl"
          // size='15'
        />{' '}
        All
      </p>
      <p className="hidden md:flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Today's Deals
      </p>
      <p className="hidden md:flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Customer Service
      </p>
      <p className="hidden md:flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Registry
      </p>
      <p className="hidden md:flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Gifts Cards
      </p>
      <p className="hidden md:flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer duration-300">
        Sell
      </p>
      {userInfo && (
        <button
          onClick={handleSignOut}
          className="flex items-center h-8 px-2 border border-transparent hover:border-yellow-600 text-amazon_yellow  cursor-pointer duration-300 hover:scale-105"
        >
          Sign Out
        </button>
      )}
    </div>
  );
}

export default BottomHeader;
