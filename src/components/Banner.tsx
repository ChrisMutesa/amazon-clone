import Image from 'next/image';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import sliderImg1 from '../images/slider/sliderImg_1.jpg';
import sliderImg2 from '../images/slider/sliderImg_2.jpg';
import sliderImg3 from '../images/slider/sliderImg_3.jpg';

function Banner() {
  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={3000}
      >
        <div>
          <Image priority src={sliderImg1} alt="slider1" />
        </div>
        <div>
          <Image src={sliderImg2} alt="slider1" />
        </div>
        <div>
          <Image src={sliderImg3} alt="slider1" />
        </div>
        {/* Gradient color */}
      </Carousel>
      <div className="w-full h-40 bg-gradient-to-t from-gray-200 to-transparent absolute z-20 bottom-0"></div>
    </div>
  );
}

export default Banner;

// Autoplay
// show thumbs, interesting
// bg gradient to something
