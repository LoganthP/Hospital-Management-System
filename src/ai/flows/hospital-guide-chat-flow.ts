
'use server';
/**
 * @fileOverview A hospital guide AI chatbot.
 *
 * - chatWithHospitalGuide - A function that handles user queries for the hospital guide.
 * - HospitalGuideChatInput - The input type for the chatWithHospitalGuide function.
 * - HospitalGuideChatOutput - The return type for the chatWithHospitalGuide function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HospitalGuideChatInputSchema = z.object({
  query: z.string().describe('The user query or question for the hospital guide.'),
});
export type HospitalGuideChatInput = z.infer<typeof HospitalGuideChatInputSchema>;

const HospitalGuideChatOutputSchema = z.object({
  response: z.string().describe('The AI-generated response from the hospital guide.'),
});
export type HospitalGuideChatOutput = z.infer<typeof HospitalGuideChatOutputSchema>;

export async function chatWithHospitalGuide(input: HospitalGuideChatInput): Promise<HospitalGuideChatOutput> {
  return hospitalGuideChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'hospitalGuideChatPrompt',
  input: {schema: HospitalGuideChatInputSchema},
  output: {schema: HospitalGuideChatOutputSchema},
  prompt: `You are a friendly and helpful AI assistant for HealthHub Central.
Your goal is to answer user questions about the hospital.
Base your answers on the following information:
- Location: 123 Health St, Wellness City, MedState 10001. Directions can be found on Google Maps.
- General Visiting Hours: 10:00 AM - 8:00 PM (Daily).
- ICU Visiting Hours: 11:00 AM - 12:00 PM & 5:00 PM - 6:00 PM.
- Contact Information: Main Line: (555) 123-4567, Emergency: (555) 911-0000.
- Admission Process: Patients should bring their identification, insurance card, and any referral documents. The admissions desk is located on the ground floor in the main lobby.
- Discharge Process: The attending doctor will inform the patient about their discharge. Patients should arrange for transportation and settle any outstanding bills at the cashier before leaving.
- Available Amenities: The hospital offers a cafeteria, pharmacy, gift shop, free Wi-Fi, and an interfaith chapel for patients and visitors.
- Emergency Services: The Emergency Department is open 24/7. For immediate assistance, call (555) 911-0000 or proceed directly to the ER entrance.

If the user's question is outside the scope of this information, politely state that you can only provide information based on the HealthHub Central guide. Do not invent information.

User's question: {{{query}}}
`,
});

const hospitalGuideChatFlow = ai.defineFlow(
  {
    name: 'hospitalGuideChatFlow',
    inputSchema: HospitalGuideChatInputSchema,
    outputSchema: HospitalGuideChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
