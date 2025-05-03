import banner from "../../assets/images/bannerimage/banner.svg";
import banner2 from "../../assets/images/bannerimage/banner2.svg";
import product1 from "../../assets/images/products/product1.png";
import product2 from "../../assets/images/products/product2.png";
import product3 from "../../assets/images/products/product3.png";
import flower from "../../assets/images/footericons/flower.svg";
import flower2 from "../../assets/images/footericons/flower2.svg";
import cartImg from "../../assets/images/footericons/cart.svg";

type ProductType = {
  category: string;
  imagePath: string;
  link?: string;
};

type BannerProps = {
  scrollTo: (ref: React.RefObject<HTMLDivElement | null> | undefined) => void;
  ref: React.RefObject<HTMLDivElement | null>;
};

export const BannerSection = ({ scrollTo, ref }: BannerProps) => {
  const Products: ProductType[] = [
    {
      category: "Diamond",
      imagePath: product1,
    },
    {
      category: "Antique",
      imagePath: product2,
    },
    {
      category: "Traditional",
      imagePath: product3,
    },
  ];

  return (
    <main className="bg-transparent xl:h-[calc(100vh-80px)] flex flex-col w-full">
      <div className="md:h-3/4  h-[50vh] flex justify-center md:justify-between items-start m-auto w-[90%] md:w-[85%] pt-7 relative">
        <div className="flex flex-col pt-20 gap-y-20">
          <p className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold md:font-medium text-secondary w-[150px] sm:w-[300px] md:w-[350px] lg:w-auto">
            Where elegance <br />
            <span className="pl-4 md:ml-20">meets eternity</span>
          </p>
          <div className="absolute md:static bottom-7 left-1/2 md:left-auto transform -translate-x-1/2 md:transform-none w-[90%] flex justify-between md:justify-start items-center px-4 py-2">
            <button className="border-[1px] font-semibold border-secondary hover:bg-[#B19633] rounded-lg py-4 px-7 md:py-[10px] md:px-[18.5px] text-white text-base bg-secondary">
              Explore
            </button>
            <button
              onClick={() => scrollTo(ref)}
              className="border-[1px] font-semibold border-secondary rounded-lg py-4 px-6 md:py-[10px] md:px-[18.5px] text-secondary text-base md:ml-5 hover:text-white "
            >
              About Us
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <img src={banner} alt="Banner" className="w-[85%] hidden md:block" />

          <img src={banner2} alt="Banner" className="w-full block md:hidden" />
        </div>
      </div>

      <div className="xl:bg-white section-bg-mobile xl:h-1/4 w-full relative p-2">
        <div className="lg:w-5/6 xl:5/6 md:3/4 w-[90%] h-auto m-auto flex flex-col md:flex-row lg:flex:row xl:flex-row justify-center xl:absolute xl:top-5 xl:left-1/2 xl:transform xl:-translate-x-1/2 xl:-translate-y-1/2 gap-5">
          {Products.map((product) => (
            <div
              className="bg-gradient-to-b from-[#CFB34C] to-[#765D03] rounded-xl h-[320px] md:h-[280px] lg:h-[300px] w-full xl:w-[32%] flex justify-between p-1"
              key={product.category}
            >
              <div className="flex flex-col justify-between items-start w-1/5">
                <p className="text-base text-primary">
                  categories <br />
                  <span className="text-xl"> {product.category} </span>
                </p>
                <img src={flower} alt="Flower" className="w-12 h-12" />
              </div>
              <div className="flex flex-col w-full md:w-full justify-between items-center xl:w-3/5 py-3">
                <div className="mt-4 sm:w-[70%] w-[80%] md:w-auto flex justify-center h-2/3 pt-10 md:pt-7">
                  <img
                    src={product.imagePath}
                    alt="Product"
                    className="transition-transform duration-500 ease-in-out hover:scale-110 cursor-pointer object-contain"
                  />
                </div>
                <div className="md:w-full w-auto lg:w-auto flex justify-center space-x-5 lg:space-x-4 xl:space-x-2 md:space-x-3 bg-primary rounded-xl md:rounded-lg xl:rounded-xl py-2 px-2 md:px-[2px] xl:px-2 cursor-pointer">
                  <p className="text-white lg:text-base text-sm">
                    Check Products
                  </p>
                  <img src={cartImg} alt="Cart" />
                </div>
              </div>
              <div className="flex flex-col justify-between items-end w-1/5">
                <img src={flower2} alt="Flower" className="w-11 h-11 md:w-8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
