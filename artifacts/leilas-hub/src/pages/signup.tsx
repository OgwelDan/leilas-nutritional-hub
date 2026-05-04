import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { KENYA_COUNTIES } from "@/data/constants";
import { Link } from "wouter";

const individualSchema = z.object({
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  phone: z.string().min(9, "Valid phone required"),
  email: z.string().email("Invalid email"),
  country: z.string().min(1, "Country required"),
  county: z.string().optional(),
  gender: z.enum(["Male", "Female", "Prefer not to say"], { required_error: "Gender required" }),
  age: z.coerce.number().min(1, "Age required"),
  allergies: z.string().optional(),
  medications: z.string().optional(),
  profileType: z.enum([
    "Athlete", 
    "Patient with medical condition", 
    "Elderly", 
    "New/Lactating Mother", 
    "Gym Enthusiast", 
    "Professional Personal Trainer"
  ], { required_error: "Profile type required" })
});

const teamSchema = z.object({
  groupName: z.string().min(2, "Group name required"),
  purpose: z.string().min(1, "Purpose required"),
  contactName: z.string().min(2, "Contact name required"),
  phone: z.string().min(9, "Phone required"),
  email: z.string().email("Invalid email"),
  country: z.string().min(1, "Country required"),
  county: z.string().optional(),
  teamSize: z.coerce.number().min(2, "Minimum size is 2")
});

export function Signup() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [type, setType] = useState<"individual" | "team" | null>(null);

  const individualForm = useForm<z.infer<typeof individualSchema>>({
    resolver: zodResolver(individualSchema),
    defaultValues: { country: "Kenya" }
  });

  const teamForm = useForm<z.infer<typeof teamSchema>>({
    resolver: zodResolver(teamSchema),
    defaultValues: { country: "Kenya" }
  });

  const onIndividualSubmit = (data: z.infer<typeof individualSchema>) => {
    console.log(data);
    setStep(3);
  };

  const onTeamSubmit = (data: z.infer<typeof teamSchema>) => {
    console.log(data);
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-muted/30 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        
        {step === 1 && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Start Your Journey</h1>
              <p className="text-lg text-muted-foreground">Are you signing up for yourself or for a group?</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => { setType("individual"); setStep(2); }}
                className="bg-card p-10 rounded-3xl border-2 border-transparent hover:border-primary shadow-sm hover:shadow-xl transition-all text-center flex flex-col items-center group"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-6">
                  <User className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-2xl mb-2 text-foreground">Individual</h3>
                <p className="text-muted-foreground text-sm">Personalized plans for athletes, patients, and everyday wellness.</p>
              </button>

              <button
                onClick={() => { setType("team"); setStep(2); }}
                className="bg-card p-10 rounded-3xl border-2 border-transparent hover:border-primary shadow-sm hover:shadow-xl transition-all text-center flex flex-col items-center group"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-6">
                  <Users className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-2xl mb-2 text-foreground">Group / Team</h3>
                <p className="text-muted-foreground text-sm">Corporate wellness, sports teams, and gym/trainer partnerships.</p>
              </button>
            </div>
          </div>
        )}

        {step === 2 && type === "individual" && (
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-xl border border-border relative">
            <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="absolute top-6 left-6 text-muted-foreground">
              ← Back
            </Button>
            <div className="text-center mb-10 mt-4">
              <h2 className="font-serif text-3xl font-bold text-foreground">Individual Profile</h2>
              <p className="text-muted-foreground mt-2">Tell us about yourself to tailor your experience.</p>
            </div>

            <Form {...individualForm}>
              <form onSubmit={individualForm.handleSubmit(onIndividualSubmit)} className="space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField control={individualForm.control} name="firstName" render={({ field }) => (
                    <FormItem><FormLabel>First Name</FormLabel><FormControl><Input className="h-12 rounded-xl" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={individualForm.control} name="lastName" render={({ field }) => (
                    <FormItem><FormLabel>Last Name</FormLabel><FormControl><Input className="h-12 rounded-xl" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField control={individualForm.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" className="h-12 rounded-xl" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={individualForm.control} name="phone" render={({ field }) => (
                    <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input className="h-12 rounded-xl" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField control={individualForm.control} name="country" render={({ field }) => (
                    <FormItem><FormLabel>Country</FormLabel><FormControl><Input className="h-12 rounded-xl" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  
                  {individualForm.watch("country")?.toLowerCase() === "kenya" && (
                    <FormField control={individualForm.control} name="county" render={({ field }) => (
                      <FormItem>
                        <FormLabel>County</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Select county" /></SelectTrigger></FormControl>
                          <SelectContent>
                            {KENYA_COUNTIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField control={individualForm.control} name="gender" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={individualForm.control} name="age" render={({ field }) => (
                    <FormItem><FormLabel>Age</FormLabel><FormControl><Input type="number" className="h-12 rounded-xl" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>

                <FormField control={individualForm.control} name="profileType" render={({ field }) => (
                  <FormItem className="space-y-3 pt-4">
                    <FormLabel className="text-base font-bold text-foreground">Which best describes you?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid sm:grid-cols-2 gap-4">
                        {[
                          "Athlete", "Patient with medical condition", "Elderly", 
                          "New/Lactating Mother", "Gym Enthusiast", "Professional Personal Trainer"
                        ].map(t => (
                          <FormItem key={t} className="flex items-center space-x-3 space-y-0 border border-border p-4 rounded-xl cursor-pointer hover:bg-muted transition-colors [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
                            <FormControl><RadioGroupItem value={t} /></FormControl>
                            <FormLabel className="font-medium cursor-pointer text-sm m-0 leading-tight">{t}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="pt-4 space-y-6 border-t border-border">
                  <FormField control={individualForm.control} name="allergies" render={({ field }) => (
                    <FormItem><FormLabel>Food Allergies (Optional)</FormLabel><FormControl><Input className="h-12 rounded-xl" placeholder="e.g. Peanuts, Gluten" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={individualForm.control} name="medications" render={({ field }) => (
                    <FormItem><FormLabel>Current Medications (Optional)</FormLabel><FormControl><Input className="h-12 rounded-xl" placeholder="List any ongoing meds" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>

                <Button type="submit" size="lg" className="w-full h-14 text-lg font-bold rounded-xl mt-8">Create Profile</Button>
              </form>
            </Form>
          </div>
        )}

        {step === 2 && type === "team" && (
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-xl border border-border relative">
            <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="absolute top-6 left-6 text-muted-foreground">
              ← Back
            </Button>
            <div className="text-center mb-10 mt-4">
              <h2 className="font-serif text-3xl font-bold text-foreground">Team Registration</h2>
              <p className="text-muted-foreground mt-2">Register your group for bulk plans or corporate wellness.</p>
            </div>

            <Form {...teamForm}>
              <form onSubmit={teamForm.handleSubmit(onTeamSubmit)} className="space-y-6">
                
                <FormField control={teamForm.control} name="groupName" render={({ field }) => (
                  <FormItem><FormLabel>Group / Organization Name</FormLabel><FormControl><Input className="h-12 rounded-xl" {...field} /></FormControl><FormMessage /></FormItem>
                )} />

                <FormField control={teamForm.control} name="purpose" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purpose</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Select purpose" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Sports Team">Sports Team</SelectItem>
                        <SelectItem value="Corporate Wellness">Corporate Wellness</SelectItem>
                        <SelectItem value="Fitness Center">Fitness Center</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField control={teamForm.control} name="contactName" render={({ field }) => (
                    <FormItem><FormLabel>Contact Person Name</FormLabel><FormControl><Input className="h-12 rounded-xl" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={teamForm.control} name="teamSize" render={({ field }) => (
                    <FormItem><FormLabel>Approximate Team Size</FormLabel><FormControl><Input type="number" className="h-12 rounded-xl" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField control={teamForm.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Contact Email</FormLabel><FormControl><Input type="email" className="h-12 rounded-xl" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={teamForm.control} name="phone" render={({ field }) => (
                    <FormItem><FormLabel>Contact Phone</FormLabel><FormControl><Input className="h-12 rounded-xl" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField control={teamForm.control} name="country" render={({ field }) => (
                    <FormItem><FormLabel>Country</FormLabel><FormControl><Input className="h-12 rounded-xl" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  {teamForm.watch("country")?.toLowerCase() === "kenya" && (
                    <FormField control={teamForm.control} name="county" render={({ field }) => (
                      <FormItem>
                        <FormLabel>County</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Select county" /></SelectTrigger></FormControl>
                          <SelectContent>
                            {KENYA_COUNTIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  )}
                </div>

                <Button type="submit" size="lg" className="w-full h-14 text-lg font-bold rounded-xl mt-8">Submit Registration</Button>
              </form>
            </Form>
          </div>
        )}

        {step === 3 && (
          <div className="bg-card rounded-3xl p-12 shadow-xl border border-border text-center">
            <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            
            {type === "individual" ? (
              <>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Welcome to Leila's Nutritional Hub!</h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
                  Your profile has been created. Maryleila will review your details and reach out within 24 hours to begin your personalized nutrition journey.
                </p>
              </>
            ) : (
              <>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Thank you for registering!</h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
                  We'll prepare a customized group nutrition proposal and contact you within 48 hours.
                </p>
              </>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-xl h-12">
                <Link href="/">Back to Home</Link>
              </Button>
              {type === "individual" && (
                <Button asChild variant="outline" size="lg" className="rounded-xl h-12">
                  <Link href="/book">Book a Session Now</Link>
                </Button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
