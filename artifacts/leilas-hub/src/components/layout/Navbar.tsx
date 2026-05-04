import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X, MapPin } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const ClockWidget = () => {
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState("Loading...");

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data.city && data.country_name) {
          setLocation(`${data.city}, ${data.country_code}`);
        } else {
          setLocation("Nairobi, KE");
        }
      })
      .catch(() => setLocation("Nairobi, KE"));
  }, []);

  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZoneName: "short",
  });

  return (
    <div className="hidden lg:flex items-center space-x-2 text-xs font-medium text-primary bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10">
      <MapPin className="w-3.5 h-3.5" />
      <span>{location} | {formatter.format(time).replace(',', '')} | {time.toLocaleTimeString()}</span>
    </div>
  );
};

const CartDrawer = () => {
  const { items, updateQuantity, removeFromCart, total, itemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" data-testid="button-cart">
          <ShoppingCart className="w-5 h-5 text-foreground" />
          {itemCount > 0 && (
            <span className="absolute top-0 right-0 bg-accent text-accent-foreground w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-background/95 backdrop-blur-md border-l-border">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl text-foreground">Your Cart ({itemCount})</SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="flex-1 -mx-6 px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <ShoppingCart className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Your cart is empty.</p>
              <Button onClick={() => setIsOpen(false)} asChild variant="outline">
                <Link href="/shop">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm leading-tight text-foreground">{item.name}</h4>
                    <p className="text-muted-foreground text-xs mt-1">{item.category}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center border border-border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-muted text-foreground transition-colors"
                        >
                          -
                        </button>
                        <span className="px-2 text-sm font-medium text-foreground">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-muted text-foreground transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-bold text-primary">KSh {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-muted-foreground hover:text-destructive self-start p-1 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {items.length > 0 && (
          <div className="pt-6 border-t border-border mt-auto">
            <div className="flex justify-between font-serif text-xl font-bold mb-6 text-foreground">
              <span>Total</span>
              <span>KSh {total.toLocaleString()}</span>
            </div>
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12" 
              onClick={() => alert("Secure payment coming soon — Mobile Money (M-Pesa & Airtel), Cards, PayPal, and Crypto (Binance Pay & USDT).")}
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export const Navbar = () => {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "Shop", path: "/shop" },
    { label: "Book", path: "/book" },
    { label: "About", path: "/about" },
    { label: "Testimonials", path: "/testimonials" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-lg border-b border-border py-3 shadow-sm" : "bg-background py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 z-50 group">
          <div className="relative w-10 h-10 rounded-full bg-primary flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:bg-primary/90 transition-colors">
            <span className="font-serif font-bold text-primary-foreground text-sm tracking-widest relative z-10">LNH</span>
            <div className="absolute inset-0 bg-accent opacity-20 mix-blend-overlay"></div>
          </div>
          <span className="font-serif font-bold text-lg text-foreground tracking-wide hidden sm:block">
            Leila's Nutritional Hub
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-sm font-semibold tracking-wide transition-colors ${
                location === link.path ? "text-accent" : "text-foreground hover:text-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ClockWidget />
          <CartDrawer />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6 text-foreground" />
          </Button>
        </div>
      </div>

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-background border-r-border">
          <SheetHeader>
            <SheetTitle className="text-left font-serif text-2xl mt-4">Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-6 mt-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-xl font-serif transition-colors ${
                  location === link.path ? "text-accent font-bold" : "text-foreground hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Separator className="my-4" />
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};
