import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

const Navbar = () => {
  const Menus = useMemo(
    () => [
      { icon: "home-outline", path: "/" },
      { icon: "trash-outline", path: "/camera" },
      { icon: "gift-outline", path: "/gifts" },
      { icon: "person-outline", path: "/profile" },
    ],
    []
  );

  const location = useLocation();
  const [active, setActive] = useState(0);

  // Update active menu based on the current route
  useEffect(() => {
    const activeIndex = Menus.findIndex(
      (menu) => menu.path === location.pathname
    );
    setActive(activeIndex === -1 ? 0 : activeIndex);
  }, [location, Menus]);

  return (
    <div className="flex justify-center fixed bottom-0 w-full">
      <div className="bg-[rgb(94,133,50)] max-h-[4.4rem] pb-5 rounded-t-xl w-full flex justify-center">
        <ul className="flex relative w-full max-w-screen-lg mx-auto">
          {/* Active indicator circle */}
          <div
            className="absolute bg-gradient-to-r from-[#5E8532] to-[#88C04F] border-4 border-white h-16 w-16 rounded-full"
            style={{
              left: `calc((100% / 4) * ${active} + 12.5%)`,
              transform: "translateX(-50%)", // Only horizontal centering
              bottom: "-0.5rem", // Adjusted for better centering
              transitionProperty: "left",
            }}
          ></div>
          {Menus.map((menu, i) => (
            <li key={i} className="w-1/4 flex justify-center relative">
              <Link to={menu.path} className="flex flex-col text-center pt-5">
                {" "}
                {/* Adjusted padding */}
                <span
                  className={`text-2xl text-white cursor-pointer ${
                    i === active ? "-mt-3" : ""
                  } sm:text-lg md:text-3xl lg:text-4xl`}
                >
                  <ion-icon name={menu.icon}></ion-icon>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
