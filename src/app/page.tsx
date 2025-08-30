
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit, UsersRound, UserSearch, Stethoscope, FileText, CreditCard, LayoutDashboard } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-20 lg:py-28 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-1 items-center"> {/* Changed lg:grid-cols-2 to lg:grid-cols-1 */}
            <div className="space-y-6 text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
                Welcome to HealthHub Central
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl lg:text-2xl">
                Your integrated solution for efficient hospital management and seamless patient care.
              </p>
              <Link href="/specialist-finder" passHref>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transition-transform duration-150 hover:scale-105">
                  Find a Specialist
                  <UserSearch className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            {/* Image section removed */}
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="w-full py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Core Features</h2>
            <p className="mt-3 text-lg text-muted-foreground md:text-xl">
              Empowering healthcare with cutting-edge technology.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<UserSearch className="h-10 w-10 text-primary" />}
              title="AI Specialist Finder"
              description="Suggests doctors based on symptoms, ensuring you find the right care quickly."
              link="/specialist-finder"
            />
            <FeatureCard
              icon={<UsersRound className="h-10 w-10 text-primary" />}
              title="Patient Data Management"
              description="Secure and efficient CRUD operations for comprehensive patient records."
              link="/patient-data"
            />
            <FeatureCard
              icon={<LayoutDashboard className="h-10 w-10 text-primary" />}
              title="Role-Based Dashboards"
              description="Tailored interfaces for doctors, nurses, and admins for streamlined workflows."
              link="/dashboard"
            />
            <FeatureCard
              icon={<BrainCircuit className="h-10 w-10 text-primary" />}
              title="AI Prescriptions"
              description="Generate example prescriptions intelligently based on diagnosis and patient details."
              link="/ai-prescriptions"
            />
             <FeatureCard
              icon={<FileText className="h-10 w-10 text-primary" />}
              title="Medical Records"
              description="Access and manage comprehensive medical history securely and efficiently."
              link="/medical-records"
            />
            <FeatureCard
              icon={<CreditCard className="h-10 w-10 text-primary" />}
              title="Billing & Payments"
              description="Streamlined billing processes and payment tracking for transparent financial management."
              link="/billing"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

function FeatureCard({ icon, title, description, link }: FeatureCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      <CardHeader className="items-center text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-4 inline-flex">
          {icon}
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow text-center">
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
      <div className="p-6 pt-0 text-center">
        <Link href={link} passHref>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
            Learn More
          </Button>
        </Link>
      </div>
    </Card>
  );
}
