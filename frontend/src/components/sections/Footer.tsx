import { FiPhone } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { TfiFacebook } from "react-icons/tfi";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandWhatsapp } from "react-icons/tb";
import { CgCopyright } from "react-icons/cg";

import logo2 from "../../assets/images/navbaricons/logo2.svg";
import React from "react";

type FooterProps = {
  scrollTo: (ref: React.RefObject<HTMLDivElement | null> | undefined) => void;
  ref: React.RefObject<HTMLDivElement | null>;
};

export const Footer = ({ scrollTo, ref }: FooterProps) => {
  const iconClass = "bg-[#018844] p-1 rounded-full text-white";

  return (
    <footer className="w-full h-auto md:h-72 p-5 md:p-10 bg-gradient-to-b from-[#04381E] to-[#088D4A] text-white ">
      <div className="flex flex-col sm:flex-row justify-between h-5/6 md:px-10">
        <div className="flex flex-col md:flex-row justify-around  md:w-1/2 md:relative">
          <div className="flex justify-center">
            <img
              src={logo2}
              alt="Logo"
              className="md:absolute left-0 top-0 cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-y-2 pt-5 pb-3 md:pt-0 md:gap-y-0 ">
            <h3 className="text-lg md:text-base cursor-pointer">Contact Us</h3>
            <a
              href="tel:0483 2760 916"
              className="flex gap-x-2 md:justify-between mt-0 md:mt-6 cursor-pointer"
            >
              <FiPhone
                style={{ boxShadow: "0px 4px 8px rgba(0,0,0,0.3)" }}
                className={iconClass}
                size={25}
              />
              <p className="text-sm md:text-xs">0483 2760 916</p>
            </a>
            <a
              href="https://wa.me/919495434916"
              target="_blank"
              className="flex gap-x-2 md:justify-between md:mt-5 cursor-pointer"
            >
              <TbBrandWhatsapp
                style={{
                  boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
                  paddingBottom: "4px",
                  paddingLeft: "4px",
                  padding: "2px",
                }}
                className={iconClass}
                size={26}
              />
              <p className="text-sm md:text-xs">+91 9495434916</p>
            </a>
          </div>

          <div className="flex sm:hidden h-[1px] justify-center items-end bg-[#9B9B9B] w-[99%] md:w-[95%] m-auto mt-1"></div>
        </div>
        <div className="flex md:flex-row flex-col justify-start md:justify-around  md:w-1/2">
          <div className="pt-4 sm:pt-0 pb-3 md:pb-0">
            <h3
              className="text-lg md:text-base cursor-pointer"
              onClick={() => scrollTo(ref)}
            >
              About us
            </h3>
            <p className="text-sm md:text-xs mt-3 md:mt-6 cursor-pointer">
              Blog
            </p>
            <p className="text-sm md:text-xs mt-3 md:mt-5 cursor-pointer">
              About ozmia
            </p>
          </div>
          <div className="flex sm:hidden h-[1px] justify-center items-end bg-[#9B9B9B] w-[99%] md:w-[95%] m-auto"></div>
          <div className="pt-5 md:pt-0 pb-3 md:pb-0">
            <h3 className="text-lg sm:text-base cursor-pointer">Follow us</h3>
            <div className="flex sm:justify-between gap-x-2 items-center mt-1 md:mt-6 cursor-pointer pb-2 sm:pb-0">
              <a
                href="https://www.instagram.com/ozmiagold?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
              >
                <FaInstagram
                  style={{ boxShadow: "0px 4px 8px rgba(0,0,0,0.3)" }}
                  className={iconClass}
                  size={30}
                />
              </a>
              <a
                href="https://www.facebook.com/p/OZMIA-Gold-Diamonds-61557281631715/"
                target="_blank"
              >
                <TfiFacebook
                  style={{ boxShadow: "0px 4px 8px rgba(0,0,0,0.3)" }}
                  className={iconClass}
                  size={30}
                />
              </a>
              <RiTwitterXLine
                style={{ boxShadow: "0px 4px 8px rgba(0,0,0,0.3)" }}
                className={iconClass}
                size={30}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1px] justify-center items-end bg-[#9B9B9B] w-[99%] md:w-[95%] m-auto"></div>
      <div className="flex justify-between items-center h-1/6 w-[95%] m-auto text-white pt-7">
        <p className="text-[9px] md:text-xs cursor-pointer">Privacy Policy</p>
        <div className="flex m-auto justify-between items-center cursor-pointer">
          <CgCopyright />
          <p className="text-xs">OZMIA JEWELLRY</p>
        </div>
        <p className="text-[9px] md:text-xs cursor-pointer">
          Terms & conditions
        </p>
      </div>
    </footer>
  );
};
