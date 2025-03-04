import { useState, useEffect, useRef } from "react";

export const Header = ({
  category,
  subCategory,
  tabs,
  onTabChange,
  onCountryChange,
  onSortChange,
  onFilterClick,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState(subCategory);
  const tabContainerRef = useRef(null);
  const tabsRef = useRef({});

  useEffect(() => {
    if (tabs.length > 0) {
      setActiveTab(subCategory);
      onTabChange(subCategory);
    }
  }, [tabs, subCategory, onTabChange]);

  useEffect(() => {
    if (activeTab && tabsRef.current[activeTab]) {
      const tabElement = tabsRef.current[activeTab];
      const container = tabContainerRef.current;
      const containerWidth = container.offsetWidth;
      const tabLeft = tabElement.offsetLeft;
      const tabWidth = tabElement.offsetWidth;

      container.scrollTo({
        left: tabLeft - containerWidth / 2 + tabWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <header className="flex w-full md:max-w-screen-lg flex-col gap-3 md:gap-4 p-3 md:p-5 border-b border-gray-200 bg-white">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-5">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <div className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 rounded-lg font-medium text-sm md:text-base">
            {category}
          </div>
        </div>

        <div
          className="relative w-full overflow-x-auto scrollbar-none "
          ref={tabContainerRef}
        >
          <div className="flex gap-4 md:gap-6 px-4 md:px-6">
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

      <div className="flex flex-wrap gap-3 md:gap-5 items-center">
        <div className="flex-grow md:flex-grow-0 w-full md:w-auto">
          <select
            className="w-full md:w-auto text-xs md:text-sm px-3 py-2 border border-gray-300 rounded-md bg-white"
            onChange={(e) => onCountryChange(e.target.value)}
          >
            <option value="">Country</option>
          </select>
        </div>

        <div className="flex-grow md:flex-grow-0 w-full md:w-auto">
          <select
            className="w-full md:w-auto text-xs md:text-sm px-3 py-2 border border-gray-300 rounded-md bg-white"
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="">Sort</option>
          </select>
        </div>

        <button
          className="w-full md:w-auto text-xs md:text-sm px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex-shrink-0"
          onClick={onFilterClick}
        >
          Filters
        </button>
      </div>
    </header>
  );
};
