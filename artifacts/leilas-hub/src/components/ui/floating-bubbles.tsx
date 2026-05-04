import { useState, useEffect } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export const FloatingBubbles = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 pointer-events-none z-50 flex justify-between px-6">
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="pointer-events-auto"
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  className="rounded-full shadow-lg bg-background/80 backdrop-blur-md border border-border text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent font-semibold h-12 px-6 gap-2"
                >
                  <MessageCircle className="w-5 h-5 text-primary" />
                  Get My Free Quote
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2 rounded-xl mb-2 ml-2" align="start">
                <div className="flex flex-col gap-1">
                  <a 
                    href="https://wa.me/254714738638" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    Chat on WhatsApp
                  </a>
                  <a 
                    href="mailto:maryleila3@gmail.com"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <svg xmlns="http://www.000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    Send us an Email
                  </a>
                </div>
              </PopoverContent>
            </Popover>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="pointer-events-auto"
          >
            <Button
              size="icon"
              className="rounded-full shadow-lg bg-background/80 backdrop-blur-md border border-border text-foreground hover:bg-primary hover:text-primary-foreground h-12 w-12"
              onClick={scrollToTop}
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
