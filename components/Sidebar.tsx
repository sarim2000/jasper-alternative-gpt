import React, { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export interface SidebarItem {
  label: string;
  url: string;
  target?: string;
}

interface Props {
  items: SidebarItem[];
  onShowPopup: () => void;
}

const Sidebar: React.FC<Props> = ({ items, onShowPopup }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };
  const isActive = (url: string): boolean => {
    return router.pathname === url;
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="
                z-50
                w-10 h-10 fixed top-4 left-4 z-10 md:hidden bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={toggleSidebar}
      >
        <i className={`fas fa-${isOpen ? "times" : "bars"} text-primary`} />
      </button>
      <aside
        className={`bg-white min-h-screen min-h-screen flex flex-col border-r border-gray-200 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static fixed top-0 left-0 h-full md:min-h-0 md:relative md:w-60 overflow-y-hidden`}
      >
        <div
          className="w-60 flex flex-col items-center justify-center p-4 hover:cursor-pointer"
          onClick={handleClick}
        >
          <div className="flex flex-col">
            <Image
              src={"/images/Jemaai-logo.png"}
              alt="Jema.ai"
              width="250"
              height="100"
            />
            <h1 className="text-lg font-normal text-gray-700 text-center">
              Open Source{" "}
            </h1>
            <h1 className="text-lg font-semibold text-gray-700  text-center">
              Jasper <i className="fas fa-arrow-right text-primary" />{" "}
              alternative
            </h1>
          </div>
        </div>

        <nav className="flex-1">
          <ul className="py-4">
            <li className="mb-10">
              <div className="flex flex-row align-middle justify-center"></div>
            </li>
            {items.map((item, index) => (
              <Fragment key={index}>
                <li className="mb-2 ml-8">
                  <a
                    target={item?.target === "blank" ? "_blank" : ""}
                    href={item.url}
                    className={`text-gray-500 hover:text-gray-700 transition duration-300 ${
                      isActive(item.url) ? "text-primary" : ""
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              </Fragment>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
