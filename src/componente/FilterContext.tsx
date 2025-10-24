import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface FilterContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  minPrice: number | undefined;
  setMinPrice: (price: number | undefined) => void;
  maxPrice: number | undefined;
  setMaxPrice: (price: number | undefined) => void;
  keyword: string;
  setKeyword: (keyword: string) => void;
  resetFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  const resetFilters = () => {
    setSearchQuery("");
    setKeyword("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
  };

  // Optional: Persist filters in localStorage
  useEffect(() => {
    const saved = localStorage.getItem("filters");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSearchQuery(parsed.searchQuery || "");
      setKeyword(parsed.keyword || "");
      setSelectedCategory(parsed.selectedCategory || "");
      setMinPrice(parsed.minPrice || undefined);
      setMaxPrice(parsed.maxPrice || undefined);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "filters",
      JSON.stringify({ searchQuery, keyword, selectedCategory, minPrice, maxPrice })
    );
  }, [searchQuery, keyword, selectedCategory, minPrice, maxPrice]);

  return (
    <FilterContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        keyword,
        setKeyword,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
