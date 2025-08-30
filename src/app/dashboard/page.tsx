
"use client";
import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CalendarCheck, Activity } from 'lucide-react'; // Removed DollarSign
import { IndianRupee } from 'lucide-react'; // Added IndianRupee
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend as RechartsLegend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from '@/components/ui/chart';

// Sample data for the chart
const appointmentChartData = [
  { month: 'Jan', appointments: Math.floor(Math.random() * 100) + 50, completed: Math.floor(Math.random() * 50) + 20 },
  { month: 'Feb', appointments: Math.floor(Math.random() * 100) + 50, completed: Math.floor(Math.random() * 50) + 20 },
  { month: 'Mar', appointments: Math.floor(Math.random() * 100) + 50, completed: Math.floor(Math.random() * 50) + 20 },
  { month: 'Apr', appointments: Math.floor(Math.random() * 100) + 50, completed: Math.floor(Math.random() * 50) + 20 },
  { month: 'May', appointments: Math.floor(Math.random() * 100) + 50, completed: Math.floor(Math.random() * 50) + 20 },
  { month: 'Jun', appointments: Math.floor(Math.random() * 100) + 50, completed: Math.floor(Math.random() * 50) + 20 },
];

const chartConfig = {
  appointments: {
    label: 'Scheduled',
    color: 'hsl(var(--primary))',
  },
  completed: {
    label: 'Completed',
    color: 'hsl(var(--accent))',
  },
} satisfies ChartConfig;

export default function DashboardPage() {
  const [totalPatients, setTotalPatients] = useState(1234);
  const [appointmentsToday, setAppointmentsToday] = useState(87);
  const [revenueThisMonth, setRevenueThisMonth] = useState(5678900); // Sample revenue in Rupees
  const [activeDoctors, setActiveDoctors] = useState(45);

  // Simulate data fetching or updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalPatients(prev => prev + Math.floor(Math.random() * 5) - 2);
      setAppointmentsToday(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Overview of HealthHub Central activities and metrics."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Patients"
          value={totalPatients.toLocaleString()}
          icon={<Users className="h-6 w-6 text-primary" />}
          change="+5.2% this month"
        />
        <DashboardCard
          title="Appointments Today"
          value={appointmentsToday.toLocaleString()}
          icon={<CalendarCheck className="h-6 w-6 text-primary" />}
          change="-1.5% from yesterday"
        />
        <DashboardCard
          title="Revenue This Month"
          value={`₹${revenueThisMonth.toLocaleString('en-IN')}`}
          icon={<IndianRupee className="h-6 w-6 text-primary" />}
          change="+12.8% this month"
        />
        <DashboardCard
          title="Active Doctors"
          value={activeDoctors.toLocaleString()}
          icon={<Activity className="h-6 w-6 text-primary" />} 
          change="Online: 12"
        />
      </div>
      <Card className="shadow-lg col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Appointments Overview (Last 6 Months)</CardTitle>
          <CardDescription>Recent appointment trends for scheduled vs completed.</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px] p-0 sm:p-6">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={appointmentChartData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="appointments" fill="var(--color-appointments)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" fill="var(--color-completed)" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  change?: string;
}

function DashboardCard({ title, value, icon, change }: DashboardCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        {change && <p className="text-xs text-muted-foreground pt-1">{change}</p>}
      </CardContent>
    </Card>
  );
}

