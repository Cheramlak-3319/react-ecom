import React, { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { LuTally3 } from "react-icons/lu";

const MainContent = () => {
  const { searchQuery, selectedCategory, keyword, minPrice, maxPrice } = useFilter();
  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropDown, setDropDown] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();

        let filtered = data;

        // Search
        if (searchQuery) {
          filtered = filtered.filter((p: any) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        // Category
        if (selectedCategory) {
          filtered = filtered.filter((p: any) => p.category === selectedCategory);
        }

        // Keyword
        if (keyword) {
          filtered = filtered.filter((p: any) =>
            p.title.toLowerCase().includes(keyword.toLowerCase())
          );
        }

        // Price range
        if (minPrice !== undefined) {
          filtered = filtered.filter((p: any) => p.price >= minPrice);
        }
        if (maxPrice !== undefined) {
          filtered = filtered.filter((p: any) => p.price <= maxPrice);
        }

        // Sorting
        if (filter === "cheap") {
          filtered = [...filtered].sort((a, b) => a.price - b.price);
        } else if (filter === "expensive") {
          filtered = [...filtered].sort((a, b) => b.price - a.price);
        } else if (filter === "popular") {
          filtered = [...filtered].sort((a, b) => b.rating.rate - a.rating.rate);
        }

        // Pagination
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

        setProducts(paginated);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [currentPage, searchQuery, selectedCategory, keyword, minPrice, maxPrice, filter]);

  return (
    <section className="xl:w-[55rem] lg:w-[55rem] md:w-[40rem] sm:w-[20rem] p-5">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        {/* Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropDown(!dropDown)}
            className="flex gap-2 items-center border px-4 py-2 rounded-full hover:bg-gray-100"
          >
            <LuTally3 />
            {filter === "all" ? "Filter" : filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>

          {dropDown && (
            <div className="absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40 shadow-md">
              {["cheap", "expensive", "popular"].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setFilter(type);
                    setDropDown(false);
                  }}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-100 capitalize"
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No products found.</p>
      ) : (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-3 shadow hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h2 className="font-semibold text-lg line-clamp-1">{product.title}</h2>
              <p className="text-gray-600">${product.price}</p>
              <p className="text-sm capitalize text-gray-500">{product.category}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-3">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="font-medium">Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default MainContent;
