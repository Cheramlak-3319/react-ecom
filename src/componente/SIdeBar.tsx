import React, { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";

interface Product {
  category: string;
}

const Sidebar = () => {
  const {
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
  } = useFilter();

  const [categories, setCategory] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  useEffect(() => {
    const fetchingCategory = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data: Product[] = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.map((product) => product.category))
        );
        setCategory(uniqueCategories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchingCategory();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };

  return (
    <div className="w-64 h-screen p-5 border-r border-gray-200">
      <h1 className="text-2xl font-bold mb-10 mt-4">React Store</h1>

      <section>
        <input
          type="text"
          placeholder="Search Products"
          className="border-2 rounded px-2 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex justify-center items-center gap-2 mt-4">
          <input
            type="number"
            className="px-5 py-3 mb-3 border-2 w-full text-center"
            placeholder="Min"
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
          />
          <input
            type="number"
            className="px-5 py-3 mb-3 border-2 w-full text-center"
            placeholder="Max"
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
          />
        </div>

        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Category</h2>
          <section>
            {categories.map((category, index) => (
              <label
                key={index}
                className={`block mb-2 px-2 py-1 rounded cursor-pointer ${
                  selectedCategory === category
                    ? "bg-gray-800 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="category"
                  value={category}
                  onChange={() => setSelectedCategory(category)}
                  checked={selectedCategory === category}
                  className="mr-2"
                />
                {category}
              </label>
            ))}
          </section>
        </div>

        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-3 mt-4">Keywords</h2>
          {keywords.map((key, index) => (
            <button
              key={index}
              onClick={() => setKeyword(key)}
              className={`block mb-0.5 w-full capitalize text-left border rounded px-4 py-2 ${
                keyword === key ? "bg-gray-800 text-white" : "hover:bg-gray-200"
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        <button
          onClick={resetFilters}
          className="mb-5 mt-4 bg-black text-white rounded py-2 w-full"
        >
          Reset Filters
        </button>
      </section>
    </div>
  );
};

export default Sidebar;
