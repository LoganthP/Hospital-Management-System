
"use client";
import type { ReactNode } from 'react';
import { useState, useEffect, useMemo } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { CalendarPlus, Filter, Edit, Trash2 } from 'lucide-react'; // Removed BriefcaseMedical as it's not used
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"; // Removed AlertDialogTrigger as it's used with asChild
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Consistent Sample Data matching patient-data and doctor-data pages
const samplePatients = [
  { id: 'P001', name: 'Alice Wonderland' },
  { id: 'P002', name: 'Bob The Builder' },
  { id: 'P003', name: 'Charlie Brown' },
  { id: 'P004', name: 'Diana Prince' },
];
const sampleDoctors = [
  { id: 'D001', name: 'Dr. Emily Carter', specialization: 'Cardiology' },
  { id: 'D002', name: 'Dr. John Smith', specialization: 'Pediatrics' },
  { id: 'D003', name: 'Dr. Sarah Lee', specialization: 'Neurology' },
  { id: 'D004', name: 'Dr. Michael Brown', specialization: 'Orthopedics' },
];

const appointmentFormSchema = z.object({
  id: z.string().optional(),
  patientId: z.string({ required_error: "Patient is required." }).min(1, "Patient is required."),
  doctorId: z.string({ required_error: "Doctor is required." }).min(1, "Doctor is required."),
  date: z.date({ required_error: "Date is required."}),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM). Example: 14:30"),
  reason: z.string().min(5, "Reason must be at least 5 characters."),
  status: z.enum(["Scheduled", "Completed", "Cancelled"]).default("Scheduled"),
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

interface Appointment extends AppointmentFormValues {
  id: string; // Ensure ID is always present after creation
  patientName?: string; 
  doctorName?: string;
  doctorSpecialization?: string;
}

const initialSampleAppointments: Appointment[] = [
  { id: 'APT001', patientId: 'P001', doctorId: 'D001', date: new Date(new Date().setDate(new Date().getDate() + 1)), time: '10:00', reason: 'Annual Checkup', status: 'Scheduled', patientName: 'Alice Wonderland', doctorName: 'Dr. Emily Carter', doctorSpecialization: 'Cardiology'},
  { id: 'APT002', patientId: 'P002', doctorId: 'D002', date: new Date(new Date().setDate(new Date().getDate() + 1)), time: '11:30', reason: 'Vaccination', status: 'Scheduled', patientName: 'Bob The Builder', doctorName: 'Dr. John Smith', doctorSpecialization: 'Pediatrics'},
  { id: 'APT003', patientId: 'P001', doctorId: 'D001', date: new Date(), time: '14:00', reason: 'Follow-up', status: 'Scheduled', patientName: 'Alice Wonderland', doctorName: 'Dr. Emily Carter', doctorSpecialization: 'Cardiology'},
  { id: 'APT004', patientId: 'P003', doctorId: 'D003', date: new Date(new Date().setDate(new Date().getDate() + 2)), time: '09:00', reason: 'Headache Consultation', status: 'Scheduled', patientName: 'Charlie Brown', doctorName: 'Dr. Sarah Lee', doctorSpecialization: 'Neurology'},
];


export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialSampleAppointments);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [filterDoctorId, setFilterDoctorId] = useState<string | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [appointmentToDelete, setAppointmentToDelete] = useState<Appointment | null>(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
  });

 useEffect(() => {
    if (isFormOpen) {
      if (editingAppointment) {
        form.reset({
          ...editingAppointment,
          date: typeof editingAppointment.date === 'string' ? new Date(editingAppointment.date) : editingAppointment.date,
        });
      } else {
        form.reset({
          patientId: '', // Use empty string for uncontrolled Select placeholder
          doctorId: '', // Use empty string for uncontrolled Select placeholder
          date: selectedDate || new Date(),
          time: '09:00',
          reason: '',
          status: 'Scheduled',
          id: undefined,
        });
      }
    }
  }, [editingAppointment, isFormOpen, selectedDate, form]);


  const handleAddOrUpdateAppointment: SubmitHandler<AppointmentFormValues> = (data) => {
    const patient = samplePatients.find(p => p.id === data.patientId);
    const doctor = sampleDoctors.find(d => d.id === data.doctorId);

    if (editingAppointment) {
      setAppointments(appointments.map(apt => apt.id === editingAppointment.id ? { 
        ...apt, 
        ...data, 
        date: data.date, // Ensure date is a Date object
        patientName: patient?.name, 
        doctorName: doctor?.name,
        doctorSpecialization: doctor?.specialization 
      } : apt));
    } else {
      const newAppointmentId = `APT${String(Date.now()).slice(-4)}${String(appointments.length + 1).padStart(3, '0')}`;
      setAppointments(prev => [...prev, { 
        ...data, 
        id: newAppointmentId, 
        date: data.date, // Ensure date is a Date object
        patientName: patient?.name, 
        doctorName: doctor?.name,
        doctorSpecialization: doctor?.specialization
      }]);
    }
    setIsFormOpen(false);
    setEditingAppointment(null);
    form.reset(); // Reset form after submission
  };
  
  const confirmDeleteAppointment = (appointment: Appointment) => {
    setAppointmentToDelete(appointment);
    setIsDeleteAlertOpen(true);
  };

  const executeDeleteAppointment = () => {
    if (appointmentToDelete) {
      setAppointments(appointments.filter(apt => apt.id !== appointmentToDelete.id));
    }
    setIsDeleteAlertOpen(false);
    setAppointmentToDelete(null);
  };
  
  const openEditForm = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setIsFormOpen(true);
  };

  const openNewForm = () => {
    setEditingAppointment(null);
    setIsFormOpen(true); // useEffect will handle form reset
  };

  const displayedAppointments = useMemo(() => {
    return appointments
      .filter(apt => {
        const appointmentDate = apt.date instanceof Date ? apt.date : new Date(apt.date);
        const dateMatch = selectedDate ? 
          appointmentDate.getFullYear() === selectedDate.getFullYear() &&
          appointmentDate.getMonth() === selectedDate.getMonth() &&
          appointmentDate.getDate() === selectedDate.getDate()
          : true;
        const doctorMatch = filterDoctorId ? apt.doctorId === filterDoctorId : true;
        return dateMatch && doctorMatch;
      })
      .sort((a, b) => {
        const dateA = a.date instanceof Date ? a.date : new Date(a.date);
        const dateB = b.date instanceof Date ? b.date : new Date(b.date);
        return dateA.getTime() - dateB.getTime() || a.time.localeCompare(b.time)
      });
  }, [appointments, selectedDate, filterDoctorId]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Appointments Management"
        description="Schedule, view, and manage patient appointments."
        actions={
          <Button onClick={openNewForm} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <CalendarPlus className="mr-2 h-5 w-5" /> New Appointment
          </Button>
        }
      />
       <Dialog open={isFormOpen} onOpenChange={(isOpen) => { setIsFormOpen(isOpen); if(!isOpen) { setEditingAppointment(null); form.reset(); }}}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingAppointment ? 'Edit Appointment' : 'New Appointment'}</DialogTitle>
            <DialogDescription>
              {editingAppointment ? 'Update the appointment details.' : 'Fill in the details to schedule a new appointment.'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddOrUpdateAppointment)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="patientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select Patient" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {samplePatients.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="doctorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doctor</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select Doctor" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {sampleDoctors.map(d => <SelectItem key={d.id} value={d.id}>{d.name} ({d.specialization})</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value instanceof Date ? field.value : new Date(field.value), "PPP") : <span>Pick a date</span>}
                            <CalendarPlus className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value instanceof Date ? field.value : new Date(field.value)} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl><Input type="time" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason</FormLabel>
                    <FormControl><Textarea placeholder="Reason for appointment" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || "Scheduled"}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select Status" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Scheduled">Scheduled</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => {setIsFormOpen(false); setEditingAppointment(null); form.reset();}}>Cancel</Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  {editingAppointment ? 'Save Changes' : 'Schedule Appointment'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will cancel the appointment for {appointmentToDelete?.patientName} with {appointmentToDelete?.doctorName} on {appointmentToDelete?.date ? format(appointmentToDelete.date instanceof Date ? appointmentToDelete.date : new Date(appointmentToDelete.date), "PPP") : ''} at {appointmentToDelete?.time}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAppointmentToDelete(null)}>No, keep it</AlertDialogCancel>
            <AlertDialogAction onClick={executeDeleteAppointment} className="bg-destructive hover:bg-destructive/90">
              Yes, cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Appointments List</CardTitle>
              <CardDescription>
                {selectedDate ? `Appointments for ${format(selectedDate, "PPP")}` : "All appointments."}
                {filterDoctorId && sampleDoctors.find(d => d.id === filterDoctorId) ? ` filtered by Dr. ${sampleDoctors.find(d => d.id === filterDoctorId)?.name}`: ""}
              </CardDescription>
               <div className="pt-4 flex flex-wrap gap-2 items-center">
                <Select 
                  value={filterDoctorId || "all_doctors"} 
                  onValueChange={(value) => setFilterDoctorId(value === "all_doctors" ? undefined : value)}
                >
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Filter by Doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_doctors">All Doctors</SelectItem>
                    {sampleDoctors.map(d => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                 <Button variant="outline" onClick={() => {setFilterDoctorId(undefined); setSelectedDate(new Date())}}>
                  <Filter className="mr-2 h-4 w-4" /> Reset Filters
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {displayedAppointments.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayedAppointments.map((apt) => (
                      <TableRow key={apt.id}>
                        <TableCell>{apt.patientName || apt.patientId}</TableCell>
                        <TableCell>{apt.doctorName || apt.doctorId} <span className="text-xs text-muted-foreground">({apt.doctorSpecialization || sampleDoctors.find(d=>d.id === apt.doctorId)?.specialization})</span></TableCell>
                        <TableCell>{apt.time}</TableCell>
                        <TableCell className="max-w-xs truncate">{apt.reason}</TableCell>
                        <TableCell>{apt.status}</TableCell>
                        <TableCell className="text-right space-x-1">
                           <Button variant="outline" size="sm" onClick={() => openEditForm(apt)} className="px-2 py-1 h-auto">
                            <Edit className="h-3 w-3" /> <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => confirmDeleteAppointment(apt)} className="px-2 py-1 h-auto">
                            <Trash2 className="h-3 w-3" /> <span className="sr-only">Delete</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="min-h-[200px] flex items-center justify-center border-2 border-dashed border-border rounded-md">
                  <p className="text-muted-foreground">No appointments for this day or filter.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>Select a date to view appointments.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))} // Disable past dates from today
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

    