import Image from 'next/image';
import logo from '../images/logo.png';
import { SiYoutubegaming } from 'react-icons/si';
function Footer() {
  return (
    <div className="w-full h-20 bg-amazon_light text-gray-300 flex items-center justify-center gap-4 ">
      <Image src={logo} alt="logo" className="w-24 mt-4" />
      <p>
        All rights reserved{' '}
        <a
          href="https://reactbd.com target='_blank'"
          className="hover:text-gray-100 hover:underline decoration-[1xp]"
        >
          @reactbd.com
        </a>
      </p>
    </div>
  );
}

export default Footer;



