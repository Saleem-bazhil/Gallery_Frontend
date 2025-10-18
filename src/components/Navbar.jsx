import { useState } from "react";
import { Sparkles, Menu as MenuIcon } from "lucide-react";
import { Link } from "react-router-dom";

const MenuLinks = [
  { item: "Home", links: "/home" },
  { item: "Gallery", links: "/image-gallery" },
  { item: "AI", links: "/ai-interface" },
];

export default function Navbar({ setIsLoggedIn }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 lg:ps-10 ps-3">
            <div className="p-2 rounded-lg bg-background">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-2xl font-bold gradient-text font-Agbalumo ps-2 tracking-[0.5px]">
              SmartGallery AI
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {MenuLinks.map((menu, index) => (
              <Link
                key={index}
                to={menu.links}
                className="nav-link tagesschrift-regular transition-colors tracking-widest"
              >
                {menu.item}
              </Link>
            ))}
          </div>

          {/* CTA Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-3 pe-8">
            <Link
              to="/home"
              className="px-4 py-2 btn transition-colors transition-opacity"
              onClick={handleLogout}
            >
              Logout
            </Link>
            <button
              onClick={() => alert("Get Started clicked!")}
              className="px-4 py-2 border border-border text-sm font-medium text-background rounded-xl bg-primary hover:bg-background hover:text-primary hover:border-primary transition-colors transition-opacity"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="btn md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {MenuLinks.map((m, index) => (
              <Link
                key={index}
                to={m.links}
                className="tagesschrift-regular nav-link block py-2 text-sm font-medium text-muted-foreground tracking-widest"
              >
                {m.item}
              </Link>
            ))}

            <div className="pt-2 space-y-2 px-2">
              <button
                onClick={handleLogout}
                className="w-full btn transition-colors"
              >
                Logout
              </button>
              <button
                onClick={() => alert("Get Started clicked!")}
                className="w-full px-4 py-2 text-sm font-medium text-background rounded-md bg-primary hover:bg-background hover:text-primary transition-opacity"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
