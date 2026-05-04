import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Apple, Activity, HeartPulse, Droplet, Stethoscope, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";

const SERVICES = [
  {
    id: "sports",
    title: "Sports Nutrition Plans",
    icon: Activity,
    description: "Customized meal plans for athletes to maximize performance and recovery.",
    benefits: ["Macronutrient periodization", "Pre/post-workout nutrition", "Competition-day fueling", "Recovery protocols"],
    color: "bg-blue-500/10 text-blue-600",
    border: "border-blue-500/20"
  },
  {
    id: "weight",
    title: "Weight Management",
    icon: Apple,
    description: "Fat loss & muscle gain strategies for individuals and groups.",
    benefits: ["Body composition analysis", "Caloric deficit/surplus planning", "Progressive nutrition adjustments", "Sustainable habit building"],
    color: "bg-green-500/10 text-green-600",
    border: "border-green-500/20"
  },
  {
    id: "counselling",
    title: "Nutrition Counselling",
    icon: HeartPulse,
    description: "1-on-1 expert coaching sessions with Maryleila Aluoch.",
    benefits: ["Dietary assessment", "Habit change strategies", "Evidence-based guidance", "Ongoing accountability"],
    color: "bg-purple-500/10 text-purple-600",
    border: "border-purple-500/20"
  },
  {
    id: "hydration",
    title: "Hydration & Recovery",
    icon: Droplet,
    description: "Optimized performance nutrition for rapid restoration.",
    benefits: ["Electrolyte balance", "Sweat rate analysis", "Recovery meal timing", "Anti-inflammatory foods"],
    color: "bg-cyan-500/10 text-cyan-600",
    border: "border-cyan-500/20"
  },
  {
    id: "medical",
    title: "Medical Meal Plans",
    icon: Stethoscope,
    description: "Customized nutrition for specific health conditions and life stages.",
    benefits: [
      "NCDs: Diabetes, Hypertension, Heart Disease",
      "Communicable: HIV/AIDS, TB, Malaria recovery",
      "Maternal & Infant: Prenatal, postnatal, newborns",
      "Elderly: Sarcopenia prevention, bone density"
    ],
    color: "bg-rose-500/10 text-rose-600",
    border: "border-rose-500/20"
  },
  {
    id: "gym",
    title: "Gym & Trainer Packages",
    icon: Dumbbell,
    description: "Custom products and services for gym enthusiasts and PTs.",
    benefits: ["Supplement stacks", "Periodized nutrition plans", "Client management support for PTs", "Bulk discounts"],
    color: "bg-orange-500/10 text-orange-600",
    border: "border-orange-500/20"
  }
];

export function Services() {
  return (
    <div className="w-full bg-background min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">Our Services</h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive, evidence-based nutrition solutions tailored to your unique goals, lifestyle, and physiological needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={service.id}
                className={`bg-card rounded-3xl p-8 border ${service.border} shadow-sm hover:shadow-md transition-all flex flex-col h-full`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${service.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
                
                <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 flex-1">
                  {service.description}
                </p>

                <div className="space-y-3 mb-8">
                  {service.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{benefit}</span>
                    </div>
                  ))}
                </div>

                <Button asChild className="w-full h-12 rounded-xl font-bold text-base mt-auto">
                  <Link href="/book">Book Now</Link>
                </Button>
              </motion.div>
            )
          })}
        </div>

      </div>
    </div>
  );
}
