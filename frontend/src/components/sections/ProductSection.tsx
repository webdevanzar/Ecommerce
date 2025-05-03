import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import product4 from "../../assets/images/products/product4.png";
import product5 from "../../assets/images/products/product5.png";
import product6 from "../../assets/images/products/product6.png";
import product7 from "../../assets/images/products/product7.png";
import product8 from "../../assets/images/products/product8.png";
import flower from "../../assets/images/footericons/flower.svg";
import flower2 from "../../assets/images/footericons/flower2.svg";
import cart2Img from "../../assets/images/footericons/cart2.svg";
import img1 from "../../assets/images/products/withbg/img1.png";
import img2 from "../../assets/images/products/withbg/img2.png";
import img3 from "../../assets/images/products/withbg/img3.png";



type ProductType = {
  name: string;
  imagePath: string;
  link?: string;
};

type ServiceDataType = {
  img: string;
  title: string;
  description: string;
};

export const ProductSection = () => {
  const products: ProductType[] = [
    {
      name: "Necklaces",
      imagePath: product4,
    },
    {
      name: "Earings",
      imagePath: product5,
    },
    {
      name: "Rings",
      imagePath: product6,
    },
    {
      name: "Bracelets",
      imagePath: product7,
    },
    {
      name: "Charms",
      imagePath: product8,
    },
  ];

  const servicesData: ServiceDataType[] = [
    {
      img: img1,
      title: "Custom Jewelry",
      description:
        "Our team specializes in designing and crafting complex custom jewelry in gold or platinum. Our 3D designers can work with even the most complex ideas and create a digital model for you to approve before committing to production. ",
    },
    {
      img:img2,
      title: "Engagement Ring",
      description:
        "Our team of 3d modelers and jewelers can create literally any ring you can imagine, including complex designs. We're opening up our services to private clients, so you can get a beautiful, designer quality engagement ring at an affordable price.",
    },
    {
      img: img3,
      title: "Jewelry Manufacturing",
      description:
        "We work with you to make sure your jewelry is produced exactly as your specify and with impeccable standards. We can manufacture a unique collection for your store, or even work with custom orders for your customers. ",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center py-10">
      <section className="w-11/12">
        <h1 className="text-2xl md:text-4xl text-primary text-center pb-7 font-semibold">
          Shop by category
        </h1>

        <div className="flex justify-between overflow-x-auto space-x-2 items-center w-full">
          {products.map((product) => (
            <div
              className="h-80 bg-gradient-to-b from-[#03964D] to-primary hover:from-[#03964D] hover:to-[#03964D] rounded-xl min-w-[85%] sm:min-w-[60%] md:min-w-[50%] lg:min-w-[30%] xl:min-w-[19%] flex-shrink-0"
              key={product.name}
            >
              <div className="flex justify-between items-start p-1 h-1/4">
                <p className="text-[#DFB829] text-2xl font-semibold pl-2">
                  {product.name}
                </p>
                <img src={flower2} alt="Flower" className="w-4 h-4" />
              </div>
              <div className="flex flex-col items-center justify-between h-3/4 pb-5 relative">
                <div>
                  <img src={product.imagePath} alt="Product" />
                </div>
                <div className="flex justify-start space-x-2 bg-transparent border-secondary border-[1px] rounded-[10px] py-[7px] px-[7px] cursor-pointer">
                  <p className="text-secondary text-sm">Check More Products</p>
                  <img src={cart2Img} alt="Cart" />
                  <img
                    src={flower}
                    alt="Flower"
                    className="w-4 h-4 absolute bottom-1 -left-1"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-11/12 pt-10">
        <h1 className="text-2xl md:text-4xl text-primary py-7 font-semibold">
          Our Services
        </h1>

        {/* MOBILE: Carousel */}
        <div className="block md:hidden">
          <Slider
            dots
            infinite
            speed={2000}
            slidesToShow={1}
            slidesToScroll={1}
            autoplay
            autoplaySpeed={3500}
            arrows={false}
          >
            {servicesData.map((item, index) => (
              <div className="p-3" key={index}>
                <div className="flex flex-col items-center justify-center space-y-3">
                  <img
                    src={item.img}
                    alt="Product"
                    className="w-full h-60 object-cover"
                  />
                  <h2 className="text-primary text-center text-base font-bold">
                    {item.title}
                  </h2>
                  <p className="text-sm text-[#004A25CF] text-center h-[120px]">
                    {item.description}
                  </p>
                  <button className="w-full border border-secondary hover:bg-[#B19633] py-2 px-4 text-white font-semibold bg-[#A08626]">
                    Read more
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex md:flex-col md:gap-10 lg:gap-20">
          {servicesData.map((item, index) => (
            <div
              className={`flex items-center justify-between ${
                index % 2 !== 0 ? "flex-row-reverse" : ""
              }`}
              key={index}
            >
              <div
                className={`md:w-[46%]
                   ${index % 2 !== 0 ? "flex justify-end" : ""}`}
              >
                <img src={item.img} alt="Product" />
              </div>
              <div
                className={`md:w-1/2 md:space-y-2 lg:space-y-5 ${
                  index % 2 !== 0 ? "md:pr-5" : "pl-5"
                }`}
              >
                <h2 className="text-primary md:text-start md:font-semibold md:text-xl lg:text-3xl">
                  {item.title}
                </h2>
                <p className="md:text-sm lg:text-xl text-[#004A25CF]">
                  {item.description}
                </p>
                <button className="border-[1px]  md:border-secondary hover:bg-[#B19633] md:rounded-lg md:py-1 lg:py-[7px] px-[10px] text-white text-base font-semibold md:bg-secondary">
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
