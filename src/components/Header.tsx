import { Link, NavLink, useLocation } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Início" },
  { to: "/loja", label: "Loja" },
  { to: "/sobre", label: "Sobre" },
  { to: "/termos", label: "Termos" },
  { to: "/contato", label: "Contato" },
];

export function Header() {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled ? "glass border-b border-border/40" : "bg-transparent",
      )}
    >
      <div className="container flex h-28 md:h-36 items-center justify-between gap-4">
        <Link to="/" aria-label="Hardy Store - Início" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                cn(
                  "px-4 py-2 rounded-full text-sm font-semibold transition-all",
                  isActive
                    ? "bg-gradient-brand text-white shadow-glow-pink"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="glass" size="sm" className="relative">
            <Link to="/carrinho" aria-label={`Carrinho com ${totalItems} itens`}>
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Carrinho</span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-5 min-w-5 px-1 rounded-full bg-gradient-warm text-[10px] font-black text-white flex items-center justify-center shadow-glow-orange">
                  {totalItems}
                </span>
              )}
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menu"
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-border/40 animate-fade-in-up">
          <nav className="container py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                    isActive
                      ? "bg-gradient-brand text-white"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
