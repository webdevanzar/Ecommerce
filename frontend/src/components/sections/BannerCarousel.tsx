import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import image1 from "../../assets/images/carousel/image1.png";
import image2 from "../../assets/images/carousel/image2.png";
import mobImage1 from "../../assets/images/carousel/mobimg1.png";
import mobImage2 from "../../assets/images/carousel/mobimg2.png";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type CarouselImagesType = {
  id: string;
  image: string;
};

const PrevArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 left-4 z-10 text-white shadow"
    >
      <IoIosArrowBack size={30} />
    </button>
  );
};

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 right-4 z-10 text-white shadow"
  >
    <IoIosArrowForward size={30} />
  </button>
);

export const BannerCarousel = () => {
  const desktopCarouselImages: CarouselImagesType[] = [
    {
      id: "img1",
      image: image1,
    },
    {
      id: "img2",
      image: image2,
    },
  ];

  const mobileCarouselImages: CarouselImagesType[] = [
    {
      id: "img1",
      image: mobImage1,
    },
    {
      id: "img2",
      image: mobImage2,
    },
  ];

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  return (
    <>
      {/* Desktop Carousel */}
      <div className="hidden lg:block w-full h-[calc(100vh-80px)]">
        <Slider {...settings}>
          {desktopCarouselImages.map((images) => (
            <div key={images.id}>
              <img
                src={images.image}
                alt="Carousel"
                className="w-full h-[calc(100vh-80px)] object-fill"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Mobile Carousel   */}
      <div className="block lg:hidden w-full">
        <Slider {...settings}>
          {mobileCarouselImages.map((images) => (
            <div key={images.id}>
              <img
                src={images.image}
                alt="Carousel"
                className="w-full object-fill"
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};
