import { Virtual, Autoplay } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';

const responsiveOptons = {
  // when window width is >= 320px
  320: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  // when window width is >= 480px
  480: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
  // when window width is >= 640px
  640: {
    slidesPerView: 3,
    spaceBetween: 40,
  },
  // when window width is >= 800px
  800: {
    slidesPerView: 4,
    spaceBetween: 40,
  },
};
const carouselOptions: SwiperOptions = {
  loop: true,

  modules: [Virtual, Autoplay],
  spaceBetween: 50,
  slidesPerView: 4,
  // autoHeight: true,
  autoplay: {
    delay: 3000,
  },
  breakpointsBase: 'window',

  // virtual:true,
  // Responsive breakpoints
  breakpoints: { ...responsiveOptons },
};

export default carouselOptions;
