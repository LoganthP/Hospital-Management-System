// src/ai/flows/ai-prescription-generator.ts
'use server';

/**
 * @fileOverview AI prescription generator.
 *
 * - generatePrescription - A function that generates an example prescription.
 * - AIPrescriptionInput - The input type for the generatePrescription function.
 * - AIPrescriptionOutput - The return type for the generatePrescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPrescriptionInputSchema = z.object({
  name: z.string().describe('The name of the patient.'),
  diagnosis: z.string().describe('The diagnosis of the patient.'),
});
export type AIPrescriptionInput = z.infer<typeof AIPrescriptionInputSchema>;

const AIPrescriptionOutputSchema = z.object({
  prescription: z.string().describe('The generated prescription.'),
});
export type AIPrescriptionOutput = z.infer<typeof AIPrescriptionOutputSchema>;

export async function generatePrescription(input: AIPrescriptionInput): Promise<AIPrescriptionOutput> {
  return generatePrescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPrescriptionPrompt',
  input: {schema: AIPrescriptionInputSchema},
  output: {schema: AIPrescriptionOutputSchema},
  prompt: `You are a medical professional who specializes in creating prescriptions.

  Create a prescription for the following patient:

  Patient Name: {{{name}}}
  Diagnosis: {{{diagnosis}}}
  Location: Chennai, Tamil Nadu, India`,
});

const generatePrescriptionFlow = ai.defineFlow(
  {
    name: 'generatePrescriptionFlow',
    inputSchema: AIPrescriptionInputSchema,
    outputSchema: AIPrescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
