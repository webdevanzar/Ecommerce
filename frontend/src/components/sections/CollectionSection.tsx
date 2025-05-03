import img4 from "../../assets/images/products/withbg/img4.png";
import img5 from "../../assets/images/products/withbg/img5.png";
import img6 from "../../assets/images/products/withbg/img6.png";
import img7 from "../../assets/images/products/withbg/img7.png";
import img8 from "../../assets/images/products/withbg/img8.png";
import img9 from "../../assets/images/products/withbg/img9.png";

type ProductType = {
  name: string;
  imagePath: string;
  link?: string;
};

export const CollectionSection = () => {
  const featuredProducts: ProductType[] = [
    {
      name: "Traditional Collection",
      imagePath: img4,
    },
    {
      name: "Kuwaiti Collections",
      imagePath: img5,
    },
    {
      name: "Turkish Collections",
      imagePath: img6,
    },
    {
      name: "Italian Silver Collections",
      imagePath: img7,
    },
    {
      name: "Kids Collections",
      imagePath: img8,
    },
    {
      name: "Watch Collections",
      imagePath: img9,
    },
  ];
  return (
    <section className="w-11/12 flex flex-col justify-start m-auto py-10">
      <h1 className="text-2xl text-center md:text-start md:text-4xl text-primary py-7 font-semibold">
        Featured Products
      </h1>

      <div className="flex 2xl:flex-wrap overflow-x-auto 2xl:overflow-hidden gap-5 2xl:gap-x-16 2xl:gap-y-10 justify-start items-end">
        {featuredProducts.map((product, index) => (
          <div
            className="relative  min-w-[100%] sm:min-w-[60%] md:min-w-[50%] lg:min-w-[30%] xl:min-w-[19%] overflow-hidden"
            key={product.name}
          >
            <p className="text-xl md:text-2xl font-light absolute text-white left-28 md:left-20 w-full z-10">
              {product.name}
            </p>
            <img
              src={product.imagePath}
              alt="Product"
              className={`object-cover transition-transform duration-500 ease-in-out hover:scale-105 ${
                index % 2 === 0 ? "origin-left" : "origin-right"
              }`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
