import image1 from "../../assets/images/jwellerybackgrounds/image1.png";
import image2 from "../../assets/images/jwellerybackgrounds/image2.png";
import image3 from "../../assets/images/jwellerybackgrounds/image3.png";
import image4 from "../../assets/images/jwellerybackgrounds/image4.png";
import image5 from "../../assets/images/jwellerybackgrounds/image5.png";
import image6 from "../../assets/images/jwellerybackgrounds/image6.png";

type JwelleryBackgroundType = {
  name: string;
  imagePath: string;
};

export const HistorySection = () => {
  const jwelleryBackgrounds: JwelleryBackgroundType[] = [
    {
      name: "Wedding",
      imagePath: image1,
    },
    {
      name: "New Born",
      imagePath: image2,
    },
    {
      name: "Engagement",
      imagePath: image3,
    },
    {
      name: "Anniversary",
      imagePath: image4,
    },
    {
      name: "Birthday",
      imagePath: image5,
    },
    {
      name: "Graduation",
      imagePath: image6,
    },
  ];

  return (
    <section className="w-11/12 py-5 lg:py-10 m-auto">
      <div className="lg:flex justify-between items-start w-full">
        <div className="w-full lg:w-1/3 flex flex-col lg:gap-y-10 lg:pt-5">
          <h2 className="text-primary text-xl xl:text-[32px] font-semibold leading-snug tracking-[1px]">
            Jewelry that speaks the language of love,	&nbsp; 
            <span className="hidden xl:inline">
              <br />
            </span>
             milestones,&nbsp;
            <span className="hidden xl:inline">
              <br />
            </span>
            and memories
          </h2>
          <p className="text-primary text-[15px] xl:text-2xl w-full py-3 lg:py-0">
            Surprise your beloved with a
            <span className="hidden xl:inline">
              <br />
            </span>
            timeless token of love
          </p>
        </div>
        <div className="flex overflow-x-auto  xl:flex-wrap justify-between items-center gap-x-3 gap-y-10 lg:w-2/3 w-full pb-3">
          {jwelleryBackgrounds.map((background) => (
            <div
              className="rounded-lg shadow-[0px_4px_4px_0px_#00000040] flex flex-col justify-start min-w-[48%] sm:min-w-[49%] md:min-w-[49%] lg:min-w-[49%] xl:min-w-[32%] 2xl:min-w-[32%]"
              key={background.name}
            >
              <img
                src={background.imagePath}
                alt="Jwellery Background"
                className="object-cover"
              />
              <h2 className="text-black text-sm md:text-xl font-medium p-1 text-left">
                {background.name}
              </h2>
              <div className="flex justify-center p-4 lg:pt-4">
                <button className="text-primary text-sm font-semibold px-1 md:px-2  2xl:px-5 py-[4px] border-[2px] border-primary rounded-lg w-2/3 hover:font-bold">
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
