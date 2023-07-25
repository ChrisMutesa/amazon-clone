import { ReactElement } from 'react';
import Footer from './Footer';
import BottomHeader from './header/BottomHeader';
import Header from './header/Header';

interface Props {
  children: ReactElement;
}

function RootLayout({ children }: Props) {
  return (
    <div>
      <Header />
      <BottomHeader />
      {children}
      <Footer />
    </div>
  );
}

export default RootLayout;

// To be revised