import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Contexts
import { CartProvider } from "@/contexts/CartContext";

// Layout
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingBubbles } from "@/components/ui/floating-bubbles";

// Pages
import { Home } from "@/pages/home";
import { Services } from "@/pages/services";
import { Shop } from "@/pages/shop";
import { Book } from "@/pages/book";
import { About } from "@/pages/about";
import { Testimonials } from "@/pages/testimonials";
import { Contact } from "@/pages/contact";
import { Signup } from "@/pages/signup";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <main className="flex-1 pt-24 min-h-screen">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/shop" component={Shop} />
        <Route path="/book" component={Book} />
        <Route path="/about" component={About} />
        <Route path="/testimonials" component={Testimonials} />
        <Route path="/contact" component={Contact} />
        <Route path="/signup" component={Signup} />
        <Route component={NotFound} />
      </Switch>
    </main>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <Router />
              <Footer />
              <FloatingBubbles />
            </div>
          </WouterRouter>
          <Toaster />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
