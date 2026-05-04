import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const bookingSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(9, "Valid phone number required"),
  sessionType: z.string().min(1, "Please select a session type"),
  date: z.date({ required_error: "Please select a date" }),
  timeSlot: z.enum(["morning", "afternoon", "evening"], { required_error: "Please select a time slot" }),
  mode: z.enum(["in-person", "video", "phone"], { required_error: "Please select a mode" }),
  notes: z.string().optional()
});

export function Book() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      sessionType: "",
      notes: "",
    }
  });

  const onSubmit = (data: z.infer<typeof bookingSchema>) => {
    console.log(data);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-background">
        <div className="max-w-md w-full bg-card p-10 rounded-3xl shadow-lg border border-border text-center">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Request Received!</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Your session request has been received! Maryleila will contact you within 24 hours via WhatsApp or email to confirm your booking.
          </p>
          <Button onClick={() => setIsSubmitted(false)} className="w-full h-12 text-lg rounded-xl">
            Book Another Session
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Book a Session</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Schedule your 1-on-1 session with Maryleila Aluoch. Get personalized guidance tailored to your body's unique needs.
          </p>
        </div>

        <div className="bg-card rounded-3xl shadow-xl border border-border p-8 md:p-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-semibold">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className="h-12 rounded-xl" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-semibold">Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" className="h-12 rounded-xl" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-semibold">Phone Number (WhatsApp)</FormLabel>
                      <FormControl>
                        <Input placeholder="+254 7XX XXX XXX" className="h-12 rounded-xl" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sessionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-semibold">Session Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 rounded-xl">
                            <SelectValue placeholder="Select session type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="nutrition-counselling">Nutrition Counselling</SelectItem>
                          <SelectItem value="sports-nutrition">Sports Nutrition</SelectItem>
                          <SelectItem value="weight-management">Weight Management</SelectItem>
                          <SelectItem value="medical">Medical Meal Plan</SelectItem>
                          <SelectItem value="hydration">Hydration & Recovery</SelectItem>
                          <SelectItem value="gym-trainer">Gym/Trainer Package</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-foreground font-semibold">Preferred Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full h-12 rounded-xl pl-3 text-left font-normal border-input bg-background hover:bg-muted",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeSlot"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-foreground font-semibold">Preferred Time Slot</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-wrap gap-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0 bg-muted/50 p-3 rounded-lg border border-border">
                            <FormControl>
                              <RadioGroupItem value="morning" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">Morning</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0 bg-muted/50 p-3 rounded-lg border border-border">
                            <FormControl>
                              <RadioGroupItem value="afternoon" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">Afternoon</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0 bg-muted/50 p-3 rounded-lg border border-border">
                            <FormControl>
                              <RadioGroupItem value="evening" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">Evening</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="mode"
                render={({ field }) => (
                  <FormItem className="space-y-3 pt-2 border-t border-border">
                    <FormLabel className="text-foreground font-semibold">Session Mode</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col sm:flex-row gap-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="in-person" />
                          </FormControl>
                          <FormLabel className="font-normal">In-person (Nairobi Clinic)</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="video" />
                          </FormControl>
                          <FormLabel className="font-normal">Video Call (Zoom/Meet)</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="phone" />
                          </FormControl>
                          <FormLabel className="font-normal">Phone Call</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-semibold">Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us a bit about your goals or current challenges..." 
                        className="resize-none min-h-[120px] rounded-xl" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" size="lg" className="w-full h-14 text-lg font-bold rounded-xl mt-4">
                Confirm Booking Request
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
