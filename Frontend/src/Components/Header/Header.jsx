import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";

function Header() {
  const [query, setQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
          className="fixed inset-0 bg-black/60 bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <header className="fixed top-0 left-0 w-full h-16 bg-white text-gray-900 dark:text-white shadow-md px-4 sm:px-8 py-3 z-50 flex items-center justify-between transition-colors duration-300">
        {/* Logo */}
        <div className="text-xl sm:text-2xl font-bold text-emerald-500 tracking-wide">
          nova<span className="dark:text-white text-gray-900">Mart</span>
        </div>

        {/* Search Bar */}
        <div className="flex-grow mx-4 max-w-md">
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent outline-none px-3 py-1 w-full text-sm dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
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
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </header>

      {/* Mobile Sidebar */}
      <MobileNavbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </>
  );
}

export default Header;