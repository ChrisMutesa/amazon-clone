import Image from 'next/image';
import logo from '../../images/logo.png';
import cartIcon from '../../images/cartIcon.png';
import { SlLocationPin } from 'react-icons/sl';
import { HiOutlineSearch } from 'react-icons/hi';
import { BiCaretDown } from 'react-icons/bi';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { StateProps } from '../../../type';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { addUser } from '@/store/nextSlice';
import { useState } from 'react';
import { StoreProduct } from '../../../type';
import SearchProducts from '../SearchProducts';

function Header() {
  const { productData, favoriteData, userInfo, allProducts } = useSelector(
    (state: StateProps) => state.next
  );

  const { data: session, status } = useSession();
  // console.log(session)
  const dispatch = useDispatch();

  const [allData, setAllData] = useState([]);

  useEffect(() => {
    setAllData(allProducts.allProducts);
  }, [allProducts]);

  useEffect(() => {
    if (session) {
      dispatch(
        addUser({
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
        })
      );
    }
  }, [session]);

  // Search area
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filtered = allData.filter((item: StoreProduct) =>
      item.title.toLocaleLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  return (
    <div className="w-full h-20 bg-amazon_blue text-lightText sticky top-0 z-50">
      <div className="h-full w-full mx-auto flex items-center justify-between gap-1 mdl:gap-3 px-4">
        {/* logo */}
        <Link
          href="/"
          className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex items-center justify-center h-[70%]"
        >
          <Image src={logo} alt="" className="w-28 object-cover mt-1" />
        </Link>

        {/* delivery */}
        <div className="px-2 border border-transparent hover:border-white cursor-pointer duration-300  items-center justify-center h-[70%] hidden lg:flex gap-1">
          <SlLocationPin />
          <div>
            <p>Deliver to </p>
            <p className="uppercase text-white font-bold">AUSTRIA</p>
          </div>
        </div>

        {/* search bar */}
        <div className="flex-1 h-10 hidden md:flex items-center justify-between relative">
          {/* ?? justify-between*/}
          <input
            onChange={handleSearch}
            value={searchQuery}
            type="text"
            placeholder="Search Amazon Austria"
            className="w-full h-full rounded-md px-2 placeholder:text-sm text-base text-black border-[3px] border-transparent outline-none focus-visible:border-amazon_yellow "
          />
          <span className="w-12 h-full bg-amazon_yellow text-black flex items-center justify-center text-2xl absolute right-0 rounded-tr-md rounded-br-md">
            <HiOutlineSearch />
          </span>

          {/* ========== Searchfield ========== */}
          {searchQuery && (
            <div className="absolute left-0 top-12 w-full mx-auto max-h-96 bg-gray-200 rounded-lg overflow-y-scroll cursor-pointer text-black">
              {filteredProducts.length > 0 ? (
                <>
                  {searchQuery &&
                    filteredProducts.map((item: StoreProduct) => (
                      <Link
                        key={item._id}
                        className="w-full border-b-[1px] border-b-gray-400 flex items-center gap-4"
                        href={{
                          pathname: `${item._id}`,
                          query: {
                            _id: item._id,
                            brand: item.brand,
                            category: item.category,
                            description: item.description,
                            image: item.image,
                            isNew: item.isNew,
                            oldPrice: item.oldPrice,
                            price: item.price,
                            title: item.title,
                          },
                        }}
                        onClick={() => setSearchQuery('')}
                      >
                        <SearchProducts item={item} />
                      </Link>
                    ))}
                </>
              ) : (
                <div className="bg-gray-50 flex items-center justify-center py-10 rounded-lg shadow-lg">
                  <p className="text-xl font-semibold animate-bounce">
                    Nothing is matching with your search keywords. Please try
                    again!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* sign in */}
        {userInfo ? (
          <div className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] gap-1">
            <img
              src={userInfo.image}
              alt="userImage"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="text-xs text-gray-100 flex flex-col justify-between">
              <p className="text-white font-bold">{userInfo.name}</p>
              <p>{userInfo.email}</p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => signIn()}
            className="text-xs text-gray-100 px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex flex-col items-center justify-center h-[70%]"
          >
            <p>Hello, Sign In</p>
            <p className="text-white font-bold flex items-center">
              Accounts & Lists{' '}
              <span>
                <BiCaretDown />
              </span>
            </p>
          </div>
        )}

        {/* favorite */}
        <Link
          href="/favorite"
          className="relative text-xs text-gray-100 px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex flex-col items-center justify-center h-[70%]"
        >
          <p>Marked</p>
          <p className="text-white font-bold">& Favorite</p>

          {favoriteData.length > 0 && (
            <span className="absolute text-amazon_yellow text-xs top-6  md:top-[10px] md:right-[5px] font-semibold">
              {favoriteData.length}
            </span>
          )}
        </Link>
        {/* cart */}
        <Link
          href="/cart"
          className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%]"
        >
          <Image
            src={cartIcon}
            alt="cartImg"
            className="w-auto object-cover h-8 "
          />
          <p className="text-xs text-white font-bold mt-3">Cart</p>
          <span className="absolute text-amazon_yellow text-xs top-6 right-[46px] md:top-6 md:right-[67px] font-semibold">
            {productData ? productData.length : 0}
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Header;

// 1. inline flex why
// 2. is h-70% really working?
// 3. Note: focus visible in input instead of hover effect
// 4. Note : react icons are like texts when using classes effects

// 5. Checkout page
