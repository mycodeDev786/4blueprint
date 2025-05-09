import { useState, useEffect, useRef } from "react";

export const Header = ({
  category,
  subCategory,
  tabs,
  onTabChange,
  onCountryClick,
  onSortClick,
  onFilterClick,
}) => {
  const [activeTab, setActiveTab] = useState(subCategory);
  const tabContainerRef = useRef(null);
  const tabsRef = useRef({});

  useEffect(() => {
    if (tabs.length > 0) {
      setActiveTab(subCategory);
    }
  }, [tabs, subCategory, onTabChange]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <header className="flex w-full md:max-w-screen-lg flex-col gap-3 md:gap-4 p-3 md:p-5 border-b border-gray-200 bg-white">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-5">
        <div
          className="relative w-full overflow-x-auto scrollbar-none "
          ref={tabContainerRef}
        >
          <div className="flex gap-4  md:gap-6  md:px-6">
            {tabs.length > 0 ? (
              tabs.map((tab) => (
                <button
                  key={tab}
                  ref={(el) => (tabsRef.current[tab] = el)}
                  className={`pb-2 min-w-max whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab
                      ? "text-black font-semibold border-b-2 border-blue-600 text-sm md:text-base"
                      : "text-gray-600 hover:text-gray-800 text-xs md:text-sm"
                  }`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </button>
              ))
            ) : (
              <span className="text-gray-500">No Category Selected </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex md:ml-6 flex-nowrap md:flex-wrap gap-3 md:gap-5 items-center">
        <div className="flex-1 md:flex-grow-0 w-auto">
          <button
            className="w-full  bg-purple-600 md:w-auto text-white text-xs md:text-sm px-4 py-2 border border-gray-300 rounded-full transition-colors"
            onClick={onCountryClick}
          >
            Country
          </button>
        </div>

        <div className="flex-1 md:flex-grow-0 w-auto">
          <button
            className="w-full text-white md:w-auto text-xs md:text-sm px-4 py-2 border rounded-full border-gray-300  bg-orange-500 transition-colors"
            onClick={onSortClick}
          >
            Sort
          </button>
        </div>

        <div className="flex-1 md:flex-grow-0 w-auto">
          <button
            className="w-full md:w-auto text-xs md:text-sm px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            onClick={onFilterClick}
          >
            Filters
          </button>
        </div>
      </div>
    </header>
  );
};
