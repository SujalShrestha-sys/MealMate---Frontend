import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "../components/common/Footer";
import MenuFilters from "../components/menu/MenuFilters";
import MenuGrid from "../components/menu/MenuGrid";
import PromoBanner from "../components/menu/PromoBanner";
import { motion } from "motion/react";

import { products } from "../data/products";

import useCartStore from "../store/useCartStore";

const MenuPage = () => {
  const { items: cart, updateQuantity } = useCartStore();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Handlers for filter/search changes
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const categories = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snacks",
    "Appetizers",
    "Beverages",
    "Desserts",
    "Specials",
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        {/* Promotional Banner */}
        <PromoBanner />

        {/* Search & Filter - Separated Component (No Sticky) */}
        <MenuFilters
          activeCategory={activeCategory}
          setActiveCategory={handleCategoryChange}
          categories={categories}
          searchQuery={searchQuery}
          setSearchQuery={handleSearchChange}
        />

        {/* Grid */}
        <MenuGrid
          products={paginatedProducts}
          cart={cart}
          updateQuantity={updateQuantity}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-green-50 hover:text-green-600 hover:border-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-full font-medium transition ${currentPage === page
                        ? "bg-green-600 text-white shadow-lg shadow-green-500/30"
                        : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                      }`}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-green-50 hover:text-green-600 hover:border-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MenuPage;