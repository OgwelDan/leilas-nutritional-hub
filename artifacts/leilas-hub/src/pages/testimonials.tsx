import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Star, Quote, MessageSquareQuote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const TESTIMONIALS = [
  {
    name: "Teddy Agutu",
    role: "Seasoned Kenyan Rugby Player",
    quote: "Before working with Maryleila, I was training hard but not recovering well. She redesigned my entire nutrition approach around match days and training loads. Within 8 weeks, my stamina improved noticeably and muscle soreness reduced dramatically. I now eat with intention, not guesswork.",
    initials: "TA"
  },
  {
    name: "Wendy",
    role: "New Mother",
    quote: "Pregnancy changed everything about how I eat. Maryleila put together a postpartum plan that supported my milk production while helping me recover my strength. She understood the emotional side too — never made me feel rushed or pressured. Truly personalized care.",
    initials: "W"
  },
  {
    name: "Hellen Maksh",
    role: "Gym Enthusiast",
    quote: "I had been stuck at the same weight for months despite training five days a week. Maryleila identified gaps in my protein timing and carb cycling strategy. Within 6 weeks, I lost 4kg of fat and gained visible muscle definition. The science behind every decision she makes is what impressed me most.",
    initials: "HM"
  },
  {
    name: "Velma Atieno",
    role: "Diabetic Conditions",
    quote: "Managing Type 2 diabetes through food felt overwhelming until I found Leila's Nutritional Hub. Maryleila created a realistic, culturally relevant meal plan using Kenyan foods I actually enjoy. My blood sugar readings have been consistently within range for three months now.",
    initials: "VA"
  },
  {
    name: "Crispin Onyango",
    role: "Professional Personal Trainer, KK Fettle - Nairobi",
    quote: "As a PT, I needed someone who could provide reliable nutrition guidance for my clients. Maryleila has become my go-to partner. She is meticulous, responsive, and always backs her recommendations with research. My clients have seen better results because of her involvement.",
    initials: "CO"
  },
  {
    name: "Sharon Lanyo",
    role: "Corporate Professional",
    quote: "I signed up for the weight management program after years of yo-yo dieting. What makes Leila's Nutritional Hub different is the accountability and the fact that the plan actually fits into a busy work schedule. No fad diets — just practical, sustainable nutrition.",
    initials: "SL"
  }
];

const feedbackSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export function Testimonials() {
  const [feedbackSent, setFeedbackSent] = useState(false);

  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" }
  });

  const onSubmit = (data: z.infer<typeof feedbackSchema>) => {
    console.log("Feedback data:", data);
    setFeedbackSent(true);
    form.reset();
    setTimeout(() => setFeedbackSent(false), 5000);
  };

  return (
    <div className="w-full bg-background min-h-screen py-16">
      <div className="container mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">Real Results, Real People</h1>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it. Hear from the athletes, patients, and professionals who have transformed their lives with Leila's Nutritional Hub.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-card p-8 rounded-3xl border border-border shadow-sm flex flex-col relative">
              <Quote className="absolute top-8 right-8 w-10 h-10 text-primary/10" />
              <div className="flex items-center gap-1 mb-6 text-accent">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-muted-foreground leading-relaxed flex-1 mb-8 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <Avatar className="w-12 h-12 border border-border">
                  <AvatarFallback className="bg-primary text-primary-foreground font-serif font-bold">
                    {t.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-bold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feedback Form */}
        <div className="max-w-2xl mx-auto bg-card rounded-3xl p-8 md:p-12 border border-border shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-accent/20 text-accent rounded-xl flex items-center justify-center">
                <MessageSquareQuote className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">Leave Your Feedback</h2>
                <p className="text-muted-foreground text-sm">We value your experience with us.</p>
              </div>
            </div>

            {feedbackSent ? (
              <div className="bg-green-50 text-green-700 p-6 rounded-2xl border border-green-200 text-center font-medium">
                Thank You for Your Message! We appreciate your feedback and will respond shortly.
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl><Input placeholder="Your Name" className="bg-background rounded-xl" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl><Input type="email" placeholder="your@email.com" className="bg-background rounded-xl" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone (Optional)</FormLabel>
                        <FormControl><Input placeholder="+254 7XX XXX XXX" className="bg-background rounded-xl" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl><Textarea placeholder="Share your experience..." className="min-h-[120px] resize-none bg-background rounded-xl" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full h-12 text-lg font-bold rounded-xl">Submit Feedback</Button>
                </form>
              </Form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
