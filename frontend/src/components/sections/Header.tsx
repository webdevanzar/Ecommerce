import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { HiMenuAlt2 } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import { FiPhone } from "react-icons/fi";
import type { IconType } from "react-icons";

import logo from "../../assets/images/navbaricons/logo.svg";

import { SideBar } from "./SideBar";
import { RiLoginCircleLine } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";

type NavItemsType = {
  id: string;
  name: string;
  link?: React.RefObject<HTMLDivElement | null>;
};

type IconSectionType = {
  id: string;
  name: string;
  src: IconType;
  link?: string;
};

type HeaderProps = {
  scrollTo: (ref: React.RefObject<HTMLDivElement | null> | undefined) => void;
  refs: {
    aboutRef: React.RefObject<HTMLDivElement | null>;
    collectionRef: React.RefObject<HTMLDivElement | null>;
    shopRef: React.RefObject<HTMLDivElement | null>;
    contactRef: React.RefObject<HTMLDivElement | null>;
  };
};

export const Header = ({ scrollTo, refs }: HeaderProps) => {
  const navItems: NavItemsType[] = [
    {
      id: "home",
      name: "Home",
    },
    {
      id: "about",
      name: "About",
      link: refs.aboutRef,
    },
    {
      id: "collection",
      name: "Collection",
      link: refs.collectionRef,
    },
    {
      id: "shop",
      name: "Shop",
      link: refs.shopRef,
    },
 
  ];

  const iconSection: IconSectionType[] = [
    {
      id: "locaton",
      name: "Location",
      src: SlLocationPin,
    },
    {
      id: "cart",
      name: "Cart",
      src: FaShoppingCart,
    },
  ];

  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [isShow, setIsShow] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    //TODO: bg-gradient
    <header className="w-full h-16 md:h-20 bg-transparent  flex justify-between px-5 md:p-0 md:justify-around items-center md:border-b-2 text-[#FFFCAD]">
      <div className="w-[15%] sm:w-[20%] md:w-[30%] relative">
        <img
          src={logo}
          alt="Logo"
          className="absolute -top-4 cursor-pointer z-10"
        />
      </div>
      <nav>
        <ul className="md:flex hidden justify-between items-center w-2/3 space-x-16">
          {navItems.map((navitem) => (
            <li
              key={navitem.id}
              onClick={() => navitem.link && scrollTo(navitem.link)}
              className={`text-base cursor-pointer ${
                navitem.id !== "home"
                  ? "cool-link"
                  : "border-b-2 border-[#FFFCAD]"
              }`}
            >
              {navitem.name}
            </li>
          ))}
        </ul>
      </nav>
      <div className="hidden lg:flex items-center space-x-16 min-w-[90px] cursor-pointer pl-16">
        {iconSection.map((Icon) => (
          <Icon.src key={Icon.id} size={20} />
        ))}
        <RiLoginCircleLine size={20} />
      </div>
      <AnimatePresence>
        {isMobile && isShow ? (
          <SideBar
            key="mobile-sidebar"
            onClose={() => setIsShow(false)}
            navItems={navItems}
            scrollTo={scrollTo}
          />
        ) : (
          <div className="flex md:hidden cursor-pointer">
            <HiMenuAlt2
              color="white"
              size={30}
              onClick={() => setIsShow(true)}
            />
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};
