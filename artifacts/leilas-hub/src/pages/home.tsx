import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Target, CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

import sampleImg1 from "@assets/Maryleila's_Nutritional_Hub_Sample_3_1777858109661.jpg";
import sampleImg2 from "@assets/Maryleila's_Nutritional_Hub_Sample_3_1777858143686.jpg";

export function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    `url("${sampleImg1}")`,
    `url("${sampleImg2}")`,
    `linear-gradient(to right, hsl(141 60% 25%), hsl(150 20% 10%))`
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-screen w-full overflow-hidden flex items-center justify-center">
        {slides.map((bg, idx) => (
          <div
            key={idx}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
            style={{ 
              backgroundImage: bg,
              opacity: currentSlide === idx ? 1 : 0,
              zIndex: currentSlide === idx ? 1 : 0
            }}
          >
            <div className="absolute inset-0 bg-black/60 mix-blend-multiply" />
          </div>
        ))}
        
        <div className="relative z-10 container mx-auto px-6 text-center text-white space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mx-auto"
          >
            Leila's Nutritional Hub
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-3xl font-medium tracking-wide text-accent"
          >
            Monito Your Performance • Transform Your Life
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl max-w-2xl mx-auto text-white/90"
          >
            Personalized, science-based nutrition strategies grounded in evidence, compassion, and results.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="pt-8"
          >
            <Button asChild size="lg" className="h-14 px-10 text-lg font-bold bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl rounded-full">
              <Link href="/signup">Get Started <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-card p-10 rounded-3xl shadow-sm border border-border"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4 text-foreground">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To empower every individual through personalized, science-based nutrition strategies that fuel performance, restore health, and transform lives.
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-primary p-10 rounded-3xl shadow-lg border border-primary-border"
            >
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4 text-primary-foreground">Our Vision</h3>
              <p className="text-primary-foreground/90 leading-relaxed text-lg">
                To become East Africa's most trusted nutrition hub — where every meal plan, coaching session, and supplement recommendation is grounded in evidence, compassion, and results.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Your body is your most valuable asset. Are you fueling it right?
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 border border-white/10 rounded-2xl bg-white/5">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">75%</div>
              <div className="text-sm text-secondary-foreground/80">of chronic diseases are preventable through proper nutrition</div>
            </div>
            <div className="p-6 border border-white/10 rounded-2xl bg-white/5">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">3x</div>
              <div className="text-sm text-secondary-foreground/80">more protein needed for athletes compared to sedentary individuals</div>
            </div>
            <div className="p-6 border border-white/10 rounded-2xl bg-white/5">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">25%</div>
              <div className="text-sm text-secondary-foreground/80">performance improvement from proper hydration</div>
            </div>
            <div className="p-6 border border-white/10 rounded-2xl bg-white/5">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">68%</div>
              <div className="text-sm text-secondary-foreground/80">increase in dietary adherence with a personalized plan</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-foreground">Our Expertise</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { title: "Sports Nutrition Plans", tag: "Peak Performance" },
              { title: "Weight Management", tag: "Sustainable Fat Loss & Muscle Gain" },
              { title: "Nutrition Counselling", tag: "1-on-1 Expert Coaching" },
              { title: "Hydration & Recovery", tag: "Optimized Restoration" },
              { title: "Medical Meal Plans", tag: "Disease Management & Support" },
              { title: "Gym & Trainer Packages", tag: "For Fitness Professionals" },
            ].map((service, i) => (
              <div key={i} className="bg-card border border-border p-8 rounded-2xl shadow-sm text-left hover:shadow-md transition-shadow">
                <h3 className="font-serif font-bold text-xl mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.tag}</p>
              </div>
            ))}
          </div>
          <Button asChild variant="outline" className="rounded-full px-8 h-12">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-foreground">Individual & Team Packages</h2>
            <p className="text-muted-foreground">Select a program that fits your commitment level and goals.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { name: "FIT START", duration: "4 Week Program", price: "5,000", features: ["Personalized Meal Plan", "Weekly Check-ins"] },
              { name: "ATHLETE PRO", duration: "8 Week Program", price: "9,000", features: ["Advanced Nutrition Plan", "Performance Tracking", "Ongoing Support"], popular: true },
              { name: "ELITE PERFORMANCE", duration: "12 Week Program", price: "15,000", features: ["Comprehensive Coaching", "Detailed Meal Plans", "Body Composition Analysis"] },
            ].map((pkg, i) => (
              <div key={i} className={`bg-card rounded-3xl p-8 border ${pkg.popular ? 'border-primary shadow-xl relative' : 'border-border shadow-sm'}`}>
                {pkg.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">Most Popular</span>}
                <div className="text-sm font-bold text-primary tracking-wider uppercase mb-2">{pkg.duration}</div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-4">{pkg.name}</h3>
                <div className="text-3xl font-bold mb-8">KSh {pkg.price}</div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full rounded-xl" variant={pkg.popular ? 'default' : 'outline'}>
                  <Link href="/book">Select Package</Link>
                </Button>
              </div>
            ))}
          </div>
          <div className="bg-primary text-primary-foreground p-10 rounded-3xl text-center max-w-4xl mx-auto shadow-xl">
            <h3 className="font-serif text-2xl font-bold mb-4">TEAM PACKAGE — Custom Pricing</h3>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Discounted rates for sports teams, corporate wellness groups, and fitness centers. Contact us to get a quote based on team size.
            </p>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8">
              <a href="https://wa.me/254714738638" target="_blank" rel="noopener noreferrer">Request Team Quote</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Sample Meal Plan */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-foreground">A Taste of Balance</h2>
            <p className="text-muted-foreground">Nutrition shouldn't be boring. Our meal plans incorporate culturally relevant, delicious foods.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm">
              <div className="h-48 bg-[url('/oats.png')] bg-cover bg-center"></div>
              <div className="p-6">
                <div className="text-accent font-bold text-sm tracking-widest uppercase mb-2">Breakfast</div>
                <h4 className="font-serif font-bold text-xl">Oats with Fruits & Eggs</h4>
              </div>
            </div>
            <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm">
              <div className="h-48 bg-[url('/fish.png')] bg-cover bg-center"></div>
              <div className="p-6">
                <div className="text-accent font-bold text-sm tracking-widest uppercase mb-2">Lunch</div>
                <h4 className="font-serif font-bold text-xl">Rice/Ugali & Grilled Fish</h4>
              </div>
            </div>
            <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm">
              <div className="h-48 bg-[url('/chicken.png')] bg-cover bg-center"></div>
              <div className="p-6">
                <div className="text-accent font-bold text-sm tracking-widest uppercase mb-2">Dinner</div>
                <h4 className="font-serif font-bold text-xl">Chicken, Veggies & Sweet Potato</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Teaser */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-foreground">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { name: "Brian O.", role: "Rugby Player", text: "My stamina improved noticeably and muscle soreness reduced dramatically." },
              { name: "Grace W.", role: "New Mother", text: "She put together a postpartum plan that supported my milk production while helping me recover." },
              { name: "Kevin M.", role: "Gym Enthusiast", text: "Within 6 weeks, I lost 4kg of fat and gained visible muscle definition." },
            ].map((t, i) => (
              <div key={i} className="bg-card p-8 rounded-3xl border border-border text-left">
                <div className="flex items-center gap-1 mb-4 text-accent">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-muted-foreground italic mb-6">"{t.text}"</p>
                <div className="font-bold text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            ))}
          </div>
          <Button asChild variant="outline" className="rounded-full px-8 h-12">
            <Link href="/testimonials">Read All Reviews</Link>
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-accent text-accent-foreground text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8 text-secondary">
            Ready to Transform Your Life?
          </h2>
          <Button asChild size="lg" className="h-14 px-12 text-lg font-bold bg-secondary hover:bg-secondary/90 text-white rounded-full">
            <Link href="/signup">Get Started Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
