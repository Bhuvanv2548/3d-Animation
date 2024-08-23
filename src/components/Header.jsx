import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
// import { brainwaveSymbol } from "../assets";
import Avatar from '@mui/material/Avatar';
import { brainwaveSymbol } from "../assets";
import MenuSvg from "../assets/svg/MenuSvg";
import { navigation } from "../constants";
import Button from "./Button";
import { HamburgerMenu } from "./design/Header";

const Header = () => {
  const [openNavigation, setOpenNavigation] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in based on local storage or some other method
    const userFirstName = localStorage.getItem("userFirstName");
    const userLastName = localStorage.getItem("userLastName");
    const token = localStorage.getItem("userToken");
    if (token && userFirstName && userLastName) {
      setIsLoggedIn(true); // Set to true if user data is present
        }
      }, []);

  const userFirstName = localStorage.getItem("userFirstName");
  const userLastName = localStorage.getItem("userLastName");
  const initials = userFirstName && userLastName 
        ? `${userFirstName.charAt(0)}${userLastName.charAt(0)}` 
        : null;    

  const handleSignInClick = () => {
    navigate('/signin'); 
  };

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  const handleLogout = () => {
    // Perform logout logic here
    localStorage.removeItem("userToken");
    localStorage.removeItem("userFirstName");
    localStorage.removeItem("userLastName");
    setIsLoggedIn(false); // Update state to reflect the logout
    navigate('/sigin'); // Redirect to login page
  };


  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          <img src={brainwaveSymbol} width={100} height={10}/>
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-4xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </a>
            ))}
          </div>

          <HamburgerMenu />
        </nav>

        <a
          href="#signup"
          className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
          onClick={handleSignInClick}
        >
          New account
        </a>
              

        {initials ? (
        <Avatar>{initials}</Avatar>
        ) : (
          <button>Sign In</button>
        )}      
        
        {/* {isLoggedIn ? (
          <div className="relative">
            <Avatar
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="cursor-pointer"
            >
              {initials}
            </Avatar>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Button className="hidden lg:flex" onClick={handleSignInClick}>
            Sign in
          </Button>
        )} */}



        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
