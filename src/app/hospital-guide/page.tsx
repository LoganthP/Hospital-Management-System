
"use client";

import type { ReactNode } from 'react';
import { useState } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MapPin, Clock, Phone, Info, ShieldQuestion, MessageSquare, Send, Loader2, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatWithHospitalGuide, type HospitalGuideChatOutput } from '@/ai/flows/hospital-guide-chat-flow';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export default function HospitalGuidePage() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newUserMessage: ChatMessage = { sender: 'user', text: userInput };
    setChatMessages(prevMessages => [...prevMessages, newUserMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const aiResult: HospitalGuideChatOutput = await chatWithHospitalGuide({ query: userInput });
      const newAiMessage: ChatMessage = { sender: 'ai', text: aiResult.response };
      setChatMessages(prevMessages => [...prevMessages, newAiMessage]);
    } catch (err) {
      console.error(err);
      setError("Sorry, I couldn't process your request right now. Please try again.");
       const newAiErrorMessage: ChatMessage = { sender: 'ai', text: "I encountered an error. Please try again." };
      setChatMessages(prevMessages => [...prevMessages, newAiErrorMessage]);
    } finally {
      setUserInput('');
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Hospital Guide"
        description="Find useful information about HealthHub Central, its facilities, and services. You can also chat with our AI assistant below!"
      />
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center"><MapPin className="mr-2 h-6 w-6 text-primary" /> Location & Directions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2 text-muted-foreground">123 Health St, Wellness City, MedState 10001</p>
            <Button variant="link" className="p-0 mt-2 text-accent" asChild>
              <a href="https://www.google.com/maps/search/?api=1&query=Chennai" target="_blank" rel="noopener noreferrer">
                Get Directions on Google Maps
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center"><Clock className="mr-2 h-6 w-6 text-primary" /> Visiting Hours & Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold text-foreground">General Visiting Hours:</h4>
              <p className="text-muted-foreground">10:00 AM - 8:00 PM (Daily)</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">ICU Visiting Hours:</h4>
              <p className="text-muted-foreground">11:00 AM - 12:00 PM & 5:00 PM - 6:00 PM</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground flex items-center"><Phone className="mr-2 h-5 w-5" /> Contact Us:</h4>
              <p className="text-muted-foreground">Main Line: (555) 123-4567</p>
              <p className="text-muted-foreground">Emergency: (555) 911-0000</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center"><MessageSquare className="mr-2 h-6 w-6 text-primary" /> AI Hospital Guide Chat</CardTitle>
          <CardDescription>Ask our AI assistant any questions you have about HealthHub Central.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4 mb-4 space-y-4">
            {chatMessages.length === 0 && <p className="text-muted-foreground text-center">Ask a question to start the chat...</p>}
            {chatMessages.map((message, index) => (
              <div key={index} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                {message.sender === 'ai' && <Bot className="h-6 w-6 text-primary shrink-0" />}
                <div className={`max-w-[75%] rounded-lg p-3 text-sm ${
                    message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {message.text}
                </div>
                {message.sender === 'user' && <User className="h-6 w-6 text-accent shrink-0" />}
              </div>
            ))}
             {isLoading && chatMessages.length > 0 && chatMessages[chatMessages.length-1].sender === 'user' && (
               <div className="flex items-start gap-3">
                <Bot className="h-6 w-6 text-primary shrink-0" />
                <div className="max-w-[75%] rounded-lg p-3 text-sm bg-muted text-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
          </ScrollArea>
          <form onSubmit={handleChatSubmit} className="flex gap-2">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your question here..."
              className="flex-grow"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading} className="bg-accent hover:bg-accent/90">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              <span className="sr-only">Send</span>
            </Button>
          </form>
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Chat Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center"><Info className="mr-2 h-6 w-6 text-primary" /> Patient & Visitor Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg">Admission Process</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                Please bring your identification, insurance card, and any referral documents. Our admissions desk is located on the ground floor, main lobby.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg">Discharge Process</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                Your doctor will inform you about your discharge. Please arrange for transportation and settle any outstanding bills at the cashier before leaving.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg">Available Amenities</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                We offer a cafeteria, pharmacy, gift shop, free Wi-Fi, and an interfaith chapel for patients and visitors.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg flex items-center"><ShieldQuestion className="mr-2 h-5 w-5 text-primary" /> Emergency Services</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                Our Emergency Department is open 24/7. For immediate assistance, please call (555) 911-0000 or proceed directly to the ER entrance.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
