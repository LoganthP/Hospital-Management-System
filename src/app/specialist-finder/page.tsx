// src/app/specialist-finder/page.tsx
"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { findSpecialists, type AISpecialistFinderOutput } from '@/ai/flows/ai-specialist-finder';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, UserSearch, MapPin } from "lucide-react";
import PageHeader from '@/components/layout/PageHeader';

const formSchema = z.object({
  symptoms: z.string().min(10, { message: "Please describe your symptoms in at least 10 characters." }),
});

type SpecialistFinderFormValues = z.infer<typeof formSchema>;

export default function SpecialistFinderPage() {
  const [result, setResult] = useState<AISpecialistFinderOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SpecialistFinderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: "",
    },
  });

  const onSubmit: SubmitHandler<SpecialistFinderFormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const aiResult = await findSpecialists({ symptoms: data.symptoms });
      setResult(aiResult);
    } catch (e) {
      console.error(e);
      setError("An error occurred while finding specialists. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="AI Specialist Finder"
        description="Describe your symptoms, and our AI will suggest relevant medical specialists for you."
      />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Find a Specialist</CardTitle>
          <CardDescription>Enter your symptoms below to get started.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="symptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="symptoms" className="text-lg">Your Symptoms</FormLabel>
                    <FormControl>
                      <Input
                        id="symptoms"
                        placeholder="e.g., persistent cough, fever, headache"
                        {...field}
                        className="text-base p-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Finding Specialists...
                  </>
                ) : (
                  <>
                    <UserSearch className="mr-2 h-5 w-5" />
                    Find Specialists
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card className="shadow-lg animate-in fade-in-50 duration-500">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Specialist Suggestions</CardTitle>
            <CardDescription>Based on your symptoms, we recommend the following specialists.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <UserSearch className="mr-2 h-5 w-5 text-primary" />
                Recommended Specialists:
              </h3>
              {result.specialists && result.specialists.length > 0 ? (
                <ul className="list-disc list-inside space-y-1 pl-4">
                  {result.specialists.map((specialist, index) => (
                    <li key={index} className="text-foreground">{specialist}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No specific specialists found based on the symptoms provided. You might want to consult a General Physician.</p>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-primary" />
                Location:
              </h3>
              <p className="text-foreground">{result.location || "Chennai, Tamil Nadu, India"}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
