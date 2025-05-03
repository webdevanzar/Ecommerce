import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import man1 from "../../assets/images/peoples/man1.svg";
import man2 from "../../assets/images/peoples/man2.svg";
import man3 from "../../assets/images/peoples/man3.svg";
import man4 from "../../assets/images/peoples/man4.svg";
import man5 from "../../assets/images/peoples/man5.svg";
import man6 from "../../assets/images/peoples/man6.svg";

type FeedBackType = {
  stars?: number;
  date: string;
  feedback: string;
  imagePath: string;
  name: string;
};

export const FeedbackSection = () => {
  const Feedbacks: FeedBackType[] = [
    {
      date: "Feb 2024",
      feedback:
        "Lorem ipsum dolor sit amet consectetur. Amet a adipiscing eget a felis. Vitae faucibus mauris bibendum cras vel sed phasellus at. Purus blandit arcu magna nisi mattis mattis tortor. Sit duis nulla egestas elit morbi ac nisl. Felis eget.",
      imagePath: man1,
      name: "Cooper",
    },
    {
      date: "Feb 2024",
      feedback:
        "Lorem ipsum dolor sit amet consectetur. Amet a adipiscing eget a felis. Vitae faucibus mauris bibendum cras vel sed phasellus at. Purus blandit arcu magna nisi mattis mattis tortor. Sit duis nulla egestas elit morbi ac nisl. Felis eget.",
      imagePath: man2,
      name: "Kierra",
    },
    {
      date: "Feb 2024",
      feedback:
        "Lorem ipsum dolor sit amet consectetur. Amet a adipiscing eget a felis. Vitae faucibus mauris bibendum cras vel sed phasellus at. Purus blandit arcu magna nisi mattis mattis tortor. Sit duis nulla egestas elit morbi ac nisl. Felis eget.",
      imagePath: man3,
      name: "Skylar",
    },
    {
      date: "Feb 2024",
      feedback:
        "Lorem ipsum dolor sit amet consectetur. Amet a adipiscing eget a felis. Vitae faucibus mauris bibendum cras vel sed phasellus at. Purus blandit arcu magna nisi mattis mattis tortor. Sit duis nulla egestas elit morbi ac nisl. Felis eget.",
      imagePath: man4,
      name: "Ahmad",
    },
    {
      date: "Feb 2024",
      feedback:
        "Lorem ipsum dolor sit amet consectetur. Amet a adipiscing eget a felis. Vitae faucibus mauris bibendum cras vel sed phasellus at. Purus blandit arcu magna nisi mattis mattis tortor. Sit duis nulla egestas elit morbi ac nisl. Felis eget.",
      imagePath: man5,
      name: "Paityn",
    },
    {
      date: "Feb 2024",
      feedback:
        "Lorem ipsum dolor sit amet consectetur. Amet a adipiscing eget a felis. Vitae faucibus mauris bibendum cras vel sed phasellus at. Purus blandit arcu magna nisi mattis mattis tortor. Sit duis nulla egestas elit morbi ac nisl. Felis eget.",
      imagePath: man1,
      name: "Cooper",
    },
    {
      date: "Feb 2024",
      feedback:
        "Lorem ipsum dolor sit amet consectetur. Amet a adipiscing eget a felis. Vitae faucibus mauris bibendum cras vel sed phasellus at. Purus blandit arcu magna nisi mattis mattis tortor. Sit duis nulla egestas elit morbi ac nisl. Felis eget.",
      imagePath: man6,
      name: "Zain",
    },
    {
      date: "Feb 2024",
      feedback:
        "Lorem ipsum dolor sit amet consectetur. Amet a adipiscing eget a felis. Vitae faucibus mauris bibendum cras vel sed phasellus at. Purus blandit arcu magna nisi mattis mattis tortor. Sit duis nulla egestas elit morbi ac nisl. Felis eget.",
      imagePath: man4,
      name: "Jaylon",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    responsive: [
      {
        breakpoint: 768, // below md
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // md and above
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-gradient-to-b from-primary to-[#088D4A] flex flex-col space-y-5 justify-center items-center py-7">
      <h1 className="text-secondary text-2xl md:text-[40px] text-center font-semibold">
        Hear From Our Happy customers
      </h1>

      {/* Mobile: Carousel */}
      <div className="block lg:hidden w-10/12">
        <Slider {...settings}>
          {Feedbacks.map((feedback, index) => (
            <div key={index} className="px-1">
              <div className="bg-gradient-to-b from-[#58D395BD] to-[#339A67A1] rounded-xl h-48 px-4 py-1 flex flex-col justify-center">
                <div className="flex justify-start gap-x-5 items-center">
                  <div className="flex text-[#DDFF1D] text-base">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>&#9733;</span>
                    ))}
                  </div>
                  <p className="text-[10px] text-[#C2C2C2B8] font-medium ">
                    {feedback.date}
                  </p>
                </div>
                <p className="text-white text-xs font-medium mt-2 mb-2 pt-4">
                  {feedback.feedback}
                </p>
                <div className="flex items-center gap-x-5 pt-5">
                  <img
                    src={feedback.imagePath}
                    alt="People"
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="text-white text-sm font-medium">
                    {feedback.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="hidden lg:flex flex-wrap justify-center gap-2 items-end">
        {Feedbacks.map((feedback) => (
          <div
            className="bg-gradient-to-b from-[#58D395BD] to-[#339A67A1] rounded-xl h-40 w-[23%] lg:px-2 xl:px-4 py-1"
            key={feedback.name}
          >
            <div className="flex justify-start items-start gap-x-3 h-1/4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={`text-base text-[#DDFF1D]`}>
                    &#9733;
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-[#C2C2C2B8] font-medium pt-1">
                {feedback.date}
              </p>
            </div>
            <div className="h-2/4 flex justify-center items-center w-[95%] m-auto">
              <p className="text-white text-[10px] font-medium">
                {feedback.feedback}
              </p>
            </div>
            <div className="flex justify-start space-x-5 items-center h-1/4">
              <img src={feedback.imagePath} alt="People" />
              <p className="text-white text-xs font-medium">
                {" "}
                {feedback.name}{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
