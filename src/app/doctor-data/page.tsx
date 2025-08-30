
"use client";
import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Schema for doctor form validation
const doctorFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be 50 characters or less"),
  specialization: z.string().min(2, "Specialization must be at least 2 characters"),
  availability: z.string().min(2, "Availability details are required"),
  status: z.enum(["Active", "On Leave", "Inactive"], { required_error: "Status is required" }),
});

type DoctorFormValues = z.infer<typeof doctorFormSchema>;

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  availability: string;
  status: "Active" | "On Leave" | "Inactive";
}

const initialSampleDoctors: Doctor[] = [
  { id: 'D001', name: 'Dr. Emily Carter', specialization: 'Cardiology', availability: 'Mon, Wed, Fri', status: 'Active' },
  { id: 'D002', name: 'Dr. John Smith', specialization: 'Pediatrics', availability: 'Tue, Thu', status: 'Active' },
  { id: 'D003', name: 'Dr. Sarah Lee', specialization: 'Neurology', availability: 'Mon - Fri', status: 'On Leave' },
  { id: 'D004', name: 'Dr. Michael Brown', specialization: 'Orthopedics', availability: 'Mon, Tue, Thu, Fri', status: 'Active' },
];

export default function DoctorDataPage() {
  const [doctors, setDoctors] = useState<Doctor[]>(initialSampleDoctors);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  const form = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: { name: '', specialization: '', availability: '', status: 'Active' },
  });

  useEffect(() => {
    if (editingDoctor) {
      form.reset(editingDoctor);
    } else {
      form.reset({ name: '', specialization: '', availability: '', status: 'Active', id: undefined });
    }
  }, [editingDoctor, form, isFormOpen]);

  const handleAddOrUpdateDoctor: SubmitHandler<DoctorFormValues> = (data) => {
    if (editingDoctor) {
      setDoctors(doctors.map(d => d.id === editingDoctor.id ? { ...data, id: editingDoctor.id } as Doctor : d));
    } else {
      const newDoctorId = `D${String(doctors.length + 1).padStart(3, '0')}`;
      setDoctors([...doctors, { ...data, id: newDoctorId } as Doctor]);
    }
    setIsFormOpen(false);
    setEditingDoctor(null);
  };

  const handleDeleteDoctor = (doctorId: string) => {
    setDoctors(doctors.filter(d => d.id !== doctorId));
  };

  const openEditForm = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setIsFormOpen(true);
  };

  const openNewForm = () => {
    setEditingDoctor(null);
    form.reset({ name: '', specialization: '', availability: '', status: 'Active', id: undefined });
    setIsFormOpen(true);
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <Dialog open={isFormOpen} onOpenChange={(isOpen) => { setIsFormOpen(isOpen); if (!isOpen) setEditingDoctor(null); }}>
        <PageHeader
          title="Doctor Data Management"
          description="Manage doctor profiles, specializations, and schedules."
          actions={
            <DialogTrigger asChild>
              <Button onClick={openNewForm} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <PlusCircle className="mr-2 h-5 w-5" /> Add New Doctor
              </Button>
            </DialogTrigger>
          }
        />
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}</DialogTitle>
            <DialogDescription>
              {editingDoctor ? 'Update the doctor details below.' : 'Fill in the form to add a new doctor.'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddOrUpdateDoctor)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl><Input placeholder="Dr. Jane Smith" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specialization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialization</FormLabel>
                    <FormControl><Input placeholder="Cardiology" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability</FormLabel>
                    <FormControl><Input placeholder="Mon, Wed, Fri (9AM - 5PM)" {...field} /></FormControl>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="On Leave">On Leave</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                 <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">{editingDoctor ? 'Save Changes' : 'Add Doctor'}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Doctor List</CardTitle>
          <CardDescription>A list of all doctors in the HealthHub Central system.</CardDescription>
          <div className="pt-4 relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground mt-[8px]" />
            <Input 
              placeholder="Search doctors by name or specialization..." 
              className="max-w-sm pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Doctor ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDoctors.length > 0 ? filteredDoctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell className="font-medium">{doctor.id}</TableCell>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell>{doctor.availability}</TableCell>
                  <TableCell>
                    <Badge variant={doctor.status === 'Active' ? 'default' : (doctor.status === 'On Leave' ? 'secondary' : 'outline')} 
                           className={
                            doctor.status === 'Active' ? 'bg-green-500/20 text-green-700 border-green-500/30' : 
                            doctor.status === 'On Leave' ? 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30' :
                            'bg-slate-500/20 text-slate-700 border-slate-500/30'
                           }>
                      {doctor.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openEditForm(doctor)}>
                      <Edit className="mr-1 h-4 w-4" /> Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="mr-1 h-4 w-4" /> Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the doctor profile for {doctor.name}.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteDoctor(doctor.id)} className="bg-destructive hover:bg-destructive/90">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No doctors found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

    