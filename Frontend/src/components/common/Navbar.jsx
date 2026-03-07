import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, X, UtensilsCrossed, User, ShoppingBag, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import useAuthStore from "../../store/useAuthStore";
import useCartStore from "../../store/useCartStore";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();

  // Get shared state from global stores
  const { isLoggedIn, logout } = useAuthStore();
  const { 
    items: cartItems, 
    getCartCount, 
    getCartDetails, 
    getCartTotal, 
    updateQuantity,
    clearCart 
  } = useCartStore();

  const cartCount = getCartCount();
  const cartDetails = getCartDetails();
  const cartTotal = getCartTotal();

  const links = ["Home", "Roles", "Features", "Contact"];

  // Handle scroll effects and active section detection
  useEffect(() => {
    const handleScroll = () => {
      // Scrolled state for pill transformation
      setScrolled(window.scrollY > 20);

      // Active section detection
      const sectionIds = links.map(link => link.toLowerCase());
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id);
          }
        }
      }
      
      // Special case for home (top of page)
      if (window.scrollY < 100) setActiveSection("home");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 w-full z-50 flex justify-center px-4 pt-4 pointer-events-none">
        <nav
          className={`
            pointer-events-auto
            transition-all duration-500 ease-in-out
            flex items-center justify-between
            ${scrolled
              ? "max-w-5xl w-full bg-white/80 backdrop-blur-2xl rounded-full px-8 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-white/20"
              : "max-w-7xl w-full bg-transparent px-2 py-3"
            }
          `}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className={`
              flex items-center justify-center rounded-xl bg-linear-to-br from-green-600 to-green-700 text-white transition-all duration-500
              ${scrolled ? "w-8 h-8 rounded-lg" : "w-10 h-10"}
              group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-green-600/30
            `}>
              <UtensilsCrossed size={scrolled ? 16 : 20} className="drop-shadow-sm" />
            </div>
            <span className={`font-bold tracking-tight text-slate-800 transition-all duration-300 ${scrolled ? "text-base" : "text-xl"}`}>
              MealMate<span className="text-green-600">.</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1.5">
            {links.map(link => {
              const isActive = activeSection === link.toLowerCase();
              return (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className={`
                    relative px-5 py-2 rounded-full text-sm font-bold transition-all duration-300
                    ${isActive 
                      ? "text-green-700" 
                      : scrolled ? "text-slate-500 hover:text-slate-800" : "text-slate-600 hover:text-slate-900"
                    }
                  `}
                >
                  {isActive && (
                    <span className="absolute inset-0 bg-green-50/70 rounded-full -z-10 animate-fade-in" />
                  )}
                  <span className="relative z-10">{link}</span>
                </a>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                {/* Cart Button */}
                <button 
                  onClick={() => setCartOpen(true)}
                  className="group relative flex items-center justify-center transition-all duration-300 active:scale-95"
                >
                  <div className={`
                    relative flex items-center justify-center rounded-full bg-slate-50 border border-slate-100 
                    shadow-xs transition-all duration-500 group-hover:bg-white group-hover:border-green-200 group-hover:shadow-md
                    ${scrolled ? "w-9 h-9" : "w-11 h-11"}
                  `}>
                    <ShoppingBag 
                      size={scrolled ? 18 : 22} 
                      className="text-slate-600 group-hover:text-green-600 transition-colors" 
                    />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold text-white border-2 border-white shadow-sm ring-1 ring-green-600/10">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </button>

                {/* Profile Button */}
                <button 
                  className="group relative flex items-center justify-center transition-all duration-300 active:scale-95"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  title="Click to logout"
                >
                  <div className={`
                    relative flex items-center justify-center rounded-full bg-slate-50 border border-slate-100 
                    shadow-xs transition-all duration-500 group-hover:bg-white group-hover:border-red-200 group-hover:shadow-md
                    ${scrolled ? "w-9 h-9" : "w-11 h-11"}
                  `}>
                    <User 
                      size={scrolled ? 18 : 22} 
                      className="text-slate-600 group-hover:text-red-500 transition-colors" 
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-sm animate-pulse-slow" />
                  </div>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="rounded-full px-5 py-2 border-slate-200 text-slate-700 hover:text-green-700 hover:border-green-600 font-bold bg-white/50 transition-all active:scale-95"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="rounded-full px-5 py-2 font-bold shadow-md shadow-green-600/10 bg-green-600 hover:bg-green-700 active:scale-95 transition-all"
                  onClick={() => navigate("/SignUp")}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className={`
              md:hidden w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300
              ${scrolled ? "bg-slate-100/80 text-slate-600" : "bg-white/50 backdrop-blur-sm text-slate-800 shadow-xs"}
              active:scale-90 hover:bg-slate-200/50
            `}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="absolute top-full left-0 right-0 mt-4 mx-2 text-left">
              <div className="bg-white/98 backdrop-blur-3xl rounded-3xl border border-slate-100 p-6 shadow-2xl animate-fade-in-up">
                <div className="flex flex-col gap-2.5">
                  {links.map(link => {
                    const isActive = activeSection === link.toLowerCase();
                    return (
                      <a
                        key={link}
                        href={`#${link.toLowerCase()}`}
                        className={`
                          px-4 py-3.5 rounded-2xl font-bold transition-all duration-300
                          ${isActive 
                            ? "bg-green-50 text-green-700" 
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          }
                        `}
                        onClick={() => setMenuOpen(false)}
                      >
                        {link}
                      </a>
                    );
                  })}
                  
                  <div className="h-px bg-slate-100/80 my-3 mx-4" />
                  
                  {isLoggedIn ? (
                    <div className="flex flex-col gap-3 pt-2">
                      <button 
                        onClick={() => {
                          setMenuOpen(false);
                          setCartOpen(true);
                        }}
                        className="flex items-center gap-4 px-4 py-3.5 bg-slate-50 rounded-2xl cursor-pointer group hover:bg-green-50 transition-colors"
                      >
                        <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-slate-600 shadow-sm group-hover:scale-110 group-hover:text-green-600 transition-all">
                          <ShoppingBag size={22} />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="font-bold text-slate-800">Your Cart</span>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{cartCount} items selected</p>
                        </div>
                      </button>

                      <div 
                        className="flex items-center gap-4 px-4 py-3.5 bg-slate-50 rounded-2xl cursor-pointer group hover:bg-red-50 transition-colors"
                        onClick={() => {
                          logout();
                          navigate("/");
                        }}
                      >
                        <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-slate-600 shadow-sm group-hover:scale-110 group-hover:text-red-500 transition-all">
                          <User size={22} />
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="font-bold text-slate-800 group-hover:text-red-700 transition-colors">Logout</span>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tap to sign out</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <Button 
                        variant="secondary" 
                        size="md" 
                        className="rounded-2xl font-bold border-slate-200"
                        onClick={() => {
                          setMenuOpen(false);
                          navigate("/login");
                        }}
                      >
                        Login
                      </Button>
                      <Button 
                        variant="primary" 
                        size="md" 
                        className="rounded-2xl font-bold"
                        onClick={() => {
                          setMenuOpen(false);
                          navigate("/SignUp");
                        }}
                      >
                        Sign Up
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Cart Drawer Overlay */}
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-[360px] bg-white shadow-2xl z-[101] flex flex-col"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-green-100 rounded-lg text-green-600">
                    <ShoppingCart size={18} />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Your Selection</h2>
                    <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-[0.2em]">{cartCount} items reserved</p>
                  </div>
                </div>
                <button 
                  onClick={() => setCartOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-200/50 text-slate-400 transition-all active:scale-90"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                {cartDetails.length > 0 ? (
                  cartDetails.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3.5 group"
                    >
                      <div 
                        className="w-16 h-16 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0 shadow-sm cursor-pointer"
                        onClick={() => {
                          setCartOpen(false);
                          navigate(`/food/${item.id}`);
                        }}
                      >
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 
                              className="font-extrabold text-slate-800 text-[13px] leading-tight hover:text-green-700 transition-colors tracking-tight cursor-pointer"
                              onClick={() => {
                                setCartOpen(false);
                                navigate(`/food/${item.id}`);
                              }}
                            >
                              {item.name}
                            </h3>
                            <span className="text-[13px] font-bold text-slate-400 ml-2">Rs. {item.price}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1 font-medium tracking-wide">{item.category}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-full px-2 py-1">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 rounded-full hover:bg-white text-slate-400 hover:text-red-500 transition-colors active:scale-90"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-bold w-6 text-center text-slate-700">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 rounded-full hover:bg-white text-slate-400 hover:text-green-600 transition-colors active:scale-90"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button 
                            onClick={() => updateQuantity(item.id, -item.quantity)}
                            className="text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center px-4">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-3 border border-slate-100">
                      <ShoppingBag size={28} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-1.5">Your cart is empty</h3>
                    <p className="text-[13px] text-slate-500 mb-6 max-w-[220px]">Explore our menu and discover something delicious to add to your curation.</p>
                    <Button 
                      variant="primary" 
                      size="sm"
                      className="rounded-full px-7 py-2.5"
                      onClick={() => {
                        setCartOpen(false);
                        navigate("/menu");
                      }}
                    >
                      Browse Menu
                    </Button>
                  </div>
                )}
              </div>

              {/* Footer */}
              {cartDetails.length > 0 && (
                <div className="p-6 border-t border-slate-100 bg-slate-50/80 backdrop-blur-md">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center text-slate-400 font-extrabold text-[9px] uppercase tracking-[0.2em]">
                      <span>Selection Total</span>
                      <span>Rs. {cartTotal}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-extrabold text-slate-900 tracking-tight">Total Payment.</span>
                      <span className="text-xl font-extrabold text-green-600 tracking-tight">Rs. {cartTotal}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button 
                      variant="primary" 
                      className="w-full rounded-2xl py-5 font-bold text-base shadow-xl shadow-green-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      onClick={() => {
                        setCartOpen(false);
                        navigate("/checkout");
                      }}
                    >
                      Proceed to Checkout
                    </Button>
                    <div className="flex justify-center mt-2">
                      <Button 
                        variant="secondary" 
                        size="sm"
                        className="w-full rounded-2xl py-3.5 border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 font-extrabold text-[10px] uppercase tracking-[0.2em]"
                        onClick={clearCart}
                        icon={<Trash2 size={12} />}
                      >
                        Clear Selection
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;