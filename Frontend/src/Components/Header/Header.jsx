import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";
import { useSelector } from "react-redux";
import { dark, light } from "../../Utils/themes";
import { CLIENT_DOMAIN } from "../../Utils/constants";

function Header() {
  const [query, setQuery] = useState("");
  const [toggleTheme, setToggleTheme] = useState({
    bgColor: light.bgColor,
    textColor: light.textColor,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useSelector((store) => store.toggler.theme);

  useEffect(() => {
    setToggleTheme(theme === "l" ? light : dark);
  }, [theme]);

  const bgColor = toggleTheme.bgColor;
  const textColor = toggleTheme.textColor;

  const handleSearch = () => {
    if (query.trim() !== "") {
      console.log("Searching for:", query);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 bg-opacity-50 z-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <header
        className={`fixed top-0 left-0 w-full h-16 ${`${bgColor?.color1} ${textColor?.color1}`} shadow-md px-4 sm:px-8 py-3 z-40 flex items-center justify-between transition-colors duration-300`}
      >
        {/* Logo */}
        <a href={CLIENT_DOMAIN} className="text-xl sm:text-2xl font-bold text-emerald-500 tracking-wide">
          nova<span className={`${textColor?.color1}`}>Mart</span>
        </a>

        {/* Search Bar */}
        <div className="flex-grow mx-4 max-w-md">
          <div
            className={`flex items-center ${bgColor?.color2} rounded-full px-3 py-1 w-full`}
          >
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`bg-transparent outline-none ${textColor?.color1} placeholder-gray-400 px-3 py-1 w-full text-sm`}
            />
            <button
              onClick={handleSearch}
              className="hover:text-emerald-500 transition-colors"
            >
              <IoSearch className="text-xl" />
            </button>
          </div>
        </div>

        {/* Desktop Nav + Hamburger */}
        <DesktopNavbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          bgColor={bgColor}
          textColor={textColor}
          theme={theme}
        />
      </header>

      {/* Mobile Sidebar */}
      <MobileNavbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        bgColor={bgColor}
        textColor={textColor}
        theme={theme}
      />
    </>
  );
}

export default Header;
