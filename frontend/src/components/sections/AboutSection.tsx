import aboutImg from "../../assets/images/bannerimage/about.svg";

export const AboutSection = () => {
  return (
    <section className="w-11/12 py-7 m-auto">
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="w-[75%] pb-5 md:w-1/2 flex flex-col items-center justify-center">
          <h1 className="text-primary text-2xl md:text-[40px] font-semibold">
            About Us
          </h1>
          <p className="hidden lg:block text-[#4A7D5D] text-xl text-center p-3">
            At Ozmia Gold & Diamonds, tradition meets timeless elegance. Rooted
            in South India’s rich cultural heritage, we specialize in
            handcrafted temple and antique-style jewelry that celebrates the
            grandeur of the past with a touch of modern sophistication. Our
            collections are inspired by the intricate artistry of Chettinad
            temple designs, reflecting a deep respect for craftsmanship,
            heritage, and quality. Every piece is a work of art—meticulously
            designed, ethically sourced, and made to be treasured for
            generations. Whether you're seeking a statement heirloom or a
            contemporary classic, Ozmia Gold & Diamonds offers jewelry that
            tells a story of beauty, legacy, and devotion.
          </p>
          <p className="block lg:hidden text-[#4A7D5D] text-xl text-center p-3">
            Ozmia Gold & Diamonds brings you handcrafted temple and
            antique-style jewelry inspired by South India's rich traditions.
            Each piece is a blend of heritage, artistry, and modern
            sophistication—made to be cherished for generations.
          </p>
        </div>
        <div className="w-[75%] md:w-1/2">
          <img src={aboutImg} alt="AboutImage" className="object-fit" />
        </div>
      </div>
    </section>
  );
};
