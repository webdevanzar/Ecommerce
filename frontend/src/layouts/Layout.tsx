import { Outlet } from "react-router-dom";
import { Footer } from "../components/sections/Footer";
import { useRef } from "react";
import { BannerSection } from "../components/sections/BannerSection";
import { BannerCarousel } from "../components/sections/BannerCarousel";
import { Header } from "../components/sections/Header";

export const Layout = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const collectionRef = useRef<HTMLDivElement>(null);
  const shopRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollTo = (
    ref: React.RefObject<HTMLDivElement | null> | undefined
  ) => {
    if (!ref?.current) return;
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="overflow-x-hidden">
      <div className="bg-[linear-gradient(296.61deg,_#00CF67_13.41%,_#009C4E_29.39%,_#008542_54.49%,_#006131_68.42%,_#004A25_99.14%)]">
        <Header
          scrollTo={scrollTo}
          refs={{ aboutRef, collectionRef, shopRef, contactRef }}
        />
        <BannerCarousel />
        <BannerSection scrollTo={scrollTo} ref={aboutRef} />
      </div>
      <Outlet context={{ refs: { aboutRef, collectionRef, shopRef } }} />
      <div ref={contactRef}>
        <Footer scrollTo={scrollTo} ref={aboutRef} />
      </div> 
    </div>
  );
};
