'use server';
/**
 * @fileOverview AI Specialist Finder flow.
 *
 * This file defines a Genkit flow that takes a user's symptoms as input and
 * returns a list of relevant medical specialists in Chennai, Tamil Nadu, India.
 *
 * @interface AISpecialistFinderInput - Defines the input schema for the flow.
 * @interface AISpecialistFinderOutput - Defines the output schema for the flow.
 * @function findSpecialists - The main function to trigger the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AISpecialistFinderInputSchema = z.object({
  symptoms: z.string().describe('The symptoms the user is experiencing.'),
});
export type AISpecialistFinderInput = z.infer<typeof AISpecialistFinderInputSchema>;

const AISpecialistFinderOutputSchema = z.object({
  specialists: z
    .array(z.string())
    .describe('A list of relevant medical specialists in Chennai, Tamil Nadu, India.'),
  location: z.string().describe('The location of the specialists: Chennai, Tamil Nadu, India'),
});
export type AISpecialistFinderOutput = z.infer<typeof AISpecialistFinderOutputSchema>;

export async function findSpecialists(input: AISpecialistFinderInput): Promise<AISpecialistFinderOutput> {
  return aiSpecialistFinderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSpecialistFinderPrompt',
  input: {schema: AISpecialistFinderInputSchema},
  output: {schema: AISpecialistFinderOutputSchema},
  prompt: `You are an AI assistant designed to help users find relevant medical specialists in Chennai, Tamil Nadu, India.

  The location is ALWAYS Chennai, Tamil Nadu, India, so include that in the location field, no matter what.

  Based on the following symptoms, suggest a list of relevant specialists. If no specialists are found, return a message saying "No specialists found".

  Symptoms: {{{symptoms}}}
  Location: Chennai, Tamil Nadu, India`,
});

const aiSpecialistFinderFlow = ai.defineFlow(
  {
    name: 'aiSpecialistFinderFlow',
    inputSchema: AISpecialistFinderInputSchema,
    outputSchema: AISpecialistFinderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      specialists: output!.specialists,
      location: 'Chennai, Tamil Nadu, India',
    };
  }
);
