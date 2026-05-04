import { Link } from "wouter";
import { SiInstagram, SiFacebook, SiTiktok, SiThreads, SiX, SiYoutube } from "react-icons/si";

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-8 border-t border-primary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-serif font-bold text-sm tracking-widest">
                LNH
              </div>
              <span className="font-serif font-bold text-xl tracking-wide">
                Leila's Nutritional Hub
              </span>
            </div>
            <p className="text-secondary-foreground/70 text-sm leading-relaxed max-w-xs">
              Empowering every individual through personalized, science-based nutrition strategies that fuel performance, restore health, and transform lives.
            </p>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6 text-accent">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", path: "/" },
                { label: "Our Services", path: "/services" },
                { label: "Shop Products", path: "/shop" },
                { label: "Book a Session", path: "/book" },
                { label: "About Us", path: "/about" }
              ].map(link => (
                <li key={link.path}>
                  <Link href={link.path} className="text-secondary-foreground/80 hover:text-accent transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6 text-accent">Contact</h4>
            <ul className="space-y-3 text-sm text-secondary-foreground/80">
              <li>
                <a href="https://wa.me/254714738638" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors block py-1">
                  +254 714 738 638
                </a>
              </li>
              <li>
                <a href="mailto:maryleila3@gmail.com" className="hover:text-accent transition-colors block py-1">
                  maryleila3@gmail.com
                </a>
              </li>
              <li className="pt-2 leading-relaxed">
                Ayany Estate Line O,<br />
                off Kibera Drive, Nairobi
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-6 text-accent">Connect</h4>
            <div className="flex items-center gap-4 flex-wrap">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-all">
                <SiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-all">
                <SiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-all">
                <SiTiktok className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-all">
                <SiX className="w-4 h-4" />
              </a>
            </div>
            <p className="mt-6 text-sm font-serif italic text-secondary-foreground/60">
              Fuel Your Performance • Transform Your Life
            </p>
          </div>

        </div>

        <div className="pt-8 border-t border-secondary-foreground/10 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-secondary-foreground/50">
          <p>© {new Date().getFullYear()} Leila's Nutritional Hub. All rights reserved.</p>
          <p>Licensed by Kenya Nutritionists & Dieticians Institute (KNDI)</p>
        </div>
      </div>
    </footer>
  );
};
