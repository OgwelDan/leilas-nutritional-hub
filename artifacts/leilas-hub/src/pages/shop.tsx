import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, Tag, Info, ChevronDown } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { PRODUCTS } from "@/data/constants";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";

const CATEGORIES = [
  "All Products",
  "Pre-Workout Supplements",
  "Recovery & Protein",
  "Vitamins & Health",
  "Performance Boosters (Men)",
  "Performance Boosters (Women)",
  "Sports Nutrition",
  "Hydration & Electrolytes"
];

export function Shop() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [search, setSearch] = useState("");
  const { addToCart } = useCart();
  const { toast } = useToast();

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCat = activeCategory === "All Products" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <div className="w-full flex flex-col md:flex-row min-h-screen bg-background">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 lg:w-72 bg-card border-r border-border p-6 flex-shrink-0 h-auto md:h-[calc(100vh-6rem)] md:sticky md:top-24 overflow-y-auto z-10">
        <h2 className="font-serif font-bold text-2xl mb-6 text-foreground">Shop Categories</h2>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h1 className="font-serif text-3xl font-bold text-foreground">
                {activeCategory}
              </h1>
              <p className="text-muted-foreground mt-2">
                {filteredProducts.length} high-performance {filteredProducts.length === 1 ? "product" : "products"}
              </p>
            </div>
            <Input 
              placeholder="Search products..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs bg-card"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={product.id}
                className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group"
              >
                <div className="aspect-square bg-muted/30 p-6 flex flex-col justify-between relative border-b border-border/50">
                  <div className="flex justify-between items-start">
                    <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                    <span className="bg-destructive/10 text-destructive text-[11px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                      <Tag className="w-3 h-3" /> {product.discount}% OFF
                    </span>
                  </div>
                  {/* Placeholder for actual product image */}
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-primary/5 flex items-center justify-center text-primary/20 group-hover:scale-105 transition-transform duration-500">
                      <ShoppingCart className="w-10 h-10" />
                    </div>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-foreground leading-tight mb-2 flex-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                    {product.description}
                  </p>
                  
                  <Collapsible className="mb-4">
                    <CollapsibleTrigger className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors w-full">
                      <Info className="w-3 h-3" /> Scientific Benefit <ChevronDown className="w-3 h-3 ml-auto" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 text-xs bg-muted p-3 rounded-lg text-muted-foreground border border-border">
                      {product.scientificBenefit}
                    </CollapsibleContent>
                  </Collapsible>

                  <div className="mt-auto flex items-end justify-between pt-4 border-t border-border">
                    <div>
                      <div className="text-xs text-muted-foreground line-through decoration-destructive/50">
                        KSh {product.originalPrice.toLocaleString()}
                      </div>
                      <div className="text-lg font-bold text-primary">
                        KSh {product.price.toLocaleString()}
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleAddToCart(product)}
                      className="rounded-xl shadow-sm font-semibold"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-24 bg-card rounded-2xl border border-border border-dashed">
              <p className="text-lg text-muted-foreground mb-4">No products found matching your search.</p>
              <Button onClick={() => { setSearch(""); setActiveCategory("All Products"); }} variant="outline">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
