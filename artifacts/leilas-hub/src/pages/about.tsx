import { motion } from "framer-motion";
import { Award, Target, Users, BookOpen, HeartPulse, Activity } from "lucide-react";

export function About() {
  return (
    <div className="w-full bg-background min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">About Us</h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 leading-relaxed font-medium">
              Transforming lives through the power of personalized, evidence-based nutrition.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Maryleila Aluoch, a Certified Nutritionist, founded Leila's Nutritional Hub in 2020 after witnessing firsthand how poor nutritional choices were holding back Kenya's athletes, patients, and everyday individuals from reaching their true potential. However, this period coincided with the COVID-19 pandemic, which disrupted operations, especially for startups.
                </p>
                <p>
                  With a certification from the Kenya Nutritionists & Dieticians Institute (KNDI) and years of hands-on experience spanning sports nutrition, medical dietary management, and community wellness programs, Maryleila has built a practice grounded in evidence, empathy, and exceptional results.
                </p>
                <p>
                  What started as one-on-one coaching from a small Nairobi clinic has grown into a comprehensive nutrition hub serving athletes, patients, mothers, the elderly, gym enthusiasts, and corporate wellness clients across Kenya and beyond.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-muted">
                {/* Placeholder for Maryleila's photo */}
                <div className="w-full h-full bg-secondary/20 flex items-center justify-center relative">
                  <div className="w-full h-full bg-[url('/dpp.jpg')] bg-cover bg-center"></div>
                </div>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-card p-6 rounded-2xl shadow-xl border border-border max-w-xs">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-accent/20 text-accent rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">KNDI Certified</div>
                    <div className="text-sm text-muted-foreground">Licensed Nutritionist</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">200+</div>
              <div className="text-sm md:text-base text-secondary-foreground/80">Clients Served</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">6</div>
              <div className="text-sm md:text-base text-secondary-foreground/80">Specialized Services</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">3</div>
              <div className="text-sm md:text-base text-secondary-foreground/80">Individual Packages</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">98%</div>
              <div className="text-sm md:text-base text-secondary-foreground/80">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">Why Choose Us</h2>
            <p className="text-lg text-muted-foreground">
              We don't believe in one-size-fits-all diets. We believe in science, personalization, and sustainable results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, title: "Science-Based", desc: "Every recommendation is grounded in the latest nutritional research and clinical evidence." },
              { icon: Target, title: "Personalized", desc: "Your plan is tailored to your unique physiology, lifestyle, culture, and goals." },
              { icon: HeartPulse, title: "Holistic", desc: "We look at the whole picture — stress, sleep, hydration, and mental well-being alongside food." },
              { icon: Activity, title: "Results-Driven", desc: "We track progress meticulously and adjust strategies to ensure you reach your targets." }
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card p-8 rounded-3xl border border-border text-center"
              >
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <pillar.icon className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">{pillar.title}</h3>
                <p className="text-muted-foreground">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
