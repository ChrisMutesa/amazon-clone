import Banner from '@/components/Banner';
import Products from '@/components/Products';
import { ProductProps } from '../../type';

interface Props {
  productData: ProductProps;
}

export default function Home({ productData }: Props) {
  return (
    <main>
      <div className="max-w-screen-2xl mx-auto">
        <Banner />
        <div className="relative md:-mt-32 lgl:-mt-32 xl:-mt-60 z-20 mb-10">
          <Products productData={productData} />
        </div>
      </div>
    </main>
  );  
}

// SSR (Server Side Rendering)Fetching data
export const getServerSideProps = async () => {
  const response = await fetch('https://fakestoreapiserver.reactbd.com/tech');
  const productData = await response.json();
  return { props: { productData } };
};

// What if main was a div?