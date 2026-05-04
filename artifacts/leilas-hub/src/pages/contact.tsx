import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SiInstagram, SiFacebook, SiTiktok, SiThreads, SiX, SiYoutube } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(9, "Valid phone required"),
  subject: z.string().min(5, "Subject required"),
  message: z.string().min(10, "Message required")
});

export function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" }
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    console.log("Contact submission:", data);
    toast({
      title: "Message Sent!",
      description: "We'll be in touch within 24 hours.",
      duration: 5000,
    });
    form.reset();
  };

  return (
    <div className="w-full bg-background min-h-screen">
      
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 px-6 text-center">
        <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">Get in Touch</h1>
        <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto">
          Whether you have a question about our programs, products, or need custom advice, we're here to help.
        </p>
      </section>

      <section className="py-16 px-6 -mt-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              
              <div className="bg-card p-8 rounded-3xl border border-border shadow-lg">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl mb-2">Phone & WhatsApp</h3>
                <p className="text-muted-foreground mb-4 text-sm">We're available Mon-Sat, 8am - 6pm.</p>
                <a href="https://wa.me/254714738638" target="_blank" rel="noopener noreferrer" className="text-accent font-bold hover:underline text-lg">
                  +254 714 738 638
                </a>
              </div>

              <div className="bg-card p-8 rounded-3xl border border-border shadow-lg">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl mb-2">Email Us</h3>
                <p className="text-muted-foreground mb-4 text-sm">Drop us a line anytime. We reply within 24 hours.</p>
                <a href="mailto:maryleila3@gmail.com" className="text-accent font-bold hover:underline text-lg">
                  maryleila3@gmail.com
                </a>
              </div>

              <div className="bg-card p-8 rounded-3xl border border-border shadow-lg">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl mb-2">Visit Clinic</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Ayany Estate Line O,<br />
                  off Kibera Drive, Nairobi<br />
                  Kenya
                </p>
              </div>

              {/* Socials */}
              <div className="pt-4">
                <div className="flex items-center gap-3">
                  <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"><SiInstagram className="w-4 h-4"/></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"><SiFacebook className="w-4 h-4"/></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"><SiTiktok className="w-4 h-4"/></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"><SiThreads className="w-4 h-4"/></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"><SiX className="w-4 h-4"/></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"><SiYoutube className="w-4 h-4"/></a>
                </div>
                <div className="mt-4 font-serif font-bold text-foreground">Leila's Nutritional Hub</div>
              </div>

            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-card p-8 md:p-12 rounded-3xl border border-border shadow-xl">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-8">Send a Message</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem><FormLabel>Name</FormLabel><FormControl><Input className="h-12 rounded-xl bg-background" placeholder="Your name" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem><FormLabel>Email</FormLabel><FormControl><Input className="h-12 rounded-xl bg-background" type="email" placeholder="your@email.com" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem><FormLabel>Phone</FormLabel><FormControl><Input className="h-12 rounded-xl bg-background" placeholder="+254 7XX XXX XXX" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="subject" render={({ field }) => (
                      <FormItem><FormLabel>Subject</FormLabel><FormControl><Input className="h-12 rounded-xl bg-background" placeholder="How can we help?" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem><FormLabel>Message</FormLabel><FormControl><Textarea className="min-h-[150px] resize-none rounded-xl bg-background" placeholder="Write your message here..." {...field} /></FormControl><FormMessage /></FormItem>
                  )} />

                  <Button type="submit" size="lg" className="w-full h-14 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90">
                    Send Message
                  </Button>
                </form>
              </Form>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
