// src/app/ai-prescriptions/page.tsx
"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { generatePrescription, type AIPrescriptionOutput } from '@/ai/flows/ai-prescription-generator';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, FilePlus2, BrainCircuit } from "lucide-react";
import PageHeader from '@/components/layout/PageHeader';

const formSchema = z.object({
  name: z.string().min(2, { message: "Patient name must be at least 2 characters." }),
  diagnosis: z.string().min(5, { message: "Diagnosis must be at least 5 characters." }),
});

type PrescriptionFormValues = z.infer<typeof formSchema>;

export default function AIPrescriptionsPage() {
  const [result, setResult] = useState<AIPrescriptionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<PrescriptionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      diagnosis: "",
    },
  });

  const onSubmit: SubmitHandler<PrescriptionFormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const aiResult = await generatePrescription({ name: data.name, diagnosis: data.diagnosis });
      setResult(aiResult);
    } catch (e) {
      console.error(e);
      setError("An error occurred while generating the prescription. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="AI Prescription Generator"
        description="Generate example prescriptions using patient name and diagnosis."
      />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Generate Prescription</CardTitle>
          <CardDescription>Enter patient details to generate an example prescription.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name" className="text-lg">Patient Name</FormLabel>
                    <FormControl>
                      <Input id="name" placeholder="e.g., John Doe" {...field} className="text-base p-4" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="diagnosis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="diagnosis" className="text-lg">Diagnosis</FormLabel>
                    <FormControl>
                      <Input id="diagnosis" placeholder="e.g., Common Cold" {...field} className="text-base p-4" />
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
                    Generating...
                  </>
                ) : (
                  <>
                    <BrainCircuit className="mr-2 h-5 w-5" />
                    Generate Prescription
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
            <CardTitle className="text-2xl text-primary flex items-center">
              <FilePlus2 className="mr-2 h-7 w-7" />
              Generated Prescription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              readOnly
              value={result.prescription}
              className="h-64 w-full text-sm font-mono bg-muted/30 border rounded-md p-4"
              aria-label="Generated Prescription"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
